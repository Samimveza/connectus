<?php
// Database configuration (for future use)
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'growdodo');

// Site configuration
//LOCAL
define('SITE_URL', 'http://app.connectus-local.mu:8080');
define('SITE_API_ENDPOINT', 'http://api.connectus-local.mu');

//LIVE
//define('SITE_URL', 'https://app.connectus.mu');
//define('SITE_API_ENDPOINT', 'https://api.connectus.mu');


define('SITE_TITLE', 'ConnectUs');
define('SITE_DESCRIPTION', 'ConnectUs');

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


// Error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);
?> 