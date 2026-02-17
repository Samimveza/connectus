class commonController {
    $scope;
    baseController: baseController;
    commonWebService: commonWebService;

    user: userLoginModel;
    permissions: permission[];

    currentPage: browsingPageModel;

    sharedItem:any = {};

    constructor($scope, commonWebService: commonWebService) {
        $scope.headerController = this;
        this.$scope = $scope;
        this.baseController = this.$scope.baseController;
        this.commonWebService = commonWebService;
        this.initVariables();
    }

    public initVariables() {
        var self = this;
        self.setInfo();
    }

    public getUser() {
        var self = this;
    }

    public setInfo() {
        var self = this;

        var userString = self.baseController.getStorageForSessionData().getItem(CUSTOM_VARIABLES.CURRENT_USER);
        var permissionString = self.baseController.getStorageForSessionData().getItem(CUSTOM_VARIABLES.PERMISSIONKEY);


        if (!self.baseController.isNullOrUndefined(userString)) {
            self.user = JSON.parse(userString);
        }
        console.log(userString);


        if (!self.baseController.isNullOrUndefined(permissionString)) {
            self.permissions = JSON.parse(permissionString);
        }

        var pathName: string = self.baseController.$window.location.pathname;
        pathName = pathName.replace("/", "");
        self.currentPage = Enumerable.From(pagesUrlDirectory).Where(function (page: browsingPageModel) {
            return page.pageUrl == pathName;
        }).FirstOrDefault(null);

        self.checkIfAuthRequiredForPage();
        var controllerInstance: controllerInstanceDetail = new controllerInstanceDetail();
        controllerInstance.controllerName = "commonController";
        controllerInstance.instance = self;
        self.baseController.addLoadedControllerInstance(controllerInstance);
    }

    public checkIfAuthRequiredForPage() {
        var self = this;
        //if (self.currentPage.isAuthRequired && (self.user == null || !self.isUserAllowedToviewPage())) {
        //    window.location.href = "login";
        //}
    }

    public isUserAllowedToviewPage(): boolean {
        var self = this;
        var isUserAllowed: boolean = false;

        var permissionRequired: string[] = self.currentPage.permissionCodes;


        for (var i = permissionRequired.length - 1; i > -1; i--) {
            var userPermission = Enumerable.From(self.permissions).Where(function (permission: permission) {
                return permission.permissionCode == permissionRequired[i];
            }).FirstOrDefault(null);
            if (userPermission != null) {
                permissionRequired.splice(i, 1);
            }
        }

        if (permissionRequired.length == 0) {
            isUserAllowed = true;
        }

        return isUserAllowed;
    }

    public logout() {
        var self = this;
        self.baseController.getStorageForSessionData().removeItem(CUSTOM_VARIABLES.AUTHKEY);
        self.baseController.getStorageForSessionData().removeItem(CUSTOM_VARIABLES.CURRENT_USER);
        self.baseController.getStorageForSessionData().removeItem(CUSTOM_VARIABLES.ROLE);
        self.baseController.getStorageForSessionData().removeItem(CUSTOM_VARIABLES.PERMISSIONKEY);
        self.baseController.getStorageForSessionData().removeItem(CUSTOM_VARIABLES.TENANT);
        window.location.href = "/login";
    }

    public hasPermission(permissionKey: string): boolean {
        var self = this;
        var _hasPermission: boolean = Enumerable.From(self.permissions).Where(function (_permission: permission) {
            return _permission.permissionCode == permissionKey
        }).FirstOrDefault(null) != null;

        return _hasPermission;
    }

    public hasEditPermission() {
        var self = this;
        var roles:string[] =  self.baseController.globalVariableFactory.userRoles.filter(e => e !== 'ROLE_USER');
        if (roles.indexOf('ROLE_READER') > -1 && roles.length ==1) {
            return false;
        }
        return true;
    }

    public isUser() {
        var self = this;
        if (self.baseController.globalVariableFactory.userRoles.indexOf("ROLE_USER") > -1 && self.baseController.globalVariableFactory.userRoles.length == 1) {
            return true;
        }
        return false;
    }

    public isAdmin() {
        var self = this;
        if (self.baseController.globalVariableFactory.userRoles.indexOf("ROLE_ADMIN") > -1) {
            return true;
        }
        return false;
    }

}

commonModule.controller("commonController"
    , ["$scope"
        , "commonWebService"
        , commonController
    ]);