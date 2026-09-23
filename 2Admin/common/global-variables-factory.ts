class globalVariableFactory {
    public url = window.location.protocol + "//" + window.location.host;
    public baseServerUrl = eval('hostname');
    public apiEndpoint = eval('apiEndpoint');
    public domain = eval('domain');

    public maxFileSize = 5; //megabytes

    public userRoles: string[] = eval('userRoles');
    public baseServerUrlAndUpload = this.apiEndpoint +"/api/upload-file-direct";

    public cdnUrl = this.url + "/";
    public siteUrl = this.url+"/";

    public serverUrl: string = this.apiEndpoint;

    public sessionVariables: sessionVariables;

    public $window;

    public static instance: globalVariableFactory;

    constructor($rootScope, $window) {
        this.sessionVariables = new sessionVariables();
        this.$window = $window;
        $rootScope.globalVariableFactory = this;
        globalVariableFactory.instance = this;
        this.addToLocalStorage();
    }

    public addToLocalStorage() {
        var self = this;

        self.$window.localStorage.setItem(CUSTOM_VARIABLES.DOMAINKEY, self.domain);
    }

    public clearSession() {

    }
}
