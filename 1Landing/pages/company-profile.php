<?php
// The page loader is already included by the main index.php
// Company data is available in $companyData variable
?>
<?php

if (isset($companyData['colorVariant']) && isset($companyData['colorVariant']['colors'])) {
    echo '<style>';
    foreach ($companyData['colorVariant']['colors'] as $colorVar) {
        echo ':root {' . $colorVar['attributeName'] . ': ' . $colorVar['color'] . ';}';
    }
    echo '</style>';
}
//echo json_encode( $companyData);exit;
?>

<!-- Add Navigation Header -->
<nav class="header">
    <div class="container nav-container">
        <div class="logo">
            <?php if (!empty($companyData['processed']['profile_picture'])): ?>
                <img src="<?php echo ($companyData['processed']['profile_picture']); ?>" alt="<?php echo ($companyData['processed']['name']); ?> Logo">
            <?php else: ?>
                <img src="images/logo.png" alt="Logo">
            <?php endif; ?>
        </div>
        
        <!-- Mobile Menu Toggle -->
        <button class="mobile-menu-toggle" aria-label="Toggle navigation menu">
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
        </button>
        
        <ul class="nav-links">
            <li><a href="#home">Home</a></li>
            <?php if (!empty($companyData['processed']['features'])): ?>
                <li><a href="#features">Features</a></li>
            <?php endif; ?>
            <?php if (!empty($companyData['processed']['members'])): ?>
                <li><a href="#team">Team</a></li>
            <?php endif; ?>
            <?php if (!empty($companyData['processed']['portfolios'])): ?>
                <li><a href="#portfolio">Portfolio</a></li>
            <?php endif; ?>
            <?php if (!empty($companyData['processed']['accordions'])): ?>
                <li><a href="#faq">FAQ</a></li>
            <?php endif; ?>
            <li><button class="contact-btn">Contact Us</button></li>
        </ul>
    </div>
</nav>

<!-- Mobile Navigation Overlay -->
<div class="nav-overlay"></div>

<!-- Hero Section -->
<header class="hero" id="home">
    <div class="hero-background" style="background-image: url('<?php echo ($companyData['processed']['cover_picture'] ?: 'https://images.unsplash.com/photo-1497366216548-37526070297c'); ?>');"></div>
    <div class="hero-content">
        <h1><?php echo ($companyData['processed']['name']); ?></h1>
        <p><?php echo ($companyData['processed']['headline']); ?></p>
        <?php if (!empty($companyData['processed']['description'])): ?>
            <div class="hero-description">
                <?php echo $companyData['processed']['description']; ?>
            </div>
        <?php endif; ?>
        <div class="cta-buttons">
            <button class="cta-button">Contact Us</button>
            <?php if (!empty($companyData['processed']['main_website'])): ?>
                <a href="<?php echo ($companyData['processed']['main_website']); ?>" class="cta-button secondary" target="_blank">Visit Website</a>
            <?php endif; ?>
        </div>
    </div>
</header>

<!-- Business Category -->
<?php if (!empty($companyData['processed']['categories'])): ?>
<section class="category">
    <div class="container">
        <h2>Business Categories</h2>
        <div class="tags">
            <?php foreach ($companyData['processed']['categories'] as $category): ?>
                <span><?php echo ($category['category']['name']); ?></span>
            <?php endforeach; ?>
        </div>
    </div>
</section>
<?php endif; ?>

<!-- Tags Section -->
<?php if (!empty($companyData['processed']['tags'])): ?>
<section class="tags-section">
    <div class="container">
        <h2>Specializations</h2>
        <div class="tags">
            <?php foreach ($companyData['processed']['tags'] as $tag): ?>
                <span class="tag-item" style="background-color: <?php echo ($tag['color'] ?? '#6C63FF'); ?>">
                    <?php echo ($tag['name']); ?>
                </span>
            <?php endforeach; ?>
        </div>
    </div>
</section>
<?php endif; ?>

