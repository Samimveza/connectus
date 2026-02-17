<div class="information-form" ng-controller="cardDetailInformationController">


    <div class="option-group">
        <label class="option-label">Profile Photo </label>
        <div class="photo-upload">
            <div class="current-photo">

                <img src="/images/sample-profile.png" alt="Profile Photo" ng-show="!controller.cardDetail.profilePicture.url">
                <img src="{{controller.cardDetail.profilePicture.url}}" alt="Profile Photo" ng-show="controller.cardDetail.profilePicture.url">

            </div>

            <button disable-animate class="replace-photo" ngf-select="controller.upload($file,controller.cardDetail.profilePicture,false,'>=160')" ngf-accept="'image/*'" type="button"> <i class="fas fa-camera"></i>
                Replace/Add Profile Image</button>
        </div>
    </div>

    <div class="option-group">
        <label class="option-label">Cover Photo </label>
        <div class="cover-upload">
            <div class="current-cover">
                <img src="/images/sample-cover-picture.png" alt="Profile Photo" ng-show="!controller.cardDetail.coverPicture.url">
                <img src="{{controller.cardDetail.coverPicture.url}}" alt="Profile Photo" ng-show="controller.cardDetail.coverPicture.url">
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

    <!-- Personal Section -->
    <div class="form-section">
        <h2 class="section-title">Personal</h2>

        <div class="option-group">
            <label class="option-label">Title</label>
            <div class="font-selector">
                <select class="font-select" ng-model="controller.cardDetail.title">
                    <option value="">Select Title</option>
                    <option ng-value="title" ng-repeat="title in controller.titles">{{title}}</option>
                </select>
            </div>
        </div>

        <div class="form-group">
            <label for="firstName">First Name</label>
            <input type="text" id="firstName" class="form-input" ng-model="controller.cardDetail.firstname" placeholder="First Name" name="firstname">
        </div>
        <div class="form-group">
            <label for="otherName">Middle Name</label>
            <input type="text" id="otherName" class="form-input" ng-model="controller.cardDetail.otherName" placeholder="Middle Name" name="otherName">
        </div>
        <div class="form-group">
            <label for="lastName">Last Name</label>
            <input type="text" id="lastName" class="form-input" ng-model="controller.cardDetail.lastname" placeholder="Last Name" name="lastname">
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
            <label for="email">Email</label>
            <input type="text" id="email" class="form-input" ng-model="controller.cardDetail.email" placeholder="Email" name="email">
        </div>

    </div>

    <!-- Affiliation Section -->
    <div class="form-section">
        <h2 class="section-title">Affiliation</h2>

        <div class="form-group">
            <label for="company">Company</label>
            <input type="text" id="company" class="form-input" ng-model="controller.cardDetail.workingOrganisation" placeholder="Company">
        </div>
        <div class="form-group">
            <label for="headline">Headline</label>
            <input type="text" id="headline" class="form-input" ng-model="controller.cardDetail.headline" placeholder="Headline">
        </div>
    </div>

    <!-- Addresses Section -->
    <div class="form-section">
        <h2 class="section-title">Business Addresses</h2>

        <!-- No Addresses Message -->
        <div class="no-fields-message" ng-if="!controller.cardDetail.addresses || controller.cardDetail.addresses.length === 0">
            <i class="fas fa-map-marker-alt"></i>
            <h3>No Addresses Added Yet</h3>
            <p>Add your locations to help others connect with you more easily</p>
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
                         Address {{address.name}}
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
                    <button class="address-delete-btn" type="button" ng-click="controller.removeAddress(address)"><i class="fas fa-trash"></i> Delete Address</button>
                </div>
            </div>
        </div>
        <button class="btn-submit" type="button" ng-click="controller.addAddress()">
            <i class="fas fa-plus"></i> Add Address
        </button>
    </div>

</div>