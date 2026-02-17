class cardDetailMessageModalController<Y> {
    baseController: baseController;

    scope;
    callerController;

    message;

    constructor($scope
        , private $parse
        , private toaster
    ) {
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
        self.message = self.baseController.globalVariableFactory.sessionVariables.getVariableFromSessionSpace(sessionVariableSpaceEnum.TRANSFER, "MESSAGE");

    }



    public onOkToModal() {
        var self = this;
        self.scope.$close(self.baseController.globalVariableFactory.sessionVariables);
    }


    public onCancelToModal() {
        var self = this;
        self.scope.$dismiss();
    }

    public markAsRead() {
        var self = this;
        self.baseController.globalVariableFactory.sessionVariables.putVariableInSessionSpace(sessionVariableSpaceEnum.TRANSFER, "MESSAGE_STATUS", "READ");
        self.scope.$close(self.baseController.globalVariableFactory.sessionVariables);
    }


}

baseModule.controller("cardDetailMessageModalController"
    , ["$scope"
        , "$parse"
        , "toaster"
        , cardDetailMessageModalController
    ]);

