var cardDetailCreationController = /** @class */ (function () {
    function cardDetailCreationController($scope, $parse, toaster, cardWebService) {
        this.$scope = $scope;
        this.$parse = $parse;
        this.toaster = toaster;
        this.groupName = cardDetailTabNameFromEnum.getName(cardDetailTab.SETTINGS);
        this.cardDetailTabEnum = cardDetailTab;
        this.scope = $scope;
        this.scope.controller = this;
        this.callerController = $scope.$parent.controller;
        this.baseController = $scope.baseController;
        this.cardWebService = cardWebService;
        this.callerController.registerCardDetailCreationController(this);
        this.initialize();
    }
    Object.defineProperty(cardDetailCreationController.prototype, "hasScreenDetailBeenLoaded", {
        get: function () {
            return this.callerController.hasScreenDetailBeenLoaded;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailCreationController.prototype, "hasCardDetailBeenLoaded", {
        get: function () {
            return this.callerController.hasCardDetailBeenLoaded;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailCreationController.prototype, "screenMode", {
        get: function () {
            return this.callerController.screenModeManager.currentMode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailCreationController.prototype, "cardDetail", {
        get: function () {
            return this.callerController.screenModeManager.entity;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailCreationController.prototype, "isEditable", {
        get: function () {
            var self = this;
            return self.callerController.isEditable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailCreationController.prototype, "isNew", {
        get: function () {
            var self = this;
            return self.callerController.isNew;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailCreationController.prototype, "formName", {
        get: function () {
            return this.callerController.formName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailCreationController.prototype, "isCardStateEditable", {
        get: function () {
            var self = this;
            var isAdmin = self.baseController.commonController.isAdmin();
            return self.callerController.isEditable && isAdmin;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailCreationController.prototype, "step", {
        get: function () {
            var self = this;
            return self.callerController.step;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailCreationController.prototype, "cardDetailStepInfo", {
        get: function () {
            var self = this;
            return self.callerController.cardDetailStepInfo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailCreationController.prototype, "arrowClass", {
        get: function () {
            var self = this;
            var position = "";
            if (self.step == 1 || self.step == 2) {
                return 'arrow-pos-1';
            }
            else if (self.step == 3) {
                return 'arrow-pos-3';
            }
            else if (self.step == 4) {
                return 'arrow-pos-4';
            }
            return '';
        },
        enumerable: true,
        configurable: true
    });
    cardDetailCreationController.prototype.initialize = function () {
        var self = this;
        self.registerValidations();
    };
    cardDetailCreationController.prototype.registerValidations = function () {
        var self = this;
        if (self.formValidator != null) {
            self.formValidator.deRegister();
        }
        self.formValidator = new formValidator(this.$parse, this.toaster, self.scope, self.formName);
        self.formValidator.registerGroupValidation(self.groupName, []);
    };
    cardDetailCreationController.prototype.onDetailLoaded = function () {
        var self = this;
    };
    cardDetailCreationController.prototype.upload = function (file, arrayToUpload, isArray) {
        var self = this;
        self.baseController.upload(file, arrayToUpload, isArray);
    };
    cardDetailCreationController.prototype.deleteImage = function (picture, pictureDataList, isArray) {
        var self = this;
        self.baseController.deleteImage(picture, pictureDataList, isArray);
    };
    cardDetailCreationController.prototype.onNextClick = function () {
        var self = this;
        self.callerController.onNextClick();
    };
    cardDetailCreationController.prototype.goToStep = function (step) {
        var self = this;
        self.callerController.goToStep(step);
    };
    return cardDetailCreationController;
}());
cardModule.controller("cardDetailCreationController", ["$scope",
    "$parse",
    "toaster",
    "cardWebService",
    cardDetailCreationController
]);
