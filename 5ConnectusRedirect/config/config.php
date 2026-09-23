<?php
/**
 * Configuration file for ConnectUs Redirect System
 */

// Base domain configuration
define('BASE_DOMAIN', 'cnts.in');
define('COMMON_SUBDOMAIN', 'a');

// Database configuration (if needed)
define('DB_HOST', 'localhost');
define('DB_NAME', 'connectus_redirect');
define('DB_USER', 'root');
define('DB_PASS', '');

// Logging configuration
define('LOG_ENABLED', true);
define('LOG_FILE', __DIR__ . '/../logs/redirect.log');

// Security settings
define('ALLOWED_ORIGINS', ['*']); // Configure as needed
define('RATE_LIMIT_ENABLED', true);
define('RATE_LIMIT_REQUESTS', 100); // requests per minute

// Error reporting
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/../logs/error.log');

// Timezone
date_default_timezone_set('UTC');
