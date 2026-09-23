var shopProductDetailOptionsController = /** @class */ (function () {
    function shopProductDetailOptionsController($scope, $parse, toaster, shopProductDetailWebService) {
        this.$parse = $parse;
        this.toaster = toaster;
        this.groupName = shopProductDetailTabNameFromEnum.getName(shopProductDetailTab.OPTIONS);
        this.shopProductDetailTabEnum = shopProductDetailTab;
        // Drag state for options
        this.optionDragStartIndex = null;
        this.scope = $scope;
        this.$parse = $parse;
        this.toaster = toaster;
        this.shopProductDetailWebService = shopProductDetailWebService;
        this.scope.controller = this;
        this.callerController = $scope.$parent.controller;
        this.baseController = $scope.baseController;
        this.callerController.registerShopProductDetailOptionsController(this);
        this.initialize();
    }
    Object.defineProperty(shopProductDetailOptionsController.prototype, "hasScreenDetailBeenLoaded", {
        get: function () {
            return this.callerController.hasScreenDetailBeenLoaded;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(shopProductDetailOptionsController.prototype, "hasProductDetailBeenLoaded", {
        get: function () {
            return this.callerController.hasProductDetailBeenLoaded;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(shopProductDetailOptionsController.prototype, "screenMode", {
        get: function () {
            return this.callerController.screenModeManager.currentMode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(shopProductDetailOptionsController.prototype, "shopProductDetail", {
        get: function () {
            return this.callerController.screenModeManager.entity;
        },
        set: function (value) {
            this.callerController.screenModeManager.entity = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(shopProductDetailOptionsController.prototype, "isEditable", {
        get: function () {
            return this.callerController.isEditable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(shopProductDetailOptionsController.prototype, "isNew", {
        get: function () {
            return this.callerController.isNew;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(shopProductDetailOptionsController.prototype, "formName", {
        get: function () {
            return this.callerController.formName;
        },
        enumerable: true,
        configurable: true
    });
    shopProductDetailOptionsController.prototype.initialize = function () {
        var self = this;
        self.registerValidations();
    };
    shopProductDetailOptionsController.prototype.registerValidations = function () {
        var self = this;
        if (self.formValidator != null) {
            self.formValidator.deRegister();
        }
        self.formValidator = new formValidator(this.$parse, this.toaster, self.scope, self.formName);
        self.formValidator.registerGroupValidation(self.groupName, []);
    };
    shopProductDetailOptionsController.prototype.onDetailLoaded = function () {
        var self = this;
    };
    // Product Options Methods
    shopProductDetailOptionsController.prototype.addOption = function () {
        var self = this;
        if (!self.shopProductDetail.options) {
            self.shopProductDetail.options = [];
        }
        var option = new productOptionModel();
        option.idLocal = self.baseController.generateUUID();
        option.displayOrder = self.shopProductDetail.options.length + 1;
        option.variants = [];
        option.isActive = true;
        self.shopProductDetail.options.push(option);
    };
    shopProductDetailOptionsController.prototype.removeOption = function (option) {
        var self = this;
        var position = self.baseController.searchForEntityInList("idShopProductOption", self.shopProductDetail.options, option, "idLocal");
        if (!self.baseController.isNullOrUndefined(position) && position > -1) {
            self.shopProductDetail.options.splice(position, 1);
        }
        // Update display order for remaining options
        this.shopProductDetail.options.forEach(function (option, i) {
            option.displayOrder = i + 1;
        });
    };
    // Option Drag and Drop Methods
    shopProductDetailOptionsController.prototype.handleOptionDragStart = function (event, index) {
        this.optionDragStartIndex = index;
        if (event.dataTransfer) {
            event.dataTransfer.effectAllowed = 'move';
        }
    };
    shopProductDetailOptionsController.prototype.handleOptionDragOver = function (event, index) {
        event.preventDefault(); // Allow drop
    };
    shopProductDetailOptionsController.prototype.handleOptionDrop = function (event, dropIndex) {
        event.preventDefault();
        var fromIndex = this.optionDragStartIndex;
        var toIndex = dropIndex;
        if (fromIndex === null || fromIndex === toIndex)
            return;
        var item = this.shopProductDetail.options[fromIndex];
        this.shopProductDetail.options.splice(fromIndex, 1);
        this.shopProductDetail.options.splice(toIndex, 0, item);
        // Update displayOrder
        this.shopProductDetail.options.forEach(function (option, i) {
            option.displayOrder = i + 1;
        });
        this.optionDragStartIndex = null;
        this.scope.$apply(); // trigger digest
    };
    shopProductDetailOptionsController.prototype.handleOptionDragEnd = function (event) {
        this.optionDragStartIndex = null;
    };
    // Option Variants Methods
    shopProductDetailOptionsController.prototype.addOptionVariant = function (option) {
        var self = this;
        if (!option.variants) {
            option.variants = [];
        }
        var newVariant = {
            name: '',
            idLocal: self.baseController.generateUUID(),
            idShopProductOption: option.idLocal,
            price: 0,
            comparePrice: 0,
            cost: 0,
            sku: '',
            barcode: '',
            weight: 0,
            inventoryQuantity: 0,
            isActive: true
        };
        option.variants.push(newVariant);
    };
    shopProductDetailOptionsController.prototype.removeOptionVariant = function (option, variant) {
        var self = this;
        var position = self.baseController.searchForEntityInList("idShopProductOptionVariant", option.variants, variant, "idLocal");
        if (!self.baseController.isNullOrUndefined(position) && position > -1) {
            option.variants.splice(position, 1);
        }
    };
    // Option Type Methods
    shopProductDetailOptionsController.prototype.getOptionTypeOptions = function () {
        return [
            { value: 'dropdown', label: 'Dropdown' },
            { value: 'radio', label: 'Radio buttons' },
            { value: 'checkbox', label: 'Checkboxes' },
            { value: 'color', label: 'Color swatch' },
            { value: 'image', label: 'Image swatch' }
        ];
    };
    shopProductDetailOptionsController.prototype.isOptionTypeSwatch = function (option) {
        return option.type === 'color' || option.type === 'image';
    };
    shopProductDetailOptionsController.prototype.isOptionTypeMultiple = function (option) {
        return option.type === 'checkbox' || option.type === 'multiselect';
    };
    // Pricing Methods
    shopProductDetailOptionsController.prototype.calculateProfit = function (variant) {
        if (variant.price && variant.cost) {
            return variant.price - variant.cost;
        }
        return 0;
    };
    shopProductDetailOptionsController.prototype.calculateProfitMargin = function (variant) {
        if (variant.price && variant.cost) {
            return ((variant.price - variant.cost) / variant.price) * 100;
        }
        return 0;
    };
    shopProductDetailOptionsController.prototype.formatCurrency = function (amount) {
        return 'Rs' + parseFloat(amount || 0).toFixed(2);
    };
    // Inventory Methods
    shopProductDetailOptionsController.prototype.getInventoryStatus = function (variant) {
        if (variant.inventoryQuantity > 0) {
            return 'In stock';
        }
        else if (this.shopProductDetail.allowBackorders) {
            return 'Backorder';
        }
        else {
            return 'Out of stock';
        }
    };
    shopProductDetailOptionsController.prototype.getInventoryStatusClass = function (variant) {
        if (variant.inventoryQuantity > 0) {
            return 'in-stock';
        }
        else if (this.shopProductDetail.allowBackorders) {
            return 'backorder';
        }
        else {
            return 'out-of-stock';
        }
    };
    // Option Status Methods
    shopProductDetailOptionsController.prototype.toggleOptionStatus = function (option) {
        option.isActive = !option.isActive;
    };
    shopProductDetailOptionsController.prototype.toggleVariantStatus = function (variant) {
        variant.isActive = !variant.isActive;
    };
    return shopProductDetailOptionsController;
}());
shopModule.controller("shopProductDetailOptionsController", ["$scope",
    "$parse",
    "toaster",
    "shopWebService",
    shopProductDetailOptionsController
]);
