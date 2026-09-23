<?php
/**
 * Celero API Configuration
 * Store API credentials and endpoints
 */

// Celero API Configuration
define('CELERO_API_BASE_URL', 'https://celero.mosociete.com/api');
define('CELERO_EMAIL_COLLECTION_API_BASE_URL', 'https://celero.mosociete.com/api');
define('CELERO_DOMAIN', 'CELERO');
define('CELERO_USERNAME', 'spmohabuth@gmail.com');
define('CELERO_PASSWORD', 'Password12@!');

// API Endpoints
define('CELERO_AUTH_ENDPOINT', CELERO_API_BASE_URL . '/authenticate');
define('CELERO_DOWNLOAD_INVOICE_ENDPOINT', CELERO_API_BASE_URL . '/generate-get-invoice-sample');
define('CELERO_GET_FILE_ENDPOINT', CELERO_API_BASE_URL . '/get-file');
define('CELERO_PAYMENT_URL_ENDPOINT', CELERO_API_BASE_URL . '/get-invoice-payment-url');
define('CELERO_GET_EMAIL_COLLECTION_DETAIL_ENDPOINT', CELERO_EMAIL_COLLECTION_API_BASE_URL . '/get-email-collection-detail');
define('CELERO_SAVE_EMAIL_COLLECTION_DETAIL_ENDPOINT', CELERO_EMAIL_COLLECTION_API_BASE_URL . '/save-email-collection-detail');

// Request timeouts
define('CELERO_AUTH_TIMEOUT', 30);
define('CELERO_DOWNLOAD_TIMEOUT', 30);
define('CELERO_FILE_STREAM_TIMEOUT', 60);
