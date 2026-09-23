class integrationWebService {
    genericWebConnectionService: genericWebConnectionService;
    globalVariableFactory: globalVariableFactory;

    constructor(genericWebConnectionService, globalVariableFactory) {
        this.genericWebConnectionService = genericWebConnectionService;
        this.globalVariableFactory = globalVariableFactory;
    }

    public getIntegrationList(sortingPagingInfo: integrationSortingPagingInfo): ng.IPromise<baseResultReturnType<baseListReturnType<getIntegrationListReturnType[]>>> {
        var url = '/api/integration-type-list';
        var data = sortingPagingInfo;
        return this.genericWebConnectionService.postRequest(url, data);
    }

    public getIntegrationDetailList(sortingPagingInfo: integrationDetailSortingPagingInfo): ng.IPromise<baseResultReturnType<baseListReturnType<getIntegrationListReturnType[]>>> {
        var url = '/api/integration-detail-list';
        var data = sortingPagingInfo;
        return this.genericWebConnectionService.postRequest(url, data);
    }

    public getIntegration(getIntegrationDto: getIntegrationDto): ng.IPromise<baseResultReturnType<integrationModel>> {
        var url = 'integrationDetailJson';
        var data = getIntegrationDto;
        return this.genericWebConnectionService.postRequest(url, data);
    }
   

    public saveIntegration(saveIntegrationDto: saveIntegrationDto): ng.IPromise<baseResultReturnType<integrationModel>> {
        var url = 'saveIntegrationDetailJson';
        var data = saveIntegrationDto;
        return this.genericWebConnectionService.postRequest(url, data);
    }



    public downloadFile(downloadInvoiceDto: downloadFileDto): ng.IPromise<baseResultReturnType<downloadInvoiceReturnType>> {
        var url = 'download-invoice';
        var data = downloadInvoiceDto;
        return this.genericWebConnectionService.postRequest(url, data);
    }
   
}