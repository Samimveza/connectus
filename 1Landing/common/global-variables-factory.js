var globalVariableFactory = /** @class */ (function () {
    function globalVariableFactory($rootScope, $window) {
        this.url = window.location.protocol + "//" + window.location.host;
        this.baseServerUrl = eval('hostname');
        this.apiEndpoint = eval('apiEndpoint');
        this.domain = eval('domain');
        this.maxFileSize = 5; //megabytes
        this.userRoles = eval('userRoles');
        this.baseServerUrlAndUpload = this.apiEndpoint + "/api/upload-file-direct";
        this.cdnUrl = this.url + "/";
        this.siteUrl = this.url + "/";
        this.serverUrl = this.apiEndpoint;
        this.sessionVariables = new sessionVariables();
        this.$window = $window;
        $rootScope.globalVariableFactory = this;
        globalVariableFactory.instance = this;
        this.addToLocalStorage();
    }
    globalVariableFactory.prototype.addToLocalStorage = function () {
        var self = this;
        self.$window.localStorage.setItem(CUSTOM_VARIABLES.DOMAINKEY, self.domain);
    };
    globalVariableFactory.prototype.clearSession = function () {
    };
    return globalVariableFactory;
}());
//# sourceMappingURL=global-variables-factory.js.map