<div class="attributes-form" ng-controller="shopProductDetailAttributesController">

    <!-- Product Type Header -->
    <div class="product-type-header">
        <div class="product-type-info">
            <h2 class="product-type-title">{{controller.selectedProductType.name || 'Select Product Type'}}</h2>
            <a href="#" class="change-type-link" ng-click="controller.changeProductType()">[Change type]</a>
        </div>
        <div class="header-actions">
            <a href="#" class="manage-attributes-link" ng-click="controller.manageAttributes()">Manage Attributes</a>
        </div>
    </div>

    <!-- Attributes Table -->
    <div class="attributes-table-container">
        <div class="attributes-table-header">
            <div class="attribute-column">Attribute</div>
            <div class="value-column">Value</div>
        </div>

        <!-- No Attributes Message -->
        <div class="no-attributes-message" ng-if="!controller.shopProductDetail.attributes || controller.shopProductDetail.attributes.length === 0">
            <i class="fas fa-list"></i>
            <h3>No Attributes Available</h3>
            <p>Select a product type to see available attributes</p>
        </div>

        <!-- Attributes List -->
        <div class="attributes-list" ng-if="controller.shopProductDetail.attributes && controller.shopProductDetail.attributes.length > 0">
            <div class="attribute-row" ng-repeat="attribute in controller.shopProductDetail.attributes track by $index">
                <div class="attribute-column">
                    <span class="attribute-name">{{attribute.name}}</span>
                    <span class="attribute-required" ng-if="attribute.isRequired">*</span>
                </div>
                <div class="value-column">
                    <!-- Text Input -->
                    <input type="text" 
                           class="attribute-value-input" 
                           ng-model="attribute.value" 
                           ng-if="attribute.type === 'text'"
                           placeholder="{{attribute.name}}"
                           ng-required="attribute.isRequired">
                    
                    <!-- Number Input -->
                    <input type="number" 
                           class="attribute-value-input" 
                           ng-model="attribute.value" 
                           ng-if="attribute.type === 'number'"
                           placeholder="{{attribute.name}}"
                           ng-required="attribute.isRequired">
                    
                    <!-- Select Dropdown -->
                    <select class="attribute-value-select" 
                            ng-model="attribute.value" 
                            ng-if="attribute.type === 'select'"
                            ng-required="attribute.isRequired">
                        <option value="">Select {{attribute.name}}</option>
                        <option ng-repeat="value in attribute.values" 
                                ng-value="value.name">{{value.name}}</option>
                    </select>
                    
                    <!-- Textarea -->
                    <textarea class="attribute-value-textarea" 
                              ng-model="attribute.value" 
                              ng-if="attribute.type === 'textarea'"
                              placeholder="{{attribute.name}}"
                              ng-required="attribute.isRequired"
                              rows="3"></textarea>
                    
                    <!-- Checkbox -->
                    <div class="attribute-checkbox" ng-if="attribute.type === 'checkbox'">
                        <input type="checkbox" 
                               ng-model="attribute.value" 
                               ng-required="attribute.isRequired">
                        <label>{{attribute.name}}</label>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Informational Note -->
    <div class="attributes-note">
        <p>Attributes with empty values are not displayed in the storefront.</p>
    </div>

    <!-- Product Type Selection Modal (if needed) -->
    <div class="product-type-selection" ng-if="controller.showProductTypeSelection">
        <div class="modal-overlay" ng-click="controller.closeProductTypeSelection()"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3>Select Product Type</h3>
                <button class="close-button" ng-click="controller.closeProductTypeSelection()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="product-type-list">
                    <div class="product-type-item" 
                         ng-repeat="productType in controller.productTypes" 
                         ng-click="controller.selectProductType(productType)">
                        <div class="product-type-name">{{productType.name}}</div>
                        <div class="product-type-description">{{productType.description}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>
