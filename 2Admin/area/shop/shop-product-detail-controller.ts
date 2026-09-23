class shopProductDetailController implements IShopProductDetailInformationCaller {

    scope;
    baseController: baseController;
    shopProductDetailWebService: shopWebService;
    screenModeManager: screenModeManager<shopProductDetailViewModel, shopProductDetailController>;
    id: string;
    shopId: string;

    preloadedData: {
        productTypes
    } = {
            productTypes: []
        };

    formValidator: formValidator;

    childControllers: IChildShopProductDetailController[] = [];

    shopProductDetailInformationController: shopProductDetailInformationController;
    shopProductDetailAttributesController: shopProductDetailAttributesController;
    shopProductDetailOptionsController: shopProductDetailOptionsController;
    shopProductDetailShippingController: shopProductDetailShippingController;

    formName: string = 'shopProductDetailForm';
    hasScreenDetailBeenLoaded: boolean;
    hasProductDetailBeenLoaded: boolean;

    currentState: shopProductDetailTab = shopProductDetailTab.INFORMATION;
    shopProductDetailTab = shopProductDetailTab;

    productTypes = [];


    constructor($scope
        , private $parse
        , private toaster
        , shopProductDetailWebService) {
        var self = this;

        $scope.controller = this;
        this.shopProductDetailWebService = shopProductDetailWebService;

        this.scope = $scope;

        this.baseController = this.scope.baseController;

        this.initVariables();
        this.registerValidations();
    }

    get screenMode(): SCREEN_MODE {
        return this.screenModeManager.currentMode;
    }

    get shopProductDetail(): shopProductDetailViewModel {
        return this.screenModeManager.entity;
    }

    registerShopProductDetailInformationController(shopProductDetailInformationController: shopProductDetailInformationController) {
        this.shopProductDetailInformationController = shopProductDetailInformationController;
        this.childControllers.push(shopProductDetailInformationController);
    }

    registerShopProductDetailAttributesController(shopProductDetailAttributesController: shopProductDetailAttributesController) {
        this.shopProductDetailAttributesController = shopProductDetailAttributesController;
        this.childControllers.push(shopProductDetailAttributesController);
    }

    registerShopProductDetailOptionsController(shopProductDetailOptionsController: shopProductDetailOptionsController) {
        this.shopProductDetailOptionsController = shopProductDetailOptionsController;
        this.childControllers.push(shopProductDetailOptionsController);
    }

    registerShopProductDetailShippingController(shopProductDetailShippingController: shopProductDetailShippingController) {
        this.shopProductDetailShippingController = shopProductDetailShippingController;
        this.childControllers.push(shopProductDetailShippingController);
    }

    get isNew(): boolean {
        var self = this;

        return self.baseController.isNullOrUndefined(self.id);
    }

    get isEditable(): boolean {
        var self = this;

        if (!self.baseController.commonController.hasEditPermission()) {
            return false;
        }

        return self.screenModeManager.currentMode == SCREEN_MODE.ADD || self.screenModeManager.currentMode == SCREEN_MODE.EDIT;
    }

    public initVariables() {
        var self = this;
        this.baseController = this.scope.baseController;
    }

    public setInfo(shopId: string, id: string, mode: SCREEN_MODE) {
        var self = this;
        self.formValidator = new formValidator(self.$parse, self.toaster, self.scope, self.formName);
        self.shopId = shopId;
        self.id = id;

        self.screenModeManager = new screenModeManager<shopProductDetailViewModel, shopProductDetailController>(self, self.saveMethod, false);
        self.screenModeManager.currentMode = mode;

        self.loadScreenConstants();

        if (mode == SCREEN_MODE.ADD) {
            var _product: shopProductDetailViewModel = new shopProductDetailViewModel();
            //_product.productImages = [];
            //_product.attributes = [];
            //_product.options = [];
            //_product.shippingInfo = new shippingInfoModel();
            //_product.productName = "New Product";
            //_product.shopId = self.shopId;
            //_product.isActive = true;
            //_product.isFeatured = false;
            //_product.requiresShipping = true;
            //_product.trackInventory = true;
            //_product.allowBackorders = false;

            self.screenModeManager.setEntity(self.formatEntity(_product));
            self.onProductDetailLoaded();
        } else {
            self.loadEntity();
        }

        self.initialize();
    }

    public initialize() {
        var self = this;
    }

    public loadEntity() {
        var self = this;
        self.baseController.showLoading();
        //var _getProductDto = new getShopProductDto();
        //_getProductDto.idShop = self.shopId;
        //_getProductDto.idShopProduct = self.id;

        //self.shopProductDetailWebService.getShopProduct(_getProductDto)
        //    .then(function (response: baseResultReturnType<shopProductModel>) {
        //        if (response.status == STATUS_MESSAGE.SUCCESS) {
        //            self.screenModeManager.setEntity(self.formatEntity(response.result));
        //            self.onProductDetailLoaded();
        //        } else {
        //            self.baseController.showMessage(response.errorMessage, "", ALERT_MESSAGE_TYPE.ERROR);
        //        }
        //    }).catch(function (errorMsg) {
        //        self.baseController.showMessage(errorMsg, "We encountered a problem while processing your request. Please try again later or contact support if the issue persists.", ALERT_MESSAGE_TYPE.ERROR);
        //    }).finally(function () {
        //        self.baseController.hideLoading();
        //    });
    }

    public formatEntity(entity: shopProductModel): shopProductDetailViewModel {
        var self = this;
        var returnData: shopProductDetailViewModel = JSON.parse(JSON.stringify(entity));

        return self.applyObjectCorrections(returnData);
    }

    public applyObjectCorrections(item: shopProductDetailViewModel) {
        var self = this;

        if (self.baseController.isNullOrUndefined(item.productImages)) {
            item.productImages = [];
        }

        if (self.baseController.isNullOrUndefined(item.attributes)) {
            item.attributes = [];
        }

        if (self.baseController.isNullOrUndefined(item.options)) {
            item.options = [];
        }

        if (self.baseController.isNullOrUndefined(item.shippingInfo)) {
            item.shippingInfo = new shippingInfoModel();
        }

        // Sort by displayOrder
        if (!self.baseController.isNullOrUndefined(item.productImages) && item.productImages.length > 0) {
            item.productImages.sort((a, b) => {
                return (a.displayOrder || 0) - (b.displayOrder || 0);
            });
        }

        if (!self.baseController.isNullOrUndefined(item.attributes) && item.attributes.length > 0) {
            item.attributes.sort((a, b) => {
                return (a.displayOrder || 0) - (b.displayOrder || 0);
            });
        }

        if (!self.baseController.isNullOrUndefined(item.options) && item.options.length > 0) {
            item.options.sort((a, b) => {
                return (a.displayOrder || 0) - (b.displayOrder || 0);
            });
        }

        return item;
    }

    public saveMethod(modifiedEntity: shopProductDetailViewModel, caller: shopProductDetailController) {
        var self: shopProductDetailController = caller;

        self.registerValidations();

        if (!self.validateForGroups()) {
            return;
        }

        var _saveProductDto: saveShopProductDto = self.formatEntityBeforeSave(self.shopProductDetail);

        self.baseController.showLoading();

        //self.shopProductDetailWebService.saveShopProduct(_saveProductDto)
        //    .then(function (response: baseResultReturnType<shopProductModel>) {
        //        if (response.status == STATUS_MESSAGE.SUCCESS) {
        //            self.baseController.showToast(TOASTER_TYPE.SUCCESS, "Product saved successfully");
        //            self.screenModeManager.setEntity(self.formatEntity(response.result));
        //            self.id = response.result.idShopProduct;
        //            self.formatOnAllDetail();
        //        } else {
        //            self.baseController.showMessage(response.errorMessage, "", ALERT_MESSAGE_TYPE.ERROR, false, null, true);
        //        }

        //    }).catch(function (errorMsg) {
        //        self.baseController.showMessage(errorMsg, "We encountered a problem while processing your request. Please try again later or contact support if the issue persists.", ALERT_MESSAGE_TYPE.ERROR);
        //        self.screenModeManager.setMode(SCREEN_MODE.EDIT);
        //    }).finally(function () {
        //        self.baseController.hideLoading();
        //    });
    }

    public registerValidations() {
        var self = this;
        for (var i = 0; i < self.childControllers.length; i++) {
            var currentChild = self.childControllers[i];
            currentChild.registerValidations();
        }
    }

    public validateForGroups(): boolean {
        var self = this;
        var isValid: boolean = true;

        var errorMessages: string[] = [];
        for (var i = 0; i < self.childControllers.length; i++) {
            var currentChild = self.childControllers[i];
            isValid = isValid && currentChild.formValidator.validateGroup(currentChild.groupName, false, true);

            errorMessages = errorMessages.concat(currentChild.formValidator.getAllValidationMessagesForGroup(currentChild.groupName));
        }

        if (errorMessages.length > 0) {
            self.baseController.toaster.pop({
                type: 'error',
                body: errorMessages.join('</br>'),
                bodyOutputType: 'trustedHtml'
            });
        }

        return isValid;
    }

    public idGroupValid(productTab: shopProductDetailTab): boolean {
        var self = this;
        let isValid: boolean = true;

        let groupName = shopProductDetailTabNameFromEnum.getName(productTab);
        let childValidator: IChildShopProductDetailController = Enumerable.From(self.childControllers).Where(function (childController: IChildShopProductDetailController) {
            return childController.groupName == groupName
        }).FirstOrDefault(null);

        if (childValidator != null && childValidator.hasScreenDetailBeenLoaded) {
            isValid = childValidator.formValidator.validateGroup(groupName, false)
        }

        return isValid;
    }

    public loadScreenConstants() {
        var self = this;

        //self.shopProductDetailWebService.getShopProductDetailScreenConstant()
        //    .then(function (response: baseResultReturnType<shopProductDetailScreenConstantReturnType>) {
        //        if (response.status == STATUS_MESSAGE.SUCCESS) {
        //            self.preloadedData.productTypes = response.result.productTypes;

        //            self.formatScreenConstant(response.result);

        //            self.onScreenDetailLoaded();
        //        } else {
        //            self.baseController.showMessage(response.errorMessage, "", ALERT_MESSAGE_TYPE.ERROR);
        //        }
        //    }).catch(function (errorMsg) {
        //        self.baseController.showMessage(errorMsg, "We encountered a problem while processing your request. Please try again later or contact support if the issue persists.", ALERT_MESSAGE_TYPE.ERROR);
        //    }).finally(function () {
        //        self.baseController.hideLoading();
        //    });
    }

    public formatScreenConstant(data: shopProductDetailScreenConstantReturnType) {
        var self = this;

        self.productTypes = data.productTypes;
    }

    public onProductDetailLoaded() {
        var self = this;
        self.hasProductDetailBeenLoaded = true;

        self.onAllDetailLoaded();
    }

    public onScreenDetailLoaded() {
        var self = this;
        self.hasScreenDetailBeenLoaded = true;
        self.onAllDetailLoaded();
    }

    public onAllDetailLoaded() {
        var self = this;
        if (self.hasScreenDetailBeenLoaded && self.hasProductDetailBeenLoaded) {
            self.formatOnAllDetail();

            self.childControllers.forEach(function (controller: IChildShopProductDetailController) {
                controller.onDetailLoaded();
            })
        }
    }

    public formatOnAllDetail() {
        var self = this;

        if (self.baseController.isNullOrUndefined(self.shopProductDetail.shippingInfo)) {
            self.shopProductDetail.shippingInfo = new shippingInfoModel();
        }

        if (self.baseController.isNullOrUndefined(self.shopProductDetail.attributes)) {
            self.shopProductDetail.attributes = [];
        }

        if (self.baseController.isNullOrUndefined(self.shopProductDetail.options)) {
            self.shopProductDetail.options = [];
        }

        if (self.baseController.isNullOrUndefined(self.shopProductDetail.productImages)) {
            self.shopProductDetail.productImages = [];
        }
    }

    public formatEntityBeforeSave(entity: shopProductDetailViewModel): saveShopProductDto {
        var self = this;
        var formattedEntity: saveShopProductDto = self.baseController.cloneObject(entity);

        return formattedEntity;
    }

    public setCurrentState(shopProductDetailTab: shopProductDetailTab) {
        var self = this;
        self.currentState = shopProductDetailTab;
    }

    public upload(file, arrayToUpload, isArray) {
        var self = this;
        self.baseController.upload(file, arrayToUpload, isArray)
    }

    public deleteImage(picture: pictureDataModel, pictureDataList: pictureDataModel[], isArray) {
        var self = this;
        self.baseController.deleteImage(picture, pictureDataList, isArray);
    }
}

shopModule.controller("shopProductDetailController"
    , ["$scope"
        , "$parse"
        , "toaster"
        , "shopWebService"
        , shopProductDetailController
    ]);

enum shopProductDetailTab {
    INFORMATION = 1,
    ATTRIBUTES = 2,
    OPTIONS = 3,
    SHIPPING = 4,
}

class shopProductDetailTabNameFromEnum {
    static getName(_shopProductDetailTab: shopProductDetailTab) {
        let name: string;

        switch (_shopProductDetailTab) {
            case shopProductDetailTab.INFORMATION:
                name = 'INFORMATION';
                break;

            case shopProductDetailTab.ATTRIBUTES:
                name = 'ATTRIBUTES';
                break;

            case shopProductDetailTab.OPTIONS:
                name = 'OPTIONS';
                break;

            case shopProductDetailTab.SHIPPING:
                name = 'SHIPPING';
                break;
        }
        return name;
    }
}

class shopProductDetailViewModel extends shopProductModel {
    // Additional properties specific to the detail view
} 
