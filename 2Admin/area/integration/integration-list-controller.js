var integrationListController = /** @class */ (function () {
    function integrationListController($scope, integrationWebService) {
        var self = this;
        $scope.controller = this;
        this.scope = $scope;
        this.baseController = this.scope.baseController;
        this.integrationWebService = integrationWebService;
        this.initVariables();
    }
    integrationListController.prototype.initVariables = function () {
        var self = this;
        self.baseController = this.scope.baseController;
    };
    integrationListController.prototype.setInfo = function () {
        var self = this;
        self.intializePagingInfo();
        self.gridLoad();
    };
    integrationListController.prototype.intializePagingInfo = function () {
        var self = this;
        self.paging = new integrationSortingPagingInfo();
        self.paging.pageIndex = 1;
        self.paging.pageSize = 10;
        self.paging.pageCount = 0;
        self.paging.sortField = "";
        self.paging.sortColumn = "";
        self.paging.sortByDesc = false;
    };
    integrationListController.prototype.gridLoad = function () {
        var self = this;
        var sorting = self.baseController.cloneObject(self.paging);
        sorting.pageIndex--;
        self.baseController.showLoading();
        self.integrationWebService.getIntegrationList(sorting)
            .then(function (response) {
            if (response.status == STATUS_MESSAGE.SUCCESS) {
                self.paging.pageCount = response.result.totalCount;
                self.list = self.formatList(response.result.entityList);
                self.onGridLoaded();
            }
            else {
                self.baseController.showMessage(response.errorMessage, "", ALERT_MESSAGE_TYPE.ERROR, false, null, true);
            }
        })
            .catch(function (error) {
            self.baseController.hideLoading();
            self.baseController.showMessage("We encountered a problem while processing your request. Please try again later or contact support (contact@connectus.mu) if the issue persists.", error, ALERT_MESSAGE_TYPE.ERROR, false, null, true);
        })
            .finally(function () {
            self.baseController.hideLoading();
        });
    };
    integrationListController.prototype.onGridLoaded = function () {
    };
    integrationListController.prototype.formatList = function (contactFormList) {
        var self = this;
        var _integrationList = [];
        Enumerable.From(contactFormList).ForEach(function (integration) {
            var _formatted = self.baseController.cloneObject(integration);
            _integrationList.push(_formatted);
        });
        return _integrationList;
    };
    integrationListController.prototype.onEditClick = function (item) {
        var self = this;
        //window.location.href = "/service-provider-detail/" + item.id + "/" + SCREEN_MODE.VIEW;
    };
    integrationListController.prototype.viewIntegration = function (integration) {
        var self = this;
        window.location.href = "/integration-detail/?it=" + integration.idIntegrationType;
    };
    return integrationListController;
}());
integrationModule.controller("integrationListController", ["$scope",
    "integrationWebService",
    integrationListController
]);
