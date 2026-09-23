<!-- Shop Attributes Page Content -->
<div class="shop-attributes-page" ng-controller="shopAttributeListController" ng-init="controller.setInfo()">

    <!-- Top Action Bar -->
    <div class="shop-categories-toolbar">
        <button class="btn-add-root-category" ng-click="controller.addNewProductType()">
            <i class="fas fa-plus"></i>
            Add New Product Type
        </button>

        <button class="btn-delete-category" ng-click="controller.deleteProductType()" ng-disabled="!controller.selectedProductType">
            <i class="fas fa-trash"></i>
            Delete Type
        </button>
    </div>


    <div class="shop-attributes-layout">
        <!-- Left Pane - Product Types -->
        <div class="product-types-pane">
            <div class="types-header">
                <h3>Product Types</h3>
                <p class="types-description">Product types are groups of products which share the same attributes. For example "Books", "Apparel", "Hand-made", etc.</p>
                <!--<div class="types-actions">
                    <button class="btn-add-product-type" ng-click="controller.addNewProductType()">
                        <i class="fas fa-plus"></i>
                        Add New Product Type
                    </button>
                    <button class="btn-delete-type" ng-click="controller.deleteProductType()" ng-disabled="!controller.selectedProductType">
                        Delete Type
                    </button>
                </div>-->
            </div>

            <div class="product-types-list">
                <div class="type-item" ng-repeat="productType in controller.productTypes"
                    ng-class="{'selected': productType.isSelected}"
                    ng-click="controller.selectProductType(productType)">
                    <div class="type-content">
                        <div class="type-icon">
                            <i class="fas fa-cube"></i>
                        </div>
                        <div class="type-text">
                            <span class="type-name">{{productType.name}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Right Pane - Attributes -->
        <div class="attributes-pane">
            <div class="attributes-header">
                <h2>'{{controller.selectedProductType.name}}' type</h2>
                <div class="attributes-section">
                    <h3>Attributes</h3>
                    <p class="attributes-description">Additional product detail fields (that will be shown on the storefront) to provide your customers with extra information on the product.</p>
                    <div class="sort-hint">
                        <i class="fas fa-grip-vertical"></i>
                        Drag and drop items to sort
                    </div>
                </div>
            </div>

            <div class="attributes-content">
                <div class="attributes-table">
                    <div class="table-header">
                        <div class="header-name">Name</div>
                        <div class="header-displayed">Displayed name</div>
                        <div class="header-show">Show</div>
                        <div class="header-actions"></div>
                    </div>

                    <div class="table-body">
                        <!-- Existing Attributes -->
                        <div class="attribute-row" ng-repeat="attribute in controller.attributes">
                            <div class="attribute-name">
                                <span>{{attribute.name}}</span>
                                <i class="fas fa-info-circle" ng-if="attribute.hasInfo" title="Information about this attribute"></i>
                            </div>
                            <div class="attribute-displayed">
                                <div class="language-label">French</div>
                                <input type="text" class="form-input"
                                    ng-model="attribute.displayedName"
                                    ng-change="controller.updateAttribute(attribute, 'displayedName', attribute.displayedName)"
                                    placeholder="[French]">
                            </div>
                            <div class="attribute-show">
                                <select class="form-select"
                                    ng-model="attribute.show"
                                    ng-change="controller.updateAttribute(attribute, 'show', attribute.show)">
                                    <option value="Show">Show</option>
                                    <option value="Hide">Hide</option>
                                </select>
                            </div>
                            <div class="attribute-actions">
                                <button class="btn-delete-attribute" ng-click="controller.deleteAttribute(attribute)" title="Delete attribute">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>

                        <!-- New Attribute Row -->
                        <div class="attribute-row new-attribute">
                            <div class="attribute-name">
                                <input type="text" class="form-input"
                                    ng-model="controller.newAttribute.name"
                                    placeholder="Enter attribute name">
                            </div>
                            <div class="attribute-displayed">
                                <div class="language-label">French</div>
                                <input type="text" class="form-input"
                                    ng-model="controller.newAttribute.displayedName"
                                    placeholder="[French]">
                            </div>
                            <div class="attribute-show">
                                <select class="form-select" ng-model="controller.newAttribute.show">
                                    <option value="Show">Show</option>
                                    <option value="Hide">Hide</option>
                                </select>
                            </div>
                            <div class="attribute-actions">
                                <button class="btn-delete-attribute" ng-click="controller.newAttribute = {name: '', displayedName: '', show: 'Show'}" title="Clear form">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="attributes-footer">
                    <button class="btn-add-attribute" ng-click="controller.addNewAttribute()">
                        <i class="fas fa-plus"></i>
                        Add New
                    </button>
                </div>
            </div>
        </div>
    </div>

</div>