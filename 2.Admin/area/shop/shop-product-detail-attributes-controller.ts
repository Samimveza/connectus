class shopProductDetailAttributesController implements IChildShopProductDetailController {
    scope;
    baseController: baseController;
    callerController: IShopProductDetailAttributesCaller;

    shopProductDetailWebService: shopWebService;
    formValidator: formValidator;
    groupName: string = shopProductDetailTabNameFromEnum.getName(shopProductDetailTab.ATTRIBUTES);
    shopProductDetailTabEnum = shopProductDetailTab;

    // Drag state for attributes
    attributeDragStartIndex: number = null;
    showProductTypeSelection
    constructor($scope, private $parse, private toaster, shopProductDetailWebService) {
        this.scope = $scope;
        this.$parse = $parse;
        this.toaster = toaster;
        this.shopProductDetailWebService = shopProductDetailWebService;
        
        this.scope.controller = this;
        this.callerController = $scope.$parent.controller;
        this.baseController = $scope.baseController;
        this.callerController.registerShopProductDetailAttributesController(this);
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

    //get productTypes() {
    //    return this.callerController.productTypes;
    //}

    // Mock data for product types (for testing)
    public get productTypes() {
        return [
            {
                idProductType: '1',
                name: 'Bird Cages & Supplies',
                description: 'Products for bird care and housing'
            },
            {
                idProductType: '2',
                name: 'Electronics',
                description: 'Electronic devices and accessories'
            },
            {
                idProductType: '3',
                name: 'Clothing',
                description: 'Apparel and fashion items'
            },
            {
                idProductType: '4',
                name: 'Home & Garden',
                description: 'Home improvement and garden supplies'
            }
        ];
    }

    // Mock data for attributes (for testing)
    public loadAttributesForProductType(productTypeId) {
        var self = this;

        // Mock attributes based on product type
        var mockAttributes = [];

        if (productTypeId === '1') { // Bird Cages & Supplies
            mockAttributes = [
                {
                    idLocal: self.baseController.generateUUID(),
                    name: 'UPC',
                    type: 'text',
                    isRequired: false,
                    value: '',
                    displayOrder: 1
                },
                {
                    idLocal: self.baseController.generateUUID(),
                    name: 'Brand',
                    type: 'text',
                    isRequired: true,
                    value: '',
                    displayOrder: 2
                },
                {
                    idLocal: self.baseController.generateUUID(),
                    name: 'Material',
                    type: 'select',
                    isRequired: false,
                    value: '',
                    values: [
                        { name: 'Stainless Steel' },
                        { name: 'Powder Coated Steel' },
                        { name: 'Wood' },
                        { name: 'Plastic' }
                    ],
                    displayOrder: 3
                },
                {
                    idLocal: self.baseController.generateUUID(),
                    name: 'Size',
                    type: 'select',
                    isRequired: true,
                    value: '',
                    values: [
                        { name: 'Small' },
                        { name: 'Medium' },
                        { name: 'Large' },
                        { name: 'Extra Large' }
                    ],
                    displayOrder: 4
                }
            ];
        } else if (productTypeId === '2') { // Electronics
            mockAttributes = [
                {
                    idLocal: self.baseController.generateUUID(),
                    name: 'UPC',
                    type: 'text',
                    isRequired: false,
                    value: '',
                    displayOrder: 1
                },
                {
                    idLocal: self.baseController.generateUUID(),
                    name: 'Brand',
                    type: 'text',
                    isRequired: true,
                    value: '',
                    displayOrder: 2
                },
                {
                    idLocal: self.baseController.generateUUID(),
                    name: 'Model',
                    type: 'text',
                    isRequired: false,
                    value: '',
                    displayOrder: 3
                },
                {
                    idLocal: self.baseController.generateUUID(),
                    name: 'Warranty',
                    type: 'select',
                    isRequired: false,
                    value: '',
                    values: [
                        { name: '30 Days' },
                        { name: '90 Days' },
                        { name: '1 Year' },
                        { name: '2 Years' },
                        { name: 'Lifetime' }
                    ],
                    displayOrder: 4
                }
            ];
        }

        self.shopProductDetail.attributes = mockAttributes;
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

    // Product Attributes Methods
    public addAttribute() {
        var self = this;
        if (!self.shopProductDetail.attributes) {
            self.shopProductDetail.attributes = [];
        }
        var attribute = new productAttributeModel();
        attribute.idLocal = self.baseController.generateUUID();
        attribute.displayOrder = self.shopProductDetail.attributes.length + 1;
        attribute.values = [];
        self.shopProductDetail.attributes.push(attribute);
    }

    public removeAttribute(attribute) {
        var self = this;
        var position = self.baseController.searchForEntityInList("idShopProductAttribute", self.shopProductDetail.attributes, attribute, "idLocal");
        if (!self.baseController.isNullOrUndefined(position) && position > -1) {
            self.shopProductDetail.attributes.splice(position, 1);
        }
        // Update display order for remaining attributes
        this.shopProductDetail.attributes.forEach(function (attribute, i) {
            attribute.displayOrder = i + 1;
        });
    }

    // Attribute Drag and Drop Methods
    public handleAttributeDragStart(event, index) {
        this.attributeDragStartIndex = index;
        if (event.dataTransfer) {
            event.dataTransfer.effectAllowed = 'move';
        }
    }

    public handleAttributeDragOver(event, index) {
        event.preventDefault(); // Allow drop
    }

    public handleAttributeDrop(event, dropIndex) {
        event.preventDefault();
        var fromIndex = this.attributeDragStartIndex;
        var toIndex = dropIndex;
        if (fromIndex === null || fromIndex === toIndex)
            return;
        var item = this.shopProductDetail.attributes[fromIndex];
        this.shopProductDetail.attributes.splice(fromIndex, 1);
        this.shopProductDetail.attributes.splice(toIndex, 0, item);
        // Update displayOrder
        this.shopProductDetail.attributes.forEach(function (attribute, i) {
            attribute.displayOrder = i + 1;
        });
        this.attributeDragStartIndex = null;
        this.scope.$apply(); // trigger digest
    }

    public handleAttributeDragEnd(event) {
        this.attributeDragStartIndex = null;
    }

    // Attribute Values Methods
    public addAttributeValue(attribute) {
        var self = this;
        if (!attribute.values) {
            attribute.values = [];
        }
        var newValue = {
            name: '',
            idLocal: self.baseController.generateUUID(),
            idShopProductAttribute: attribute.idLocal
        };
        attribute.values.push(newValue);
    }

    public removeAttributeValue(attribute, value) {
        var self = this;
        var position = self.baseController.searchForEntityInList("idShopProductAttributeValue", attribute.values, value, "idLocal");
        if (!self.baseController.isNullOrUndefined(position) && position > -1) {
            attribute.values.splice(position, 1);
        }
    }

    // Product Type Selection Methods
    public onProductTypeChange() {
        var self = this;
        // Load attributes for selected product type
        if (self.shopProductDetail.productTypeId) {
            self.loadAttributesForProductType(self.shopProductDetail.productTypeId);
        }
    }

    //public loadAttributesForProductType(productTypeId) {
    //    var self = this;
    //    // Implementation to load attributes for the selected product type
    //    // This would typically call a web service to get the attributes
    //    console.log('Loading attributes for product type:', productTypeId);
    //}

    // Attribute Type Methods
    public getAttributeTypeOptions() {
        return [
            { value: 'text', label: 'Text' },
            { value: 'number', label: 'Number' },
            { value: 'select', label: 'Select' },
            { value: 'multiselect', label: 'Multi-select' },
            { value: 'boolean', label: 'Yes/No' },
            { value: 'date', label: 'Date' }
        ];
    }

    public isAttributeTypeSelect(attribute) {
        return attribute.type === 'select' || attribute.type === 'multiselect';
    }

    public isAttributeTypeBoolean(attribute) {
        return attribute.type === 'boolean';
    }

    // Product Type Management Methods
    public get selectedProductType() {
        var self = this;
        if (self.shopProductDetail.productTypeId && self.productTypes) {
            return Enumerable.From( self.productTypes).Where(function (type) {
                return type.idProductType === self.shopProductDetail.productTypeId;
            }).FirstOrDefault(null)
        }
        return null;
    }

    public changeProductType() {
        var self = this;
        self.showProductTypeSelection = true;
    }

    public closeProductTypeSelection() {
        var self = this;
        self.showProductTypeSelection = false;
    }

    public selectProductType(productType) {
        var self = this;
        self.shopProductDetail.productTypeId = productType.idProductType;
        self.loadAttributesForProductType(productType.idProductType);
        self.closeProductTypeSelection();
    }

    public manageAttributes() {
        var self = this;
        // Navigate to attributes management page or open modal
        console.log('Manage attributes clicked');
        // This could redirect to a separate attributes management page
        // or open a modal for managing product type attributes
    }


}

shopModule.controller("shopProductDetailAttributesController", ["$scope",
    "$parse",
    "toaster",
    "shopWebService",
    shopProductDetailAttributesController
]);
