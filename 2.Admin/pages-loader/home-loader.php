<?php
// Include the API client
//require_once INCLUDES_PATH . '/api-client.php';

// Set page meta data
$page_title = "Home";
$page_description = "Support NGOs and charitable organizations through our donation platform";
$page_keywords = "ngo, donation, charity, fundraising, nonprofit, philanthropy, give back";
$page_url = SITE_URL . "/";
$page_image = SITE_URL . "/images/hero-donation.jpg";

// Add scripts for this page
$page_scripts = [
    '/js/ngo-filter.js'
];

// Add styles for this page
$page_styles = [
    '/css/custom.css'
];


// No longer need to calculate progress percentages since we removed the progress bar
?>