<!-- Features Section -->
<?php if (!empty($companyData['processed']['features'])): ?>
<section id="features" class="products">
    <div class="container">
        <h2 class="section-title">Our Features</h2>
        <p class="section-subtitle">Discover what makes us unique</p>
        <div class="products-grid">
            <?php foreach ($companyData['processed']['features'] as $feature): ?>
                <div class="product-card">
                    <div class="card-content">
                        <h3><?php echo ($feature['name']); ?></h3>
                        <p><?php echo $feature['description']; ?></p>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>
<?php endif; ?>

<!-- About Section -->
<section class="about-section" id="about">
    <div class="container">
        <div class="about-content">

            <!-- Categorized Fields Section -->
            <?php if (!empty($companyData['processed']['structure_fields']) || !empty($companyData['processed']['qr_code'])): ?>
            <div class="categorized-fields-section">
                <h2 class="section-title">Connect With Us</h2>
                
                <!-- QR Code Section -->
                <?php if (!empty($companyData['processed']['page_url'])): ?>
                <div class="qr-code-section">
                    <div class="qr-code-container">
                        <h3>Scan to Connect</h3>
                        <div class="qr-code-image" id="qrCodeContainer">
                            <!-- QR code will be generated here by JavaScript -->
                        </div>
                        <p>Scan this QR code to quickly access our contact information</p>
                    </div>
                </div>
                <?php endif; ?>
                
                <?php
                // Group fields by category
                $categories = [
                    'Communication' => [],
                    'Social' => [],
                    'Video' => [],
                    'Music' => [],
                    'Gaming' => [],
                    'Design' => [],
                    'Payment' => [],
                    'Conferencing' => [],
                    'Other' => []
                ];
                
                foreach ($companyData['processed']['structure_fields'] as $field) {
                    if (!empty($field['value'])) {
                        $category = $field['structureField']['structureFieldCategory'] ?? 'Other';
                        if (isset($categories[$category])) {
                            $categories[$category][] = $field;
                        } else {
                            $categories['Other'][] = $field;
                        }
                    }
                }
                
                // Function to format field value based on type
                function formatFieldValue($field) {
                    $value = $field['value'];
                    $type = $field['structureField']['structureFieldType'];
                    $prefix = $field['structureField']['prefix'] ?? '';
                    
                    switch ($type) {
                        case 'DATE':
                            return date('F j, Y', strtotime($value));
                        case 'FILE':
                            return '<a href="' . htmlspecialchars($value) . '" target="_blank" class="file-link">View File</a>';
                        case 'TEXTAREA':
                            return nl2br(htmlspecialchars($value));
                        case 'TEXT':
                        default:
                            // Check if it's a URL or needs prefix
                            if (filter_var($value, FILTER_VALIDATE_URL)) {
                                return '<a href="' . htmlspecialchars($value) . '" target="_blank" class="external-link">' . htmlspecialchars($value) . '</a>';
                            } elseif (!empty($prefix) && !str_starts_with($value, 'http')) {
                                $fullUrl = $prefix . $value;
                                return '<a href="' . htmlspecialchars($fullUrl) . '" target="_blank" class="external-link">' . htmlspecialchars($value) . '</a>';
                            } else {
                                return htmlspecialchars($value);
                            }
                    }
                }
                
                // Function to get category icon
                function getCategoryIcon($category) {
                    $icons = [
                        'Communication' => 'fas fa-comments',
                        'Social' => 'fas fa-share-alt',
                        'Video' => 'fas fa-video',
                        'Music' => 'fas fa-music',
                        'Gaming' => 'fas fa-gamepad',
                        'Design' => 'fas fa-palette',
                        'Payment' => 'fas fa-credit-card',
                        'Conferencing' => 'fas fa-users',
                        'Other' => 'fas fa-link'
                    ];
                    return $icons[$category] ?? 'fas fa-link';
                }
                ?>
                
                <?php foreach ($categories as $category => $fields): ?>
                    <?php if (!empty($fields)): ?>
                    <div class="category-section">
                        <div class="category-header">
                            <i class="<?php echo getCategoryIcon($category); ?>"></i>
                            <h3><?php echo $category; ?></h3>
                        </div>
                        <div class="category-fields">
                            <?php foreach ($fields as $field): ?>
                            <div class="categorized-field-item">
                                <div class="field-icon">
                                    <i class="<?php echo ($field['structureField']['icon']); ?>"></i>
                                </div>
                                <div class="field-content">
                                    <h4><?php echo ($field['structureField']['name']); ?></h4>
                                    <div class="field-value">
                                        <?php echo formatFieldValue($field); ?>
                                    </div>
                                </div>
                            </div>
                            <?php endforeach; ?>
                        </div>
                    </div>
                    <?php endif; ?>
                <?php endforeach; ?>
            </div>
            <?php endif; ?>

            <!-- Gallery Section -->
            <?php if (!empty($companyData['processed']['gallery']) || !empty($companyData['processed']['profile_picture'])): ?>
            <div class="gallery-section">
                <h2 class="section-title">Gallery</h2>
                <div class="gallery-grid">
               
                    
                    <?php if (!empty($companyData['processed']['gallery'])): ?>
                        <?php foreach ($companyData['processed']['gallery'] as $galleryItem): ?>
                        <div class="gallery-item">
                            <img src="<?php echo ($galleryItem['image']['url']); ?>" alt="<?php echo ($galleryItem['name']); ?>">
                            <?php if (!empty($galleryItem['name'])): ?>
                            <div class="gallery-caption">
                                <h4><?php echo ($galleryItem['name']); ?></h4>
                                <?php if (!empty($galleryItem['description'])): ?>
                                <p><?php echo ($galleryItem['description']); ?></p>
                                <?php endif; ?>
                            </div>
                            <?php endif; ?>
                        </div>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </div>
            </div>
            <?php endif; ?>
        </div>
    </div>
