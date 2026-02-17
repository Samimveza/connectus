<?php
// Component requirements
$isSideMenuRequired = true;

// Include portfolio authentication helper
require_once INCLUDES_PATH . '/portfolio-auth-helper.php';

// Page-specific variables
$currentPage = 'portfolio';
$showHeader = false;
$showFooter = false;

// Get the slug from the URL
$slug = isset($_GET['profileId']) ? $_GET['profileId'] : null;

if (!$slug) {
    header('Location: /404');
    exit();
}

// Set up the API endpoint for portfolio
$apiEndpoint = SITE_API_ENDPOINT . '/api/structure-detail-by-slug';

// Determine domain header value
$domainHeader = getDomainHeader();

// Prepare the request data
$postData = json_encode(['Slug' => $slug]);
// Set up cURL request
$ch = curl_init($apiEndpoint);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Domain: ' . $domainHeader
]);

// Execute the request
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);

// Process the response
$portfolioData = null;
if ($httpCode == 200 && !$error) {
    $jsonResponse = json_decode($response, true);
    if (isset($jsonResponse['result']) && $jsonResponse['status'] == 10) {
        $portfolioData = $jsonResponse['result'];

        // Check if portfolio requires password protection
        checkPortfolioAccess($portfolioData, $slug);
        
        // Set page title and meta
        $fullName = trim($portfolioData['firstname'] . ' ' . $portfolioData['lastname']);
        $pageTitle = $fullName . ' Portfolio';
        $page_title = $pageTitle;
        $page_description = "View $fullName's project portfolio on ConnectUs";
        $page_keywords = $fullName . ', Portfolio, Projects, ConnectUs';
        $page_url = !empty($portfolioData['fullSlugUrl']) ? $portfolioData['fullSlugUrl'] . '/portfolio' : (SITE_URL . '/in/' . $slug . '/portfolio');
        $page_image = !empty($portfolioData['profilePicture']['url']) ? $portfolioData['profilePicture']['url'] : '';
    } else {
        // API returned an error or invalid response
        header('Location: /404');
        exit();
    }
} else {
    // Log the curl error for debugging
    //error_log('cURL Error: ' . $error . ' (HTTP Code: ' . $httpCode . ')');
    // API call failed
    header('Location: /404');
    exit();
}
// Page styles and scripts
$page_styles = [
    '/css/in.css',
];

$page_scripts = [
    // Add any portfolio-specific JS if needed
];
?>
