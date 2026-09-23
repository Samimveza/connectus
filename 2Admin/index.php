<?php

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
$route = $path_parts[0] ?: 'welcome';

// Default meta data
$page_title = SITE_TITLE;
$page_description = SITE_DESCRIPTION;
$page_keywords = '';
$page_url = SITE_URL . $request_uri;
$page_scripts = [];

$includeFooter = true;
$requiredFile = '';

switch ($route) {
    case 'login':
        $requiredFile = 'pages/login.php';
        break;

    case 'signup':
        $requiredFile = 'pages/signup.php';
        break;

    case 'integration-list':
        $requiredFile = 'pages/integration-list.php';
        break;

    case 'integration-detail':
        $requiredFile = 'pages/integration-detail.php';
        break;

    case 'welcome':
        $requiredFile = 'pages/welcome.php';
        break;

    case 'help-center':
        $requiredFile = 'pages/help-center.php';
        break;

    case 'card-list':
        $requiredFile = 'pages/card-list.php';
        break;

    case 'card-detail':
        if (isset($path_parts[1]) && isset($path_parts[2])) {
            $_GET['idCard'] = $path_parts[1];
            $_GET['screenMode'] = $path_parts[2];
        } else {
            header('Location: /card-list');
            exit();
        }
        $requiredFile = 'pages/card-detail.php';
        break;

    case 'company-list':
        $requiredFile = 'pages/company-card-list.php';
        break;

    case 'company-detail':
        if (isset($path_parts[1]) && isset($path_parts[2])) {
            $_GET['idCard'] = $path_parts[1];
            $_GET['screenMode'] = $path_parts[2];
        } else {
            header('Location: /company-list');
            exit();
        }
        $requiredFile = 'pages/company-card-detail.php';
        break;

    case 'shop-category-list':
        $requiredFile = 'pages/shop-category-list.php';
        break;

    case 'shop-attribute-list':
        $requiredFile = 'pages/shop-attribute-list.php';
        break;

    case 'shop-product-list':
        $requiredFile = 'pages/shop-product-list.php';
        break;

    case 'shop-product-detail':
        if (isset($path_parts[1]) && isset($path_parts[2])) {
            $_GET['idShop'] = $path_parts[1];
            $_GET['idShopProduct'] = $path_parts[2];
            $_GET['screenMode'] = $path_parts[3];
        } else {
            header('Location: /shop-product-list');
            exit();
        }
        $requiredFile = 'pages/shop-product-detail.php';
        break;

    case 'shop-detail':
        if (isset($path_parts[1]) && isset($path_parts[2])) {
            $_GET['idShop'] = $path_parts[1];
            $_GET['screenMode'] = $path_parts[2];
        } else {
            header('Location: /404');
            exit();
        }
        $requiredFile = 'pages/shop-detail.php';
        break;

    case 'forgot-password':
        $requiredFile = 'pages/forgot-password.php';
        break;

    case 'message-modal':
        $requiredFile = 'pages/message-modal.php';
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

<?php
if (isset($isStandAlone) && $isStandAlone === true) {
    require_once $requiredFile;
    exit();
}
?>


<!DOCTYPE HTML>
<html lang="en">

<head>
    <!--=============== basic  ===============-->
    <meta charset="UTF-8">
    <title><?php echo isset($page_title) ? $page_title . ' - ' . SITE_TITLE : SITE_TITLE; ?></title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="robots" content="index, follow" />
    <meta name="keywords" content="<?php echo isset($page_keywords) ? $page_keywords : ''; ?>" />
    <meta name="description" content="<?php echo isset($page_description) ? $page_description : SITE_DESCRIPTION; ?>" />

    <!-- Preload Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="<?php echo isset($page_url) ? $page_url : SITE_URL; ?>">
    <meta property="og:title" content="<?php echo isset($page_title) ? $page_title : SITE_TITLE; ?>">
    <meta property="og:description" content="<?php echo isset($page_description) ? $page_description : SITE_DESCRIPTION; ?>">
    <meta property="og:image" content="<?php echo isset($page_image) ? $page_image : SITE_URL . '/images/default.jpg'; ?>">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="<?php echo isset($page_url) ? $page_url : SITE_URL; ?>">
    <meta property="twitter:title" content="<?php echo isset($page_title) ? $page_title : SITE_TITLE; ?>">
    <meta property="twitter:description" content="<?php echo isset($page_description) ? $page_description : SITE_DESCRIPTION; ?>">
    <meta property="twitter:image" content="<?php echo isset($page_image) ? $page_image : SITE_URL . '/images/default.jpg'; ?>">

    <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png">
    <link rel="manifest" href="/favicon/site.webmanifest">

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
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">

    <script type="text/javascript">
        var hostname = '<?php echo SITE_URL; ?>';
        var apiEndpoint = '<?php echo SITE_API_ENDPOINT; ?>';
        var userRoles = [];
        var domain = '<?php echo str_replace(':' . $_SERVER['SERVER_PORT'], '', $_SERVER['HTTP_HOST']); ?>';
    </script>
</head>

<body ng-controller="baseController" ng-cloak>

    <div ng-show="baseController.isLoadingShown" class="loading-container">
        <div class="spinner-grow text-primary loading-spinner" role="status"></div>
    </div>
    <toaster-container></toaster-container>
    <div ng-controller="commonController"></div>

    <div id="main" class="<?php echo !isset($isSideMenuRequired) || !$isSideMenuRequired ? 'no-side-menu' : ''; ?>">
        <?php if (isset($showHeader) && $showHeader) { ?>
            <!-- Header Section -->
            <?php include_once('components/cards-header.php'); ?>
        <?php } ?>

        <div class="layout-container">

            <?php
            if (isset($isSideMenuRequired) && $isSideMenuRequired) {
                include_once('components/side-menu.php');
            }
            ?>

            <?php if ($requiredFile) {
                require_once $requiredFile;
            } ?>
        </div>

        <?php if ($includeFooter) { ?>
            <!--footer -->
            <footer class="footer-container">
                <?php include COMPONENTS_PATH . '/footer-content.php'; ?>
            </footer>
            <!--footer end -->
        <?php } ?>

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