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
    <main class="content portfolio-detail-content" itemscope itemtype="https://schema.org/CreativeWork">
        <div class="portfolio-detail-container">
            <a href="/in/<?php echo htmlspecialchars($profileData['slug']); ?>/portfolio" class="portfolio-back-btn">&larr; Back to Portfolio</a>
            <h1 class="portfolio-detail-main-title"><?php echo htmlspecialchars($portfolio['name'] ?? ''); ?></h1>
            <?php
            $mainImageUrl = isset($portfolio['image']['url']) ? str_replace('\\', '/', $portfolio['image']['url']) : '/images/in/sample-cover-picture.png';
            ?>
            <div class="portfolio-detail-main-image">
                <img src="<?php echo htmlspecialchars($mainImageUrl); ?>" alt="<?php echo htmlspecialchars($portfolio['name'] ?? 'Project'); ?>" />
            </div>
            <div class="portfolio-detail-info">
                <?php if (!empty($portfolio['description'])): ?>
                    <div class="portfolio-detail-desc"><?php echo nl2br(htmlspecialchars($portfolio['description'])); ?></div>
                <?php endif; ?>
            </div>
            <?php if (!empty($portfolio['additionalImages']) && is_array($portfolio['additionalImages'])): ?>
                <div class="portfolio-detail-gallery">
                    <?php
                    // Sort additionalImages by displayOrder
                    usort($portfolio['additionalImages'], function ($a, $b) {
                        return ($a['displayOrder'] ?? 0) - ($b['displayOrder'] ?? 0);
                    });
                    foreach ($portfolio['additionalImages'] as $addImg) {
                        $thumbUrl = isset($addImg['image']['url']) ? str_replace('\\', '/', $addImg['image']['url']) : null;
                        if ($thumbUrl): ?>
                            <div class="portfolio-detail-gallery-item">
                                <img src="<?php echo htmlspecialchars($thumbUrl); ?>" alt="Additional image" />
                            </div>
                    <?php endif;
                    }
                    ?>
                </div>
            <?php endif; ?>
        </div>
    </main>
</div>