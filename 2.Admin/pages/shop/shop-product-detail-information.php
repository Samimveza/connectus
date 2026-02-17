<div class="information-form" ng-controller="shopProductDetailInformationController">

    <!-- Product Gallery Section -->
    <div class="form-section">
        <h2 class="section-title">Product Gallery</h2>
        
        <!-- No Images Message -->
        <div class="no-fields-message" ng-if="!controller.shopProductDetail.productImages || controller.shopProductDetail.productImages.length === 0">
            <i class="fas fa-images"></i>
            <h3>No Product Images Added Yet</h3>
            <p>Add product images to showcase your product to customers</p>
        </div>

        <!-- Product Images Grid -->
        <div class="product-images-container" ng-if="controller.shopProductDetail.productImages && controller.shopProductDetail.productImages.length > 0">
            <div class="product-image-item" 
                ng-repeat="productImage in controller.shopProductDetail.productImages track by $index"
                drag-events
                drag-start="controller.handleProductImageDragStart($event, $index)"
                drag-over="controller.handleProductImageDragOver($event, $index)"
                drop="controller.handleProductImageDrop($event, $index)"
                drag-end="controller.handleProductImageDragEnd($event)">
                
                <div class="product-image-header">
                    <button class="field-drag-handle">
                        <i class="fas fa-grip-vertical"></i>
                    </button>
                    <span class="field-type">
                        <i class="fas fa-image"></i>
                        Product Image {{$index + 1}}
                    </span>
                    <button class="field-remove" type="button" ng-click="controller.removeProductImage(productImage)">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="product-image-content">
                    <div class="photo-upload">
                        <div class="current-photo">
                            <img src="/images/sample-product-image.png" alt="Product Image" ng-show="!productImage.image.url">
                            <img src="{{productImage.image.url}}" alt="Product Image" ng-show="productImage.image.url">
                        </div>
                        <button disable-animate class="replace-photo" ngf-select="controller.upload($file, productImage.image, false, '>=160')" ngf-accept="'image/*'" type="button">
                            <i class="fas fa-image"></i>
                            Replace/Add Product Image
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Add Image Button -->
        <button class="btn-submit" type="button" ng-click="controller.addProductImage()">
            <i class="fas fa-plus"></i> Add Product Image
        </button>
    </div>

    <!-- Product Information Section -->
    <div class="form-section">
        <h2 class="section-title">Product Information</h2>

        <div class="form-group">
            <label for="productName">Name</label>
            <input type="text" id="productName" class="form-input" ng-model="controller.shopProductDetail.productName" placeholder="Product Name" name="productName">
        </div>

        <div class="form-group">
            <label for="productSku">SKU</label>
            <input type="text" id="productSku" class="form-input" ng-model="controller.shopProductDetail.sku" placeholder="Stock Keeping Unit" name="productSku">
        </div>

        <div class="form-group">
            <label for="productSubtitle">Subtitle</label>
            <input type="text" id="productSubtitle" class="form-input" ng-model="controller.shopProductDetail.subtitle" placeholder="Product subtitle or tagline" name="productSubtitle">
        </div>

        <div class="form-group">
            <label for="productDescription">Description</label>
            <div text-angular class="form-input-wysiwyg-text-angular"
                ng-model="controller.shopProductDetail.description"
                ta-toolbar="[['h1','h2','h3'],['bold','italics','underline','strikeThrough'],['ul','ol'],['justifyLeft','justifyCenter','justifyRight'],['indent','outdent'],['insertLink','insertImage'],['clear']]"
                ta-text-editor-class="form-input-wysiwyg"
                ta-html-editor-class="form-input-wysiwyg"
                placeholder="Detailed description of your product..."
                name="productDescription"
                id="productDescription">
            </div>
        </div>

        <!-- Product Status Toggles -->
        <div class="management-options">
            <div class="management-option">
                <div class="option-header">
                    <label>Product Status</label>
                    <div class="toggle-switch">
                        <input type="checkbox" id="productStatus" ng-model="controller.shopProductDetail.isActive" ng-change="controller.toggleProductStatus()">
                        <label for="productStatus"></label>
                    </div>
                </div>
                <p class="option-description">Enable or disable this product for customers to view and purchase.</p>
            </div>

            <div class="management-option">
                <div class="option-header">
                    <label>Featured Product</label>
                    <div class="toggle-switch">
                        <input type="checkbox" id="featuredStatus" ng-model="controller.shopProductDetail.isFeatured" ng-change="controller.toggleFeaturedStatus()">
                        <label for="featuredStatus"></label>
                    </div>
                </div>
                <p class="option-description">Mark this product as featured to highlight it on your store.</p>
            </div>

            <div class="management-option">
                <div class="option-header">
                    <label>Requires Shipping</label>
                    <div class="toggle-switch">
                        <input type="checkbox" id="shippingRequirement" ng-model="controller.shopProductDetail.requiresShipping" ng-change="controller.toggleShippingRequirement()">
                        <label for="shippingRequirement"></label>
                    </div>
                </div>
                <p class="option-description">Enable if this product needs to be shipped to customers.</p>
            </div>

            <div class="management-option">
                <div class="option-header">
                    <label>Track Inventory</label>
                    <div class="toggle-switch">
                        <input type="checkbox" id="inventoryTracking" ng-model="controller.shopProductDetail.trackInventory" ng-change="controller.toggleInventoryTracking()">
                        <label for="inventoryTracking"></label>
                    </div>
                </div>
                <p class="option-description">Track stock levels for this product.</p>
            </div>

            <div class="management-option">
                <div class="option-header">
                    <label>Allow Backorders</label>
                    <div class="toggle-switch">
                        <input type="checkbox" id="backorders" ng-model="controller.shopProductDetail.allowBackorders" ng-change="controller.toggleBackorders()">
                        <label for="backorders"></label>
                    </div>
                </div>
                <p class="option-description">Allow customers to purchase this product even when out of stock.</p>
            </div>
        </div>
    </div>

    <!-- Product Categories Section -->
    <div class="form-section">
        <h2 class="section-title">Product Categories</h2>

        <!-- No Categories Message -->
        <div class="no-fields-message" ng-if="!controller.shopProductDetail.categories || controller.shopProductDetail.categories.length === 0">
            <i class="fas fa-tags"></i>
            <h3>No Categories Added Yet</h3>
            <p>Add product categories to help customers find your product</p>
        </div>

        <div class="category-items">
            <div class="address-item" ng-repeat="category in controller.shopProductDetail.categories track by $index">
                <div class="address-item-header">
                    <span class="field-type">
                        <i class="fas fa-tags"></i>
                        Product Category {{$index + 1}}
                        <span ng-if="category.isPrimary" class="pro-badge">PRIMARY</span>
                    </span>
                    <button class="field-remove" type="button" ng-click="controller.removeCategory(category)">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="address-content">
                    <div class="form-group">
                        <label>Category</label>
                        <div class="category-search-container">
                            <ui-select ng-model="category.selectedCategory" theme="bootstrap" on-select="controller.onCategorySelected(category)">
                                <ui-select-match placeholder="Search for product category...">{{$select.selected.hierarchy}}</ui-select-match>
                                <ui-select-choices repeat="item in controller.productCategories | filter: $select.search">
                                    <div ng-bind-html="item.hierarchy"></div>
                                </ui-select-choices>
                            </ui-select>
                        </div>
                    </div>

                    <div class="management-option">
                        <div class="option-header">
                            <label>Primary Category</label>
                            <div class="toggle-switch">
                                <input type="checkbox"
                                    id="primaryCategory_{{$index}}"
                                    ng-model="category.isPrimary"
                                    ng-change="controller.setPrimaryCategory(category)">
                                <label for="primaryCategory_{{$index}}"></label>
                            </div>
                        </div>
                        <p class="option-description">Mark this as your main product category. Only one category can be primary.</p>
                    </div>

                    <button class="address-delete-btn" type="button" ng-click="controller.removeCategory(category)">
                        <i class="fas fa-trash"></i> Delete Category
                    </button>
                </div>
            </div>
        </div>
        <button class="btn-submit" type="button" ng-click="controller.addCategory()">
            <i class="fas fa-plus"></i> Add Product Category
        </button>
    </div>

</div>