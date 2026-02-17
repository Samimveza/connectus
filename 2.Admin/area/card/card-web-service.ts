class cardWebService {
    genericWebConnectionService: genericWebConnectionService;
    globalVariableFactory: globalVariableFactory;

    constructor(genericWebConnectionService, globalVariableFactory) {
        this.genericWebConnectionService = genericWebConnectionService;
        this.globalVariableFactory = globalVariableFactory;
    }

    public structureList(sortingPagingInfo: cardSortingPagingInfo): ng.IPromise<baseResultReturnType<baseListReturnType<getCardListReturnType[]>>> {
        var url = '/api/structure-list';
        var data = sortingPagingInfo;
        return this.genericWebConnectionService.postRequest(url, data);
    }

    public getCardDetaiScreenConstant(): ng.IPromise<baseResultReturnType<cardDetailScreenConstantReturnType>> {
        var url = '/api/card-detail-screen-constant';
        var data = {};
        return this.genericWebConnectionService.postRequest(url, data);
    }

    public saveCard(saveCardDto: saveCardDto): ng.IPromise<baseResultReturnType<structureModel>> {
        var url = '/api/structure-create';
        var data = saveCardDto;
        return this.genericWebConnectionService.postRequest(url, data);
    }

    public getCard(getCardDto: getCardDto): ng.IPromise<baseResultReturnType<structureModel>> {
        var url = '/api/structure-detail';
        var data = getCardDto;
        return this.genericWebConnectionService.postRequest(url, data);
    }


    public deleteCard(getCardDto: getCardDto): ng.IPromise<baseResultReturnType<structureModel>> {
        var url = '/api/structure-delete';
        var data = getCardDto;
        return this.genericWebConnectionService.postRequest(url, data);
    }

    public getStructureViews(getCardDto: getStructureViewsDto): ng.IPromise<baseResultReturnType<getStructureViewsResponse[]>> {
        var url = '/api/structure-views';
        var data = getCardDto;
        return this.genericWebConnectionService.postRequest(url, data);
    }
    

    public structureMessageList(sortingPagingInfo: messageSortingPagingInfo): ng.IPromise<baseResultReturnType<baseListReturnType<structureMessageListReturnType[]>>> {
        var url = '/api/message-list-by-structure';
        var data = sortingPagingInfo;
        return this.genericWebConnectionService.postRequest(url, data);
    }


    public manipulateMessageReadState(sortingPagingInfo: manipulateMessageReadStateDto): ng.IPromise<baseResultReturnType<manipulateMessageReadStateReturnType>> {
        var url = '/api/manipulate-message-read-state';
        var data = sortingPagingInfo;
        return this.genericWebConnectionService.postRequest(url, data);
    }

    //public downloadFile(downloadInvoiceDto: downloadFileDto): ng.IPromise<baseResultReturnType<downloadInvoiceReturnType>> {
    //    var url = 'download-invoice';
    //    var data = downloadInvoiceDto;
    //    return this.genericWebConnectionService.postRequest(url, data);
    //}
   
}