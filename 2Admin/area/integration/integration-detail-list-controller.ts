class integrationDetailListController {
    scope;
    baseController: baseController;
    integrationWebService: integrationWebService;

    paging: integrationDetailSortingPagingInfo;
    list: integrationListViewModel[];

    idIntegrationType; string;
    constructor($scope, integrationWebService) {
        var self = this;
        $scope.controller = this;
        this.scope = $scope;
        this.baseController = this.scope.baseController;
        this.integrationWebService = integrationWebService;
        this.initVariables();
    }

    public initVariables() {
        var self = this;
        self.baseController = this.scope.baseController;
    }

    public setInfo(idIntegrationType) {
        var self = this;
        self.idIntegrationType = idIntegrationType;
        self.intializePagingInfo();
        self.gridLoad();
    }

    public intializePagingInfo() {
        var self = this;
        self.paging = new integrationDetailSortingPagingInfo();

        self.resetPagingInfo();

        self.paging.sortByDesc = false;


    }

    public resetPagingInfo() {
        var self = this;

        self.paging.pageIndex = 1;
        self.paging.pageSize = 10;
        self.paging.pageCount = 0;
        self.paging.sortField = "";
        self.paging.sortColumn = "";
        self.paging.idIntegrationType = self.idIntegrationType;
    }


    public gridLoad() {
        var self = this;
        var sorting: integrationDetailSortingPagingInfo = self.baseController.cloneObject(self.paging);

        sorting.pageIndex--;
        self.baseController.showLoading();

        self.integrationWebService.getIntegrationDetailList(sorting)
            .then(function (response: baseResultReturnType<baseListReturnType<getIntegrationListReturnType[]>>) {
                if (response.status == STATUS_MESSAGE.SUCCESS) {
                    self.paging.pageCount = response.result.totalCount;
                    self.list = self.formatList(response.result.entityList);
                    self.onGridLoaded();
                } else {
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
    }

    public onGridLoaded() {

    }

    public formatList(contactFormList: getIntegrationListReturnType[]): integrationListViewModel[] {
        var self = this;
        var _integrationList: integrationListViewModel[] = [];
        Enumerable.From(contactFormList).ForEach(function (integration: getIntegrationListReturnType) {
            var _formatted: integrationListViewModel = self.baseController.cloneObject(integration);

            _integrationList.push(_formatted);
        })
        return _integrationList;
    }

    public loadMore() {
        var self = this;
        self.paging.pageIndex++;
        self.gridLoad();
    }

    public sortBy() {
        var self = this;
        self.paging.sortByDesc = !self.paging.sortByDesc;
        self.resetPagingInfo();
        self.gridLoad();
    }

    public search() {
        var self = this;
        self.resetPagingInfo();
        self.gridLoad();
    }

    public onActionClick(action) {
        var self = this;
        if (action.idActionType == "a639a43a-6f0a-4fca-a06b-8ae15c4bd386") {// direct url
            window.open(action.url);
        } else if (action.idActionType == "6226cf21-2511-4c16-a7ac-7f790d242465") {//download
            self.downloadFile(action.url);
        }
    }

    public downloadFile(url) {
        var self = this;
        var fileArray = self.integrationWebService.genericWebConnectionService.loadDownloadRequestDirect("GET", url, {});
      
    }
}

integrationModule.controller("integrationDetailListController"
    , ["$scope"
        , "integrationWebService"
        , integrationDetailListController
    ])

