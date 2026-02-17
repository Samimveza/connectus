
<div id="wrapper">
<?php 

if(isset($profileData['colorVariant']) && isset($profileData['colorVariant']['colors'])){
    echo '<style>';
    foreach ($profileData['colorVariant']['colors'] as $colorVar) {
        echo ':root {' . $colorVar['attributeName'] . ': ' . $colorVar['color'] . ';}';
    }
    echo '</style>';
}

?> 
<main class="content" itemscope itemtype="https://schema.org/Person">
        <div class="profile-container">
            <article class="profile-card">
                <header class="profile-logo">
                    <div class="logo-pattern"></div>
                    <img src="<?php echo $profileData['coverPicture']['url'] ?? '/images/in/sample-cover-picture.png'; ?>" alt="<?php echo $profileData['workingOrganisation'] ?: htmlspecialchars($profileData['firstname'] . ' ' . $profileData['lastname']); ?>" itemprop="image" />
                </header>
                
                <div class="profile-avatar-container">
                    <section class="profile-avatar-section">
                        <div class="profile-avatar-ring">
                            <img class="profile-avatar" src="<?php echo $profileData['profilePicture']['url'] ?? '/images/in/sample-profile.png'; ?>" alt="<?php echo htmlspecialchars($profileData['firstname'] . ' ' . $profileData['lastname']); ?>" itemprop="image" />
                            <div class="profile-status-ring"></div>
                        </div>
                        <h1 class="profile-name" itemprop="name"><?php echo htmlspecialchars($profileData['firstname'] . ' ' . $profileData['lastname']); ?></h1>
                        <h2 class="profile-title" itemprop="jobTitle"><?php echo htmlspecialchars($profileData['headline'] ?: ''); ?></h2>
                    </section>
                    
                    <section class="profile-details">
                        <?php if (!empty($profileData['workingOrganisation'])) : ?>
                        <div class="profile-detail" itemprop="worksFor" itemscope itemtype="https://schema.org/Organization">
                            <i class="fa fa-building"></i> <span itemprop="name"><?php echo htmlspecialchars($profileData['workingOrganisation']); ?></span>
                        </div>
                        <?php endif; ?>
                        
                        <?php if (!empty($profileData['email'])) : ?>
                        <div class="profile-detail">
                            <i class="fa fa-envelope"></i> <a href="mailto:<?php echo htmlspecialchars($profileData['email']); ?>" itemprop="email"><?php echo htmlspecialchars($profileData['email']); ?></a>
                        </div>
                        <?php endif; ?>
                        
                        <?php if (!empty($profileData['addresses']) && is_array($profileData['addresses'])) : 
                            $address = $profileData['addresses'][0]; // Take first address
                        ?>
                        <div class="profile-detail profile-detail-address" itemprop="address" itemscope itemtype="https://schema.org/PostalAddress">
                            <span><i class="fa fa-map-marker-alt"></i> 
                                <?php if (!empty($address['addressLine1'])) : ?>
                                <span itemprop="streetAddress"><?php echo htmlspecialchars($address['addressLine1']); ?></span>
                                <?php endif; ?>
                                
                                <?php if (!empty($address['city'])) : ?>
                                , <span itemprop="addressLocality"><?php echo htmlspecialchars($address['city']); ?></span>
                                <?php endif; ?>
                                
                                <?php if (!empty($address['country'])) : ?>
                                , <span itemprop="addressCountry"><?php echo htmlspecialchars($address['country']); ?></span>
                                <?php endif; ?>
                            </span>
                        </div>
                        <?php endif; ?>
                    </section>
                </div>
            </article>

            
            <?php if (!empty($profileData['portfolios']) && is_array($profileData['portfolios'])): ?>
            <div class="portfolio-link-container">
                <a href="/in/<?php echo htmlspecialchars($profileData['slug']); ?>/portfolio" class="portfolio-link-btn">
                    <i class="fas fa-folder-open"></i> View Portfolio
                </a>
            </div>
            <?php endif; ?>
            
            <div class="profile-actions-container">
                <?php if (!empty($profileData['mainPhoneNumber']) && !($profileData['isMainPhoneNumberPrivate'] ?? false)) : ?>
                <div class="profile-phone-container">
                    <div class="profile-phone">
                        <i class="fa fa-phone"></i>
                        <a href="tel:+<?php echo htmlspecialchars(isset($profileData['mainPhoneNumber']) ? $profileData['mainPhoneNumber'] : ''); ?>" itemprop="telephone">+<?php echo htmlspecialchars(isset($profileData['mainPhoneNumber']) ? $profileData['mainPhoneNumber'] : ''); ?></a>
                    </div>
                </div>
                <?php endif; ?>
                <div class="profile-actions-group">
                    <a href="#" class="profile-action-item" id="save-contact-btn" rel="nofollow">
                        <i class="fas fa-address-card"></i>
                        <span>Save Contact</span>
                        <i class="fas fa-chevron-right action-arrow"></i>
                    </a>
                    <a href="#" class="profile-action-item" id="show-qr-btn" rel="nofollow">
                        <i class="fas fa-qrcode"></i>
                        <span>Show QR</span>
                        <i class="fas fa-chevron-right action-arrow"></i>
                    </a>
                </div>
            </div>
            
            <?php if (!empty($profileData['structureFields']) && count($profileData['structureFields']) > 0) : 
                // Check if there's at least one non-private field to display
                $hasVisibleFields = false;
                foreach ($profileData['structureFields'] as $field) {
                    if (!($field['isPrivate'] ?? false)) {
                        $hasVisibleFields = true;
                        break;
                    }
                }
            ?>
            <?php if ($hasVisibleFields) : ?>
            <div class="structured-fields">
                <h3 class="structured-fields-title">Additional Information</h3>
                <ul class="structured-fields-list">
                    <?php 
                    // Sort structure fields by displayOrder if available
                    if (isset($profileData['structureFields'][0]['displayOrder'])) {
                        usort($profileData['structureFields'], function($a, $b) {
                            return $a['displayOrder'] - $b['displayOrder'];
                        });
                    }
                    
                    foreach ($profileData['structureFields'] as $field) : 
                        // Skip if field is marked as private
                        if ($field['isPrivate'] ?? false) {
                            continue;
                        }
                        
                        $icon = $field['structureField']['icon'] ?? 'fas fa-info-circle';
                        $label = $field['structureField']['name'] ?? '';
                        $fieldType = $field['structureField']['structureFieldType'] ?? '';
                    ?>
                    <li class="structured-field-item">
                        <i class="<?php echo $icon; ?> structured-field-icon"></i>
                        <div class="structured-field-content">
                            <span class="structured-field-label"><?php echo htmlspecialchars($label); ?></span>
                            <div class="structured-field-value">
                                <?php if ($fieldType === 'FILE' && isset($field['document']) && isset($field['document']['url'])) : ?>
                                    <a href="<?php echo htmlspecialchars($field['document']['url']); ?>" target="_blank" rel="noopener">
                                        <?php echo htmlspecialchars($field['displayText'] ?: $field['document']['name']); ?>
                                    </a>
                                <?php elseif ($fieldType === 'DATE' && !empty($field['displayText'])) : ?>
                                    <?php echo htmlspecialchars($field['displayText']); ?>
                                <?php else : ?>
                                    <?php echo htmlspecialchars($field['value'] ?: $field['displayText']); ?>
                                <?php endif; ?>
                            </div>
                        </div>
                    </li>
                    <?php endforeach; ?>
                </ul>
            </div>
            <?php endif; ?>
            <?php endif; ?>
            
            <?php if (!empty($profileData['socialNetworks']) && 1==2 && count($profileData['socialNetworks']) > 0) : ?>
            <div class="connect-section">
                <div class="profile-socials">
                    <?php foreach ($profileData['socialNetworks'] as $social) : 
                        // Skip if URL is not set or empty
                        if (empty($social['url'])) {
                            continue;
                        }
                        
                        $icon = '';
                        $title = '';
                        
                        // Determine icon based on social network type
                        switch (strtolower($social['socialNetworkType'] ?? '')) {
                            case 'facebook': 
                                $icon = 'fab fa-facebook-f'; 
                                $title = 'Facebook';
                                break;
                            case 'twitter': 
                                $icon = 'fab fa-twitter';
                                $title = 'Twitter';
                                break;
                            case 'linkedin': 
                                $icon = 'fab fa-linkedin-in';
                                $title = 'LinkedIn';
                                break;
                            case 'instagram': 
                                $icon = 'fab fa-instagram';
                                $title = 'Instagram';
                                break;
                            default: 
                                $icon = 'fas fa-globe';
                                $title = 'Website';
                        }
                    ?>
                    <a href="<?php echo htmlspecialchars($social['url']); ?>" target="_blank" rel="noopener" title="<?php echo htmlspecialchars($title); ?>">
                        <i class="<?php echo $icon; ?>"></i>
                    </a>
                    <?php endforeach; ?>
                </div>
            </div>
            <?php endif; ?>
            
            <footer class="profile-footer-logo">
                <img src="/images/logo.png" alt="Connectus" />
            </footer>

            
            <!-- QR Code Modal -->
            <div class="modal-overlay" id="qr-modal">
                <div class="modal-container">
                    <div class="modal-header">
                        <h3>Scan QR Code</h3>
                        <button class="modal-close" id="close-qr-modal">×</button>
                    </div>
                    <div class="modal-content">
                        <div class="qr-image-container">
                            <div id="qrcode"></div>
                        </div>
                        <div class="qr-description">
                            <p>Scan this QR code to view <?php echo htmlspecialchars($profileData['firstname'] . ' ' . $profileData['lastname']); ?>'s digital profile on another device.</p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="modal-button primary" id="download-qr-btn">
                            <i class="fas fa-download"></i> Download QR Code
                        </button>
                        <button class="modal-button secondary" id="share-qr-btn">
                            <i class="fas fa-share-alt"></i> Share
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </main>
</div>

<!-- Hidden vCard data for download -->
<div style="display:none;" id="vcard-data" 
     data-fullname="<?php echo htmlspecialchars($profileData['firstname'] . ' ' . $profileData['lastname']); ?>"
     data-phone="<?php echo (!($profileData['isMainPhoneNumberPrivate'] ?? false)) ? htmlspecialchars($profileData['mainPhoneNumber'] ?? '') : ''; ?>"
     data-email="<?php echo htmlspecialchars($profileData['email'] ?? ''); ?>"
     data-org="<?php echo htmlspecialchars($profileData['workingOrganisation'] ?? ''); ?>"
     data-title="<?php echo htmlspecialchars($profileData['headline'] ?? ''); ?>"
     data-photo="<?php echo htmlspecialchars($profileData['profilePicture']['url'] ?? ''); ?>"
     data-url="<?php echo htmlspecialchars(SITE_URL . '/in/' . $profileData['slug']); ?>">
</div>

<div style="display:none;" id="other-data" data-url="<?php echo htmlspecialchars($profileData['qrCodeUrl']); ?>">

</div>
