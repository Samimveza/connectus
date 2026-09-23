<?php
// Include configuration file
require_once '../config/config.php';

// Set headers for JSON response
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

// Get the raw POST data
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Validate required fields
$required_fields = ['fullname', 'email', 'message', 'phoneNumber', 'slug'];
$missing_fields = [];

foreach ($required_fields as $field) {
    if (empty($data[$field])) {
        $missing_fields[] = $field;
    }
}

if (!empty($missing_fields)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Missing required fields: ' . implode(', ', $missing_fields)
    ]);
    exit();
}

// Validate email format
if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Invalid email format'
    ]);
    exit();
}

// Prepare the request data
$postData = json_encode([
    'fullname' => trim($data['fullname']),
    'email' => trim($data['email']),
    'message' => trim($data['message']),
    'phoneNumber' => trim($data['phoneNumber']),
    'slug' => trim($data['slug'])
]);

// Set up domain header (same logic as in company-profile-loader.php)
$domain = str_replace(':' . $_SERVER['SERVER_PORT'], '', $_SERVER['HTTP_HOST']);
$domainHeader = ($domain === 'connectus.mu') ? 'app.connectus.mu' : $domain;

// Set up the API endpoint
$apiEndpoint = SITE_API_ENDPOINT . '/api/add-message-for-structure-by-slug';

// cURL request
$ch = curl_init($apiEndpoint);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Domain: ' . $domainHeader
]);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);

// Handle cURL errors
if ($error) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Network error: ' . $error
    ]);
    exit();
}

// Parse the API response
$apiResponse = json_decode($response, true);

if ($httpCode !== 200) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'API server error (HTTP ' . $httpCode . ')'
    ]);
    exit();
}

// Check API response status
if (!isset($apiResponse['status'])) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Invalid API response format'
    ]);
    exit();
}

// Return the API response
if ($apiResponse['status'] == 10) {
    // Success
    echo json_encode([
        'success' => true,
        'message' => 'Message sent successfully! We\'ll get back to you soon.',
        'apiResponse' => $apiResponse
    ]);
} else {
    // Error
    $errorMessage = $apiResponse['errorMessage'] ?? 'Failed to send message';
    echo json_encode([
        'success' => false,
        'error' => $errorMessage,
        'apiResponse' => $apiResponse
    ]);
}
?> 