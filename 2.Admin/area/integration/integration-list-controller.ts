class integrationListController {
    scope;
    baseController: baseController;
    integrationWebService: integrationWebService;

    paging: integrationSortingPagingInfo;
    list: integrationListViewModel[];

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

    public setInfo() {
        var self = this;
        self.intializePagingInfo();
        self.gridLoad();
    }

    public intializePagingInfo() {
        var self = this;
        self.paging = new integrationSortingPagingInfo();
        self.paging.pageIndex = 1;
        self.paging.pageSize = 10;
        self.paging.pageCount = 0;
        self.paging.sortField = "";
        self.paging.sortColumn = "";

        self.paging.sortByDesc = false;

    }

    public gridLoad() {
        var self = this;
        var sorting: integrationSortingPagingInfo = self.baseController.cloneObject(self.paging);

        sorting.pageIndex--;
        self.baseController.showLoading();

        self.integrationWebService.getIntegrationList(sorting)
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

    public onEditClick(item: getIntegrationListReturnType) {
        var self = this;
        //window.location.href = "/service-provider-detail/" + item.id + "/" + SCREEN_MODE.VIEW;
    }

    public viewIntegration(integration) {
        var self = this;
        window.location.href = "/integration-detail/?it=" + integration.idIntegrationType;
    }
}

integrationModule.controller("integrationListController"
    , ["$scope"
        , "integrationWebService"
        , integrationListController
    ])

