<?php
/**
 * Portfolio Authentication Helper Functions
 */

/**
 * Check if user is authenticated for a specific portfolio
 * @param string $slug The portfolio slug
 * @return bool True if authenticated, false otherwise
 */
function isPortfolioAuthenticated($slug) {
    
    // Only start session if not already active
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }
    
    // Check if authentication exists and is not expired (24 hours)
    $authKey = 'portfolio_auth_' . $slug;
    $timeKey = 'portfolio_auth_time_' . $slug;
    
    if (isset($_SESSION[$authKey]) && $_SESSION[$authKey] === true) {
        $authTime = $_SESSION[$timeKey] ?? 0;
        $currentTime = time();
        
        // Check if authentication is still valid (24 hours)
        if (($currentTime - $authTime) < 86400) {
            return true;
        } else {
            // Authentication expired, remove it
            unset($_SESSION[$authKey]);
            unset($_SESSION[$timeKey]);
        }
    }
    
    return false;
}

/**
 * Check if portfolio requires password protection
 * @param array $portfolioData The portfolio data from API
 * @return bool True if password protection is enabled, false otherwise
 */
function isPortfolioPasswordProtected($portfolioData) {
    // Check if portfolioPasswordIsEnabled field exists and is true
    return isset($portfolioData['portfolioPasswordIsEnabled']) && 
           $portfolioData['portfolioPasswordIsEnabled'] === true;
}

/**
 * Redirect to password page if portfolio is password protected and user is not authenticated
 * @param array $portfolioData The portfolio data from API
 * @param string $slug The portfolio slug
 */
function checkPortfolioAccess($portfolioData, $slug) {
    if (isPortfolioPasswordProtected($portfolioData) && !isPortfolioAuthenticated($slug)) {
        // Ensure session is started before setting session variables
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        
        // Store the current URL to redirect back after authentication
        $_SESSION['portfolio_redirect_url'] = $_SERVER['REQUEST_URI'];

        header('Location: /portfolio-password');
        exit();
    }
}

/**
 * Get the current domain header value
 * @return string The domain header value
 */
function getDomainHeader() {
    $domain = str_replace(':' . $_SERVER['SERVER_PORT'], '', $_SERVER['HTTP_HOST']);
    return ($domain === 'connectus.mu') ? 'app.connectus.mu' : $domain;
}


?> 