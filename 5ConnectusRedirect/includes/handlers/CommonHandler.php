<?php
/**
 * Common Handler for a.cnts.in subdomain
 * Handles redirects to actual URLs and URL shortening
 */

class CommonHandler {
    
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
                
            case '/redirect':
                $this->handleRedirect($params);
                break;
                
            case '/shorten':
                $this->handleShorten($params);
                break;
                
            case '/stats':
                $this->handleStats($params);
                break;
                
            default:
                // Check if it's a short URL
                $shortCode = trim($path, '/');
                if ($shortCode) {
                    $this->handleShortUrl($shortCode);
                } else {
                    $this->handleNotFound();
                }
                break;
        }
    }
    
    /**
     * Handle root path
     */
    private function handleRoot() {
        header('Content-Type: application/json');
        echo json_encode([
            'service' => 'ConnectUs Redirect Service',
            'subdomain' => 'a.cnts.in',
            'endpoints' => [
                '/redirect' => 'Redirect to URL with parameters',
                '/shorten' => 'Create short URL',
                '/stats' => 'Get redirect statistics',
                '/{shortCode}' => 'Redirect using short code'
            ]
        ]);
    }
    
    /**
     * Handle redirect requests
     */
    private function handleRedirect($params) {
        $url = $params['url'] ?? null;
        $target = $params['target'] ?? null;
        
        if (!$url && !$target) {
            http_response_code(400);
            echo json_encode(['error' => 'URL or target parameter required']);
            return;
        }
        
        $redirectUrl = $url ?: $target;
        
        // Validate URL
        if (!filter_var($redirectUrl, FILTER_VALIDATE_URL)) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid URL provided']);
            return;
        }
        
        // Log the redirect
        $this->logRedirect($redirectUrl);
        
        // Perform redirect
        header("Location: {$redirectUrl}");
        exit;
    }
    
    /**
     * Handle URL shortening
     */
    private function handleShorten($params) {
        $url = $params['url'] ?? null;
        
        if (!$url) {
            http_response_code(400);
            echo json_encode(['error' => 'URL parameter required']);
            return;
        }
        
        // Validate URL
        if (!filter_var($url, FILTER_VALIDATE_URL)) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid URL provided']);
            return;
        }
        
        // Generate short code
        $shortCode = $this->generateShortCode();
        
        // Store the mapping (in production, use database)
        $this->storeShortUrl($shortCode, $url);
        
        // Return the short URL
        $shortUrl = "https://a." . BASE_DOMAIN . "/{$shortCode}";
        
        header('Content-Type: application/json');
        echo json_encode([
            'original_url' => $url,
            'short_url' => $shortUrl,
            'short_code' => $shortCode
        ]);
    }
    
    /**
     * Handle short URL redirects
     */
    private function handleShortUrl($shortCode) {
        // Get the original URL (in production, use database)
        $originalUrl = $this->getOriginalUrl($shortCode);
        
        if (!$originalUrl) {
            $this->handleNotFound();
            return;
        }
        
        // Log the redirect
        $this->logRedirect($originalUrl, $shortCode);
        
        // Perform redirect
        header("Location: {$originalUrl}");
        exit;
    }
    
    /**
     * Handle statistics
     */
    private function handleStats($params) {
        $shortCode = $params['code'] ?? null;
        
        if ($shortCode) {
            // Get stats for specific short code
            $stats = $this->getShortCodeStats($shortCode);
        } else {
            // Get general stats
            $stats = $this->getGeneralStats();
        }
        
        header('Content-Type: application/json');
        echo json_encode($stats);
    }
    
    /**
     * Handle 404
     */
    private function handleNotFound() {
        http_response_code(404);
        echo json_encode(['error' => 'Not found']);
    }
    
    /**
     * Generate a short code
     */
    private function generateShortCode($length = 6) {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $code = '';
        
        for ($i = 0; $i < $length; $i++) {
            $code .= $characters[rand(0, strlen($characters) - 1)];
        }
        
        return $code;
    }
    
    /**
     * Store short URL mapping
     */
    private function storeShortUrl($shortCode, $url) {
        $data = [
            'code' => $shortCode,
            'url' => $url,
            'created_at' => date('Y-m-d H:i:s'),
            'clicks' => 0
        ];
        
        $file = __DIR__ . '/../../data/short_urls.json';
        $this->ensureDataDirectory();
        
        $urls = [];
        if (file_exists($file)) {
            $urls = json_decode(file_get_contents($file), true) ?: [];
        }
        
        $urls[$shortCode] = $data;
        file_put_contents($file, json_encode($urls, JSON_PRETTY_PRINT));
    }
    
    /**
     * Get original URL from short code
     */
    private function getOriginalUrl($shortCode) {
        $file = __DIR__ . '/../../data/short_urls.json';
        
        if (!file_exists($file)) {
            return null;
        }
        
        $urls = json_decode(file_get_contents($file), true) ?: [];
        return $urls[$shortCode]['url'] ?? null;
    }
    
    /**
     * Get statistics for a specific short code
     */
    private function getShortCodeStats($shortCode) {
        $file = __DIR__ . '/../../data/short_urls.json';
        
        if (!file_exists($file)) {
            return ['error' => 'No data available'];
        }
        
        $urls = json_decode(file_get_contents($file), true) ?: [];
        
        if (!isset($urls[$shortCode])) {
            return ['error' => 'Short code not found'];
        }
        
        return [
            'short_code' => $shortCode,
            'original_url' => $urls[$shortCode]['url'],
            'created_at' => $urls[$shortCode]['created_at'],
            'clicks' => $urls[$shortCode]['clicks']
        ];
    }
    
    /**
     * Get general statistics
     */
    private function getGeneralStats() {
        $file = __DIR__ . '/../../data/short_urls.json';
        
        if (!file_exists($file)) {
            return [
                'total_urls' => 0,
                'total_clicks' => 0
            ];
        }
        
        $urls = json_decode(file_get_contents($file), true) ?: [];
        
        $totalClicks = 0;
        foreach ($urls as $url) {
            $totalClicks += $url['clicks'] ?? 0;
        }
        
        return [
            'total_urls' => count($urls),
            'total_clicks' => $totalClicks
        ];
    }
    
    /**
     * Log redirect activity
     */
    private function logRedirect($url, $shortCode = null) {
        if (!LOG_ENABLED) {
            return;
        }
        
        $logEntry = sprintf(
            "[%s] REDIRECT: %s -> %s (Code: %s)\n",
            date('Y-m-d H:i:s'),
            $_SERVER['REMOTE_ADDR'] ?? 'unknown',
            $url,
            $shortCode ?? 'direct'
        );
        
        file_put_contents(LOG_FILE, $logEntry, FILE_APPEND | LOCK_EX);
        
        // Update click count if it's a short URL
        if ($shortCode) {
            $this->incrementClickCount($shortCode);
        }
    }
    
    /**
     * Increment click count for a short code
     */
    private function incrementClickCount($shortCode) {
        $file = __DIR__ . '/../../data/short_urls.json';
        
        if (!file_exists($file)) {
            return;
        }
        
        $urls = json_decode(file_get_contents($file), true) ?: [];
        
        if (isset($urls[$shortCode])) {
            $urls[$shortCode]['clicks'] = ($urls[$shortCode]['clicks'] ?? 0) + 1;
            file_put_contents($file, json_encode($urls, JSON_PRETTY_PRINT));
        }
    }
    
    /**
     * Ensure data directory exists
     */
    private function ensureDataDirectory() {
        $dataDir = __DIR__ . '/../../data';
        if (!is_dir($dataDir)) {
            mkdir($dataDir, 0755, true);
        }
    }
}
