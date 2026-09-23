<?php if (isset($isSideMenuRequired) && $isSideMenuRequired): ?>
    <!-- Side Menu (Desktop) -->
    <aside class="side-menu">
        <div class="logo">
            <span class="logo-text"><img src="/images/logo.png" alt="logo" class="logo-image"></span>
        </div>
        <nav class="menu-items">
            <a href="/card-list" class="menu-item <?php echo ($currentPage === 'card-list' || $currentPage === 'card-detail') ? 'active' : ''; ?>">
                <i class="fas fa-id-card"></i>
                Individual
            </a>

            <a href="/company-list" class="menu-item <?php echo ($currentPage === 'company-list' || $currentPage === 'company-detail') ? 'active' : ''; ?>">
                <i class="fas fa-building"></i>
                Company
            </a>

            <a href="/integration-list" class="menu-item <?php echo ($currentPage === 'integration-list' || $currentPage === 'integration-detail') ? 'active' : ''; ?>">
                <i class="fas fa-exchange-alt"></i>
                Integrations
            </a>

           <!-- <div class="menu-item-dropdown">
                <a href="#" class="menu-item <?php echo ($currentPage === 'shop-list' || $currentPage === 'shop-categories' || $currentPage === 'shop-attributes') ? 'active' : ''; ?>">
                    <i class="fas fa-shopping-cart"></i>
                    Shop
                    <i class="fas fa-chevron-down dropdown-arrow"></i>
                </a>
                <div class="dropdown-menu">
                    <a href="/shop-product-list" class="dropdown-item <?php echo ($currentPage === 'shop-product-list' || $currentPage === 'shop-product-detail') ? 'active' : ''; ?>">
                        <i class="fas fa-list-ul"></i>
                        Products
                    </a>

                    <a href="/shop-category-list" class="dropdown-item <?php echo ($currentPage === 'shop-category-list' || $currentPage === 'shop-category-detail') ? 'active' : ''; ?>">
                        <i class="fas fa-tags"></i>
                        Categories
                    </a>
                    <a href="/shop-attribute-list" class="dropdown-item <?php echo ($currentPage === 'shop-attribute-list' || $currentPage === 'shop-attribute-detail') ? 'active' : ''; ?>">
                        <i class="fas fa-list-ul"></i>
                        Attributes
                    </a>
                </div>
            </div>-->
        </nav>
        <div class="menu-footer">
            <a href="/help-center" class="menu-item">
                <i class="fas fa-question-circle"></i>
                Help Center
            </a>
        </div>
    </aside>
<?php endif; ?>