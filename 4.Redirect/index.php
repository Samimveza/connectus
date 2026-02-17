<?php
// Include necessary files
require_once 'config.php';
require_once 'http.php';
require_once 'logger.php';

// Enable logging for debugging if needed
// Logger::setEnabled(true);

// Function to redirect to error page
function redirectToError($message = '') {
    $errorUrl = 'error.php';
    if (!empty($message)) {
        $errorUrl .= '?message=' . urlencode($message);
    }
    redirectTo($errorUrl);
}

// Extract slug from URL request
$requestUri = $_SERVER['REQUEST_URI'];
$path = trim(parse_url($requestUri, PHP_URL_PATH), '/');

Logger::log('Received request', [
    'uri' => $requestUri,
    'path' => $path
]);

// If there's no path, redirect to default
if (empty($path)) {
    Logger::log('Empty path, redirecting to default');
    redirectTo(DEFAULT_REDIRECT);
}

// Format the input slug for API request
// Need to check if the format is like https://cnts.in/SLUG
// If so, extract just the SLUG part, otherwise use the whole path
$slug = $path;
if (preg_match('/^(?:https?:\/\/cnts\.in\/)?(.+)$/', $path, $matches)) {
    $slug = $matches[1];
}

Logger::log('Extracted slug', $slug);

// Prepare API request data
$data = [
    'slug' => $slug
];

// Make API request
Logger::log('Making API request', $data);
$response = postRequest(API_URL, $data);
Logger::log('API response', $response);

// Check if request was successful
if ($response === false) {
    // API request failed, redirect to error page
    Logger::log('API request failed, redirecting to error');
    redirectToError('Unable to connect to the redirect service. Please try again later.');
}

// Check status code
if (isset($response['status']) && $response['status'] === STATUS_SUCCESS) {
    // Successfully retrieved URL, redirect to it
    if (isset($response['result']['url']) && !empty($response['result']['url'])) {
        Logger::log('Successful redirect to', $response['result']['url']);
        redirectTo($response['result']['url']);
    } else {
        // Empty URL in response
        Logger::log('Empty URL in response');
        redirectToError('Invalid destination URL received.');
    }
} else {
    // Error status code
    $errorMessage = isset($response['errorMessage']) && !empty($response['errorMessage']) 
        ? $response['errorMessage'] 
        : 'Unable to process the redirect request.';
    
    Logger::log('Error status code', [
        'status' => isset($response['status']) ? $response['status'] : 'unknown',
        'message' => $errorMessage
    ]);
    
    redirectToError($errorMessage);
}

// Default fallback if anything fails
Logger::log('Fallback redirect to default');
redirectTo(DEFAULT_REDIRECT);
