# URL Redirect Portal

A simple PHP-based redirect portal that fetches destination URLs from an API and redirects users accordingly.

## Overview

This application works as follows:
1. User visits a URL like `https://cnts.in/SLUG` or directly enters a slug in the base URL
2. The application extracts the slug from the URL
3. It sends a POST request to the API (`http://apilocal.connectus.mu/api/structure-slug-from-system-slug`) with the slug
4. Based on the API response, it redirects the user to the destination URL
5. If the API returns a status other than 10 or fails, it redirects to the default URL (`https://connectus.mu`)

## Files

- `index.php` - Main entry point that handles requests and redirects
- `config.php` - Configuration settings including API URL and default redirect
- `http.php` - HTTP utility functions for API communication
- `logger.php` - Optional logging functionality for debugging
- `.htaccess` - Apache configuration to route all requests to index.php
- `error.php` - Error page with helpful messages and auto-redirect

## Setup

1. Upload all files to your web server
2. Ensure the server has PHP 7.0+ installed
3. Make sure mod_rewrite is enabled if using Apache
4. Set the appropriate permissions for the directory (usually 755)
5. If debugging is needed, enable logging in index.php by uncommenting `Logger::setEnabled(true);`

## API Communication

The API request is sent with:
- Content-type: application/json
- Domain: app.connectus.mu

## API Response Format

The API should return a response in the following format:

```json
{
    "result": {
        "url": "https://connectus.mu/in/shameem..mowlas=1"
    },
    "status": 10,
    "errorMessage": null
}
```

If status is 10, the user will be redirected to the URL in result.url.

## Debugging

To enable logging:
1. Uncomment the line `// Logger::setEnabled(true);` in index.php
2. Ensure the web server has write permissions to create the log file
3. Check the `redirect.log` file for debugging information 