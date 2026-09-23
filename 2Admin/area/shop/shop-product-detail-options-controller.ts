class shopProductDetailOptionsController implements IChildShopProductDetailController {
    scope;
    baseController: baseController;
    callerController: IShopProductDetailOptionsCaller;

    shopProductDetailWebService: shopWebService;
    formValidator: formValidator;
    groupName: string = shopProductDetailTabNameFromEnum.getName(shopProductDetailTab.OPTIONS);
    shopProductDetailTabEnum = shopProductDetailTab;

    // Drag state for options
    optionDragStartIndex: number = null;

    constructor($scope, private $parse, private toaster, shopProductDetailWebService) {
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

    // Product Options Methods
    public addOption() {
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
    }

    public removeOption(option) {
        var self = this;
        var position = self.baseController.searchForEntityInList("idShopProductOption", self.shopProductDetail.options, option, "idLocal");
        if (!self.baseController.isNullOrUndefined(position) && position > -1) {
            self.shopProductDetail.options.splice(position, 1);
        }
        // Update display order for remaining options
        this.shopProductDetail.options.forEach(function (option, i) {
            option.displayOrder = i + 1;
        });
    }

    // Option Drag and Drop Methods
    public handleOptionDragStart(event, index) {
        this.optionDragStartIndex = index;
        if (event.dataTransfer) {
            event.dataTransfer.effectAllowed = 'move';
        }
    }

    public handleOptionDragOver(event, index) {
        event.preventDefault(); // Allow drop
    }

    public handleOptionDrop(event, dropIndex) {
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
    }

    public handleOptionDragEnd(event) {
        this.optionDragStartIndex = null;
    }

    // Option Variants Methods
    public addOptionVariant(option) {
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
    }

    public removeOptionVariant(option, variant) {
        var self = this;
        var position = self.baseController.searchForEntityInList("idShopProductOptionVariant", option.variants, variant, "idLocal");
        if (!self.baseController.isNullOrUndefined(position) && position > -1) {
            option.variants.splice(position, 1);
        }
    }

    // Option Type Methods
    public getOptionTypeOptions() {
        return [
            { value: 'dropdown', label: 'Dropdown' },
            { value: 'radio', label: 'Radio buttons' },
            { value: 'checkbox', label: 'Checkboxes' },
            { value: 'color', label: 'Color swatch' },
            { value: 'image', label: 'Image swatch' }
        ];
    }

    public isOptionTypeSwatch(option) {
        return option.type === 'color' || option.type === 'image';
    }

    public isOptionTypeMultiple(option) {
        return option.type === 'checkbox' || option.type === 'multiselect';
    }

    // Pricing Methods
    public calculateProfit(variant) {
        if (variant.price && variant.cost) {
            return variant.price - variant.cost;
        }
        return 0;
    }

    public calculateProfitMargin(variant) {
        if (variant.price && variant.cost) {
            return ((variant.price - variant.cost) / variant.price) * 100;
        }
        return 0;
    }

    public formatCurrency(amount) {
        return 'Rs' + parseFloat(amount || 0).toFixed(2);
    }

    // Inventory Methods
    public getInventoryStatus(variant) {
        if (variant.inventoryQuantity > 0) {
            return 'In stock';
        } else if (this.shopProductDetail.allowBackorders) {
            return 'Backorder';
        } else {
            return 'Out of stock';
        }
    }

    public getInventoryStatusClass(variant) {
        if (variant.inventoryQuantity > 0) {
            return 'in-stock';
        } else if (this.shopProductDetail.allowBackorders) {
            return 'backorder';
        } else {
            return 'out-of-stock';
        }
    }

    // Option Status Methods
    public toggleOptionStatus(option) {
        option.isActive = !option.isActive;
    }

    public toggleVariantStatus(variant) {
        variant.isActive = !variant.isActive;
    }
}

shopModule.controller("shopProductDetailOptionsController", ["$scope",
    "$parse",
    "toaster",
    "shopWebService",
    shopProductDetailOptionsController
]);
