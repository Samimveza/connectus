class shopProductDetailShippingController implements IChildShopProductDetailController {
    scope;
    baseController: baseController;
    callerController: IShopProductDetailShippingCaller;

    shopProductDetailWebService: shopWebService;
    formValidator: formValidator;
    groupName: string = shopProductDetailTabNameFromEnum.getName(shopProductDetailTab.SHIPPING);
    shopProductDetailTabEnum = shopProductDetailTab;

    constructor($scope, private $parse, private toaster, shopProductDetailWebService) {
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

    get hasScreenDetailBeenLoaded(): boolean {
        return this.callerController.hasScreenDetailBeenLoaded;
    }

    get hasProductDetailBeenLoaded(): boolean {
        return this.callerController.hasProductDetailBeenLoaded;
    }

    get screenMode(): SCREEN_MODE {
        return this.callerController.screenModeManager.currentMode;
    }

    get shopProductDetail(): shopProductDetailViewModel {
        return this.callerController.screenModeManager.entity;
    }

    set shopProductDetail(value: shopProductDetailViewModel) {
        this.callerController.screenModeManager.entity = value;
    }

    get isEditable(): boolean {
        return this.callerController.isEditable;
    }

    get isNew(): boolean {
        return this.callerController.isNew;
    }

    get formName(): string {
        return this.callerController.formName;
    }

    public initialize() {
        var self = this;
        self.registerValidations();
    }

    public registerValidations() {
        var self = this;
        if (self.formValidator != null) {
            self.formValidator.deRegister();
        }
        self.formValidator = new formValidator(this.$parse, this.toaster, self.scope, self.formName);
        self.formValidator.registerGroupValidation(self.groupName, []);
    }

    public onDetailLoaded() {
        var self = this;
    }

    // Shipping Methods
    public toggleRequiresShipping() {
        var self = this;
        self.shopProductDetail.requiresShipping = !self.shopProductDetail.requiresShipping;
        
        if (!self.shopProductDetail.requiresShipping) {
            // Reset shipping-related fields when shipping is disabled
            self.shopProductDetail.shippingInfo.weight = 0;
            self.shopProductDetail.shippingInfo.length = 0;
            self.shopProductDetail.shippingInfo.width = 0;
            self.shopProductDetail.shippingInfo.height = 0;
        }
    }

    public calculateVolume() {
        var self = this;
        if (self.shopProductDetail.shippingInfo.length && 
            self.shopProductDetail.shippingInfo.width && 
            self.shopProductDetail.shippingInfo.height) {
            return (self.shopProductDetail.shippingInfo.length * 
                    self.shopProductDetail.shippingInfo.width * 
                    self.shopProductDetail.shippingInfo.height).toFixed(2);
        }
        return 0;
    }

    public calculateVolumeWeight() {
        var self = this;
        var volume:any = (self.calculateVolume());
        if (volume > 0) {
            // Volume weight calculation (typically length * width * height / 5000)
            return (volume / 5000).toFixed(2);
        }
        return 0;
    }

    public getShippingWeight() {
        var self = this;
        var actualWeight = self.shopProductDetail.shippingInfo.weight || 0;
        var volumeWeight:any = (self.calculateVolumeWeight());
        
        // Return the greater of actual weight or volume weight
        return Math.max(actualWeight, volumeWeight);
    }

    // Shipping Zone Methods
    public addShippingZone() {
        var self = this;
        if (!self.shopProductDetail.shippingInfo.zones) {
            self.shopProductDetail.shippingInfo.zones = [];
        }
        var newZone:any = {
            idLocal: self.baseController.generateUUID(),
            zoneName: '',
            countries: [],
            shippingMethods: []
        };
        self.shopProductDetail.shippingInfo.zones.push(newZone);
    }

    public removeShippingZone(zone) {
        var self = this;
        var position = self.baseController.searchForEntityInList("idShippingZone", self.shopProductDetail.shippingInfo.zones, zone, "idLocal");
        if (!self.baseController.isNullOrUndefined(position) && position > -1) {
            self.shopProductDetail.shippingInfo.zones.splice(position, 1);
        }
    }

    public addShippingMethod(zone) {
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
    }

    public removeShippingMethod(zone, method) {
        var self = this;
        var position = self.baseController.searchForEntityInList("idShippingMethod", zone.shippingMethods, method, "idLocal");
        if (!self.baseController.isNullOrUndefined(position) && position > -1) {
            zone.shippingMethods.splice(position, 1);
        }
    }

    // Country Selection Methods
    public addCountry(zone) {
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
    }

    public removeCountry(zone, country) {
        var self = this;
        var position = self.baseController.searchForEntityInList("idCountry", zone.countries, country, "idLocal");
        if (!self.baseController.isNullOrUndefined(position) && position > -1) {
            zone.countries.splice(position, 1);
        }
    }

    // Shipping Method Type Methods
    public getShippingMethodTypeOptions() {
        return [
            { value: 'flat_rate', label: 'Flat rate' },
            { value: 'free_shipping', label: 'Free shipping' },
            { value: 'weight_based', label: 'Weight-based' },
            { value: 'price_based', label: 'Price-based' }
        ];
    }

    public isFreeShippingMethod(method) {
        return method.type === 'free_shipping';
    }

    public isWeightBasedMethod(method) {
        return method.type === 'weight_based';
    }

    public isPriceBasedMethod(method) {
        return method.type === 'price_based';
    }

    // Weight Unit Methods
    public getWeightUnitOptions() {
        return [
            { value: 'kg', label: 'Kilograms (kg)' },
            { value: 'g', label: 'Grams (g)' },
            { value: 'lb', label: 'Pounds (lb)' },
            { value: 'oz', label: 'Ounces (oz)' }
        ];
    }

    public getDimensionUnitOptions() {
        return [
            { value: 'cm', label: 'Centimeters (cm)' },
            { value: 'm', label: 'Meters (m)' },
            { value: 'in', label: 'Inches (in)' },
            { value: 'ft', label: 'Feet (ft)' }
        ];
    }

    // Formatting Methods
    public formatWeight(weight, unit) {
        if (weight && unit) {
            return weight + ' ' + unit;
        }
        return '0 kg';
    }

    public formatDimensions(length, width, height, unit) {
        if (length && width && height && unit) {
            return length + ' × ' + width + ' × ' + height + ' ' + unit;
        }
        return '0 × 0 × 0 cm';
    }

    public formatCurrency(amount) {
        return 'Rs' + parseFloat(amount || 0).toFixed(2);
    }

    // Validation Methods
    public validateShippingInfo() {
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
    }

    // Shipping Status Methods
    public toggleShippingMethodStatus(method) {
        method.isActive = !method.isActive;
    }

    public getShippingMethodStatusClass(method) {
        return method.isActive ? 'active' : 'inactive';
    }
}

shopModule.controller("shopProductDetailShippingController", ["$scope",
    "$parse",
    "toaster",
    "shopWebService",
    shopProductDetailShippingController
]);
