<?php
/**
 * Main Router class for handling subdomain-based routing
 */

class Router {
    private $subdomain;
    private $path;
    private $query;
    
    public function __construct() {
        $this->parseRequest();
    }
    
    /**
     * Parse the incoming request to extract subdomain, path, and query
     */
    private function parseRequest() {
        $host = $_SERVER['HTTP_HOST'] ?? '';
        $requestUri = $_SERVER['REQUEST_URI'] ?? '';
        
        // Parse subdomain
        $hostParts = explode('.', $host);
        if (count($hostParts) >= 3) {
            $this->subdomain = $hostParts[0];
        } else {
            $this->subdomain = '';
        }
        
        // Parse path and query
        $parsedUrl = parse_url($requestUri);
        $this->path = $parsedUrl['path'] ?? '/';
        $this->query = $parsedUrl['query'] ?? '';
    }
    
    /**
     * Handle the incoming request based on subdomain
     */
    public function handleRequest() {
        try {
            // Log the request
            $this->logRequest();
            
            // Check rate limiting
            if (!$this->checkRateLimit()) {
                http_response_code(429);
                echo json_encode(['error' => 'Rate limit exceeded']);
                return;
            }
            
            // Route based on subdomain
            switch ($this->subdomain) {
                case COMMON_SUBDOMAIN:
                    $this->handleCommonSubdomain();
                    break;
                    
                case 'c':
                    $this->handleCeleroSubdomain();
                    break;
                    
                case '':
                    // No subdomain - could be main domain
                    $this->handleMainDomain();
                    break;
                    
                default:
                    $this->handleCustomSubdomain();
                    break;
            }
            
        } catch (Exception $e) {
            $this->logError($e->getMessage());
            http_response_code(500);
            echo json_encode(['error' => 'Internal server error']);
        }
    }
    
    /**
     * Handle requests to the common subdomain (a.cnts.in)
     */
    private function handleCommonSubdomain() {
        require_once 'handlers/CommonHandler.php';
        $handler = new CommonHandler();
        $handler->process($this->path, $this->query);
    }
    
    /**
     * Handle requests to the Celero subdomain (c.cnts.in)
     */
    private function handleCeleroSubdomain() {
        require_once 'handlers/CeleroHandler.php';
        $handler = new CeleroHandler();
        $handler->process($this->path, $this->query);
    }
    
    /**
     * Handle requests to the main domain (cnts.in)
     */
    private function handleMainDomain() {
        require_once 'handlers/MainDomainHandler.php';
        $handler = new MainDomainHandler();
        $handler->process($this->path, $this->query);
    }
    
    /**
     * Handle requests to custom subdomains
     */
    private function handleCustomSubdomain() {
        $handlerFile = "handlers/{$this->subdomain}Handler.php";
        
        if (file_exists($handlerFile)) {
            require_once $handlerFile;
            $handlerClass = ucfirst($this->subdomain) . 'Handler';
            if (class_exists($handlerClass)) {
                $handler = new $handlerClass();
                $handler->process($this->path, $this->query);
            } else {
                $this->handleNotFound();
            }
        } else {
            $this->handleNotFound();
        }
    }
    
    /**
     * Handle 404 - subdomain not found
     */
    private function handleNotFound() {
        http_response_code(404);
        echo json_encode([
            'error' => 'Subdomain not found',
            'subdomain' => $this->subdomain
        ]);
    }
    
    /**
     * Check rate limiting
     */
    private function checkRateLimit() {
        if (!RATE_LIMIT_ENABLED) {
            return true;
        }
        
        // Simple rate limiting implementation
        // In production, you might want to use Redis or database
        $clientIp = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
        $rateLimitFile = sys_get_temp_dir() . "/rate_limit_{$clientIp}.txt";
        
        $currentTime = time();
        $requests = [];
        
        if (file_exists($rateLimitFile)) {
            $requests = json_decode(file_get_contents($rateLimitFile), true) ?: [];
        }
        
        // Remove old requests (older than 1 minute)
        $requests = array_filter($requests, function($time) use ($currentTime) {
            return $time > ($currentTime - 60);
        });
        
        // Check if limit exceeded
        if (count($requests) >= RATE_LIMIT_REQUESTS) {
            return false;
        }
        
        // Add current request
        $requests[] = $currentTime;
        file_put_contents($rateLimitFile, json_encode($requests));
        
        return true;
    }
    
    /**
     * Log the request
     */
    private function logRequest() {
        if (!LOG_ENABLED) {
            return;
        }
        
        $logEntry = sprintf(
            "[%s] %s - %s - %s - %s\n",
            date('Y-m-d H:i:s'),
            $_SERVER['REMOTE_ADDR'] ?? 'unknown',
            $this->subdomain,
            $_SERVER['REQUEST_METHOD'] ?? 'GET',
            $_SERVER['REQUEST_URI'] ?? '/'
        );
        
        file_put_contents(LOG_FILE, $logEntry, FILE_APPEND | LOCK_EX);
    }
    
    /**
     * Log errors
     */
    private function logError($message) {
        if (!LOG_ENABLED) {
            return;
        }
        
        $logEntry = sprintf(
            "[%s] ERROR: %s\n",
            date('Y-m-d H:i:s'),
            $message
        );
        
        file_put_contents(LOG_FILE, $logEntry, FILE_APPEND | LOCK_EX);
    }
}
