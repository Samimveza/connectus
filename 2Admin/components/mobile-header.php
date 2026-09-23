<!-- Mobile Header -->
<div class="mobile-header">
    <button class="menu-toggle">
        <i class="fas fa-bars"></i>
    </button>
    <h1><?php echo isset($pageTitle) ? htmlspecialchars($pageTitle) : ''; ?></h1>
    <button class="profile-toggle">
        <img src="<?php echo isset($userAvatar) ? htmlspecialchars($userAvatar) : '/images/profile-avatar.svg'; ?>" alt="Profile" class="profile-avatar">
    </button>
</div>