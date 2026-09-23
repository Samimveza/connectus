<?php
// Page-specific variables
$currentPage = 'company-profile';
$showHeader = false;
$showFooter = false;

// Get the slug from the URL
$slug = isset($_GET['companyId']) ? $_GET['companyId'] : null;

if (!$slug) {
    header('Location: /404');
    exit();
}

// Set up the API endpoint
$apiEndpoint = SITE_API_ENDPOINT . '/api/structure-detail-by-slug';

// Prepare the request data
$postData = json_encode(['Slug' => $slug]);
$domain = str_replace(':' . $_SERVER['SERVER_PORT'], '', $_SERVER['HTTP_HOST']);
$domainHeader = ($domain === 'connectus.mu') ? 'app.connectus.mu' : $domain;

// cURL request
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

$companyData = null;
if ($httpCode == 200 && !$error) {
    $jsonResponse = json_decode($response, true);
    if (isset($jsonResponse['result']) && $jsonResponse['status'] == 10) {
        $companyData = $jsonResponse['result'];

    } else {
        header('Location: /404');
        exit();
    }
} else {
    //error_log('cURL Error: ' . $error . ' (HTTP Code: ' . $httpCode . ')');
    header('Location: /404');
    exit();
}

// Function to fix URL paths (replace backslashes with forward slashes)
function fixImageUrl($url) {
    if (empty($url)) return $url;
    return str_replace('\\', '/', $url);
}

// Function to recursively clean nodes (helper function for safeHtml)
function cleanNode($node, $allowedTags) {
    if ($node->nodeType === XML_TEXT_NODE) {
        return; // Keep text nodes
    }
    
    if ($node->nodeType === XML_ELEMENT_NODE) {
        $tagName = strtolower($node->nodeName);
        
        // If tag is not allowed, replace with text content
        if (!isset($allowedTags[$tagName])) {
            $textContent = $node->textContent;
            $textNode = $node->ownerDocument->createTextNode($textContent);
            $node->parentNode->replaceChild($textNode, $node);
            return;
        }
        
        // Clean attributes
        $allowedAttrs = $allowedTags[$tagName];
        $attributes = $node->attributes;
        
        if ($attributes) {
            for ($i = $attributes->length - 1; $i >= 0; $i--) {
                $attr = $attributes->item($i);
                $attrName = strtolower($attr->name);
                
                // Remove disallowed attributes
                if (!in_array($attrName, $allowedAttrs)) {
                    $node->removeAttribute($attr->name);
                }
                
                // Special handling for href attributes (only allow http/https)
                if ($attrName === 'href') {
                    $href = $attr->value;
                    if (!preg_match('/^https?:\/\//', $href)) {
                        $node->removeAttribute('href');
                    }
                }
            }
        }
    }
    
    // Recursively clean child nodes
    $children = $node->childNodes;
    for ($i = $children->length - 1; $i >= 0; $i--) {
        cleanNode($children->item($i), $allowedTags);
    }
}

