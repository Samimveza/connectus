var shopProductDetailInformationController = /** @class */ (function () {
    function shopProductDetailInformationController($scope, $parse, toaster, shopProductDetailWebService) {
        this.$parse = $parse;
        this.toaster = toaster;
        this.groupName = shopProductDetailTabNameFromEnum.getName(shopProductDetailTab.INFORMATION);
        this.shopProductDetailTabEnum = shopProductDetailTab;
        // Drag state for product images
        this.productImageDragStartIndex = null;
        this.scope = $scope;
        this.$parse = $parse;
        this.toaster = toaster;
        this.shopProductDetailWebService = shopProductDetailWebService;
        this.scope.controller = this;
        this.callerController = $scope.$parent.controller;
        this.baseController = $scope.baseController;
        this.callerController.registerShopProductDetailInformationController(this);
        this.initialize();
    }
    Object.defineProperty(shopProductDetailInformationController.prototype, "hasScreenDetailBeenLoaded", {
        get: function () {
            return this.callerController.hasScreenDetailBeenLoaded;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(shopProductDetailInformationController.prototype, "hasProductDetailBeenLoaded", {
        get: function () {
            return this.callerController.hasProductDetailBeenLoaded;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(shopProductDetailInformationController.prototype, "screenMode", {
        get: function () {
            return this.callerController.screenModeManager.currentMode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(shopProductDetailInformationController.prototype, "shopProductDetail", {
        get: function () {
            return this.callerController.screenModeManager.entity;
        },
        set: function (value) {
            this.callerController.screenModeManager.entity = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(shopProductDetailInformationController.prototype, "isEditable", {
        get: function () {
            return this.callerController.isEditable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(shopProductDetailInformationController.prototype, "isNew", {
        get: function () {
            return this.callerController.isNew;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(shopProductDetailInformationController.prototype, "formName", {
        get: function () {
            return this.callerController.formName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(shopProductDetailInformationController.prototype, "isProductStateEditable", {
        get: function () {
            var self = this;
            var isAdmin = self.baseController.commonController.isAdmin();
            return self.callerController.isEditable && isAdmin;
        },
        enumerable: true,
        configurable: true
    });
    shopProductDetailInformationController.prototype.initialize = function () {
        var self = this;
        self.registerValidations();
    };
    shopProductDetailInformationController.prototype.registerValidations = function () {
        var self = this;
        if (self.formValidator != null) {
            self.formValidator.deRegister();
        }
        self.formValidator = new formValidator(this.$parse, this.toaster, self.scope, self.formName);
        self.formValidator.registerGroupValidation(self.groupName, []);
    };
    shopProductDetailInformationController.prototype.onDetailLoaded = function () {
        var self = this;
    };
    shopProductDetailInformationController.prototype.upload = function (file, arrayToUpload, isArray) {
        var self = this;
        self.baseController.upload(file, arrayToUpload, isArray);
    };
    shopProductDetailInformationController.prototype.deleteImage = function (picture, pictureDataList, isArray) {
        var self = this;
        self.baseController.deleteImage(picture, pictureDataList, isArray);
    };
    // Product Images Methods
    shopProductDetailInformationController.prototype.addProductImage = function () {
        var self = this;
        if (!self.shopProductDetail.productImages) {
            self.shopProductDetail.productImages = [];
        }
        var productImage = new productImageModel();
        productImage.idLocal = self.baseController.generateUUID();
        productImage.displayOrder = self.shopProductDetail.productImages.length + 1;
        productImage.image = new pictureDataModel();
        self.shopProductDetail.productImages.push(productImage);
    };
    shopProductDetailInformationController.prototype.removeProductImage = function (productImage) {
        var self = this;
        var position = self.baseController.searchForEntityInList("idShopProductImage", self.shopProductDetail.productImages, productImage, "idLocal");
        if (!self.baseController.isNullOrUndefined(position) && position > -1) {
            self.shopProductDetail.productImages.splice(position, 1);
        }
        // Update display order for remaining product images
        this.shopProductDetail.productImages.forEach(function (productImage, i) {
            productImage.displayOrder = i + 1;
        });
    };
    // Product Image Drag and Drop Methods
    shopProductDetailInformationController.prototype.handleProductImageDragStart = function (event, index) {
        this.productImageDragStartIndex = index;
        if (event.dataTransfer) {
            event.dataTransfer.effectAllowed = 'move';
        }
    };
    shopProductDetailInformationController.prototype.handleProductImageDragOver = function (event, index) {
        event.preventDefault(); // Allow drop
    };
    shopProductDetailInformationController.prototype.handleProductImageDrop = function (event, dropIndex) {
        event.preventDefault();
        var fromIndex = this.productImageDragStartIndex;
        var toIndex = dropIndex;
        if (fromIndex === null || fromIndex === toIndex)
            return;
        var item = this.shopProductDetail.productImages[fromIndex];
        this.shopProductDetail.productImages.splice(fromIndex, 1);
        this.shopProductDetail.productImages.splice(toIndex, 0, item);
        // Update displayOrder
        this.shopProductDetail.productImages.forEach(function (productImage, i) {
            productImage.displayOrder = i + 1;
        });
        this.productImageDragStartIndex = null;
        this.scope.$apply(); // trigger digest
    };
    shopProductDetailInformationController.prototype.handleProductImageDragEnd = function (event) {
        this.productImageDragStartIndex = null;
    };
    // Product Status Methods
    shopProductDetailInformationController.prototype.toggleProductStatus = function () {
        var self = this;
        self.shopProductDetail.isActive = !self.shopProductDetail.isActive;
    };
    shopProductDetailInformationController.prototype.toggleFeaturedStatus = function () {
        var self = this;
        self.shopProductDetail.isFeatured = !self.shopProductDetail.isFeatured;
    };
    shopProductDetailInformationController.prototype.toggleShippingRequirement = function () {
        var self = this;
        self.shopProductDetail.requiresShipping = !self.shopProductDetail.requiresShipping;
    };
    shopProductDetailInformationController.prototype.toggleInventoryTracking = function () {
        var self = this;
        self.shopProductDetail.trackInventory = !self.shopProductDetail.trackInventory;
    };
    shopProductDetailInformationController.prototype.toggleBackorders = function () {
        var self = this;
        self.shopProductDetail.allowBackorders = !self.shopProductDetail.allowBackorders;
    };
    // Product Categories Methods
    shopProductDetailInformationController.prototype.addCategory = function () {
        var self = this;
        if (!self.shopProductDetail.categories) {
            self.shopProductDetail.categories = [];
        }
        var category = {
            idLocal: self.baseController.generateUUID(),
            selectedCategory: null,
            isPrimary: false
        };
        self.shopProductDetail.categories.push(category);
    };
    shopProductDetailInformationController.prototype.removeCategory = function (category) {
        var self = this;
        var position = self.baseController.searchForEntityInList("idLocal", self.shopProductDetail.categories, category, "idLocal");
        if (!self.baseController.isNullOrUndefined(position) && position > -1) {
            self.shopProductDetail.categories.splice(position, 1);
        }
    };
    shopProductDetailInformationController.prototype.onCategorySelected = function (category) {
        var self = this;
        // Handle category selection logic here
    };
    shopProductDetailInformationController.prototype.setPrimaryCategory = function (selectedCategory) {
        var self = this;
        // Ensure only one category is primary
        self.shopProductDetail.categories.forEach(function (category) {
            if (category.idLocal !== selectedCategory.idLocal) {
                category.isPrimary = false;
            }
        });
    };
    Object.defineProperty(shopProductDetailInformationController.prototype, "productCategories", {
        // Mock data for product categories
        get: function () {
            return [
                { hierarchy: "Electronics : Computers & Laptops" },
                { hierarchy: "Electronics : Smartphones & Accessories" },
                { hierarchy: "Fashion : Men's Clothing" },
                { hierarchy: "Fashion : Women's Clothing" },
                { hierarchy: "Home & Garden : Furniture" },
                { hierarchy: "Books : Fiction" },
                { hierarchy: "Books : Non-Fiction" },
                { hierarchy: "Sports : Fitness Equipment" },
                { hierarchy: "Beauty : Skincare" },
                { hierarchy: "Beauty : Makeup" }
            ];
        },
        enumerable: true,
        configurable: true
    });
    return shopProductDetailInformationController;
}());
shopModule.controller("shopProductDetailInformationController", ["$scope",
    "$parse",
    "toaster",
    "shopWebService",
    shopProductDetailInformationController
]);
