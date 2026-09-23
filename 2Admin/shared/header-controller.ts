class headerController {
    $scope;
    baseController: baseController;
    commonWebService: commonWebService;

    sharedItem = {};
    commonController: commonController;
    constructor($scope, commonWebService: commonWebService) {
        $scope.headerController = this;

        this.$scope = $scope;
        this.baseController = this.$scope.baseController;
        this.commonWebService = commonWebService;
        this.initVariables();
    }

    public initVariables() {
        var self = this;
    }

    public setInfo() {
        var self = this;
        var controllerInstance: controllerInstanceDetail = new controllerInstanceDetail();
        controllerInstance.controllerName = "headerController";
        controllerInstance.instance = self;

        self.baseController.addLoadedControllerInstance(controllerInstance);
        self.setCommonControllerInstance();
    }

    public setCommonControllerInstance() {
        var self = this;
        var _controllerInstanceListenerFunctionDetail: controllerInstanceListenerFunctionDetail = new controllerInstanceListenerFunctionDetail();
        _controllerInstanceListenerFunctionDetail.callerInstance = self;
        _controllerInstanceListenerFunctionDetail.function = self.assignCommonControllerOnloaded;

        var commonControllerInstance = self.baseController.getOrAddToListenerControllerInstance("commonController", _controllerInstanceListenerFunctionDetail);
        if (commonControllerInstance != null) {
            self.assignCommonControllerOnloaded(commonControllerInstance, self)
        }
    }

    public assignCommonControllerOnloaded(commonControllerInstance: commonController, self: headerController) {
        self.commonController = commonControllerInstance;
    }

    public logout() {
        var self = this;
        console.log('log');
        self.commonController.logout();
    }

}

commonModule.controller("headerController"
    , ["$scope"
        , "commonWebService"
        , headerController
    ]);