// Function to safely render HTML content (allows specific tags while preventing XSS)
function safeHtml($html) {
    if (empty($html)) return $html;
    
    // Define allowed HTML tags and attributes
    $allowedTags = [
        'p' => ['class', 'style'],
        'br' => [],
        'strong' => [],
        'b' => [],
        'em' => [],
        'i' => [],
        'u' => [],
        'ul' => ['class'],
        'ol' => ['class'],
        'li' => ['class'],
        'h1' => ['class'],
        'h2' => ['class'],
        'h3' => ['class'],
        'h4' => ['class'],
        'h5' => ['class'],
        'h6' => ['class'],
        'a' => ['href', 'target', 'class', 'title'],
        'span' => ['class', 'style'],
        'div' => ['class', 'style'],
        'blockquote' => ['class'],
        'code' => ['class'],
        'pre' => ['class']
    ];
    
    // Use DOMDocument to parse and clean HTML
    $dom = new DOMDocument();
    
    // Suppress warnings for malformed HTML
    libxml_use_internal_errors(true);
    
    // Load HTML with UTF-8 encoding
    $dom->loadHTML('<?xml encoding="UTF-8">' . $html, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
    
    // Clear any libxml errors
    libxml_clear_errors();
    
    // Clean the document
    cleanNode($dom->documentElement, $allowedTags);
    
    // Get the cleaned HTML
    $cleanHtml = $dom->saveHTML();
    
    // Remove the XML declaration and extra whitespace
    $cleanHtml = preg_replace('/<\?xml[^>]*\?>/', '', $cleanHtml);
    $cleanHtml = trim($cleanHtml);
    
    return $cleanHtml;
}

// Function to sort arrays by displayOrder
function sortByDisplayOrder($array) {
    if (empty($array)) return $array;
    
    usort($array, function($a, $b) {
        $orderA = $a['displayOrder'] ?? 999;
        $orderB = $b['displayOrder'] ?? 999;
        return $orderA - $orderB;
    });
    
    return $array;
}

// Sort the data arrays by displayOrder
$sortedAccordions = sortByDisplayOrder($companyData['accordions'] ?? []);
$sortedAddresses = sortByDisplayOrder($companyData['addresses'] ?? []);
$sortedFeatures = sortByDisplayOrder($companyData['features'] ?? []);
$sortedGallery = sortByDisplayOrder($companyData['gallery'] ?? []);
$sortedMembers = sortByDisplayOrder($companyData['members'] ?? []);
$sortedPortfolios = sortByDisplayOrder($companyData['portfolios'] ?? []);

// Process company data for template use
$companyData['processed'] = [
    'name' => $companyData['companyName'] ?? 'Company Profile',
    'headline' => $companyData['headline'] ?? '',
    'description' => safeHtml($companyData['companyDescription'] ?? ''),
    'portfolio_title' => $companyData['portfolioTitle'] ?? '',
    'portfolio_description' => safeHtml($companyData['portfolioDescription'] ?? ''),
    'main_phone' => $companyData['mainPhoneNumber'] ?? '',
    'main_website' => $companyData['mainWebsite'] ?? '',
    'business_registration' => $companyData['businessRegistrationNumber'] ?? '',
    'email' => $companyData['email'] ?? '',
    'qr_code' => fixImageUrl($companyData['qrCodeUrl'] ?? ''),
    'page_url' => $companyData['fullSlugUrl'] ?? '',
    'profile_picture' => fixImageUrl($companyData['profilePicture']['url'] ?? ''),
    'cover_picture' => fixImageUrl($companyData['coverPicture']['url'] ?? ''),
    'categories' => $companyData['categories'] ?? [],
    'tags' => $companyData['tags'] ?? [],
    'features' => array_map(function($feature) {
        return [
            'name' => $feature['name'],
            'description' => safeHtml($feature['description'])
        ];
    }, $sortedFeatures),
    'members' => array_map(function($member) {
        if (isset($member['photo']['url'])) {
            $member['photo']['url'] = fixImageUrl($member['photo']['url']);
        }
        return [
            'firstname' => $member['firstname'],
            'lastname' => $member['lastname'],
            'title' => $member['title'],
            'description' => safeHtml($member['description']),
            'photo' => $member['photo'] ?? null
        ];
    }, $sortedMembers),
    'gallery' => array_map(function($galleryItem) {
        if (isset($galleryItem['image']['url'])) {
            $galleryItem['image']['url'] = fixImageUrl($galleryItem['image']['url']);
        }
        return [
            'name' => $galleryItem['name'],
            'description' => safeHtml($galleryItem['description']),
            'image' => $galleryItem['image']
        ];
    }, $sortedGallery),
    'accordions' => array_map(function($accordion) {
        return [
            'name' => $accordion['name'],
            'description' => safeHtml($accordion['description'])
        ];
    }, $sortedAccordions),
    'addresses' => $sortedAddresses,
    'structure_fields' => $companyData['structureFields'] ?? [],
    'working_hours' => $companyData['workingHours'] ?? null,
    'portfolios' => array_map(function($portfolio) {
        if (isset($portfolio['image']['url'])) {
            $portfolio['image']['url'] = fixImageUrl($portfolio['image']['url']);
        }
        if (isset($portfolio['additionalImages'])) {
            $portfolio['additionalImages'] = array_map(function($additionalImage) {
                if (isset($additionalImage['image']['url'])) {
                    $additionalImage['image']['url'] = fixImageUrl($additionalImage['image']['url']);
                }
                return $additionalImage;
            }, $portfolio['additionalImages']);
        }
        return [
            'name' => $portfolio['name'],
            'description' => safeHtml($portfolio['description']),
            'image' => $portfolio['image'],
            'additionalImages' => $portfolio['additionalImages'] ?? []
        ];
    }, $sortedPortfolios),
    'color_variant' => $companyData['colorVariant'] ?? null
];

// Set page variables for the main template
$page_title = $companyData['processed']['name'];
$page_description = strip_tags($companyData['processed']['description']);
$page_keywords = $companyData['processed']['name'] . ', ' . $companyData['processed']['headline'] . ', Company, ConnectUs';
$page_url = $companyData['processed']['page_url'];
$page_image = $companyData['processed']['profile_picture'];

$page_styles = [
    '/css/company.css',
];
$page_scripts = [
    '/js/company-profile.js'
];

?>