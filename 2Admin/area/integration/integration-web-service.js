var integrationWebService = /** @class */ (function () {
    function integrationWebService(genericWebConnectionService, globalVariableFactory) {
        this.genericWebConnectionService = genericWebConnectionService;
        this.globalVariableFactory = globalVariableFactory;
    }
    integrationWebService.prototype.getIntegrationList = function (sortingPagingInfo) {
        var url = '/api/integration-type-list';
        var data = sortingPagingInfo;
        return this.genericWebConnectionService.postRequest(url, data);
    };
    integrationWebService.prototype.getIntegrationDetailList = function (sortingPagingInfo) {
        var url = '/api/integration-detail-list';
        var data = sortingPagingInfo;
        return this.genericWebConnectionService.postRequest(url, data);
    };
    integrationWebService.prototype.getIntegration = function (getIntegrationDto) {
        var url = 'integrationDetailJson';
        var data = getIntegrationDto;
        return this.genericWebConnectionService.postRequest(url, data);
    };
    integrationWebService.prototype.saveIntegration = function (saveIntegrationDto) {
        var url = 'saveIntegrationDetailJson';
        var data = saveIntegrationDto;
        return this.genericWebConnectionService.postRequest(url, data);
    };
    integrationWebService.prototype.downloadFile = function (downloadInvoiceDto) {
        var url = 'download-invoice';
        var data = downloadInvoiceDto;
        return this.genericWebConnectionService.postRequest(url, data);
    };
    return integrationWebService;
}());