</section>

<!-- Team Section -->
<?php if (!empty($companyData['processed']['members'])): ?>
<section class="about" id="team">
    <div class="container">
        <h2 class="section-title">Our Team</h2>
        <p class="section-subtitle">Meet the experts behind our success</p>

        <div class="team-slider">
            <div class="slider-container">
                <div class="slider-track">
                    <?php foreach ($companyData['processed']['members'] as $member): ?>
                    <div class="team-member">
                        <div class="member-image">
                            <?php if (!empty($member['photo']['url'])): ?>
                                <img src="<?php echo ($member['photo']['url']); ?>" alt="<?php echo ($member['firstname'] . ' ' . $member['lastname']); ?>">
                            <?php else: ?>
                                <img src="images/photo-1560250097-0b93528c311a.jpeg" alt="Team Member">
                            <?php endif; ?>
                        </div>
                        <div class="member-info">
                            <h3><?php echo ($member['firstname'] . ' ' . $member['lastname']); ?></h3>
                            <span class="position"><?php echo ($member['title']); ?></span>
                            <p class="bio"><?php echo $member['description']; ?></p>
                        </div>
                    </div>
                    <?php endforeach; ?>
                </div>
            </div>

            <?php if (count($companyData['processed']['members']) > 1): ?>
            <div class="slider-controls">
                <button class="slider-btn prev" aria-label="Previous slide">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
                <div class="slider-dots"></div>
                <button class="slider-btn next" aria-label="Next slide">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
            </div>
            <?php endif; ?>
        </div>
    </div>
</section>
<?php endif; ?>

<!-- Portfolio Section -->
<?php if (!empty($companyData['processed']['portfolios'])): ?>
<section id="portfolio" class="portfolio">
    <div class="container">
        <h2 class="section-title"><?php echo ($companyData['processed']['portfolio_title'] ?: 'Our Portfolio'); ?></h2>
        <p class="section-subtitle"><?php echo $companyData['processed']['portfolio_description'] ?: 'Explore our latest work and projects'; ?></p>
        <div class="portfolio-grid">
            <?php foreach ($companyData['processed']['portfolios'] as $portfolio): ?>
            <div class="portfolio-item">
                <div class="portfolio-image">
                    <img src="<?php echo ($portfolio['image']['url']); ?>" alt="<?php echo ($portfolio['name']); ?>">
                </div>
                <div class="portfolio-content">
                    <h3><?php echo ($portfolio['name']); ?></h3>
                    <p><?php echo $portfolio['description']; ?></p>
                </div>
            </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>
