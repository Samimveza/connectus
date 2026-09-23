<?php
/**
 * Main Domain Handler for cnts.in
 * Provides information about the service and available subdomains
 */

class MainDomainHandler {
    
    public function process($path, $query) {
        switch ($path) {
            case '/':
                $this->handleRoot();
                break;
                
            case '/api':
                $this->handleApi();
                break;
                
            case '/health':
                $this->handleHealth();
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
        header('Content-Type: text/html');
        echo $this->getHtmlResponse();
    }
    
    /**
     * Handle API endpoint
     */
    private function handleApi() {
        header('Content-Type: application/json');
        echo json_encode([
            'service' => 'ConnectUs Redirect System',
            'version' => '1.0.0',
            'base_domain' => BASE_DOMAIN,
            'subdomains' => [
                'a' => [
                    'description' => 'Common redirect service',
                    'url' => 'https://a.' . BASE_DOMAIN,
                    'features' => [
                        'URL shortening',
                        'Direct redirects',
                        'Statistics tracking'
                    ]
                ],
                'c' => [
                    'description' => 'Celero integration service',
                    'url' => 'https://c.' . BASE_DOMAIN,
                    'features' => [
                        'Invoice downloads',
                        'Payment redirects',
                        'Celero API integration'
                    ]
                ]
            ],
            'endpoints' => [
                '/' => 'Service information',
                '/api' => 'API information',
                '/health' => 'Health check'
            ]
        ]);
    }
    
    /**
     * Handle health check
     */
    private function handleHealth() {
        header('Content-Type: application/json');
        
        $health = [
            'status' => 'healthy',
            'timestamp' => date('c'),
            'uptime' => $this->getUptime(),
            'services' => [
                'router' => 'ok',
                'logging' => LOG_ENABLED ? 'enabled' : 'disabled',
                'rate_limiting' => RATE_LIMIT_ENABLED ? 'enabled' : 'disabled'
            ]
        ];
        
        echo json_encode($health);
    }
    
    /**
     * Handle 404
     */
    private function handleNotFound() {
        http_response_code(404);
        header('Content-Type: application/json');
        echo json_encode(['error' => 'Not found']);
    }
    
    /**
     * Get HTML response for root
     */
    private function getHtmlResponse() {
        return '<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ConnectUs Redirect System</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            color: #333;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 10px;
            padding: 40px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        h1 {
            color: #667eea;
            text-align: center;
            margin-bottom: 30px;
        }
        .subdomain {
            background: #f8f9fa;
            border: 1px solid #e9ecef;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        .subdomain h3 {
            color: #495057;
            margin-top: 0;
        }
        .url {
            background: #e3f2fd;
            padding: 10px;
            border-radius: 5px;
            font-family: monospace;
            margin: 10px 0;
        }
        .features {
            list-style: none;
            padding: 0;
        }
        .features li {
            background: #e8f5e8;
            margin: 5px 0;
            padding: 8px 15px;
            border-radius: 20px;
            display: inline-block;
            margin-right: 10px;
        }
        .api-link {
            text-align: center;
            margin-top: 30px;
        }
        .api-link a {
            background: #667eea;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 5px;
            display: inline-block;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔗 ConnectUs Redirect System</h1>
        
        <p>Welcome to the ConnectUs Redirect System. This service provides URL redirection and shortening capabilities through various subdomains.</p>
        
        <div class="subdomain">
            <h3>📎 Common Redirect Service (a.cnts.in)</h3>
            <div class="url">https://a.' . BASE_DOMAIN . '</div>
            <p>This is the main redirect service that handles:</p>
            <ul class="features">
                <li>URL Shortening</li>
                <li>Direct Redirects</li>
                <li>Statistics Tracking</li>
                <li>Click Analytics</li>
            </ul>
        </div>
        
        <div class="subdomain">
            <h3>🏢 Celero Integration Service (c.cnts.in)</h3>
            <div class="url">https://c.' . BASE_DOMAIN . '</div>
            <p>This service integrates with Celero API for:</p>
            <ul class="features">
                <li>Invoice Downloads</li>
                <li>Payment Redirects</li>
                <li>Celero API Integration</li>
                <li>Secure File Streaming</li>
            </ul>
        </div>
        
        <div class="api-link">
            <a href="/api">View API Documentation</a>
        </div>
    </div>
</body>
</html>';
    }
    
    /**
     * Get system uptime
     */
    private function getUptime() {
        if (function_exists('sys_getloadavg')) {
            $load = sys_getloadavg();
            return [
                'load_average' => $load,
                'memory_usage' => memory_get_usage(true),
                'peak_memory' => memory_get_peak_usage(true)
            ];
        }
        
        return [
            'memory_usage' => memory_get_usage(true),
            'peak_memory' => memory_get_peak_usage(true)
        ];
    }
}
