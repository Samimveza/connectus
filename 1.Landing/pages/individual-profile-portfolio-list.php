<div id="wrapper">
<?php 

if(isset($portfolioData['colorVariant']) && isset($portfolioData['colorVariant']['colors'])){
    echo '<style>';
    foreach ($portfolioData['colorVariant']['colors'] as $colorVar) {
        echo ':root {' . $colorVar['attributeName'] . ': ' . $colorVar['color'] . ';}';
    }
    echo '</style>';
}

?> 
<main class="content" itemscope itemtype="https://schema.org/Person">
    <div class="profile-container">
        <?php $profileSlug = isset($portfolioData['slug']) ? $portfolioData['slug'] : ''; ?>
        <a href="/in/<?php echo htmlspecialchars($profileSlug); ?>" class="portfolio-back-btn">&larr; Back to Profile</a>
        <section class="portfolio-header">
            <span class="portfolio-badge">PORTFOLIO</span>
            <h1 class="profile-name" style="margin-top: 10px;">
                <?php echo !empty($portfolioData['portfolioTitle']) ? htmlspecialchars($portfolioData['portfolioTitle']) : 'ALL PROJECTS'; ?>
            </h1>
            <?php if (!empty($portfolioData['portfolioDescription'])): ?>
            <p class="portfolio-description"><?php echo $portfolioData['portfolioDescription']; ?></p>
            <?php endif; ?>
        </section>
        <div class="portfolio-grid">
            <?php   
            // Use $profileData['portfolios'] if available
            $portfolios = !empty($portfolioData['portfolios']) && is_array($portfolioData['portfolios']) ? $portfolioData['portfolios'] : [];
            // Sort by displayOrder if present
            usort($portfolios, function($a, $b) {
                return ($a['displayOrder'] ?? 0) - ($b['displayOrder'] ?? 0);
            });
            ?>
            <?php if (!empty($portfolios)): ?>
                <?php foreach ($portfolios as $portfolio): ?>
                    <?php $portfolioSlug = isset($portfolio['slug']) ? $portfolio['slug'] : ''; ?>
                    <a href="/in/<?php echo htmlspecialchars($profileSlug); ?>/portfolio/<?php echo htmlspecialchars($portfolioSlug); ?>" class="portfolio-card-link">
                        <div class="portfolio-card">
                            <div class="portfolio-image-container">
                                <?php
                                $mainImageUrl = isset($portfolio['image']['url']) ? str_replace('\\', '/', $portfolio['image']['url']) : '/images/in/sample-cover-picture.png';
                                ?>
                                <img src="<?php echo htmlspecialchars($mainImageUrl); ?>" alt="<?php echo htmlspecialchars($portfolio['name'] ?? 'Project'); ?>" class="portfolio-image" />
                            </div>
                            <?php if (!empty($portfolio['additionalImages']) && is_array($portfolio['additionalImages'])): ?>
                            <!--<div class="portfolio-thumbnails">
                                <?php
                                // Sort additionalImages by displayOrder
                                usort($portfolio['additionalImages'], function($a, $b) {
                                    return ($a['displayOrder'] ?? 0) - ($b['displayOrder'] ?? 0);
                                });
                                foreach ($portfolio['additionalImages'] as $addImg) {
                                    $thumbUrl = isset($addImg['image']['url']) ? str_replace('\\', '/', $addImg['image']['url']) : null;
                                    if ($thumbUrl): ?>
                                        <img src="<?php echo htmlspecialchars($thumbUrl); ?>" alt="Additional image" class="portfolio-thumb" />
                                    <?php endif;
                                }
                                ?>
                            </div>-->
                            <?php endif; ?>
                            <div class="portfolio-info portfolio-info-bg">
                                <div class="portfolio-title"><?php echo htmlspecialchars($portfolio['name'] ?? ''); ?></div>
                                <?php if (!empty($portfolio['description'])): ?>
                                    <div class="portfolio-desc"><?php echo htmlspecialchars($portfolio['description']); ?></div>
                                <?php endif; ?>
                            </div>
                        </div>
                    </a>
                <?php endforeach; ?>
            <?php else: ?>
                <div class="portfolio-empty">No projects found.</div>
            <?php endif; ?>
        </div>
        <footer class="profile-footer-logo">
            <img src="/images/logo.png" alt="Connectus" />
        </footer>
    </div>
</main>
</div>