<?php endif; ?>

<!-- Address Section -->
<?php if (!empty($companyData['processed']['addresses'])): ?>
<section class="map">
    <div class="container">
        <h2 class="section-title">Our Locations</h2>
        <div class="addresses-grid">
            <?php foreach ($companyData['processed']['addresses'] as $address): ?>
            <div class="address-card">
                <h3><?php echo ($address['name']); ?></h3>
                <p><?php echo ($address['addressLine1']); ?></p>
                <?php if (!empty($address['addressLine2'])): ?>
                    <p><?php echo ($address['addressLine2']); ?></p>
                <?php endif; ?>
                <p><?php echo ($address['city'] . ', ' . $address['country']); ?></p>
            </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>
<?php endif; ?>

<!-- Business Hours Section -->
<?php if (!empty($companyData['processed']['working_hours'])): ?>
<section class="hours">
    <div class="container">
        <h2 class="section-title">Business Hours</h2>
        <p class="section-subtitle">We're here to serve you</p>
        <div class="hours-container">
            <div class="hours-card">
                <div class="hours-header">
                    <div class="header-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z" fill="currentColor" />
                            <path d="M12.5 7H11V13L16.2 16.2L17 14.9L12.5 12.2V7Z" fill="currentColor" />
                        </svg>
                    </div>
                    <div class="header-text">
                        <h3>Operating Hours</h3>
                        <p>All times are in local timezone</p>
                    </div>
                </div>
                <div class="hours-content">
                    <?php 
                    $days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                    foreach ($days as $dayName): 
                        $dayData = null;
                        foreach ($companyData['processed']['working_hours']['days'] as $day) {
                            if ($day['name'] === $dayName) {
                                $dayData = $day;
                                break;
                            }
                        }
                    ?>
                    <div class="hours-item">
                        <div class="day-group <?php echo $dayData && $dayData['isOpen'] ? 'active' : 'closed'; ?>">
                            <span class="days"><?php echo $dayName; ?></span>
                            <?php if ($dayData && $dayData['isOpen']): ?>
                                <span class="status">Open</span>
                            <?php endif; ?>
                        </div>
                        <span class="time">
                            <?php if ($dayData && $dayData['isOpen'] && !empty($dayData['timeSlots'])): ?>
                                <?php 
                                $timeSlots = [];
                                foreach ($dayData['timeSlots'] as $slot) {
                                    $openTime = date('g:i A', strtotime($slot['openTime']));
                                    $closeTime = date('g:i A', strtotime($slot['closeTime']));
                                    $timeSlots[] = $openTime . ' - ' . $closeTime;
                                }
                                echo implode(', ', $timeSlots);
                                ?>
                            <?php else: ?>
                                Closed
                            <?php endif; ?>
                        </span>
                    </div>
                    <?php endforeach; ?>
                </div>
                <?php if (!empty($companyData['processed']['main_phone'])): ?>
                <div class="hours-footer">
                    <div class="support-info">
                        <span class="support-label">Contact:</span>
                        <a href="tel:<?php echo ($companyData['processed']['main_phone']); ?>" class="support-phone"><?php echo ($companyData['processed']['main_phone']); ?></a>
                    </div>
                </div>
                <?php endif; ?>
            </div>
        </div>
    </div>
</section>
<?php endif; ?>

<!-- FAQ Section -->
<?php if (!empty($companyData['processed']['accordions'])): ?>
<section class="faq" id="faq">
    <div class="container">
        <h2 class="section-title">Frequently Asked Questions</h2>
        <p class="section-subtitle">Find answers to common questions about our services</p>
        <div class="faq-list">
            <?php foreach ($companyData['processed']['accordions'] as $accordion): ?>
            <details>
                <summary><?php echo ($accordion['name']); ?></summary>
                <p><?php echo $accordion['description']; ?></p>
            </details>
            <?php endforeach; ?>
        </div>
    </div>
