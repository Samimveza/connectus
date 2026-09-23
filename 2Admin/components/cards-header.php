<!-- Desktop Header Section -->
<div class="cards-header-container" ng-controller="headerController" ng-init="headerController.setInfo()">
    <header class="cards-header" >
        <div class="header-left">
            <h1><?php echo isset($pageTitle) ? htmlspecialchars($pageTitle) : ''; ?></h1>
        </div>
        <div class="header-right">
            <div class="user-profile">
                <button class="profile-toggle" id="profileToggle">
                    <img src="<?php echo isset($userAvatar) ? htmlspecialchars($userAvatar) : '/images/profile-avatar.svg'; ?>" alt="Profile" class="profile-avatar">
                    <span class="user-info">
                        <!--<span class="user-name">{{headerController.commonController.user}}</span>-->
                        <span class="user-email">{{headerController.commonController.user.username}}</span>
                    </span>
                    <i class="fas fa-chevron-up"></i>
                </button>
            </div>
        </div>
    </header>

    <?php include_once('components/profile-dropdown.php'); ?>
    <?php include_once('components/mobile-header.php'); ?>

</div>