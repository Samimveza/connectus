<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Domain');

require_once __DIR__ . '/../config/config.php';

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

// Get the request body
$input = json_decode(file_get_contents('php://input'), true);

if (!$input || !isset($input['slug']) || !isset($input['password'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required parameters']);
    exit();
}

$slug = $input['slug'];
$password = $input['password'];

// Get domain from header
$domain = $_SERVER['HTTP_DOMAIN'] ?? $_SERVER['HTTP_HOST'] ?? '';
$domainHeader = ($domain === 'connectus.mu') ? 'app.connectus.mu' : $domain;

// Call the external API to verify password
$apiEndpoint = SITE_API_ENDPOINT . '/api/structure-portfolio-password-verify-by-slug';

$postData = json_encode([
    'slug' => $slug,
    'password' => $password
]);

$ch = curl_init($apiEndpoint);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Domain: ' . $domainHeader
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);

if ($httpCode == 200 && !$error) {
    $jsonResponse = json_decode($response, true);
    
    if (isset($jsonResponse['result']) && $jsonResponse['status'] == 10) {
        $isValid = $jsonResponse['result']['isValid'] ?? false;
        
        if ($isValid) {
            // Store authentication in session
            session_start();
            $_SESSION['portfolio_auth_' . $slug] = true;
            $_SESSION['portfolio_auth_time_' . $slug] = time();
        }
        
        echo json_encode([
            'result' => [
                'isValid' => $isValid
            ],
            'status' => 10,
            'errorMessage' => null
        ]);
    } else {
        echo json_encode([
            'result' => [
                'isValid' => false
            ],
            'status' => 11,
            'errorMessage' => $jsonResponse['errorMessage'] ?? 'Verification failed'
        ]);
    }
} else {
    echo json_encode([
        'result' => [
            'isValid' => false
        ],
        'status' => 11,
        'errorMessage' => 'API request failed'
    ]);
}
?> 