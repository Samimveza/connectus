<?php
/**
 * ConnectUs Redirect System
 * Main entry point for subdomain-based routing
 */

// Load configuration
require_once 'config/config.php';

// Load the router
require_once 'includes/Router.php';

// Initialize and run the router
$router = new Router();
$router->handleRequest();
