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
var integrationDetailController = /** @class */ (function () {
    function integrationDetailController($scope, $parse, toaster, integrationDetailWebService) {
        this.$parse = $parse;
        this.toaster = toaster;
        this.previsualizeUrl = '';
        this.preloadedData = {};
        this.childControllers = [];
        this.formName = 'integrationDetailForm';
        this.currentState = integrationDetailTab.BASIC_INFO;
        this.integrationDetailTab = integrationDetailTab;
        var self = this;
        $scope.controller = this;
        this.integrationDetailWebService = integrationDetailWebService;
        this.scope = $scope;
        this.baseController = this.scope.baseController;
        this.initVariables();
        this.registerValidations();
    }
    Object.defineProperty(integrationDetailController.prototype, "screenMode", {
        get: function () {
            return this.screenModeManager.currentMode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(integrationDetailController.prototype, "integrationDetail", {
        get: function () {
            return this.screenModeManager.entity;
        },
        enumerable: true,
        configurable: true
    });
    integrationDetailController.prototype.registerIntegrationDetailBasicInfoController = function (integrationDetailBasicInfoController) {
        this.integrationDetailBasicInfoController = integrationDetailBasicInfoController;
        this.childControllers.push(integrationDetailBasicInfoController);
    };
    Object.defineProperty(integrationDetailController.prototype, "isNew", {
        get: function () {
            var self = this;
            return self.baseController.isNullOrUndefined(self.id);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(integrationDetailController.prototype, "isEditable", {
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
    integrationDetailController.prototype.initVariables = function () {
        var self = this;
        this.baseController = this.scope.baseController;
    };
    integrationDetailController.prototype.setInfo = function (id, mode, viewState) {
        var self = this;
        self.formValidator = new formValidator(self.$parse, self.toaster, self.scope, self.formName);
        self.id = id;
        self.viewState = viewState;
        self.screenModeManager = new screenModeManager(self, self.saveMethod, false);
        self.screenModeManager.currentMode = mode;
        self.loadScreenConstants();
        if (mode == SCREEN_MODE.ADD) {
            var _integration = new integrationDetailViewModel();
            self.screenModeManager.setEntity(self.formatEntity(_integration));
            self.onIntegrationDetailLoaded();
        }
        else {
            self.loadEntity();
        }
        self.initialize();
    };
    integrationDetailController.prototype.initialize = function () {
        var self = this;
    };
    integrationDetailController.prototype.loadEntity = function () {
        var self = this;
        self.baseController.showLoading();
        var _getBookingSettingDto = new getIntegrationDto();
        _getBookingSettingDto.idIntegrationType = self.id;
        self.integrationDetailWebService.getIntegration(_getBookingSettingDto)
            .then(function (response) {
            if (response.status == STATUS_MESSAGE.SUCCESS) {
                self.screenModeManager.setEntity(self.formatEntity(response.result));
                self.onIntegrationDetailLoaded();
            }
            else {
                self.baseController.showMessage(response.errorMessage, "", ALERT_MESSAGE_TYPE.ERROR);
            }
        }).catch(function (errorMsg) {
            self.baseController.showMessage(errorMsg, "We encountered a problem while processing your request. Please try again later or contact support (contact@connectus.mu) if the issue persists.", ALERT_MESSAGE_TYPE.ERROR);
        }).finally(function () {
            self.baseController.hideLoading();
        });
    };
    integrationDetailController.prototype.formatEntity = function (entity) {
        var self = this;
        var returnData = JSON.parse(JSON.stringify(entity));
        return self.applyObjectCorrections(returnData);
    };
    integrationDetailController.prototype.applyObjectCorrections = function (item) {
        var self = this;
        return item;
    };
    integrationDetailController.prototype.saveMethod = function (modifiedEntity, caller) {
        var self = caller;
        self.registerValidations();
        if (!self.validateForGroups()) {
            self.screenModeManager.setMode(SCREEN_MODE.EDIT);
            return;
        }
        var _saveIntegrationDto = self.formatEntityBeforeSave(self.integrationDetail);
        self.baseController.showLoading();
        self.integrationDetailWebService.saveIntegration(_saveIntegrationDto)
            .then(function (response) {
            if (response.status == STATUS_MESSAGE.SUCCESS) {
                self.baseController.showToast(TOASTER_TYPE.SUCCESS, "Enregistré avec succès");
                self.screenModeManager.setEntity(self.formatEntity(response.result));
                self.id = response.result.idIntegration;
            }
            else {
                self.baseController.showMessage(response.errorMessage, "", ALERT_MESSAGE_TYPE.ERROR, false, null, true);
            }
        }).catch(function (errorMsg) {
            self.baseController.showMessage(errorMsg, "We encountered a problem while processing your request. Please try again later or contact support (contact@connectus.mu) if the issue persists.", ALERT_MESSAGE_TYPE.ERROR);
            self.screenModeManager.setMode(SCREEN_MODE.EDIT);
        }).finally(function () {
            self.baseController.hideLoading();
        });
    };
    integrationDetailController.prototype.registerValidations = function () {
        var self = this;
        for (var i = 0; i < self.childControllers.length; i++) {
            var currentChild = self.childControllers[i];
            currentChild.registerValidations();
        }
    };
    integrationDetailController.prototype.validateForGroups = function () {
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
    integrationDetailController.prototype.idGroupValid = function (profileTab) {
        var self = this;
        var isValid = true;
        var groupName = integrationDetailTabNameFromEnum.getName(profileTab);
        var childValidator = Enumerable.From(self.childControllers).Where(function (childController) {
            return childController.groupName == groupName;
        }).FirstOrDefault(null);
        if (childValidator != null && childValidator.hasScreenDetailBeenLoaded) {
            isValid = childValidator.formValidator.validateGroup(groupName, false);
        }
        return isValid;
    };
    integrationDetailController.prototype.loadScreenConstants = function () {
        var self = this;
        self.onScreenDetailLoaded();
        //self.integrationDetailWebService.integrationDetailScreenConstantJson()
        //    .then(function (response: baseResultReturnType<getIntegrationDetailScreenConstantReturnType>) {
        //        if (response.status == STATUS_MESSAGE.SUCCESS) {
        //            self.onScreenDetailLoaded();
        //        } else {
        //            self.baseController.showMessage(response.errorMessage, "", ALERT_MESSAGE_TYPE.ERROR);
        //        }
        //    }).catch(function (errorMsg) {
        //        self.baseController.showMessage(errorMsg, "We encountered a problem while processing your request. Please try again later or contact support (contact@connectus.mu) if the issue persists.", ALERT_MESSAGE_TYPE.ERROR);
        //    }).finally(function () {
        //        self.baseController.hideLoading();
        //    });
    };
    integrationDetailController.prototype.onIntegrationDetailLoaded = function () {
        var self = this;
        self.hasIntegrationDetailBeenLoaded = true;
        self.onAllDetailLoaded();
    };
    integrationDetailController.prototype.onScreenDetailLoaded = function () {
        var self = this;
        self.hasScreenDetailBeenLoaded = true;
        self.onAllDetailLoaded();
    };
    integrationDetailController.prototype.onAllDetailLoaded = function () {
        var self = this;
        if (self.hasScreenDetailBeenLoaded && self.hasIntegrationDetailBeenLoaded) {
            self.formatOnAllDetail();
            self.childControllers.forEach(function (controller) {
                controller.onDetailLoaded();
            });
        }
    };
    integrationDetailController.prototype.formatOnAllDetail = function () {
        var self = this;
    };
    integrationDetailController.prototype.formatEntityBeforeSave = function (entity) {
        var self = this;
        var formattedEntity = self.baseController.cloneObject(entity);
        return formattedEntity;
    };
    integrationDetailController.prototype.setCurrentState = function (integrationDetailTab) {
        var self = this;
        self.currentState = integrationDetailTab;
    };
    integrationDetailController.prototype.upload = function (file, arrayToUpload, isArray) {
        var self = this;
        self.baseController.upload(file, arrayToUpload, isArray);
    };
    integrationDetailController.prototype.deleteImage = function (picture, pictureDataList, isArray) {
        var self = this;
        self.baseController.deleteImage(picture, pictureDataList, isArray);
    };
    return integrationDetailController;
}());
integrationModule.controller("integrationDetailController", ["$scope",
    "$parse",
    "toaster",
    "integrationWebService",
    integrationDetailController
]);
var integrationDetailTab;
(function (integrationDetailTab) {
    integrationDetailTab[integrationDetailTab["BASIC_INFO"] = 1] = "BASIC_INFO";
})(integrationDetailTab || (integrationDetailTab = {}));
var integrationDetailTabNameFromEnum = /** @class */ (function () {
    function integrationDetailTabNameFromEnum() {
    }
    integrationDetailTabNameFromEnum.getName = function (_subscriptionSettingTab) {
        var name;
        switch (_subscriptionSettingTab) {
            case integrationDetailTab.BASIC_INFO:
                name = 'BASIC_INFO';
                break;
        }
        return name;
    };
    return integrationDetailTabNameFromEnum;
}());
var integrationDetailViewModel = /** @class */ (function (_super) {
    __extends(integrationDetailViewModel, _super);
    function integrationDetailViewModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return integrationDetailViewModel;
}(integrationModel));
