<?php
// Include configuration
require_once 'config.php';

// Get error message if passed
$errorMessage = isset($_GET['message']) ? htmlspecialchars($_GET['message']) : 'An unknown error occurred';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Error - Redirect Service</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            text-align: center;
        }
        .error-container {
            background-color: #f8f8f8;
            border-radius: 5px;
            padding: 20px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            margin-top: 50px;
        }
        h1 {
            color: #e74c3c;
        }
        .message {
            font-size: 18px;
            margin: 20px 0;
        }
        .redirect-link {
            display: inline-block;
            margin-top: 20px;
            background-color: #3498db;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
        }
        .redirect-link:hover {
            background-color: #2980b9;
        }
    </style>
</head>
<body>
    <div class="error-container">
        <h1>Redirect Error</h1>
        <div class="message"><?php echo $errorMessage; ?></div>
        <p>We'll redirect you to the main site shortly.</p>
        <a href="<?php echo DEFAULT_REDIRECT; ?>" class="redirect-link">Go to Main Site</a>
    </div>
    <script>
        // Auto-redirect after 5 seconds
        setTimeout(function() {
            window.location.href = "<?php echo DEFAULT_REDIRECT; ?>";
        }, 5000);
    </script>
</body>
</html> 