<?php
/**
 * Test script for ConnectUs Redirect System
 * This script simulates different subdomain requests for testing
 */

// Load configuration
require_once 'config/config.php';

// Test scenarios
$tests = [
    'main_domain' => [
        'host' => 'cnts.in',
        'path' => '/',
        'description' => 'Main domain root'
    ],
    'main_domain_api' => [
        'host' => 'cnts.in',
        'path' => '/api',
        'description' => 'Main domain API'
    ],
    'main_domain_health' => [
        'host' => 'cnts.in',
        'path' => '/health',
        'description' => 'Main domain health check'
    ],
    'common_subdomain' => [
        'host' => 'a.cnts.in',
        'path' => '/',
        'description' => 'Common subdomain root'
    ],
    'common_redirect' => [
        'host' => 'a.cnts.in',
        'path' => '/redirect?url=https://google.com',
        'description' => 'Common subdomain redirect'
    ],
    'common_shorten' => [
        'host' => 'a.cnts.in',
        'path' => '/shorten?url=https://example.com',
        'description' => 'Common subdomain shorten'
    ],
    'common_stats' => [
        'host' => 'a.cnts.in',
        'path' => '/stats',
        'description' => 'Common subdomain stats'
    ],
    'common_invoice_download' => [
        'host' => 'a.cnts.in',
        'path' => '/i/120e285a-a208-4bf0-ab87-307ea215f698',
        'description' => 'Invoice download endpoint'
    ],
    'common_payment_redirect' => [
        'host' => 'a.cnts.in',
        'path' => '/p/120e285a-a208-4bf0-ab87-307ea215f698',
        'description' => 'Payment redirect endpoint'
    ],
    'celero_subdomain' => [
        'host' => 'c.cnts.in',
        'path' => '/',
        'description' => 'Celero subdomain root'
    ],
    'celero_invoice_download' => [
        'host' => 'c.cnts.in',
        'path' => '/i/120e285a-a208-4bf0-ab87-307ea215f698',
        'description' => 'Celero invoice download endpoint'
    ],
    'celero_payment_redirect' => [
        'host' => 'c.cnts.in',
        'path' => '/p/120e285a-a208-4bf0-ab87-307ea215f698',
        'description' => 'Celero payment redirect endpoint'
    ],
    'celero_unsubscribe' => [
        'host' => 'c.cnts.in',
        'path' => '/u/120e285a-a208-4bf0-ab87-307ea215f698',
        'description' => 'Celero unsubscribe endpoint'
    ],
    'celero_email_collection' => [
        'host' => 'c.cnts.in',
        'path' => '/ec/8705b4aa-d577-47f9-8ef6-f210c65338f9',
        'description' => 'Celero email collection endpoint'
    ],
    'sample_subdomain' => [
        'host' => 'sample.cnts.in',
        'path' => '/',
        'description' => 'Sample subdomain root'
    ],
    'invalid_subdomain' => [
        'host' => 'invalid.cnts.in',
        'path' => '/',
        'description' => 'Invalid subdomain'
    ]
];

echo "🔗 ConnectUs Redirect System - Test Suite\n";
echo "==========================================\n\n";

foreach ($tests as $testName => $test) {
    echo "Testing: {$test['description']}\n";
    echo "URL: {$test['host']}{$test['path']}\n";
    
    // Simulate the request
    $_SERVER['HTTP_HOST'] = $test['host'];
    $_SERVER['REQUEST_URI'] = $test['path'];
    $_SERVER['REMOTE_ADDR'] = '127.0.0.1';
    $_SERVER['REQUEST_METHOD'] = 'GET';
    
    // Capture output
    ob_start();
    
    try {
        // Load and run the router
        require_once 'includes/Router.php';
        $router = new Router();
        $router->handleRequest();
        
        $output = ob_get_clean();
        
        // Check if it's a redirect
        if (strpos($output, 'Location:') !== false) {
            echo "✅ Redirect detected\n";
        } else {
            echo "✅ Response received\n";
        }
        
        // Show first 200 characters of response
        $preview = substr($output, 0, 200);
        if (strlen($output) > 200) {
            $preview .= '...';
        }
        echo "Response: " . $preview . "\n";
        
    } catch (Exception $e) {
        ob_end_clean();
        echo "❌ Error: " . $e->getMessage() . "\n";
    }
    
    echo "\n" . str_repeat('-', 50) . "\n\n";
}

echo "Test completed! Check the logs directory for detailed request logs.\n";
