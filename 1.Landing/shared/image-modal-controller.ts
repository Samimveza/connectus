class imageModalController<Y> {
    baseController: baseController;

    scope;

    callerController: any;
    imageData: pictureDataModel;

    constructor($scope) {
        var self = this;
        $scope.controller = this;
        this.callerController = $scope.$parent.controller;
        this.scope = $scope;

        this.baseController = this.scope.baseController;

        this.initVariables();
        this.initialize();
    }

    public initVariables() {
        var self = this;
    }

    public initialize() {
        var self = this;
        self.imageData = self.baseController.globalVariableFactory.sessionVariables.getVariableFromSessionSpace(sessionVariableSpaceEnum.TRANSFER, "IMAGEDATA");
    }

    public onOkToModal() {
        var self = this;
        //self.baseController.globalVariableFactory.sessionVariables.putVariableInSessionSpace(sessionVariableSpaceEnum.TRANSFER, "RECONCILEBANKORDER", self.reconcileBankOrderViewModel)

        self.scope.$close(self.baseController.globalVariableFactory.sessionVariables);
    }

    public onCancelToModal() {
        var self = this;
        self.scope.$dismiss();
    }
}

commonModule.controller("imageModalController"
    , ["$scope"
        , imageModalController
    ]);