</section>
<?php endif; ?>

<!-- Contact Popup -->
<div class="contact-popup" id="contactPopup">
    <div class="popup-content">
        <span class="close-popup">&times;</span>
        <div class="popup-header">
            <h2>Get In Touch</h2>
            <p>Fill out the form below and we'll get back to you shortly.</p>
        </div>
        <form class="contact-form">
            <div class="form-group">
                <label for="name">Full Name</label>
                <input type="text" id="name" name="name" required>
            </div>
            <div class="form-group">
                <label for="email">Email Address</label>
                <input type="email" id="email" name="email" required>
            </div>
            <div class="form-group">
                <label for="phone">Phone Number</label>
                <input type="tel" id="phone" name="phone">
            </div>
            <div class="form-group">
                <label for="message">Message</label>
                <textarea id="message" name="message" rows="4" required></textarea>
            </div>
            <button type="submit" class="submit-btn">Send Message</button>
        </form>
    </div>
</div>

<!-- Sticky Contact Button -->
<button class="sticky-contact">
    <i class="contact-icon">💬</i>
    <span>Contact Us</span>
</button>

<!-- Footer -->
<footer>
    <div class="container">
        <div class="footer-grid">
            <!-- Company Info -->
            <div class="footer-section company-section">
                <div class="footer-logo">
                    <?php if (!empty($companyData['processed']['profile_picture'])): ?>
                        <img src="<?php echo ($companyData['processed']['profile_picture']); ?>" alt="<?php echo ($companyData['processed']['name']); ?> Logo">
                    <?php else: ?>
                        <img src="images/logo.png" alt="Company Logo">
                    <?php endif; ?>
                </div>
                <h3 class="company-name"><?php echo ($companyData['processed']['name']); ?></h3>
            </div>

            <!-- Quick Links -->
            <div class="footer-section">
                <h3>Quick Links</h3>
                <ul class="footer-links">
                    <li><a href="#about">About Us</a></li>
                    <?php if (!empty($companyData['processed']['features'])): ?>
                        <li><a href="#features">Features</a></li>
                    <?php endif; ?>
                    <?php if (!empty($companyData['processed']['members'])): ?>
                        <li><a href="#team">Team</a></li>
                    <?php endif; ?>
                    <?php if (!empty($companyData['processed']['portfolios'])): ?>
                        <li><a href="#portfolio">Portfolio</a></li>
                    <?php endif; ?>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </div>

            <!-- Contact Info -->
            <div class="footer-section">
                <h3>Contact Info</h3>
                <ul class="contact-info">
                    <?php if (!empty($companyData['processed']['addresses'])): ?>
                    <li>
                        <i class="fas fa-map-marker-alt"></i>
                        <span>
                            <?php 
                            $primaryAddress = $companyData['processed']['addresses'][0];
                            echo ($primaryAddress['addressLine1']);
                            if (!empty($primaryAddress['addressLine2'])) {
                                echo '<br>' . ($primaryAddress['addressLine2']);
                            }
                            echo '<br>' . ($primaryAddress['city'] . ', ' . $primaryAddress['country']);
                            ?>
                        </span>
                    </li>
                    <?php endif; ?>
                    <?php if (!empty($companyData['processed']['main_phone'])): ?>
                    <li>
                        <i class="fas fa-phone"></i>
                        <span><?php echo ($companyData['processed']['main_phone']); ?></span>
                    </li>
                    <?php endif; ?>
                    <?php if (!empty($companyData['processed']['email'])): ?>
                    <li>
                        <i class="fas fa-envelope"></i>
                        <span><?php echo ($companyData['processed']['email']); ?></span>
                    </li>
                    <?php endif; ?>
                </ul>
            </div>

            <!-- Social Media -->
            <div class="footer-section">
                <h3>Connect With Us</h3>
                <div class="social-links">
                    <?php
                    // Filter structure fields to only show Social category
                    $socialFields = array_filter($companyData['processed']['structure_fields'], function($field) {
                        return ($field['structureField']['structureFieldCategory'] ?? '') === 'Social' && !empty($field['value']);
                    });
                    
                    // Function to get social media icon and label
                    function getSocialIcon($fieldName, $field) {
                        $name = strtolower($fieldName);
                        if (strpos($name, 'facebook') !== false) {
                            return ['icon' => 'fab fa-facebook-f', 'label' => 'Facebook'];
                        } elseif (strpos($name, 'instagram') !== false) {
                            return ['icon' => 'fab fa-instagram', 'label' => 'Instagram'];
                        } elseif (strpos($name, 'twitter') !== false || strpos($name, 'x') !== false) {
                            return ['icon' => 'fab fa-twitter', 'label' => 'Twitter'];
                        } elseif (strpos($name, 'linkedin') !== false) {
                            return ['icon' => 'fab fa-linkedin-in', 'label' => 'LinkedIn'];
                        } elseif (strpos($name, 'youtube') !== false) {
                            return ['icon' => 'fab fa-youtube', 'label' => 'YouTube'];
                        } elseif (strpos($name, 'tiktok') !== false) {
                            return ['icon' => 'fab fa-tiktok', 'label' => 'TikTok'];
                        } elseif (strpos($name, 'whatsapp') !== false) {
                            return ['icon' => 'fab fa-whatsapp', 'label' => 'WhatsApp'];
                        } elseif (strpos($name, 'telegram') !== false) {
                            return ['icon' => 'fab fa-telegram-plane', 'label' => 'Telegram'];
                        } elseif (strpos($name, 'snapchat') !== false) {
                            return ['icon' => 'fab fa-snapchat-ghost', 'label' => 'Snapchat'];
                        } elseif (strpos($name, 'discord') !== false) {
                            return ['icon' => 'fab fa-discord', 'label' => 'Discord'];
                        } elseif (strpos($name, 'reddit') !== false) {
                            return ['icon' => 'fab fa-reddit-alien', 'label' => 'Reddit'];
                        } elseif (strpos($name, 'pinterest') !== false) {
                            return ['icon' => 'fab fa-pinterest-p', 'label' => 'Pinterest'];
                        } elseif (strpos($name, 'github') !== false) {
                            return ['icon' => 'fab fa-github', 'label' => 'GitHub'];
                        } else {
                            // Use the field's icon if available, otherwise default to globe
                            return ['icon' => $field['structureField']['icon'] ?? 'fas fa-globe', 'label' => $field['structureField']['name']];
                        }
                    }
                    
                    foreach ($socialFields as $field):
                        $socialInfo = getSocialIcon($field['structureField']['name'], $field);
                        $url = $field['value'];
                        
                        // Add prefix if available and URL doesn't start with http
                        if (!empty($field['structureField']['prefix']) && !str_starts_with($url, 'http')) {
                            $url = $field['structureField']['prefix'] . $url;
                        }
                    ?>
                    <a href="<?php echo htmlspecialchars($url); ?>" class="social-link" aria-label="<?php echo htmlspecialchars($socialInfo['label']); ?>" target="_blank" rel="noopener">
                        <i class="<?php echo $socialInfo['icon']; ?>"></i>
                    </a>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>

        <!-- Footer Bottom -->
        <div class="footer-bottom">
            <div class="copyright">
                &copy; <?php echo date('Y'); ?> <?php echo ($companyData['processed']['name']); ?>. All rights reserved.
            </div>
        </div>
    </div>
</footer>

<!-- QR Code Generation Script -->
<?php if (!empty($companyData['processed']['page_url'])): ?>
    <script>
    document.addEventListener('DOMContentLoaded', function() {
        const qrContainer = document.getElementById('qrCodeContainer');
        if (qrContainer) {
            const pageUrl = '<?php echo htmlspecialchars($companyData['processed']['page_url']); ?>';
            
            new QRCode(qrContainer, {
                text: pageUrl,
                width: 150,
                height: 150,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });
        }
    });
    </script>
<?php endif; ?>