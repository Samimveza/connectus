<?php
// Ensure session is started
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Check if this is a password-protected portfolio redirect
$isPasswordProtected = isset($_SESSION['portfolio_redirect_url']) && !empty($_SESSION['portfolio_redirect_url']);
$redirectUrl = $_SESSION['portfolio_redirect_url'] ?? '';
$currentSlug = '';

// Extract slug from redirect URL if available
if ($redirectUrl) {
    // Parse the URL to extract the profile ID
    $urlParts = parse_url($redirectUrl);
    if (isset($urlParts['path'])) {
        $pathParts = explode('/', trim($urlParts['path'], '/'));
        if (isset($pathParts[1]) && $pathParts[0] === 'in') {
            $currentSlug = $pathParts[1];
        }
    }
}

// If no redirect URL, this shouldn't be accessed directly
if (!$isPasswordProtected) {
    header('Location: /404');
    exit();
}
?>

<!DOCTYPE HTML>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Portfolio Access Required - ConnectUs</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="robots" content="noindex, nofollow" />
    
    <!-- Favicon -->
    <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png">
    <link rel="manifest" href="/favicon/site.webmanifest">
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    
    <style>
        :root {
            --color-primary: #1e1b2e;
            --color-secondary: #2d2b3a;
            --color-accent: #00e8d3;
            --color-white: #ffffff;
            --color-light: #b8b8b8;
            --color-dark: #0f0e17;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', sans-serif;
            background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--color-white);
            line-height: 1.6;
        }
        
        .password-container {
            width: 100%;
            max-width: 400px;
            padding: 40px 20px;
            text-align: center;
        }
        
        .password-card {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 40px 30px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
        
        .lock-icon {
            font-size: 3rem;
            color: var(--color-accent);
            margin-bottom: 20px;
        }
        
        .password-title {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 10px;
            color: var(--color-white);
        }
        
        .password-subtitle {
            color: var(--color-light);
            font-size: 0.95rem;
            margin-bottom: 30px;
        }
        
        .password-form {
            text-align: left;
        }
        
        .password-input-group {
            margin-bottom: 25px;
        }
        
        .password-input-group label {
            display: block;
            color: var(--color-white);
            font-size: 0.9rem;
            font-weight: 600;
            margin-bottom: 8px;
        }
        
        .password-input-wrapper {
            position: relative;
            display: flex;
            align-items: center;
        }
        
        .password-input {
            width: 100%;
            padding: 15px 50px 15px 20px;
            border: 2px solid rgba(255, 255, 255, 0.2);
            border-radius: 12px;
            background-color: rgba(255, 255, 255, 0.1);
            color: var(--color-white);
            font-size: 1rem;
            transition: all 0.3s ease;
        }
        
        .password-input:focus {
            outline: none;
            border-color: var(--color-accent);
            background-color: rgba(255, 255, 255, 0.15);
            box-shadow: 0 0 0 3px rgba(0, 232, 211, 0.1);
        }
        
        .password-input::placeholder {
            color: rgba(255, 255, 255, 0.6);
        }
        
        .password-toggle {
            position: absolute;
            right: 15px;
            background: none;
            border: none;
            color: rgba(255, 255, 255, 0.7);
            cursor: pointer;
            padding: 0;
            font-size: 1.1rem;
            transition: color 0.3s ease;
        }
        
        .password-toggle:hover {
            color: var(--color-white);
        }
        
        .password-error {
            color: #ff6b6b;
            font-size: 0.9rem;
            margin-bottom: 20px;
            padding: 12px;
            background-color: rgba(255, 107, 107, 0.1);
            border-radius: 8px;
            border: 1px solid rgba(255, 107, 107, 0.3);
            display: none;
        }
        
        .password-loading {
            color: var(--color-accent);
            font-size: 0.9rem;
            margin-bottom: 20px;
            padding: 12px;
            background-color: rgba(0, 232, 211, 0.1);
            border-radius: 8px;
            border: 1px solid rgba(0, 232, 211, 0.3);
            display: none;
        }
        
        .password-loading i {
            margin-right: 8px;
        }
        
        .password-button {
            width: 100%;
            padding: 15px;
            background: var(--color-accent);
            color: var(--color-primary);
            border: none;
            border-radius: 12px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        }
        
        .password-button:hover:not(:disabled) {
            background: #00d4c0;
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(0, 232, 211, 0.3);
        }
        
        .password-button:disabled {
            opacity: 0.7;
            cursor: not-allowed;
            transform: none;
        }
        
        .back-link {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            color: var(--color-light);
            text-decoration: none;
            font-size: 0.9rem;
            margin-top: 20px;
            transition: color 0.3s ease;
        }
        
        .back-link:hover {
            color: var(--color-white);
        }
        
        .logo {
            margin-bottom: 30px;
        }
        
        .logo img {
            height: 40px;
            width: auto;
        }
        
        @media (max-width: 480px) {
            .password-container {
                padding: 20px 15px;
            }
            
            .password-card {
                padding: 30px 20px;
            }
            
            .password-input {
                font-size: 16px; /* Prevents zoom on iOS */
            }
        }
    </style>
</head>
<body>
    <div class="password-container">
        <div class="password-card">
            <div class="logo">
                <img src="/images/logo.png" alt="ConnectUs" />
            </div>
            
            <div class="lock-icon">
                <i class="fas fa-lock"></i>
            </div>
            
            <h1 class="password-title">Portfolio Access Required</h1>
            <p class="password-subtitle">
                This portfolio is password protected. Please enter the password to continue.
            </p>
            
            <form id="portfolio-password-form" class="password-form">
                <div class="password-input-group">
                    <label for="portfolio-password">Password</label>
                    <div class="password-input-wrapper">
                        <input 
                            type="password" 
                            id="portfolio-password" 
                            name="password" 
                            required 
                            placeholder="Enter password"
                            class="password-input"
                            autocomplete="current-password"
                        >
                        <button 
                            type="button" 
                            class="password-toggle" 
                            onclick="togglePasswordVisibility()"
                        >
                            <i class="fas fa-eye" id="password-eye-icon"></i>
                        </button>
                    </div>
                </div>
                
                <div class="password-error" id="password-error"></div>
                <div class="password-loading" id="password-loading">
                    <i class="fas fa-spinner fa-spin"></i> Verifying password...
                </div>
                
                <button type="submit" class="password-button" id="submit-button">
                    <i class="fas fa-unlock"></i>
                    Access Portfolio
                </button>
            </form>
            
            <a href="/" class="back-link">
                <i class="fas fa-arrow-left"></i>
                Back to Home
            </a>
        </div>
    </div>

    <script>
        // Portfolio password functionality
        let currentPortfolioSlug = '<?php echo htmlspecialchars($currentSlug); ?>';
        let redirectUrl = '<?php echo htmlspecialchars($redirectUrl); ?>';

        function togglePasswordVisibility() {
            const passwordInput = document.getElementById('portfolio-password');
            const eyeIcon = document.getElementById('password-eye-icon');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                eyeIcon.className = 'fas fa-eye-slash';
            } else {
                passwordInput.type = 'password';
                eyeIcon.className = 'fas fa-eye';
            }
        }

        async function verifyPortfolioPassword(event) {
            event.preventDefault();
            
            const password = document.getElementById('portfolio-password').value;
            const errorDiv = document.getElementById('password-error');
            const loadingDiv = document.getElementById('password-loading');
            const submitButton = document.getElementById('submit-button');
            
            // Hide previous error and show loading
            errorDiv.style.display = 'none';
            loadingDiv.style.display = 'block';
            submitButton.disabled = true;
            
            try {
                const response = await fetch('/api/portfolio-password-verify.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Domain': window.location.hostname
                    },
                    body: JSON.stringify({
                        slug: currentPortfolioSlug,
                        password: password
                    })
                });
                
                const data = await response.json();
                
                if (data.status === 10 && data.result.isValid) {
                    // Password is correct, redirect to the intended page
                    const targetUrl = redirectUrl || window.location.href;
                    window.location.href = targetUrl;
                } else {
                    // Password is incorrect
                    errorDiv.textContent = data.errorMessage || 'Incorrect password. Please try again.';
                    errorDiv.style.display = 'block';
                    document.getElementById('portfolio-password').value = '';
                    document.getElementById('portfolio-password').focus();
                }
            } catch (error) {
                console.error('Error:', error);
                errorDiv.textContent = 'An error occurred. Please try again.';
                errorDiv.style.display = 'block';
            } finally {
                loadingDiv.style.display = 'none';
                submitButton.disabled = false;
            }
        }

        // Form submission
        document.getElementById('portfolio-password-form').addEventListener('submit', verifyPortfolioPassword);

        // Focus on password input when page loads
        document.addEventListener('DOMContentLoaded', function() {
            document.getElementById('portfolio-password').focus();
        });

        // Handle Enter key
        document.getElementById('portfolio-password').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                verifyPortfolioPassword(e);
            }
        });
    </script>
</body>
</html> 