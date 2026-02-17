var integrationDetailListController = /** @class */ (function () {
    function integrationDetailListController($scope, integrationWebService) {
        var self = this;
        $scope.controller = this;
        this.scope = $scope;
        this.baseController = this.scope.baseController;
        this.integrationWebService = integrationWebService;
        this.initVariables();
    }
    integrationDetailListController.prototype.initVariables = function () {
        var self = this;
        self.baseController = this.scope.baseController;
    };
    integrationDetailListController.prototype.setInfo = function (idIntegrationType) {
        var self = this;
        self.idIntegrationType = idIntegrationType;
        self.intializePagingInfo();
        self.gridLoad();
    };
    integrationDetailListController.prototype.intializePagingInfo = function () {
        var self = this;
        self.paging = new integrationDetailSortingPagingInfo();
        self.resetPagingInfo();
        self.paging.sortByDesc = false;
    };
    integrationDetailListController.prototype.resetPagingInfo = function () {
        var self = this;
        self.paging.pageIndex = 1;
        self.paging.pageSize = 10;
        self.paging.pageCount = 0;
        self.paging.sortField = "";
        self.paging.sortColumn = "";
        self.paging.idIntegrationType = self.idIntegrationType;
    };
    integrationDetailListController.prototype.gridLoad = function () {
        var self = this;
        var sorting = self.baseController.cloneObject(self.paging);
        sorting.pageIndex--;
        self.baseController.showLoading();
        self.integrationWebService.getIntegrationDetailList(sorting)
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
    integrationDetailListController.prototype.onGridLoaded = function () {
    };
    integrationDetailListController.prototype.formatList = function (contactFormList) {
        var self = this;
        var _integrationList = [];
        Enumerable.From(contactFormList).ForEach(function (integration) {
            var _formatted = self.baseController.cloneObject(integration);
            _integrationList.push(_formatted);
        });
        return _integrationList;
    };
    integrationDetailListController.prototype.loadMore = function () {
        var self = this;
        self.paging.pageIndex++;
        self.gridLoad();
    };
    integrationDetailListController.prototype.sortBy = function () {
        var self = this;
        self.paging.sortByDesc = !self.paging.sortByDesc;
        self.resetPagingInfo();
        self.gridLoad();
    };
    integrationDetailListController.prototype.search = function () {
        var self = this;
        self.resetPagingInfo();
        self.gridLoad();
    };
    integrationDetailListController.prototype.onActionClick = function (action) {
        var self = this;
        if (action.idActionType == "a639a43a-6f0a-4fca-a06b-8ae15c4bd386") { // direct url
            window.open(action.url);
        }
        else if (action.idActionType == "6226cf21-2511-4c16-a7ac-7f790d242465") { //download
            self.downloadFile(action.url);
        }
    };
    integrationDetailListController.prototype.downloadFile = function (url) {
        var self = this;
        var fileArray = self.integrationWebService.genericWebConnectionService.loadDownloadRequestDirect("GET", url, {});
    };
    return integrationDetailListController;
}());
integrationModule.controller("integrationDetailListController", ["$scope",
    "integrationWebService",
    integrationDetailListController
]);
