<?php
// Database configuration (for future use)
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'growdodo');

// Site configuration
//LIVE REPLACE
//define('SITE_URL', 'http://app.connectus-local.mu');
//define('SITE_API_ENDPOINT', 'http://api.connectus-local.mu');

define('SITE_URL', 'https://app.connectus.mu');
define('SITE_API_ENDPOINT', 'https://api.connectus.mu');

define('SITE_TITLE', 'ConnectUs - Digital Identity & Smart Contact Sharing Platform');
define('SITE_DESCRIPTION', 'ConnectUs is a smart digital identity platform enabling seamless contact sharing via NFC or QR codes, while securely managing professional connections, receipts, and loyalty rewards.');

// Pagination settings
define('NGOS_PER_PAGE', 9); // Number of NGOs to display per page
define('CAMPAIGNS_PER_PAGE', 6); // Number of campaigns to display per page

// Directory paths
define('ROOT_PATH', dirname(__DIR__));
define('INCLUDES_PATH', ROOT_PATH . '/includes');
define('COMPONENTS_PATH', ROOT_PATH . '/components');
define('PAGES_PATH', ROOT_PATH . '/pages');
define('ENTITIES_PATH', ROOT_PATH . '/entities');

define('MAP_API_KEY', 'AIzaSyD5TqpmvNT4_AA71rYsvw-39QRHKTwIhtU');


// Error reporting - exclude deprecated messages
error_reporting(E_ALL & ~E_DEPRECATED & ~E_STRICT);
ini_set('display_errors', 1);
?>