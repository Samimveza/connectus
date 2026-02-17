var cardListController = /** @class */ (function () {
    function cardListController($scope, cardWebService) {
        this.structureTypeEnum = structureTypeEnum;
        var self = this;
        $scope.controller = this;
        this.scope = $scope;
        this.baseController = this.scope.baseController;
        this.cardWebService = cardWebService;
        this.initVariables();
    }
    cardListController.prototype.initVariables = function () {
        var self = this;
        self.baseController = this.scope.baseController;
    };
    cardListController.prototype.setInfo = function (structureType) {
        var self = this;
        self.structureType = structureType;
        self.intializePagingInfo();
        self.gridLoad();
    };
    cardListController.prototype.intializePagingInfo = function () {
        var self = this;
        self.paging = new cardSortingPagingInfo();
        self.resetPagingInfo();
        self.paging.sortByDesc = false;
    };
    cardListController.prototype.resetPagingInfo = function () {
        var self = this;
        self.paging.pageIndex = 1;
        self.paging.pageSize = 10;
        self.paging.pageCount = 0;
        self.paging.sortField = "";
        self.paging.sortColumn = "";
        self.paging.structureType = self.structureType;
    };
    cardListController.prototype.gridLoad = function () {
        var self = this;
        var sorting = self.baseController.cloneObject(self.paging);
        sorting.pageIndex--;
        self.baseController.showLoading();
        self.cardWebService.structureList(sorting)
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
    cardListController.prototype.onGridLoaded = function () {
    };
    cardListController.prototype.formatList = function (contactFormList) {
        var self = this;
        var _cardList = [];
        Enumerable.From(contactFormList).ForEach(function (card) {
            var _formatted = self.baseController.cloneObject(card);
            _cardList.push(_formatted);
        });
        return _cardList;
    };
    cardListController.prototype.loadMore = function () {
        var self = this;
        self.paging.pageIndex++;
        self.gridLoad();
    };
    cardListController.prototype.sortBy = function () {
        var self = this;
        self.paging.sortByDesc = !self.paging.sortByDesc;
        self.resetPagingInfo();
        self.gridLoad();
    };
    cardListController.prototype.search = function () {
        var self = this;
        self.resetPagingInfo();
        self.gridLoad();
    };
    cardListController.prototype.onEditClick = function (card) {
        var self = this;
        window.location.href = self.getDetailUrl() + "/" + card.id + "/" + SCREEN_MODE.EDIT;
    };
    cardListController.prototype.newCard = function (card) {
        var self = this;
        window.location.href = self.getDetailUrl() + "/-1/" + SCREEN_MODE.ADD;
    };
    cardListController.prototype.getDetailUrl = function () {
        var self = this;
        var url = "/card-detail";
        if (self.structureType == 'LEGAL_ENTITY') {
            url = "/company-detail";
        }
        return url;
    };
    return cardListController;
}());
cardModule.controller("cardListController", ["$scope",
    "cardWebService",
    cardListController
]);
