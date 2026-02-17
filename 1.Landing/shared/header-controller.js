var headerController = /** @class */ (function () {
    function headerController($scope, commonWebService) {
        this.sharedItem = {};
        $scope.headerController = this;
        this.$scope = $scope;
        this.baseController = this.$scope.baseController;
        this.commonWebService = commonWebService;
        this.initVariables();
    }
    headerController.prototype.initVariables = function () {
        var self = this;
    };
    headerController.prototype.setInfo = function () {
        var self = this;
        var controllerInstance = new controllerInstanceDetail();
        controllerInstance.controllerName = "headerController";
        controllerInstance.instance = self;
        self.baseController.addLoadedControllerInstance(controllerInstance);
        self.setCommonControllerInstance();
    };
    headerController.prototype.setCommonControllerInstance = function () {
        var self = this;
        var _controllerInstanceListenerFunctionDetail = new controllerInstanceListenerFunctionDetail();
        _controllerInstanceListenerFunctionDetail.callerInstance = self;
        _controllerInstanceListenerFunctionDetail.function = self.assignCommonControllerOnloaded;
        var commonControllerInstance = self.baseController.getOrAddToListenerControllerInstance("commonController", _controllerInstanceListenerFunctionDetail);
        if (commonControllerInstance != null) {
            self.assignCommonControllerOnloaded(commonControllerInstance, self);
        }
    };
    headerController.prototype.assignCommonControllerOnloaded = function (commonControllerInstance, self) {
        self.commonController = commonControllerInstance;
    };
    headerController.prototype.logout = function () {
        var self = this;
        console.log('log');
        self.commonController.logout();
    };
    return headerController;
}());
commonModule.controller("headerController", ["$scope",
    "commonWebService",
    headerController
]);
