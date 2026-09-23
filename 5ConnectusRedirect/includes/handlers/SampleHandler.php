<?php
/**
 * Sample Handler for sample.cnts.in subdomain
 * This is an example of how to create custom subdomain handlers
 */

class SampleHandler {
    
    public function process($path, $query) {
        // Parse query parameters
        $params = [];
        if ($query) {
            parse_str($query, $params);
        }
        
        // Handle different paths
        switch ($path) {
            case '/':
                $this->handleRoot();
                break;
                
            case '/custom':
                $this->handleCustom($params);
                break;
                
            case '/api':
                $this->handleApi();
                break;
                
            default:
                $this->handleNotFound();
                break;
        }
    }
    
    /**
     * Handle root path
     */
    private function handleRoot() {
        header('Content-Type: application/json');
        echo json_encode([
            'service' => 'Sample Service',
            'subdomain' => 'sample.cnts.in',
            'description' => 'This is a sample subdomain handler',
            'endpoints' => [
                '/' => 'Service information',
                '/custom' => 'Custom functionality',
                '/api' => 'API information'
            ]
        ]);
    }
    
    /**
     * Handle custom functionality
     */
    private function handleCustom($params) {
        $action = $params['action'] ?? 'default';
        
        switch ($action) {
            case 'process':
                $this->processData($params);
                break;
                
            case 'redirect':
                $this->customRedirect($params);
                break;
                
            default:
                header('Content-Type: application/json');
                echo json_encode([
                    'message' => 'Custom endpoint',
                    'available_actions' => ['process', 'redirect'],
                    'usage' => '?action=process&data=value'
                ]);
                break;
        }
    }
    
    /**
     * Handle API endpoint
     */
    private function handleApi() {
        header('Content-Type: application/json');
        echo json_encode([
            'api' => 'Sample API',
            'version' => '1.0.0',
            'endpoints' => [
                'GET /' => 'Get service information',
                'GET /custom' => 'Custom functionality',
                'GET /api' => 'API documentation'
            ]
        ]);
    }
    
    /**
     * Process data
     */
    private function processData($params) {
        $data = $params['data'] ?? '';
        
        if (empty($data)) {
            http_response_code(400);
            echo json_encode(['error' => 'Data parameter required']);
            return;
        }
        
        // Process the data (example)
        $processed = strtoupper($data);
        
        header('Content-Type: application/json');
        echo json_encode([
            'original' => $data,
            'processed' => $processed,
            'timestamp' => date('c')
        ]);
    }
    
    /**
     * Custom redirect functionality
     */
    private function customRedirect($params) {
        $url = $params['url'] ?? '';
        
        if (empty($url)) {
            http_response_code(400);
            echo json_encode(['error' => 'URL parameter required']);
            return;
        }
        
        if (!filter_var($url, FILTER_VALIDATE_URL)) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid URL provided']);
            return;
        }
        
        // Log the custom redirect
        $this->logCustomRedirect($url);
        
        // Perform redirect
        header("Location: {$url}");
        exit;
    }
    
    /**
     * Handle 404
     */
    private function handleNotFound() {
        http_response_code(404);
        echo json_encode(['error' => 'Not found']);
    }
    
    /**
     * Log custom redirect
     */
    private function logCustomRedirect($url) {
        if (!LOG_ENABLED) {
            return;
        }
        
        $logEntry = sprintf(
            "[%s] SAMPLE_REDIRECT: %s -> %s\n",
            date('Y-m-d H:i:s'),
            $_SERVER['REMOTE_ADDR'] ?? 'unknown',
            $url
        );
        
        file_put_contents(LOG_FILE, $logEntry, FILE_APPEND | LOCK_EX);
    }
}
