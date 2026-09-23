var shopWebService = /** @class */ (function () {
    function shopWebService(genericWebConnectionService, globalVariableFactory) {
        this.genericWebConnectionService = genericWebConnectionService;
        this.globalVariableFactory = globalVariableFactory;
    }
    shopWebService.prototype.getIntegrationList = function (sortingPagingInfo) {
        var url = '/api/integration-type-list';
        var data = sortingPagingInfo;
        return this.genericWebConnectionService.postRequest(url, data);
    };
    shopWebService.prototype.getIntegrationDetailList = function (sortingPagingInfo) {
        var url = '/api/integration-detail-list';
        var data = sortingPagingInfo;
        return this.genericWebConnectionService.postRequest(url, data);
    };
    shopWebService.prototype.getIntegration = function (getIntegrationDto) {
        var url = 'integrationDetailJson';
        var data = getIntegrationDto;
        return this.genericWebConnectionService.postRequest(url, data);
    };
    shopWebService.prototype.saveIntegration = function (saveIntegrationDto) {
        var url = 'saveIntegrationDetailJson';
        var data = saveIntegrationDto;
        return this.genericWebConnectionService.postRequest(url, data);
    };
    shopWebService.prototype.downloadFile = function (downloadInvoiceDto) {
        var url = 'download-invoice';
        var data = downloadInvoiceDto;
        return this.genericWebConnectionService.postRequest(url, data);
    };
    return shopWebService;
}());
