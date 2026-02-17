<?php
// Start session for portfolio authentication
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

require_once __DIR__ . '/config/config.php';
require_once INCLUDES_PATH . '/helpers.php';

// Get the request URI
$request_uri = $_SERVER['REQUEST_URI'];
$base_path = parse_url(SITE_URL, PHP_URL_PATH) ?? '';

// Parse query string and remove it from the path
$query_string = parse_url($request_uri, PHP_URL_QUERY);
$path_without_query = parse_url($request_uri, PHP_URL_PATH);
$path = trim(substr($path_without_query, strlen($base_path)), '/');

if ($query_string) {
    parse_str($query_string, $_GET);
}

// Route the request
$path_parts = explode('/', $path);
$route = $path_parts[0] ?: 'home';

// Default meta data
$page_title = SITE_TITLE;
$page_description = SITE_DESCRIPTION;
$page_keywords = '';
$page_url = SITE_URL . $request_uri;
$page_scripts = [];

$includeFooter = true;
$requiredFile = '';

switch ($route) {
    case 'home':
        $requiredFile = 'pages/home.php';
        break;

    case 'api':
        // Handle API endpoints
        if (isset($path_parts[1]) && $path_parts[1] === 'portfolio-password-verify') {
            $requiredFile = 'api/portfolio-password-verify.php';
        } else {
            header('Location: /404');
            exit();
        }
        break;

    case 'in':

        if (isset($path_parts[1])) {

            $_GET['profileId'] = $path_parts[1];

            if (isset($path_parts[2]) && $path_parts[2] === 'portfolio') {

                if (isset($path_parts[3])) {
                    $_GET['portfolioId'] = $path_parts[3];
                    $requiredFile = 'pages/individual-profile-portfolio.php';
                } else {
                    $requiredFile = 'pages/individual-profile-portfolio-list.php';
                }
            } else {
                $requiredFile = 'pages/individual-profile.php';

            }
        } else {

            header('Location: /404');
            exit();
        }
        break;


    case 'company':

        if (isset($path_parts[1])) {
            $_GET['companyId'] = $path_parts[1];
        } else {
            header('Location: /404');
            exit();
        }
        $requiredFile = 'pages/company-profile.php';
        break;

    case 'terms':
        $requiredFile = 'pages/terms.php';
        break;

    case 'privacy':
        $requiredFile = 'pages/privacy.php';
        break;

    case 'portfolio-password':
        $requiredFile = 'pages/portfolio-password.php';
        break;

    default:
        http_response_code(404);
        $requiredFile = 'pages/404.php';
        break;
}
if ($requiredFile) {
    $loaderFile = str_replace('pages', 'pages-loader', $requiredFile);
    $loaderFile = str_replace('.php', '-loader.php', $loaderFile);
    require_once $loaderFile;
}
?>
<!DOCTYPE HTML>
<html lang="en">

