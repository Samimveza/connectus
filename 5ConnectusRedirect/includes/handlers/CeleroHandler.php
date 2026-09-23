<?php
/**
 * Celero Handler for c.cnts.in subdomain
 * Handles invoice downloads and payment redirects via Celero API
 */

class CeleroHandler {
    
    public function __construct() {
        // Load Celero configuration
        require_once __DIR__ . '/../../config/celero_config.php';
    }
    
    public function process($path, $query) {
        // Parse query parameters
        $params = [];
        if ($query) {
            parse_str($query, $params);
        }
        
        // Handle different paths
        switch ($path) {
            case '/':
                $this->handleRoot();
                break;
                
            case '/api':
                $this->handleApi();
                break;
                
            default:
                // Check for invoice download pattern: /i/PARAMETER
                if (preg_match('/^\/i\/(.+)$/', $path, $matches)) {
                    $this->handleInvoiceDownload($matches[1]);
                    break;
                }
                
                // Check for payment redirect pattern: /p/PARAMETER
                if (preg_match('/^\/p\/(.+)$/', $path, $matches)) {
                    $this->handlePaymentRedirect($matches[1]);
                    break;
                }
                
                // Check for unsubscribe pattern: /u/PARAMETER
                if (preg_match('/^\/u\/(.+)$/', $path, $matches)) {
                    $this->handleUnsubscribe($matches[1]);
                    break;
                }
                
                // Check for email collection pattern: /ec/PARAMETER
                if (preg_match('/^\/ec\/(.+)$/', $path, $matches)) {
                    $this->handleEmailCollection($matches[1], $params);
                    break;
                }
                
                $this->handleNotFound();
                break;
        }
    }
    
    /**
     * Handle root path
     */
    private function handleRoot() {
        // Redirect to celerogroup.com
        header("Location: https://celerogroup.com/");
        exit;
    }
    
    /**
     * Handle API endpoint
     */
    private function handleApi() {
        // Redirect to celerogroup.com
        header("Location: https://celerogroup.com/");
        exit;
    }
    
    /**
     * Handle invoice download: /i/PARAMETER
     */
    private function handleInvoiceDownload($invoiceId) {
        // Check if this is the initial request or the download request
        $isDownload = $_GET['download'] ?? false;
        
        if (!$isDownload) {
            // Show the download page first
            $this->showDownloadPage($invoiceId);
        } else {
            // Perform the actual download
            $this->performInvoiceDownload($invoiceId);
        }
    }
    
