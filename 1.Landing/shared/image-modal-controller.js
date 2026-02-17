var imageModalController = /** @class */ (function () {
    function imageModalController($scope) {
        var self = this;
        $scope.controller = this;
        this.callerController = $scope.$parent.controller;
        this.scope = $scope;
        this.baseController = this.scope.baseController;
        this.initVariables();
        this.initialize();
    }
    imageModalController.prototype.initVariables = function () {
        var self = this;
    };
    imageModalController.prototype.initialize = function () {
        var self = this;
        self.imageData = self.baseController.globalVariableFactory.sessionVariables.getVariableFromSessionSpace(sessionVariableSpaceEnum.TRANSFER, "IMAGEDATA");
    };
    imageModalController.prototype.onOkToModal = function () {
        var self = this;
        //self.baseController.globalVariableFactory.sessionVariables.putVariableInSessionSpace(sessionVariableSpaceEnum.TRANSFER, "RECONCILEBANKORDER", self.reconcileBankOrderViewModel)
        self.scope.$close(self.baseController.globalVariableFactory.sessionVariables);
    };
    imageModalController.prototype.onCancelToModal = function () {
        var self = this;
        self.scope.$dismiss();
    };
    return imageModalController;
}());
commonModule.controller("imageModalController", ["$scope",
    imageModalController
]);