<head>
    <!--=============== basic  ===============-->
    <meta charset="UTF-8">
    <title><?php echo isset($page_title) && $page_title !== SITE_TITLE ? $page_title . ' - ' . SITE_TITLE : SITE_TITLE; ?></title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="robots" content="index, follow" />
    <meta name="keywords" content="<?php echo isset($page_keywords) ? $page_keywords : ''; ?>" />
    <meta name="description" content="<?php echo isset($page_description) ? $page_description : SITE_DESCRIPTION; ?>" />

    <!-- Preload Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="<?php echo ($route === 'in') ? 'profile' : 'website'; ?>">
    <meta property="og:url" content="<?php echo isset($page_url) ? $page_url : SITE_URL; ?>">
    <meta property="og:title" content="<?php echo isset($page_title) ? $page_title : SITE_TITLE; ?>">
    <meta property="og:description" content="<?php echo isset($page_description) ? $page_description : SITE_DESCRIPTION; ?>">
    <meta property="og:image" content="<?php echo isset($page_image) ? $page_image : SITE_URL . '/images/default.jpg'; ?>">
    <?php if ($route === 'in' && isset($profileData)): ?>
        <meta property="og:profile:first_name" content="<?php echo htmlspecialchars($profileData['firstname']); ?>">
        <meta property="og:profile:last_name" content="<?php echo htmlspecialchars($profileData['lastname']); ?>">
        <?php if (!empty($profileData['headline'])): ?>
            <meta property="og:profile:username" content="<?php echo htmlspecialchars($profileData['headline']); ?>">
        <?php endif; ?>
    <?php endif; ?>

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="<?php echo isset($page_url) ? $page_url : SITE_URL; ?>">
    <meta property="twitter:title" content="<?php echo isset($page_title) ? $page_title : SITE_TITLE; ?>">
    <meta property="twitter:description" content="<?php echo isset($page_description) ? $page_description : SITE_DESCRIPTION; ?>">
    <meta property="twitter:image" content="<?php echo isset($page_image) ? $page_image : SITE_URL . '/images/default.jpg'; ?>">

    <!-- Favicon -->
    <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png">
    <link rel="manifest" href="/favicon/site.webmanifest">

    <!-- Canonical URL -->
    <link rel="canonical" href="<?php echo isset($page_url) ? $page_url : SITE_URL; ?>">

    <!-- JSON-LD Schema -->
    <?php if ($route === 'in' && isset($profileData)): ?>
        <script type="application/ld+json">
            {
                "@context": "https://schema.org",
                "@type": "Person",
                "name": "<?php echo htmlspecialchars($profileData['firstname'] . ' ' . $profileData['lastname']); ?>",
                "givenName": "<?php echo htmlspecialchars($profileData['firstname']); ?>",
                "familyName": "<?php echo htmlspecialchars($profileData['lastname']); ?>",
                <?php if (!empty($profileData['headline'])): ?> "jobTitle": "<?php echo htmlspecialchars($profileData['headline']); ?>",
                <?php endif; ?>
                <?php if (!empty($profileData['email'])): ?> "email": "<?php echo htmlspecialchars($profileData['email']); ?>",
                <?php endif; ?>
                <?php if (!empty($profileData['mainPhoneNumber'])): ?> "telephone": "+<?php echo htmlspecialchars($profileData['mainPhoneNumber']); ?>",
                <?php endif; ?>
                <?php if (!empty($profileData['workingOrganisation'])): ?> "worksFor": {
                        "@type": "Organization",
                        "name": "<?php echo htmlspecialchars($profileData['workingOrganisation']); ?>"
                    },
                <?php endif; ?>
                <?php if (!empty($profileData['profilePicture']['url'])): ?> "image": "<?php echo htmlspecialchars($profileData['profilePicture']['url']); ?>",
                <?php endif; ?> "url": "<?php echo isset($page_url) ? $page_url : SITE_URL; ?>"
                <?php if (!empty($profileData['addresses']) && is_array($profileData['addresses']) && !empty($profileData['addresses'][0])):
                    $address = $profileData['addresses'][0]; ?>,
                    "address": {
                        "@type": "PostalAddress"
                        <?php if (!empty($address['addressLine1'])): ?>,
                            "streetAddress": "<?php echo htmlspecialchars($address['addressLine1']); ?>"
                        <?php endif; ?>
                        <?php if (!empty($address['city'])): ?>,
                            "addressLocality": "<?php echo htmlspecialchars($address['city']); ?>"
                        <?php endif; ?>
                        <?php if (!empty($address['postCode'])): ?>,
                            "postalCode": "<?php echo htmlspecialchars($address['postCode']); ?>"
                        <?php endif; ?>
                        <?php if (!empty($address['country'])): ?>,
                            "addressCountry": "<?php echo htmlspecialchars($address['country']); ?>"
                        <?php endif; ?>
                    }
                <?php endif; ?>
                <?php if (!empty($profileData['socialNetworks']) && is_array($profileData['socialNetworks'])): ?>,
                    "sameAs": [
                        <?php
                        $socialUrls = array_map(function ($social) {
                            return '"' . htmlspecialchars($social['url']) . '"';
                        }, $profileData['socialNetworks']);
                        echo implode(', ', $socialUrls);
                        ?>
                    ]
                <?php endif; ?>
            }
        </script>
    <?php elseif ($route === 'company' && isset($companyData)): ?>
        <script type="application/ld+json">
            {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "<?php echo htmlspecialchars($companyData['companyName']); ?>",
                "description": "<?php echo htmlspecialchars(strip_tags($companyData['companyDescription'] ?? '')); ?>",
                "url": "<?php echo htmlspecialchars($page_url); ?>",
                <?php if (!empty($companyData['profilePicture']['url'])): ?>
                "logo": "<?php echo htmlspecialchars($companyData['profilePicture']['url']); ?>",
                <?php endif; ?>
                <?php if (!empty($companyData['mainPhoneNumber'])): ?>
                "telephone": "<?php echo htmlspecialchars($companyData['mainPhoneNumber']); ?>",
                <?php endif; ?>
                <?php if (!empty($companyData['mainWebsite'])): ?>
                "sameAs": "<?php echo htmlspecialchars($companyData['mainWebsite']); ?>",
                <?php endif; ?>
                <?php if (!empty($companyData['addresses'])): ?>
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "<?php echo htmlspecialchars($companyData['addresses'][0]['addressLine1']); ?>",
                    "addressLocality": "<?php echo htmlspecialchars($companyData['addresses'][0]['city']); ?>",
                    "addressCountry": "<?php echo htmlspecialchars($companyData['addresses'][0]['country']); ?>"
                }
                <?php endif; ?>
            }
        </script>
    <?php else: ?>
        <script type="application/ld+json">
            {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "ConnectUs",
                "url": "https://connectus.mu",
                "logo": "https://connectus.mu/images/logo-dark.png",
                "sameAs": [
                    "https://linkedin.com/company/connectus",
                    "https://twitter.com/connectus",
                    "https://github.com/connectus"
                ],
                "description": "ConnectUs lets anyone share a smart digital identity via NFC or QR while securely receiving receipts, payslips, and loyalty rewards from partner businesses."
            }
        </script>
    <?php endif; ?>

    <script>
        // Configuration
        const CONFIG = {
            API_URL: '<?php echo SITE_API_ENDPOINT; ?>/api/add-subscription',
            DOMAIN: '<?php echo SITE_URL; ?>'
        };
    </script>

    <!--=============== css  ===============-->
    <link type="text/css" rel="stylesheet" href="/css/reset.css">
    <link type="text/css" rel="stylesheet" href="/css/override.css">
    <link type="text/css" rel="stylesheet" href="/css/custom.css">
    <link type="text/css" rel="stylesheet" href="/public/build/bundle.css">
    <script data-search-pseudo-elements="" defer="" src="/public/build/header.min.js" crossorigin="anonymous"></script>

    <?php if (isset($page_styles)): ?>
        <?php foreach ($page_styles as $css): ?>
            <link type="text/css" rel="stylesheet" href="<?php echo $css; ?>">
        <?php endforeach; ?>
    <?php endif; ?>

    <!--=============== favicons ===============-->
    <link rel="shortcut icon" href="/favicon/favicon.ico">

    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script type="text/javascript">
        var hostname = '<?php echo SITE_URL; ?>';
        var apiEndpoint = '<?php echo SITE_API_ENDPOINT; ?>';
        var userRoles = [];
        var domain = '<?php echo str_replace(':' . $_SERVER['SERVER_PORT'], '', $_SERVER['HTTP_HOST']); ?>';
        var slug = '<?php echo isset($_GET['profileId']) ? $_GET['profileId'] : (isset($_GET['companyId']) ? $_GET['companyId'] : null); ?>';
    </script>
