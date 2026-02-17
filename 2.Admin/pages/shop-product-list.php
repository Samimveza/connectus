<!-- Shop Products Page Content -->
<div class="shop-products-page" ng-controller="shopProductListController" ng-init="controller.setInfo()">

    <!-- Top Toolbar -->
    <div class="shop-products-toolbar">
        <div class="search-container">
            <i class="fas fa-search search-icon"></i>
            <input type="text" placeholder="Search cards" class="search-input" ng-model="controller.paging.search" ng-change="controller.search()">
        </div>
        
        <div class="sort-container">
            <span class="sort-label">Sort by</span>
            <div class="sort-dropdown">
                <button class="sort-button" ng-click="controller.sortBy()">
                    <span>{{controller.getSortLabel()}}</span>
                    <i class="fas {{controller.getSortIcon()}}"></i>
                </button>
            </div>
        </div>
        
        <div class="action-buttons">
            <button class="btn-search" ng-click="controller.search()">
                <i class="fas fa-search"></i>
                Search
            </button>
            <button class="btn-new-card" ng-click="controller.newProduct()">
                <i class="fas fa-plus"></i>
                New Card
            </button>
        </div>
    </div>

    <!-- Products List -->
    <div class="products-list">
        <!-- Product Card -->
        <div class="product-card" ng-repeat="product in controller.list" ng-class="{'selected': product.isSelected}">
            <div class="product-checkbox">
                <input type="checkbox" ng-model="product.isSelected" ng-change="controller.toggleProductSelection(product)">
            </div>
            
            <div class="product-thumbnail">
                <img ng-src="{{product.image}}" alt="{{product.name}}" onerror="this.src='/images/product-placeholder.png'">
            </div>
            
            <div class="product-info">
                <div class="product-name-id">
                    <h3>{{product.name}} {{product.productId}}</h3>
                </div>
                
                <div class="product-status">
                    <div class="status-indicator" ng-class="product.status">
                        <i class="fas fa-circle"></i>
                        <span>{{product.stock}}</span>
                    </div>
                </div>
                
                <div class="product-features">
                    <div class="feature-item" ng-if="product.featured">
                        <i class="fas fa-star"></i>
                        <span>Featured on homepage</span>
                    </div>
                    <div class="feature-item" ng-if="product.options > 0">
                        <i class="fas fa-file-alt"></i>
                        <span>{{product.options}} {{product.options === 1 ? 'option' : 'options'}}</span>
                    </div>
                    <div class="feature-item" ng-if="product.requiresShipping">
                        <i class="fas fa-truck"></i>
                        <span>Requires shipping</span>
                    </div>
                </div>
            </div>
            
            <div class="product-actions">
                <div class="product-price-section">
                    <div class="sample-badge" ng-if="product.isSample">
                        Sample Product
                    </div>
                    <div class="product-price">
                        {{product.price}}
                    </div>
                </div>
                
                <div class="product-edit-dropdown">
                    <button class="btn-edit-product" ng-click="controller.editProduct(product)">
                        Edit Product
                        <i class="fas fa-chevron-down"></i>
                    </button>
                </div>
                
                <div class="product-navigation">
                    <i class="fas fa-chevron-right"></i>
                </div>
            </div>
        </div>
    </div>

    <!-- Bulk Actions (Hidden by default, shown when products are selected) -->
    <div class="bulk-actions" ng-if="controller.selectedProducts.length > 0">
        <div class="bulk-actions-content">
            <span class="selected-count">{{controller.selectedProducts.length}} product(s) selected</span>
            <div class="bulk-buttons">
                <button class="btn-bulk-enable" ng-click="controller.bulkAction('enable')">
                    <i class="fas fa-check"></i>
                    Enable
                </button>
                <button class="btn-bulk-disable" ng-click="controller.bulkAction('disable')">
                    <i class="fas fa-times"></i>
                    Disable
                </button>
                <button class="btn-bulk-delete" ng-click="controller.bulkAction('delete')">
                    <i class="fas fa-trash"></i>
                    Delete
                </button>
            </div>
        </div>
    </div>

</div>
