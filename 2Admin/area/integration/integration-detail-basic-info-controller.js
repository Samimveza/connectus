var integrationDetailBasicInfoController = /** @class */ (function () {
    function integrationDetailBasicInfoController($scope, $parse, toaster, integrationWebService) {
        this.$scope = $scope;
        this.$parse = $parse;
        this.toaster = toaster;
        this.groupName = integrationDetailTabNameFromEnum.getName(integrationDetailTab.BASIC_INFO);
        this.integrationDetailTabEnum = integrationDetailTab;
        this.isSiteUrlAvailable = true;
        this.scope = $scope;
        this.scope.controller = this;
        this.callerController = $scope.$parent.controller;
        this.baseController = $scope.baseController;
        this.integrationWebService = integrationWebService;
        this.callerController.registerIntegrationDetailBasicInfoController(this);
        this.initialize();
    }
    Object.defineProperty(integrationDetailBasicInfoController.prototype, "hasScreenDetailBeenLoaded", {
        get: function () {
            return this.callerController.hasScreenDetailBeenLoaded;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(integrationDetailBasicInfoController.prototype, "hasIntegrationDetailBeenLoaded", {
        get: function () {
            return this.callerController.hasIntegrationDetailBeenLoaded;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(integrationDetailBasicInfoController.prototype, "screenMode", {
        get: function () {
            return this.callerController.screenModeManager.currentMode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(integrationDetailBasicInfoController.prototype, "integrationDetail", {
        get: function () {
            return this.callerController.screenModeManager.entity;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(integrationDetailBasicInfoController.prototype, "isEditable", {
        get: function () {
            var self = this;
            return self.callerController.isEditable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(integrationDetailBasicInfoController.prototype, "isNew", {
        get: function () {
            var self = this;
            return self.callerController.isNew;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(integrationDetailBasicInfoController.prototype, "formName", {
        get: function () {
            return this.callerController.formName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(integrationDetailBasicInfoController.prototype, "isIntegrationStateEditable", {
        get: function () {
            var self = this;
            var isAdmin = self.baseController.commonController.isAdmin();
            return self.callerController.isEditable && isAdmin;
        },
        enumerable: true,
        configurable: true
    });
    integrationDetailBasicInfoController.prototype.initialize = function () {
        var self = this;
        self.registerValidations();
    };
    integrationDetailBasicInfoController.prototype.registerValidations = function () {
        var self = this;
        if (self.formValidator != null) {
            self.formValidator.deRegister();
        }
        self.formValidator = new formValidator(this.$parse, this.toaster, self.scope, self.formName);
        self.formValidator.registerValidationForMandatory(self.scope, 'enterpriseName', 'Nom du magasin');
        self.formValidator.registerGroupValidation(self.groupName, ['enterpriseName']);
    };
    integrationDetailBasicInfoController.prototype.onDetailLoaded = function () {
        var self = this;
    };
    integrationDetailBasicInfoController.prototype.upload = function (file, arrayToUpload, isArray) {
        var self = this;
        self.baseController.upload(file, arrayToUpload, isArray);
    };
    integrationDetailBasicInfoController.prototype.deleteImage = function (picture, pictureDataList, isArray) {
        var self = this;
        self.baseController.deleteImage(picture, pictureDataList, isArray);
    };
    return integrationDetailBasicInfoController;
}());
integrationModule.controller("integrationDetailBasicInfoController", ["$scope",
    "$parse",
    "toaster",
    "integrationWebService",
    integrationDetailBasicInfoController
]);