    /**
     * Show download page with auto-redirect
     */
    private function showDownloadPage($invoiceId) {
        header('Content-Type: text/html');
        echo '<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Downloading Invoice - Celerogroup</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin: 0;
            padding: 0;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .container {
            background: white;
            border-radius: 15px;
            padding: 40px;
            text-align: center;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            max-width: 500px;
            width: 90%;
        }
        .logo {
            margin-bottom: 20px;
        }
        .logo img {
            max-width: 200px;
            height: auto;
        }
        .title {
            color: #333;
            font-size: 1.8em;
            margin-bottom: 15px;
            font-weight: 600;
        }
        .message {
            color: #666;
            font-size: 1.1em;
            margin-bottom: 30px;
            line-height: 1.6;
        }
        .spinner {
            border: 4px solid #f3f3f3;
            border-top: 4px solid #667eea;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            animation: spin 1s linear infinite;
            margin: 0 auto 20px;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        .invoice-id {
            background: #f8f9fa;
            padding: 10px;
            border-radius: 8px;
            font-family: monospace;
            color: #495057;
            margin: 20px 0;
            word-break: break-all;
        }
        .redirect-message {
            color: #28a745;
            font-size: 0.9em;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">
            <img src="/images/celero_logo_white.png" alt="Celero Logo">
        </div>
        <h1 class="title">Downloading Your Invoice</h1>
        <p class="message">
            Your invoice is being prepared for download. Please wait while we process your request.
        </p>
        <div class="spinner"></div>
        <div class="invoice-id">
            Invoice ID: ' . htmlspecialchars($invoiceId) . '
        </div>
        <p class="redirect-message">
            Your download will start automatically in a few seconds...
        </p>
    </div>
    
    <script>
        // Auto-redirect to download after 2 seconds
        setTimeout(function() {
            window.location.href = "' . htmlspecialchars($_SERVER['REQUEST_URI']) . '?download=1";
        }, 2000);
    </script>
</body>
</html>';
        exit;
    }
    
    /**
     * Perform the actual invoice download
     */
    private function performInvoiceDownload($invoiceId) {
        try {
            // Step 1: Authenticate with Celero API
            $authResponse = $this->authenticateWithCelero();
            if (!$authResponse || !isset($authResponse['result']['token'])) {
                http_response_code(500);
                echo json_encode(['error' => 'Authentication failed']);
                return;
            }
            
            $token = $authResponse['result']['token'];
            
            // Step 2: Request invoice download
            $downloadResponse = $this->requestInvoiceDownload($invoiceId, $token);
            if (!$downloadResponse || !isset($downloadResponse['result']['fileId'])) {
                http_response_code(500);
                echo json_encode(['error' => 'Invoice download request failed']);
                return;
            }
            
            $fileId = $downloadResponse['result']['fileId'];
            
            // Step 3: Stream the file to client
            $this->streamFileToClient($fileId, $token);
            
        } catch (Exception $e) {
            $this->logError('Invoice download error: ' . $e->getMessage());
            http_response_code(500);
            echo json_encode(['error' => 'Invoice download failed']);
        }
    }
    
    /**
     * Handle payment redirect: /p/PARAMETER
     */
    private function handlePaymentRedirect($invoiceId) {
        try {
            // Get payment URL from Celero API
            $paymentResponse = $this->getPaymentUrl($invoiceId);
            if (!$paymentResponse || !isset($paymentResponse['result']['paymentUrl'])) {
                http_response_code(500);
                echo json_encode(['error' => 'Payment URL not available']);
                return;
            }
            
            $paymentUrl = $paymentResponse['result']['paymentUrl'];
            
            // Log the redirect
            $this->logRedirect($paymentUrl, 'payment_' . $invoiceId);
            
            // Redirect to payment URL
            header("Location: {$paymentUrl}");
            exit;
            
        } catch (Exception $e) {
            $this->logError('Payment redirect error: ' . $e->getMessage());
            http_response_code(500);
            echo json_encode(['error' => 'Payment redirect failed']);
        }
    }
    
    /**
     * Handle unsubscribe: /u/PARAMETER
     */
    private function handleUnsubscribe($invoiceId) {
        // Check if this is the confirmation request or the actual unsubscribe
        $confirmed = $_GET['confirm'] ?? false;
        
        if (!$confirmed) {
            // Show confirmation page first
            $this->showUnsubscribeConfirmationPage($invoiceId);
        } else {
            // Perform the actual unsubscribe
            $this->performUnsubscribe($invoiceId);
        }
    }
    
    /**
     * Show unsubscribe confirmation page
     */
    private function showUnsubscribeConfirmationPage($invoiceId) {
        header('Content-Type: text/html');
        echo '<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirm Unsubscribe - Celerogroup</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background: linear-gradient(135deg, #ffc107 0%, #fd7e14 100%);
            margin: 0;
            padding: 0;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .container {
            background: white;
            border-radius: 15px;
            padding: 40px;
            text-align: center;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            max-width: 500px;
            width: 90%;
        }
        .logo {
            margin-bottom: 20px;
        }
        .logo img {
            max-width: 200px;
            height: auto;
        }
        .title {
            color: #333;
            font-size: 1.8em;
            margin-bottom: 15px;
            font-weight: 600;
        }
        .message {
            color: #666;
            font-size: 1.1em;
            margin-bottom: 30px;
            line-height: 1.6;
        }
        .warning {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 8px;
            padding: 15px;
            margin: 20px 0;
            color: #856404;
        }
        .invoice-id {
            background: #f8f9fa;
            padding: 10px;
            border-radius: 8px;
            font-family: monospace;
            color: #495057;
            margin: 20px 0;
            word-break: break-all;
        }
        .buttons {
            margin-top: 30px;
            display: flex;
            gap: 15px;
            justify-content: center;
            flex-wrap: wrap;
        }
        .btn {
            padding: 12px 24px;
            border: none;
            border-radius: 8px;
            text-decoration: none;
            font-size: 1em;
            cursor: pointer;
            transition: all 0.3s;
            min-width: 120px;
        }
        .btn-confirm {
            background: #dc3545;
            color: white;
        }
        .btn-confirm:hover {
            background: #c82333;
        }
        .btn-cancel {
            background: #6c757d;
            color: white;
        }
        .btn-cancel:hover {
            background: #5a6268;
        }
        .btn-cancel a {
            color: white;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">
            <img src="/images/celero_logo_white.png" alt="Celero Logo">
        </div>
        <h1 class="title">Confirm Unsubscribe</h1>
        <p class="message">
            Are you sure you want to unsubscribe from SMS notifications for this invoice?
        </p>
        <div class="warning">
            <strong>⚠️ Warning:</strong> Once you unsubscribe, you will no longer receive SMS notifications about this invoice, including payment reminders and updates.
        </div>
        <div class="invoice-id">
            Invoice ID: ' . htmlspecialchars($invoiceId) . '
        </div>
        <div class="buttons">
            <button class="btn btn-confirm" onclick="confirmUnsubscribe()">
                Yes, Unsubscribe
            </button>
            <button class="btn btn-cancel">
                <a href="https://celerogroup.com/">Cancel</a>
            </button>
        </div>
    </div>
    
    <script>
        function confirmUnsubscribe() {
            window.location.href = "' . htmlspecialchars($_SERVER['REQUEST_URI']) . '?confirm=1";
        }
    </script>
</body>
</html>';
        exit;
    }
    
    /**
     * Perform the actual unsubscribe
     */
    private function performUnsubscribe($invoiceId) {
        try {
            // Step 1: Authenticate with Celero API
            $authResponse = $this->authenticateWithCelero();
            if (!$authResponse || !isset($authResponse['result']['token'])) {
                http_response_code(500);
                echo json_encode(['error' => 'Authentication failed']);
                return;
            }
            
            $token = $authResponse['result']['token'];
            
            // Step 2: Call unsubscribe API
            $unsubscribeResponse = $this->unsubscribePhoneNumber($invoiceId, $token);
            if (!$unsubscribeResponse) {
                http_response_code(500);
                echo json_encode(['error' => 'Unsubscribe request failed']);
                return;
            }
            
            // Step 3: Show success page
            $this->showUnsubscribeSuccessPage($invoiceId);
            
        } catch (Exception $e) {
            $this->logError('Unsubscribe error: ' . $e->getMessage());
            http_response_code(500);
            echo json_encode(['error' => 'Unsubscribe failed']);
        }
    }
    
    /**
     * Handle email collection: /ec/PARAMETER
     */
    private function handleEmailCollection($identifier, $params) {
        // Check if this is a form submission
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['email'])) {
            $this->saveEmailCollection($identifier, $_POST['email']);
        } else {
            // Show the email collection form
            $this->showEmailCollectionForm($identifier);
        }
    }
    
    /**
     * Show email collection form
     */
    private function showEmailCollectionForm($identifier) {
        // Fetch email collection detail
        $collectionData = $this->getEmailCollectionDetail($identifier);
        
        if (!$collectionData || !isset($collectionData['result'])) {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to load email collection data']);
            return;
        }
        
        $result = $collectionData['result'];
        $clientName = $result['clientName'] ?? '';
        $phoneNumber = $result['phoneNumber'] ?? '';
        $email = $result['email'] ?? '';
        $reference = $result['reference'] ?? '';
        
        header('Content-Type: text/html');
        echo '<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Collection - Celerogroup</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin: 0;
            padding: 0;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .container {
            background: white;
            border-radius: 15px;
            padding: 40px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            max-width: 500px;
            width: 90%;
        }
        .logo {
            margin-bottom: 20px;
            text-align: center;
        }
        .logo img {
            max-width: 200px;
            height: auto;
        }
        .title {
            color: #333;
            font-size: 1.8em;
            margin-bottom: 15px;
            font-weight: 600;
            text-align: center;
        }
        .message {
            color: #666;
            font-size: 1em;
            margin-bottom: 30px;
            line-height: 1.6;
            text-align: center;
        }
        .form-group {
            margin-bottom: 20px;
        }
        .form-group label {
            display: block;
            margin-bottom: 8px;
            color: #333;
            font-weight: 500;
        }
        .form-group input {
            width: 100%;
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 8px;
            font-size: 1em;
            box-sizing: border-box;
        }
        .form-group input[readonly] {
            background-color: #f8f9fa;
            color: #6c757d;
            cursor: not-allowed;
        }
        .form-group input:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }
        .btn-submit {
            width: 100%;
            padding: 12px;
            background: #667eea;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 1em;
            cursor: pointer;
            transition: background-color 0.3s;
            margin-top: 10px;
        }
        .btn-submit:hover {
            background: #5a6fd8;
        }
        .btn-submit:disabled {
            background: #ccc;
            cursor: not-allowed;
        }
        .error-message {
            background: #f8d7da;
            color: #721c24;
            padding: 12px;
            border-radius: 8px;
            margin-bottom: 20px;
            display: none;
        }
        .success-message {
            background: #d4edda;
            color: #155724;
            padding: 12px;
            border-radius: 8px;
            margin-bottom: 20px;
            display: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">
            <img src="/images/celero_logo_white.png" alt="Celero Logo">
        </div>
        <h1 class="title">Update Your Email</h1>
        <p class="message">
            Please provide your email address to receive important updates and notifications.
        </p>
        
        <div class="error-message" id="errorMessage"></div>
        <div class="success-message" id="successMessage"></div>
        
        <form method="POST" id="emailForm" onsubmit="return validateForm(event)">
            <div class="form-group">
                <label for="clientName">Name</label>
                <input type="text" id="clientName" name="clientName" value="' . htmlspecialchars($clientName) . '" readonly>
            </div>
            
            <div class="form-group">
                <label for="phoneNumber">Phone Number</label>
                <input type="text" id="phoneNumber" name="phoneNumber" value="' . htmlspecialchars($phoneNumber) . '" readonly>
            </div>
            
            <div class="form-group">
                <label for="email">Email Address <span style="color: red;">*</span></label>
                <input type="email" id="email" name="email" value="' . htmlspecialchars($email) . '" required placeholder="Enter your email address">
            </div>
            
            <button type="submit" class="btn-submit" id="submitBtn">Save Email</button>
        </form>
    </div>
    
    <script>
        function validateForm(event) {
            event.preventDefault();
            
            const email = document.getElementById("email").value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            const errorDiv = document.getElementById("errorMessage");
            const successDiv = document.getElementById("successMessage");
            const submitBtn = document.getElementById("submitBtn");
            
            // Hide previous messages
            errorDiv.style.display = "none";
            successDiv.style.display = "none";
            
            if (!email || !emailRegex.test(email)) {
                errorDiv.textContent = "Please enter a valid email address.";
                errorDiv.style.display = "block";
                return false;
            }
            
            // Disable submit button
            submitBtn.disabled = true;
            submitBtn.textContent = "Saving...";
            
            // Submit the form
            document.getElementById("emailForm").submit();
            
            return true;
        }
    </script>
</body>
</html>';
        exit;
    }
    
    /**
     * Get email collection detail
     */
    private function getEmailCollectionDetail($identifier) {
        $url = CELERO_GET_EMAIL_COLLECTION_DETAIL_ENDPOINT;
        $payload = [
            'IdUploadedEmailCollectionDetail' => $identifier
        ];
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json',
            'Accept: application/json'
        ]);
        curl_setopt($ch, CURLOPT_TIMEOUT, CELERO_DOWNLOAD_TIMEOUT);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        if ($httpCode !== 200) {
            $this->logError("Email collection detail request failed with HTTP code: {$httpCode}");
            return null;
        }
        
