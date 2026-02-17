var shopProductDetailShippingController = /** @class */ (function () {
    function shopProductDetailShippingController($scope, $parse, toaster, shopProductDetailWebService) {
        this.$parse = $parse;
        this.toaster = toaster;
        this.groupName = shopProductDetailTabNameFromEnum.getName(shopProductDetailTab.SHIPPING);
        this.shopProductDetailTabEnum = shopProductDetailTab;
        this.scope = $scope;
        this.$parse = $parse;
        this.toaster = toaster;
        this.shopProductDetailWebService = shopProductDetailWebService;
        this.scope.controller = this;
        this.callerController = $scope.$parent.controller;
        this.baseController = $scope.baseController;
        this.callerController.registerShopProductDetailShippingController(this);
        this.initialize();
    }
    Object.defineProperty(shopProductDetailShippingController.prototype, "hasScreenDetailBeenLoaded", {
        get: function () {
            return this.callerController.hasScreenDetailBeenLoaded;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(shopProductDetailShippingController.prototype, "hasProductDetailBeenLoaded", {
        get: function () {
            return this.callerController.hasProductDetailBeenLoaded;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(shopProductDetailShippingController.prototype, "screenMode", {
        get: function () {
            return this.callerController.screenModeManager.currentMode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(shopProductDetailShippingController.prototype, "shopProductDetail", {
        get: function () {
            return this.callerController.screenModeManager.entity;
        },
        set: function (value) {
            this.callerController.screenModeManager.entity = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(shopProductDetailShippingController.prototype, "isEditable", {
        get: function () {
            return this.callerController.isEditable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(shopProductDetailShippingController.prototype, "isNew", {
        get: function () {
            return this.callerController.isNew;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(shopProductDetailShippingController.prototype, "formName", {
        get: function () {
            return this.callerController.formName;
        },
        enumerable: true,
        configurable: true
    });
    shopProductDetailShippingController.prototype.initialize = function () {
        var self = this;
        self.registerValidations();
    };
    shopProductDetailShippingController.prototype.registerValidations = function () {
        var self = this;
        if (self.formValidator != null) {
            self.formValidator.deRegister();
        }
        self.formValidator = new formValidator(this.$parse, this.toaster, self.scope, self.formName);
        self.formValidator.registerGroupValidation(self.groupName, []);
    };
    shopProductDetailShippingController.prototype.onDetailLoaded = function () {
        var self = this;
    };
    // Shipping Methods
    shopProductDetailShippingController.prototype.toggleRequiresShipping = function () {
        var self = this;
        self.shopProductDetail.requiresShipping = !self.shopProductDetail.requiresShipping;
        if (!self.shopProductDetail.requiresShipping) {
            // Reset shipping-related fields when shipping is disabled
            self.shopProductDetail.shippingInfo.weight = 0;
            self.shopProductDetail.shippingInfo.length = 0;
            self.shopProductDetail.shippingInfo.width = 0;
            self.shopProductDetail.shippingInfo.height = 0;
        }
    };
    shopProductDetailShippingController.prototype.calculateVolume = function () {
        var self = this;
        if (self.shopProductDetail.shippingInfo.length &&
            self.shopProductDetail.shippingInfo.width &&
            self.shopProductDetail.shippingInfo.height) {
            return (self.shopProductDetail.shippingInfo.length *
                self.shopProductDetail.shippingInfo.width *
                self.shopProductDetail.shippingInfo.height).toFixed(2);
        }
        return 0;
    };
    shopProductDetailShippingController.prototype.calculateVolumeWeight = function () {
        var self = this;
        var volume = (self.calculateVolume());
        if (volume > 0) {
            // Volume weight calculation (typically length * width * height / 5000)
            return (volume / 5000).toFixed(2);
        }
        return 0;
    };
    shopProductDetailShippingController.prototype.getShippingWeight = function () {
        var self = this;
        var actualWeight = self.shopProductDetail.shippingInfo.weight || 0;
        var volumeWeight = (self.calculateVolumeWeight());
        // Return the greater of actual weight or volume weight
        return Math.max(actualWeight, volumeWeight);
    };
    // Shipping Zone Methods
    shopProductDetailShippingController.prototype.addShippingZone = function () {
        var self = this;
        if (!self.shopProductDetail.shippingInfo.zones) {
            self.shopProductDetail.shippingInfo.zones = [];
        }
        var newZone = {
            idLocal: self.baseController.generateUUID(),
            zoneName: '',
            countries: [],
            shippingMethods: []
        };
        self.shopProductDetail.shippingInfo.zones.push(newZone);
    };
    shopProductDetailShippingController.prototype.removeShippingZone = function (zone) {
        var self = this;
        var position = self.baseController.searchForEntityInList("idShippingZone", self.shopProductDetail.shippingInfo.zones, zone, "idLocal");
        if (!self.baseController.isNullOrUndefined(position) && position > -1) {
            self.shopProductDetail.shippingInfo.zones.splice(position, 1);
        }
    };
    shopProductDetailShippingController.prototype.addShippingMethod = function (zone) {
        var self = this;
        if (!zone.shippingMethods) {
            zone.shippingMethods = [];
        }
        var newMethod = {
            idLocal: self.baseController.generateUUID(),
            methodName: '',
            cost: 0,
            freeShippingThreshold: 0,
            estimatedDays: '',
            isActive: true
        };
        zone.shippingMethods.push(newMethod);
    };
    shopProductDetailShippingController.prototype.removeShippingMethod = function (zone, method) {
        var self = this;
        var position = self.baseController.searchForEntityInList("idShippingMethod", zone.shippingMethods, method, "idLocal");
        if (!self.baseController.isNullOrUndefined(position) && position > -1) {
            zone.shippingMethods.splice(position, 1);
        }
    };
    // Country Selection Methods
    shopProductDetailShippingController.prototype.addCountry = function (zone) {
        var self = this;
        if (!zone.countries) {
            zone.countries = [];
        }
        var newCountry = {
            idLocal: self.baseController.generateUUID(),
            countryCode: '',
            countryName: ''
        };
        zone.countries.push(newCountry);
    };
    shopProductDetailShippingController.prototype.removeCountry = function (zone, country) {
        var self = this;
        var position = self.baseController.searchForEntityInList("idCountry", zone.countries, country, "idLocal");
        if (!self.baseController.isNullOrUndefined(position) && position > -1) {
            zone.countries.splice(position, 1);
        }
    };
    // Shipping Method Type Methods
    shopProductDetailShippingController.prototype.getShippingMethodTypeOptions = function () {
        return [
            { value: 'flat_rate', label: 'Flat rate' },
            { value: 'free_shipping', label: 'Free shipping' },
            { value: 'weight_based', label: 'Weight-based' },
            { value: 'price_based', label: 'Price-based' }
        ];
    };
    shopProductDetailShippingController.prototype.isFreeShippingMethod = function (method) {
        return method.type === 'free_shipping';
    };
    shopProductDetailShippingController.prototype.isWeightBasedMethod = function (method) {
        return method.type === 'weight_based';
    };
    shopProductDetailShippingController.prototype.isPriceBasedMethod = function (method) {
        return method.type === 'price_based';
    };
    // Weight Unit Methods
    shopProductDetailShippingController.prototype.getWeightUnitOptions = function () {
        return [
            { value: 'kg', label: 'Kilograms (kg)' },
            { value: 'g', label: 'Grams (g)' },
            { value: 'lb', label: 'Pounds (lb)' },
            { value: 'oz', label: 'Ounces (oz)' }
        ];
    };
    shopProductDetailShippingController.prototype.getDimensionUnitOptions = function () {
        return [
            { value: 'cm', label: 'Centimeters (cm)' },
            { value: 'm', label: 'Meters (m)' },
            { value: 'in', label: 'Inches (in)' },
            { value: 'ft', label: 'Feet (ft)' }
        ];
    };
    // Formatting Methods
    shopProductDetailShippingController.prototype.formatWeight = function (weight, unit) {
        if (weight && unit) {
            return weight + ' ' + unit;
        }
        return '0 kg';
    };
    shopProductDetailShippingController.prototype.formatDimensions = function (length, width, height, unit) {
        if (length && width && height && unit) {
            return length + ' × ' + width + ' × ' + height + ' ' + unit;
        }
        return '0 × 0 × 0 cm';
    };
    shopProductDetailShippingController.prototype.formatCurrency = function (amount) {
        return 'Rs' + parseFloat(amount || 0).toFixed(2);
    };
    // Validation Methods
    shopProductDetailShippingController.prototype.validateShippingInfo = function () {
        var self = this;
        var isValid = true;
        var errors = [];
        if (self.shopProductDetail.requiresShipping) {
            if (!self.shopProductDetail.shippingInfo.weight || self.shopProductDetail.shippingInfo.weight <= 0) {
                errors.push('Product weight is required when shipping is enabled');
                isValid = false;
            }
            if (!self.shopProductDetail.shippingInfo.length ||
                !self.shopProductDetail.shippingInfo.width ||
                !self.shopProductDetail.shippingInfo.height) {
                errors.push('Product dimensions are required when shipping is enabled');
                isValid = false;
            }
        }
        return { isValid: isValid, errors: errors };
    };
    // Shipping Status Methods
    shopProductDetailShippingController.prototype.toggleShippingMethodStatus = function (method) {
        method.isActive = !method.isActive;
    };
    shopProductDetailShippingController.prototype.getShippingMethodStatusClass = function (method) {
        return method.isActive ? 'active' : 'inactive';
    };
    return shopProductDetailShippingController;
}());
shopModule.controller("shopProductDetailShippingController", ["$scope",
    "$parse",
    "toaster",
    "shopWebService",
    shopProductDetailShippingController
]);
