var cardWebService = /** @class */ (function () {
    function cardWebService(genericWebConnectionService, globalVariableFactory) {
        this.genericWebConnectionService = genericWebConnectionService;
        this.globalVariableFactory = globalVariableFactory;
    }
    cardWebService.prototype.structureList = function (sortingPagingInfo) {
        var url = '/api/structure-list';
        var data = sortingPagingInfo;
        return this.genericWebConnectionService.postRequest(url, data);
    };
    cardWebService.prototype.getCardDetaiScreenConstant = function () {
        var url = '/api/card-detail-screen-constant';
        var data = {};
        return this.genericWebConnectionService.postRequest(url, data);
    };
    cardWebService.prototype.saveCard = function (saveCardDto) {
        var url = '/api/structure-create';
        var data = saveCardDto;
        return this.genericWebConnectionService.postRequest(url, data);
    };
    cardWebService.prototype.getCard = function (getCardDto) {
        var url = '/api/structure-detail';
        var data = getCardDto;
        return this.genericWebConnectionService.postRequest(url, data);
    };
    cardWebService.prototype.deleteCard = function (getCardDto) {
        var url = '/api/structure-delete';
        var data = getCardDto;
        return this.genericWebConnectionService.postRequest(url, data);
    };
    cardWebService.prototype.getStructureViews = function (getCardDto) {
        var url = '/api/structure-views';
        var data = getCardDto;
        return this.genericWebConnectionService.postRequest(url, data);
    };
    cardWebService.prototype.structureMessageList = function (sortingPagingInfo) {
        var url = '/api/message-list-by-structure';
        var data = sortingPagingInfo;
        return this.genericWebConnectionService.postRequest(url, data);
    };
    cardWebService.prototype.manipulateMessageReadState = function (sortingPagingInfo) {
        var url = '/api/manipulate-message-read-state';
        var data = sortingPagingInfo;
        return this.genericWebConnectionService.postRequest(url, data);
    };
    return cardWebService;
}());
