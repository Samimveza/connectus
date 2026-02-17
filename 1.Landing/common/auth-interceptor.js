var authInterceptorFactory = /** @class */ (function () {
    function authInterceptorFactory($rootScope, $q, $window) {
        this.rootScope = $rootScope;
        this.q = $q;
        this.window = $window;
    }
    authInterceptorFactory.prototype.request = function (config) {
        var self = this;
        config.headers = config.headers || {};
        if (self.window.sessionStorage.getItem(CUSTOM_VARIABLES.AUTHKEY)) {
            config.headers.Authorization = "Bearer " + self.window.sessionStorage.getItem(CUSTOM_VARIABLES.AUTHKEY);
        }
        if (self.window.localStorage.getItem(CUSTOM_VARIABLES.AUTHKEY)) {
            config.headers.Authorization = "Bearer " + self.window.localStorage.getItem(CUSTOM_VARIABLES.AUTHKEY);
        }
        if (self.window.localStorage.getItem(CUSTOM_VARIABLES.DOMAINKEY)) {
            config.headers.Domain = self.window.localStorage.getItem(CUSTOM_VARIABLES.DOMAINKEY);
        }
        return config;
    };
    authInterceptorFactory.prototype.response = function (response) {
        return response || this.q.when(response);
    };
    return authInterceptorFactory;
}());
