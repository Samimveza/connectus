# ConnectUs Redirect System

A comprehensive URL redirection and shortening system that handles different functionalities based on subdomains.

## Overview

This system provides URL redirection capabilities through various subdomains, with each subdomain having specific functionality. The common subdomain `a.cnts.in` handles general redirect operations.

## Project Structure

```
connectus-redirect/
├── index.php                 # Main entry point
├── config/
│   └── config.php           # Configuration settings
├── includes/
│   ├── Router.php           # Main routing logic
│   └── handlers/
│       ├── CommonHandler.php    # Handles a.cnts.in
│       ├── MainDomainHandler.php # Handles cnts.in
│       └── SampleHandler.php     # Example custom handler
├── data/                    # Data storage (JSON files)
├── logs/                    # Log files
└── README.md               # This file
```

## Features

### Common Subdomain (a.cnts.in)
- **URL Shortening**: Create short URLs for long links
- **Direct Redirects**: Immediate redirects with URL parameters
- **Statistics Tracking**: Track clicks and usage analytics
- **API Endpoints**: RESTful API for programmatic access

### Celero Subdomain (c.cnts.in)
- **Invoice Downloads**: Download invoice files via `/i/{invoiceId}`
- **Payment Redirects**: Redirect to payment pages via `/p/{invoiceId}`
- **Celero API Integration**: Seamless integration with Celero services

### Main Domain (cnts.in)
- **Service Information**: Overview of available services
- **API Documentation**: Information about available endpoints
- **Health Check**: System status monitoring

### Custom Subdomains
- **Modular Design**: Easy to add new subdomain handlers
- **Flexible Functionality**: Each subdomain can have unique features
- **Consistent Interface**: Standardized handler structure

## Usage

### URL Shortening
```bash
# Create a short URL
curl "https://a.cnts.in/shorten?url=https://example.com"

# Use the short URL
curl "https://a.cnts.in/abc123"
```

### Direct Redirects
```bash
# Direct redirect
curl "https://a.cnts.in/redirect?url=https://example.com"
```

### Statistics
```bash
# Get general statistics
curl "https://a.cnts.in/stats"

# Get specific short code statistics
curl "https://a.cnts.in/stats?code=abc123"
```

### Celero Integration (c.cnts.in)
```bash
# Download invoice file
curl "https://c.cnts.in/i/120e285a-a208-4bf0-ab87-307ea215f698"

# Redirect to payment page
curl "https://c.cnts.in/p/120e285a-a208-4bf0-ab87-307ea215f698"
```

### Health Check
```bash
# Check system health
curl "https://cnts.in/health"
```

## Configuration

Edit `config/config.php` to customize:

- **Base Domain**: Change `BASE_DOMAIN` constant
- **Common Subdomain**: Modify `COMMON_SUBDOMAIN` constant
- **Rate Limiting**: Adjust `RATE_LIMIT_REQUESTS`
- **Logging**: Enable/disable logging with `LOG_ENABLED`
- **Database**: Configure database settings if needed

## Adding New Subdomains

1. Create a new handler file in `includes/handlers/`
2. Follow the naming convention: `{SubdomainName}Handler.php`
3. Implement the `process($path, $query)` method
4. The router will automatically detect and load your handler

Example:
```php
// includes/handlers/MySubdomainHandler.php
class MySubdomainHandler {
    public function process($path, $query) {
        // Your custom logic here
    }
}
```

## API Endpoints

### a.cnts.in Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Service information |
| `/redirect` | GET | Direct URL redirect |
| `/shorten` | GET | Create short URL |
| `/stats` | GET | Get statistics |
| `/{shortCode}` | GET | Redirect using short code |

### c.cnts.in Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Service information |
| `/api` | GET | API documentation |
| `/i/{invoiceId}` | GET | Download invoice file |
| `/p/{invoiceId}` | GET | Redirect to payment page |

### cnts.in Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Service overview |
| `/api` | GET | API documentation |
| `/health` | GET | Health check |

## Security Features

- **Rate Limiting**: Configurable request limits per IP
- **Input Validation**: URL validation and sanitization
- **Error Handling**: Comprehensive error management
- **Logging**: Request and error logging

## Data Storage

Currently uses JSON files for data storage:
- `data/short_urls.json`: Short URL mappings
- `logs/redirect.log`: Request logs
- `logs/error.log`: Error logs

For production, consider using a database for better performance and scalability.

## Requirements

- PHP 7.4 or higher
- Web server (Apache/Nginx)
- Write permissions for `data/` and `logs/` directories

## Installation

1. Clone or download the project
2. Ensure web server points to the project directory
3. Set proper permissions for `data/` and `logs/` directories
4. Configure your domain and subdomains in DNS
5. Update `config/config.php` with your settings

## Development

### Testing
```bash
# Test the main domain
curl "http://localhost/"

# Test the common subdomain
curl "http://a.localhost/"

# Test URL shortening
curl "http://a.localhost/shorten?url=https://google.com"
```

### Logs
Monitor logs for debugging:
```bash
tail -f logs/redirect.log
tail -f logs/error.log
```

## License

This project is open source and available under the MIT License.

## Support

For issues and questions, please refer to the project documentation or create an issue in the repository.
