var cardDetailInformationController = /** @class */ (function () {
    function cardDetailInformationController($scope, $parse, toaster, cardWebService) {
        this.$scope = $scope;
        this.$parse = $parse;
        this.toaster = toaster;
        this.groupName = cardDetailTabNameFromEnum.getName(cardDetailTab.INFORMATION);
        this.cardDetailTabEnum = cardDetailTab;
        // Drag state for addresses
        this.addressDragStartIndex = null;
        // Drag state for features
        this.featureDragStartIndex = null;
        // Drag state for tags
        this.tagDragStartIndex = null;
        this.scope = $scope;
        this.scope.controller = this;
        this.callerController = $scope.$parent.controller;
        this.baseController = $scope.baseController;
        this.cardWebService = cardWebService;
        this.callerController.registerCardDetailInformationController(this);
        this.initialize();
    }
    Object.defineProperty(cardDetailInformationController.prototype, "hasScreenDetailBeenLoaded", {
        get: function () {
            return this.callerController.hasScreenDetailBeenLoaded;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailInformationController.prototype, "hasCardDetailBeenLoaded", {
        get: function () {
            return this.callerController.hasCardDetailBeenLoaded;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailInformationController.prototype, "screenMode", {
        get: function () {
            return this.callerController.screenModeManager.currentMode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailInformationController.prototype, "cardDetail", {
        get: function () {
            return this.callerController.screenModeManager.entity;
        },
        set: function (value) {
            this.callerController.screenModeManager.entity = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailInformationController.prototype, "isEditable", {
        get: function () {
            var self = this;
            return self.callerController.isEditable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailInformationController.prototype, "isNew", {
        get: function () {
            var self = this;
            return self.callerController.isNew;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailInformationController.prototype, "formName", {
        get: function () {
            return this.callerController.formName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailInformationController.prototype, "isCardStateEditable", {
        get: function () {
            var self = this;
            var isAdmin = self.baseController.commonController.isAdmin();
            return self.callerController.isEditable && isAdmin;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailInformationController.prototype, "titles", {
        get: function () {
            var self = this;
            return self.callerController.titles;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailInformationController.prototype, "profileColorVariants", {
        get: function () {
            var self = this;
            return self.callerController.profileColorVariants;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailInformationController.prototype, "structureCategoriesHiearchy", {
        get: function () {
            var self = this;
            return self.callerController.structurerCategoriesHiearchy;
        },
        enumerable: true,
        configurable: true
    });
    cardDetailInformationController.prototype.initialize = function () {
        var self = this;
        self.registerValidations();
    };
    cardDetailInformationController.prototype.registerValidations = function () {
        var self = this;
        if (self.formValidator != null) {
            self.formValidator.deRegister();
        }
        self.formValidator = new formValidator(this.$parse, this.toaster, self.scope, self.formName);
        self.formValidator.registerGroupValidation(self.groupName, []);
    };
    cardDetailInformationController.prototype.onDetailLoaded = function () {
        var self = this;
    };
    cardDetailInformationController.prototype.upload = function (file, arrayToUpload, isArray) {
        var self = this;
        self.baseController.upload(file, arrayToUpload, isArray);
    };
    cardDetailInformationController.prototype.deleteImage = function (picture, pictureDataList, isArray) {
        var self = this;
        self.baseController.deleteImage(picture, pictureDataList, isArray);
    };
    cardDetailInformationController.prototype.setColor = function (color) {
        var self = this;
        self.cardDetail.color = color;
    };
    cardDetailInformationController.prototype.setColorVariant = function (variant) {
        var self = this;
        self.cardDetail.idColourVariant = variant.idVariant;
        /*
        // Find the selected variant in the available variants
        const selectedVariant = self.individualProfileColorVariants.find(v => v.name === variant.name);
        if (selectedVariant) {
            // Set the primary color as the main color (for backward compatibility)
            const primaryColor = selectedVariant.colors.find(c => c.attributeName === '--color-primary');
            if (primaryColor) {
                self.cardDetail.color = primaryColor.color;
            }
        }
            */
    };
    cardDetailInformationController.prototype.addAddress = function () {
        var self = this;
        var address = new addressModel();
        address.idLocal = self.baseController.generateUUID();
        address.displayOrder = self.cardDetail.addresses.length + 1;
        self.cardDetail.addresses.push(address);
    };
    cardDetailInformationController.prototype.removeAddress = function (address) {
        var self = this;
        var position = self.baseController.searchForEntityInList("idAddressReference", self.cardDetail.addresses, address, "idLocal");
        console.log(address);
        console.log(position);
        if (!self.baseController.isNullOrUndefined(position) && position > -1) {
            self.cardDetail.addresses.splice(position, 1);
        }
        // Update display order for remaining addresses
        this.cardDetail.addresses.forEach(function (address, i) {
            address.displayOrder = i + 1;
        });
    };
    // Address Drag and Drop Methods
    cardDetailInformationController.prototype.handleAddressDragStart = function (event, index) {
        this.addressDragStartIndex = index;
        event.dataTransfer.effectAllowed = 'move';
    };
    cardDetailInformationController.prototype.handleAddressDragOver = function (event, index) {
        event.preventDefault(); // Allow drop
    };
    cardDetailInformationController.prototype.handleAddressDrop = function (event, dropIndex) {
        event.preventDefault();
        var fromIndex = this.addressDragStartIndex;
        var toIndex = dropIndex;
        if (fromIndex === null || fromIndex === toIndex)
            return;
        var item = this.cardDetail.addresses[fromIndex];
        this.cardDetail.addresses.splice(fromIndex, 1);
        this.cardDetail.addresses.splice(toIndex, 0, item);
        // Update displayOrder
        this.cardDetail.addresses.forEach(function (address, i) {
            address.displayOrder = i + 1;
        });
        this.addressDragStartIndex = null;
        this.$scope.$apply(); // trigger digest
    };
    cardDetailInformationController.prototype.handleAddressDragEnd = function (event) {
        this.addressDragStartIndex = null;
    };
    cardDetailInformationController.prototype.addCategory = function () {
        var self = this;
        if (!self.cardDetail.categories) {
            self.cardDetail.categories = [];
        }
        var newCategory = {
            idLocal: self.baseController.generateUUID(),
            selectedCategory: null,
            isPrimary: false
        };
        self.cardDetail.categories.push(newCategory);
    };
    cardDetailInformationController.prototype.removeCategory = function (category) {
        var self = this;
        var position = self.baseController.searchForEntityInList("idStructureStructureCategoryReference", self.cardDetail.categories, category, "idLocal");
        if (!self.baseController.isNullOrUndefined(position) && position > -1) {
            self.cardDetail.categories.splice(position, 1);
        }
    };
    cardDetailInformationController.prototype.onCategorySelected = function (category) {
        var self = this;
        category.idStructureCategory = category.selectedCategory.id;
    };
    cardDetailInformationController.prototype.setPrimaryCategory = function (selectedCategory) {
        var self = this;
        if (selectedCategory.isPrimary && self.cardDetail.categories) {
            // Ensure only one category is primary
            self.cardDetail.categories.forEach(function (category) {
                if (category !== selectedCategory) {
                    category.isPrimary = false;
                }
            });
        }
    };
    // Company Features Methods
    cardDetailInformationController.prototype.addFeature = function () {
        var self = this;
        var newFeature = {
            name: '',
            description: '',
            displayOrder: this.cardDetail.features.length + 1,
            idLocal: self.baseController.generateUUID()
        };
        this.cardDetail.features.push(newFeature);
    };
    cardDetailInformationController.prototype.removeFeature = function (feature) {
        var self = this;
        var position = self.baseController.searchForEntityInList("idStructureFeatureReference", self.cardDetail.features, feature, "idLocal");
        if (!self.baseController.isNullOrUndefined(position) && position > -1) {
            self.cardDetail.features.splice(position, 1);
        }
        // Update display order for remaining features
        this.cardDetail.features.forEach(function (feature, i) {
            feature.displayOrder = i + 1;
        });
    };
    // Feature Drag and Drop Methods
    cardDetailInformationController.prototype.handleFeatureDragStart = function (event, index) {
        this.featureDragStartIndex = index;
        event.dataTransfer.effectAllowed = 'move';
    };
    cardDetailInformationController.prototype.handleFeatureDragOver = function (event, index) {
        event.preventDefault(); // Allow drop
    };
    cardDetailInformationController.prototype.handleFeatureDrop = function (event, dropIndex) {
        event.preventDefault();
        var fromIndex = this.featureDragStartIndex;
        var toIndex = dropIndex;
        if (fromIndex === null || fromIndex === toIndex)
            return;
        var item = this.cardDetail.features[fromIndex];
        this.cardDetail.features.splice(fromIndex, 1);
        this.cardDetail.features.splice(toIndex, 0, item);
        // Update displayOrder
        this.cardDetail.features.forEach(function (feature, i) {
            feature.displayOrder = i + 1;
        });
        this.featureDragStartIndex = null;
        this.$scope.$apply(); // trigger digest
    };
    cardDetailInformationController.prototype.handleFeatureDragEnd = function (event) {
        this.featureDragStartIndex = null;
    };
    // Company Tags Methods
    cardDetailInformationController.prototype.addTag = function () {
        var self = this;
        var newTag = {
            name: '',
            displayOrder: this.cardDetail.tags.length + 1,
            idLocal: self.baseController.generateUUID()
        };
        this.cardDetail.tags.push(newTag);
    };
    cardDetailInformationController.prototype.removeTag = function (tag) {
        var self = this;
        var position = self.baseController.searchForEntityInList("idStructureStructureTagReference", self.cardDetail.tags, tag, "idLocal");
        if (!self.baseController.isNullOrUndefined(position) && position > -1) {
            self.cardDetail.tags.splice(position, 1);
        }
        // Update display order for remaining tags
        this.cardDetail.tags.forEach(function (tag, i) {
            tag.displayOrder = i + 1;
        });
    };
    // Tag Drag and Drop Methods
    cardDetailInformationController.prototype.handleTagDragStart = function (event, index) {
        this.tagDragStartIndex = index;
        event.dataTransfer.effectAllowed = 'move';
    };
    cardDetailInformationController.prototype.handleTagDragOver = function (event, index) {
        event.preventDefault(); // Allow drop
    };
    cardDetailInformationController.prototype.handleTagDrop = function (event, dropIndex) {
        event.preventDefault();
        var fromIndex = this.tagDragStartIndex;
        var toIndex = dropIndex;
        if (fromIndex === null || fromIndex === toIndex)
            return;
        var item = this.cardDetail.tags[fromIndex];
        this.cardDetail.tags.splice(fromIndex, 1);
        this.cardDetail.tags.splice(toIndex, 0, item);
        // Update displayOrder
        this.cardDetail.tags.forEach(function (tag, i) {
            tag.displayOrder = i + 1;
        });
        this.tagDragStartIndex = null;
        this.$scope.$apply(); // trigger digest
    };
    cardDetailInformationController.prototype.handleTagDragEnd = function (event) {
        this.tagDragStartIndex = null;
    };
    return cardDetailInformationController;
}());
cardModule.controller("cardDetailInformationController", ["$scope",
    "$parse",
    "toaster",
    "cardWebService",
    cardDetailInformationController
]);
