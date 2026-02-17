<?php
// Login page loader
$page_title = 'Profile';
$page_description = 'Profile page';
$includeFooter = false; // Don't include the footer on login page

// Use the shared custom.css file instead of a specific login.css
$page_styles = [
    '/css/custom.css',
    '/css/profile-page.css'
];

// Add any specific scripts for the login page
$page_scripts = [
    '/js/profile-page.js'
];
?> 