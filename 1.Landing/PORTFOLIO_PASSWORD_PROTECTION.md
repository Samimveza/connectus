# Portfolio Password Protection Feature

This feature adds password protection to portfolio pages when the `portfolioPasswordIsEnabled` field is set to `true` in the API response.

## How It Works

1. **API Check**: When a user visits a portfolio page, the system checks if `portfolioPasswordIsEnabled` is `true` in the API response.

2. **Authentication Check**: If password protection is enabled, the system checks if the user is already authenticated for this portfolio using PHP sessions.

3. **Redirect to 404**: If the user is not authenticated, they are redirected to the 404 page with a special password entry interface.

4. **Password Verification**: Users enter the password through a modal, which calls the `/api/portfolio-password-verify.php` endpoint.

5. **Session Storage**: If the password is correct, the authentication status is stored in the PHP session for 24 hours.

6. **Access Granted**: The user is redirected back to the original portfolio page.

## Files Modified/Created

### New Files:
- `api/portfolio-password-verify.php` - API endpoint for password verification
- `includes/portfolio-auth-helper.php` - Helper functions for authentication
- `components/portfolio-password-modal.php` - Password entry modal component
- `PORTFOLIO_PASSWORD_PROTECTION.md` - This documentation

### Modified Files:
- `pages-loader/individual-profile-portfolio-list-loader.php` - Added password protection check
- `pages-loader/individual-profile-portfolio-loader.php` - Added password protection check
- `pages/404.php` - Added password entry interface for protected portfolios
- `index.php` - Added API routing for password verification
- `css/in.css` - Added styles for password modal and buttons

## API Endpoint

### POST `/api/portfolio-password-verify.php`

**Request Body:**
```json
{
    "slug": "samim-parveez-mohabuth",
    "password": "Pa$$w0rd!"
}
```

**Response:**
```json
{
    "result": {
        "isValid": true
    },
    "status": 10,
    "errorMessage": null
}
```

## Session Management

The system uses PHP sessions to store authentication status:
- `portfolio_auth_{slug}` - Boolean indicating if user is authenticated
- `portfolio_auth_time_{slug}` - Timestamp of authentication (24-hour expiry)
- `portfolio_redirect_url` - URL to redirect to after successful authentication

## Security Features

1. **Session Expiry**: Authentication expires after 24 hours
2. **Domain Validation**: Uses the same domain header logic as other API calls
3. **Input Validation**: Validates required parameters
4. **Error Handling**: Proper error responses for invalid passwords

## Usage

1. Set `portfolioPasswordIsEnabled: true` in the API response for portfolios that need protection
2. Users will automatically be prompted for a password when accessing protected portfolios
3. Once authenticated, users can access the portfolio without re-entering the password for 24 hours

## Testing

To test the feature:
1. Ensure a portfolio has `portfolioPasswordIsEnabled: true` in the API response
2. Visit the portfolio URL
3. You should be redirected to the 404 page with password entry
4. Enter the correct password
5. You should be redirected back to the portfolio page
6. Refresh the page - you should not be prompted for password again
7. Wait 24 hours or clear session to test expiry 