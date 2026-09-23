var cardDetailBasicInfoController = /** @class */ (function () {
    function cardDetailBasicInfoController($scope, $parse, toaster, cardWebService) {
        this.$scope = $scope;
        this.$parse = $parse;
        this.toaster = toaster;
        this.groupName = cardDetailTabNameFromEnum.getName(cardDetailTab.BASIC_INFO);
        this.cardDetailTabEnum = cardDetailTab;
        this.isSiteUrlAvailable = true;
        this.scope = $scope;
        this.scope.controller = this;
        this.callerController = $scope.$parent.controller;
        this.baseController = $scope.baseController;
        this.cardWebService = cardWebService;
        this.callerController.registerCardDetailBasicInfoController(this);
        this.initialize();
    }
    Object.defineProperty(cardDetailBasicInfoController.prototype, "hasScreenDetailBeenLoaded", {
        get: function () {
            return this.callerController.hasScreenDetailBeenLoaded;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailBasicInfoController.prototype, "hasCardDetailBeenLoaded", {
        get: function () {
            return this.callerController.hasCardDetailBeenLoaded;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailBasicInfoController.prototype, "screenMode", {
        get: function () {
            return this.callerController.screenModeManager.currentMode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailBasicInfoController.prototype, "cardDetail", {
        get: function () {
            return this.callerController.screenModeManager.entity;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailBasicInfoController.prototype, "isEditable", {
        get: function () {
            var self = this;
            return self.callerController.isEditable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailBasicInfoController.prototype, "isNew", {
        get: function () {
            var self = this;
            return self.callerController.isNew;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailBasicInfoController.prototype, "formName", {
        get: function () {
            return this.callerController.formName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailBasicInfoController.prototype, "isCardStateEditable", {
        get: function () {
            var self = this;
            var isAdmin = self.baseController.commonController.isAdmin();
            return self.callerController.isEditable && isAdmin;
        },
        enumerable: true,
        configurable: true
    });
    cardDetailBasicInfoController.prototype.initialize = function () {
        var self = this;
        self.registerValidations();
    };
    cardDetailBasicInfoController.prototype.registerValidations = function () {
        var self = this;
        if (self.formValidator != null) {
            self.formValidator.deRegister();
        }
        self.formValidator = new formValidator(this.$parse, this.toaster, self.scope, self.formName);
        self.formValidator.registerValidationForMandatory(self.scope, 'enterpriseName', 'Nom du magasin');
        self.formValidator.registerGroupValidation(self.groupName, ['enterpriseName']);
    };
    cardDetailBasicInfoController.prototype.onDetailLoaded = function () {
        var self = this;
    };
    cardDetailBasicInfoController.prototype.upload = function (file, arrayToUpload, isArray) {
        var self = this;
        self.baseController.upload(file, arrayToUpload, isArray);
    };
    cardDetailBasicInfoController.prototype.deleteImage = function (picture, pictureDataList, isArray) {
        var self = this;
        self.baseController.deleteImage(picture, pictureDataList, isArray);
    };
    cardDetailBasicInfoController.prototype.setColor = function (color) {
        var self = this;
        self.cardDetail.color = color;
        console.log(color);
    };
    return cardDetailBasicInfoController;
}());
cardModule.controller("cardDetailBasicInfoController", ["$scope",
    "$parse",
    "toaster",
    "cardWebService",
    cardDetailBasicInfoController
]);
