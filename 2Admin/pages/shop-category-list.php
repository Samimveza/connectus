<!-- Shop Categories Page Content -->
<div class="shop-categories-page" ng-controller="shopCategoryListController" ng-init="controller.setInfo()">

    <!-- Top Action Bar -->
    <div class="shop-categories-toolbar">
        <button class="btn-add-root-category" ng-click="controller.addRootCategory()">
            <i class="fas fa-plus"></i>
            Add Root Category
        </button>
        <button class="btn-add-subcategory" ng-click="controller.addSubcategory()" ng-disabled="!controller.selectedCategory">
            <i class="fas fa-plus"></i>
            Add Subcategory
        </button>
        <button class="btn-delete-category" ng-click="controller.deleteCategory(controller.selectedCategory)" ng-disabled="!controller.selectedCategory">
            <i class="fas fa-trash"></i>
            Delete Category
        </button>
    </div>

    <div class="shop-categories-layout">
        <!-- Left Pane - Categories Tree -->
        <div class="categories-tree-pane">
            <div class="tree-header">
                <h3>Categories</h3>
                <p class="tree-instructions">Drag and drop items to sort</p>
                <div class="tree-actions">
                    <a href="#" class="tree-action-link" ng-click="controller.collapseAll()">Collapse All</a>
                    <a href="#" class="tree-action-link" ng-click="controller.expandAll()">Expand All</a>
                </div>
            </div>

            <div class="categories-tree">
                <div class="tree-item root-item" ng-repeat="category in controller.categoriesTree" ng-class="{'selected': category.id === controller.selectedCategory?.id}">
                    <div class="tree-item-content" ng-click="controller.selectCategory(category)">
                        <div class="tree-item-toggle" ng-click="controller.toggleCategory(category, $event)">
                            <i class="fas fa-chevron-right" ng-class="{'expanded': category.isExpanded}"></i>
                        </div>
                        <div class="tree-item-icon">
                            <i class="fas fa-folder" ng-class="{'open': category.isExpanded}"></i>
                        </div>
                        <div class="tree-item-text">
                            <span class="tree-item-name">{{category.name}}</span>
                            <span class="tree-item-count">({{category.itemCount}})</span>
                        </div>
                    </div>

                    <!-- Subcategories -->
                    <div class="tree-subitems" ng-if="category.isExpanded && category.subcategories.length > 0">
                        <div class="tree-item sub-item" ng-repeat="subcategory in category.subcategories" ng-class="{'selected': subcategory.id === controller.selectedCategory?.id}">
                            <div class="tree-item-content" ng-click="controller.selectCategory(subcategory)">
                                <div class="tree-item-icon">
                                    <i class="fas fa-tag"></i>
                                </div>
                                <div class="tree-item-text">
                                    <span class="tree-item-name">{{subcategory.name}}</span>
                                    <span class="tree-item-count">({{subcategory.itemCount}})</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Right Pane - Category Details -->
        <div class="category-details-pane" ng-if="controller.selectedCategory">
            <div class="details-header">
                <h2>{{controller.selectedCategory.name}} category</h2>
            </div>

            <!-- Navigation Tabs -->
            <!--<div class="details-tabs">
                <button class="tab-button active" ng-click="controller.setActiveTab('general')">
                    General
                </button>
                <button class="tab-button" ng-click="controller.setActiveTab('products')">
                    Category Products
                </button>
                <button class="tab-button" ng-click="controller.setActiveTab('seo')">
                    SEO
                </button>
            </div>-->

            <!-- Tab Content -->
            <div class="tab-content">
                <!-- General Tab -->
                <div class="tab-pane active" ng-if="controller.activeTab === 'general'">
                    <div class="form-section">
                        <div class="form-group">
                            <label for="categoryName">Name</label>
                            <input type="text" id="categoryName" class="form-input" ng-model="controller.selectedCategory.name" placeholder="Enter category name">
                        </div>

                        <div class="form-group">
                            <label>Availability</label>
                            <div class="availability-options">
                                <div class="availability-option" ng-class="{'active': controller.selectedCategory.isEnabled}">
                                    <i class="fas fa-check"></i>
                                    <span>Enabled</span>
                                </div>
                                <a href="#" class="availability-link" ng-click="controller.toggleCategoryStatus(controller.selectedCategory)">
                                    {{controller.selectedCategory.isEnabled ? 'Disable' : 'Enable'}}
                                </a>
                            </div>
                        </div>

                        <div class="form-group">
                            <label>Category Image</label>
                            <div class="category-image-upload">
                                <div class="image-placeholder">
                                    <i class="fas fa-gift"></i>
                                </div>
                                <p class="upload-instructions">Upload/change category image</p>

                                <button disable-animate class="replace-photo d-inline-block" ngf-select="controller.upload($file,controller.cardDetail.profilePicture,false,'>=160')" ngf-accept="'image/*'" type="button"> <i class="fas fa-building"></i>
                                    Replace/Add Company Logo</button>

                            </div>
                        </div>

                        <div class="form-group">
                            <label for="categoryDescription">Description</label>

                            <div text-angular class="form-input-wysiwyg-text-angular"
                                ng-model="controller.cardDetail.companyDescription"
                                ta-toolbar="[['h1','h2','h3'],['bold','italics','underline','strikeThrough'],['ul','ol'],['justifyLeft','justifyCenter','justifyRight'],['indent','outdent'],['insertLink','insertImage'],['clear']]"
                                ta-text-editor-class="form-input-wysiwyg"
                                ta-html-editor-class="form-input-wysiwyg"
                                placeholder="Brief description of your company..."
                                name="companyDescription"
                                id="companyDescription">
                            </div>
                        </div>
                    </div>
                </div>

                <!--<div class="tab-pane" ng-if="controller.activeTab === 'products'">
                    <div class="products-placeholder">
                        <i class="fas fa-box"></i>
                        <h3>Category Products</h3>
                        <p>Manage products in this category</p>
                    </div>
                </div>

                <div class="tab-pane" ng-if="controller.activeTab === 'seo'">
                    <div class="seo-placeholder">
                        <i class="fas fa-search"></i>
                        <h3>SEO Settings</h3>
                        <p>Configure search engine optimization settings</p>
                    </div>
                </div>
-->
            </div>
        </div>

        <!-- No Category Selected -->
        <div class="category-details-pane no-selection" ng-if="!controller.selectedCategory">
            <div class="no-selection-content">
                <i class="fas fa-folder-open"></i>
                <h3>Select a Category</h3>
                <p>Choose a category from the tree to view and edit its details</p>
            </div>
        </div>
    </div>

</div>