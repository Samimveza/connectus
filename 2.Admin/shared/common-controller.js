var commonController = /** @class */ (function () {
    function commonController($scope, commonWebService) {
        this.sharedItem = {};
        $scope.headerController = this;
        this.$scope = $scope;
        this.baseController = this.$scope.baseController;
        this.commonWebService = commonWebService;
        this.initVariables();
    }
    commonController.prototype.initVariables = function () {
        var self = this;
        self.setInfo();
    };
    commonController.prototype.getUser = function () {
        var self = this;
    };
    commonController.prototype.setInfo = function () {
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
        var pathName = self.baseController.$window.location.pathname;
        pathName = pathName.replace("/", "");
        self.currentPage = Enumerable.From(pagesUrlDirectory).Where(function (page) {
            return page.pageUrl == pathName;
        }).FirstOrDefault(null);
        self.checkIfAuthRequiredForPage();
        var controllerInstance = new controllerInstanceDetail();
        controllerInstance.controllerName = "commonController";
        controllerInstance.instance = self;
        self.baseController.addLoadedControllerInstance(controllerInstance);
    };
    commonController.prototype.checkIfAuthRequiredForPage = function () {
        var self = this;
        //if (self.currentPage.isAuthRequired && (self.user == null || !self.isUserAllowedToviewPage())) {
        //    window.location.href = "login";
        //}
    };
    commonController.prototype.isUserAllowedToviewPage = function () {
        var self = this;
        var isUserAllowed = false;
        var permissionRequired = self.currentPage.permissionCodes;
        for (var i = permissionRequired.length - 1; i > -1; i--) {
            var userPermission = Enumerable.From(self.permissions).Where(function (permission) {
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
    };
    commonController.prototype.logout = function () {
        var self = this;
        self.baseController.getStorageForSessionData().removeItem(CUSTOM_VARIABLES.AUTHKEY);
        self.baseController.getStorageForSessionData().removeItem(CUSTOM_VARIABLES.CURRENT_USER);
        self.baseController.getStorageForSessionData().removeItem(CUSTOM_VARIABLES.ROLE);
        self.baseController.getStorageForSessionData().removeItem(CUSTOM_VARIABLES.PERMISSIONKEY);
        self.baseController.getStorageForSessionData().removeItem(CUSTOM_VARIABLES.TENANT);
        window.location.href = "/login";
    };
    commonController.prototype.hasPermission = function (permissionKey) {
        var self = this;
        var _hasPermission = Enumerable.From(self.permissions).Where(function (_permission) {
            return _permission.permissionCode == permissionKey;
        }).FirstOrDefault(null) != null;
        return _hasPermission;
    };
    commonController.prototype.hasEditPermission = function () {
        var self = this;
        var roles = self.baseController.globalVariableFactory.userRoles.filter(function (e) { return e !== 'ROLE_USER'; });
        if (roles.indexOf('ROLE_READER') > -1 && roles.length == 1) {
            return false;
        }
        return true;
    };
    commonController.prototype.isUser = function () {
        var self = this;
        if (self.baseController.globalVariableFactory.userRoles.indexOf("ROLE_USER") > -1 && self.baseController.globalVariableFactory.userRoles.length == 1) {
            return true;
        }
        return false;
    };
    commonController.prototype.isAdmin = function () {
        var self = this;
        if (self.baseController.globalVariableFactory.userRoles.indexOf("ROLE_ADMIN") > -1) {
            return true;
        }
        return false;
    };
    return commonController;
}());
commonModule.controller("commonController", ["$scope",
    "commonWebService",
    commonController
]);
