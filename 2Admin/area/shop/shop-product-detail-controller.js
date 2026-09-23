var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var shopProductDetailController = /** @class */ (function () {
    function shopProductDetailController($scope, $parse, toaster, shopProductDetailWebService) {
        this.$parse = $parse;
        this.toaster = toaster;
        this.preloadedData = {
            productTypes: []
        };
        this.childControllers = [];
        this.formName = 'shopProductDetailForm';
        this.currentState = shopProductDetailTab.INFORMATION;
        this.shopProductDetailTab = shopProductDetailTab;
        this.productTypes = [];
        var self = this;
        $scope.controller = this;
        this.shopProductDetailWebService = shopProductDetailWebService;
        this.scope = $scope;
        this.baseController = this.scope.baseController;
        this.initVariables();
        this.registerValidations();
    }
    Object.defineProperty(shopProductDetailController.prototype, "screenMode", {
        get: function () {
            return this.screenModeManager.currentMode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(shopProductDetailController.prototype, "shopProductDetail", {
        get: function () {
            return this.screenModeManager.entity;
        },
        enumerable: true,
        configurable: true
    });
    shopProductDetailController.prototype.registerShopProductDetailInformationController = function (shopProductDetailInformationController) {
        this.shopProductDetailInformationController = shopProductDetailInformationController;
        this.childControllers.push(shopProductDetailInformationController);
    };
    shopProductDetailController.prototype.registerShopProductDetailAttributesController = function (shopProductDetailAttributesController) {
        this.shopProductDetailAttributesController = shopProductDetailAttributesController;
        this.childControllers.push(shopProductDetailAttributesController);
    };
    shopProductDetailController.prototype.registerShopProductDetailOptionsController = function (shopProductDetailOptionsController) {
        this.shopProductDetailOptionsController = shopProductDetailOptionsController;
        this.childControllers.push(shopProductDetailOptionsController);
    };
    shopProductDetailController.prototype.registerShopProductDetailShippingController = function (shopProductDetailShippingController) {
        this.shopProductDetailShippingController = shopProductDetailShippingController;
        this.childControllers.push(shopProductDetailShippingController);
    };
    Object.defineProperty(shopProductDetailController.prototype, "isNew", {
        get: function () {
            var self = this;
            return self.baseController.isNullOrUndefined(self.id);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(shopProductDetailController.prototype, "isEditable", {
        get: function () {
            var self = this;
            if (!self.baseController.commonController.hasEditPermission()) {
                return false;
            }
            return self.screenModeManager.currentMode == SCREEN_MODE.ADD || self.screenModeManager.currentMode == SCREEN_MODE.EDIT;
        },
        enumerable: true,
        configurable: true
    });
    shopProductDetailController.prototype.initVariables = function () {
        var self = this;
        this.baseController = this.scope.baseController;
    };
    shopProductDetailController.prototype.setInfo = function (shopId, id, mode) {
        var self = this;
        self.formValidator = new formValidator(self.$parse, self.toaster, self.scope, self.formName);
        self.shopId = shopId;
        self.id = id;
        self.screenModeManager = new screenModeManager(self, self.saveMethod, false);
        self.screenModeManager.currentMode = mode;
        self.loadScreenConstants();
        if (mode == SCREEN_MODE.ADD) {
            var _product = new shopProductDetailViewModel();
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
        }
        else {
            self.loadEntity();
        }
        self.initialize();
    };
    shopProductDetailController.prototype.initialize = function () {
        var self = this;
    };
    shopProductDetailController.prototype.loadEntity = function () {
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
    };
    shopProductDetailController.prototype.formatEntity = function (entity) {
        var self = this;
        var returnData = JSON.parse(JSON.stringify(entity));
        return self.applyObjectCorrections(returnData);
    };
    shopProductDetailController.prototype.applyObjectCorrections = function (item) {
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
            item.productImages.sort(function (a, b) {
                return (a.displayOrder || 0) - (b.displayOrder || 0);
            });
        }
        if (!self.baseController.isNullOrUndefined(item.attributes) && item.attributes.length > 0) {
            item.attributes.sort(function (a, b) {
                return (a.displayOrder || 0) - (b.displayOrder || 0);
            });
        }
        if (!self.baseController.isNullOrUndefined(item.options) && item.options.length > 0) {
            item.options.sort(function (a, b) {
                return (a.displayOrder || 0) - (b.displayOrder || 0);
            });
        }
        return item;
    };
    shopProductDetailController.prototype.saveMethod = function (modifiedEntity, caller) {
        var self = caller;
        self.registerValidations();
        if (!self.validateForGroups()) {
            return;
        }
        var _saveProductDto = self.formatEntityBeforeSave(self.shopProductDetail);
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
    };
    shopProductDetailController.prototype.registerValidations = function () {
        var self = this;
        for (var i = 0; i < self.childControllers.length; i++) {
            var currentChild = self.childControllers[i];
            currentChild.registerValidations();
        }
    };
    shopProductDetailController.prototype.validateForGroups = function () {
        var self = this;
        var isValid = true;
        var errorMessages = [];
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
    };
    shopProductDetailController.prototype.idGroupValid = function (productTab) {
        var self = this;
        var isValid = true;
        var groupName = shopProductDetailTabNameFromEnum.getName(productTab);
        var childValidator = Enumerable.From(self.childControllers).Where(function (childController) {
            return childController.groupName == groupName;
        }).FirstOrDefault(null);
        if (childValidator != null && childValidator.hasScreenDetailBeenLoaded) {
            isValid = childValidator.formValidator.validateGroup(groupName, false);
        }
        return isValid;
    };
    shopProductDetailController.prototype.loadScreenConstants = function () {
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
    };
    shopProductDetailController.prototype.formatScreenConstant = function (data) {
        var self = this;
        self.productTypes = data.productTypes;
    };
    shopProductDetailController.prototype.onProductDetailLoaded = function () {
        var self = this;
        self.hasProductDetailBeenLoaded = true;
        self.onAllDetailLoaded();
    };
    shopProductDetailController.prototype.onScreenDetailLoaded = function () {
        var self = this;
        self.hasScreenDetailBeenLoaded = true;
        self.onAllDetailLoaded();
    };
    shopProductDetailController.prototype.onAllDetailLoaded = function () {
        var self = this;
        if (self.hasScreenDetailBeenLoaded && self.hasProductDetailBeenLoaded) {
            self.formatOnAllDetail();
            self.childControllers.forEach(function (controller) {
                controller.onDetailLoaded();
            });
        }
    };
    shopProductDetailController.prototype.formatOnAllDetail = function () {
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
    };
    shopProductDetailController.prototype.formatEntityBeforeSave = function (entity) {
        var self = this;
        var formattedEntity = self.baseController.cloneObject(entity);
        return formattedEntity;
    };
    shopProductDetailController.prototype.setCurrentState = function (shopProductDetailTab) {
        var self = this;
        self.currentState = shopProductDetailTab;
    };
    shopProductDetailController.prototype.upload = function (file, arrayToUpload, isArray) {
        var self = this;
        self.baseController.upload(file, arrayToUpload, isArray);
    };
    shopProductDetailController.prototype.deleteImage = function (picture, pictureDataList, isArray) {
        var self = this;
        self.baseController.deleteImage(picture, pictureDataList, isArray);
    };
    return shopProductDetailController;
}());
shopModule.controller("shopProductDetailController", ["$scope",
    "$parse",
    "toaster",
    "shopWebService",
    shopProductDetailController
]);
var shopProductDetailTab;
(function (shopProductDetailTab) {
    shopProductDetailTab[shopProductDetailTab["INFORMATION"] = 1] = "INFORMATION";
    shopProductDetailTab[shopProductDetailTab["ATTRIBUTES"] = 2] = "ATTRIBUTES";
    shopProductDetailTab[shopProductDetailTab["OPTIONS"] = 3] = "OPTIONS";
    shopProductDetailTab[shopProductDetailTab["SHIPPING"] = 4] = "SHIPPING";
})(shopProductDetailTab || (shopProductDetailTab = {}));
var shopProductDetailTabNameFromEnum = /** @class */ (function () {
    function shopProductDetailTabNameFromEnum() {
    }
    shopProductDetailTabNameFromEnum.getName = function (_shopProductDetailTab) {
        var name;
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
    };
    return shopProductDetailTabNameFromEnum;
}());
var shopProductDetailViewModel = /** @class */ (function (_super) {
    __extends(shopProductDetailViewModel, _super);
    function shopProductDetailViewModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return shopProductDetailViewModel;
}(shopProductModel));
