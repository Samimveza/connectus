class shopAttributeListController {
    scope;
    baseController: baseController;
    shopWebService: shopWebService; // Will be defined when web service is created

    paging: any;
    list: any[];
    productTypes: any[];
    selectedProductType: any;
    attributes: any[];
    newAttribute: any;

    constructor($scope, shopWebService) {
        var self = this;
        $scope.controller = this;
        this.scope = $scope;
        this.baseController = this.scope.baseController;
        this.shopWebService = shopWebService;
        this.initVariables();
    }

    public initVariables() {
        var self = this;
        self.baseController = this.scope.baseController;
        self.list = [];
        self.productTypes = [];
        self.attributes = [];
        self.selectedProductType = null;
        self.newAttribute = {
            name: '',
            displayedName: '',
            show: 'Show'
        };
    }

    public setInfo() {
        var self = this;
        self.baseController = this.scope.baseController;
        self.loadProductTypes();
        self.loadAttributes();
    }

    public loadProductTypes() {
        var self = this;
        // Mock data for product types
        self.productTypes = [
            {
                id: 1,
                name: 'General (no type assigned)',
                description: 'Default product type for general products',
                isSelected: true
            },
            {
                id: 2,
                name: 'Bicycle Bibs',
                description: 'Cycling apparel and accessories',
                isSelected: false
            },
            {
                id: 3,
                name: 'Bird Cages & Stands',
                description: 'Pet supplies and accessories',
                isSelected: false
            },
            {
                id: 4,
                name: 'Exercise Bikes',
                description: 'Fitness equipment and machines',
                isSelected: false
            },
            {
                id: 5,
                name: 'Other',
                description: 'Miscellaneous products',
                isSelected: false
            }
        ];
        
        // Set first product type as selected by default
        if (self.productTypes.length > 0) {
            self.selectProductType(self.productTypes[0]);
        }
    }

    public loadAttributes() {
        var self = this;
        // Mock data for attributes
        self.attributes = [
            {
                id: 1,
                name: 'UPC',
                displayedName: 'UPC',
                show: 'Show',
                hasInfo: true
            },
            {
                id: 2,
                name: 'Brand',
                displayedName: 'Brand',
                show: 'Show',
                hasInfo: true
            }
        ];
    }

    public selectProductType(productType) {
        var self = this;
        // Deselect all product types
        self.productTypes.forEach(type => {
            type.isSelected = false;
        });
        
        // Select the clicked product type
        productType.isSelected = true;
        self.selectedProductType = productType;
        
        // Load attributes for the selected product type
        self.loadAttributesForType(productType.id);
    }

    public loadAttributesForType(productTypeId) {
        var self = this;
        // In a real implementation, this would load attributes from the server
        // For now, we'll use mock data based on the product type
        if (productTypeId === 1) { // General
            self.attributes = [
                {
                    id: 1,
                    name: 'UPC',
                    displayedName: 'UPC',
                    show: 'Show',
                    hasInfo: true
                },
                {
                    id: 2,
                    name: 'Brand',
                    displayedName: 'Brand',
                    show: 'Show',
                    hasInfo: true
                }
            ];
        } else {
            self.attributes = [
                {
                    id: 1,
                    name: 'UPC',
                    displayedName: 'UPC',
                    show: 'Show',
                    hasInfo: true
                },
                {
                    id: 2,
                    name: 'Brand',
                    displayedName: 'Brand',
                    show: 'Show',
                    hasInfo: true
                },
                {
                    id: 3,
                    name: 'Size',
                    displayedName: 'Size',
                    show: 'Show',
                    hasInfo: false
                }
            ];
        }
    }

    public addNewProductType() {
        var self = this;
        // Implementation for adding new product type
        console.log('Adding new product type');
    }

    public deleteProductType() {
        var self = this;
        if (self.selectedProductType) {
            // Implementation for deleting product type
            console.log('Deleting product type:', self.selectedProductType.name);
        }
    }

    public addNewAttribute() {
        var self = this;
        if (self.newAttribute.name.trim()) {
            var attribute = {
                id: Date.now(), // Temporary ID
                name: self.newAttribute.name,
                displayedName: self.newAttribute.displayedName || self.newAttribute.name,
                show: self.newAttribute.show,
                hasInfo: false
            };
            
            self.attributes.push(attribute);
            
            // Reset new attribute form
            self.newAttribute = {
                name: '',
                displayedName: '',
                show: 'Show'
            };
        }
    }

    public deleteAttribute(attribute) {
        var self = this;
        var index = self.attributes.indexOf(attribute);
        if (index > -1) {
            self.attributes.splice(index, 1);
        }
    }

    public updateAttribute(attribute, field, value) {
        var self = this;
        attribute[field] = value;
        // In a real implementation, this would save to the server
        console.log('Updated attribute:', attribute);
    }

    public saveChanges() {
        var self = this;
        // Implementation for saving all changes
        console.log('Saving changes...');
        // Show success message
        //if (self.baseController && self.baseController.showSuccessMessage) {
        //    self.baseController.showSuccessMessage('Changes saved successfully');
        //}
    }
}

shopModule.controller("shopAttributeListController"
    , ["$scope"
        , "shopWebService"
        , shopAttributeListController
    ]);

