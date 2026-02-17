<div class="information-form" ng-controller="cardDetailInformationController">

    <div class="option-group">
        <label class="option-label">Company Logo</label>
        <div class="photo-upload">
            <div class="current-photo">
                <img src="/images/sample-company-logo.png" alt="Company Logo" ng-show="!controller.cardDetail.profilePicture.url">
                <img src="{{controller.cardDetail.profilePicture.url}}" alt="Company Logo" ng-show="controller.cardDetail.profilePicture.url">
            </div>

            <button disable-animate class="replace-photo" ngf-select="controller.upload($file,controller.cardDetail.profilePicture,false,'>=160')" ngf-accept="'image/*'" type="button"> <i class="fas fa-building"></i>
                Replace/Add Company Logo</button>
        </div>
    </div>

    <div class="option-group">
        <label class="option-label">Cover Photo</label>
        <div class="cover-upload">
            <div class="current-cover">
                <img src="/images/sample-cover-picture.png" alt="Cover Photo" ng-show="!controller.cardDetail.coverPicture.url">
                <img src="{{controller.cardDetail.coverPicture.url}}" alt="Cover Photo" ng-show="controller.cardDetail.coverPicture.url">
            </div>

            <button disable-animate class="replace-photo" ngf-select="controller.upload($file,controller.cardDetail.coverPicture,false,'>=160')" ngf-accept="'image/*'" type="button"> <i class="fas fa-image"></i>
                Replace/Add Cover Image</button>
        </div>
    </div>

    <div class="option-group">
        <label class="option-label">Color</label>
        <div class="color-options">
            <div class="color-palette-container">
                <div class="color-palette-card" ng-repeat="variant in controller.profileColorVariants">
                    <label class="color-palette-label">
                        <input type="radio" name="colorPalette" ng-model="controller.cardDetail.idColourVariant" ng-value="variant.idVariant" class="palette-radio" ng-change="controller.setColorVariant(variant)">
                        <div class="palette-selection">
                            <div class="palette-name">{{variant.name | capitalize}}</div>
                            <div class="palette-colors">
                                <span class="palette-color" ng-repeat="colorItem in variant.colors" ng-style="{'background-color': colorItem.color}"></span>
                            </div>
                            <div class="palette-description">{{variant.description}}</div>
                            <div class="palette-selected" ng-if="controller.cardDetail.idColourVariant === variant.idVariant">
                                <i class="fas fa-check-circle"></i> Selected
                            </div>
                        </div>
                    </label>
                </div>
            </div>
        </div>
    </div>

    <!-- Company Information Section -->
    <div class="form-section">
        <h2 class="section-title">Company Information</h2>

        <div class="form-group">
            <label for="companyName">Company Name</label>
            <input type="text" id="companyName" class="form-input" ng-model="controller.cardDetail.companyName" placeholder="Company Name" name="companyName">
        </div>

        <div class="form-group">
            <label for="businessRegistrationNumber">Business Registration Number</label>
            <input type="text" id="businessRegistrationNumber" class="form-input" ng-model="controller.cardDetail.businessRegistrationNumber" placeholder="Business Registration Number" name="businessRegistrationNumber">
        </div>

        <div class="form-group">
            <label for="headline">Company Headline/Tagline</label>
            <input type="text" id="headline" class="form-input" ng-model="controller.cardDetail.headline" placeholder="Company Headline/Tagline" name="headline">
        </div>

        <div class="form-group">
            <label for="companyDescription">Company Description</label>
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

    <!-- Business Categories Section -->
    <div class="form-section">
        <h2 class="section-title">Business Categories</h2>

        <!-- No Categories Message -->
        <div class="no-fields-message" ng-if="!controller.cardDetail.categories || controller.cardDetail.categories.length === 0">
            <i class="fas fa-tags"></i>
            <h3>No Categories Added Yet</h3>
            <p>Add business categories to help customers find your company</p>
        </div>

        <div class="category-items">
            <div class="address-item" ng-repeat="category in controller.cardDetail.categories track by $index">
                <div class="address-item-header">
                    <span class="field-type">
                        <i class="fas fa-tags"></i>
                        Business Category {{$index + 1}}
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
                                <ui-select-match placeholder="Search for business category...">{{$select.selected.hierarchy}}</ui-select-match>
                                <ui-select-choices repeat="item in controller.structureCategoriesHiearchy | filter: $select.search">
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
                        <p class="option-description">Mark this as your main business category. Only one category can be primary.</p>
                    </div>

                    <button class="address-delete-btn" type="button" ng-click="controller.removeCategory(category)">
                        <i class="fas fa-trash"></i> Delete Category
                    </button>
                </div>
            </div>
        </div>
        <button class="btn-submit" type="button" ng-click="controller.addCategory()">
            <i class="fas fa-plus"></i> Add Business Category
        </button>
    </div>

    <!-- Contact Information Section -->
    <div class="form-section">
        <h2 class="section-title">Contact Information</h2>

        <div class="form-group">
            <label for="email">Business Email</label>
            <input type="email" id="email" class="form-input" ng-model="controller.cardDetail.email" placeholder="Business Email" name="email">
        </div>

        <div class="form-group">
            <label for="mainPhoneNumber">Main Phone Number</label>
            <input type="text" id="mainPhoneNumber" class="form-input" ng-model="controller.cardDetail.mainPhoneNumber" placeholder="Main Phone Number" name="mainPhoneNumber">
        </div>

        <div class="management-option">
            <div class="option-header">
                <label>Private Phone Number</label>
                <div class="toggle-switch">
                    <input type="checkbox" id="mainPhonePrivate" ng-model="controller.cardDetail.isMainPhoneNumberPrivate">
                    <label for="mainPhonePrivate"></label>
                </div>
            </div>
            <p class="option-description">When enabled, your phone number will not be displayed publicly on your card.</p>
        </div>

        <div class="form-group">
            <label for="website">Website</label>
            <input type="url" id="website" class="form-input" ng-model="controller.cardDetail.mainWebsite" placeholder="https://www.company.com" name="website">
        </div>
    </div>

    <!-- Addresses Section -->
    <div class="form-section">
        <h2 class="section-title">Business Addresses</h2>

        <!-- No Addresses Message -->
        <div class="no-fields-message" ng-if="!controller.cardDetail.addresses || controller.cardDetail.addresses.length === 0">
            <i class="fas fa-map-marker-alt"></i>
            <h3>No Addresses Added Yet</h3>
            <p>Add your business locations to help customers find you</p>
        </div>

        <div class="address-items">
            <div class="field-item address-item"
                ng-repeat="address in controller.cardDetail.addresses track by $index"
                drag-events
                drag-start="controller.handleAddressDragStart($event, $index)"
                drag-over="controller.handleAddressDragOver($event, $index)"
                drop="controller.handleAddressDrop($event, $index)"
                drag-end="controller.handleAddressDragEnd($event)">

                <div class="field-item-header address-item-header">
                    <button class="field-drag-handle">
                        <i class="fas fa-grip-vertical"></i>
                    </button>
                    <span class="field-type">
                        <i class="fas fa-map-marker-alt"></i>
                        Business Address {{address.name}}
                    </span>
                    <button class="field-remove" type="button" ng-click="controller.removeAddress(address)">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="field-content address-content">
                    <div class="form-group">
                        <label>Location Name</label>
                        <input type="text" class="form-input" ng-model="address.name" placeholder="Location Name">
                    </div>
                    <div class="form-group">
                        <label>Address Line 1</label>
                        <input type="text" class="form-input" ng-model="address.addressLine1" placeholder="Address Line 1">
                    </div>
                    <div class="form-group">
                        <label>Address Line 2</label>
                        <input type="text" class="form-input" ng-model="address.addressLine2" placeholder="Address Line 2">
                    </div>
                    <div class="form-group">
                        <label>City</label>
                        <input type="text" class="form-input" ng-model="address.city" placeholder="City">
                    </div>
                    <div class="form-group">
                        <label>Country</label>
                        <input type="text" class="form-input" ng-model="address.country" placeholder="Country">
                    </div>
                    <button class="address-delete-btn" type="button" ng-click="controller.removeAddress(address)"><i class="fas fa-trash"></i> Delete Business Address</button>
                </div>
            </div>
        </div>
        <button class="btn-submit" type="button" ng-click="controller.addAddress()">
            <i class="fas fa-plus"></i> Add Business Address
        </button>
    </div>

    <!-- Company Features Section -->
    <div class="form-section">
        <h2 class="section-title">Company Features</h2>

        <!-- No Features Message -->
        <div class="no-fields-message" ng-if="!controller.cardDetail.features || controller.cardDetail.features.length === 0">
            <i class="fas fa-star"></i>
            <h3>No Features Added Yet</h3>
            <p>Add key features that highlight your company's strengths</p>
        </div>

        <!-- Feature Items -->
        <div class="field-item"
            ng-repeat="feature in controller.cardDetail.features track by $index"
            drag-events
            drag-start="controller.handleFeatureDragStart($event, $index)"
            drag-over="controller.handleFeatureDragOver($event, $index)"
            drop="controller.handleFeatureDrop($event, $index)"
            drag-end="controller.handleFeatureDragEnd($event)">

            <div class="field-item-header">
                <button class="field-drag-handle">
                    <i class="fas fa-grip-vertical"></i>
                </button>
                <span class="field-type">
                    <i class="fas fa-star"></i>
                    Feature - {{feature.name}}
                </span>
                <button class="field-remove" ng-click="controller.removeFeature(feature)">
                    <i class="fas fa-times"></i>
                </button>
            </div>

            <div class="field-content">
                <div class="form-group">
                    <label>Feature Title</label>
                    <input type="text" ng-model="feature.name" placeholder="e.g., 24/7 Customer Support" class="form-input">
                </div>
                <div class="form-group">
                    <label>Feature Description</label>
                    <textarea ng-model="feature.description" placeholder="Brief description of this feature" class="form-input" rows="2"></textarea>
                </div>
            </div>
        </div>

        <button class="btn-submit" type="button" ng-click="controller.addFeature()">
            <i class="fas fa-plus"></i> Add Company Feature
        </button>
    </div>

    <!-- Company Tags Section -->
    <div class="form-section">
        <h2 class="section-title">Company Tags</h2>

        <!-- No Tags Message -->
        <div class="no-fields-message" ng-if="!controller.cardDetail.tags || controller.cardDetail.tags.length === 0">
            <i class="fas fa-tags"></i>
            <h3>No Tags Added Yet</h3>
            <p>Add tags to help categorize and describe your company</p>
        </div>

        <!-- Tag Items -->
        <div class="field-item tag-item"
            ng-repeat="tag in controller.cardDetail.tags track by $index"
            drag-events
            drag-start="controller.handleTagDragStart($event, $index)"
            drag-over="controller.handleTagDragOver($event, $index)"
            drop="controller.handleTagDrop($event, $index)"
            drag-end="controller.handleTagDragEnd($event)">

            <div class="field-item-header">
                <button class="field-drag-handle">
                    <i class="fas fa-grip-vertical"></i>
                </button>
                <span class="field-type">
                    <i class="fas fa-tag"></i>
                    Tag - {{tag.name}}
                </span>
                <button class="field-remove" ng-click="controller.removeTag(tag)">
                    <i class="fas fa-times"></i>
                </button>
            </div>

            <div class="field-content">
                <div class="form-group">
                    <label>Tag Name</label>
                    <input type="text" ng-model="tag.name" placeholder="e.g., Eco-Friendly, Award-Winning, Local Business" class="form-input">
                </div>
                <div class="form-group">
                    <label>Tag Color</label>
                    <select ng-model="tag.color" class="form-input">
                        <option value="blue">Blue</option>
                        <option value="green">Green</option>
                        <option value="purple">Purple</option>
                        <option value="orange">Orange</option>
                        <option value="red">Red</option>
                        <option value="gray">Gray</option>
                    </select>
                </div>
            </div>
        </div>

        <button class="btn-submit" type="button" ng-click="controller.addTag()">
            <i class="fas fa-plus"></i> Add Company Tag
        </button>
    </div>

</div>