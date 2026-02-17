class cardListController {
    scope;
    baseController: baseController;
    cardWebService: cardWebService;

    paging: cardSortingPagingInfo;
    list: cardListViewModel[];

    structureType;
    structureTypeEnum = structureTypeEnum;
    constructor($scope, cardWebService) {
        var self = this;
        $scope.controller = this;
        this.scope = $scope;
        this.baseController = this.scope.baseController;
        this.cardWebService = cardWebService;
        this.initVariables();
    }

    public initVariables() {
        var self = this;
        self.baseController = this.scope.baseController;
    }

    public setInfo(structureType) {
        var self = this;

        self.structureType = structureType;
        self.intializePagingInfo();
        self.gridLoad();
    }

    public intializePagingInfo() {
        var self = this;
        self.paging = new cardSortingPagingInfo();

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
        self.paging.structureType = self.structureType;
    }

    public gridLoad() {
        var self = this;
        var sorting: cardSortingPagingInfo = self.baseController.cloneObject(self.paging);

        sorting.pageIndex--;
        self.baseController.showLoading();

        self.cardWebService.structureList(sorting)
            .then(function (response: baseResultReturnType<baseListReturnType<getCardListReturnType[]>>) {
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

    public formatList(contactFormList: getCardListReturnType[]): cardListViewModel[] {
        var self = this;
        var _cardList: cardListViewModel[] = [];
        Enumerable.From(contactFormList).ForEach(function (card: getCardListReturnType) {
            var _formatted: cardListViewModel = self.baseController.cloneObject(card);

            _cardList.push(_formatted);
        })
        return _cardList;
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

    public onEditClick(card) {
        var self = this;

        window.location.href = self.getDetailUrl() +"/"+  card.id + "/" + SCREEN_MODE.EDIT;
    }

    public newCard(card) {
        var self = this;

        window.location.href = self.getDetailUrl() + "/-1/" + SCREEN_MODE.ADD;
    }

    public getDetailUrl() {
        var self = this;
        var url = "/card-detail";

        if (self.structureType == 'LEGAL_ENTITY') {
            url = "/company-detail"
        }

        return url;
    }
}

cardModule.controller("cardListController"
    , ["$scope"
        , "cardWebService"
        , cardListController
    ])

