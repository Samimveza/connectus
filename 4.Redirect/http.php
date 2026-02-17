<?php

/**
 * Send POST request to API
 * 
 * @param string $url The URL to send the request to
 * @param array $data The data to send in the request
 * @return array|false Response data or false on failure
 */
function postRequest($url, $data = []) {
    $options = [
        'http' => [
            'header'  => "Content-type: application/json\r\n" .
                         "Domain: app.connectus.mu\r\n",
            'method'  => 'POST',
            'content' => json_encode($data),
            'ignore_errors' => true
        ]
    ];
    
    $context = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    
    if ($result === false) {
        return false;
    }
    
    return json_decode($result, true);
}

/**
 * Perform a redirect to the specified URL
 * 
 * @param string $url The URL to redirect to
 * @return void
 */
function redirectTo($url) {
    header("Location: " . $url);
    exit;
} 