</head>

<body ng-controller="baseController" ng-cloak>

    <div ng-show="baseController.isLoadingShown" class="loading-container">
        <div class="spinner-grow text-primary loading-spinner" role="status"></div>
    </div>
    <toaster-container></toaster-container>
    <div ng-controller="commonController"></div>

    <div id="main" class="">

        <!-- Header Section -->
        <?php if (isset($showHeader) && $showHeader) { ?>
            <?php include COMPONENTS_PATH . '/header.php'; ?>
        <?php } ?>

        <div class="layout-container">
            <?php if ($requiredFile) {
                require_once $requiredFile;
            } ?>
        </div>

        <!--footer -->
        <?php if (isset($showFooter) && $showFooter) { ?>
            <footer class="footer-container">
                <?php include COMPONENTS_PATH . '/footer.php'; ?>
            </footer>
        <?php } ?>
        <!--footer end -->

    </div>
    <!-- Main end -->

    <!--=============== scripts  ===============-->
    <script src="/public/build/bundle-bootstrap.js"></script>
    <script src="/public/build/bundle-angular.js"></script>
    <script src="/public/build/bundle-project.js"></script>

    <script src="/js/scripts.js"></script>

    <?php if (isset($page_scripts)): ?>
        <?php foreach ($page_scripts as $script): ?>
            <script src="<?php echo $script; ?>"></script>
        <?php endforeach; ?>
    <?php endif; ?>

</body>

</html>