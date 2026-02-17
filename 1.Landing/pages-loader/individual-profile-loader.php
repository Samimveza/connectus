<?php
// Component requirements
$isSideMenuRequired = true;

// Page-specific variables
$currentPage = 'profile';
$showHeader = false;
$showFooter = false;

// Get the slug from the URL
$slug = isset($_GET['profileId']) ? $_GET['profileId'] : null;

if (!$slug) {
    header('Location: /404');
    exit();
}

// Set up the API endpoint
$apiEndpoint = SITE_API_ENDPOINT . '/api/structure-detail-by-slug';

// Determine domain header value
$domain = str_replace(':' . $_SERVER['SERVER_PORT'], '', $_SERVER['HTTP_HOST']);

//LIVE REPLACE
//$domainHeader = ($domain === 'connectus.mu') ? 'app.connectus.mu' : $domain;
$domainHeader = ($domain === 'connectus-local.mu') ? 'app.connectus-local.mu' : $domain;
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



if ($httpCode == 200 && !$error) {


    $jsonResponse = json_decode($response, true);
    if (isset($jsonResponse['result']) && $jsonResponse['status'] == 10) {
        $profileData = $jsonResponse['result'];
        
        // Set page title
        $fullName = trim($profileData['firstname'] . ' ' . $profileData['lastname']);
        $pageTitle = $fullName;
        
        // Create a descriptive title for better SEO
        if (!empty($profileData['headline']) && !empty($profileData['workingOrganisation'])) {
            $pageTitle = "$fullName - " . $profileData['headline'] . " at " . $profileData['workingOrganisation'];
        } elseif (!empty($profileData['headline'])) {
            $pageTitle = "$fullName - " . $profileData['headline'];
        }
        
        // Don't include the site name in the page title as index.php will append it
        $page_title = $pageTitle;
        
        // Set additional metadata
        // Create a rich description with job title and organization if available
        $page_description = "View $fullName's digital profile on ConnectUs";
        if (!empty($profileData['headline']) && !empty($profileData['workingOrganisation'])) {
            $page_description = "$fullName is " . $profileData['headline'] . " at " . $profileData['workingOrganisation'] . ". Connect with $fullName on ConnectUs.";
        } elseif (!empty($profileData['headline'])) {
            $page_description = "$fullName is " . $profileData['headline'] . ". Connect with $fullName on ConnectUs.";
        } elseif (!empty($profileData['workingOrganisation'])) {
            $page_description = "$fullName works at " . $profileData['workingOrganisation'] . ". Connect with $fullName on ConnectUs.";
        }
        
        // Generate rich keywords including name, profession, location if available
        $keywords = [$fullName];
        if (!empty($profileData['firstname'])) $keywords[] = $profileData['firstname'];
        if (!empty($profileData['lastname'])) $keywords[] = $profileData['lastname'];
        if (!empty($profileData['headline'])) $keywords[] = $profileData['headline'];
        if (!empty($profileData['workingOrganisation'])) $keywords[] = $profileData['workingOrganisation'];
        
        // Add location keywords if available
        if (!empty($profileData['addresses']) && is_array($profileData['addresses'])) {
            $address = $profileData['addresses'][0];
            if (!empty($address['city'])) $keywords[] = $address['city'];
            if (!empty($address['country'])) $keywords[] = $address['country'];
        }
        
        // Add common keywords related to digital profiles
        $keywords = array_merge($keywords, ['Digital Profile', 'Contact Card', 'Professional Profile', 'ConnectUs']);
        
        $page_keywords = implode(', ', $keywords);
        $page_url = !empty($profileData['fullSlugUrl']) ? $profileData['fullSlugUrl'] : (SITE_URL . '/in/' . $slug);
        $page_image = !empty($profileData['profilePicture']['url']) ? $profileData['profilePicture']['url'] : '';
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
    '/js/profile-actions.js',
];
?>