        $data = json_decode($response, true);
        if (!$data) {
            $this->logError("Invalid email collection detail response: " . $response);
            return null;
        }
        
        return $data;
    }
    
    /**
     * Save email collection detail
     */
    private function saveEmailCollection($identifier, $email) {
        $url = CELERO_SAVE_EMAIL_COLLECTION_DETAIL_ENDPOINT;
        $payload = [
            'IdUploadedEmailCollectionDetail' => $identifier,
            'Email' => $email
        ];
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json',
            'Accept: application/json'
        ]);
        curl_setopt($ch, CURLOPT_TIMEOUT, CELERO_DOWNLOAD_TIMEOUT);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        if ($httpCode !== 200) {
            $this->logError("Save email collection failed with HTTP code: {$httpCode}");
            $this->showEmailCollectionError($identifier, 'Failed to save email. Please try again.');
            return;
        }
        
        $data = json_decode($response, true);
        if (!$data || !isset($data['result']['success']) || !$data['result']['success']) {
            $this->logError("Invalid save email collection response: " . $response);
            $this->showEmailCollectionError($identifier, 'Failed to save email. Please try again.');
            return;
        }
        
        // Show success page
        $this->showEmailCollectionSuccess($identifier, $email);
    }
    
    /**
     * Show email collection success page
     */
    private function showEmailCollectionSuccess($identifier, $email) {
        header('Content-Type: text/html');
        echo '<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Saved - Celerogroup</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
            margin: 0;
            padding: 0;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .container {
            background: white;
            border-radius: 15px;
            padding: 40px;
            text-align: center;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            max-width: 500px;
            width: 90%;
        }
        .logo {
            margin-bottom: 20px;
        }
        .logo img {
            max-width: 200px;
            height: auto;
        }
        .title {
            color: #333;
            font-size: 1.8em;
            margin-bottom: 15px;
            font-weight: 600;
        }
        .message {
            color: #666;
            font-size: 1.1em;
            margin-bottom: 30px;
            line-height: 1.6;
        }
        .email-display {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            font-family: monospace;
            color: #495057;
            margin: 20px 0;
            word-break: break-all;
        }
        .redirect-link {
            margin-top: 30px;
        }
        .redirect-link a {
            background: #667eea;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 8px;
            display: inline-block;
            transition: background-color 0.3s;
        }
        .redirect-link a:hover {
            background: #5a6fd8;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">
            <img src="/images/celero_logo_white.png" alt="Celero Logo">
        </div>
        <h1 class="title">Email Saved Successfully</h1>
        <p class="message">
            Your email address has been successfully updated.
        </p>
        <div class="email-display">
            ' . htmlspecialchars($email) . '
        </div>
        <p class="message">
            You will now receive important updates and notifications at this email address.
        </p>
        <div class="redirect-link">
            <a href="https://celerogroup.com/">Return to Celerogroup</a>
        </div>
    </div>
</body>
</html>';
        exit;
    }
    
    /**
     * Show email collection error page
     */
    private function showEmailCollectionError($identifier, $errorMessage) {
        header('Content-Type: text/html');
        echo '<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Error - Celerogroup</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
            margin: 0;
            padding: 0;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .container {
            background: white;
            border-radius: 15px;
            padding: 40px;
            text-align: center;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            max-width: 500px;
            width: 90%;
        }
        .logo {
            margin-bottom: 20px;
        }
        .logo img {
            max-width: 200px;
            height: auto;
        }
        .title {
            color: #333;
            font-size: 1.8em;
            margin-bottom: 15px;
            font-weight: 600;
        }
        .error-message {
            color: #dc3545;
            font-size: 1.1em;
            margin: 20px 0;
            padding: 15px;
            background: #f8d7da;
            border-radius: 8px;
        }
        .redirect-link {
            margin-top: 30px;
        }
        .redirect-link a {
            background: #667eea;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 8px;
            display: inline-block;
            transition: background-color 0.3s;
        }
        .redirect-link a:hover {
            background: #5a6fd8;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">
            <img src="/images/celero_logo_white.png" alt="Celero Logo">
        </div>
        <h1 class="title">Error</h1>
        <div class="error-message">
            ' . htmlspecialchars($errorMessage) . '
        </div>
        <div class="redirect-link">
            <a href="' . htmlspecialchars($_SERVER['REQUEST_URI']) . '">Try Again</a>
        </div>
    </div>
</body>
</html>';
        exit;
    }
    
    /**
     * Authenticate with Celero API
     */
    private function authenticateWithCelero() {
        $url = CELERO_AUTH_ENDPOINT;
        $payload = [
            'domain' => CELERO_DOMAIN,
            'username' => CELERO_USERNAME,
            'password' => CELERO_PASSWORD
        ];
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json',
            'Accept: application/json'
        ]);
        curl_setopt($ch, CURLOPT_TIMEOUT, CELERO_AUTH_TIMEOUT);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        if ($httpCode !== 200) {
            $this->logError("Celero authentication failed with HTTP code: {$httpCode}");
            return null;
        }
        
        $data = json_decode($response, true);
        if (!$data || !isset($data['result']['token'])) {
            $this->logError("Invalid authentication response: " . $response);
            return null;
        }
        
        return $data;
    }
    
    /**
     * Request invoice download
     */
    private function requestInvoiceDownload($invoiceId, $token) {
        $url = CELERO_DOWNLOAD_INVOICE_ENDPOINT;
        $payload = [
            'idInvoice' => $invoiceId
        ];
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json',
            'Accept: application/json',
            'Authorization: Bearer ' . $token
        ]);
        curl_setopt($ch, CURLOPT_TIMEOUT, CELERO_DOWNLOAD_TIMEOUT);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        if ($httpCode !== 200) {
            $this->logError("Invoice download request failed with HTTP code: {$httpCode}");
            return null;
        }

        $data = json_decode($response, true);
        if (!$data || !isset($data['result']['fileId'])) {
            $this->logError("Invalid download response: " . $response);
            return null;
        }
        
        return $data;
    }
    
    /**
     * Stream file to client
     */
    private function streamFileToClient($fileId, $token) {
        $url = CELERO_GET_FILE_ENDPOINT . "/{$fileId}";
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, false);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Authorization: Bearer ' . $token
        ]);
        curl_setopt($ch, CURLOPT_TIMEOUT, CELERO_FILE_STREAM_TIMEOUT);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        
        // Set up streaming
        curl_setopt($ch, CURLOPT_WRITEFUNCTION, function($ch, $data) {
            echo $data;
            return strlen($data);
        });
        
        // Get headers from the remote file
        curl_setopt($ch, CURLOPT_HEADERFUNCTION, function($ch, $header) {
            $len = strlen($header);
            $header = trim($header);
            
            // Forward content-type and content-disposition headers
            if (stripos($header, 'Content-Type:') === 0 || 
                stripos($header, 'Content-Disposition:') === 0 ||
                stripos($header, 'Content-Length:') === 0) {
                header($header);
            }
            
            return $len;
        });
        
        $success = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        if (!$success || $httpCode !== 200) {
            $this->logError("File streaming failed with HTTP code: {$httpCode}");
            http_response_code(500);
            echo json_encode(['error' => 'File download failed']);
        }
    }
    
    /**
     * Get payment URL from Celero API
     */
    private function getPaymentUrl($invoiceId) {
        $url = CELERO_PAYMENT_URL_ENDPOINT;
        $payload = [
            'idInvoice' => $invoiceId
        ];
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json',
            'Accept: application/json'
        ]);
        curl_setopt($ch, CURLOPT_TIMEOUT, CELERO_DOWNLOAD_TIMEOUT);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        if ($httpCode !== 200) {
            $this->logError("Payment URL request failed with HTTP code: {$httpCode}");
            return null;
        }
        
        $data = json_decode($response, true);
        if (!$data || !isset($data['result']['paymentUrl'])) {
            $this->logError("Invalid payment URL response: " . $response);
            return null;
        }
        
        return $data;
    }
    
    /**
     * Unsubscribe phone number from invoice
     */
    private function unsubscribePhoneNumber($invoiceId, $token) {
        $url = CELERO_API_BASE_URL . '/unsubscribe-phone-number-from-invoice';
        $payload = [
            'IdInvoice' => $invoiceId
        ];
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json',
            'Accept: application/json',
            'Authorization: Bearer ' . $token
        ]);
        curl_setopt($ch, CURLOPT_TIMEOUT, CELERO_DOWNLOAD_TIMEOUT);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        if ($httpCode !== 200) {
            $this->logError("Unsubscribe request failed with HTTP code: {$httpCode}");
            return null;
        }
        
        $data = json_decode($response, true);
        if (!$data) {
            $this->logError("Invalid unsubscribe response: " . $response);
            return null;
        }
        
        return $data;
    }
    
    /**
     * Show unsubscribe success page
     */
    private function showUnsubscribeSuccessPage($invoiceId) {
        header('Content-Type: text/html');
        echo '<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Unsubscribe Successful - Celerogroup</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
            margin: 0;
            padding: 0;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .container {
            background: white;
            border-radius: 15px;
            padding: 40px;
            text-align: center;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            max-width: 500px;
            width: 90%;
        }
        .logo {
            margin-bottom: 20px;
        }
        .logo img {
            max-width: 200px;
            height: auto;
        }
        .title {
            color: #333;
            font-size: 1.8em;
            margin-bottom: 15px;
            font-weight: 600;
        }
        .message {
            color: #666;
            font-size: 1.1em;
            margin-bottom: 30px;
            line-height: 1.6;
        }
        .invoice-id {
            background: #f8f9fa;
            padding: 10px;
            border-radius: 8px;
            font-family: monospace;
            color: #495057;
            margin: 20px 0;
            word-break: break-all;
        }
        .success-message {
            color: #28a745;
            font-size: 1.1em;
            margin: 20px 0;
            font-weight: 500;
        }
        .redirect-link {
            margin-top: 30px;
        }
        .redirect-link a {
            background: #667eea;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 8px;
            display: inline-block;
            transition: background-color 0.3s;
        }
        .redirect-link a:hover {
            background: #5a6fd8;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">
            <img src="/images/celero_logo_white.png" alt="Celero Logo">
        </div>
        <h1 class="title">Unsubscribe Successful</h1>
        <p class="message">
            Your phone number has been successfully unsubscribed from notifications for this invoice.
        </p>
        <div class="success-message">
            You will no longer receive SMS notifications for this invoice.
        </div>
        <div class="invoice-id">
            Invoice ID: ' . htmlspecialchars($invoiceId) . '
        </div>
        <div class="redirect-link">
            <a href="https://celerogroup.com/">Return to Celerogroup</a>
        </div>
    </div>
</body>
</html>';
        exit;
    }
    
    /**
     * Handle 404
     */
    private function handleNotFound() {
        http_response_code(404);
        echo json_encode(['error' => 'Not found']);
    }
    
    /**
     * Log redirect activity
     */
    private function logRedirect($url, $shortCode = null) {
        if (!LOG_ENABLED) {
            return;
        }
        
        $logEntry = sprintf(
            "[%s] CELERO_REDIRECT: %s -> %s (Code: %s)\n",
            date('Y-m-d H:i:s'),
            $_SERVER['REMOTE_ADDR'] ?? 'unknown',
            $url,
            $shortCode ?? 'direct'
        );
        
        file_put_contents(LOG_FILE, $logEntry, FILE_APPEND | LOCK_EX);
    }
    
    /**
     * Log errors
     */
    private function logError($message) {
        if (!LOG_ENABLED) {
            return;
        }
        
        $logEntry = sprintf(
            "[%s] CELERO_ERROR: %s\n",
            date('Y-m-d H:i:s'),
            $message
        );
        
        file_put_contents(LOG_FILE, $logEntry, FILE_APPEND | LOCK_EX);
    }
}
