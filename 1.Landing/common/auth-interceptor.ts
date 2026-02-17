class authInterceptorFactory {
    public rootScope;
    public q;
    public window;
    constructor($rootScope, $q, $window) {
       
        this.rootScope = $rootScope
        this.q = $q;
        this.window = $window;
        
    }

    request(config) {
        var self = this;
        config.headers = config.headers || {};
        if (self.window.sessionStorage.getItem(CUSTOM_VARIABLES.AUTHKEY)) {
            config.headers.Authorization = "Bearer "+self.window.sessionStorage.getItem(CUSTOM_VARIABLES.AUTHKEY);
        }

        if (self.window.localStorage.getItem(CUSTOM_VARIABLES.AUTHKEY)) {
            config.headers.Authorization = "Bearer " +self.window.localStorage.getItem(CUSTOM_VARIABLES.AUTHKEY);
        }

        if (self.window.localStorage.getItem(CUSTOM_VARIABLES.DOMAINKEY)) {
            config.headers.Domain = self.window.localStorage.getItem(CUSTOM_VARIABLES.DOMAINKEY);
        }
        return config;
    }

    response(response) {
        return response || this.q.when(response);
    }
}
