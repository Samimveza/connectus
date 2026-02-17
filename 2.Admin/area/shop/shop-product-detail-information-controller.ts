class shopProductDetailInformationController implements IChildShopProductDetailController {
    scope;
    baseController: baseController;
    callerController: IShopProductDetailInformationCaller;

    shopProductDetailWebService: shopWebService;
    formValidator: formValidator;
    groupName: string = shopProductDetailTabNameFromEnum.getName(shopProductDetailTab.INFORMATION);
    shopProductDetailTabEnum = shopProductDetailTab;

    // Drag state for product images
    productImageDragStartIndex: number | null = null;

    constructor($scope, private $parse, private toaster, shopProductDetailWebService) {
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

    get isProductStateEditable(): boolean {
        var self = this;
        var isAdmin = self.baseController.commonController.isAdmin();
        return self.callerController.isEditable && isAdmin;
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

    public upload(file, arrayToUpload, isArray) {
        var self = this;
        self.baseController.upload(file, arrayToUpload, isArray);
    }

    public deleteImage(picture: pictureDataModel, pictureDataList: pictureDataModel[], isArray) {
        var self = this;
        self.baseController.deleteImage(picture, pictureDataList, isArray);
    }

    // Product Images Methods
    public addProductImage() {
        var self = this;
        if (!self.shopProductDetail.productImages) {
            self.shopProductDetail.productImages = [];
        }
        var productImage = new productImageModel();
        productImage.idLocal = self.baseController.generateUUID();
        productImage.displayOrder = self.shopProductDetail.productImages.length + 1;
        productImage.image = new pictureDataModel();
        self.shopProductDetail.productImages.push(productImage);
    }

    public removeProductImage(productImage) {
        var self = this;
        var position = self.baseController.searchForEntityInList("idShopProductImage", self.shopProductDetail.productImages, productImage, "idLocal");
        if (!self.baseController.isNullOrUndefined(position) && position > -1) {
            self.shopProductDetail.productImages.splice(position, 1);
        }
        // Update display order for remaining product images
        this.shopProductDetail.productImages.forEach(function (productImage, i) {
            productImage.displayOrder = i + 1;
        });
    }

    // Product Image Drag and Drop Methods
    public handleProductImageDragStart(event, index) {
        this.productImageDragStartIndex = index;
        if (event.dataTransfer) {
            event.dataTransfer.effectAllowed = 'move';
        }
    }

    public handleProductImageDragOver(event, index) {
        event.preventDefault(); // Allow drop
    }

    public handleProductImageDrop(event, dropIndex) {
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
    }

    public handleProductImageDragEnd(event) {
        this.productImageDragStartIndex = null;
    }

    // Product Status Methods
    public toggleProductStatus() {
        var self = this;
        self.shopProductDetail.isActive = !self.shopProductDetail.isActive;
    }

    public toggleFeaturedStatus() {
        var self = this;
        self.shopProductDetail.isFeatured = !self.shopProductDetail.isFeatured;
    }

    public toggleShippingRequirement() {
        var self = this;
        self.shopProductDetail.requiresShipping = !self.shopProductDetail.requiresShipping;
    }

    public toggleInventoryTracking() {
        var self = this;
        self.shopProductDetail.trackInventory = !self.shopProductDetail.trackInventory;
    }

    public toggleBackorders() {
        var self = this;
        self.shopProductDetail.allowBackorders = !self.shopProductDetail.allowBackorders;
    }

    // Product Categories Methods
    public addCategory() {
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
    }

    public removeCategory(category) {
        var self = this;
        var position = self.baseController.searchForEntityInList("idLocal", self.shopProductDetail.categories, category, "idLocal");
        if (!self.baseController.isNullOrUndefined(position) && position > -1) {
            self.shopProductDetail.categories.splice(position, 1);
        }
    }

    public onCategorySelected(category) {
        var self = this;
        // Handle category selection logic here
    }

    public setPrimaryCategory(selectedCategory) {
        var self = this;
        // Ensure only one category is primary
        self.shopProductDetail.categories.forEach(function(category) {
            if (category.idLocal !== selectedCategory.idLocal) {
                category.isPrimary = false;
            }
        });
    }

    // Mock data for product categories
    public get productCategories() {
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
    }
}

shopModule.controller("shopProductDetailInformationController", ["$scope",
    "$parse",
    "toaster",
    "shopWebService",
    shopProductDetailInformationController
]);
