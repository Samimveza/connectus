<?php
// Component requirements
$isSideMenuRequired = true;

// Include portfolio authentication helper
require_once INCLUDES_PATH . '/portfolio-auth-helper.php';

// Page-specific variables
$currentPage = 'portfolio-detail';
$showHeader = false;
$showFooter = false;

// Get the profile and portfolio IDs from the URL
$slug = isset($_GET['profileId']) ? $_GET['profileId'] : null;
$portfolioId = isset($_GET['portfolioId']) ? $_GET['portfolioId'] : null;

if (!$slug || !$portfolioId) {
    header('Location: /404');
    exit();
}

// Set up the API endpoint
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
$profileData = null;
$portfolio = null;
if ($httpCode == 200 && !$error) {
    $jsonResponse = json_decode($response, true);
    if (isset($jsonResponse['result']) && $jsonResponse['status'] == 10) {
        $profileData = $jsonResponse['result'];
        
        // Check if portfolio requires password protection
        checkPortfolioAccess($profileData, $slug);
        
        // Find the portfolio by ID
        if (!empty($profileData['portfolios']) && is_array($profileData['portfolios'])) {
            foreach ($profileData['portfolios'] as $item) {
                if (!empty($item['slug']) && $item['slug'] === $portfolioId) {
                    $portfolio = $item;
                    break;
                }
            }
        }
        if (!$portfolio) {
            header('Location: /404');
            exit();
        }
        // Set page meta
        $page_title = !empty($portfolio['name']) ? $portfolio['name'] : 'Portfolio Project';
        $page_description = !empty($portfolio['description']) ? $portfolio['description'] : 'Project details on ConnectUs';
        $page_keywords = $page_title . ', Portfolio, Project, ConnectUs';
        $page_url = SITE_URL . '/in/' . $slug . '/portfolio/' . $portfolioId;
        $page_image = !empty($portfolio['image']['url']) ? $portfolio['image']['url'] : '';
    } else {
        header('Location: /404');
        exit();
    }
} else {
    //error_log('cURL Error: ' . $error . ' (HTTP Code: ' . $httpCode . ')');
    header('Location: /404');
    exit();
}

// Page styles and scripts
$page_styles = [
    '/css/in.css',
];

$page_scripts = [
    // Add any portfolio detail JS if needed
];
?>
