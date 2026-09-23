var cardDetailMessageModalController = /** @class */ (function () {
    function cardDetailMessageModalController($scope, $parse, toaster) {
        this.$parse = $parse;
        this.toaster = toaster;
        var self = this;
        $scope.controller = this;
        this.callerController = $scope.$parent.controller;
        this.scope = $scope;
        this.baseController = this.scope.baseController;
        this.initVariables();
        this.initialize();
    }
    cardDetailMessageModalController.prototype.initVariables = function () {
        var self = this;
    };
    cardDetailMessageModalController.prototype.initialize = function () {
        var self = this;
        self.message = self.baseController.globalVariableFactory.sessionVariables.getVariableFromSessionSpace(sessionVariableSpaceEnum.TRANSFER, "MESSAGE");
    };
    cardDetailMessageModalController.prototype.onOkToModal = function () {
        var self = this;
        self.scope.$close(self.baseController.globalVariableFactory.sessionVariables);
    };
    cardDetailMessageModalController.prototype.onCancelToModal = function () {
        var self = this;
        self.scope.$dismiss();
    };
    cardDetailMessageModalController.prototype.markAsRead = function () {
        var self = this;
        self.baseController.globalVariableFactory.sessionVariables.putVariableInSessionSpace(sessionVariableSpaceEnum.TRANSFER, "MESSAGE_STATUS", "READ");
        self.scope.$close(self.baseController.globalVariableFactory.sessionVariables);
    };
    return cardDetailMessageModalController;
}());
baseModule.controller("cardDetailMessageModalController", ["$scope",
    "$parse",
    "toaster",
    cardDetailMessageModalController
]);
