var ValidationResult = /** @class */ (function () {
    function ValidationResult() {
    }
    return ValidationResult;
}());
var sortingPagingInfoModel = /** @class */ (function () {
    function sortingPagingInfoModel(sortField, pageSize, pageCount, currentPageIndex, search, sortByDesc) {
        if (sortField === void 0) { sortField = null; }
        if (pageSize === void 0) { pageSize = 0; }
        if (pageCount === void 0) { pageCount = 0; }
        if (currentPageIndex === void 0) { currentPageIndex = 0; }
        if (search === void 0) { search = ""; }
        if (sortByDesc === void 0) { sortByDesc = false; }
        this.sortByDesc = sortByDesc;
        this.sortField = sortField;
        this.pageSize = pageSize;
        this.pageCount = pageCount;
        this.currentPageIndex = currentPageIndex;
        this.search = search;
    }
    return sortingPagingInfoModel;
}());
var ROLE;
(function (ROLE) {
    ROLE[ROLE["Site_Admin"] = 1] = "Site_Admin";
    ROLE[ROLE["Meridian_User"] = 2] = "Meridian_User";
    ROLE[ROLE["System"] = 3] = "System";
})(ROLE || (ROLE = {}));
var fileUploadStateModel = /** @class */ (function () {
    function fileUploadStateModel() {
    }
    return fileUploadStateModel;
}());
var browsingPageModel = /** @class */ (function () {
    function browsingPageModel() {
    }
    return browsingPageModel;
}());
var controllerInstanceDetail = /** @class */ (function () {
    function controllerInstanceDetail() {
    }
    return controllerInstanceDetail;
}());
var controllerInstanceListenerDetail = /** @class */ (function () {
    function controllerInstanceListenerDetail() {
    }
    return controllerInstanceListenerDetail;
}());
var controllerInstanceListenerFunctionDetail = /** @class */ (function () {
    function controllerInstanceListenerFunctionDetail() {
    }
    return controllerInstanceListenerFunctionDetail;
}());
var dropZoneInstanceModel = /** @class */ (function () {
    function dropZoneInstanceModel() {
    }
    return dropZoneInstanceModel;
}());
var dropZoneInstanceCallbackModel = /** @class */ (function () {
    function dropZoneInstanceCallbackModel() {
    }
    return dropZoneInstanceCallbackModel;
}());
var fileUploadReturnType = /** @class */ (function () {
    function fileUploadReturnType() {
    }
    return fileUploadReturnType;
}());


var geoLocation = /** @class */ (function () {
    function geoLocation() {
    }
    return geoLocation;
}());
var sessionVariable = /** @class */ (function () {
    function sessionVariable() {
    }
    return sessionVariable;
}());
var loginDto = /** @class */ (function () {
    function loginDto() {
    }
    return loginDto;
}());
var loginReturnType = /** @class */ (function () {
    function loginReturnType() {
    }
    return loginReturnType;
}());
var userLoginModel = /** @class */ (function () {
    function userLoginModel() {
    }
    return userLoginModel;
}());
var pictureDataModel = /** @class */ (function () {
    function pictureDataModel() {
    }
    return pictureDataModel;
}());
var deleteItemDto = /** @class */ (function () {
    function deleteItemDto() {
    }
    return deleteItemDto;
}());
var deleteItemReturnType = /** @class */ (function () {
    function deleteItemReturnType() {
    }
    return deleteItemReturnType;
}());

var pagesUrlDirectory = [
    { pageUrl: "", isAuthRequired: false, permissionCodes: [] },
];
var permissions = [];
var sessionVariableSpaceEnum;
(function (sessionVariableSpaceEnum) {
    sessionVariableSpaceEnum[sessionVariableSpaceEnum["SERVICE_PROVIDER_CONTROLLER"] = 1] = "SERVICE_PROVIDER_CONTROLLER";
    sessionVariableSpaceEnum[sessionVariableSpaceEnum["CLIENT_DETAIL_CONTROLLER"] = 2] = "CLIENT_DETAIL_CONTROLLER";
    sessionVariableSpaceEnum[sessionVariableSpaceEnum["BASE_CONTROLLER"] = 2] = "BASE_CONTROLLER";
    sessionVariableSpaceEnum[sessionVariableSpaceEnum["TRANSFER"] = 3] = "TRANSFER";
    sessionVariableSpaceEnum[sessionVariableSpaceEnum["SEARCH_CONTROLLER"] = 4] = "SEARCH_CONTROLLER";
    sessionVariableSpaceEnum[sessionVariableSpaceEnum["PAGE_DETAIL_BASIC_INFO_CONTROLLER"] = 5] = "PAGE_DETAIL_BASIC_INFO_CONTROLLER";
})(sessionVariableSpaceEnum || (sessionVariableSpaceEnum = {}));
var dayListGenerator = /** @class */ (function () {
    function dayListGenerator() {
    }
    dayListGenerator.dayList = [{ day: 1, name: "Monday" }, { day: 2, name: "Tuesday" }, { day: 3, name: "Wednesday" }, { day: 4, name: "Thursday" }, { day: 5, name: "Friday" }, { day: 6, name: "Saturday" }, { day: 7, name: "Sunday" }];
    return dayListGenerator;
}());

var genericWebConnectionService = /** @class */ (function () {
    function genericWebConnectionService($http, $window, $q, globalVariableFactory) {
        this.$q = $q;
        this.globalVariableFactory = globalVariableFactory;
        this.http = $http;
        this.q = $q;
    }
    genericWebConnectionService.prototype.postRequest = function (url, data, isExternal) {
        if (isExternal === void 0) { isExternal = false; }
        return this.loadRequest('POST', url, data, isExternal);
    };
    genericWebConnectionService.prototype.getRequest = function (url, data, isExternal) {
        if (isExternal === void 0) { isExternal = false; }
        return this.loadRequest('GET', url, data, isExternal);
    };
    genericWebConnectionService.prototype.downloadGetRequest = function (url, data) {
        return this.loadDownloadRequest('GET', url, data);
    };
    genericWebConnectionService.prototype.downloadPostRequest = function (url, data) {
        return this.loadDownloadRequest('POST', url, data);
    };
    genericWebConnectionService.prototype.loadRequest = function (method, url, data, isExternal) {
        if (isExternal === void 0) { isExternal = false; }
        var deferred = this.q.defer();
        this.http({
            method: method,
            url: isExternal ? url : this.globalVariableFactory.serverUrl + url,
            dataType: 'json',
            contentType: 'application/json',
            timeout: 600000,
            data: data
        })
            .then(function (response) {
            deferred.resolve(response.data);
        })
            .catch(function (err) {
            deferred.reject(err);
        })
            .finally(function () {
            if (deferred.finally)
                deferred.finally();
        });
        return deferred.promise;
    };
    genericWebConnectionService.prototype.loadDownloadRequest = function (method, url, data) {
        var deferred = this.q.defer();
        this.http({
            method: method,
            url: this.globalVariableFactory.serverUrl + url,
            dataType: 'json',
            contentType: 'application/json',
            timeout: 600000,
            cache: false,
            data: data,
            responseType: 'arraybuffer'
        })
            .then(function (response) {
            deferred.resolve(response);
        })
            .catch(function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    return genericWebConnectionService;
}());

var globalVariableFactory = /** @class */ (function () {
    function globalVariableFactory($rootScope, $window) {
        this.url = window.location.protocol + "//" + window.location.host;
        this.baseServerUrl = eval('hostname');
        this.maxFileSize = 5; //megabytes
        //public baseServerUrlAndUpload = "http://admin.lucien-compagnie.fr:8000/uploadFile";
        this.userRoles = eval('userRoles');
        this.baseServerUrlAndUpload = this.baseServerUrl + "uploadFile";
        //public locatorUrl: string = eval('locatorUrl');
        this.cdnUrl = this.url + "/";
        this.siteUrl = this.url + "/";
        this.serverUrl = this.baseServerUrl;
        this.sessionVariables = new sessionVariables();
        this.$window = $window;
        $rootScope.globalVariableFactory = this;
        globalVariableFactory.instance = this;
    }
    globalVariableFactory.prototype.clearSession = function () {
    };
    return globalVariableFactory;
}());

var sessionSpace = /** @class */ (function () {
    function sessionSpace() {
        this.list = {};
    }
    return sessionSpace;
}());
var sessionVariables = /** @class */ (function () {
    function sessionVariables() {
        this.list = {};
    }
    sessionVariables.prototype.createSessionSpace = function () {
        sessionVariables.sessionIdMax += 1;
        return sessionVariables.sessionIdMax;
    };
    sessionVariables.prototype.putVariableInSessionSpace = function (sessionSpaceId, sessionKey, sessionValue) {
        if (this.list[sessionSpaceId] == null) {
            this.list[sessionSpaceId] = new sessionSpace();
        }
        var _sessionSpace = this.list[sessionSpaceId];
        _sessionSpace[sessionKey] = sessionValue;
    };
    sessionVariables.prototype.getVariableFromSessionSpace = function (sessionSpaceId, sessionKey) {
        if (this.list == undefined || this.list == null || this.list[sessionSpaceId.toString()] == null || this.list[sessionSpaceId.toString()] == undefined) {
            return null;
        }
        return this.list[sessionSpaceId.toString()][sessionKey];
    };
    sessionVariables.prototype.clearSessionSpace = function (sessionSpaceId) {
        this.list[sessionSpaceId] = null;
    };
    sessionVariables.sessionIdMax = 1;
    return sessionVariables;
}());

var TOASTER_TYPE = /** @class */ (function () {
    function TOASTER_TYPE() {
    }
    TOASTER_TYPE.SUCCESS = "success";
    TOASTER_TYPE.INFO = "info";
    TOASTER_TYPE.WAIT = "wait";
    TOASTER_TYPE.WARNING = "warning";
    TOASTER_TYPE.ERROR = "error";
    return TOASTER_TYPE;
}());
var ALERT_MESSAGE_TYPE = /** @class */ (function () {
    function ALERT_MESSAGE_TYPE() {
    }
    ALERT_MESSAGE_TYPE.WARNING = "warning";
    ALERT_MESSAGE_TYPE.SUCCESS = "success";
    ALERT_MESSAGE_TYPE.ERROR = "error";
    return ALERT_MESSAGE_TYPE;
}());
var STATUS_MESSAGE = /** @class */ (function () {
    function STATUS_MESSAGE() {
    }
    STATUS_MESSAGE.SUCCESS = 10;
    STATUS_MESSAGE.FAILURE = 11;
    STATUS_MESSAGE.SERVERERROR = 12;
    STATUS_MESSAGE.AUTHERROR = 13;
    STATUS_MESSAGE.TOKENEXPIRED = 15;
    STATUS_MESSAGE.TOKENINVALID = 16;
    STATUS_MESSAGE.VALIDATION_ERROR = 17;
    return STATUS_MESSAGE;
}());
var SCREEN_MODE;
(function (SCREEN_MODE) {
    SCREEN_MODE[SCREEN_MODE["VIEW"] = 0] = "VIEW";
    SCREEN_MODE[SCREEN_MODE["ADD"] = 1] = "ADD";
    SCREEN_MODE[SCREEN_MODE["EDIT"] = 2] = "EDIT";
})(SCREEN_MODE || (SCREEN_MODE = {}));
var layoutCustomisation = /** @class */ (function () {
    function layoutCustomisation() {
    }
    return layoutCustomisation;
}());
var STATE_MAPPER = /** @class */ (function () {
    function STATE_MAPPER() {
    }
    return STATE_MAPPER;
}());
var CUSTOM_VARIABLES = /** @class */ (function () {
    function CUSTOM_VARIABLES() {
    }
    CUSTOM_VARIABLES.AUTHKEY = "authKey";
    CUSTOM_VARIABLES.PERMISSIONKEY = "permissionKey";
    CUSTOM_VARIABLES.CURRENT_USER = "currentUser";
    CUSTOM_VARIABLES.ROLE = "role";
    CUSTOM_VARIABLES.TENANT = "tenant";
    CUSTOM_VARIABLES.LAYOUT = "layout";
    CUSTOM_VARIABLES.ON_INITIALIZED = "ON_INITIALIZED";
    CUSTOM_VARIABLES.IMAGES_EXTENSION = ['.tif', '.jpg', '.jpeg', '.gif', '.png'];
    return CUSTOM_VARIABLES;
}());
var PERMISSION = /** @class */ (function () {
    function PERMISSION() {
    }
    return PERMISSION;
}());
var SignInStatus;
(function (SignInStatus) {
    SignInStatus[SignInStatus["Success"] = 0] = "Success";
    SignInStatus[SignInStatus["LockedOut"] = 1] = "LockedOut";
    SignInStatus[SignInStatus["RequiresVerification"] = 2] = "RequiresVerification";
    SignInStatus[SignInStatus["Failure"] = 3] = "Failure";
})(SignInStatus || (SignInStatus = {}));
var URL_LIST = /** @class */ (function () {
    function URL_LIST() {
    }
    URL_LIST.HOME = "home";
    URL_LIST.HOME1 = "";
    URL_LIST.AUTH = "login";
    URL_LIST.PROFILE = "profile";
    URL_LIST.WORKOUT = "workout";
    return URL_LIST;
}());
var MAP_DATA = /** @class */ (function () {
    function MAP_DATA() {
    }
    MAP_DATA.getSvgMarker = function (color) {
        var self = this;
        var svgMarkerIcon = MAP_DATA.markerSvg.replace(new RegExp('{{color}}', 'g'), color);
        var icon = {
            iconSize: [38, 38],
            iconUrl: svgMarkerIcon
        };
        //if (navigator.appCodeName == "Mozilla") {
        //    svgMarkerIcon = svgMarkerIcon.replace(new RegExp('#', 'g'), "%23");
        //}
        return icon;
    };
    MAP_DATA.openStreetMapLayer = {
        name: "OpenStreetMap",
        url: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        type: "xyz",
        layerOptions: {
            attribution: "",
            maxNativeZoom: 18,
            maxZoom: 25
        }
    };
    MAP_DATA.googleRoadmap = {
        name: "Google Streets",
        layerType: "ROADMAP",
        type: "google"
    };
    MAP_DATA.centerLocation = {
        lat: -20.276326,
        lng: 57.557105,
        zoom: 10
    };
    MAP_DATA.markerUrl = "Images/picto-pointer.png";
    MAP_DATA.markerSvg = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 60'><path data-name='layer1' d='M32 2a18 18 0 0 0-18 18 18.1 18.1 0 0 0 .2 2.2C15.7 36.8 32 44.9 32 62c0-17.1 16.3-25.2 17.8-39.7A17.9 17.9 0 0 0 32 2zm0 24a6 6 0 1 1 6-6 6 6 0 0 1-6 6z'></path></svg>";
    return MAP_DATA;
}());

var screenModeManager = /** @class */ (function () {
    function screenModeManager(container, saveCallback, areCallsAsync) {
        if (saveCallback === void 0) { saveCallback = null; }
        if (areCallsAsync === void 0) { areCallsAsync = false; }
        this.container = container;
        this.saveCallback = saveCallback;
        this.areCallsAsync = areCallsAsync;
    }
    screenModeManager.prototype.setSaveCallback = function (saveCallback) {
        this.saveCallback = saveCallback;
    };
    screenModeManager.prototype.setEntity = function (entity) {
        this.entityBeforeEdit = this.cloneObject(entity);
        this.entity = this.cloneObject(entity);
    };
    screenModeManager.prototype.save = function () {
        if (this.onSaving != null)
            this.onSaving();
        var oldEntity = this.cloneObject(this.entityBeforeEdit);
        this.entityBeforeEdit = this.cloneObject(this.entity);
        this.setMode(SCREEN_MODE.VIEW);
        if (this.saveCallback) {
            this.saveCallback(this.entity, this.container, oldEntity);
        }
        if (this.onSaveCompleted != null) {
            this.onSaveCompleted(this.container);
        }
    };
    screenModeManager.prototype.edit = function () {
        if (this.onEditing != null)
            this.onEditing();
        var self = this;
        function editBody(onSuccess) {
            self.entity = self.cloneObject(self.entityBeforeEdit);
            self.setMode(SCREEN_MODE.EDIT);
            onSuccess();
        }
        function editBodyOnSuccess() {
            if (self.onEditCompleted != null)
                self.onEditCompleted(self.container);
        }
        if (this.areCallsAsync) {
            setTimeout(function () {
                editBody(editBodyOnSuccess);
            }, 0);
        }
        else {
            editBody(editBodyOnSuccess);
        }
    };
    screenModeManager.prototype.cancel = function () {
        if (this.onCancelling != null)
            this.onCancelling();
        var self = this;
        function cancelBody(onSuccess) {
            self.entity = self.cloneObject(self.entityBeforeEdit);
            self.setMode(SCREEN_MODE.VIEW);
            onSuccess();
        }
        function cancelBodyOnSuccess() {
            if (self.onCancelCompleted != null)
                self.onCancelCompleted(self.container);
        }
        if (this.areCallsAsync) {
            setTimeout(function () {
                cancelBody(cancelBodyOnSuccess);
            }, 0);
        }
        else {
            cancelBody(cancelBodyOnSuccess);
        }
    };
    screenModeManager.prototype.setMode = function (mode) {
        this.currentMode = mode;
    };
    screenModeManager.prototype.cloneObject = function (obj) {
        return JSON.parse(JSON.stringify(obj), dateParser.dateParserScreenMode);
    };
    return screenModeManager;
}()); //END class

var dateParser = {
    dateParserScreenMode: function (key, value) {
        var reISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;
        var reZ = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:Z|(\+|-))?$/;
        var reA = /(\d{4})-(\d{2})-(\d{2})T(\d{2})\:(\d{2})\:(\d{2})[+-](\d{2})\:(\d{2})/; //2019-07-30T00:00:00+04:00
        var rePHP = /(\d{4})-(\d{2})-(\d{2}) (\d{2})\:(\d{2})\:(\d{2})/; //2019-07-30T00:00:00+04:00
        var rePHPV2 = /(\d{4})-(\d{2})-(\d{2})/; //2019-07-30T00:00:00+04:00
        var dateToReturn;
        if (typeof value === 'string') {
            var a = reISO.exec(value);
            var b = reZ.exec(value);
            var c = reA.exec(value);
            var d = rePHP.exec(value);
            var e = rePHPV2.exec(value);
            if (a || b) {
                return new Date(value);
            }
            if (c || d || e) {
                return new Date(Date.parse(value));
            }
            //var dateConversion: any = new Date(Date.parse(value));
            //if (!isNaN(dateConversion) && dateConversion instanceof Date) {
            //    return dateConversion;
            //}
        }
        return value;
    },
    dateParserRequest: function (key, value) {
        var reISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;
        var reMsAjax = /^\/Date\((d|-|.*)\)[\/|\\]$/;
        var reZ = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:Z|(\+|-))?$/;
        if (typeof value === 'string') {
            var a = reISO.exec(value);
            var b = reZ.exec(value);
            if (a || b) {
                var initialDate = new Date(value);
                initialDate = initialDate.format("yyyy-m-dd");
                return initialDate;
            }
        }
        return value;
    },
    parseDateWithoutTime: function (value) {
        return value.format('yyyy-m-dd');
    },
    parseDateWithTime: function (value) {
        return value.format('yyyy-m-dd hh:mm:ss');
    }
};
function getMonthText(monthNumber) {
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[monthNumber];
}

var ScreenMode;
(function (ScreenMode) {
    ScreenMode[ScreenMode["VIEW"] = 0] = "VIEW";
    ScreenMode[ScreenMode["ADD"] = 1] = "ADD";
    ScreenMode[ScreenMode["EDIT"] = 2] = "EDIT";
})(ScreenMode || (ScreenMode = {}));

var formValidator = /** @class */ (function () {
    function formValidator($parse, toastr, scope, formName) {
        if (formName === void 0) { formName = null; }
        this.$parse = $parse;
        this.toastr = toastr;
        this.scope = scope;
        this.formName = formName;
        this._watchers = [];
        this.validationResults = null;
        this.validationGroupItems = {};
    }
    Object.defineProperty(formValidator.prototype, "validationResults", {
        get: function () {
            if (this._validationResults == null)
                this._validationResults = {};
            return this._validationResults;
        },
        set: function (newValidationResults) {
            this._validationResults = newValidationResults;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(formValidator.prototype, "validationField", {
        get: function () {
            if (this._validationField == null)
                this._validationField = {};
            return this._validationField;
        },
        set: function (newValidationField) {
            this._validationField = newValidationField;
        },
        enumerable: true,
        configurable: true
    });
    formValidator.prototype.isGroupValid = function (groupName) {
        var self = this;
        var isAllFieldsValid = true;
        if (self.validationGroupItems[groupName] == null)
            return true;
        self.validationGroupItems[groupName].forEach(function (fieldName) {
            isAllFieldsValid = (isAllFieldsValid && self.isFieldValid(fieldName));
        });
        return isAllFieldsValid;
    };
    formValidator.prototype.isFormValid = function () {
        var self = this;
        if (this.validationResults == null)
            return true;
        for (var currentFieldName in this.validationResults) {
            if (!self.isFieldValid(currentFieldName)) {
                return false;
            }
        }
        return true;
    };
    formValidator.prototype.isFieldValid = function (fieldName) {
        return (this.validationResults == null
            || this.validationResults[fieldName] == null
            || this.validationResults[fieldName].errorMessages == null
            || this.validationResults[fieldName].errorMessages.length == 0);
    };
    formValidator.prototype.getAllValidationMessages = function () {
        var self = this;
        var errorMessages = new Array();
        if (self.validationResults == null)
            return errorMessages;
        for (var currentFieldName in this.validationResults) {
            for (var d = 0; (self.validationResults[currentFieldName] != null && d < self.validationResults[currentFieldName].errorMessages.length); d++) {
                errorMessages.push(self.validationResults[currentFieldName].errorMessages[d]);
            }
        }
        return errorMessages;
    };
    formValidator.prototype.getAllValidationMessagesAsList = function (joinString) {
        var self = this;
        var errorMessages = self.getAllValidationMessages();
        return errorMessages.join(joinString);
    };
    formValidator.prototype.getAllValidationMessagesForGroup = function (groupName) {
        var self = this;
        var errorMessages = new Array();
        if (self.validationResults == null)
            return errorMessages;
        if (self.validationGroupItems == null)
            return errorMessages;
        self.validationGroupItems[groupName].forEach(function (currentFieldName) {
            for (var d = 0; (self.validationResults[currentFieldName] != null && d < self.validationResults[currentFieldName].errorMessages.length); d++) {
                errorMessages.push(self.validationResults[currentFieldName].errorMessages[d]);
            }
        });
        return errorMessages;
    };
    formValidator.prototype.getAllValidationMessagesForGroupAsList = function (groupName, joinString) {
        var self = this;
        var errorMessages = self.getAllValidationMessagesForGroup(groupName);
        return errorMessages.join(joinString);
    };
    formValidator.prototype.getValidationMessage = function (fieldName) {
        var errorMessages = new Array();
        if (this.validationResults == null)
            return errorMessages;
        if (this.validationResults[fieldName] == null)
            return errorMessages;
        return this.validationResults[fieldName].errorMessages;
    };
    formValidator.prototype.getValidationMessageAsList = function (fieldName, joinString) {
        var self = this;
        var errorMessages = self.getValidationMessage(fieldName);
        if (joinString == null)
            joinString = '\n';
        return errorMessages.join(joinString);
    };
    formValidator.prototype.IsEmailAddressValid = function (email) {
        if (email == null)
            return false;
        if (email.length == 0)
            return false;
        return true;
    };
    formValidator.prototype.IsMandatoryFieldValid = function (value) {
        if (value == null)
            return false;
        if (value.length == 0)
            return false;
        return true;
    };
    formValidator.prototype.IsRangeOfFieldValid = function (value, min, max) {
        if (value != null && (value.length < min || value.length > max)) {
            return false;
        }
        return true;
    };
    formValidator.prototype.IsRegExFieldValid = function (value, regexPattern) {
        var regexValidator = new RegExp(regexPattern);
        if (regexValidator.test(value)) {
            return true;
        }
        return false;
    };
    formValidator.prototype.registerValidation = function (fieldName, errorMessage, validationFunction) {
        var self = this;
        if (self.validationField[fieldName] == null)
            self.validationField[fieldName] = new Array();
        var _validationItem = new validationItem(fieldName, errorMessage, validationFunction);
        self.validationField[fieldName].push(_validationItem);
        //watch
        //var elementWithRootScope = fieldName;
        //var element = angular.element('[ng-model="' + elementWithRootScope + '"]');
        //if (element.length == 0) {
        //    element = angular.element('[name="' + elementWithRootScope + '"]');
        //    elementWithRootScope = element.attr('ng-model');
        //}
        //if (element != null && element != undefined) {
        //    var watcher = self.scope.$watch(elementWithRootScope, function (v) {
        //        var isValid = self.validateFieldItem(_validationItem, false, false);
        //        element.next(".error-msg").remove();
        //        if (element.hasClass('ng-dirty')) {
        //            if (isValid) {
        //                element.removeClass('error');
        //            } else {
        //                element.addClass('error');
        //                var contentTr = angular.element('<span class="error-msg">' + errorMessage + '</span>');
        //                contentTr.insertAfter(element);
        //            }
        //        }
        //    });
        //    self._watchers.push(watcher);
        //}
    };
    formValidator.prototype.registerValidationForMandatoryForPrefix = function (prefixFieldName, fieldLabel, groupName, customErrorMessage) {
        if (customErrorMessage === void 0) { customErrorMessage = null; }
        var self = this;
        var formScope = self.scope[self.formName];
        angular.forEach(formScope, function (element, name) {
            var _fieldLabel = fieldLabel;
            var _customErrorMessage = customErrorMessage;
            if (!name.startsWith('$') && name.indexOf(prefixFieldName) > -1) {
                if (_customErrorMessage == null) {
                    if (_fieldLabel == null) {
                        _fieldLabel = element.$$attr.description;
                    }
                    _customErrorMessage = _fieldLabel + " est obligatoire";
                }
                self.registerValidation(name, _customErrorMessage, function () {
                    var value = formScope[name].$modelValue;
                    return (self.IsMandatoryFieldValid(value));
                });
                self.registerGroupValidation(groupName, [name]);
            }
        });
    };
    formValidator.prototype.registerValidationForMandatory = function (objectToValidate, fieldName, fieldLabel, customErrorMessage) {
        if (customErrorMessage === void 0) { customErrorMessage = null; }
        var self = this;
        if (customErrorMessage == null) {
            customErrorMessage = fieldLabel + " est obligatoire";
        }
        self.registerValidation(fieldName, customErrorMessage, function () {
            var formScope = self.scope[self.formName];
            var value = formScope[fieldName].$modelValue;
            //var fieldValueFn = self.$parse(fieldName);
            //var value = fieldValueFn(objectToValidate);
            return (self.IsMandatoryFieldValid(value));
        });
    };
    formValidator.prototype.registerValidationForNullOrRegEx = function (objectToValidate, fieldName, fieldLabel, regexPattern, customErrorMessage) {
        if (customErrorMessage === void 0) { customErrorMessage = null; }
        return this.registerValidationForRegEx(objectToValidate, fieldName, fieldLabel, regexPattern, true, customErrorMessage);
    };
    formValidator.prototype.registerValidationForRegEx = function (objectToValidate, fieldName, fieldLabel, regexPattern, canBeNull, customErrorMessage) {
        if (canBeNull === void 0) { canBeNull = false; }
        if (customErrorMessage === void 0) { customErrorMessage = null; }
        var self = this;
        if (customErrorMessage == null) {
            customErrorMessage = "Valeur incorrect pour le champ " + fieldLabel + "!";
        }
        self.registerValidation(fieldName, customErrorMessage, function () {
            //var fieldValueFn = self.$parse(fieldName);
            //var value = fieldValueFn(objectToValidate);
            var formScope = self.scope[self.formName];
            var value = formScope[fieldName].$modelValue;
            if (canBeNull && (value == null || value == ''))
                return true;
            else
                return (self.IsRegExFieldValid(value, regexPattern));
        });
    };
    formValidator.prototype.registerValidationRegExEmailOnly = function (fieldValue, fieldName, fieldLabel, regexPattern) {
        return this.registerValidationForRegExEmailFieldOnly(fieldValue, fieldName, fieldLabel, regexPattern, true);
    };
    formValidator.prototype.registerValidationForRegExEmailFieldOnly = function (fieldValue, fieldName, fieldLabel, regexPattern, canBeNull) {
        if (canBeNull === void 0) {
            canBeNull = false;
        }
        var self = this;
        return (self.IsRegExFieldValid(fieldValue, regexPattern));
    };
    formValidator.prototype.registerValidationForCharacterLengthRange = function (objectToValidate, fieldName, fieldLabel, minLength, maxLength, customErrorMessage) {
        if (customErrorMessage === void 0) {
            customErrorMessage = null;
        }
        var self = this;
        if (customErrorMessage == null) {
            customErrorMessage = fieldLabel + ' doit contenir ' + minLength + ' a ' + maxLength + ' characteurs.';
        }
        self.registerValidation(fieldName, customErrorMessage, function () {
            var fieldValueFn = self.$parse(fieldName);
            var value = fieldValueFn(objectToValidate);
            if (value == null) {
                return true;
            }
            else {
                return (value.toString().length >= minLength && value.toString().length <= maxLength);
            }
        });
    };
    formValidator.prototype.registerValidationForEmail = function (objectToValidate, fieldName, fieldLabel) {
        var self = this;
        self.registerValidation(fieldName, "Please enter a valid email for field " + fieldLabel + "!", function () {
            var formScope = self.scope[self.formName];
            var value = formScope[fieldName].$modelValue;
            //var fieldValueFn = self.$parse(fieldName);
            //var value = fieldValueFn(objectToValidate);
            return (self.IsEmailAddressValid(value));
        });
    };
    formValidator.prototype.registerGroupValidation = function (groupName, fieldNames) {
        var _this = this;
        if (this.validationGroupItems[groupName] == null)
            this.validationGroupItems[groupName] = new Array();
        fieldNames.forEach(function (fieldName) {
            _this.validationGroupItems[groupName].push(fieldName);
        });
    };
    formValidator.prototype.validateForm = function (showToast, clearValidationResults) {
        if (showToast === void 0) { showToast = false; }
        if (clearValidationResults === void 0) { clearValidationResults = true; }
        var self = this;
        if (self.validationField == null)
            return true;
        if (clearValidationResults)
            self.clearValidationResults();
        for (var fieldName in self.validationField) {
            self.clearValidationResultForField(fieldName);
            self.validateField(fieldName, false, false);
        }
        var isFormValid = self.isFormValid();
        if (!isFormValid && showToast) {
            self.toastr.pop({
                type: 'error',
                body: self.getAllValidationMessagesAsList('</br>'),
                bodyOutputType: 'trustedHtml'
            });
        }
        return isFormValid;
    };
    formValidator.prototype.validateGroup = function (groupName, showToast, clearValidationResultForGroup) {
        if (showToast === void 0) { showToast = false; }
        if (clearValidationResultForGroup === void 0) { clearValidationResultForGroup = true; }
        var self = this;
        if (self.validationGroupItems[groupName] == null)
            return true;
        self.validationGroupItems[groupName].forEach(function (fieldName) {
            self.clearValidationResultForField(fieldName);
            self.validateField(fieldName, false, false);
        });
        var isGroupValid = self.isGroupValid(groupName);
        if (!isGroupValid && showToast) {
            self.toastr.error('', self.getAllValidationMessagesForGroupAsList(groupName, '</br>'));
        }
        return isGroupValid;
    };
    formValidator.prototype.validateField = function (fieldName, showToast, clearValidationResultForField) {
        if (showToast === void 0) { showToast = false; }
        if (clearValidationResultForField === void 0) { clearValidationResultForField = true; }
        var self = this;
        if (self.validationField[fieldName] == null)
            return true;
        if (self.validationResults != null && clearValidationResultForField) {
            self.validationResults[fieldName] = null;
        }
        if (self.validationResults == null)
            self.validationResults = {};
        var isValid = true;
        self.validationField[fieldName].forEach(function (validationItem) {
            isValid = self.validateFieldItem(validationItem, false, false) && isValid;
        });
        if (showToast && !isValid) {
            self.toastr.error('', self.getValidationMessageAsList(fieldName, '<br/>'));
        }
        return isValid;
    };
    formValidator.prototype.validateFieldItem = function (validationItem, showToast, clearValidationResultForField) {
        if (showToast === void 0) { showToast = false; }
        if (clearValidationResultForField === void 0) { clearValidationResultForField = true; }
        var self = this;
        if (self.validationResults != null && clearValidationResultForField) {
            self.validationResults[validationItem.fieldName] = null;
        }
        if (self.validationResults == null)
            self.validationResults = {};
        if (validationItem.isValid()) {
            return true;
        }
        self.setValidationResult(validationItem.fieldName, validationItem.errorMessage);
        if (showToast) {
            self.toastr.error('', validationItem.errorMessage);
        }
        return false;
    };
    formValidator.prototype.setValidationResult = function (fieldName, errorMessage) {
        if (this.validationResults == null)
            this.validationResults = {};
        if (this.validationResults[fieldName] == null) {
            this.validationResults[fieldName] = new validationResult();
        }
        this.validationResults[fieldName].errorMessages.push(errorMessage);
    };
    formValidator.prototype.clearValidationResults = function () {
        this.validationResults = null;
    };
    formValidator.prototype.clearValidationResultForField = function (fieldName) {
        var self = this;
        if (self.validationResults != null) {
            self.validationResults[fieldName] = null;
        }
    };
    formValidator.prototype.clearGroupValidation = function (groupName) {
        this.validationGroupItems[groupName] = [];
    };
    formValidator.prototype.deRegister = function () {
        var self = this;
        self._watchers.forEach(function (watcher) {
            watcher();
        });
    };
    return formValidator;
}());
var validationResult = /** @class */ (function () {
    function validationResult() {
        this.errorMessages = [];
    }
    validationResult.prototype.isValid = function () {
        return this.errorMessages.length == 0;
    };
    return validationResult;
}());
var validationItem = /** @class */ (function () {
    function validationItem(fieldName, errorMessage, validationFunction) {
        this.fieldName = fieldName;
        this.errorMessage = errorMessage;
        this.validationFunction = validationFunction;
    }
    validationItem.prototype.isValid = function () {
        return this.validationFunction();
    };
    return validationItem;
}());
angular.module('validator', [])
    .directive("realTimeValidator", function () {
    return {
        require: "?ngModel",
        restrict: 'A',
        scope: {
            model: '=ngModel',
            formValidator: '=realTimeValidator'
        },
        link: function (scope, element, attrs, control) {
            if (!control)
                return;
            var watcher = scope.$watch('model', function (modelValue) {
                if (scope.formValidator != null && scope.formValidator != undefined) {
                    element.next(".error-msg").remove();
                    element.removeClass('error');
                    var isValid = scope.formValidator.validateField(attrs.name);
                    if (!isValid && element.hasClass('ng-dirty')) {
                        var errors = scope.formValidator.getValidationMessage(attrs.name);
                        element.addClass('error');
                        var contentTr = angular.element('<span class="error-msg">' + errors.join("<br/>") + '</span>');
                        contentTr.insertAfter(element);
                    }
                }
            });
        }
    };
});

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
            config.headers.Authorization = self.window.sessionStorage.getItem(CUSTOM_VARIABLES.AUTHKEY);
        }
        if (self.window.localStorage.getItem(CUSTOM_VARIABLES.AUTHKEY)) {
            config.headers.Authorization = self.window.localStorage.getItem(CUSTOM_VARIABLES.AUTHKEY);
        }
        return config;
    };
    authInterceptorFactory.prototype.response = function (response) {
        return response || this.q.when(response);
    };
    return authInterceptorFactory;
}());

var downloadResponseService = /** @class */ (function () {
    function downloadResponseService() {
    }
    downloadResponseService.prototype.manageReponse = function (response, filename) {
        var _navigator = navigator;
        var _window = window;
        var data = response.data;
        var headers = response.headers;
        var status = response.status;
        var octetStreamMime = 'application/octet-stream';
        var success = false;
        // Get the headers
        headers = headers();
        // Get the filename from the x-filename header or default to "download.bin"
        //var filename = headers['x-filename'] || headers['filename'] || 'download.bin';
        // Determine the content type from the header or default to "application/octet-stream"
        var contentType = headers['content-type'] || octetStreamMime;
        try {
            //console.log(filename);
            // Try using msSaveBlob if supported
            console.log("Trying saveBlob method ...");
            var blob = new Blob([data], { type: contentType });
            if (_navigator.msSaveBlob)
                _navigator.msSaveBlob(blob, filename);
            else {
                // Try using other saveBlob implementations, if available
                var saveBlob = _navigator.webkitSaveBlob || _navigator.mozSaveBlob || _navigator.saveBlob;
                if (saveBlob === undefined)
                    throw "Not supported";
                saveBlob(blob, filename);
            }
            console.log("saveBlob succeeded");
            success = true;
            return true;
        }
        catch (ex) {
            //console.log(ex);
            console.log("saveBlob method failed with the following exception:");
        }
        if (!success) {
            // Get the blob url creator
            var urlCreator = _window.URL || _window.webkitURL || _window.mozURL || _window.msURL;
            if (urlCreator) {
                // Try to use a download link
                var link = document.createElement('a');
                if ('download' in link) {
                    // Try to simulate a click
                    try {
                        // Prepare a blob URL
                        console.log("Trying download link method with simulated click ...");
                        var blob = new Blob([data], { type: contentType });
                        var url = urlCreator.createObjectURL(blob);
                        link.setAttribute('href', url);
                        // Set the download attribute (Supported in Chrome 14+ / Firefox 20+)
                        link.setAttribute("download", filename);
                        // Simulate clicking the download link
                        var event = document.createEvent('MouseEvents');
                        event.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
                        link.dispatchEvent(event);
                        console.log("Download link method with simulated click succeeded");
                        success = true;
                        return true;
                    }
                    catch (ex) {
                        console.log("Download link method with simulated click failed with the following exception:");
                        console.log(ex);
                    }
                }
                if (!success) {
                    // Fallback to window.location method
                    try {
                        // Prepare a blob URL
                        // Use application/octet-stream when using window.location to force download
                        console.log("Trying download link method with window.location ...");
                        var blob = new Blob([data], { type: octetStreamMime });
                        var url = urlCreator.createObjectURL(blob);
                        window.location.href = url;
                        console.log("Download link method with window.location succeeded");
                        success = true;
                        return true;
                    }
                    catch (ex) {
                        console.log("Download link method with window.location failed with the following exception:");
                        console.log(ex);
                    }
                }
            }
        }
        if (!success) {
            return false;
            //deferred.reject("FILE COULD NOT BE DOWNLOADED");
            // Fallback to window.open method
            //window.open(httpPath, '_blank', '');
        }
        /******************/
    };
    return downloadResponseService;
}());

var LOGIN_STATUS;
(function (LOGIN_STATUS) {
    LOGIN_STATUS[LOGIN_STATUS["Success"] = 0] = "Success";
    LOGIN_STATUS[LOGIN_STATUS["LockedOut"] = 1] = "LockedOut";
    LOGIN_STATUS[LOGIN_STATUS["RequiresVerification"] = 2] = "RequiresVerification";
    LOGIN_STATUS[LOGIN_STATUS["Failure"] = 3] = "Failure";
})(LOGIN_STATUS || (LOGIN_STATUS = {}));


var baseReturnType = /** @class */ (function () {
    function baseReturnType() {
    }
    return baseReturnType;
}());
var baseListReturnType = /** @class */ (function () {
    function baseListReturnType() {
    }
    return baseListReturnType;
}());
var baseGlobalReturnType = /** @class */ (function () {
    function baseGlobalReturnType() {
    }
    return baseGlobalReturnType;
}());
var baseResultReturnType = /** @class */ (function () {
    function baseResultReturnType() {
    }
    return baseResultReturnType;
}());

/*--------------------------------------------------------------------------
* linq.js - LINQ for JavaScript
* ver 2.2.0.2 (Jan. 21th, 2011)
*
* created and maintained by neuecc <ils@neue.cc>
* licensed under Microsoft Public License(Ms-PL)
* http://neue.cc/
* http://linqjs.codeplex.com/
*--------------------------------------------------------------------------*/
Enumerable = function () { var m = "Single:sequence contains more than one element.", e = true, b = null, a = false, c = function (a) { this.GetEnumerator = a }; c.Choice = function () { var a = arguments[0] instanceof Array ? arguments[0] : arguments; return new c(function () { return new f(g.Blank, function () { return this.Yield(a[Math.floor(Math.random() * a.length)]) }, g.Blank) }) }; c.Cycle = function () { var a = arguments[0] instanceof Array ? arguments[0] : arguments; return new c(function () { var b = 0; return new f(g.Blank, function () { if (b >= a.length) b = 0; return this.Yield(a[b++]) }, g.Blank) }) }; c.Empty = function () { return new c(function () { return new f(g.Blank, function () { return a }, g.Blank) }) }; c.From = function (j) { if (j == b) return c.Empty(); if (j instanceof c) return j; if (typeof j == i.Number || typeof j == i.Boolean) return c.Repeat(j, 1); if (typeof j == i.String) return new c(function () { var b = 0; return new f(g.Blank, function () { return b < j.length ? this.Yield(j.charAt(b++)) : a }, g.Blank) }); if (typeof j != i.Function) { if (typeof j.length == i.Number) return new h(j); if (!(j instanceof Object) && d.IsIEnumerable(j)) return new c(function () { var c = e, b; return new f(function () { b = new Enumerator(j) }, function () { if (c) c = a; else b.moveNext(); return b.atEnd() ? a : this.Yield(b.item()) }, g.Blank) }) } return new c(function () { var b = [], c = 0; return new f(function () { for (var a in j) !(j[a] instanceof Function) && b.push({ Key: a, Value: j[a] }) }, function () { return c < b.length ? this.Yield(b[c++]) : a }, g.Blank) }) }, c.Return = function (a) { return c.Repeat(a, 1) }; c.Matches = function (h, e, d) { if (d == b) d = ""; if (e instanceof RegExp) { d += e.ignoreCase ? "i" : ""; d += e.multiline ? "m" : ""; e = e.source } if (d.indexOf("g") === -1) d += "g"; return new c(function () { var b; return new f(function () { b = new RegExp(e, d) }, function () { var c = b.exec(h); return c ? this.Yield(c) : a }, g.Blank) }) }; c.Range = function (e, d, a) { if (a == b) a = 1; return c.ToInfinity(e, a).Take(d) }; c.RangeDown = function (e, d, a) { if (a == b) a = 1; return c.ToNegativeInfinity(e, a).Take(d) }; c.RangeTo = function (d, e, a) { if (a == b) a = 1; return d < e ? c.ToInfinity(d, a).TakeWhile(function (a) { return a <= e }) : c.ToNegativeInfinity(d, a).TakeWhile(function (a) { return a >= e }) }; c.Repeat = function (d, a) { return a != b ? c.Repeat(d).Take(a) : new c(function () { return new f(g.Blank, function () { return this.Yield(d) }, g.Blank) }) }; c.RepeatWithFinalize = function (a, e) { a = d.CreateLambda(a); e = d.CreateLambda(e); return new c(function () { var c; return new f(function () { c = a() }, function () { return this.Yield(c) }, function () { if (c != b) { e(c); c = b } }) }) }; c.Generate = function (a, e) { if (e != b) return c.Generate(a).Take(e); a = d.CreateLambda(a); return new c(function () { return new f(g.Blank, function () { return this.Yield(a()) }, g.Blank) }) }; c.ToInfinity = function (d, a) { if (d == b) d = 0; if (a == b) a = 1; return new c(function () { var b; return new f(function () { b = d - a }, function () { return this.Yield(b += a) }, g.Blank) }) }; c.ToNegativeInfinity = function (d, a) { if (d == b) d = 0; if (a == b) a = 1; return new c(function () { var b; return new f(function () { b = d + a }, function () { return this.Yield(b -= a) }, g.Blank) }) }; c.Unfold = function (h, b) { b = d.CreateLambda(b); return new c(function () { var d = e, c; return new f(g.Blank, function () { if (d) { d = a; c = h; return this.Yield(c) } c = b(c); return this.Yield(c) }, g.Blank) }) }; c.prototype = { CascadeBreadthFirst: function (g, b) { var h = this; g = d.CreateLambda(g); b = d.CreateLambda(b); return new c(function () { var i, k = 0, j = []; return new f(function () { i = h.GetEnumerator() }, function () { while (e) { if (i.MoveNext()) { j.push(i.Current()); return this.Yield(b(i.Current(), k)) } var f = c.From(j).SelectMany(function (a) { return g(a) }); if (!f.Any()) return a; else { k++; j = []; d.Dispose(i); i = f.GetEnumerator() } } }, function () { d.Dispose(i) }) }) }, CascadeDepthFirst: function (g, b) { var h = this; g = d.CreateLambda(g); b = d.CreateLambda(b); return new c(function () { var j = [], i; return new f(function () { i = h.GetEnumerator() }, function () { while (e) { if (i.MoveNext()) { var f = b(i.Current(), j.length); j.push(i); i = c.From(g(i.Current())).GetEnumerator(); return this.Yield(f) } if (j.length <= 0) return a; d.Dispose(i); i = j.pop() } }, function () { try { d.Dispose(i) } finally { c.From(j).ForEach(function (a) { a.Dispose() }) } }) }) }, Flatten: function () { var h = this; return new c(function () { var j, i = b; return new f(function () { j = h.GetEnumerator() }, function () { while (e) { if (i != b) if (i.MoveNext()) return this.Yield(i.Current()); else i = b; if (j.MoveNext()) if (j.Current() instanceof Array) { d.Dispose(i); i = c.From(j.Current()).SelectMany(g.Identity).Flatten().GetEnumerator(); continue } else return this.Yield(j.Current()); return a } }, function () { try { d.Dispose(j) } finally { d.Dispose(i) } }) }) }, Pairwise: function (b) { var e = this; b = d.CreateLambda(b); return new c(function () { var c; return new f(function () { c = e.GetEnumerator(); c.MoveNext() }, function () { var d = c.Current(); return c.MoveNext() ? this.Yield(b(d, c.Current())) : a }, function () { d.Dispose(c) }) }) }, Scan: function (i, g, j) { if (j != b) return this.Scan(i, g).Select(j); var h; if (g == b) { g = d.CreateLambda(i); h = a } else { g = d.CreateLambda(g); h = e } var k = this; return new c(function () { var b, c, j = e; return new f(function () { b = k.GetEnumerator() }, function () { if (j) { j = a; if (!h) { if (b.MoveNext()) return this.Yield(c = b.Current()) } else return this.Yield(c = i) } return b.MoveNext() ? this.Yield(c = g(c, b.Current())) : a }, function () { d.Dispose(b) }) }) }, Select: function (b) { var e = this; b = d.CreateLambda(b); return new c(function () { var c, g = 0; return new f(function () { c = e.GetEnumerator() }, function () { return c.MoveNext() ? this.Yield(b(c.Current(), g++)) : a }, function () { d.Dispose(c) }) }) }, SelectMany: function (g, e) { var h = this; g = d.CreateLambda(g); if (e == b) e = function (b, a) { return a }; e = d.CreateLambda(e); return new c(function () { var j, i = undefined, k = 0; return new f(function () { j = h.GetEnumerator() }, function () { if (i === undefined) if (!j.MoveNext()) return a; do { if (i == b) { var f = g(j.Current(), k++); i = c.From(f).GetEnumerator() } if (i.MoveNext()) return this.Yield(e(j.Current(), i.Current())); d.Dispose(i); i = b } while (j.MoveNext()); return a }, function () { try { d.Dispose(j) } finally { d.Dispose(i) } }) }) }, Where: function (b) { b = d.CreateLambda(b); var e = this; return new c(function () { var c, g = 0; return new f(function () { c = e.GetEnumerator() }, function () { while (c.MoveNext()) if (b(c.Current(), g++)) return this.Yield(c.Current()); return a }, function () { d.Dispose(c) }) }) }, OfType: function (c) { var a; switch (c) { case Number: a = i.Number; break; case String: a = i.String; break; case Boolean: a = i.Boolean; break; case Function: a = i.Function; break; default: a = b } return a === b ? this.Where(function (a) { return a instanceof c }) : this.Where(function (b) { return typeof b === a }) }, Zip: function (e, b) { b = d.CreateLambda(b); var g = this; return new c(function () { var i, h, j = 0; return new f(function () { i = g.GetEnumerator(); h = c.From(e).GetEnumerator() }, function () { return i.MoveNext() && h.MoveNext() ? this.Yield(b(i.Current(), h.Current(), j++)) : a }, function () { try { d.Dispose(i) } finally { d.Dispose(h) } }) }) }, Join: function (m, i, h, k, j) { i = d.CreateLambda(i); h = d.CreateLambda(h); k = d.CreateLambda(k); j = d.CreateLambda(j); var l = this; return new c(function () { var n, q, o = b, p = 0; return new f(function () { n = l.GetEnumerator(); q = c.From(m).ToLookup(h, g.Identity, j) }, function () { while (e) { if (o != b) { var c = o[p++]; if (c !== undefined) return this.Yield(k(n.Current(), c)); c = b; p = 0 } if (n.MoveNext()) { var d = i(n.Current()); o = q.Get(d).ToArray() } else return a } }, function () { d.Dispose(n) }) }) }, GroupJoin: function (l, h, e, j, i) { h = d.CreateLambda(h); e = d.CreateLambda(e); j = d.CreateLambda(j); i = d.CreateLambda(i); var k = this; return new c(function () { var m = k.GetEnumerator(), n = b; return new f(function () { m = k.GetEnumerator(); n = c.From(l).ToLookup(e, g.Identity, i) }, function () { if (m.MoveNext()) { var b = n.Get(h(m.Current())); return this.Yield(j(m.Current(), b)) } return a }, function () { d.Dispose(m) }) }) }, All: function (b) { b = d.CreateLambda(b); var c = e; this.ForEach(function (d) { if (!b(d)) { c = a; return a } }); return c }, Any: function (c) { c = d.CreateLambda(c); var b = this.GetEnumerator(); try { if (arguments.length == 0) return b.MoveNext(); while (b.MoveNext()) if (c(b.Current())) return e; return a } finally { d.Dispose(b) } }, Concat: function (e) { var g = this; return new c(function () { var i, h; return new f(function () { i = g.GetEnumerator() }, function () { if (h == b) { if (i.MoveNext()) return this.Yield(i.Current()); h = c.From(e).GetEnumerator() } return h.MoveNext() ? this.Yield(h.Current()) : a }, function () { try { d.Dispose(i) } finally { d.Dispose(h) } }) }) }, Insert: function (h, b) { var g = this; return new c(function () { var j, i, l = 0, k = a; return new f(function () { j = g.GetEnumerator(); i = c.From(b).GetEnumerator() }, function () { if (l == h && i.MoveNext()) { k = e; return this.Yield(i.Current()) } if (j.MoveNext()) { l++; return this.Yield(j.Current()) } return !k && i.MoveNext() ? this.Yield(i.Current()) : a }, function () { try { d.Dispose(j) } finally { d.Dispose(i) } }) }) }, Alternate: function (a) { a = c.Return(a); return this.SelectMany(function (b) { return c.Return(b).Concat(a) }).TakeExceptLast() }, Contains: function (f, b) { b = d.CreateLambda(b); var c = this.GetEnumerator(); try { while (c.MoveNext()) if (b(c.Current()) === f) return e; return a } finally { d.Dispose(c) } }, DefaultIfEmpty: function (b) { var g = this; return new c(function () { var c, h = e; return new f(function () { c = g.GetEnumerator() }, function () { if (c.MoveNext()) { h = a; return this.Yield(c.Current()) } else if (h) { h = a; return this.Yield(b) } return a }, function () { d.Dispose(c) }) }) }, Distinct: function (a) { return this.Except(c.Empty(), a) }, Except: function (e, b) { b = d.CreateLambda(b); var g = this; return new c(function () { var h, i; return new f(function () { h = g.GetEnumerator(); i = new n(b); c.From(e).ForEach(function (a) { i.Add(a) }) }, function () { while (h.MoveNext()) { var b = h.Current(); if (!i.Contains(b)) { i.Add(b); return this.Yield(b) } } return a }, function () { d.Dispose(h) }) }) }, Intersect: function (e, b) { b = d.CreateLambda(b); var g = this; return new c(function () { var h, i, j; return new f(function () { h = g.GetEnumerator(); i = new n(b); c.From(e).ForEach(function (a) { i.Add(a) }); j = new n(b) }, function () { while (h.MoveNext()) { var b = h.Current(); if (!j.Contains(b) && i.Contains(b)) { j.Add(b); return this.Yield(b) } } return a }, function () { d.Dispose(h) }) }) }, SequenceEqual: function (h, f) { f = d.CreateLambda(f); var g = this.GetEnumerator(); try { var b = c.From(h).GetEnumerator(); try { while (g.MoveNext()) if (!b.MoveNext() || f(g.Current()) !== f(b.Current())) return a; return b.MoveNext() ? a : e } finally { d.Dispose(b) } } finally { d.Dispose(g) } }, Union: function (e, b) { b = d.CreateLambda(b); var g = this; return new c(function () { var j, h, i; return new f(function () { j = g.GetEnumerator(); i = new n(b) }, function () { var b; if (h === undefined) { while (j.MoveNext()) { b = j.Current(); if (!i.Contains(b)) { i.Add(b); return this.Yield(b) } } h = c.From(e).GetEnumerator() } while (h.MoveNext()) { b = h.Current(); if (!i.Contains(b)) { i.Add(b); return this.Yield(b) } } return a }, function () { try { d.Dispose(j) } finally { d.Dispose(h) } }) }) }, OrderBy: function (b) { return new j(this, b, a) }, OrderByDescending: function (a) { return new j(this, a, e) }, Reverse: function () { var b = this; return new c(function () { var c, d; return new f(function () { c = b.ToArray(); d = c.length }, function () { return d > 0 ? this.Yield(c[--d]) : a }, g.Blank) }) }, Shuffle: function () { var b = this; return new c(function () { var c; return new f(function () { c = b.ToArray() }, function () { if (c.length > 0) { var b = Math.floor(Math.random() * c.length); return this.Yield(c.splice(b, 1)[0]) } return a }, g.Blank) }) }, GroupBy: function (i, h, e, g) { var j = this; i = d.CreateLambda(i); h = d.CreateLambda(h); if (e != b) e = d.CreateLambda(e); g = d.CreateLambda(g); return new c(function () { var c; return new f(function () { c = j.ToLookup(i, h, g).ToEnumerable().GetEnumerator() }, function () { while (c.MoveNext()) return e == b ? this.Yield(c.Current()) : this.Yield(e(c.Current().Key(), c.Current())); return a }, function () { d.Dispose(c) }) }) }, PartitionBy: function (j, i, g, h) { var l = this; j = d.CreateLambda(j); i = d.CreateLambda(i); h = d.CreateLambda(h); var k; if (g == b) { k = a; g = function (b, a) { return new o(b, a) } } else { k = e; g = d.CreateLambda(g) } return new c(function () { var b, n, o, m = []; return new f(function () { b = l.GetEnumerator(); if (b.MoveNext()) { n = j(b.Current()); o = h(n); m.push(i(b.Current())) } }, function () { var d; while ((d = b.MoveNext()) == e) if (o === h(j(b.Current()))) m.push(i(b.Current())); else break; if (m.length > 0) { var f = k ? g(n, c.From(m)) : g(n, m); if (d) { n = j(b.Current()); o = h(n); m = [i(b.Current())] } else m = []; return this.Yield(f) } return a }, function () { d.Dispose(b) }) }) }, BufferWithCount: function (e) { var b = this; return new c(function () { var c; return new f(function () { c = b.GetEnumerator() }, function () { var b = [], d = 0; while (c.MoveNext()) { b.push(c.Current()); if (++d >= e) return this.Yield(b) } return b.length > 0 ? this.Yield(b) : a }, function () { d.Dispose(c) }) }) }, Aggregate: function (c, b, a) { return this.Scan(c, b, a).Last() }, Average: function (a) { a = d.CreateLambda(a); var c = 0, b = 0; this.ForEach(function (d) { c += a(d); ++b }); return c / b }, Count: function (a) { a = a == b ? g.True : d.CreateLambda(a); var c = 0; this.ForEach(function (d, b) { if (a(d, b))++c }); return c }, Max: function (a) { if (a == b) a = g.Identity; return this.Select(a).Aggregate(function (a, b) { return a > b ? a : b }) }, Min: function (a) { if (a == b) a = g.Identity; return this.Select(a).Aggregate(function (a, b) { return a < b ? a : b }) }, MaxBy: function (a) { a = d.CreateLambda(a); return this.Aggregate(function (b, c) { return a(b) > a(c) ? b : c }) }, MinBy: function (a) { a = d.CreateLambda(a); return this.Aggregate(function (b, c) { return a(b) < a(c) ? b : c }) }, Sum: function (a) { if (a == b) a = g.Identity; return this.Select(a).Aggregate(0, function (a, b) { return a + b }) }, ElementAt: function (d) { var c, b = a; this.ForEach(function (g, f) { if (f == d) { c = g; b = e; return a } }); if (!b) throw new Error("index is less than 0 or greater than or equal to the number of elements in source."); return c }, ElementAtOrDefault: function (f, d) { var c, b = a; this.ForEach(function (g, d) { if (d == f) { c = g; b = e; return a } }); return !b ? d : c }, First: function (c) { if (c != b) return this.Where(c).First(); var f, d = a; this.ForEach(function (b) { f = b; d = e; return a }); if (!d) throw new Error("First:No element satisfies the condition."); return f }, FirstOrDefault: function (c, d) { if (d != b) return this.Where(d).FirstOrDefault(c); var g, f = a; this.ForEach(function (b) { g = b; f = e; return a }); return !f ? c : g }, Last: function (c) { if (c != b) return this.Where(c).Last(); var f, d = a; this.ForEach(function (a) { d = e; f = a }); if (!d) throw new Error("Last:No element satisfies the condition."); return f }, LastOrDefault: function (c, d) { if (d != b) return this.Where(d).LastOrDefault(c); var g, f = a; this.ForEach(function (a) { f = e; g = a }); return !f ? c : g }, Single: function (d) { if (d != b) return this.Where(d).Single(); var f, c = a; this.ForEach(function (a) { if (!c) { c = e; f = a } else throw new Error(m); }); if (!c) throw new Error("Single:No element satisfies the condition."); return f }, SingleOrDefault: function (d, f) { if (f != b) return this.Where(f).SingleOrDefault(d); var g, c = a; this.ForEach(function (a) { if (!c) { c = e; g = a } else throw new Error(m); }); return !c ? d : g }, Skip: function (e) { var b = this; return new c(function () { var c, g = 0; return new f(function () { c = b.GetEnumerator(); while (g++ < e && c.MoveNext()); }, function () { return c.MoveNext() ? this.Yield(c.Current()) : a }, function () { d.Dispose(c) }) }) }, SkipWhile: function (b) { b = d.CreateLambda(b); var g = this; return new c(function () { var c, i = 0, h = a; return new f(function () { c = g.GetEnumerator() }, function () { while (!h) if (c.MoveNext()) { if (!b(c.Current(), i++)) { h = e; return this.Yield(c.Current()) } continue } else return a; return c.MoveNext() ? this.Yield(c.Current()) : a }, function () { d.Dispose(c) }) }) }, Take: function (e) { var b = this; return new c(function () { var c, g = 0; return new f(function () { c = b.GetEnumerator() }, function () { return g++ < e && c.MoveNext() ? this.Yield(c.Current()) : a }, function () { d.Dispose(c) }) }) }, TakeWhile: function (b) { b = d.CreateLambda(b); var e = this; return new c(function () { var c, g = 0; return new f(function () { c = e.GetEnumerator() }, function () { return c.MoveNext() && b(c.Current(), g++) ? this.Yield(c.Current()) : a }, function () { d.Dispose(c) }) }) }, TakeExceptLast: function (e) { if (e == b) e = 1; var g = this; return new c(function () { if (e <= 0) return g.GetEnumerator(); var b, c = []; return new f(function () { b = g.GetEnumerator() }, function () { while (b.MoveNext()) { if (c.length == e) { c.push(b.Current()); return this.Yield(c.shift()) } c.push(b.Current()) } return a }, function () { d.Dispose(b) }) }) }, TakeFromLast: function (e) { if (e <= 0 || e == b) return c.Empty(); var g = this; return new c(function () { var j, h, i = []; return new f(function () { j = g.GetEnumerator() }, function () { while (j.MoveNext()) { i.length == e && i.shift(); i.push(j.Current()) } if (h == b) h = c.From(i).GetEnumerator(); return h.MoveNext() ? this.Yield(h.Current()) : a }, function () { d.Dispose(h) }) }) }, IndexOf: function (c) { var a = b; this.ForEach(function (d, b) { if (d === c) { a = b; return e } }); return a !== b ? a : -1 }, LastIndexOf: function (b) { var a = -1; this.ForEach(function (d, c) { if (d === b) a = c }); return a }, ToArray: function () { var a = []; this.ForEach(function (b) { a.push(b) }); return a }, ToLookup: function (c, b, a) { c = d.CreateLambda(c); b = d.CreateLambda(b); a = d.CreateLambda(a); var e = new n(a); this.ForEach(function (g) { var f = c(g), a = b(g), d = e.Get(f); if (d !== undefined) d.push(a); else e.Add(f, [a]) }); return new q(e) }, ToObject: function (b, a) { b = d.CreateLambda(b); a = d.CreateLambda(a); var c = {}; this.ForEach(function (d) { c[b(d)] = a(d) }); return c }, ToDictionary: function (c, b, a) { c = d.CreateLambda(c); b = d.CreateLambda(b); a = d.CreateLambda(a); var e = new n(a); this.ForEach(function (a) { e.Add(c(a), b(a)) }); return e }, ToJSON: function (a, b) { return JSON.stringify(this.ToArray(), a, b) }, ToString: function (a, c) { if (a == b) a = ""; if (c == b) c = g.Identity; return this.Select(c).ToArray().join(a) }, Do: function (b) { var e = this; b = d.CreateLambda(b); return new c(function () { var c, g = 0; return new f(function () { c = e.GetEnumerator() }, function () { if (c.MoveNext()) { b(c.Current(), g++); return this.Yield(c.Current()) } return a }, function () { d.Dispose(c) }) }) }, ForEach: function (c) { c = d.CreateLambda(c); var e = 0, b = this.GetEnumerator(); try { while (b.MoveNext()) if (c(b.Current(), e++) === a) break } finally { d.Dispose(b) } }, Write: function (c, f) { if (c == b) c = ""; f = d.CreateLambda(f); var g = e; this.ForEach(function (b) { if (g) g = a; else document.write(c); document.write(f(b)) }) }, WriteLine: function (a) { a = d.CreateLambda(a); this.ForEach(function (b) { document.write(a(b)); document.write("<br />") }) }, Force: function () { var a = this.GetEnumerator(); try { while (a.MoveNext()); } finally { d.Dispose(a) } }, Let: function (b) { b = d.CreateLambda(b); var e = this; return new c(function () { var g; return new f(function () { g = c.From(b(e)).GetEnumerator() }, function () { return g.MoveNext() ? this.Yield(g.Current()) : a }, function () { d.Dispose(g) }) }) }, Share: function () { var e = this, d; return new c(function () { return new f(function () { if (d == b) d = e.GetEnumerator() }, function () { return d.MoveNext() ? this.Yield(d.Current()) : a }, g.Blank) }) }, MemoizeAll: function () { var h = this, e, d; return new c(function () { var c = -1; return new f(function () { if (d == b) { d = h.GetEnumerator(); e = [] } }, function () { c++; return e.length <= c ? d.MoveNext() ? this.Yield(e[c] = d.Current()) : a : this.Yield(e[c]) }, g.Blank) }) }, Catch: function (b) { b = d.CreateLambda(b); var e = this; return new c(function () { var c; return new f(function () { c = e.GetEnumerator() }, function () { try { return c.MoveNext() ? this.Yield(c.Current()) : a } catch (d) { b(d); return a } }, function () { d.Dispose(c) }) }) }, Finally: function (b) { b = d.CreateLambda(b); var e = this; return new c(function () { var c; return new f(function () { c = e.GetEnumerator() }, function () { return c.MoveNext() ? this.Yield(c.Current()) : a }, function () { try { d.Dispose(c) } finally { b() } }) }) }, Trace: function (c, a) { if (c == b) c = "Trace"; a = d.CreateLambda(a); return this.Do(function (b) { console.log(c, ":", a(b)) }) } }; var g = { Identity: function (a) { return a }, True: function () { return e }, Blank: function () { } }, i = { Boolean: typeof e, Number: typeof 0, String: typeof "", Object: typeof {}, Undefined: typeof undefined, Function: typeof function () { } }, d = { CreateLambda: function (a) { if (a == b) return g.Identity; if (typeof a == i.String) if (a == "") return g.Identity; else if (a.indexOf("=>") == -1) return new Function("$,$$,$$$,$$$$", "return " + a); else { var c = a.match(/^[(\s]*([^()]*?)[)\s]*=>(.*)/); return new Function(c[1], "return " + c[2]) } return a }, IsIEnumerable: function (b) { if (typeof Enumerator != i.Undefined) try { new Enumerator(b); return e } catch (c) { } return a }, Compare: function (a, b) { return a === b ? 0 : a > b ? 1 : -1 }, Dispose: function (a) { a != b && a.Dispose() } }, k = { Before: 0, Running: 1, After: 2 }, f = function (d, f, g) { var c = new p, b = k.Before; this.Current = c.Current; this.MoveNext = function () { try { switch (b) { case k.Before: b = k.Running; d(); case k.Running: if (f.apply(c)) return e; else { this.Dispose(); return a } case k.After: return a } } catch (g) { this.Dispose(); throw g; } }; this.Dispose = function () { if (b != k.Running) return; try { g() } finally { b = k.After } } }, p = function () { var a = b; this.Current = function () { return a }; this.Yield = function (b) { a = b; return e } }, j = function (f, b, c, e) { var a = this; a.source = f; a.keySelector = d.CreateLambda(b); a.descending = c; a.parent = e }; j.prototype = new c; j.prototype.CreateOrderedEnumerable = function (a, b) { return new j(this.source, a, b, this) }; j.prototype.ThenBy = function (b) { return this.CreateOrderedEnumerable(b, a) }; j.prototype.ThenByDescending = function (a) { return this.CreateOrderedEnumerable(a, e) }; j.prototype.GetEnumerator = function () { var h = this, d, c, e = 0; return new f(function () { d = []; c = []; h.source.ForEach(function (b, a) { d.push(b); c.push(a) }); var a = l.Create(h, b); a.GenerateKeys(d); c.sort(function (b, c) { return a.Compare(b, c) }) }, function () { return e < c.length ? this.Yield(d[c[e++]]) : a }, g.Blank) }; var l = function (c, d, e) { var a = this; a.keySelector = c; a.descending = d; a.child = e; a.keys = b }; l.Create = function (a, d) { var c = new l(a.keySelector, a.descending, d); return a.parent != b ? l.Create(a.parent, c) : c }; l.prototype.GenerateKeys = function (d) { var a = this; for (var f = d.length, g = a.keySelector, e = new Array(f), c = 0; c < f; c++) e[c] = g(d[c]); a.keys = e; a.child != b && a.child.GenerateKeys(d) }; l.prototype.Compare = function (e, f) { var a = this, c = d.Compare(a.keys[e], a.keys[f]); if (c == 0) { if (a.child != b) return a.child.Compare(e, f); c = d.Compare(e, f) } return a.descending ? -c : c }; var h = function (a) { this.source = a }; h.prototype = new c; h.prototype.Any = function (a) { return a == b ? this.source.length > 0 : c.prototype.Any.apply(this, arguments) }; h.prototype.Count = function (a) { return a == b ? this.source.length : c.prototype.Count.apply(this, arguments) }; h.prototype.ElementAt = function (a) { return 0 <= a && a < this.source.length ? this.source[a] : c.prototype.ElementAt.apply(this, arguments) }; h.prototype.ElementAtOrDefault = function (a, b) { return 0 <= a && a < this.source.length ? this.source[a] : b }; h.prototype.First = function (a) { return a == b && this.source.length > 0 ? this.source[0] : c.prototype.First.apply(this, arguments) }; h.prototype.FirstOrDefault = function (a, d) { return d != b ? c.prototype.FirstOrDefault.apply(this, arguments) : this.source.length > 0 ? this.source[0] : a }; h.prototype.Last = function (d) { var a = this; return d == b && a.source.length > 0 ? a.source[a.source.length - 1] : c.prototype.Last.apply(a, arguments) }; h.prototype.LastOrDefault = function (d, e) { var a = this; return e != b ? c.prototype.LastOrDefault.apply(a, arguments) : a.source.length > 0 ? a.source[a.source.length - 1] : d }; h.prototype.Skip = function (d) { var b = this.source; return new c(function () { var c; return new f(function () { c = d < 0 ? 0 : d }, function () { return c < b.length ? this.Yield(b[c++]) : a }, g.Blank) }) }; h.prototype.TakeExceptLast = function (a) { if (a == b) a = 1; return this.Take(this.source.length - a) }; h.prototype.TakeFromLast = function (a) { return this.Skip(this.source.length - a) }; h.prototype.Reverse = function () { var b = this.source; return new c(function () { var c; return new f(function () { c = b.length }, function () { return c > 0 ? this.Yield(b[--c]) : a }, g.Blank) }) }; h.prototype.SequenceEqual = function (d, e) { return (d instanceof h || d instanceof Array) && e == b && c.From(d).Count() != this.Count() ? a : c.prototype.SequenceEqual.apply(this, arguments) }; h.prototype.ToString = function (a, d) { if (d != b || !(this.source instanceof Array)) return c.prototype.ToString.apply(this, arguments); if (a == b) a = ""; return this.source.join(a) }; h.prototype.GetEnumerator = function () { var b = this.source, c = 0; return new f(g.Blank, function () { return c < b.length ? this.Yield(b[c++]) : a }, g.Blank) }; var n = function () { var h = function (a, b) { return Object.prototype.hasOwnProperty.call(a, b) }, d = function (a) { return a === b ? "null" : a === undefined ? "undefined" : typeof a.toString === i.Function ? a.toString() : Object.prototype.toString.call(a) }, l = function (d, c) { var a = this; a.Key = d; a.Value = c; a.Prev = b; a.Next = b }, j = function () { this.First = b; this.Last = b }; j.prototype = { AddLast: function (c) { var a = this; if (a.Last != b) { a.Last.Next = c; c.Prev = a.Last; a.Last = c } else a.First = a.Last = c }, Replace: function (c, a) { if (c.Prev != b) { c.Prev.Next = a; a.Prev = c.Prev } else this.First = a; if (c.Next != b) { c.Next.Prev = a; a.Next = c.Next } else this.Last = a }, Remove: function (a) { if (a.Prev != b) a.Prev.Next = a.Next; else this.First = a.Next; if (a.Next != b) a.Next.Prev = a.Prev; else this.Last = a.Prev } }; var k = function (c) { var a = this; a.count = 0; a.entryList = new j; a.buckets = {}; a.compareSelector = c == b ? g.Identity : c }; k.prototype = { Add: function (i, j) { var a = this, g = a.compareSelector(i), f = d(g), c = new l(i, j); if (h(a.buckets, f)) { for (var b = a.buckets[f], e = 0; e < b.length; e++) if (a.compareSelector(b[e].Key) === g) { a.entryList.Replace(b[e], c); b[e] = c; return } b.push(c) } else a.buckets[f] = [c]; a.count++; a.entryList.AddLast(c) }, Get: function (i) { var a = this, c = a.compareSelector(i), g = d(c); if (!h(a.buckets, g)) return undefined; for (var e = a.buckets[g], b = 0; b < e.length; b++) { var f = e[b]; if (a.compareSelector(f.Key) === c) return f.Value } return undefined }, Set: function (k, m) { var b = this, g = b.compareSelector(k), j = d(g); if (h(b.buckets, j)) for (var f = b.buckets[j], c = 0; c < f.length; c++) if (b.compareSelector(f[c].Key) === g) { var i = new l(k, m); b.entryList.Replace(f[c], i); f[c] = i; return e } return a }, Contains: function (j) { var b = this, f = b.compareSelector(j), i = d(f); if (!h(b.buckets, i)) return a; for (var g = b.buckets[i], c = 0; c < g.length; c++) if (b.compareSelector(g[c].Key) === f) return e; return a }, Clear: function () { this.count = 0; this.buckets = {}; this.entryList = new j }, Remove: function (g) { var a = this, f = a.compareSelector(g), e = d(f); if (!h(a.buckets, e)) return; for (var b = a.buckets[e], c = 0; c < b.length; c++) if (a.compareSelector(b[c].Key) === f) { a.entryList.Remove(b[c]); b.splice(c, 1); if (b.length == 0) delete a.buckets[e]; a.count--; return } }, Count: function () { return this.count }, ToEnumerable: function () { var d = this; return new c(function () { var c; return new f(function () { c = d.entryList.First }, function () { if (c != b) { var d = { Key: c.Key, Value: c.Value }; c = c.Next; return this.Yield(d) } return a }, g.Blank) }) } }; return k }(), q = function (a) { var b = this; b.Count = function () { return a.Count() }; b.Get = function (b) { return c.From(a.Get(b)) }; b.Contains = function (b) { return a.Contains(b) }; b.ToEnumerable = function () { return a.ToEnumerable().Select(function (a) { return new o(a.Key, a.Value) }) } }, o = function (b, a) { this.Key = function () { return b }; h.call(this, a) }; o.prototype = new h; return c }()
var baseController = /** @class */ (function () {
    function baseController($scope, $rootScope, $location, $anchorScroll, $localStorage, $window, $timeout, $uibModal, $q, $document, $parse, SweetAlert, toaster, globalVariableFactory, Upload) {
        this.isCpfLoadingInProgress = false;
        this.modalInstanceForLoading = null;
        this.isFooterShown = false;
        this.isInitialized = false;
        this.loadedControllerInstances = [];
        this.loadedControllerInstancesListeners = [];
        this.areFileTypeBeingLoaded = false;
        this.fileUploadStates = [];
        this.loadingMessages = "test";
        this.commomModel = {};
        this.isLoadingShown = false;
        //MAP RELATED
        this.autocomplete = [];
        this.searchData = {
            searchPlaceHolder: null,
            selectedCity: null,
            selectedPostalCode: null,
            selectedLatLng: null,
            selectedRegion: null,
            selectedPrestation: [],
        };
        $scope.baseController = this;
        this.$scope = $scope;
        this.$rootScope = $rootScope;
        this.$location = $location;
        this.$anchorScroll = $anchorScroll;
        this.$localStorage = $localStorage;
        this.$window = $window;
        this.$timeout = $timeout;
        this.$uibModal = $uibModal;
        this.$document = $document;
        this.$parse = $parse;
        this.SweetAlert = SweetAlert;
        this.toaster = toaster;
        this.globalVariableFactory = globalVariableFactory;
        this.q = $q;
        this.uploadService = Upload;
        this.initializeVariables();
    }
    Object.defineProperty(baseController.prototype, "tinymceOptions", {
        get: function () {
            var self = this;
            return {
                menubar: false,
                statusbar: true,
                browser_spellcheck: true,
                schema: 'html5',
                content_css: [],
                plugins: "advlist autolink autosave link image lists charmap print preview hr anchor pagebreak spellchecker searchreplace wordcount visualblocks visualchars code fullscreen media nonbreaking table contextmenu directionality template textcolor paste fullpage textcolor colorpicker textpattern imagetools autoresize",
                toolbar1: "fontselect fontsizeselect | bold italic underline | backcolor forecolor | alignleft aligncenter alignright alignjustify | outdent indent | bullist numlist | removeformat",
                toolbar2: "cut copy paste | searchreplace | link unlink image table hr | undo redo | code | preview",
                fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt 48pt 72pt',
                images_upload_handler: function (blobInfo, success, failure) {
                    success("data:image/jpeg;base64," + blobInfo.base64());
                },
                theme_url: 'themes/modern/theme.min.js',
                skin_url: 'skins/lightgray/',
                script_url: 'plugins1/',
                document_base_url: self.globalVariableFactory.siteUrl + '/build/scripts/external/tinymce/',
                external_plugins: {
                    'code': self.globalVariableFactory.siteUrl + 'build/scripts/external/tinymce/plugins/' + 'code/plugin.min.js',
                    'image': self.globalVariableFactory.siteUrl + 'build/scripts/external/tinymce/plugins/' + 'image/plugin.min.js',
                    'link': self.globalVariableFactory.siteUrl + 'build/scripts/external/tinymce/plugins/' + 'link/plugin.min.js',
                    'nonbreaking': self.globalVariableFactory.siteUrl + 'build/scripts/external/tinymce/plugins/' + 'nonbreaking/plugin.min.js',
                    'table': self.globalVariableFactory.siteUrl + 'build/scripts/external/tinymce/plugins/' + 'table/plugin.min.js',
                    'contextmenu': self.globalVariableFactory.siteUrl + 'build/scripts/external/tinymce/plugins/' + 'contextmenu/plugin.min.js',
                    'advlist': self.globalVariableFactory.siteUrl + 'build/scripts/external/tinymce/plugins/' + 'advlist/plugin.min.js',
                    'autolink': self.globalVariableFactory.siteUrl + 'build/scripts/external/tinymce/plugins/' + 'autolink/plugin.min.js',
                    'autosave': self.globalVariableFactory.siteUrl + 'build/scripts/external/tinymce/plugins/' + 'autosave/plugin.min.js',
                    'lists': self.globalVariableFactory.siteUrl + 'build/scripts/external/tinymce/plugins/' + 'lists/plugin.min.js',
                    'charmap': self.globalVariableFactory.siteUrl + 'build/scripts/external/tinymce/plugins/' + 'charmap/plugin.min.js',
                    'print': self.globalVariableFactory.siteUrl + 'build/scripts/external/tinymce/plugins/' + 'print/plugin.min.js',
                    'preview': self.globalVariableFactory.siteUrl + 'build/scripts/external/tinymce/plugins/' + 'preview/plugin.min.js',
                    'hr': self.globalVariableFactory.siteUrl + 'build/scripts/external/tinymce/plugins/' + 'hr/plugin.min.js',
                    'anchor': self.globalVariableFactory.siteUrl + 'build/scripts/external/tinymce/plugins/' + 'anchor/plugin.min.js',
                    'pagebreak': self.globalVariableFactory.siteUrl + 'build/scripts/external/tinymce/plugins/' + 'pagebreak/plugin.min.js',
                    'spellchecker': self.globalVariableFactory.siteUrl + 'build/scripts/external/tinymce/plugins/' + 'spellchecker/plugin.min.js',
                    'searchreplace': self.globalVariableFactory.siteUrl + 'build/scripts/external/tinymce/plugins/' + 'searchreplace/plugin.min.js',
                    'wordcount': self.globalVariableFactory.siteUrl + 'build/scripts/external/tinymce/plugins/' + 'wordcount/plugin.min.js',
                    'visualblocks': self.globalVariableFactory.siteUrl + 'build/scripts/external/tinymce/plugins/' + 'visualblocks/plugin.min.js',
                    'visualchars': self.globalVariableFactory.siteUrl + 'build/scripts/external/tinymce/plugins/' + 'visualchars/plugin.min.js',
                    'fullscreen': self.globalVariableFactory.siteUrl + 'build/scripts/external/tinymce/plugins/' + 'fullscreen/plugin.min.js',
                    'media': self.globalVariableFactory.siteUrl + 'build/scripts/external/tinymce/plugins/' + 'media/plugin.min.js',
                    'directionality': self.globalVariableFactory.siteUrl + 'build/scripts/external/tinymce/plugins/' + 'directionality/plugin.min.js',
                    'template': self.globalVariableFactory.siteUrl + 'build/scripts/external/tinymce/plugins/' + 'template/plugin.min.js',
                    'textcolor': self.globalVariableFactory.siteUrl + 'build/scripts/external/tinymce/plugins/' + 'textcolor/plugin.min.js',
                    'paste': self.globalVariableFactory.siteUrl + 'build/scripts/external/tinymce/plugins/' + 'paste/plugin.min.js',
                    'fullpage': self.globalVariableFactory.siteUrl + 'build/scripts/external/tinymce/plugins/' + 'fullpage/plugin.min.js',
                    'colorpicker': self.globalVariableFactory.siteUrl + 'build/scripts/external/tinymce/plugins/' + 'colorpicker/plugin.min.js',
                    'textpattern': self.globalVariableFactory.siteUrl + 'build/scripts/external/tinymce/plugins/' + 'textpattern/plugin.min.js',
                    'imagetools': self.globalVariableFactory.siteUrl + 'build/scripts/external/tinymce/plugins/' + 'imagetools/plugin.min.js',
                    'autoresize': self.globalVariableFactory.siteUrl + 'build/scripts/external/tinymce/plugins/' + 'autoresize/plugin.min.js'
                },
                autoresize_bottom_margin: 0
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(baseController.prototype, "tinymceBasicOptions", {
        get: function () {
            var self = this;
            return {
                menubar: false,
                statusbar: true,
                browser_spellcheck: true,
                schema: 'html5',
                content_css: [],
                plugins: "link lists hr anchor searchreplace wordcount code table paste",
                toolbar1: "bold italic underline | backcolor forecolor | alignleft aligncenter alignright alignjustify | outdent indent | bullist numlist | removeformat",
                toolbar2: "cut copy paste | searchreplace | link unlink table hr | undo redo | code",
                fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt 48pt 72pt',
                images_upload_handler: function (blobInfo, success, failure) {
                    success("data:image/jpeg;base64," + blobInfo.base64());
                },
                theme_url: 'themes/modern/theme.min.js',
                skin_url: 'skins/lightgray/',
                script_url: 'plugins1/',
                document_base_url: self.globalVariableFactory.siteUrl + '/build/scripts/external/tinymce/',
                external_plugins: {
                    'link': self.globalVariableFactory.siteUrl + 'build/scripts/external/tinymce/plugins/' + 'link/plugin.min.js',
                    'lists': self.globalVariableFactory.siteUrl + 'build/scripts/external/tinymce/plugins/' + 'lists/plugin.min.js',
                    'hr': self.globalVariableFactory.siteUrl + 'build/scripts/external/tinymce/plugins/' + 'hr/plugin.min.js',
                    'anchor': self.globalVariableFactory.siteUrl + 'build/scripts/external/tinymce/plugins/' + 'anchor/plugin.min.js',
                    'searchreplace': self.globalVariableFactory.siteUrl + 'build/scripts/external/tinymce/plugins/' + 'searchreplace/plugin.min.js',
                    'wordcount': self.globalVariableFactory.siteUrl + 'build/scripts/external/tinymce/plugins/' + 'wordcount/plugin.min.js',
                    'code': self.globalVariableFactory.siteUrl + 'build/scripts/external/tinymce/plugins/' + 'code/plugin.min.js',
                    'table': self.globalVariableFactory.siteUrl + 'build/scripts/external/tinymce/plugins/' + 'table/plugin.min.js',
                    'paste': self.globalVariableFactory.siteUrl + 'build/scripts/external/tinymce/plugins/' + 'paste/plugin.min.js',
                },
                autoresize_bottom_margin: 0
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(baseController.prototype, "commonController", {
        get: function () {
            var self = this;
            var controller = self.getLoadedControllerByName('commonController');
            if (controller != null) {
                return controller.instance;
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    baseController.prototype.initializeVariables = function () {
        var self = this;
        self.initializeTemplate();
        self.pageSizeList = [
            { text: "10", value: 10 },
            { text: "20", value: 20 },
            { text: "30", value: 30 },
            { text: "50", value: 50 },
            { text: "100", value: 100 }
        ];
        self.pageSizeLargerList = [
            { text: "100", value: 100 },
            { text: "200", value: 200 },
            { text: "400", value: 400 }
        ];
        self.columnEnums =
            {};
        self.datePickersState = [];
        self.modeEnums = SCREEN_MODE;
        self.ckeditorOptions = {
            language: 'en',
            allowedContent: true,
            entities: false,
            readOnly: false
        };
        self.datepickerOptions = {
            showWeeks: false
        };
        self.confirmBtnColor = "";
        this.permissionEnum = permissions;
        this.preventFromNavigatingAwayIfSamePage();
        this.goToSectionWithOffsetIfSet();
    };
    baseController.prototype.getBaseLocation = function () {
        var self = this;
        if (window.localStorage.getItem("CenterLocation") == null) {
            var _geolocation = new geoLocation();
            navigator.geolocation.getCurrentPosition(function (location) {
                _geolocation.lat = location.coords.latitude;
                _geolocation.lng = location.coords.longitude;
                _geolocation.zoom = 10;
                window.localStorage.setItem("CenterLocation", JSON.stringify(_geolocation));
            }, function (error) {
                alert("Please enable location on browser");
            }, { timeout: 10000 });
        }
        else {
            var geoString = window.localStorage.getItem("CenterLocation");
            _geolocation = JSON.parse(geoString);
        }
        return _geolocation;
    };
    baseController.prototype.getLoadedControllerByName = function (controllerName) {
        var self = this;
        return Enumerable.From(self.loadedControllerInstances).Where(function (_listenerControllerInstance) {
            return _listenerControllerInstance.controllerName == controllerName;
        }).FirstOrDefault(null);
    };
    baseController.prototype.addLoadedControllerInstance = function (controllerInstance) {
        var self = this;
        self.loadedControllerInstances.push(controllerInstance);
        self.notifyListenersForLoadedController(controllerInstance);
    };
    baseController.prototype.notifyListenersForLoadedController = function (loadedControllerInstance) {
        var self = this;
        var listenerList = Enumerable.From(self.loadedControllerInstancesListeners).Where(function (listener) {
            return listener.controllerName == loadedControllerInstance.controllerName;
        }).FirstOrDefault(null);
        if (listenerList != null) {
            listenerList.listenerFunctions.forEach(function (listener) {
                listener.function(loadedControllerInstance.instance, listener.callerInstance);
            });
        }
    };
    baseController.prototype.addListenerToControllerInstance = function (controllerToListenName, listener) {
        var self = this;
        var controllerToListen = Enumerable.From(self.loadedControllerInstancesListeners).Where(function (controllerInstances) {
            return controllerInstances.controllerName == controllerToListenName;
        }).FirstOrDefault(null);
        if (controllerToListen == null) {
            controllerToListen = new controllerInstanceListenerDetail();
            controllerToListen.controllerName = controllerToListenName;
            controllerToListen.listenerFunctions = [listener];
            self.loadedControllerInstancesListeners.push(controllerToListen);
        }
        else {
            controllerToListen.listenerFunctions.push(listener);
        }
    };
    baseController.prototype.getOrAddToListenerControllerInstance = function (controllerToListenName, listener) {
        var self = this;
        var instance = Enumerable.From(self.loadedControllerInstances).Where(function (_listenerControllerInstance) {
            return _listenerControllerInstance.controllerName == controllerToListenName;
        }).FirstOrDefault(null);
        if (instance == null) {
            self.addListenerToControllerInstance(controllerToListenName, listener);
            return null;
        }
        else {
            return instance.instance;
        }
    };
    baseController.prototype.initializeTemplate = function () {
        var self = this;
    };
    baseController.prototype.saveTemplateLayout = function () {
        var self = this;
        self.$window.sessionStorage.setItem(CUSTOM_VARIABLES.LAYOUT, JSON.stringify(self.layoutCustomisation));
    };
    baseController.prototype.initFormWizard = function (form, validationForStep, controller) {
        var self = this;
        self.formWizard = {
            form: form,
            currentStep: 1,
            validationForStep: validationForStep,
            controller: controller
        };
    };
    baseController.prototype.formWizardNext = function () {
        var self = this;
        self.toTheTop();
        if (self.validateForm(self.formWizard.form) && self.execValidationsForStep(self.formWizard.currentStep)) {
            self.formWizardNextStep();
        }
    };
    baseController.prototype.formWizardPrevious = function () {
        var self = this;
        self.toTheTop();
        self.formWizardPrevStep();
    };
    baseController.prototype.formWizardGoTo = function (step) {
        var self = this;
        if ((self.formWizard.currentStep) > (step)) { //go back
            self.toTheTop();
            self.formWizardGoToStep(step);
        }
        else {
            if (self.validateForm(self.formWizard.form) && self.execValidationsForStep(self.formWizard.currentStep)) { //go next
                self.toTheTop();
                self.formWizardGoToStep(step);
            }
        }
    };
    baseController.prototype.formWizardSubmit = function () {
    };
    baseController.prototype.formWizardReset = function () {
    };
    baseController.prototype.formWizardNextStep = function () {
        var self = this;
        self.formWizard.currentStep++;
    };
    baseController.prototype.formWizardPrevStep = function () {
        var self = this;
        self.formWizard.currentStep--;
    };
    baseController.prototype.formWizardGoToStep = function (step) {
        var self = this;
        self.formWizard.currentStep = step;
    };
    baseController.prototype.execValidationsForStep = function (step) {
        var self = this;
        if (!self.isNullOrUndefined(self.formWizard.validationForStep) && !self.isNullOrUndefined(self.formWizard.validationForStep[step])) {
            for (var i = 0; i < self.formWizard.validationForStep[step].validations.length; i++) {
                var isCurrentValid = self.formWizard.validationForStep[step].validations[i](self.formWizard.controller);
                if (!isCurrentValid) {
                    return false;
                }
            }
        }
        return true;
    };
    baseController.prototype.toTheTop = function () {
        var self = this;
        self.$document.scrollTopAnimated(0, 600);
    };
    baseController.prototype.showFooter = function () {
        this.isFooterShown = true;
    };
    baseController.prototype.hideFooter = function () {
        this.isFooterShown = true;
    };
    baseController.prototype.showMessage = function (message, title, messageType, showCancelButton, okCallback, isHtml, okButtonText, cancelButttonText, cancelCallback, caller, params) {
        if (showCancelButton === void 0) { showCancelButton = false; }
        if (okCallback === void 0) { okCallback = null; }
        if (isHtml === void 0) { isHtml = false; }
        if (okButtonText === void 0) { okButtonText = "Ok"; }
        if (cancelButttonText === void 0) { cancelButttonText = "Cancel"; }
        if (cancelCallback === void 0) { cancelCallback = null; }
        if (caller === void 0) { caller = null; }
        if (params === void 0) { params = null; }
        var self = this;
        if (messageType == ALERT_MESSAGE_TYPE.ERROR && self.isNullOrUndefined(isHtml))
            isHtml = true;
        if (messageType == ALERT_MESSAGE_TYPE.WARNING || messageType == ALERT_MESSAGE_TYPE.ERROR) {
            self.confirmBtnColor = "#da4f4a";
        }
        else {
            self.confirmBtnColor = "#3b8a32 ";
        }
        self.SweetAlert.swal({
            title: title,
            text: message,
            type: messageType,
            showCancelButton: showCancelButton,
            confirmButtonColor: self.confirmBtnColor,
            confirmButtonText: okButtonText,
            cancelButtonText: cancelButttonText,
            html: isHtml
        }, function (isConfirm) {
            if (isConfirm) {
                if (okCallback != null)
                    okCallback(caller, params);
            }
            else {
                if (cancelCallback != null)
                    cancelCallback(caller);
            }
        });
    };
    baseController.prototype.showCustomModal = function (modalController, modalTemplateUrl, caller, dataToPass, onOk, onCancel, size, backdrop, cssClass, shouldShareSameScope, windowTopClass, scrollable) {
        if (size === void 0) { size = 'lg'; }
        if (backdrop === void 0) { backdrop = ''; }
        if (cssClass === void 0) { cssClass = ''; }
        if (shouldShareSameScope === void 0) { shouldShareSameScope = false; }
        if (windowTopClass === void 0) { windowTopClass = ''; }
        if (scrollable === void 0) { scrollable = false; }
        var self = this;
        var modalData = {
            animation: true,
            templateUrl: modalTemplateUrl,
            controller: modalController,
            size: size,
            backdrop: backdrop,
            windowClass: cssClass,
            windowTopClass: windowTopClass,
            scrollable: scrollable,
            resolve: {
                dataToPass: function () {
                    return dataToPass;
                },
                caller: function () {
                    return caller;
                },
                baseController: function () {
                    return self;
                }
            }
        };
        if (shouldShareSameScope) {
            modalData.scope = self.$scope;
        }
        var modalInstance = self.$uibModal.open(modalData);
        modalInstance.result.then(onOk, onCancel);
        return modalInstance;
    };
    baseController.prototype.showLoading = function () {
        var self = this;
        self.isLoadingShown = true;
        //if (self.modalInstanceForLoading == null) {
        //    self.modalInstanceForLoading = self.$uibModal.open({
        //        template: '<div class="modal-body modal-loading-body" ><img src="' + self.globalVariableFactory.cdnUrl + '/Images/loader.svg" style="width:125px;"></div>',
        //        backdrop: 'static',
        //        windowClass: 'loading-center-modal'
        //    });
        //}
    };
    baseController.prototype.hideLoading = function () {
        var self = this;
        self.isLoadingShown = false;
        //if (self.modalInstanceForLoading != null) {
        //    self.modalInstanceForLoading.close();
        //    self.modalInstanceForLoading = null;
        //}
    };
    baseController.prototype.showToast = function (toasterType, toasterTitle, toasterText) {
        if (toasterText === void 0) { toasterText = ""; }
        this.toaster.pop(toasterType, toasterTitle, toasterText);
    };
    baseController.prototype.isNullOrUndefined = function (val) {
        return angular.isUndefined(val) || val == null;
    };
    baseController.prototype.getAbbreviation = function (word) {
        return word.toUpperCase().match(/\b\w/g).join('');
    };
    baseController.prototype.validateForm = function (form) {
        var firstError = null;
        var isFormValid = true;
        if (form.$invalid) {
            var field = null, firstError = null;
            for (field in form) {
                if (field[0] != '$') {
                    if (firstError === null && !form[field].$valid) {
                        firstError = form[field].$name;
                        isFormValid = false;
                    }
                    if (form[field].$pristine) {
                        form[field].$dirty = true;
                    }
                }
            }
            angular.element('.ng-invalid[name=' + firstError + ']').focus();
            this.showMessage("Errors are marked with a red, dashed border!", "The form cannot be submitted because it contains validation errors!", ALERT_MESSAGE_TYPE.WARNING);
        }
        return isFormValid;
    };
    baseController.prototype.searchForEntityInList = function (entityIdName, list, comparisonCriteria, localIdName) {
        if (localIdName === void 0) { localIdName = null; }
        var hasEntityBeenFound = false;
        var positionOfEntity = null;
        list.some(function (value, index, array) {
            if (value[entityIdName] != null && value[entityIdName] != undefined && value[entityIdName] == comparisonCriteria[entityIdName]) {
                positionOfEntity = index;
                hasEntityBeenFound = true;
                return positionOfEntity;
            }
        });
        if ((localIdName != null && localIdName != undefined) || hasEntityBeenFound) {
            if (!hasEntityBeenFound) {
                positionOfEntity = this.searchForEntityInList(localIdName, list, comparisonCriteria);
                return positionOfEntity;
            }
            else {
                return positionOfEntity;
            }
        }
        else {
            return null;
        }
    };
    baseController.prototype.cloneObject = function (obj) {
        return JSON.parse(JSON.stringify(obj), dateParser.dateParserScreenMode);
    };
    baseController.prototype.generateUUID = function () {
        var d = new Date().getTime();
        if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
            d += performance.now(); //use high-precision timer if available
        }
        return 'xxxxxxxx_xxxx_4xxx_yxxx_xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    };
    baseController.prototype.toggleDatePicker = function (id) {
        var self = this;
        if (self.isNullOrUndefined(self.datePickersState[id])) {
            self.datePickersState[id] = true;
        }
        else {
            self.datePickersState[id] = !self.datePickersState[id];
        }
    };
    baseController.prototype.getFileExtension = function (fileName) {
        var self = this;
        var re = /(?:\.([^.]+))?$/;
        return re.exec(fileName)[1];
    };
    baseController.prototype.getFileNameWithoutExtension = function (fileName) {
        var self = this;
        return fileName.substring(0, fileName.lastIndexOf('.'));
    };
    baseController.prototype.redirectToUrlFromBase = function (url) {
        var self = this;
        self.$window.location = self.globalVariableFactory.baseServerUrl + "/" + url;
    };
    baseController.prototype.getRandomColorCode = function () {
        var self = this;
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };
    baseController.prototype.getClientSlug = function () {
        return window.location.host.split('.')[1] ? window.location.host.split('.')[0] : null;
    };
    baseController.prototype.getStorageForSessionData = function () {
        var self = this;
        return self.$window.localStorage;
    };
    baseController.prototype.getEditorOptions = function () {
        var self = this;
        return [
            ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre', 'quote'],
            ['bold', 'italics', 'underline', 'strikeThrough', 'ul', 'ol', 'redo', 'undo', 'clear'],
            ['justifyLeft', 'justifyCenter', 'justifyRight', 'indent', 'outdent'],
            ['html', 'insertImage', 'insertLink', 'insertVideo', 'wordcount', 'charcount']
        ];
    };
    baseController.prototype.formatToDateOnly = function (date) {
        var d = new Date(date), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        return [year, month, day].join('-');
    };
    baseController.prototype.uploadFile = function (file, ignoreFileSize) {
        if (ignoreFileSize === void 0) { ignoreFileSize = false; }
        var self = this;
        var deferred = self.q.defer();
        var shouldContinue = true;
        if (!self.isNullOrUndefined(file.size) && !ignoreFileSize) {
            var fileSize = file.size / (1024 * 1024);
            if ((file.size / (1024 * 1024)) > self.globalVariableFactory.maxFileSize) {
                deferred.reject("La taille du document n'est pas valide, le maximum est 800 Ko");
                shouldContinue = false;
            }
        }
        if (shouldContinue) {
            self.uploadService.upload({
                url: self.globalVariableFactory.baseServerUrlAndUpload,
                data: { fileToUpload: file }
            }).then(function (response) {
                deferred.resolve(response.data);
            }, function (response) {
                deferred.reject(response);
            }, function (evt) {
                //var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                //console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            });
        }
        return deferred.promise;
    };
    baseController.prototype.upload = function (file, objectContainer, isArray) {
        var self = this;
        if (self.isNullOrUndefined(file)) {
            return;
        }
        self.showLoading();
        self.uploadFile(file)
            .then(function (response) {
            self.hideLoading();
            var _pictureData = new pictureDataModel();
            _pictureData.idDocumentLocal = self.generateUUID();
            _pictureData.name = response.result.fileName;
            _pictureData.fileUrl = response.result.fileUrl;
            _pictureData.serverFilePath = response.result.serverFilePath;
            _pictureData.idServerFileParameter = response.result.idServerFileParameter;
            _pictureData.displayOrder = 1;
            if (isArray) {
                _pictureData.displayOrder = objectContainer.length + 1;
                objectContainer.push(_pictureData);
            }
            else {
                objectContainer.id = null;
                objectContainer.name = _pictureData.name;
                objectContainer.fileUrl = _pictureData.fileUrl;
                objectContainer.serverFilePath = _pictureData.serverFilePath;
                objectContainer.idServerFileParameter = _pictureData.idServerFileParameter;
            }
            self.$timeout(function () {
                self.$scope.$apply();
            });
        })
            .catch(function (response) {
            self.hideLoading();
            self.showToast(TOASTER_TYPE.ERROR, response);
        });
    };
    baseController.prototype.deleteImage = function (picture, pictureDataList, isArray) {
        var self = this;
        if (isArray) {
            console.log(picture);
            var position = self.searchForEntityInList("id", pictureDataList, picture, "idLocal");
            pictureDataList.splice(position, 1);
        }
        else {
            picture = null;
        }
    };
    baseController.prototype.checkIfImageIsSquare = function (fileObject) {
        var self = this;
        var deferred = self.q.defer();
        var isValid = true;
        var fileUpload = fileObject;
        if (typeof (fileUpload) != "undefined") {
            var reader = new FileReader();
            reader.readAsDataURL(fileUpload);
            reader.onload = function (e) {
                var image = new Image();
                image.src = e.target.result;
                image.onload = function () {
                    var _element = this;
                    var _height = _element.height;
                    var _width = _element.width;
                    if (_width >= _height + 20 || _width <= _height - 20) {
                        deferred.reject("La taille de l'image est incorrecte");
                    }
                    deferred.resolve(true);
                };
            };
        }
        else {
            deferred.reject("HTML5 unsuported");
        }
        return deferred.promise;
    };
    baseController.prototype.validateImage = function (fileObject, width, height) {
        if (width === void 0) { width = null; }
        if (height === void 0) { height = null; }
        var self = this;
        var deferred = self.q.defer();
        var isValid = true;
        var error = null;
        var fileUpload = fileObject;
        var regex = new RegExp("([a-zA-Z0-9\s_\\.\-:])+(.jpg|.png|.gif|jpeg|svg)$");
        if (regex.test(fileUpload.name.toLowerCase())) {
            if (typeof (fileUpload) != "undefined") {
                var reader = new FileReader();
                reader.readAsDataURL(fileUpload);
                reader.onload = function (e) {
                    var image = new Image();
                    image.src = e.target.result;
                    image.onload = function () {
                        var _element = this;
                        var _height = _element.height;
                        var _width = _element.width;
                        if (!self.isNullOrUndefined(width) && !eval(_width.toString() + ' ' + width)) {
                            deferred.reject("La taille de l'image est incorrecte");
                        }
                        if (!self.isNullOrUndefined(height) && !eval(_height.toString() + ' ' + height)) {
                            deferred.reject("La taille de l'image est incorrecte");
                        }
                        deferred.resolve(true);
                    };
                };
            }
            else {
                deferred.reject("HTML5 unsuported");
            }
        }
        else {
            deferred.reject("Le fichier téléchargé n'est pas une image");
        }
        //return {
        //    isValid: isValid,
        //    error: error
        //};
        return deferred.promise;
    };
    baseController.prototype.openImageModal = function (image, scope) {
        var self = this;
        self.globalVariableFactory.sessionVariables.putVariableInSessionSpace(sessionVariableSpaceEnum.SERVICE_PROVIDER_CONTROLLER, "CONTROLLER", self);
        self.globalVariableFactory.sessionVariables.putVariableInSessionSpace(sessionVariableSpaceEnum.TRANSFER, "IMAGEDATA", image);
        self.showCustomModal('', self.globalVariableFactory.baseServerUrl + 'imageModal', self, {
            $scope: scope,
        }, self.onOpenImageModalOk, function () { }, 'lg', '', '', true);
    };
    baseController.prototype.onOpenImageModalOk = function () {
    };
    baseController.prototype.goToSection = function (sectionId) {
        var self = this;
        if (self.$location.hash() !== sectionId) {
            self.$location.hash(sectionId);
        }
        else {
            self.$anchorScroll();
        }
    };
    baseController.prototype.goToSectionWithOffsetIfSet = function (idToNavigateTo) {
        if (idToNavigateTo === void 0) { idToNavigateTo = null; }
        var self = this;
        var paramValue = null;
        if (idToNavigateTo == null) {
            var currentUrl = new URL(window.location.href);
            var params = new URLSearchParams(currentUrl.search);
            paramValue = params.get("section");
        }
        else {
            paramValue = idToNavigateTo;
        }
        if (!self.isNullOrUndefined(paramValue)) {
            var section = document.getElementById(paramValue);
            if (!self.isNullOrUndefined(section)) {
                var scrollTop = 170; // window.innerWidth <= 991 ? 360 : 180;
                console.log(scrollTop);
                $('html, body').animate({
                    scrollTop: $("#" + paramValue).offset().top - scrollTop
                }, 1);
            }
        }
    };
    baseController.prototype.preventFromNavigatingAwayIfSamePage = function () {
        var self = this;
        // Get all anchor tags on the page
        var links = document.getElementsByClassName("service-provider-navigation");
        // Loop through each link
        for (var i = 0; i < links.length; i++) {
            // Add a click event listener to the link
            links[i].addEventListener("click", function (event) {
                // Check if the URL is the same
                var currentUrl = new URL(this.href);
                var paramSection = new URLSearchParams(currentUrl.search).get("section");
                if (!self.isNullOrUndefined(paramSection) && currentUrl.pathname === new URL(window.location.href).pathname) {
                    event.preventDefault();
                    self.goToSectionWithOffsetIfSet(paramSection);
                }
            });
        }
    };
    //This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
    baseController.prototype.calcCrow = function (lat1, lon1, lat2, lon2) {
        var self = this;
        var R = 6371; // km
        var dLat = self.toRad(lat2 - lat1);
        var dLon = self.toRad(lon2 - lon1);
        lat1 = self.toRad(lat1);
        lat2 = self.toRad(lat2);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d;
    };
    // Converts numeric degrees to radians
    baseController.prototype.toRad = function (Value) {
        return Value * Math.PI / 180;
    };
    baseController.prototype.isImage = function (fileUrl) {
        var self = this;
        if (!fileUrl)
            return false;
        // Check if the URL ends with common image extensions
        return /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i.test(fileUrl);
    };
    baseController.prototype.initializeMapIfAvailable = function (searchPlaceHolder, onPlaceSearchedCallerFunction, onPlaceSearchedCallerInstance) {
        var self = this;
        self.onPlaceSearchedCallerFunction = onPlaceSearchedCallerFunction;
        self.onPlaceSearchedCallerInstance = onPlaceSearchedCallerInstance;
        self.searchData.searchPlaceHolder = searchPlaceHolder;
        var searchPlaceholderElement = document.getElementById(searchPlaceHolder);
        self.autocomplete[searchPlaceHolder] = new google.maps.places.Autocomplete((document.getElementById(searchPlaceHolder)), {
            types: ['geocode'],
        });
        self.autocomplete[searchPlaceHolder].setComponentRestrictions({
            country: [
                "fr",
                "gp",
                "mq",
                "gf",
                "re",
                "pm",
                "yt",
                "nc",
                "pf",
                "mf",
                "tf"
            ],
        });
        self.autocomplete[searchPlaceHolder].addListener('place_changed', function () {
            self.onPlaceSearched();
        });
        google.maps.event.addDomListener(searchPlaceholderElement, 'keydown', function (event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                self.onPlaceSearched();
            }
        });
    };
    baseController.prototype.onPlaceSearched = function () {
        var self = this;
        var places = self.autocomplete[self.searchData.searchPlaceHolder].getPlace();
        self.searchData.selectedRegion = null;
        self.searchData.selectedCity = null;
        self.searchData.selectedPostalCode = null;
        self.searchData.selectedLatLng = null;
        if (!self.isNullOrUndefined(places.geometry) && !self.isNullOrUndefined(places.geometry.location)) {
            self.searchData.selectedLatLng = places.geometry.location.lat() + "," + places.geometry.location.lng();
        }
        if (self.isNullOrUndefined(places.address_components)) {
            self.showToast(TOASTER_TYPE.WARNING, "Veuillez réessayer");
            return;
        }
        else {
            self.searchData.selectedCity = Enumerable.From(places.address_components).Where(function (ac) {
                return ac.types.indexOf('locality') > -1;
            }).FirstOrDefault(null);
            self.searchData.selectedPostalCode = Enumerable.From(places.address_components).Where(function (ac) {
                return ac.types.indexOf('postal_code') > -1;
            }).FirstOrDefault(null);
            self.searchData.selectedRegion = Enumerable.From(places.address_components).Where(function (ac) {
                return ac.types.indexOf('administrative_area_level_1') > -1;
            }).FirstOrDefault(null);
        }
        console.log(self.searchData);
        if (!self.isNullOrUndefined(self.onPlaceSearchedCallerFunction) && !self.isNullOrUndefined(self.onPlaceSearchedCallerInstance)) {
            self.onPlaceSearchedCallerFunction(self.onPlaceSearchedCallerInstance);
        }
    };
    baseController.prototype.onSearchClicked = function () {
        var self = this;
        var region = "";
        var city = "";
        var postCode = "";
        var prestation = "";
        var latlng = "";
        if (!self.isNullOrUndefined(self.searchData.selectedRegion)) {
            region = self.searchData.selectedRegion.long_name;
        }
        if (!self.isNullOrUndefined(self.searchData.selectedCity)) {
            city = self.searchData.selectedCity.long_name;
        }
        else {
            var elment = document.getElementById("place-search-input");
            city = elment.value;
        }
        if (!self.isNullOrUndefined(self.searchData.selectedPostalCode)) {
            postCode = self.searchData.selectedPostalCode.long_name;
        }
        if (!self.isNullOrUndefined(self.searchData.selectedLatLng)) {
            latlng = self.searchData.selectedLatLng;
        }
        var selectedPrestation = Enumerable.From(self.searchData.selectedPrestation).Where(function (prestation) {
            return !self.isNullOrUndefined(prestation) && !self.isNullOrUndefined(prestation.id);
        }).ToArray();
        var selectedPrestationId = Enumerable.From(selectedPrestation).Select(function (prestation) {
            return prestation.id;
        }).ToArray();
        prestation = selectedPrestationId.join(",");
        window.location.href = "/search?region=" + region + "&city=" + city
            + "&postcode=" + postCode
            + "&prestation=" + prestation
            + "&latlng=" + latlng;
    };
    baseController.prototype.clearAllSearches = function () {
        var self = this;
        self.searchData.selectedPostalCode = null;
        self.searchData.selectedCity = null;
        self.searchData.selectedPrestation = [];
    };
    baseController.prototype.areFiltersActive = function () {
        var self = this;
        return self.searchData.selectedPostalCode != null ||
            self.searchData.selectedCity != null ||
            self.searchData.selectedPrestation.length > 0;
    };
    baseController.prototype.getMyLocation = function () {
        var self = this;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var lat = position.coords.latitude;
                var lng = position.coords.longitude;
                self.searchData.selectedLatLng = lat + "," + lng;
                self.onSearchClicked();
            });
        }
        else {
            self.showToast(TOASTER_TYPE.WARNING, "Votre navigateur n'a pas cette fonctionalite");
        }
    };
    return baseController;
}());

var baseModule = angular.module("baseModule", [
    ,
    'ngAnimate',
    'toaster',
    'oitozero.ngSweetAlert',
    'ngCookies',
    'ngStorage',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'ngFileUpload',
    'ngMap',
    'ui.select',
    'dndLists'
]);
baseModule.service("globalVariableFactory", [
    '$rootScope',
    '$window',
    globalVariableFactory
]);
baseModule.service("genericWebConnectionService", ["$http",
    "$window",
    "$q",
    "globalVariableFactory",
    genericWebConnectionService
]);
baseModule.controller("baseController", ["$scope",
    "$rootScope",
    "$location",
    "$anchorScroll",
    "$localStorage",
    "$window",
    "$timeout",
    "$uibModal",
    "$q",
    "$document",
    "$parse",
    "SweetAlert",
    "toaster",
    "globalVariableFactory",
    "Upload",
    baseController
]);
baseModule.directive('resize', ['$rootScope', '$window', function ($rootScope, $window) {
        return {
            link: function (scope, element, attrs) {
                function onResize(e) {
                    $rootScope.$broadcast('resize::resize');
                }
                function cleanUp() {
                    angular.element($window).off('resize', onResize);
                }
                angular.element($window).on('resize', onResize);
                scope.$on('$destroy', cleanUp);
            }
        };
    }]);
baseModule.directive("disableAnimate", ['$animate', function ($animate) {
        return function (scope, element) {
            $animate.enabled(false, element);
        };
    }]);
baseModule.directive('refreshOnUpload', ['$timeout', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                scope.$watch(attrs['ngModel'], function (v) {
                    if (elem.width() > 0) {
                        elem.css('width', elem.width() + 'px');
                    }
                });
            }
        };
    }]);
baseModule.run(['$rootScope',
    function ($rootScope) {
        //FastClick.attach(document.body);
        // GLOBAL APP SCOPE
        // set below basic information
        $rootScope.app = {
            name: 'The Hub',
            author: 'The Hub Business Solutions Ltd',
            description: '',
            version: '2.0',
            year: ((new Date()).getFullYear()),
            isMobile: (function () {
                var check = false;
                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                    check = true;
                }
                ;
                return check;
            })()
        };
    }]);
baseModule.constant('APP_MEDIAQUERY', {
    'desktopXL': 1200,
    'desktop': 992,
    'tablet': 768,
    'mobile': 480
});
baseModule.filter("trustUrl", ['$sce', function ($sce) {
        return function (recordingUrl) {
            return $sce.trustAsResourceUrl(recordingUrl);
        };
    }]);
baseModule.filter('minLength', function () {
    return function (input, len, pad) {
        input = input.toString();
        if (input.length >= len)
            return input;
        else {
            pad = (pad || 0).toString();
            return new Array(1 + len - input.length).join(pad) + input;
        }
    };
});
baseModule.factory("authInterceptor", ["$rootScope", "$q", "$window", function ($rootScope, $q, $window) { return new authInterceptorFactory($rootScope, $q, $window); }]);
baseModule.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    }]);
baseModule.config(['$sceProvider', function ($sceProvider) {
        $sceProvider.enabled(false);
    }]);
baseModule.config(function ($interpolateProvider) {
    $interpolateProvider.startSymbol('[[').endSymbol(']]');
});
baseModule.directive('multiselectDropdown', function () {
    return {
        restrict: 'E',
        scope: {
            model: '=',
            options: '=',
            placeholder: '=',
            clickId: '='
        },
        template: "<div class='advanced-search-select-container dropdown'>" +
            "<button class='form-control bg-white-blue-color black-color dropdown-toggle' data-bs-toggle='dropdown'>{{placeholder}}</button>" +
            "<ul class='dropdown-menu max-height-menu' aria-labelledby='dropdownMenu' style='position: relative;'>" +
            "<li style='cursor:pointer;' data-ng-repeat='option in options' class='list-item-text'><a data-ng-click='toggleSelectItem(option,$event)'><span data-ng-class='getClassName(option)' class='top-align' aria-hidden='true'></span> <span class='list-item-text'>{{option.name}}</span> </a></li>" +
            "</ul>" +
            "</div>",
        controller: function ($scope) {
            $scope.openDropdown = function () {
                $scope.open = !$scope.open;
            };
            $scope.selectAll = function () {
                $scope.model = [];
                angular.forEach($scope.options, function (item, index) {
                    $scope.model.push(item);
                });
            };
            $scope.deselectAll = function () {
                $scope.model = [];
            };
            $scope.toggleSelectItem = function (option, event) {
                event.stopPropagation();
                var intIndex = -1;
                angular.forEach($scope.model, function (item, index) {
                    if (item.id == option.id) {
                        intIndex = index;
                    }
                });
                if (intIndex >= 0) {
                    $scope.model.splice(intIndex, 1);
                }
                else {
                    $scope.model.push(option);
                }
                $scope.$emit("filterSelectClicked", $scope.clickId);
                if ($scope.clickId != null && $scope != undefined) {
                }
            };
            $scope.getClassName = function (option) {
                var varClassName = 'bi bi-square'; //not selected
                angular.forEach($scope.model, function (item, index) {
                    if (item.id == option.id) {
                        varClassName = 'bi bi-square-fill';
                    }
                });
                return (varClassName);
            };
        }
    };
});

var baseWebService = /** @class */ (function () {
    function baseWebService(genericWebConnectionService, saveUrl, loadUrl, deleteUrl) {
        if (saveUrl === void 0) { saveUrl = ""; }
        if (loadUrl === void 0) { loadUrl = ""; }
        if (deleteUrl === void 0) { deleteUrl = ""; }
        this.genericWebConnectionService = genericWebConnectionService;
        this.saveUrl = saveUrl;
        this.loadUrl = loadUrl;
        this.deleteUrl = deleteUrl;
    }
    baseWebService.prototype.saveItem = function (data) {
        return this.genericWebConnectionService.postRequest(this.saveUrl, data);
    };
    baseWebService.prototype.loadList = function (data) {
        return this.genericWebConnectionService.postRequest(this.loadUrl, data);
    };
    baseWebService.prototype.deleteItem = function (data) {
        return this.genericWebConnectionService.postRequest(this.deleteUrl, data);
    };
    return baseWebService;
}());

var commonWebService = /** @class */ (function () {
    function commonWebService(genericWebConnectionService, globalVariableFactory) {
        this.genericWebConnectionService = genericWebConnectionService;
        this.globalVariableFactory = globalVariableFactory;
    }
    return commonWebService;
}());

var commonModule = angular.module("commonModule", []);
commonModule.service("commonWebService", ["genericWebConnectionService",
    "globalVariableFactory",
    commonWebService]);
baseModule.requires.push("commonModule");

/*!
    * Start Bootstrap - SB Admin Pro v2.0.3 (https://shop.startbootstrap.com/product/sb-admin-pro)
    * Copyright 2013-2021 Start Bootstrap
    * Licensed under SEE_LICENSE (https://github.com/StartBootstrap/sb-admin-pro/blob/master/LICENSE)
    */
window.addEventListener('DOMContentLoaded', event => {
    if (typeof feather !== 'undefined') {
        // Activate feather
        feather.replace();
    }

    // Enable tooltips globally
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Enable popovers globally
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });


$(function () {
    angular.element(function () {
        angular.bootstrap(document, ['baseModule']);
    });
})

function requestFullscreenAndLockOrientation(orientation) {
    // First, request fullscreen
    const docEl = document.documentElement;
    if (docEl.requestFullscreen) {
        docEl.requestFullscreen().then(() => {
            // Once in fullscreen, attempt to lock the orientation
            lockOrientation(orientation);
        }).catch((error) => {
            console.warn(`Fullscreen request error: ${error}`);
        });
    } else {
        console.warn("Fullscreen API not supported");
    }
}

// Function to lock the screen orientation
function lockOrientation(orientation) {
    // Check if the screen.orientation and lock method are supported by the browser
    if (screen.orientation && screen.orientation.lock) {
        // Request to lock the screen orientation to the specified orientation
        screen.orientation.lock(orientation).then(() => {
            console.log(`Orientation locked to ${orientation}`);
        }).catch((error) => {
            console.warn(`Orientation lock error: ${error}`);
        });
    } else {
        console.warn("Screen orientation API not supported");
    }
}

requestFullscreenAndLockOrientation();
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

var imageModalController = /** @class */ (function () {
    function imageModalController($scope) {
        var self = this;
        $scope.controller = this;
        this.callerController = $scope.$parent.controller;
        this.scope = $scope;
        this.baseController = this.scope.baseController;
        this.initVariables();
        this.initialize();
    }
    imageModalController.prototype.initVariables = function () {
        var self = this;
    };
    imageModalController.prototype.initialize = function () {
        var self = this;
        self.imageData = self.baseController.globalVariableFactory.sessionVariables.getVariableFromSessionSpace(sessionVariableSpaceEnum.TRANSFER, "IMAGEDATA");
    };
    imageModalController.prototype.onOkToModal = function () {
        var self = this;
        //self.baseController.globalVariableFactory.sessionVariables.putVariableInSessionSpace(sessionVariableSpaceEnum.TRANSFER, "RECONCILEBANKORDER", self.reconcileBankOrderViewModel)
        self.scope.$close(self.baseController.globalVariableFactory.sessionVariables);
    };
    imageModalController.prototype.onCancelToModal = function () {
        var self = this;
        self.scope.$dismiss();
    };
    return imageModalController;
}());
commonModule.controller("imageModalController", ["$scope",
    imageModalController
]);

var headerController = /** @class */ (function () {
    function headerController($scope, commonWebService) {
        this.sharedItem = {};
        $scope.headerController = this;
        this.$scope = $scope;
        this.baseController = this.$scope.baseController;
        this.commonWebService = commonWebService;
        this.initVariables();
    }
    headerController.prototype.initVariables = function () {
        var self = this;
    };
    headerController.prototype.setInfo = function () {
        var self = this;
        var controllerInstance = new controllerInstanceDetail();
        controllerInstance.controllerName = "headerController";
        controllerInstance.instance = self;
        self.baseController.addLoadedControllerInstance(controllerInstance);
        self.setCommonControllerInstance();
    };
    headerController.prototype.setCommonControllerInstance = function () {
        var self = this;
        var _controllerInstanceListenerFunctionDetail = new controllerInstanceListenerFunctionDetail();
        _controllerInstanceListenerFunctionDetail.callerInstance = self;
        _controllerInstanceListenerFunctionDetail.function = self.assignCommonControllerOnloaded;
        var commonControllerInstance = self.baseController.getOrAddToListenerControllerInstance("commonController", _controllerInstanceListenerFunctionDetail);
        if (commonControllerInstance != null) {
            self.assignCommonControllerOnloaded(commonControllerInstance, self);
        }
    };
    headerController.prototype.assignCommonControllerOnloaded = function (commonControllerInstance, self) {
        self.commonController = commonControllerInstance;
    };
    headerController.prototype.logout = function () {
        var self = this;
        self.commonController.logout();
    };
    return headerController;
}());
commonModule.controller("headerController", ["$scope",
    "commonWebService",
    headerController
]);

// ==ClosureCompiler==
// @compilation_level ADVANCED_OPTIMIZATIONS
// @externs_url https://raw.githubusercontent.com/google/closure-compiler/master/contrib/externs/maps/google_maps_api_v3.js
// ==/ClosureCompiler==

/**
 * @name MarkerClusterer for Google Maps v3
 * @version version 1.0
 * @author Luke Mahe
 * @fileoverview
 * The library creates and manages per-zoom-level clusters for large amounts of
 * markers.
 * <br/>
 * This is a v3 implementation of the
 * <a href="http://gmaps-utility-library-dev.googlecode.com/svn/tags/markerclusterer/"
 * >v2 MarkerClusterer</a>.
 */

/**
 * @license
 * Copyright 2010 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


/**
 * A Marker Clusterer that clusters markers.
 *
 * @param {google.maps.Map} map The Google map to attach to.
 * @param {Array.<google.maps.Marker>=} opt_markers Optional markers to add to
 *   the cluster.
 * @param {Object=} opt_options support the following options:
 *     'gridSize': (number) The grid size of a cluster in pixels.
 *     'maxZoom': (number) The maximum zoom level that a marker can be part of a
 *                cluster.
 *     'zoomOnClick': (boolean) Whether the default behaviour of clicking on a
 *                    cluster is to zoom into it.
 *     'averageCenter': (boolean) Whether the center of each cluster should be
 *                      the average of all markers in the cluster.
 *     'minimumClusterSize': (number) The minimum number of markers to be in a
 *                           cluster before the markers are hidden and a count
 *                           is shown.
 *     'styles': (object) An object that has style properties:
 *       'url': (string) The image url.
 *       'height': (number) The image height.
 *       'width': (number) The image width.
 *       'anchor': (Array) The anchor position of the label text.
 *       'textColor': (string) The text color.
 *       'textSize': (number) The text size.
 *       'backgroundPosition': (string) The position of the backgound x, y.
 *       'iconAnchor': (Array) The anchor position of the icon x, y.
 * @constructor
 * @extends google.maps.OverlayView
 */
function MarkerClusterer(map, opt_markers, opt_options) {
    // MarkerClusterer implements google.maps.OverlayView interface. We use the
    // extend function to extend MarkerClusterer with google.maps.OverlayView
    // because it might not always be available when the code is defined so we
    // look for it at the last possible moment. If it doesn't exist now then
    // there is no point going ahead :)
    this.extend(MarkerClusterer, google.maps.OverlayView);
    this.map_ = map;

    /**
     * @type {Array.<google.maps.Marker>}
     * @private
     */
    this.markers_ = [];

    /**
     *  @type {Array.<Cluster>}
     */
    this.clusters_ = [];

    this.sizes = [53, 56, 66, 78, 90];

    /**
     * @private
     */
    this.styles_ = [];

    /**
     * @type {boolean}
     * @private
     */
    this.ready_ = false;

    var options = opt_options || {};

    /**
     * @type {number}
     * @private
     */
    this.gridSize_ = options['gridSize'] || 60;

    /**
     * @private
     */
    this.minClusterSize_ = options['minimumClusterSize'] || 2;


    /**
     * @type {?number}
     * @private
     */
    this.maxZoom_ = options['maxZoom'] || null;

    this.styles_ = options['styles'] || [];

    /**
     * @type {string}
     * @private
     */
    this.imagePath_ = options['imagePath'] ||
        this.MARKER_CLUSTER_IMAGE_PATH_;

    /**
     * @type {string}
     * @private
     */
    this.imageExtension_ = options['imageExtension'] ||
        this.MARKER_CLUSTER_IMAGE_EXTENSION_;

    /**
     * @type {boolean}
     * @private
     */
    this.zoomOnClick_ = true;

    if (options['zoomOnClick'] != undefined) {
        this.zoomOnClick_ = options['zoomOnClick'];
    }

    /**
     * @type {boolean}
     * @private
     */
    this.averageCenter_ = false;

    if (options['averageCenter'] != undefined) {
        this.averageCenter_ = options['averageCenter'];
    }

    this.setupStyles_();

    this.setMap(map);

    /**
     * @type {number}
     * @private
     */
    this.prevZoom_ = this.map_.getZoom();

    // Add the map event listeners
    var that = this;
    google.maps.event.addListener(this.map_, 'zoom_changed', function () {
        var zoom = that.map_.getZoom();

        if (that.prevZoom_ != zoom) {
            that.prevZoom_ = zoom;
            that.resetViewport();
        }
    });

    google.maps.event.addListener(this.map_, 'idle', function () {
        that.redraw();
    });

    // Finally, add the markers
    if (opt_markers && opt_markers.length) {
        this.addMarkers(opt_markers, false);
    }
}


/**
 * The marker cluster image path.
 *
 * @type {string}
 * @private
 */
MarkerClusterer.prototype.MARKER_CLUSTER_IMAGE_PATH_ = '../images/m';


/**
 * The marker cluster image path.
 *
 * @type {string}
 * @private
 */
MarkerClusterer.prototype.MARKER_CLUSTER_IMAGE_EXTENSION_ = 'png';


/**
 * Extends a objects prototype by anothers.
 *
 * @param {Object} obj1 The object to be extended.
 * @param {Object} obj2 The object to extend with.
 * @return {Object} The new extended object.
 * @ignore
 */
MarkerClusterer.prototype.extend = function (obj1, obj2) {
    return (function (object) {
        for (var property in object.prototype) {
            this.prototype[property] = object.prototype[property];
        }
        return this;
    }).apply(obj1, [obj2]);
};


/**
 * Implementaion of the interface method.
 * @ignore
 */
MarkerClusterer.prototype.onAdd = function () {
    this.setReady_(true);
};

/**
 * Implementaion of the interface method.
 * @ignore
 */
MarkerClusterer.prototype.draw = function () { };

/**
 * Sets up the styles object.
 *
 * @private
 */
MarkerClusterer.prototype.setupStyles_ = function () {
    if (this.styles_.length) {
        return;
    }

    for (var i = 0, size; size = this.sizes[i]; i++) {
        this.styles_.push({
            url: this.imagePath_ + (i + 1) + '.' + this.imageExtension_,
            height: size,
            width: size
        });
    }
};

/**
 *  Fit the map to the bounds of the markers in the clusterer.
 */
MarkerClusterer.prototype.fitMapToMarkers = function () {
    var markers = this.getMarkers();
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0, marker; marker = markers[i]; i++) {
        bounds.extend(marker.getPosition());
    }

    this.map_.fitBounds(bounds);
};


/**
 *  Sets the styles.
 *
 *  @param {Object} styles The style to set.
 */
MarkerClusterer.prototype.setStyles = function (styles) {
    this.styles_ = styles;
};


/**
 *  Gets the styles.
 *
 *  @return {Object} The styles object.
 */
MarkerClusterer.prototype.getStyles = function () {
    return this.styles_;
};


/**
 * Whether zoom on click is set.
 *
 * @return {boolean} True if zoomOnClick_ is set.
 */
MarkerClusterer.prototype.isZoomOnClick = function () {
    return this.zoomOnClick_;
};

/**
 * Whether average center is set.
 *
 * @return {boolean} True if averageCenter_ is set.
 */
MarkerClusterer.prototype.isAverageCenter = function () {
    return this.averageCenter_;
};


/**
 *  Returns the array of markers in the clusterer.
 *
 *  @return {Array.<google.maps.Marker>} The markers.
 */
MarkerClusterer.prototype.getMarkers = function () {
    return this.markers_;
};


/**
 *  Returns the number of markers in the clusterer
 *
 *  @return {Number} The number of markers.
 */
MarkerClusterer.prototype.getTotalMarkers = function () {
    return this.markers_.length;
};


/**
 *  Sets the max zoom for the clusterer.
 *
 *  @param {number} maxZoom The max zoom level.
 */
MarkerClusterer.prototype.setMaxZoom = function (maxZoom) {
    this.maxZoom_ = maxZoom;
};


/**
 *  Gets the max zoom for the clusterer.
 *
 *  @return {number} The max zoom level.
 */
MarkerClusterer.prototype.getMaxZoom = function () {
    return this.maxZoom_;
};


/**
 *  The function for calculating the cluster icon image.
 *
 *  @param {Array.<google.maps.Marker>} markers The markers in the clusterer.
 *  @param {number} numStyles The number of styles available.
 *  @return {Object} A object properties: 'text' (string) and 'index' (number).
 *  @private
 */
MarkerClusterer.prototype.calculator_ = function (markers, numStyles) {
    var index = 0;
    var count = markers.length;
    var dv = count;
    while (dv !== 0) {
        dv = parseInt(dv / 10, 10);
        index++;
    }

    index = Math.min(index, numStyles);
    return {
        text: count,
        index: index
    };
};


/**
 * Set the calculator function.
 *
 * @param {function(Array, number)} calculator The function to set as the
 *     calculator. The function should return a object properties:
 *     'text' (string) and 'index' (number).
 *
 */
MarkerClusterer.prototype.setCalculator = function (calculator) {
    this.calculator_ = calculator;
};


/**
 * Get the calculator function.
 *
 * @return {function(Array, number)} the calculator function.
 */
MarkerClusterer.prototype.getCalculator = function () {
    return this.calculator_;
};


/**
 * Add an array of markers to the clusterer.
 *
 * @param {Array.<google.maps.Marker>} markers The markers to add.
 * @param {boolean=} opt_nodraw Whether to redraw the clusters.
 */
MarkerClusterer.prototype.addMarkers = function (markers, opt_nodraw) {
    for (var i = 0, marker; marker = markers[i]; i++) {
        this.pushMarkerTo_(marker);
    }
    if (!opt_nodraw) {
        this.redraw();
    }
};


/**
 * Pushes a marker to the clusterer.
 *
 * @param {google.maps.Marker} marker The marker to add.
 * @private
 */
MarkerClusterer.prototype.pushMarkerTo_ = function (marker) {
    marker.isAdded = false;
    if (marker['draggable']) {
        // If the marker is draggable add a listener so we update the clusters on
        // the drag end.
        var that = this;
        google.maps.event.addListener(marker, 'dragend', function () {
            marker.isAdded = false;
            that.repaint();
        });
    }
    this.markers_.push(marker);
};


/**
 * Adds a marker to the clusterer and redraws if needed.
 *
 * @param {google.maps.Marker} marker The marker to add.
 * @param {boolean=} opt_nodraw Whether to redraw the clusters.
 */
MarkerClusterer.prototype.addMarker = function (marker, opt_nodraw) {
    this.pushMarkerTo_(marker);
    if (!opt_nodraw) {
        this.redraw();
    }
};


/**
 * Removes a marker and returns true if removed, false if not
 *
 * @param {google.maps.Marker} marker The marker to remove
 * @return {boolean} Whether the marker was removed or not
 * @private
 */
MarkerClusterer.prototype.removeMarker_ = function (marker) {
    var index = -1;
    if (this.markers_.indexOf) {
        index = this.markers_.indexOf(marker);
    } else {
        for (var i = 0, m; m = this.markers_[i]; i++) {
            if (m == marker) {
                index = i;
                break;
            }
        }
    }

    if (index == -1) {
        // Marker is not in our list of markers.
        return false;
    }

    marker.setMap(null);

    this.markers_.splice(index, 1);

    return true;
};


/**
 * Remove a marker from the cluster.
 *
 * @param {google.maps.Marker} marker The marker to remove.
 * @param {boolean=} opt_nodraw Optional boolean to force no redraw.
 * @return {boolean} True if the marker was removed.
 */
MarkerClusterer.prototype.removeMarker = function (marker, opt_nodraw) {
    var removed = this.removeMarker_(marker);

    if (!opt_nodraw && removed) {
        this.resetViewport();
        this.redraw();
        return true;
    } else {
        return false;
    }
};


/**
 * Removes an array of markers from the cluster.
 *
 * @param {Array.<google.maps.Marker>} markers The markers to remove.
 * @param {boolean=} opt_nodraw Optional boolean to force no redraw.
 */
MarkerClusterer.prototype.removeMarkers = function (markers, opt_nodraw) {
    var removed = false;

    for (var i = 0, marker; marker = markers[i]; i++) {
        var r = this.removeMarker_(marker);
        removed = removed || r;
    }

    if (!opt_nodraw && removed) {
        this.resetViewport();
        this.redraw();
        return true;
    }
};


/**
 * Sets the clusterer's ready state.
 *
 * @param {boolean} ready The state.
 * @private
 */
MarkerClusterer.prototype.setReady_ = function (ready) {
    if (!this.ready_) {
        this.ready_ = ready;
        this.createClusters_();
    }
};


/**
 * Returns the number of clusters in the clusterer.
 *
 * @return {number} The number of clusters.
 */
MarkerClusterer.prototype.getTotalClusters = function () {
    return this.clusters_.length;
};


/**
 * Returns the google map that the clusterer is associated with.
 *
 * @return {google.maps.Map} The map.
 */
MarkerClusterer.prototype.getMap = function () {
    return this.map_;
};


/**
 * Sets the google map that the clusterer is associated with.
 *
 * @param {google.maps.Map} map The map.
 */
MarkerClusterer.prototype.setMap = function (map) {
    this.map_ = map;
};


/**
 * Returns the size of the grid.
 *
 * @return {number} The grid size.
 */
MarkerClusterer.prototype.getGridSize = function () {
    return this.gridSize_;
};


/**
 * Sets the size of the grid.
 *
 * @param {number} size The grid size.
 */
MarkerClusterer.prototype.setGridSize = function (size) {
    this.gridSize_ = size;
};


/**
 * Returns the min cluster size.
 *
 * @return {number} The grid size.
 */
MarkerClusterer.prototype.getMinClusterSize = function () {
    return this.minClusterSize_;
};

/**
 * Sets the min cluster size.
 *
 * @param {number} size The grid size.
 */
MarkerClusterer.prototype.setMinClusterSize = function (size) {
    this.minClusterSize_ = size;
};


/**
 * Extends a bounds object by the grid size.
 *
 * @param {google.maps.LatLngBounds} bounds The bounds to extend.
 * @return {google.maps.LatLngBounds} The extended bounds.
 */
MarkerClusterer.prototype.getExtendedBounds = function (bounds) {
    var projection = this.getProjection();

    // Turn the bounds into latlng.
    var tr = new google.maps.LatLng(bounds.getNorthEast().lat(),
        bounds.getNorthEast().lng());
    var bl = new google.maps.LatLng(bounds.getSouthWest().lat(),
        bounds.getSouthWest().lng());

    // Convert the points to pixels and the extend out by the grid size.
    var trPix = projection.fromLatLngToDivPixel(tr);
    trPix.x += this.gridSize_;
    trPix.y -= this.gridSize_;

    var blPix = projection.fromLatLngToDivPixel(bl);
    blPix.x -= this.gridSize_;
    blPix.y += this.gridSize_;

    // Convert the pixel points back to LatLng
    var ne = projection.fromDivPixelToLatLng(trPix);
    var sw = projection.fromDivPixelToLatLng(blPix);

    // Extend the bounds to contain the new bounds.
    bounds.extend(ne);
    bounds.extend(sw);

    return bounds;
};


/**
 * Determins if a marker is contained in a bounds.
 *
 * @param {google.maps.Marker} marker The marker to check.
 * @param {google.maps.LatLngBounds} bounds The bounds to check against.
 * @return {boolean} True if the marker is in the bounds.
 * @private
 */
MarkerClusterer.prototype.isMarkerInBounds_ = function (marker, bounds) {
    return bounds.contains(marker.getPosition());
};


/**
 * Clears all clusters and markers from the clusterer.
 */
MarkerClusterer.prototype.clearMarkers = function () {
    this.resetViewport(true);

    // Set the markers a empty array.
    this.markers_ = [];
};


/**
 * Clears all existing clusters and recreates them.
 * @param {boolean} opt_hide To also hide the marker.
 */
MarkerClusterer.prototype.resetViewport = function (opt_hide) {
    // Remove all the clusters
    for (var i = 0, cluster; cluster = this.clusters_[i]; i++) {
        cluster.remove();
    }

    // Reset the markers to not be added and to be invisible.
    for (var i = 0, marker; marker = this.markers_[i]; i++) {
        marker.isAdded = false;
        if (opt_hide) {
            marker.setMap(null);
        }
    }

    this.clusters_ = [];
};

/**
 *
 */
MarkerClusterer.prototype.repaint = function () {
    var oldClusters = this.clusters_.slice();
    this.clusters_.length = 0;
    this.resetViewport();
    this.redraw();

    // Remove the old clusters.
    // Do it in a timeout so the other clusters have been drawn first.
    window.setTimeout(function () {
        for (var i = 0, cluster; cluster = oldClusters[i]; i++) {
            cluster.remove();
        }
    }, 0);
};


/**
 * Redraws the clusters.
 */
MarkerClusterer.prototype.redraw = function () {
    this.createClusters_();
};


/**
 * Calculates the distance between two latlng locations in km.
 * @see http://www.movable-type.co.uk/scripts/latlong.html
 *
 * @param {google.maps.LatLng} p1 The first lat lng point.
 * @param {google.maps.LatLng} p2 The second lat lng point.
 * @return {number} The distance between the two points in km.
 * @private
*/
MarkerClusterer.prototype.distanceBetweenPoints_ = function (p1, p2) {
    if (!p1 || !p2) {
        return 0;
    }

    var R = 6371; // Radius of the Earth in km
    var dLat = (p2.lat() - p1.lat()) * Math.PI / 180;
    var dLon = (p2.lng() - p1.lng()) * Math.PI / 180;
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(p1.lat() * Math.PI / 180) * Math.cos(p2.lat() * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
};


/**
 * Add a marker to a cluster, or creates a new cluster.
 *
 * @param {google.maps.Marker} marker The marker to add.
 * @private
 */
MarkerClusterer.prototype.addToClosestCluster_ = function (marker) {
    var distance = 40000; // Some large number
    var clusterToAddTo = null;
    var pos = marker.getPosition();
    for (var i = 0, cluster; cluster = this.clusters_[i]; i++) {
        var center = cluster.getCenter();
        if (center) {
            var d = this.distanceBetweenPoints_(center, marker.getPosition());
            if (d < distance) {
                distance = d;
                clusterToAddTo = cluster;
            }
        }
    }

    if (clusterToAddTo && clusterToAddTo.isMarkerInClusterBounds(marker)) {
        clusterToAddTo.addMarker(marker);
    } else {
        var cluster = new Cluster(this);
        cluster.addMarker(marker);
        this.clusters_.push(cluster);
    }
};


/**
 * Creates the clusters.
 *
 * @private
 */
MarkerClusterer.prototype.createClusters_ = function () {
    if (!this.ready_) {
        return;
    }

    // Get our current map view bounds.
    // Create a new bounds object so we don't affect the map.
    var mapBounds = new google.maps.LatLngBounds(this.map_.getBounds().getSouthWest(),
        this.map_.getBounds().getNorthEast());
    var bounds = this.getExtendedBounds(mapBounds);

    for (var i = 0, marker; marker = this.markers_[i]; i++) {
        if (!marker.isAdded && this.isMarkerInBounds_(marker, bounds)) {
            this.addToClosestCluster_(marker);
        }
    }
};


/**
 * A cluster that contains markers.
 *
 * @param {MarkerClusterer} markerClusterer The markerclusterer that this
 *     cluster is associated with.
 * @constructor
 * @ignore
 */
function Cluster(markerClusterer) {
    this.markerClusterer_ = markerClusterer;
    this.map_ = markerClusterer.getMap();
    this.gridSize_ = markerClusterer.getGridSize();
    this.minClusterSize_ = markerClusterer.getMinClusterSize();
    this.averageCenter_ = markerClusterer.isAverageCenter();
    this.center_ = null;
    this.markers_ = [];
    this.bounds_ = null;
    this.clusterIcon_ = new ClusterIcon(this, markerClusterer.getStyles(),
        markerClusterer.getGridSize());
}

/**
 * Determins if a marker is already added to the cluster.
 *
 * @param {google.maps.Marker} marker The marker to check.
 * @return {boolean} True if the marker is already added.
 */
Cluster.prototype.isMarkerAlreadyAdded = function (marker) {
    if (this.markers_.indexOf) {
        return this.markers_.indexOf(marker) != -1;
    } else {
        for (var i = 0, m; m = this.markers_[i]; i++) {
            if (m == marker) {
                return true;
            }
        }
    }
    return false;
};


/**
 * Add a marker the cluster.
 *
 * @param {google.maps.Marker} marker The marker to add.
 * @return {boolean} True if the marker was added.
 */
Cluster.prototype.addMarker = function (marker) {
    if (this.isMarkerAlreadyAdded(marker)) {
        return false;
    }

    if (!this.center_) {
        this.center_ = marker.getPosition();
        this.calculateBounds_();
    } else {
        if (this.averageCenter_) {
            var l = this.markers_.length + 1;
            var lat = (this.center_.lat() * (l - 1) + marker.getPosition().lat()) / l;
            var lng = (this.center_.lng() * (l - 1) + marker.getPosition().lng()) / l;
            this.center_ = new google.maps.LatLng(lat, lng);
            this.calculateBounds_();
        }
    }

    marker.isAdded = true;
    this.markers_.push(marker);

    var len = this.markers_.length;
    if (len < this.minClusterSize_ && marker.getMap() != this.map_) {
        // Min cluster size not reached so show the marker.
        marker.setMap(this.map_);
    }

    if (len == this.minClusterSize_) {
        // Hide the markers that were showing.
        for (var i = 0; i < len; i++) {
            this.markers_[i].setMap(null);
        }
    }

    if (len >= this.minClusterSize_) {
        marker.setMap(null);
    }

    this.updateIcon();
    return true;
};


/**
 * Returns the marker clusterer that the cluster is associated with.
 *
 * @return {MarkerClusterer} The associated marker clusterer.
 */
Cluster.prototype.getMarkerClusterer = function () {
    return this.markerClusterer_;
};


/**
 * Returns the bounds of the cluster.
 *
 * @return {google.maps.LatLngBounds} the cluster bounds.
 */
Cluster.prototype.getBounds = function () {
    var bounds = new google.maps.LatLngBounds(this.center_, this.center_);
    var markers = this.getMarkers();
    for (var i = 0, marker; marker = markers[i]; i++) {
        bounds.extend(marker.getPosition());
    }
    return bounds;
};


/**
 * Removes the cluster
 */
Cluster.prototype.remove = function () {
    this.clusterIcon_.remove();
    this.markers_.length = 0;
    delete this.markers_;
};


/**
 * Returns the center of the cluster.
 *
 * @return {number} The cluster center.
 */
Cluster.prototype.getSize = function () {
    return this.markers_.length;
};


/**
 * Returns the center of the cluster.
 *
 * @return {Array.<google.maps.Marker>} The cluster center.
 */
Cluster.prototype.getMarkers = function () {
    return this.markers_;
};


/**
 * Returns the center of the cluster.
 *
 * @return {google.maps.LatLng} The cluster center.
 */
Cluster.prototype.getCenter = function () {
    return this.center_;
};


/**
 * Calculated the extended bounds of the cluster with the grid.
 *
 * @private
 */
Cluster.prototype.calculateBounds_ = function () {
    var bounds = new google.maps.LatLngBounds(this.center_, this.center_);
    this.bounds_ = this.markerClusterer_.getExtendedBounds(bounds);
};


/**
 * Determines if a marker lies in the clusters bounds.
 *
 * @param {google.maps.Marker} marker The marker to check.
 * @return {boolean} True if the marker lies in the bounds.
 */
Cluster.prototype.isMarkerInClusterBounds = function (marker) {
    return this.bounds_.contains(marker.getPosition());
};


/**
 * Returns the map that the cluster is associated with.
 *
 * @return {google.maps.Map} The map.
 */
Cluster.prototype.getMap = function () {
    return this.map_;
};


/**
 * Updates the cluster icon
 */
Cluster.prototype.updateIcon = function () {
    var zoom = this.map_.getZoom();
    var mz = this.markerClusterer_.getMaxZoom();

    if (mz && zoom > mz) {
        // The zoom is greater than our max zoom so show all the markers in cluster.
        for (var i = 0, marker; marker = this.markers_[i]; i++) {
            marker.setMap(this.map_);
        }
        return;
    }

    if (this.markers_.length < this.minClusterSize_) {
        // Min cluster size not yet reached.
        this.clusterIcon_.hide();
        return;
    }

    var numStyles = this.markerClusterer_.getStyles().length;
    var sums = this.markerClusterer_.getCalculator()(this.markers_, numStyles);
    this.clusterIcon_.setCenter(this.center_);
    this.clusterIcon_.setSums(sums);
    this.clusterIcon_.show();
};


/**
 * A cluster icon
 *
 * @param {Cluster} cluster The cluster to be associated with.
 * @param {Object} styles An object that has style properties:
 *     'url': (string) The image url.
 *     'height': (number) The image height.
 *     'width': (number) The image width.
 *     'anchor': (Array) The anchor position of the label text.
 *     'textColor': (string) The text color.
 *     'textSize': (number) The text size.
 *     'backgroundPosition: (string) The background postition x, y.
 * @param {number=} opt_padding Optional padding to apply to the cluster icon.
 * @constructor
 * @extends google.maps.OverlayView
 * @ignore
 */
function ClusterIcon(cluster, styles, opt_padding) {
    cluster.getMarkerClusterer().extend(ClusterIcon, google.maps.OverlayView);

    this.styles_ = styles;
    this.padding_ = opt_padding || 0;
    this.cluster_ = cluster;
    this.center_ = null;
    this.map_ = cluster.getMap();
    this.div_ = null;
    this.sums_ = null;
    this.visible_ = false;

    this.setMap(this.map_);
}


/**
 * Triggers the clusterclick event and zoom's if the option is set.
 *
 * @param {google.maps.MouseEvent} event The event to propagate
 */
ClusterIcon.prototype.triggerClusterClick = function (event) {
    var markerClusterer = this.cluster_.getMarkerClusterer();

    // Trigger the clusterclick event.
    google.maps.event.trigger(markerClusterer, 'clusterclick', this.cluster_, event);

    if (markerClusterer.isZoomOnClick()) {
        // Zoom into the cluster.
        this.map_.fitBounds(this.cluster_.getBounds());
    }
};


/**
 * Adding the cluster icon to the dom.
 * @ignore
 */
ClusterIcon.prototype.onAdd = function () {
    this.div_ = document.createElement('DIV');
    if (this.visible_) {
        var pos = this.getPosFromLatLng_(this.center_);
        this.div_.style.cssText = this.createCss(pos);
        this.div_.innerHTML = this.sums_.text;
    }

    var panes = this.getPanes();
    panes.overlayMouseTarget.appendChild(this.div_);

    var that = this;
    var isDragging = false;
    google.maps.event.addDomListener(this.div_, 'click', function (event) {
        // Only perform click when not preceded by a drag
        if (!isDragging) {
            that.triggerClusterClick(event);
        }
    });
    google.maps.event.addDomListener(this.div_, 'mousedown', function () {
        isDragging = false;
    });
    google.maps.event.addDomListener(this.div_, 'mousemove', function () {
        isDragging = true;
    });
};


/**
 * Returns the position to place the div dending on the latlng.
 *
 * @param {google.maps.LatLng} latlng The position in latlng.
 * @return {google.maps.Point} The position in pixels.
 * @private
 */
ClusterIcon.prototype.getPosFromLatLng_ = function (latlng) {
    var pos = this.getProjection().fromLatLngToDivPixel(latlng);

    if (typeof this.iconAnchor_ === 'object' && this.iconAnchor_.length === 2) {
        pos.x -= this.iconAnchor_[0];
        pos.y -= this.iconAnchor_[1];
    } else {
        pos.x -= parseInt(this.width_ / 2, 10);
        pos.y -= parseInt(this.height_ / 2, 10);
    }
    return pos;
};


/**
 * Draw the icon.
 * @ignore
 */
ClusterIcon.prototype.draw = function () {
    if (this.visible_) {
        var pos = this.getPosFromLatLng_(this.center_);
        this.div_.style.top = pos.y + 'px';
        this.div_.style.left = pos.x + 'px';
    }
};


/**
 * Hide the icon.
 */
ClusterIcon.prototype.hide = function () {
    if (this.div_) {
        this.div_.style.display = 'none';
    }
    this.visible_ = false;
};


/**
 * Position and show the icon.
 */
ClusterIcon.prototype.show = function () {
    if (this.div_) {
        var pos = this.getPosFromLatLng_(this.center_);
        this.div_.style.cssText = this.createCss(pos);
        this.div_.style.display = '';
    }
    this.visible_ = true;
};


/**
 * Remove the icon from the map
 */
ClusterIcon.prototype.remove = function () {
    this.setMap(null);
};


/**
 * Implementation of the onRemove interface.
 * @ignore
 */
ClusterIcon.prototype.onRemove = function () {
    if (this.div_ && this.div_.parentNode) {
        this.hide();
        this.div_.parentNode.removeChild(this.div_);
        this.div_ = null;
    }
};


/**
 * Set the sums of the icon.
 *
 * @param {Object} sums The sums containing:
 *   'text': (string) The text to display in the icon.
 *   'index': (number) The style index of the icon.
 */
ClusterIcon.prototype.setSums = function (sums) {
    this.sums_ = sums;
    this.text_ = sums.text;
    this.index_ = sums.index;
    if (this.div_) {
        this.div_.innerHTML = sums.text;
    }

    this.useStyle();
};


/**
 * Sets the icon to the the styles.
 */
ClusterIcon.prototype.useStyle = function () {
    var index = Math.max(0, this.sums_.index - 1);
    index = Math.min(this.styles_.length - 1, index);
    var style = this.styles_[index];
    this.url_ = style['url'];
    this.height_ = style['height'];
    this.width_ = style['width'];
    this.textColor_ = style['textColor'];
    this.anchor_ = style['anchor'];
    this.textSize_ = style['textSize'];
    this.backgroundPosition_ = style['backgroundPosition'];
    this.iconAnchor_ = style['iconAnchor'];
};


/**
 * Sets the center of the icon.
 *
 * @param {google.maps.LatLng} center The latlng to set as the center.
 */
ClusterIcon.prototype.setCenter = function (center) {
    this.center_ = center;
};


/**
 * Create the css text based on the position of the icon.
 *
 * @param {google.maps.Point} pos The position.
 * @return {string} The css style text.
 */
ClusterIcon.prototype.createCss = function (pos) {
    var style = [];
    style.push('background-image:url(' + this.url_ + ');');
    var backgroundPosition = this.backgroundPosition_ ? this.backgroundPosition_ : '0 0';
    style.push('background-position:' + backgroundPosition + ';');

    if (typeof this.anchor_ === 'object') {
        if (typeof this.anchor_[0] === 'number' && this.anchor_[0] > 0 &&
            this.anchor_[0] < this.height_) {
            style.push('height:' + (this.height_ - this.anchor_[0]) +
                'px; padding-top:' + this.anchor_[0] + 'px;');
        } else if (typeof this.anchor_[0] === 'number' && this.anchor_[0] < 0 &&
            -this.anchor_[0] < this.height_) {
            style.push('height:' + this.height_ + 'px; line-height:' + (this.height_ + this.anchor_[0]) +
                'px;');
        } else {
            style.push('height:' + this.height_ + 'px; line-height:' + this.height_ +
                'px;');
        }
        if (typeof this.anchor_[1] === 'number' && this.anchor_[1] > 0 &&
            this.anchor_[1] < this.width_) {
            style.push('width:' + (this.width_ - this.anchor_[1]) +
                'px; padding-left:' + this.anchor_[1] + 'px;');
        } else {
            style.push('width:' + this.width_ + 'px; text-align:center;');
        }
    } else {
        style.push('height:' + this.height_ + 'px; line-height:' +
            this.height_ + 'px; width:' + this.width_ + 'px; text-align:center;');
    }

    var txtColor = this.textColor_ ? this.textColor_ : 'black';
    var txtSize = this.textSize_ ? this.textSize_ : 11;

    style.push('cursor:pointer; top:' + pos.y + 'px; left:' +
        pos.x + 'px; color:' + txtColor + '; position:absolute; font-size:' +
        txtSize + 'px; font-family:Arial,sans-serif; font-weight:bold');
    return style.join('');
};


// Export Symbols for Closure
// If you are not going to compile with closure then you can remove the
// code below.
window['MarkerClusterer'] = MarkerClusterer;
MarkerClusterer.prototype['addMarker'] = MarkerClusterer.prototype.addMarker;
MarkerClusterer.prototype['addMarkers'] = MarkerClusterer.prototype.addMarkers;
MarkerClusterer.prototype['clearMarkers'] =
    MarkerClusterer.prototype.clearMarkers;
MarkerClusterer.prototype['fitMapToMarkers'] =
    MarkerClusterer.prototype.fitMapToMarkers;
MarkerClusterer.prototype['getCalculator'] =
    MarkerClusterer.prototype.getCalculator;
MarkerClusterer.prototype['getGridSize'] =
    MarkerClusterer.prototype.getGridSize;
MarkerClusterer.prototype['getExtendedBounds'] =
    MarkerClusterer.prototype.getExtendedBounds;
MarkerClusterer.prototype['getMap'] = MarkerClusterer.prototype.getMap;
MarkerClusterer.prototype['getMarkers'] = MarkerClusterer.prototype.getMarkers;
MarkerClusterer.prototype['getMaxZoom'] = MarkerClusterer.prototype.getMaxZoom;
MarkerClusterer.prototype['getStyles'] = MarkerClusterer.prototype.getStyles;
MarkerClusterer.prototype['getTotalClusters'] =
    MarkerClusterer.prototype.getTotalClusters;
MarkerClusterer.prototype['getTotalMarkers'] =
    MarkerClusterer.prototype.getTotalMarkers;
MarkerClusterer.prototype['redraw'] = MarkerClusterer.prototype.redraw;
MarkerClusterer.prototype['removeMarker'] =
    MarkerClusterer.prototype.removeMarker;
MarkerClusterer.prototype['removeMarkers'] =
    MarkerClusterer.prototype.removeMarkers;
MarkerClusterer.prototype['resetViewport'] =
    MarkerClusterer.prototype.resetViewport;
MarkerClusterer.prototype['repaint'] =
    MarkerClusterer.prototype.repaint;
MarkerClusterer.prototype['setCalculator'] =
    MarkerClusterer.prototype.setCalculator;
MarkerClusterer.prototype['setGridSize'] =
    MarkerClusterer.prototype.setGridSize;
MarkerClusterer.prototype['setMaxZoom'] =
    MarkerClusterer.prototype.setMaxZoom;
MarkerClusterer.prototype['onAdd'] = MarkerClusterer.prototype.onAdd;
MarkerClusterer.prototype['draw'] = MarkerClusterer.prototype.draw;

Cluster.prototype['getCenter'] = Cluster.prototype.getCenter;
Cluster.prototype['getSize'] = Cluster.prototype.getSize;
Cluster.prototype['getMarkers'] = Cluster.prototype.getMarkers;

ClusterIcon.prototype['onAdd'] = ClusterIcon.prototype.onAdd;
ClusterIcon.prototype['draw'] = ClusterIcon.prototype.draw;
ClusterIcon.prototype['onRemove'] = ClusterIcon.prototype.onRemove;
/**
 * Swiper 11.2.1
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * https://swiperjs.com
 *
 * Copyright 2014-2025 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: January 10, 2025
 */

var Swiper=function(){"use strict";function e(e){return null!==e&&"object"==typeof e&&"constructor"in e&&e.constructor===Object}function t(s,a){void 0===s&&(s={}),void 0===a&&(a={}),Object.keys(a).forEach((i=>{void 0===s[i]?s[i]=a[i]:e(a[i])&&e(s[i])&&Object.keys(a[i]).length>0&&t(s[i],a[i])}))}const s={body:{},addEventListener(){},removeEventListener(){},activeElement:{blur(){},nodeName:""},querySelector:()=>null,querySelectorAll:()=>[],getElementById:()=>null,createEvent:()=>({initEvent(){}}),createElement:()=>({children:[],childNodes:[],style:{},setAttribute(){},getElementsByTagName:()=>[]}),createElementNS:()=>({}),importNode:()=>null,location:{hash:"",host:"",hostname:"",href:"",origin:"",pathname:"",protocol:"",search:""}};function a(){const e="undefined"!=typeof document?document:{};return t(e,s),e}const i={document:s,navigator:{userAgent:""},location:{hash:"",host:"",hostname:"",href:"",origin:"",pathname:"",protocol:"",search:""},history:{replaceState(){},pushState(){},go(){},back(){}},CustomEvent:function(){return this},addEventListener(){},removeEventListener(){},getComputedStyle:()=>({getPropertyValue:()=>""}),Image(){},Date(){},screen:{},setTimeout(){},clearTimeout(){},matchMedia:()=>({}),requestAnimationFrame:e=>"undefined"==typeof setTimeout?(e(),null):setTimeout(e,0),cancelAnimationFrame(e){"undefined"!=typeof setTimeout&&clearTimeout(e)}};function r(){const e="undefined"!=typeof window?window:{};return t(e,i),e}function n(e){return void 0===e&&(e=""),e.trim().split(" ").filter((e=>!!e.trim()))}function l(e,t){return void 0===t&&(t=0),setTimeout(e,t)}function o(){return Date.now()}function d(e,t){void 0===t&&(t="x");const s=r();let a,i,n;const l=function(e){const t=r();let s;return t.getComputedStyle&&(s=t.getComputedStyle(e,null)),!s&&e.currentStyle&&(s=e.currentStyle),s||(s=e.style),s}(e);return s.WebKitCSSMatrix?(i=l.transform||l.webkitTransform,i.split(",").length>6&&(i=i.split(", ").map((e=>e.replace(",","."))).join(", ")),n=new s.WebKitCSSMatrix("none"===i?"":i)):(n=l.MozTransform||l.OTransform||l.MsTransform||l.msTransform||l.transform||l.getPropertyValue("transform").replace("translate(","matrix(1, 0, 0, 1,"),a=n.toString().split(",")),"x"===t&&(i=s.WebKitCSSMatrix?n.m41:16===a.length?parseFloat(a[12]):parseFloat(a[4])),"y"===t&&(i=s.WebKitCSSMatrix?n.m42:16===a.length?parseFloat(a[13]):parseFloat(a[5])),i||0}function c(e){return"object"==typeof e&&null!==e&&e.constructor&&"Object"===Object.prototype.toString.call(e).slice(8,-1)}function p(){const e=Object(arguments.length<=0?void 0:arguments[0]),t=["__proto__","constructor","prototype"];for(let a=1;a<arguments.length;a+=1){const i=a<0||arguments.length<=a?void 0:arguments[a];if(null!=i&&(s=i,!("undefined"!=typeof window&&void 0!==window.HTMLElement?s instanceof HTMLElement:s&&(1===s.nodeType||11===s.nodeType)))){const s=Object.keys(Object(i)).filter((e=>t.indexOf(e)<0));for(let t=0,a=s.length;t<a;t+=1){const a=s[t],r=Object.getOwnPropertyDescriptor(i,a);void 0!==r&&r.enumerable&&(c(e[a])&&c(i[a])?i[a].__swiper__?e[a]=i[a]:p(e[a],i[a]):!c(e[a])&&c(i[a])?(e[a]={},i[a].__swiper__?e[a]=i[a]:p(e[a],i[a])):e[a]=i[a])}}}var s;return e}function u(e,t,s){e.style.setProperty(t,s)}function m(e){let{swiper:t,targetPosition:s,side:a}=e;const i=r(),n=-t.translate;let l,o=null;const d=t.params.speed;t.wrapperEl.style.scrollSnapType="none",i.cancelAnimationFrame(t.cssModeFrameID);const c=s>n?"next":"prev",p=(e,t)=>"next"===c&&e>=t||"prev"===c&&e<=t,u=()=>{l=(new Date).getTime(),null===o&&(o=l);const e=Math.max(Math.min((l-o)/d,1),0),r=.5-Math.cos(e*Math.PI)/2;let c=n+r*(s-n);if(p(c,s)&&(c=s),t.wrapperEl.scrollTo({[a]:c}),p(c,s))return t.wrapperEl.style.overflow="hidden",t.wrapperEl.style.scrollSnapType="",setTimeout((()=>{t.wrapperEl.style.overflow="",t.wrapperEl.scrollTo({[a]:c})})),void i.cancelAnimationFrame(t.cssModeFrameID);t.cssModeFrameID=i.requestAnimationFrame(u)};u()}function h(e){return e.querySelector(".swiper-slide-transform")||e.shadowRoot&&e.shadowRoot.querySelector(".swiper-slide-transform")||e}function f(e,t){void 0===t&&(t="");const s=r(),a=[...e.children];return s.HTMLSlotElement&&e instanceof HTMLSlotElement&&a.push(...e.assignedElements()),t?a.filter((e=>e.matches(t))):a}function g(e){try{return void console.warn(e)}catch(e){}}function v(e,t){void 0===t&&(t=[]);const s=document.createElement(e);return s.classList.add(...Array.isArray(t)?t:n(t)),s}function w(e){const t=r(),s=a(),i=e.getBoundingClientRect(),n=s.body,l=e.clientTop||n.clientTop||0,o=e.clientLeft||n.clientLeft||0,d=e===t?t.scrollY:e.scrollTop,c=e===t?t.scrollX:e.scrollLeft;return{top:i.top+d-l,left:i.left+c-o}}function b(e,t){return r().getComputedStyle(e,null).getPropertyValue(t)}function y(e){let t,s=e;if(s){for(t=0;null!==(s=s.previousSibling);)1===s.nodeType&&(t+=1);return t}}function E(e,t){const s=[];let a=e.parentElement;for(;a;)t?a.matches(t)&&s.push(a):s.push(a),a=a.parentElement;return s}function x(e,t){t&&e.addEventListener("transitionend",(function s(a){a.target===e&&(t.call(e,a),e.removeEventListener("transitionend",s))}))}function S(e,t,s){const a=r();return s?e["width"===t?"offsetWidth":"offsetHeight"]+parseFloat(a.getComputedStyle(e,null).getPropertyValue("width"===t?"margin-right":"margin-top"))+parseFloat(a.getComputedStyle(e,null).getPropertyValue("width"===t?"margin-left":"margin-bottom")):e.offsetWidth}function T(e){return(Array.isArray(e)?e:[e]).filter((e=>!!e))}function M(e){return t=>Math.abs(t)>0&&e.browser&&e.browser.need3dFix&&Math.abs(t)%90==0?t+.001:t}let C,P,L;function I(){return C||(C=function(){const e=r(),t=a();return{smoothScroll:t.documentElement&&t.documentElement.style&&"scrollBehavior"in t.documentElement.style,touch:!!("ontouchstart"in e||e.DocumentTouch&&t instanceof e.DocumentTouch)}}()),C}function z(e){return void 0===e&&(e={}),P||(P=function(e){let{userAgent:t}=void 0===e?{}:e;const s=I(),a=r(),i=a.navigator.platform,n=t||a.navigator.userAgent,l={ios:!1,android:!1},o=a.screen.width,d=a.screen.height,c=n.match(/(Android);?[\s\/]+([\d.]+)?/);let p=n.match(/(iPad).*OS\s([\d_]+)/);const u=n.match(/(iPod)(.*OS\s([\d_]+))?/),m=!p&&n.match(/(iPhone\sOS|iOS)\s([\d_]+)/),h="Win32"===i;let f="MacIntel"===i;return!p&&f&&s.touch&&["1024x1366","1366x1024","834x1194","1194x834","834x1112","1112x834","768x1024","1024x768","820x1180","1180x820","810x1080","1080x810"].indexOf(`${o}x${d}`)>=0&&(p=n.match(/(Version)\/([\d.]+)/),p||(p=[0,1,"13_0_0"]),f=!1),c&&!h&&(l.os="android",l.android=!0),(p||m||u)&&(l.os="ios",l.ios=!0),l}(e)),P}function A(){return L||(L=function(){const e=r(),t=z();let s=!1;function a(){const t=e.navigator.userAgent.toLowerCase();return t.indexOf("safari")>=0&&t.indexOf("chrome")<0&&t.indexOf("android")<0}if(a()){const t=String(e.navigator.userAgent);if(t.includes("Version/")){const[e,a]=t.split("Version/")[1].split(" ")[0].split(".").map((e=>Number(e)));s=e<16||16===e&&a<2}}const i=/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(e.navigator.userAgent),n=a();return{isSafari:s||n,needPerspectiveFix:s,need3dFix:n||i&&t.ios,isWebView:i}}()),L}var $={on(e,t,s){const a=this;if(!a.eventsListeners||a.destroyed)return a;if("function"!=typeof t)return a;const i=s?"unshift":"push";return e.split(" ").forEach((e=>{a.eventsListeners[e]||(a.eventsListeners[e]=[]),a.eventsListeners[e][i](t)})),a},once(e,t,s){const a=this;if(!a.eventsListeners||a.destroyed)return a;if("function"!=typeof t)return a;function i(){a.off(e,i),i.__emitterProxy&&delete i.__emitterProxy;for(var s=arguments.length,r=new Array(s),n=0;n<s;n++)r[n]=arguments[n];t.apply(a,r)}return i.__emitterProxy=t,a.on(e,i,s)},onAny(e,t){const s=this;if(!s.eventsListeners||s.destroyed)return s;if("function"!=typeof e)return s;const a=t?"unshift":"push";return s.eventsAnyListeners.indexOf(e)<0&&s.eventsAnyListeners[a](e),s},offAny(e){const t=this;if(!t.eventsListeners||t.destroyed)return t;if(!t.eventsAnyListeners)return t;const s=t.eventsAnyListeners.indexOf(e);return s>=0&&t.eventsAnyListeners.splice(s,1),t},off(e,t){const s=this;return!s.eventsListeners||s.destroyed?s:s.eventsListeners?(e.split(" ").forEach((e=>{void 0===t?s.eventsListeners[e]=[]:s.eventsListeners[e]&&s.eventsListeners[e].forEach(((a,i)=>{(a===t||a.__emitterProxy&&a.__emitterProxy===t)&&s.eventsListeners[e].splice(i,1)}))})),s):s},emit(){const e=this;if(!e.eventsListeners||e.destroyed)return e;if(!e.eventsListeners)return e;let t,s,a;for(var i=arguments.length,r=new Array(i),n=0;n<i;n++)r[n]=arguments[n];"string"==typeof r[0]||Array.isArray(r[0])?(t=r[0],s=r.slice(1,r.length),a=e):(t=r[0].events,s=r[0].data,a=r[0].context||e),s.unshift(a);return(Array.isArray(t)?t:t.split(" ")).forEach((t=>{e.eventsAnyListeners&&e.eventsAnyListeners.length&&e.eventsAnyListeners.forEach((e=>{e.apply(a,[t,...s])})),e.eventsListeners&&e.eventsListeners[t]&&e.eventsListeners[t].forEach((e=>{e.apply(a,s)}))})),e}};const k=(e,t,s)=>{t&&!e.classList.contains(s)?e.classList.add(s):!t&&e.classList.contains(s)&&e.classList.remove(s)};const O=(e,t,s)=>{t&&!e.classList.contains(s)?e.classList.add(s):!t&&e.classList.contains(s)&&e.classList.remove(s)};const D=(e,t)=>{if(!e||e.destroyed||!e.params)return;const s=t.closest(e.isElement?"swiper-slide":`.${e.params.slideClass}`);if(s){let t=s.querySelector(`.${e.params.lazyPreloaderClass}`);!t&&e.isElement&&(s.shadowRoot?t=s.shadowRoot.querySelector(`.${e.params.lazyPreloaderClass}`):requestAnimationFrame((()=>{s.shadowRoot&&(t=s.shadowRoot.querySelector(`.${e.params.lazyPreloaderClass}`),t&&t.remove())}))),t&&t.remove()}},G=(e,t)=>{if(!e.slides[t])return;const s=e.slides[t].querySelector('[loading="lazy"]');s&&s.removeAttribute("loading")},H=e=>{if(!e||e.destroyed||!e.params)return;let t=e.params.lazyPreloadPrevNext;const s=e.slides.length;if(!s||!t||t<0)return;t=Math.min(t,s);const a="auto"===e.params.slidesPerView?e.slidesPerViewDynamic():Math.ceil(e.params.slidesPerView),i=e.activeIndex;if(e.params.grid&&e.params.grid.rows>1){const s=i,r=[s-t];return r.push(...Array.from({length:t}).map(((e,t)=>s+a+t))),void e.slides.forEach(((t,s)=>{r.includes(t.column)&&G(e,s)}))}const r=i+a-1;if(e.params.rewind||e.params.loop)for(let a=i-t;a<=r+t;a+=1){const t=(a%s+s)%s;(t<i||t>r)&&G(e,t)}else for(let a=Math.max(i-t,0);a<=Math.min(r+t,s-1);a+=1)a!==i&&(a>r||a<i)&&G(e,a)};var X={updateSize:function(){const e=this;let t,s;const a=e.el;t=void 0!==e.params.width&&null!==e.params.width?e.params.width:a.clientWidth,s=void 0!==e.params.height&&null!==e.params.height?e.params.height:a.clientHeight,0===t&&e.isHorizontal()||0===s&&e.isVertical()||(t=t-parseInt(b(a,"padding-left")||0,10)-parseInt(b(a,"padding-right")||0,10),s=s-parseInt(b(a,"padding-top")||0,10)-parseInt(b(a,"padding-bottom")||0,10),Number.isNaN(t)&&(t=0),Number.isNaN(s)&&(s=0),Object.assign(e,{width:t,height:s,size:e.isHorizontal()?t:s}))},updateSlides:function(){const e=this;function t(t,s){return parseFloat(t.getPropertyValue(e.getDirectionLabel(s))||0)}const s=e.params,{wrapperEl:a,slidesEl:i,size:r,rtlTranslate:n,wrongRTL:l}=e,o=e.virtual&&s.virtual.enabled,d=o?e.virtual.slides.length:e.slides.length,c=f(i,`.${e.params.slideClass}, swiper-slide`),p=o?e.virtual.slides.length:c.length;let m=[];const h=[],g=[];let v=s.slidesOffsetBefore;"function"==typeof v&&(v=s.slidesOffsetBefore.call(e));let w=s.slidesOffsetAfter;"function"==typeof w&&(w=s.slidesOffsetAfter.call(e));const y=e.snapGrid.length,E=e.slidesGrid.length;let x=s.spaceBetween,T=-v,M=0,C=0;if(void 0===r)return;"string"==typeof x&&x.indexOf("%")>=0?x=parseFloat(x.replace("%",""))/100*r:"string"==typeof x&&(x=parseFloat(x)),e.virtualSize=-x,c.forEach((e=>{n?e.style.marginLeft="":e.style.marginRight="",e.style.marginBottom="",e.style.marginTop=""})),s.centeredSlides&&s.cssMode&&(u(a,"--swiper-centered-offset-before",""),u(a,"--swiper-centered-offset-after",""));const P=s.grid&&s.grid.rows>1&&e.grid;let L;P?e.grid.initSlides(c):e.grid&&e.grid.unsetSlides();const I="auto"===s.slidesPerView&&s.breakpoints&&Object.keys(s.breakpoints).filter((e=>void 0!==s.breakpoints[e].slidesPerView)).length>0;for(let a=0;a<p;a+=1){let i;if(L=0,c[a]&&(i=c[a]),P&&e.grid.updateSlide(a,i,c),!c[a]||"none"!==b(i,"display")){if("auto"===s.slidesPerView){I&&(c[a].style[e.getDirectionLabel("width")]="");const r=getComputedStyle(i),n=i.style.transform,l=i.style.webkitTransform;if(n&&(i.style.transform="none"),l&&(i.style.webkitTransform="none"),s.roundLengths)L=e.isHorizontal()?S(i,"width",!0):S(i,"height",!0);else{const e=t(r,"width"),s=t(r,"padding-left"),a=t(r,"padding-right"),n=t(r,"margin-left"),l=t(r,"margin-right"),o=r.getPropertyValue("box-sizing");if(o&&"border-box"===o)L=e+n+l;else{const{clientWidth:t,offsetWidth:r}=i;L=e+s+a+n+l+(r-t)}}n&&(i.style.transform=n),l&&(i.style.webkitTransform=l),s.roundLengths&&(L=Math.floor(L))}else L=(r-(s.slidesPerView-1)*x)/s.slidesPerView,s.roundLengths&&(L=Math.floor(L)),c[a]&&(c[a].style[e.getDirectionLabel("width")]=`${L}px`);c[a]&&(c[a].swiperSlideSize=L),g.push(L),s.centeredSlides?(T=T+L/2+M/2+x,0===M&&0!==a&&(T=T-r/2-x),0===a&&(T=T-r/2-x),Math.abs(T)<.001&&(T=0),s.roundLengths&&(T=Math.floor(T)),C%s.slidesPerGroup==0&&m.push(T),h.push(T)):(s.roundLengths&&(T=Math.floor(T)),(C-Math.min(e.params.slidesPerGroupSkip,C))%e.params.slidesPerGroup==0&&m.push(T),h.push(T),T=T+L+x),e.virtualSize+=L+x,M=L,C+=1}}if(e.virtualSize=Math.max(e.virtualSize,r)+w,n&&l&&("slide"===s.effect||"coverflow"===s.effect)&&(a.style.width=`${e.virtualSize+x}px`),s.setWrapperSize&&(a.style[e.getDirectionLabel("width")]=`${e.virtualSize+x}px`),P&&e.grid.updateWrapperSize(L,m),!s.centeredSlides){const t=[];for(let a=0;a<m.length;a+=1){let i=m[a];s.roundLengths&&(i=Math.floor(i)),m[a]<=e.virtualSize-r&&t.push(i)}m=t,Math.floor(e.virtualSize-r)-Math.floor(m[m.length-1])>1&&m.push(e.virtualSize-r)}if(o&&s.loop){const t=g[0]+x;if(s.slidesPerGroup>1){const a=Math.ceil((e.virtual.slidesBefore+e.virtual.slidesAfter)/s.slidesPerGroup),i=t*s.slidesPerGroup;for(let e=0;e<a;e+=1)m.push(m[m.length-1]+i)}for(let a=0;a<e.virtual.slidesBefore+e.virtual.slidesAfter;a+=1)1===s.slidesPerGroup&&m.push(m[m.length-1]+t),h.push(h[h.length-1]+t),e.virtualSize+=t}if(0===m.length&&(m=[0]),0!==x){const t=e.isHorizontal()&&n?"marginLeft":e.getDirectionLabel("marginRight");c.filter(((e,t)=>!(s.cssMode&&!s.loop)||t!==c.length-1)).forEach((e=>{e.style[t]=`${x}px`}))}if(s.centeredSlides&&s.centeredSlidesBounds){let e=0;g.forEach((t=>{e+=t+(x||0)})),e-=x;const t=e>r?e-r:0;m=m.map((e=>e<=0?-v:e>t?t+w:e))}if(s.centerInsufficientSlides){let e=0;g.forEach((t=>{e+=t+(x||0)})),e-=x;const t=(s.slidesOffsetBefore||0)+(s.slidesOffsetAfter||0);if(e+t<r){const s=(r-e-t)/2;m.forEach(((e,t)=>{m[t]=e-s})),h.forEach(((e,t)=>{h[t]=e+s}))}}if(Object.assign(e,{slides:c,snapGrid:m,slidesGrid:h,slidesSizesGrid:g}),s.centeredSlides&&s.cssMode&&!s.centeredSlidesBounds){u(a,"--swiper-centered-offset-before",-m[0]+"px"),u(a,"--swiper-centered-offset-after",e.size/2-g[g.length-1]/2+"px");const t=-e.snapGrid[0],s=-e.slidesGrid[0];e.snapGrid=e.snapGrid.map((e=>e+t)),e.slidesGrid=e.slidesGrid.map((e=>e+s))}if(p!==d&&e.emit("slidesLengthChange"),m.length!==y&&(e.params.watchOverflow&&e.checkOverflow(),e.emit("snapGridLengthChange")),h.length!==E&&e.emit("slidesGridLengthChange"),s.watchSlidesProgress&&e.updateSlidesOffset(),e.emit("slidesUpdated"),!(o||s.cssMode||"slide"!==s.effect&&"fade"!==s.effect)){const t=`${s.containerModifierClass}backface-hidden`,a=e.el.classList.contains(t);p<=s.maxBackfaceHiddenSlides?a||e.el.classList.add(t):a&&e.el.classList.remove(t)}},updateAutoHeight:function(e){const t=this,s=[],a=t.virtual&&t.params.virtual.enabled;let i,r=0;"number"==typeof e?t.setTransition(e):!0===e&&t.setTransition(t.params.speed);const n=e=>a?t.slides[t.getSlideIndexByData(e)]:t.slides[e];if("auto"!==t.params.slidesPerView&&t.params.slidesPerView>1)if(t.params.centeredSlides)(t.visibleSlides||[]).forEach((e=>{s.push(e)}));else for(i=0;i<Math.ceil(t.params.slidesPerView);i+=1){const e=t.activeIndex+i;if(e>t.slides.length&&!a)break;s.push(n(e))}else s.push(n(t.activeIndex));for(i=0;i<s.length;i+=1)if(void 0!==s[i]){const e=s[i].offsetHeight;r=e>r?e:r}(r||0===r)&&(t.wrapperEl.style.height=`${r}px`)},updateSlidesOffset:function(){const e=this,t=e.slides,s=e.isElement?e.isHorizontal()?e.wrapperEl.offsetLeft:e.wrapperEl.offsetTop:0;for(let a=0;a<t.length;a+=1)t[a].swiperSlideOffset=(e.isHorizontal()?t[a].offsetLeft:t[a].offsetTop)-s-e.cssOverflowAdjustment()},updateSlidesProgress:function(e){void 0===e&&(e=this&&this.translate||0);const t=this,s=t.params,{slides:a,rtlTranslate:i,snapGrid:r}=t;if(0===a.length)return;void 0===a[0].swiperSlideOffset&&t.updateSlidesOffset();let n=-e;i&&(n=e),t.visibleSlidesIndexes=[],t.visibleSlides=[];let l=s.spaceBetween;"string"==typeof l&&l.indexOf("%")>=0?l=parseFloat(l.replace("%",""))/100*t.size:"string"==typeof l&&(l=parseFloat(l));for(let e=0;e<a.length;e+=1){const o=a[e];let d=o.swiperSlideOffset;s.cssMode&&s.centeredSlides&&(d-=a[0].swiperSlideOffset);const c=(n+(s.centeredSlides?t.minTranslate():0)-d)/(o.swiperSlideSize+l),p=(n-r[0]+(s.centeredSlides?t.minTranslate():0)-d)/(o.swiperSlideSize+l),u=-(n-d),m=u+t.slidesSizesGrid[e],h=u>=0&&u<=t.size-t.slidesSizesGrid[e],f=u>=0&&u<t.size-1||m>1&&m<=t.size||u<=0&&m>=t.size;f&&(t.visibleSlides.push(o),t.visibleSlidesIndexes.push(e)),k(o,f,s.slideVisibleClass),k(o,h,s.slideFullyVisibleClass),o.progress=i?-c:c,o.originalProgress=i?-p:p}},updateProgress:function(e){const t=this;if(void 0===e){const s=t.rtlTranslate?-1:1;e=t&&t.translate&&t.translate*s||0}const s=t.params,a=t.maxTranslate()-t.minTranslate();let{progress:i,isBeginning:r,isEnd:n,progressLoop:l}=t;const o=r,d=n;if(0===a)i=0,r=!0,n=!0;else{i=(e-t.minTranslate())/a;const s=Math.abs(e-t.minTranslate())<1,l=Math.abs(e-t.maxTranslate())<1;r=s||i<=0,n=l||i>=1,s&&(i=0),l&&(i=1)}if(s.loop){const s=t.getSlideIndexByData(0),a=t.getSlideIndexByData(t.slides.length-1),i=t.slidesGrid[s],r=t.slidesGrid[a],n=t.slidesGrid[t.slidesGrid.length-1],o=Math.abs(e);l=o>=i?(o-i)/n:(o+n-r)/n,l>1&&(l-=1)}Object.assign(t,{progress:i,progressLoop:l,isBeginning:r,isEnd:n}),(s.watchSlidesProgress||s.centeredSlides&&s.autoHeight)&&t.updateSlidesProgress(e),r&&!o&&t.emit("reachBeginning toEdge"),n&&!d&&t.emit("reachEnd toEdge"),(o&&!r||d&&!n)&&t.emit("fromEdge"),t.emit("progress",i)},updateSlidesClasses:function(){const e=this,{slides:t,params:s,slidesEl:a,activeIndex:i}=e,r=e.virtual&&s.virtual.enabled,n=e.grid&&s.grid&&s.grid.rows>1,l=e=>f(a,`.${s.slideClass}${e}, swiper-slide${e}`)[0];let o,d,c;if(r)if(s.loop){let t=i-e.virtual.slidesBefore;t<0&&(t=e.virtual.slides.length+t),t>=e.virtual.slides.length&&(t-=e.virtual.slides.length),o=l(`[data-swiper-slide-index="${t}"]`)}else o=l(`[data-swiper-slide-index="${i}"]`);else n?(o=t.find((e=>e.column===i)),c=t.find((e=>e.column===i+1)),d=t.find((e=>e.column===i-1))):o=t[i];o&&(n||(c=function(e,t){const s=[];for(;e.nextElementSibling;){const a=e.nextElementSibling;t?a.matches(t)&&s.push(a):s.push(a),e=a}return s}(o,`.${s.slideClass}, swiper-slide`)[0],s.loop&&!c&&(c=t[0]),d=function(e,t){const s=[];for(;e.previousElementSibling;){const a=e.previousElementSibling;t?a.matches(t)&&s.push(a):s.push(a),e=a}return s}(o,`.${s.slideClass}, swiper-slide`)[0],s.loop&&0===!d&&(d=t[t.length-1]))),t.forEach((e=>{O(e,e===o,s.slideActiveClass),O(e,e===c,s.slideNextClass),O(e,e===d,s.slidePrevClass)})),e.emitSlidesClasses()},updateActiveIndex:function(e){const t=this,s=t.rtlTranslate?t.translate:-t.translate,{snapGrid:a,params:i,activeIndex:r,realIndex:n,snapIndex:l}=t;let o,d=e;const c=e=>{let s=e-t.virtual.slidesBefore;return s<0&&(s=t.virtual.slides.length+s),s>=t.virtual.slides.length&&(s-=t.virtual.slides.length),s};if(void 0===d&&(d=function(e){const{slidesGrid:t,params:s}=e,a=e.rtlTranslate?e.translate:-e.translate;let i;for(let e=0;e<t.length;e+=1)void 0!==t[e+1]?a>=t[e]&&a<t[e+1]-(t[e+1]-t[e])/2?i=e:a>=t[e]&&a<t[e+1]&&(i=e+1):a>=t[e]&&(i=e);return s.normalizeSlideIndex&&(i<0||void 0===i)&&(i=0),i}(t)),a.indexOf(s)>=0)o=a.indexOf(s);else{const e=Math.min(i.slidesPerGroupSkip,d);o=e+Math.floor((d-e)/i.slidesPerGroup)}if(o>=a.length&&(o=a.length-1),d===r&&!t.params.loop)return void(o!==l&&(t.snapIndex=o,t.emit("snapIndexChange")));if(d===r&&t.params.loop&&t.virtual&&t.params.virtual.enabled)return void(t.realIndex=c(d));const p=t.grid&&i.grid&&i.grid.rows>1;let u;if(t.virtual&&i.virtual.enabled&&i.loop)u=c(d);else if(p){const e=t.slides.find((e=>e.column===d));let s=parseInt(e.getAttribute("data-swiper-slide-index"),10);Number.isNaN(s)&&(s=Math.max(t.slides.indexOf(e),0)),u=Math.floor(s/i.grid.rows)}else if(t.slides[d]){const e=t.slides[d].getAttribute("data-swiper-slide-index");u=e?parseInt(e,10):d}else u=d;Object.assign(t,{previousSnapIndex:l,snapIndex:o,previousRealIndex:n,realIndex:u,previousIndex:r,activeIndex:d}),t.initialized&&H(t),t.emit("activeIndexChange"),t.emit("snapIndexChange"),(t.initialized||t.params.runCallbacksOnInit)&&(n!==u&&t.emit("realIndexChange"),t.emit("slideChange"))},updateClickedSlide:function(e,t){const s=this,a=s.params;let i=e.closest(`.${a.slideClass}, swiper-slide`);!i&&s.isElement&&t&&t.length>1&&t.includes(e)&&[...t.slice(t.indexOf(e)+1,t.length)].forEach((e=>{!i&&e.matches&&e.matches(`.${a.slideClass}, swiper-slide`)&&(i=e)}));let r,n=!1;if(i)for(let e=0;e<s.slides.length;e+=1)if(s.slides[e]===i){n=!0,r=e;break}if(!i||!n)return s.clickedSlide=void 0,void(s.clickedIndex=void 0);s.clickedSlide=i,s.virtual&&s.params.virtual.enabled?s.clickedIndex=parseInt(i.getAttribute("data-swiper-slide-index"),10):s.clickedIndex=r,a.slideToClickedSlide&&void 0!==s.clickedIndex&&s.clickedIndex!==s.activeIndex&&s.slideToClickedSlide()}};var B={getTranslate:function(e){void 0===e&&(e=this.isHorizontal()?"x":"y");const{params:t,rtlTranslate:s,translate:a,wrapperEl:i}=this;if(t.virtualTranslate)return s?-a:a;if(t.cssMode)return a;let r=d(i,e);return r+=this.cssOverflowAdjustment(),s&&(r=-r),r||0},setTranslate:function(e,t){const s=this,{rtlTranslate:a,params:i,wrapperEl:r,progress:n}=s;let l,o=0,d=0;s.isHorizontal()?o=a?-e:e:d=e,i.roundLengths&&(o=Math.floor(o),d=Math.floor(d)),s.previousTranslate=s.translate,s.translate=s.isHorizontal()?o:d,i.cssMode?r[s.isHorizontal()?"scrollLeft":"scrollTop"]=s.isHorizontal()?-o:-d:i.virtualTranslate||(s.isHorizontal()?o-=s.cssOverflowAdjustment():d-=s.cssOverflowAdjustment(),r.style.transform=`translate3d(${o}px, ${d}px, 0px)`);const c=s.maxTranslate()-s.minTranslate();l=0===c?0:(e-s.minTranslate())/c,l!==n&&s.updateProgress(e),s.emit("setTranslate",s.translate,t)},minTranslate:function(){return-this.snapGrid[0]},maxTranslate:function(){return-this.snapGrid[this.snapGrid.length-1]},translateTo:function(e,t,s,a,i){void 0===e&&(e=0),void 0===t&&(t=this.params.speed),void 0===s&&(s=!0),void 0===a&&(a=!0);const r=this,{params:n,wrapperEl:l}=r;if(r.animating&&n.preventInteractionOnTransition)return!1;const o=r.minTranslate(),d=r.maxTranslate();let c;if(c=a&&e>o?o:a&&e<d?d:e,r.updateProgress(c),n.cssMode){const e=r.isHorizontal();if(0===t)l[e?"scrollLeft":"scrollTop"]=-c;else{if(!r.support.smoothScroll)return m({swiper:r,targetPosition:-c,side:e?"left":"top"}),!0;l.scrollTo({[e?"left":"top"]:-c,behavior:"smooth"})}return!0}return 0===t?(r.setTransition(0),r.setTranslate(c),s&&(r.emit("beforeTransitionStart",t,i),r.emit("transitionEnd"))):(r.setTransition(t),r.setTranslate(c),s&&(r.emit("beforeTransitionStart",t,i),r.emit("transitionStart")),r.animating||(r.animating=!0,r.onTranslateToWrapperTransitionEnd||(r.onTranslateToWrapperTransitionEnd=function(e){r&&!r.destroyed&&e.target===this&&(r.wrapperEl.removeEventListener("transitionend",r.onTranslateToWrapperTransitionEnd),r.onTranslateToWrapperTransitionEnd=null,delete r.onTranslateToWrapperTransitionEnd,r.animating=!1,s&&r.emit("transitionEnd"))}),r.wrapperEl.addEventListener("transitionend",r.onTranslateToWrapperTransitionEnd))),!0}};function Y(e){let{swiper:t,runCallbacks:s,direction:a,step:i}=e;const{activeIndex:r,previousIndex:n}=t;let l=a;if(l||(l=r>n?"next":r<n?"prev":"reset"),t.emit(`transition${i}`),s&&r!==n){if("reset"===l)return void t.emit(`slideResetTransition${i}`);t.emit(`slideChangeTransition${i}`),"next"===l?t.emit(`slideNextTransition${i}`):t.emit(`slidePrevTransition${i}`)}}var N={slideTo:function(e,t,s,a,i){void 0===e&&(e=0),void 0===s&&(s=!0),"string"==typeof e&&(e=parseInt(e,10));const r=this;let n=e;n<0&&(n=0);const{params:l,snapGrid:o,slidesGrid:d,previousIndex:c,activeIndex:p,rtlTranslate:u,wrapperEl:h,enabled:f}=r;if(!f&&!a&&!i||r.destroyed||r.animating&&l.preventInteractionOnTransition)return!1;void 0===t&&(t=r.params.speed);const g=Math.min(r.params.slidesPerGroupSkip,n);let v=g+Math.floor((n-g)/r.params.slidesPerGroup);v>=o.length&&(v=o.length-1);const w=-o[v];if(l.normalizeSlideIndex)for(let e=0;e<d.length;e+=1){const t=-Math.floor(100*w),s=Math.floor(100*d[e]),a=Math.floor(100*d[e+1]);void 0!==d[e+1]?t>=s&&t<a-(a-s)/2?n=e:t>=s&&t<a&&(n=e+1):t>=s&&(n=e)}if(r.initialized&&n!==p){if(!r.allowSlideNext&&(u?w>r.translate&&w>r.minTranslate():w<r.translate&&w<r.minTranslate()))return!1;if(!r.allowSlidePrev&&w>r.translate&&w>r.maxTranslate()&&(p||0)!==n)return!1}let b;n!==(c||0)&&s&&r.emit("beforeSlideChangeStart"),r.updateProgress(w),b=n>p?"next":n<p?"prev":"reset";const y=r.virtual&&r.params.virtual.enabled;if(!(y&&i)&&(u&&-w===r.translate||!u&&w===r.translate))return r.updateActiveIndex(n),l.autoHeight&&r.updateAutoHeight(),r.updateSlidesClasses(),"slide"!==l.effect&&r.setTranslate(w),"reset"!==b&&(r.transitionStart(s,b),r.transitionEnd(s,b)),!1;if(l.cssMode){const e=r.isHorizontal(),s=u?w:-w;if(0===t)y&&(r.wrapperEl.style.scrollSnapType="none",r._immediateVirtual=!0),y&&!r._cssModeVirtualInitialSet&&r.params.initialSlide>0?(r._cssModeVirtualInitialSet=!0,requestAnimationFrame((()=>{h[e?"scrollLeft":"scrollTop"]=s}))):h[e?"scrollLeft":"scrollTop"]=s,y&&requestAnimationFrame((()=>{r.wrapperEl.style.scrollSnapType="",r._immediateVirtual=!1}));else{if(!r.support.smoothScroll)return m({swiper:r,targetPosition:s,side:e?"left":"top"}),!0;h.scrollTo({[e?"left":"top"]:s,behavior:"smooth"})}return!0}return r.setTransition(t),r.setTranslate(w),r.updateActiveIndex(n),r.updateSlidesClasses(),r.emit("beforeTransitionStart",t,a),r.transitionStart(s,b),0===t?r.transitionEnd(s,b):r.animating||(r.animating=!0,r.onSlideToWrapperTransitionEnd||(r.onSlideToWrapperTransitionEnd=function(e){r&&!r.destroyed&&e.target===this&&(r.wrapperEl.removeEventListener("transitionend",r.onSlideToWrapperTransitionEnd),r.onSlideToWrapperTransitionEnd=null,delete r.onSlideToWrapperTransitionEnd,r.transitionEnd(s,b))}),r.wrapperEl.addEventListener("transitionend",r.onSlideToWrapperTransitionEnd)),!0},slideToLoop:function(e,t,s,a){if(void 0===e&&(e=0),void 0===s&&(s=!0),"string"==typeof e){e=parseInt(e,10)}const i=this;if(i.destroyed)return;void 0===t&&(t=i.params.speed);const r=i.grid&&i.params.grid&&i.params.grid.rows>1;let n=e;if(i.params.loop)if(i.virtual&&i.params.virtual.enabled)n+=i.virtual.slidesBefore;else{let e;if(r){const t=n*i.params.grid.rows;e=i.slides.find((e=>1*e.getAttribute("data-swiper-slide-index")===t)).column}else e=i.getSlideIndexByData(n);const t=r?Math.ceil(i.slides.length/i.params.grid.rows):i.slides.length,{centeredSlides:s}=i.params;let l=i.params.slidesPerView;"auto"===l?l=i.slidesPerViewDynamic():(l=Math.ceil(parseFloat(i.params.slidesPerView,10)),s&&l%2==0&&(l+=1));let o=t-e<l;if(s&&(o=o||e<Math.ceil(l/2)),a&&s&&"auto"!==i.params.slidesPerView&&!r&&(o=!1),o){const a=s?e<i.activeIndex?"prev":"next":e-i.activeIndex-1<i.params.slidesPerView?"next":"prev";i.loopFix({direction:a,slideTo:!0,activeSlideIndex:"next"===a?e+1:e-t+1,slideRealIndex:"next"===a?i.realIndex:void 0})}if(r){const e=n*i.params.grid.rows;n=i.slides.find((t=>1*t.getAttribute("data-swiper-slide-index")===e)).column}else n=i.getSlideIndexByData(n)}return requestAnimationFrame((()=>{i.slideTo(n,t,s,a)})),i},slideNext:function(e,t,s){void 0===t&&(t=!0);const a=this,{enabled:i,params:r,animating:n}=a;if(!i||a.destroyed)return a;void 0===e&&(e=a.params.speed);let l=r.slidesPerGroup;"auto"===r.slidesPerView&&1===r.slidesPerGroup&&r.slidesPerGroupAuto&&(l=Math.max(a.slidesPerViewDynamic("current",!0),1));const o=a.activeIndex<r.slidesPerGroupSkip?1:l,d=a.virtual&&r.virtual.enabled;if(r.loop){if(n&&!d&&r.loopPreventsSliding)return!1;if(a.loopFix({direction:"next"}),a._clientLeft=a.wrapperEl.clientLeft,a.activeIndex===a.slides.length-1&&r.cssMode)return requestAnimationFrame((()=>{a.slideTo(a.activeIndex+o,e,t,s)})),!0}return r.rewind&&a.isEnd?a.slideTo(0,e,t,s):a.slideTo(a.activeIndex+o,e,t,s)},slidePrev:function(e,t,s){void 0===t&&(t=!0);const a=this,{params:i,snapGrid:r,slidesGrid:n,rtlTranslate:l,enabled:o,animating:d}=a;if(!o||a.destroyed)return a;void 0===e&&(e=a.params.speed);const c=a.virtual&&i.virtual.enabled;if(i.loop){if(d&&!c&&i.loopPreventsSliding)return!1;a.loopFix({direction:"prev"}),a._clientLeft=a.wrapperEl.clientLeft}function p(e){return e<0?-Math.floor(Math.abs(e)):Math.floor(e)}const u=p(l?a.translate:-a.translate),m=r.map((e=>p(e)));let h=r[m.indexOf(u)-1];if(void 0===h&&i.cssMode){let e;r.forEach(((t,s)=>{u>=t&&(e=s)})),void 0!==e&&(h=r[e>0?e-1:e])}let f=0;if(void 0!==h&&(f=n.indexOf(h),f<0&&(f=a.activeIndex-1),"auto"===i.slidesPerView&&1===i.slidesPerGroup&&i.slidesPerGroupAuto&&(f=f-a.slidesPerViewDynamic("previous",!0)+1,f=Math.max(f,0))),i.rewind&&a.isBeginning){const i=a.params.virtual&&a.params.virtual.enabled&&a.virtual?a.virtual.slides.length-1:a.slides.length-1;return a.slideTo(i,e,t,s)}return i.loop&&0===a.activeIndex&&i.cssMode?(requestAnimationFrame((()=>{a.slideTo(f,e,t,s)})),!0):a.slideTo(f,e,t,s)},slideReset:function(e,t,s){void 0===t&&(t=!0);const a=this;if(!a.destroyed)return void 0===e&&(e=a.params.speed),a.slideTo(a.activeIndex,e,t,s)},slideToClosest:function(e,t,s,a){void 0===t&&(t=!0),void 0===a&&(a=.5);const i=this;if(i.destroyed)return;void 0===e&&(e=i.params.speed);let r=i.activeIndex;const n=Math.min(i.params.slidesPerGroupSkip,r),l=n+Math.floor((r-n)/i.params.slidesPerGroup),o=i.rtlTranslate?i.translate:-i.translate;if(o>=i.snapGrid[l]){const e=i.snapGrid[l];o-e>(i.snapGrid[l+1]-e)*a&&(r+=i.params.slidesPerGroup)}else{const e=i.snapGrid[l-1];o-e<=(i.snapGrid[l]-e)*a&&(r-=i.params.slidesPerGroup)}return r=Math.max(r,0),r=Math.min(r,i.slidesGrid.length-1),i.slideTo(r,e,t,s)},slideToClickedSlide:function(){const e=this;if(e.destroyed)return;const{params:t,slidesEl:s}=e,a="auto"===t.slidesPerView?e.slidesPerViewDynamic():t.slidesPerView;let i,r=e.clickedIndex;const n=e.isElement?"swiper-slide":`.${t.slideClass}`;if(t.loop){if(e.animating)return;i=parseInt(e.clickedSlide.getAttribute("data-swiper-slide-index"),10),t.centeredSlides?r<e.loopedSlides-a/2||r>e.slides.length-e.loopedSlides+a/2?(e.loopFix(),r=e.getSlideIndex(f(s,`${n}[data-swiper-slide-index="${i}"]`)[0]),l((()=>{e.slideTo(r)}))):e.slideTo(r):r>e.slides.length-a?(e.loopFix(),r=e.getSlideIndex(f(s,`${n}[data-swiper-slide-index="${i}"]`)[0]),l((()=>{e.slideTo(r)}))):e.slideTo(r)}else e.slideTo(r)}};var R={loopCreate:function(e){const t=this,{params:s,slidesEl:a}=t;if(!s.loop||t.virtual&&t.params.virtual.enabled)return;const i=()=>{f(a,`.${s.slideClass}, swiper-slide`).forEach(((e,t)=>{e.setAttribute("data-swiper-slide-index",t)}))},r=t.grid&&s.grid&&s.grid.rows>1,n=s.slidesPerGroup*(r?s.grid.rows:1),l=t.slides.length%n!=0,o=r&&t.slides.length%s.grid.rows!=0,d=e=>{for(let a=0;a<e;a+=1){const e=t.isElement?v("swiper-slide",[s.slideBlankClass]):v("div",[s.slideClass,s.slideBlankClass]);t.slidesEl.append(e)}};if(l){if(s.loopAddBlankSlides){d(n-t.slides.length%n),t.recalcSlides(),t.updateSlides()}else g("Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");i()}else if(o){if(s.loopAddBlankSlides){d(s.grid.rows-t.slides.length%s.grid.rows),t.recalcSlides(),t.updateSlides()}else g("Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");i()}else i();t.loopFix({slideRealIndex:e,direction:s.centeredSlides?void 0:"next"})},loopFix:function(e){let{slideRealIndex:t,slideTo:s=!0,direction:a,setTranslate:i,activeSlideIndex:r,byController:n,byMousewheel:l}=void 0===e?{}:e;const o=this;if(!o.params.loop)return;o.emit("beforeLoopFix");const{slides:d,allowSlidePrev:c,allowSlideNext:p,slidesEl:u,params:m}=o,{centeredSlides:h}=m;if(o.allowSlidePrev=!0,o.allowSlideNext=!0,o.virtual&&m.virtual.enabled)return s&&(m.centeredSlides||0!==o.snapIndex?m.centeredSlides&&o.snapIndex<m.slidesPerView?o.slideTo(o.virtual.slides.length+o.snapIndex,0,!1,!0):o.snapIndex===o.snapGrid.length-1&&o.slideTo(o.virtual.slidesBefore,0,!1,!0):o.slideTo(o.virtual.slides.length,0,!1,!0)),o.allowSlidePrev=c,o.allowSlideNext=p,void o.emit("loopFix");let f=m.slidesPerView;"auto"===f?f=o.slidesPerViewDynamic():(f=Math.ceil(parseFloat(m.slidesPerView,10)),h&&f%2==0&&(f+=1));const v=m.slidesPerGroupAuto?f:m.slidesPerGroup;let w=v;w%v!=0&&(w+=v-w%v),w+=m.loopAdditionalSlides,o.loopedSlides=w;const b=o.grid&&m.grid&&m.grid.rows>1;d.length<f+w?g("Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled and not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters"):b&&"row"===m.grid.fill&&g("Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`");const y=[],E=[];let x=o.activeIndex;void 0===r?r=o.getSlideIndex(d.find((e=>e.classList.contains(m.slideActiveClass)))):x=r;const S="next"===a||!a,T="prev"===a||!a;let M=0,C=0;const P=b?Math.ceil(d.length/m.grid.rows):d.length,L=(b?d[r].column:r)+(h&&void 0===i?-f/2+.5:0);if(L<w){M=Math.max(w-L,v);for(let e=0;e<w-L;e+=1){const t=e-Math.floor(e/P)*P;if(b){const e=P-t-1;for(let t=d.length-1;t>=0;t-=1)d[t].column===e&&y.push(t)}else y.push(P-t-1)}}else if(L+f>P-w){C=Math.max(L-(P-2*w),v);for(let e=0;e<C;e+=1){const t=e-Math.floor(e/P)*P;b?d.forEach(((e,s)=>{e.column===t&&E.push(s)})):E.push(t)}}if(o.__preventObserver__=!0,requestAnimationFrame((()=>{o.__preventObserver__=!1})),T&&y.forEach((e=>{d[e].swiperLoopMoveDOM=!0,u.prepend(d[e]),d[e].swiperLoopMoveDOM=!1})),S&&E.forEach((e=>{d[e].swiperLoopMoveDOM=!0,u.append(d[e]),d[e].swiperLoopMoveDOM=!1})),o.recalcSlides(),"auto"===m.slidesPerView?o.updateSlides():b&&(y.length>0&&T||E.length>0&&S)&&o.slides.forEach(((e,t)=>{o.grid.updateSlide(t,e,o.slides)})),m.watchSlidesProgress&&o.updateSlidesOffset(),s)if(y.length>0&&T){if(void 0===t){const e=o.slidesGrid[x],t=o.slidesGrid[x+M]-e;l?o.setTranslate(o.translate-t):(o.slideTo(x+Math.ceil(M),0,!1,!0),i&&(o.touchEventsData.startTranslate=o.touchEventsData.startTranslate-t,o.touchEventsData.currentTranslate=o.touchEventsData.currentTranslate-t))}else if(i){const e=b?y.length/m.grid.rows:y.length;o.slideTo(o.activeIndex+e,0,!1,!0),o.touchEventsData.currentTranslate=o.translate}}else if(E.length>0&&S)if(void 0===t){const e=o.slidesGrid[x],t=o.slidesGrid[x-C]-e;l?o.setTranslate(o.translate-t):(o.slideTo(x-C,0,!1,!0),i&&(o.touchEventsData.startTranslate=o.touchEventsData.startTranslate-t,o.touchEventsData.currentTranslate=o.touchEventsData.currentTranslate-t))}else{const e=b?E.length/m.grid.rows:E.length;o.slideTo(o.activeIndex-e,0,!1,!0)}if(o.allowSlidePrev=c,o.allowSlideNext=p,o.controller&&o.controller.control&&!n){const e={slideRealIndex:t,direction:a,setTranslate:i,activeSlideIndex:r,byController:!0};Array.isArray(o.controller.control)?o.controller.control.forEach((t=>{!t.destroyed&&t.params.loop&&t.loopFix({...e,slideTo:t.params.slidesPerView===m.slidesPerView&&s})})):o.controller.control instanceof o.constructor&&o.controller.control.params.loop&&o.controller.control.loopFix({...e,slideTo:o.controller.control.params.slidesPerView===m.slidesPerView&&s})}o.emit("loopFix")},loopDestroy:function(){const e=this,{params:t,slidesEl:s}=e;if(!t.loop||e.virtual&&e.params.virtual.enabled)return;e.recalcSlides();const a=[];e.slides.forEach((e=>{const t=void 0===e.swiperSlideIndex?1*e.getAttribute("data-swiper-slide-index"):e.swiperSlideIndex;a[t]=e})),e.slides.forEach((e=>{e.removeAttribute("data-swiper-slide-index")})),a.forEach((e=>{s.append(e)})),e.recalcSlides(),e.slideTo(e.realIndex,0)}};function q(e,t,s){const a=r(),{params:i}=e,n=i.edgeSwipeDetection,l=i.edgeSwipeThreshold;return!n||!(s<=l||s>=a.innerWidth-l)||"prevent"===n&&(t.preventDefault(),!0)}function F(e){const t=this,s=a();let i=e;i.originalEvent&&(i=i.originalEvent);const n=t.touchEventsData;if("pointerdown"===i.type){if(null!==n.pointerId&&n.pointerId!==i.pointerId)return;n.pointerId=i.pointerId}else"touchstart"===i.type&&1===i.targetTouches.length&&(n.touchId=i.targetTouches[0].identifier);if("touchstart"===i.type)return void q(t,i,i.targetTouches[0].pageX);const{params:l,touches:d,enabled:c}=t;if(!c)return;if(!l.simulateTouch&&"mouse"===i.pointerType)return;if(t.animating&&l.preventInteractionOnTransition)return;!t.animating&&l.cssMode&&l.loop&&t.loopFix();let p=i.target;if("wrapper"===l.touchEventsTarget&&!function(e,t){const s=r();let a=t.contains(e);!a&&s.HTMLSlotElement&&t instanceof HTMLSlotElement&&(a=[...t.assignedElements()].includes(e),a||(a=function(e,t){const s=[t];for(;s.length>0;){const t=s.shift();if(e===t)return!0;s.push(...t.children,...t.shadowRoot?.children||[],...t.assignedElements?.()||[])}}(e,t)));return a}(p,t.wrapperEl))return;if("which"in i&&3===i.which)return;if("button"in i&&i.button>0)return;if(n.isTouched&&n.isMoved)return;const u=!!l.noSwipingClass&&""!==l.noSwipingClass,m=i.composedPath?i.composedPath():i.path;u&&i.target&&i.target.shadowRoot&&m&&(p=m[0]);const h=l.noSwipingSelector?l.noSwipingSelector:`.${l.noSwipingClass}`,f=!(!i.target||!i.target.shadowRoot);if(l.noSwiping&&(f?function(e,t){return void 0===t&&(t=this),function t(s){if(!s||s===a()||s===r())return null;s.assignedSlot&&(s=s.assignedSlot);const i=s.closest(e);return i||s.getRootNode?i||t(s.getRootNode().host):null}(t)}(h,p):p.closest(h)))return void(t.allowClick=!0);if(l.swipeHandler&&!p.closest(l.swipeHandler))return;d.currentX=i.pageX,d.currentY=i.pageY;const g=d.currentX,v=d.currentY;if(!q(t,i,g))return;Object.assign(n,{isTouched:!0,isMoved:!1,allowTouchCallbacks:!0,isScrolling:void 0,startMoving:void 0}),d.startX=g,d.startY=v,n.touchStartTime=o(),t.allowClick=!0,t.updateSize(),t.swipeDirection=void 0,l.threshold>0&&(n.allowThresholdMove=!1);let w=!0;p.matches(n.focusableElements)&&(w=!1,"SELECT"===p.nodeName&&(n.isTouched=!1)),s.activeElement&&s.activeElement.matches(n.focusableElements)&&s.activeElement!==p&&("mouse"===i.pointerType||"mouse"!==i.pointerType&&!p.matches(n.focusableElements))&&s.activeElement.blur();const b=w&&t.allowTouchMove&&l.touchStartPreventDefault;!l.touchStartForcePreventDefault&&!b||p.isContentEditable||i.preventDefault(),l.freeMode&&l.freeMode.enabled&&t.freeMode&&t.animating&&!l.cssMode&&t.freeMode.onTouchStart(),t.emit("touchStart",i)}function V(e){const t=a(),s=this,i=s.touchEventsData,{params:r,touches:n,rtlTranslate:l,enabled:d}=s;if(!d)return;if(!r.simulateTouch&&"mouse"===e.pointerType)return;let c,p=e;if(p.originalEvent&&(p=p.originalEvent),"pointermove"===p.type){if(null!==i.touchId)return;if(p.pointerId!==i.pointerId)return}if("touchmove"===p.type){if(c=[...p.changedTouches].find((e=>e.identifier===i.touchId)),!c||c.identifier!==i.touchId)return}else c=p;if(!i.isTouched)return void(i.startMoving&&i.isScrolling&&s.emit("touchMoveOpposite",p));const u=c.pageX,m=c.pageY;if(p.preventedByNestedSwiper)return n.startX=u,void(n.startY=m);if(!s.allowTouchMove)return p.target.matches(i.focusableElements)||(s.allowClick=!1),void(i.isTouched&&(Object.assign(n,{startX:u,startY:m,currentX:u,currentY:m}),i.touchStartTime=o()));if(r.touchReleaseOnEdges&&!r.loop)if(s.isVertical()){if(m<n.startY&&s.translate<=s.maxTranslate()||m>n.startY&&s.translate>=s.minTranslate())return i.isTouched=!1,void(i.isMoved=!1)}else if(u<n.startX&&s.translate<=s.maxTranslate()||u>n.startX&&s.translate>=s.minTranslate())return;if(t.activeElement&&t.activeElement.matches(i.focusableElements)&&t.activeElement!==p.target&&"mouse"!==p.pointerType&&t.activeElement.blur(),t.activeElement&&p.target===t.activeElement&&p.target.matches(i.focusableElements))return i.isMoved=!0,void(s.allowClick=!1);i.allowTouchCallbacks&&s.emit("touchMove",p),n.previousX=n.currentX,n.previousY=n.currentY,n.currentX=u,n.currentY=m;const h=n.currentX-n.startX,f=n.currentY-n.startY;if(s.params.threshold&&Math.sqrt(h**2+f**2)<s.params.threshold)return;if(void 0===i.isScrolling){let e;s.isHorizontal()&&n.currentY===n.startY||s.isVertical()&&n.currentX===n.startX?i.isScrolling=!1:h*h+f*f>=25&&(e=180*Math.atan2(Math.abs(f),Math.abs(h))/Math.PI,i.isScrolling=s.isHorizontal()?e>r.touchAngle:90-e>r.touchAngle)}if(i.isScrolling&&s.emit("touchMoveOpposite",p),void 0===i.startMoving&&(n.currentX===n.startX&&n.currentY===n.startY||(i.startMoving=!0)),i.isScrolling||"touchmove"===p.type&&i.preventTouchMoveFromPointerMove)return void(i.isTouched=!1);if(!i.startMoving)return;s.allowClick=!1,!r.cssMode&&p.cancelable&&p.preventDefault(),r.touchMoveStopPropagation&&!r.nested&&p.stopPropagation();let g=s.isHorizontal()?h:f,v=s.isHorizontal()?n.currentX-n.previousX:n.currentY-n.previousY;r.oneWayMovement&&(g=Math.abs(g)*(l?1:-1),v=Math.abs(v)*(l?1:-1)),n.diff=g,g*=r.touchRatio,l&&(g=-g,v=-v);const w=s.touchesDirection;s.swipeDirection=g>0?"prev":"next",s.touchesDirection=v>0?"prev":"next";const b=s.params.loop&&!r.cssMode,y="next"===s.touchesDirection&&s.allowSlideNext||"prev"===s.touchesDirection&&s.allowSlidePrev;if(!i.isMoved){if(b&&y&&s.loopFix({direction:s.swipeDirection}),i.startTranslate=s.getTranslate(),s.setTransition(0),s.animating){const e=new window.CustomEvent("transitionend",{bubbles:!0,cancelable:!0,detail:{bySwiperTouchMove:!0}});s.wrapperEl.dispatchEvent(e)}i.allowMomentumBounce=!1,!r.grabCursor||!0!==s.allowSlideNext&&!0!==s.allowSlidePrev||s.setGrabCursor(!0),s.emit("sliderFirstMove",p)}if((new Date).getTime(),i.isMoved&&i.allowThresholdMove&&w!==s.touchesDirection&&b&&y&&Math.abs(g)>=1)return Object.assign(n,{startX:u,startY:m,currentX:u,currentY:m,startTranslate:i.currentTranslate}),i.loopSwapReset=!0,void(i.startTranslate=i.currentTranslate);s.emit("sliderMove",p),i.isMoved=!0,i.currentTranslate=g+i.startTranslate;let E=!0,x=r.resistanceRatio;if(r.touchReleaseOnEdges&&(x=0),g>0?(b&&y&&i.allowThresholdMove&&i.currentTranslate>(r.centeredSlides?s.minTranslate()-s.slidesSizesGrid[s.activeIndex+1]-("auto"!==r.slidesPerView&&s.slides.length-r.slidesPerView>=2?s.slidesSizesGrid[s.activeIndex+1]+s.params.spaceBetween:0)-s.params.spaceBetween:s.minTranslate())&&s.loopFix({direction:"prev",setTranslate:!0,activeSlideIndex:0}),i.currentTranslate>s.minTranslate()&&(E=!1,r.resistance&&(i.currentTranslate=s.minTranslate()-1+(-s.minTranslate()+i.startTranslate+g)**x))):g<0&&(b&&y&&i.allowThresholdMove&&i.currentTranslate<(r.centeredSlides?s.maxTranslate()+s.slidesSizesGrid[s.slidesSizesGrid.length-1]+s.params.spaceBetween+("auto"!==r.slidesPerView&&s.slides.length-r.slidesPerView>=2?s.slidesSizesGrid[s.slidesSizesGrid.length-1]+s.params.spaceBetween:0):s.maxTranslate())&&s.loopFix({direction:"next",setTranslate:!0,activeSlideIndex:s.slides.length-("auto"===r.slidesPerView?s.slidesPerViewDynamic():Math.ceil(parseFloat(r.slidesPerView,10)))}),i.currentTranslate<s.maxTranslate()&&(E=!1,r.resistance&&(i.currentTranslate=s.maxTranslate()+1-(s.maxTranslate()-i.startTranslate-g)**x))),E&&(p.preventedByNestedSwiper=!0),!s.allowSlideNext&&"next"===s.swipeDirection&&i.currentTranslate<i.startTranslate&&(i.currentTranslate=i.startTranslate),!s.allowSlidePrev&&"prev"===s.swipeDirection&&i.currentTranslate>i.startTranslate&&(i.currentTranslate=i.startTranslate),s.allowSlidePrev||s.allowSlideNext||(i.currentTranslate=i.startTranslate),r.threshold>0){if(!(Math.abs(g)>r.threshold||i.allowThresholdMove))return void(i.currentTranslate=i.startTranslate);if(!i.allowThresholdMove)return i.allowThresholdMove=!0,n.startX=n.currentX,n.startY=n.currentY,i.currentTranslate=i.startTranslate,void(n.diff=s.isHorizontal()?n.currentX-n.startX:n.currentY-n.startY)}r.followFinger&&!r.cssMode&&((r.freeMode&&r.freeMode.enabled&&s.freeMode||r.watchSlidesProgress)&&(s.updateActiveIndex(),s.updateSlidesClasses()),r.freeMode&&r.freeMode.enabled&&s.freeMode&&s.freeMode.onTouchMove(),s.updateProgress(i.currentTranslate),s.setTranslate(i.currentTranslate))}function _(e){const t=this,s=t.touchEventsData;let a,i=e;i.originalEvent&&(i=i.originalEvent);if("touchend"===i.type||"touchcancel"===i.type){if(a=[...i.changedTouches].find((e=>e.identifier===s.touchId)),!a||a.identifier!==s.touchId)return}else{if(null!==s.touchId)return;if(i.pointerId!==s.pointerId)return;a=i}if(["pointercancel","pointerout","pointerleave","contextmenu"].includes(i.type)){if(!(["pointercancel","contextmenu"].includes(i.type)&&(t.browser.isSafari||t.browser.isWebView)))return}s.pointerId=null,s.touchId=null;const{params:r,touches:n,rtlTranslate:d,slidesGrid:c,enabled:p}=t;if(!p)return;if(!r.simulateTouch&&"mouse"===i.pointerType)return;if(s.allowTouchCallbacks&&t.emit("touchEnd",i),s.allowTouchCallbacks=!1,!s.isTouched)return s.isMoved&&r.grabCursor&&t.setGrabCursor(!1),s.isMoved=!1,void(s.startMoving=!1);r.grabCursor&&s.isMoved&&s.isTouched&&(!0===t.allowSlideNext||!0===t.allowSlidePrev)&&t.setGrabCursor(!1);const u=o(),m=u-s.touchStartTime;if(t.allowClick){const e=i.path||i.composedPath&&i.composedPath();t.updateClickedSlide(e&&e[0]||i.target,e),t.emit("tap click",i),m<300&&u-s.lastClickTime<300&&t.emit("doubleTap doubleClick",i)}if(s.lastClickTime=o(),l((()=>{t.destroyed||(t.allowClick=!0)})),!s.isTouched||!s.isMoved||!t.swipeDirection||0===n.diff&&!s.loopSwapReset||s.currentTranslate===s.startTranslate&&!s.loopSwapReset)return s.isTouched=!1,s.isMoved=!1,void(s.startMoving=!1);let h;if(s.isTouched=!1,s.isMoved=!1,s.startMoving=!1,h=r.followFinger?d?t.translate:-t.translate:-s.currentTranslate,r.cssMode)return;if(r.freeMode&&r.freeMode.enabled)return void t.freeMode.onTouchEnd({currentPos:h});const f=h>=-t.maxTranslate()&&!t.params.loop;let g=0,v=t.slidesSizesGrid[0];for(let e=0;e<c.length;e+=e<r.slidesPerGroupSkip?1:r.slidesPerGroup){const t=e<r.slidesPerGroupSkip-1?1:r.slidesPerGroup;void 0!==c[e+t]?(f||h>=c[e]&&h<c[e+t])&&(g=e,v=c[e+t]-c[e]):(f||h>=c[e])&&(g=e,v=c[c.length-1]-c[c.length-2])}let w=null,b=null;r.rewind&&(t.isBeginning?b=r.virtual&&r.virtual.enabled&&t.virtual?t.virtual.slides.length-1:t.slides.length-1:t.isEnd&&(w=0));const y=(h-c[g])/v,E=g<r.slidesPerGroupSkip-1?1:r.slidesPerGroup;if(m>r.longSwipesMs){if(!r.longSwipes)return void t.slideTo(t.activeIndex);"next"===t.swipeDirection&&(y>=r.longSwipesRatio?t.slideTo(r.rewind&&t.isEnd?w:g+E):t.slideTo(g)),"prev"===t.swipeDirection&&(y>1-r.longSwipesRatio?t.slideTo(g+E):null!==b&&y<0&&Math.abs(y)>r.longSwipesRatio?t.slideTo(b):t.slideTo(g))}else{if(!r.shortSwipes)return void t.slideTo(t.activeIndex);t.navigation&&(i.target===t.navigation.nextEl||i.target===t.navigation.prevEl)?i.target===t.navigation.nextEl?t.slideTo(g+E):t.slideTo(g):("next"===t.swipeDirection&&t.slideTo(null!==w?w:g+E),"prev"===t.swipeDirection&&t.slideTo(null!==b?b:g))}}function W(){const e=this,{params:t,el:s}=e;if(s&&0===s.offsetWidth)return;t.breakpoints&&e.setBreakpoint();const{allowSlideNext:a,allowSlidePrev:i,snapGrid:r}=e,n=e.virtual&&e.params.virtual.enabled;e.allowSlideNext=!0,e.allowSlidePrev=!0,e.updateSize(),e.updateSlides(),e.updateSlidesClasses();const l=n&&t.loop;!("auto"===t.slidesPerView||t.slidesPerView>1)||!e.isEnd||e.isBeginning||e.params.centeredSlides||l?e.params.loop&&!n?e.slideToLoop(e.realIndex,0,!1,!0):e.slideTo(e.activeIndex,0,!1,!0):e.slideTo(e.slides.length-1,0,!1,!0),e.autoplay&&e.autoplay.running&&e.autoplay.paused&&(clearTimeout(e.autoplay.resizeTimeout),e.autoplay.resizeTimeout=setTimeout((()=>{e.autoplay&&e.autoplay.running&&e.autoplay.paused&&e.autoplay.resume()}),500)),e.allowSlidePrev=i,e.allowSlideNext=a,e.params.watchOverflow&&r!==e.snapGrid&&e.checkOverflow()}function j(e){const t=this;t.enabled&&(t.allowClick||(t.params.preventClicks&&e.preventDefault(),t.params.preventClicksPropagation&&t.animating&&(e.stopPropagation(),e.stopImmediatePropagation())))}function U(){const e=this,{wrapperEl:t,rtlTranslate:s,enabled:a}=e;if(!a)return;let i;e.previousTranslate=e.translate,e.isHorizontal()?e.translate=-t.scrollLeft:e.translate=-t.scrollTop,0===e.translate&&(e.translate=0),e.updateActiveIndex(),e.updateSlidesClasses();const r=e.maxTranslate()-e.minTranslate();i=0===r?0:(e.translate-e.minTranslate())/r,i!==e.progress&&e.updateProgress(s?-e.translate:e.translate),e.emit("setTranslate",e.translate,!1)}function K(e){const t=this;D(t,e.target),t.params.cssMode||"auto"!==t.params.slidesPerView&&!t.params.autoHeight||t.update()}function Z(){const e=this;e.documentTouchHandlerProceeded||(e.documentTouchHandlerProceeded=!0,e.params.touchReleaseOnEdges&&(e.el.style.touchAction="auto"))}const Q=(e,t)=>{const s=a(),{params:i,el:r,wrapperEl:n,device:l}=e,o=!!i.nested,d="on"===t?"addEventListener":"removeEventListener",c=t;r&&"string"!=typeof r&&(s[d]("touchstart",e.onDocumentTouchStart,{passive:!1,capture:o}),r[d]("touchstart",e.onTouchStart,{passive:!1}),r[d]("pointerdown",e.onTouchStart,{passive:!1}),s[d]("touchmove",e.onTouchMove,{passive:!1,capture:o}),s[d]("pointermove",e.onTouchMove,{passive:!1,capture:o}),s[d]("touchend",e.onTouchEnd,{passive:!0}),s[d]("pointerup",e.onTouchEnd,{passive:!0}),s[d]("pointercancel",e.onTouchEnd,{passive:!0}),s[d]("touchcancel",e.onTouchEnd,{passive:!0}),s[d]("pointerout",e.onTouchEnd,{passive:!0}),s[d]("pointerleave",e.onTouchEnd,{passive:!0}),s[d]("contextmenu",e.onTouchEnd,{passive:!0}),(i.preventClicks||i.preventClicksPropagation)&&r[d]("click",e.onClick,!0),i.cssMode&&n[d]("scroll",e.onScroll),i.updateOnWindowResize?e[c](l.ios||l.android?"resize orientationchange observerUpdate":"resize observerUpdate",W,!0):e[c]("observerUpdate",W,!0),r[d]("load",e.onLoad,{capture:!0}))};const J=(e,t)=>e.grid&&t.grid&&t.grid.rows>1;var ee={init:!0,direction:"horizontal",oneWayMovement:!1,swiperElementNodeName:"SWIPER-CONTAINER",touchEventsTarget:"wrapper",initialSlide:0,speed:300,cssMode:!1,updateOnWindowResize:!0,resizeObserver:!0,nested:!1,createElements:!1,eventsPrefix:"swiper",enabled:!0,focusableElements:"input, select, option, textarea, button, video, label",width:null,height:null,preventInteractionOnTransition:!1,userAgent:null,url:null,edgeSwipeDetection:!1,edgeSwipeThreshold:20,autoHeight:!1,setWrapperSize:!1,virtualTranslate:!1,effect:"slide",breakpoints:void 0,breakpointsBase:"window",spaceBetween:0,slidesPerView:1,slidesPerGroup:1,slidesPerGroupSkip:0,slidesPerGroupAuto:!1,centeredSlides:!1,centeredSlidesBounds:!1,slidesOffsetBefore:0,slidesOffsetAfter:0,normalizeSlideIndex:!0,centerInsufficientSlides:!1,watchOverflow:!0,roundLengths:!1,touchRatio:1,touchAngle:45,simulateTouch:!0,shortSwipes:!0,longSwipes:!0,longSwipesRatio:.5,longSwipesMs:300,followFinger:!0,allowTouchMove:!0,threshold:5,touchMoveStopPropagation:!1,touchStartPreventDefault:!0,touchStartForcePreventDefault:!1,touchReleaseOnEdges:!1,uniqueNavElements:!0,resistance:!0,resistanceRatio:.85,watchSlidesProgress:!1,grabCursor:!1,preventClicks:!0,preventClicksPropagation:!0,slideToClickedSlide:!1,loop:!1,loopAddBlankSlides:!0,loopAdditionalSlides:0,loopPreventsSliding:!0,rewind:!1,allowSlidePrev:!0,allowSlideNext:!0,swipeHandler:null,noSwiping:!0,noSwipingClass:"swiper-no-swiping",noSwipingSelector:null,passiveListeners:!0,maxBackfaceHiddenSlides:10,containerModifierClass:"swiper-",slideClass:"swiper-slide",slideBlankClass:"swiper-slide-blank",slideActiveClass:"swiper-slide-active",slideVisibleClass:"swiper-slide-visible",slideFullyVisibleClass:"swiper-slide-fully-visible",slideNextClass:"swiper-slide-next",slidePrevClass:"swiper-slide-prev",wrapperClass:"swiper-wrapper",lazyPreloaderClass:"swiper-lazy-preloader",lazyPreloadPrevNext:0,runCallbacksOnInit:!0,_emitClasses:!1};function te(e,t){return function(s){void 0===s&&(s={});const a=Object.keys(s)[0],i=s[a];"object"==typeof i&&null!==i?(!0===e[a]&&(e[a]={enabled:!0}),"navigation"===a&&e[a]&&e[a].enabled&&!e[a].prevEl&&!e[a].nextEl&&(e[a].auto=!0),["pagination","scrollbar"].indexOf(a)>=0&&e[a]&&e[a].enabled&&!e[a].el&&(e[a].auto=!0),a in e&&"enabled"in i?("object"!=typeof e[a]||"enabled"in e[a]||(e[a].enabled=!0),e[a]||(e[a]={enabled:!1}),p(t,s)):p(t,s)):p(t,s)}}const se={eventsEmitter:$,update:X,translate:B,transition:{setTransition:function(e,t){const s=this;s.params.cssMode||(s.wrapperEl.style.transitionDuration=`${e}ms`,s.wrapperEl.style.transitionDelay=0===e?"0ms":""),s.emit("setTransition",e,t)},transitionStart:function(e,t){void 0===e&&(e=!0);const s=this,{params:a}=s;a.cssMode||(a.autoHeight&&s.updateAutoHeight(),Y({swiper:s,runCallbacks:e,direction:t,step:"Start"}))},transitionEnd:function(e,t){void 0===e&&(e=!0);const s=this,{params:a}=s;s.animating=!1,a.cssMode||(s.setTransition(0),Y({swiper:s,runCallbacks:e,direction:t,step:"End"}))}},slide:N,loop:R,grabCursor:{setGrabCursor:function(e){const t=this;if(!t.params.simulateTouch||t.params.watchOverflow&&t.isLocked||t.params.cssMode)return;const s="container"===t.params.touchEventsTarget?t.el:t.wrapperEl;t.isElement&&(t.__preventObserver__=!0),s.style.cursor="move",s.style.cursor=e?"grabbing":"grab",t.isElement&&requestAnimationFrame((()=>{t.__preventObserver__=!1}))},unsetGrabCursor:function(){const e=this;e.params.watchOverflow&&e.isLocked||e.params.cssMode||(e.isElement&&(e.__preventObserver__=!0),e["container"===e.params.touchEventsTarget?"el":"wrapperEl"].style.cursor="",e.isElement&&requestAnimationFrame((()=>{e.__preventObserver__=!1})))}},events:{attachEvents:function(){const e=this,{params:t}=e;e.onTouchStart=F.bind(e),e.onTouchMove=V.bind(e),e.onTouchEnd=_.bind(e),e.onDocumentTouchStart=Z.bind(e),t.cssMode&&(e.onScroll=U.bind(e)),e.onClick=j.bind(e),e.onLoad=K.bind(e),Q(e,"on")},detachEvents:function(){Q(this,"off")}},breakpoints:{setBreakpoint:function(){const e=this,{realIndex:t,initialized:s,params:i,el:r}=e,n=i.breakpoints;if(!n||n&&0===Object.keys(n).length)return;const l=a(),o="window"!==i.breakpointsBase&&i.breakpointsBase?"container":i.breakpointsBase,d=["window","container"].includes(i.breakpointsBase)||!i.breakpointsBase?e.el:l.querySelector(i.breakpointsBase),c=e.getBreakpoint(n,o,d);if(!c||e.currentBreakpoint===c)return;const u=(c in n?n[c]:void 0)||e.originalParams,m=J(e,i),h=J(e,u),f=e.params.grabCursor,g=u.grabCursor,v=i.enabled;m&&!h?(r.classList.remove(`${i.containerModifierClass}grid`,`${i.containerModifierClass}grid-column`),e.emitContainerClasses()):!m&&h&&(r.classList.add(`${i.containerModifierClass}grid`),(u.grid.fill&&"column"===u.grid.fill||!u.grid.fill&&"column"===i.grid.fill)&&r.classList.add(`${i.containerModifierClass}grid-column`),e.emitContainerClasses()),f&&!g?e.unsetGrabCursor():!f&&g&&e.setGrabCursor(),["navigation","pagination","scrollbar"].forEach((t=>{if(void 0===u[t])return;const s=i[t]&&i[t].enabled,a=u[t]&&u[t].enabled;s&&!a&&e[t].disable(),!s&&a&&e[t].enable()}));const w=u.direction&&u.direction!==i.direction,b=i.loop&&(u.slidesPerView!==i.slidesPerView||w),y=i.loop;w&&s&&e.changeDirection(),p(e.params,u);const E=e.params.enabled,x=e.params.loop;Object.assign(e,{allowTouchMove:e.params.allowTouchMove,allowSlideNext:e.params.allowSlideNext,allowSlidePrev:e.params.allowSlidePrev}),v&&!E?e.disable():!v&&E&&e.enable(),e.currentBreakpoint=c,e.emit("_beforeBreakpoint",u),s&&(b?(e.loopDestroy(),e.loopCreate(t),e.updateSlides()):!y&&x?(e.loopCreate(t),e.updateSlides()):y&&!x&&e.loopDestroy()),e.emit("breakpoint",u)},getBreakpoint:function(e,t,s){if(void 0===t&&(t="window"),!e||"container"===t&&!s)return;let a=!1;const i=r(),n="window"===t?i.innerHeight:s.clientHeight,l=Object.keys(e).map((e=>{if("string"==typeof e&&0===e.indexOf("@")){const t=parseFloat(e.substr(1));return{value:n*t,point:e}}return{value:e,point:e}}));l.sort(((e,t)=>parseInt(e.value,10)-parseInt(t.value,10)));for(let e=0;e<l.length;e+=1){const{point:r,value:n}=l[e];"window"===t?i.matchMedia(`(min-width: ${n}px)`).matches&&(a=r):n<=s.clientWidth&&(a=r)}return a||"max"}},checkOverflow:{checkOverflow:function(){const e=this,{isLocked:t,params:s}=e,{slidesOffsetBefore:a}=s;if(a){const t=e.slides.length-1,s=e.slidesGrid[t]+e.slidesSizesGrid[t]+2*a;e.isLocked=e.size>s}else e.isLocked=1===e.snapGrid.length;!0===s.allowSlideNext&&(e.allowSlideNext=!e.isLocked),!0===s.allowSlidePrev&&(e.allowSlidePrev=!e.isLocked),t&&t!==e.isLocked&&(e.isEnd=!1),t!==e.isLocked&&e.emit(e.isLocked?"lock":"unlock")}},classes:{addClasses:function(){const e=this,{classNames:t,params:s,rtl:a,el:i,device:r}=e,n=function(e,t){const s=[];return e.forEach((e=>{"object"==typeof e?Object.keys(e).forEach((a=>{e[a]&&s.push(t+a)})):"string"==typeof e&&s.push(t+e)})),s}(["initialized",s.direction,{"free-mode":e.params.freeMode&&s.freeMode.enabled},{autoheight:s.autoHeight},{rtl:a},{grid:s.grid&&s.grid.rows>1},{"grid-column":s.grid&&s.grid.rows>1&&"column"===s.grid.fill},{android:r.android},{ios:r.ios},{"css-mode":s.cssMode},{centered:s.cssMode&&s.centeredSlides},{"watch-progress":s.watchSlidesProgress}],s.containerModifierClass);t.push(...n),i.classList.add(...t),e.emitContainerClasses()},removeClasses:function(){const{el:e,classNames:t}=this;e&&"string"!=typeof e&&(e.classList.remove(...t),this.emitContainerClasses())}}},ae={};class ie{constructor(){let e,t;for(var s=arguments.length,i=new Array(s),r=0;r<s;r++)i[r]=arguments[r];1===i.length&&i[0].constructor&&"Object"===Object.prototype.toString.call(i[0]).slice(8,-1)?t=i[0]:[e,t]=i,t||(t={}),t=p({},t),e&&!t.el&&(t.el=e);const n=a();if(t.el&&"string"==typeof t.el&&n.querySelectorAll(t.el).length>1){const e=[];return n.querySelectorAll(t.el).forEach((s=>{const a=p({},t,{el:s});e.push(new ie(a))})),e}const l=this;l.__swiper__=!0,l.support=I(),l.device=z({userAgent:t.userAgent}),l.browser=A(),l.eventsListeners={},l.eventsAnyListeners=[],l.modules=[...l.__modules__],t.modules&&Array.isArray(t.modules)&&l.modules.push(...t.modules);const o={};l.modules.forEach((e=>{e({params:t,swiper:l,extendParams:te(t,o),on:l.on.bind(l),once:l.once.bind(l),off:l.off.bind(l),emit:l.emit.bind(l)})}));const d=p({},ee,o);return l.params=p({},d,ae,t),l.originalParams=p({},l.params),l.passedParams=p({},t),l.params&&l.params.on&&Object.keys(l.params.on).forEach((e=>{l.on(e,l.params.on[e])})),l.params&&l.params.onAny&&l.onAny(l.params.onAny),Object.assign(l,{enabled:l.params.enabled,el:e,classNames:[],slides:[],slidesGrid:[],snapGrid:[],slidesSizesGrid:[],isHorizontal:()=>"horizontal"===l.params.direction,isVertical:()=>"vertical"===l.params.direction,activeIndex:0,realIndex:0,isBeginning:!0,isEnd:!1,translate:0,previousTranslate:0,progress:0,velocity:0,animating:!1,cssOverflowAdjustment(){return Math.trunc(this.translate/2**23)*2**23},allowSlideNext:l.params.allowSlideNext,allowSlidePrev:l.params.allowSlidePrev,touchEventsData:{isTouched:void 0,isMoved:void 0,allowTouchCallbacks:void 0,touchStartTime:void 0,isScrolling:void 0,currentTranslate:void 0,startTranslate:void 0,allowThresholdMove:void 0,focusableElements:l.params.focusableElements,lastClickTime:0,clickTimeout:void 0,velocities:[],allowMomentumBounce:void 0,startMoving:void 0,pointerId:null,touchId:null},allowClick:!0,allowTouchMove:l.params.allowTouchMove,touches:{startX:0,startY:0,currentX:0,currentY:0,diff:0},imagesToLoad:[],imagesLoaded:0}),l.emit("_swiper"),l.params.init&&l.init(),l}getDirectionLabel(e){return this.isHorizontal()?e:{width:"height","margin-top":"margin-left","margin-bottom ":"margin-right","margin-left":"margin-top","margin-right":"margin-bottom","padding-left":"padding-top","padding-right":"padding-bottom",marginRight:"marginBottom"}[e]}getSlideIndex(e){const{slidesEl:t,params:s}=this,a=y(f(t,`.${s.slideClass}, swiper-slide`)[0]);return y(e)-a}getSlideIndexByData(e){return this.getSlideIndex(this.slides.find((t=>1*t.getAttribute("data-swiper-slide-index")===e)))}recalcSlides(){const{slidesEl:e,params:t}=this;this.slides=f(e,`.${t.slideClass}, swiper-slide`)}enable(){const e=this;e.enabled||(e.enabled=!0,e.params.grabCursor&&e.setGrabCursor(),e.emit("enable"))}disable(){const e=this;e.enabled&&(e.enabled=!1,e.params.grabCursor&&e.unsetGrabCursor(),e.emit("disable"))}setProgress(e,t){const s=this;e=Math.min(Math.max(e,0),1);const a=s.minTranslate(),i=(s.maxTranslate()-a)*e+a;s.translateTo(i,void 0===t?0:t),s.updateActiveIndex(),s.updateSlidesClasses()}emitContainerClasses(){const e=this;if(!e.params._emitClasses||!e.el)return;const t=e.el.className.split(" ").filter((t=>0===t.indexOf("swiper")||0===t.indexOf(e.params.containerModifierClass)));e.emit("_containerClasses",t.join(" "))}getSlideClasses(e){const t=this;return t.destroyed?"":e.className.split(" ").filter((e=>0===e.indexOf("swiper-slide")||0===e.indexOf(t.params.slideClass))).join(" ")}emitSlidesClasses(){const e=this;if(!e.params._emitClasses||!e.el)return;const t=[];e.slides.forEach((s=>{const a=e.getSlideClasses(s);t.push({slideEl:s,classNames:a}),e.emit("_slideClass",s,a)})),e.emit("_slideClasses",t)}slidesPerViewDynamic(e,t){void 0===e&&(e="current"),void 0===t&&(t=!1);const{params:s,slides:a,slidesGrid:i,slidesSizesGrid:r,size:n,activeIndex:l}=this;let o=1;if("number"==typeof s.slidesPerView)return s.slidesPerView;if(s.centeredSlides){let e,t=a[l]?Math.ceil(a[l].swiperSlideSize):0;for(let s=l+1;s<a.length;s+=1)a[s]&&!e&&(t+=Math.ceil(a[s].swiperSlideSize),o+=1,t>n&&(e=!0));for(let s=l-1;s>=0;s-=1)a[s]&&!e&&(t+=a[s].swiperSlideSize,o+=1,t>n&&(e=!0))}else if("current"===e)for(let e=l+1;e<a.length;e+=1){(t?i[e]+r[e]-i[l]<n:i[e]-i[l]<n)&&(o+=1)}else for(let e=l-1;e>=0;e-=1){i[l]-i[e]<n&&(o+=1)}return o}update(){const e=this;if(!e||e.destroyed)return;const{snapGrid:t,params:s}=e;function a(){const t=e.rtlTranslate?-1*e.translate:e.translate,s=Math.min(Math.max(t,e.maxTranslate()),e.minTranslate());e.setTranslate(s),e.updateActiveIndex(),e.updateSlidesClasses()}let i;if(s.breakpoints&&e.setBreakpoint(),[...e.el.querySelectorAll('[loading="lazy"]')].forEach((t=>{t.complete&&D(e,t)})),e.updateSize(),e.updateSlides(),e.updateProgress(),e.updateSlidesClasses(),s.freeMode&&s.freeMode.enabled&&!s.cssMode)a(),s.autoHeight&&e.updateAutoHeight();else{if(("auto"===s.slidesPerView||s.slidesPerView>1)&&e.isEnd&&!s.centeredSlides){const t=e.virtual&&s.virtual.enabled?e.virtual.slides:e.slides;i=e.slideTo(t.length-1,0,!1,!0)}else i=e.slideTo(e.activeIndex,0,!1,!0);i||a()}s.watchOverflow&&t!==e.snapGrid&&e.checkOverflow(),e.emit("update")}changeDirection(e,t){void 0===t&&(t=!0);const s=this,a=s.params.direction;return e||(e="horizontal"===a?"vertical":"horizontal"),e===a||"horizontal"!==e&&"vertical"!==e||(s.el.classList.remove(`${s.params.containerModifierClass}${a}`),s.el.classList.add(`${s.params.containerModifierClass}${e}`),s.emitContainerClasses(),s.params.direction=e,s.slides.forEach((t=>{"vertical"===e?t.style.width="":t.style.height=""})),s.emit("changeDirection"),t&&s.update()),s}changeLanguageDirection(e){const t=this;t.rtl&&"rtl"===e||!t.rtl&&"ltr"===e||(t.rtl="rtl"===e,t.rtlTranslate="horizontal"===t.params.direction&&t.rtl,t.rtl?(t.el.classList.add(`${t.params.containerModifierClass}rtl`),t.el.dir="rtl"):(t.el.classList.remove(`${t.params.containerModifierClass}rtl`),t.el.dir="ltr"),t.update())}mount(e){const t=this;if(t.mounted)return!0;let s=e||t.params.el;if("string"==typeof s&&(s=document.querySelector(s)),!s)return!1;s.swiper=t,s.parentNode&&s.parentNode.host&&s.parentNode.host.nodeName===t.params.swiperElementNodeName.toUpperCase()&&(t.isElement=!0);const a=()=>`.${(t.params.wrapperClass||"").trim().split(" ").join(".")}`;let i=(()=>{if(s&&s.shadowRoot&&s.shadowRoot.querySelector){return s.shadowRoot.querySelector(a())}return f(s,a())[0]})();return!i&&t.params.createElements&&(i=v("div",t.params.wrapperClass),s.append(i),f(s,`.${t.params.slideClass}`).forEach((e=>{i.append(e)}))),Object.assign(t,{el:s,wrapperEl:i,slidesEl:t.isElement&&!s.parentNode.host.slideSlots?s.parentNode.host:i,hostEl:t.isElement?s.parentNode.host:s,mounted:!0,rtl:"rtl"===s.dir.toLowerCase()||"rtl"===b(s,"direction"),rtlTranslate:"horizontal"===t.params.direction&&("rtl"===s.dir.toLowerCase()||"rtl"===b(s,"direction")),wrongRTL:"-webkit-box"===b(i,"display")}),!0}init(e){const t=this;if(t.initialized)return t;if(!1===t.mount(e))return t;t.emit("beforeInit"),t.params.breakpoints&&t.setBreakpoint(),t.addClasses(),t.updateSize(),t.updateSlides(),t.params.watchOverflow&&t.checkOverflow(),t.params.grabCursor&&t.enabled&&t.setGrabCursor(),t.params.loop&&t.virtual&&t.params.virtual.enabled?t.slideTo(t.params.initialSlide+t.virtual.slidesBefore,0,t.params.runCallbacksOnInit,!1,!0):t.slideTo(t.params.initialSlide,0,t.params.runCallbacksOnInit,!1,!0),t.params.loop&&t.loopCreate(),t.attachEvents();const s=[...t.el.querySelectorAll('[loading="lazy"]')];return t.isElement&&s.push(...t.hostEl.querySelectorAll('[loading="lazy"]')),s.forEach((e=>{e.complete?D(t,e):e.addEventListener("load",(e=>{D(t,e.target)}))})),H(t),t.initialized=!0,H(t),t.emit("init"),t.emit("afterInit"),t}destroy(e,t){void 0===e&&(e=!0),void 0===t&&(t=!0);const s=this,{params:a,el:i,wrapperEl:r,slides:n}=s;return void 0===s.params||s.destroyed||(s.emit("beforeDestroy"),s.initialized=!1,s.detachEvents(),a.loop&&s.loopDestroy(),t&&(s.removeClasses(),i&&"string"!=typeof i&&i.removeAttribute("style"),r&&r.removeAttribute("style"),n&&n.length&&n.forEach((e=>{e.classList.remove(a.slideVisibleClass,a.slideFullyVisibleClass,a.slideActiveClass,a.slideNextClass,a.slidePrevClass),e.removeAttribute("style"),e.removeAttribute("data-swiper-slide-index")}))),s.emit("destroy"),Object.keys(s.eventsListeners).forEach((e=>{s.off(e)})),!1!==e&&(s.el&&"string"!=typeof s.el&&(s.el.swiper=null),function(e){const t=e;Object.keys(t).forEach((e=>{try{t[e]=null}catch(e){}try{delete t[e]}catch(e){}}))}(s)),s.destroyed=!0),null}static extendDefaults(e){p(ae,e)}static get extendedDefaults(){return ae}static get defaults(){return ee}static installModule(e){ie.prototype.__modules__||(ie.prototype.__modules__=[]);const t=ie.prototype.__modules__;"function"==typeof e&&t.indexOf(e)<0&&t.push(e)}static use(e){return Array.isArray(e)?(e.forEach((e=>ie.installModule(e))),ie):(ie.installModule(e),ie)}}function re(e,t,s,a){return e.params.createElements&&Object.keys(a).forEach((i=>{if(!s[i]&&!0===s.auto){let r=f(e.el,`.${a[i]}`)[0];r||(r=v("div",a[i]),r.className=a[i],e.el.append(r)),s[i]=r,t[i]=r}})),s}function ne(e){return void 0===e&&(e=""),`.${e.trim().replace(/([\.:!+\/])/g,"\\$1").replace(/ /g,".")}`}function le(e){const t=this,{params:s,slidesEl:a}=t;s.loop&&t.loopDestroy();const i=e=>{if("string"==typeof e){const t=document.createElement("div");t.innerHTML=e,a.append(t.children[0]),t.innerHTML=""}else a.append(e)};if("object"==typeof e&&"length"in e)for(let t=0;t<e.length;t+=1)e[t]&&i(e[t]);else i(e);t.recalcSlides(),s.loop&&t.loopCreate(),s.observer&&!t.isElement||t.update()}function oe(e){const t=this,{params:s,activeIndex:a,slidesEl:i}=t;s.loop&&t.loopDestroy();let r=a+1;const n=e=>{if("string"==typeof e){const t=document.createElement("div");t.innerHTML=e,i.prepend(t.children[0]),t.innerHTML=""}else i.prepend(e)};if("object"==typeof e&&"length"in e){for(let t=0;t<e.length;t+=1)e[t]&&n(e[t]);r=a+e.length}else n(e);t.recalcSlides(),s.loop&&t.loopCreate(),s.observer&&!t.isElement||t.update(),t.slideTo(r,0,!1)}function de(e,t){const s=this,{params:a,activeIndex:i,slidesEl:r}=s;let n=i;a.loop&&(n-=s.loopedSlides,s.loopDestroy(),s.recalcSlides());const l=s.slides.length;if(e<=0)return void s.prependSlide(t);if(e>=l)return void s.appendSlide(t);let o=n>e?n+1:n;const d=[];for(let t=l-1;t>=e;t-=1){const e=s.slides[t];e.remove(),d.unshift(e)}if("object"==typeof t&&"length"in t){for(let e=0;e<t.length;e+=1)t[e]&&r.append(t[e]);o=n>e?n+t.length:n}else r.append(t);for(let e=0;e<d.length;e+=1)r.append(d[e]);s.recalcSlides(),a.loop&&s.loopCreate(),a.observer&&!s.isElement||s.update(),a.loop?s.slideTo(o+s.loopedSlides,0,!1):s.slideTo(o,0,!1)}function ce(e){const t=this,{params:s,activeIndex:a}=t;let i=a;s.loop&&(i-=t.loopedSlides,t.loopDestroy());let r,n=i;if("object"==typeof e&&"length"in e){for(let s=0;s<e.length;s+=1)r=e[s],t.slides[r]&&t.slides[r].remove(),r<n&&(n-=1);n=Math.max(n,0)}else r=e,t.slides[r]&&t.slides[r].remove(),r<n&&(n-=1),n=Math.max(n,0);t.recalcSlides(),s.loop&&t.loopCreate(),s.observer&&!t.isElement||t.update(),s.loop?t.slideTo(n+t.loopedSlides,0,!1):t.slideTo(n,0,!1)}function pe(){const e=this,t=[];for(let s=0;s<e.slides.length;s+=1)t.push(s);e.removeSlide(t)}function ue(e){const{effect:t,swiper:s,on:a,setTranslate:i,setTransition:r,overwriteParams:n,perspective:l,recreateShadows:o,getEffectParams:d}=e;let c;a("beforeInit",(()=>{if(s.params.effect!==t)return;s.classNames.push(`${s.params.containerModifierClass}${t}`),l&&l()&&s.classNames.push(`${s.params.containerModifierClass}3d`);const e=n?n():{};Object.assign(s.params,e),Object.assign(s.originalParams,e)})),a("setTranslate",(()=>{s.params.effect===t&&i()})),a("setTransition",((e,a)=>{s.params.effect===t&&r(a)})),a("transitionEnd",(()=>{if(s.params.effect===t&&o){if(!d||!d().slideShadows)return;s.slides.forEach((e=>{e.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((e=>e.remove()))})),o()}})),a("virtualUpdate",(()=>{s.params.effect===t&&(s.slides.length||(c=!0),requestAnimationFrame((()=>{c&&s.slides&&s.slides.length&&(i(),c=!1)})))}))}function me(e,t){const s=h(t);return s!==t&&(s.style.backfaceVisibility="hidden",s.style["-webkit-backface-visibility"]="hidden"),s}function he(e){let{swiper:t,duration:s,transformElements:a,allSlides:i}=e;const{activeIndex:r}=t;if(t.params.virtualTranslate&&0!==s){let e,s=!1;e=i?a:a.filter((e=>{const s=e.classList.contains("swiper-slide-transform")?(e=>{if(!e.parentElement)return t.slides.find((t=>t.shadowRoot&&t.shadowRoot===e.parentNode));return e.parentElement})(e):e;return t.getSlideIndex(s)===r})),e.forEach((e=>{x(e,(()=>{if(s)return;if(!t||t.destroyed)return;s=!0,t.animating=!1;const e=new window.CustomEvent("transitionend",{bubbles:!0,cancelable:!0});t.wrapperEl.dispatchEvent(e)}))}))}}function fe(e,t,s){const a=`swiper-slide-shadow${s?`-${s}`:""}${e?` swiper-slide-shadow-${e}`:""}`,i=h(t);let r=i.querySelector(`.${a.split(" ").join(".")}`);return r||(r=v("div",a.split(" ")),i.append(r)),r}Object.keys(se).forEach((e=>{Object.keys(se[e]).forEach((t=>{ie.prototype[t]=se[e][t]}))})),ie.use([function(e){let{swiper:t,on:s,emit:a}=e;const i=r();let n=null,l=null;const o=()=>{t&&!t.destroyed&&t.initialized&&(a("beforeResize"),a("resize"))},d=()=>{t&&!t.destroyed&&t.initialized&&a("orientationchange")};s("init",(()=>{t.params.resizeObserver&&void 0!==i.ResizeObserver?t&&!t.destroyed&&t.initialized&&(n=new ResizeObserver((e=>{l=i.requestAnimationFrame((()=>{const{width:s,height:a}=t;let i=s,r=a;e.forEach((e=>{let{contentBoxSize:s,contentRect:a,target:n}=e;n&&n!==t.el||(i=a?a.width:(s[0]||s).inlineSize,r=a?a.height:(s[0]||s).blockSize)})),i===s&&r===a||o()}))})),n.observe(t.el)):(i.addEventListener("resize",o),i.addEventListener("orientationchange",d))})),s("destroy",(()=>{l&&i.cancelAnimationFrame(l),n&&n.unobserve&&t.el&&(n.unobserve(t.el),n=null),i.removeEventListener("resize",o),i.removeEventListener("orientationchange",d)}))},function(e){let{swiper:t,extendParams:s,on:a,emit:i}=e;const n=[],l=r(),o=function(e,s){void 0===s&&(s={});const a=new(l.MutationObserver||l.WebkitMutationObserver)((e=>{if(t.__preventObserver__)return;if(1===e.length)return void i("observerUpdate",e[0]);const s=function(){i("observerUpdate",e[0])};l.requestAnimationFrame?l.requestAnimationFrame(s):l.setTimeout(s,0)}));a.observe(e,{attributes:void 0===s.attributes||s.attributes,childList:t.isElement||(void 0===s.childList||s).childList,characterData:void 0===s.characterData||s.characterData}),n.push(a)};s({observer:!1,observeParents:!1,observeSlideChildren:!1}),a("init",(()=>{if(t.params.observer){if(t.params.observeParents){const e=E(t.hostEl);for(let t=0;t<e.length;t+=1)o(e[t])}o(t.hostEl,{childList:t.params.observeSlideChildren}),o(t.wrapperEl,{attributes:!1})}})),a("destroy",(()=>{n.forEach((e=>{e.disconnect()})),n.splice(0,n.length)}))}]);const ge=[function(e){let t,{swiper:s,extendParams:i,on:r,emit:n}=e;i({virtual:{enabled:!1,slides:[],cache:!0,renderSlide:null,renderExternal:null,renderExternalUpdate:!0,addSlidesBefore:0,addSlidesAfter:0}});const l=a();s.virtual={cache:{},from:void 0,to:void 0,slides:[],offset:0,slidesGrid:[]};const o=l.createElement("div");function d(e,t){const a=s.params.virtual;if(a.cache&&s.virtual.cache[t])return s.virtual.cache[t];let i;return a.renderSlide?(i=a.renderSlide.call(s,e,t),"string"==typeof i&&(o.innerHTML=i,i=o.children[0])):i=s.isElement?v("swiper-slide"):v("div",s.params.slideClass),i.setAttribute("data-swiper-slide-index",t),a.renderSlide||(i.innerHTML=e),a.cache&&(s.virtual.cache[t]=i),i}function c(e,t){const{slidesPerView:a,slidesPerGroup:i,centeredSlides:r,loop:l,initialSlide:o}=s.params;if(t&&!l&&o>0)return;const{addSlidesBefore:c,addSlidesAfter:p}=s.params.virtual,{from:u,to:m,slides:h,slidesGrid:g,offset:v}=s.virtual;s.params.cssMode||s.updateActiveIndex();const w=s.activeIndex||0;let b,y,E;b=s.rtlTranslate?"right":s.isHorizontal()?"left":"top",r?(y=Math.floor(a/2)+i+p,E=Math.floor(a/2)+i+c):(y=a+(i-1)+p,E=(l?a:i)+c);let x=w-E,S=w+y;l||(x=Math.max(x,0),S=Math.min(S,h.length-1));let T=(s.slidesGrid[x]||0)-(s.slidesGrid[0]||0);function M(){s.updateSlides(),s.updateProgress(),s.updateSlidesClasses(),n("virtualUpdate")}if(l&&w>=E?(x-=E,r||(T+=s.slidesGrid[0])):l&&w<E&&(x=-E,r&&(T+=s.slidesGrid[0])),Object.assign(s.virtual,{from:x,to:S,offset:T,slidesGrid:s.slidesGrid,slidesBefore:E,slidesAfter:y}),u===x&&m===S&&!e)return s.slidesGrid!==g&&T!==v&&s.slides.forEach((e=>{e.style[b]=T-Math.abs(s.cssOverflowAdjustment())+"px"})),s.updateProgress(),void n("virtualUpdate");if(s.params.virtual.renderExternal)return s.params.virtual.renderExternal.call(s,{offset:T,from:x,to:S,slides:function(){const e=[];for(let t=x;t<=S;t+=1)e.push(h[t]);return e}()}),void(s.params.virtual.renderExternalUpdate?M():n("virtualUpdate"));const C=[],P=[],L=e=>{let t=e;return e<0?t=h.length+e:t>=h.length&&(t-=h.length),t};if(e)s.slides.filter((e=>e.matches(`.${s.params.slideClass}, swiper-slide`))).forEach((e=>{e.remove()}));else for(let e=u;e<=m;e+=1)if(e<x||e>S){const t=L(e);s.slides.filter((e=>e.matches(`.${s.params.slideClass}[data-swiper-slide-index="${t}"], swiper-slide[data-swiper-slide-index="${t}"]`))).forEach((e=>{e.remove()}))}const I=l?-h.length:0,z=l?2*h.length:h.length;for(let t=I;t<z;t+=1)if(t>=x&&t<=S){const s=L(t);void 0===m||e?P.push(s):(t>m&&P.push(s),t<u&&C.push(s))}if(P.forEach((e=>{s.slidesEl.append(d(h[e],e))})),l)for(let e=C.length-1;e>=0;e-=1){const t=C[e];s.slidesEl.prepend(d(h[t],t))}else C.sort(((e,t)=>t-e)),C.forEach((e=>{s.slidesEl.prepend(d(h[e],e))}));f(s.slidesEl,".swiper-slide, swiper-slide").forEach((e=>{e.style[b]=T-Math.abs(s.cssOverflowAdjustment())+"px"})),M()}r("beforeInit",(()=>{if(!s.params.virtual.enabled)return;let e;if(void 0===s.passedParams.virtual.slides){const t=[...s.slidesEl.children].filter((e=>e.matches(`.${s.params.slideClass}, swiper-slide`)));t&&t.length&&(s.virtual.slides=[...t],e=!0,t.forEach(((e,t)=>{e.setAttribute("data-swiper-slide-index",t),s.virtual.cache[t]=e,e.remove()})))}e||(s.virtual.slides=s.params.virtual.slides),s.classNames.push(`${s.params.containerModifierClass}virtual`),s.params.watchSlidesProgress=!0,s.originalParams.watchSlidesProgress=!0,c(!1,!0)})),r("setTranslate",(()=>{s.params.virtual.enabled&&(s.params.cssMode&&!s._immediateVirtual?(clearTimeout(t),t=setTimeout((()=>{c()}),100)):c())})),r("init update resize",(()=>{s.params.virtual.enabled&&s.params.cssMode&&u(s.wrapperEl,"--swiper-virtual-size",`${s.virtualSize}px`)})),Object.assign(s.virtual,{appendSlide:function(e){if("object"==typeof e&&"length"in e)for(let t=0;t<e.length;t+=1)e[t]&&s.virtual.slides.push(e[t]);else s.virtual.slides.push(e);c(!0)},prependSlide:function(e){const t=s.activeIndex;let a=t+1,i=1;if(Array.isArray(e)){for(let t=0;t<e.length;t+=1)e[t]&&s.virtual.slides.unshift(e[t]);a=t+e.length,i=e.length}else s.virtual.slides.unshift(e);if(s.params.virtual.cache){const e=s.virtual.cache,t={};Object.keys(e).forEach((s=>{const a=e[s],r=a.getAttribute("data-swiper-slide-index");r&&a.setAttribute("data-swiper-slide-index",parseInt(r,10)+i),t[parseInt(s,10)+i]=a})),s.virtual.cache=t}c(!0),s.slideTo(a,0)},removeSlide:function(e){if(null==e)return;let t=s.activeIndex;if(Array.isArray(e))for(let a=e.length-1;a>=0;a-=1)s.params.virtual.cache&&(delete s.virtual.cache[e[a]],Object.keys(s.virtual.cache).forEach((t=>{t>e&&(s.virtual.cache[t-1]=s.virtual.cache[t],s.virtual.cache[t-1].setAttribute("data-swiper-slide-index",t-1),delete s.virtual.cache[t])}))),s.virtual.slides.splice(e[a],1),e[a]<t&&(t-=1),t=Math.max(t,0);else s.params.virtual.cache&&(delete s.virtual.cache[e],Object.keys(s.virtual.cache).forEach((t=>{t>e&&(s.virtual.cache[t-1]=s.virtual.cache[t],s.virtual.cache[t-1].setAttribute("data-swiper-slide-index",t-1),delete s.virtual.cache[t])}))),s.virtual.slides.splice(e,1),e<t&&(t-=1),t=Math.max(t,0);c(!0),s.slideTo(t,0)},removeAllSlides:function(){s.virtual.slides=[],s.params.virtual.cache&&(s.virtual.cache={}),c(!0),s.slideTo(0,0)},update:c})},function(e){let{swiper:t,extendParams:s,on:i,emit:n}=e;const l=a(),o=r();function d(e){if(!t.enabled)return;const{rtlTranslate:s}=t;let a=e;a.originalEvent&&(a=a.originalEvent);const i=a.keyCode||a.charCode,r=t.params.keyboard.pageUpDown,d=r&&33===i,c=r&&34===i,p=37===i,u=39===i,m=38===i,h=40===i;if(!t.allowSlideNext&&(t.isHorizontal()&&u||t.isVertical()&&h||c))return!1;if(!t.allowSlidePrev&&(t.isHorizontal()&&p||t.isVertical()&&m||d))return!1;if(!(a.shiftKey||a.altKey||a.ctrlKey||a.metaKey||l.activeElement&&l.activeElement.nodeName&&("input"===l.activeElement.nodeName.toLowerCase()||"textarea"===l.activeElement.nodeName.toLowerCase()))){if(t.params.keyboard.onlyInViewport&&(d||c||p||u||m||h)){let e=!1;if(E(t.el,`.${t.params.slideClass}, swiper-slide`).length>0&&0===E(t.el,`.${t.params.slideActiveClass}`).length)return;const a=t.el,i=a.clientWidth,r=a.clientHeight,n=o.innerWidth,l=o.innerHeight,d=w(a);s&&(d.left-=a.scrollLeft);const c=[[d.left,d.top],[d.left+i,d.top],[d.left,d.top+r],[d.left+i,d.top+r]];for(let t=0;t<c.length;t+=1){const s=c[t];if(s[0]>=0&&s[0]<=n&&s[1]>=0&&s[1]<=l){if(0===s[0]&&0===s[1])continue;e=!0}}if(!e)return}t.isHorizontal()?((d||c||p||u)&&(a.preventDefault?a.preventDefault():a.returnValue=!1),((c||u)&&!s||(d||p)&&s)&&t.slideNext(),((d||p)&&!s||(c||u)&&s)&&t.slidePrev()):((d||c||m||h)&&(a.preventDefault?a.preventDefault():a.returnValue=!1),(c||h)&&t.slideNext(),(d||m)&&t.slidePrev()),n("keyPress",i)}}function c(){t.keyboard.enabled||(l.addEventListener("keydown",d),t.keyboard.enabled=!0)}function p(){t.keyboard.enabled&&(l.removeEventListener("keydown",d),t.keyboard.enabled=!1)}t.keyboard={enabled:!1},s({keyboard:{enabled:!1,onlyInViewport:!0,pageUpDown:!0}}),i("init",(()=>{t.params.keyboard.enabled&&c()})),i("destroy",(()=>{t.keyboard.enabled&&p()})),Object.assign(t.keyboard,{enable:c,disable:p})},function(e){let{swiper:t,extendParams:s,on:a,emit:i}=e;const n=r();let d;s({mousewheel:{enabled:!1,releaseOnEdges:!1,invert:!1,forceToAxis:!1,sensitivity:1,eventsTarget:"container",thresholdDelta:null,thresholdTime:null,noMousewheelClass:"swiper-no-mousewheel"}}),t.mousewheel={enabled:!1};let c,p=o();const u=[];function m(){t.enabled&&(t.mouseEntered=!0)}function h(){t.enabled&&(t.mouseEntered=!1)}function f(e){return!(t.params.mousewheel.thresholdDelta&&e.delta<t.params.mousewheel.thresholdDelta)&&(!(t.params.mousewheel.thresholdTime&&o()-p<t.params.mousewheel.thresholdTime)&&(e.delta>=6&&o()-p<60||(e.direction<0?t.isEnd&&!t.params.loop||t.animating||(t.slideNext(),i("scroll",e.raw)):t.isBeginning&&!t.params.loop||t.animating||(t.slidePrev(),i("scroll",e.raw)),p=(new n.Date).getTime(),!1)))}function g(e){let s=e,a=!0;if(!t.enabled)return;if(e.target.closest(`.${t.params.mousewheel.noMousewheelClass}`))return;const r=t.params.mousewheel;t.params.cssMode&&s.preventDefault();let n=t.el;"container"!==t.params.mousewheel.eventsTarget&&(n=document.querySelector(t.params.mousewheel.eventsTarget));const p=n&&n.contains(s.target);if(!t.mouseEntered&&!p&&!r.releaseOnEdges)return!0;s.originalEvent&&(s=s.originalEvent);let m=0;const h=t.rtlTranslate?-1:1,g=function(e){let t=0,s=0,a=0,i=0;return"detail"in e&&(s=e.detail),"wheelDelta"in e&&(s=-e.wheelDelta/120),"wheelDeltaY"in e&&(s=-e.wheelDeltaY/120),"wheelDeltaX"in e&&(t=-e.wheelDeltaX/120),"axis"in e&&e.axis===e.HORIZONTAL_AXIS&&(t=s,s=0),a=10*t,i=10*s,"deltaY"in e&&(i=e.deltaY),"deltaX"in e&&(a=e.deltaX),e.shiftKey&&!a&&(a=i,i=0),(a||i)&&e.deltaMode&&(1===e.deltaMode?(a*=40,i*=40):(a*=800,i*=800)),a&&!t&&(t=a<1?-1:1),i&&!s&&(s=i<1?-1:1),{spinX:t,spinY:s,pixelX:a,pixelY:i}}(s);if(r.forceToAxis)if(t.isHorizontal()){if(!(Math.abs(g.pixelX)>Math.abs(g.pixelY)))return!0;m=-g.pixelX*h}else{if(!(Math.abs(g.pixelY)>Math.abs(g.pixelX)))return!0;m=-g.pixelY}else m=Math.abs(g.pixelX)>Math.abs(g.pixelY)?-g.pixelX*h:-g.pixelY;if(0===m)return!0;r.invert&&(m=-m);let v=t.getTranslate()+m*r.sensitivity;if(v>=t.minTranslate()&&(v=t.minTranslate()),v<=t.maxTranslate()&&(v=t.maxTranslate()),a=!!t.params.loop||!(v===t.minTranslate()||v===t.maxTranslate()),a&&t.params.nested&&s.stopPropagation(),t.params.freeMode&&t.params.freeMode.enabled){const e={time:o(),delta:Math.abs(m),direction:Math.sign(m)},a=c&&e.time<c.time+500&&e.delta<=c.delta&&e.direction===c.direction;if(!a){c=void 0;let n=t.getTranslate()+m*r.sensitivity;const o=t.isBeginning,p=t.isEnd;if(n>=t.minTranslate()&&(n=t.minTranslate()),n<=t.maxTranslate()&&(n=t.maxTranslate()),t.setTransition(0),t.setTranslate(n),t.updateProgress(),t.updateActiveIndex(),t.updateSlidesClasses(),(!o&&t.isBeginning||!p&&t.isEnd)&&t.updateSlidesClasses(),t.params.loop&&t.loopFix({direction:e.direction<0?"next":"prev",byMousewheel:!0}),t.params.freeMode.sticky){clearTimeout(d),d=void 0,u.length>=15&&u.shift();const s=u.length?u[u.length-1]:void 0,a=u[0];if(u.push(e),s&&(e.delta>s.delta||e.direction!==s.direction))u.splice(0);else if(u.length>=15&&e.time-a.time<500&&a.delta-e.delta>=1&&e.delta<=6){const s=m>0?.8:.2;c=e,u.splice(0),d=l((()=>{!t.destroyed&&t.params&&t.slideToClosest(t.params.speed,!0,void 0,s)}),0)}d||(d=l((()=>{if(t.destroyed||!t.params)return;c=e,u.splice(0),t.slideToClosest(t.params.speed,!0,void 0,.5)}),500))}if(a||i("scroll",s),t.params.autoplay&&t.params.autoplay.disableOnInteraction&&t.autoplay.stop(),r.releaseOnEdges&&(n===t.minTranslate()||n===t.maxTranslate()))return!0}}else{const s={time:o(),delta:Math.abs(m),direction:Math.sign(m),raw:e};u.length>=2&&u.shift();const a=u.length?u[u.length-1]:void 0;if(u.push(s),a?(s.direction!==a.direction||s.delta>a.delta||s.time>a.time+150)&&f(s):f(s),function(e){const s=t.params.mousewheel;if(e.direction<0){if(t.isEnd&&!t.params.loop&&s.releaseOnEdges)return!0}else if(t.isBeginning&&!t.params.loop&&s.releaseOnEdges)return!0;return!1}(s))return!0}return s.preventDefault?s.preventDefault():s.returnValue=!1,!1}function v(e){let s=t.el;"container"!==t.params.mousewheel.eventsTarget&&(s=document.querySelector(t.params.mousewheel.eventsTarget)),s[e]("mouseenter",m),s[e]("mouseleave",h),s[e]("wheel",g)}function w(){return t.params.cssMode?(t.wrapperEl.removeEventListener("wheel",g),!0):!t.mousewheel.enabled&&(v("addEventListener"),t.mousewheel.enabled=!0,!0)}function b(){return t.params.cssMode?(t.wrapperEl.addEventListener(event,g),!0):!!t.mousewheel.enabled&&(v("removeEventListener"),t.mousewheel.enabled=!1,!0)}a("init",(()=>{!t.params.mousewheel.enabled&&t.params.cssMode&&b(),t.params.mousewheel.enabled&&w()})),a("destroy",(()=>{t.params.cssMode&&w(),t.mousewheel.enabled&&b()})),Object.assign(t.mousewheel,{enable:w,disable:b})},function(e){let{swiper:t,extendParams:s,on:a,emit:i}=e;function r(e){let s;return e&&"string"==typeof e&&t.isElement&&(s=t.el.querySelector(e)||t.hostEl.querySelector(e),s)?s:(e&&("string"==typeof e&&(s=[...document.querySelectorAll(e)]),t.params.uniqueNavElements&&"string"==typeof e&&s&&s.length>1&&1===t.el.querySelectorAll(e).length?s=t.el.querySelector(e):s&&1===s.length&&(s=s[0])),e&&!s?e:s)}function n(e,s){const a=t.params.navigation;(e=T(e)).forEach((e=>{e&&(e.classList[s?"add":"remove"](...a.disabledClass.split(" ")),"BUTTON"===e.tagName&&(e.disabled=s),t.params.watchOverflow&&t.enabled&&e.classList[t.isLocked?"add":"remove"](a.lockClass))}))}function l(){const{nextEl:e,prevEl:s}=t.navigation;if(t.params.loop)return n(s,!1),void n(e,!1);n(s,t.isBeginning&&!t.params.rewind),n(e,t.isEnd&&!t.params.rewind)}function o(e){e.preventDefault(),(!t.isBeginning||t.params.loop||t.params.rewind)&&(t.slidePrev(),i("navigationPrev"))}function d(e){e.preventDefault(),(!t.isEnd||t.params.loop||t.params.rewind)&&(t.slideNext(),i("navigationNext"))}function c(){const e=t.params.navigation;if(t.params.navigation=re(t,t.originalParams.navigation,t.params.navigation,{nextEl:"swiper-button-next",prevEl:"swiper-button-prev"}),!e.nextEl&&!e.prevEl)return;let s=r(e.nextEl),a=r(e.prevEl);Object.assign(t.navigation,{nextEl:s,prevEl:a}),s=T(s),a=T(a);const i=(s,a)=>{s&&s.addEventListener("click","next"===a?d:o),!t.enabled&&s&&s.classList.add(...e.lockClass.split(" "))};s.forEach((e=>i(e,"next"))),a.forEach((e=>i(e,"prev")))}function p(){let{nextEl:e,prevEl:s}=t.navigation;e=T(e),s=T(s);const a=(e,s)=>{e.removeEventListener("click","next"===s?d:o),e.classList.remove(...t.params.navigation.disabledClass.split(" "))};e.forEach((e=>a(e,"next"))),s.forEach((e=>a(e,"prev")))}s({navigation:{nextEl:null,prevEl:null,hideOnClick:!1,disabledClass:"swiper-button-disabled",hiddenClass:"swiper-button-hidden",lockClass:"swiper-button-lock",navigationDisabledClass:"swiper-navigation-disabled"}}),t.navigation={nextEl:null,prevEl:null},a("init",(()=>{!1===t.params.navigation.enabled?u():(c(),l())})),a("toEdge fromEdge lock unlock",(()=>{l()})),a("destroy",(()=>{p()})),a("enable disable",(()=>{let{nextEl:e,prevEl:s}=t.navigation;e=T(e),s=T(s),t.enabled?l():[...e,...s].filter((e=>!!e)).forEach((e=>e.classList.add(t.params.navigation.lockClass)))})),a("click",((e,s)=>{let{nextEl:a,prevEl:r}=t.navigation;a=T(a),r=T(r);const n=s.target;let l=r.includes(n)||a.includes(n);if(t.isElement&&!l){const e=s.path||s.composedPath&&s.composedPath();e&&(l=e.find((e=>a.includes(e)||r.includes(e))))}if(t.params.navigation.hideOnClick&&!l){if(t.pagination&&t.params.pagination&&t.params.pagination.clickable&&(t.pagination.el===n||t.pagination.el.contains(n)))return;let e;a.length?e=a[0].classList.contains(t.params.navigation.hiddenClass):r.length&&(e=r[0].classList.contains(t.params.navigation.hiddenClass)),i(!0===e?"navigationShow":"navigationHide"),[...a,...r].filter((e=>!!e)).forEach((e=>e.classList.toggle(t.params.navigation.hiddenClass)))}}));const u=()=>{t.el.classList.add(...t.params.navigation.navigationDisabledClass.split(" ")),p()};Object.assign(t.navigation,{enable:()=>{t.el.classList.remove(...t.params.navigation.navigationDisabledClass.split(" ")),c(),l()},disable:u,update:l,init:c,destroy:p})},function(e){let{swiper:t,extendParams:s,on:a,emit:i}=e;const r="swiper-pagination";let n;s({pagination:{el:null,bulletElement:"span",clickable:!1,hideOnClick:!1,renderBullet:null,renderProgressbar:null,renderFraction:null,renderCustom:null,progressbarOpposite:!1,type:"bullets",dynamicBullets:!1,dynamicMainBullets:1,formatFractionCurrent:e=>e,formatFractionTotal:e=>e,bulletClass:`${r}-bullet`,bulletActiveClass:`${r}-bullet-active`,modifierClass:`${r}-`,currentClass:`${r}-current`,totalClass:`${r}-total`,hiddenClass:`${r}-hidden`,progressbarFillClass:`${r}-progressbar-fill`,progressbarOppositeClass:`${r}-progressbar-opposite`,clickableClass:`${r}-clickable`,lockClass:`${r}-lock`,horizontalClass:`${r}-horizontal`,verticalClass:`${r}-vertical`,paginationDisabledClass:`${r}-disabled`}}),t.pagination={el:null,bullets:[]};let l=0;function o(){return!t.params.pagination.el||!t.pagination.el||Array.isArray(t.pagination.el)&&0===t.pagination.el.length}function d(e,s){const{bulletActiveClass:a}=t.params.pagination;e&&(e=e[("prev"===s?"previous":"next")+"ElementSibling"])&&(e.classList.add(`${a}-${s}`),(e=e[("prev"===s?"previous":"next")+"ElementSibling"])&&e.classList.add(`${a}-${s}-${s}`))}function c(e){const s=e.target.closest(ne(t.params.pagination.bulletClass));if(!s)return;e.preventDefault();const a=y(s)*t.params.slidesPerGroup;if(t.params.loop){if(t.realIndex===a)return;const e=(i=t.realIndex,r=a,n=t.slides.length,(r%=n)==1+(i%=n)?"next":r===i-1?"previous":void 0);"next"===e?t.slideNext():"previous"===e?t.slidePrev():t.slideToLoop(a)}else t.slideTo(a);var i,r,n}function p(){const e=t.rtl,s=t.params.pagination;if(o())return;let a,r,c=t.pagination.el;c=T(c);const p=t.virtual&&t.params.virtual.enabled?t.virtual.slides.length:t.slides.length,u=t.params.loop?Math.ceil(p/t.params.slidesPerGroup):t.snapGrid.length;if(t.params.loop?(r=t.previousRealIndex||0,a=t.params.slidesPerGroup>1?Math.floor(t.realIndex/t.params.slidesPerGroup):t.realIndex):void 0!==t.snapIndex?(a=t.snapIndex,r=t.previousSnapIndex):(r=t.previousIndex||0,a=t.activeIndex||0),"bullets"===s.type&&t.pagination.bullets&&t.pagination.bullets.length>0){const i=t.pagination.bullets;let o,p,u;if(s.dynamicBullets&&(n=S(i[0],t.isHorizontal()?"width":"height",!0),c.forEach((e=>{e.style[t.isHorizontal()?"width":"height"]=n*(s.dynamicMainBullets+4)+"px"})),s.dynamicMainBullets>1&&void 0!==r&&(l+=a-(r||0),l>s.dynamicMainBullets-1?l=s.dynamicMainBullets-1:l<0&&(l=0)),o=Math.max(a-l,0),p=o+(Math.min(i.length,s.dynamicMainBullets)-1),u=(p+o)/2),i.forEach((e=>{const t=[...["","-next","-next-next","-prev","-prev-prev","-main"].map((e=>`${s.bulletActiveClass}${e}`))].map((e=>"string"==typeof e&&e.includes(" ")?e.split(" "):e)).flat();e.classList.remove(...t)})),c.length>1)i.forEach((e=>{const i=y(e);i===a?e.classList.add(...s.bulletActiveClass.split(" ")):t.isElement&&e.setAttribute("part","bullet"),s.dynamicBullets&&(i>=o&&i<=p&&e.classList.add(...`${s.bulletActiveClass}-main`.split(" ")),i===o&&d(e,"prev"),i===p&&d(e,"next"))}));else{const e=i[a];if(e&&e.classList.add(...s.bulletActiveClass.split(" ")),t.isElement&&i.forEach(((e,t)=>{e.setAttribute("part",t===a?"bullet-active":"bullet")})),s.dynamicBullets){const e=i[o],t=i[p];for(let e=o;e<=p;e+=1)i[e]&&i[e].classList.add(...`${s.bulletActiveClass}-main`.split(" "));d(e,"prev"),d(t,"next")}}if(s.dynamicBullets){const a=Math.min(i.length,s.dynamicMainBullets+4),r=(n*a-n)/2-u*n,l=e?"right":"left";i.forEach((e=>{e.style[t.isHorizontal()?l:"top"]=`${r}px`}))}}c.forEach(((e,r)=>{if("fraction"===s.type&&(e.querySelectorAll(ne(s.currentClass)).forEach((e=>{e.textContent=s.formatFractionCurrent(a+1)})),e.querySelectorAll(ne(s.totalClass)).forEach((e=>{e.textContent=s.formatFractionTotal(u)}))),"progressbar"===s.type){let i;i=s.progressbarOpposite?t.isHorizontal()?"vertical":"horizontal":t.isHorizontal()?"horizontal":"vertical";const r=(a+1)/u;let n=1,l=1;"horizontal"===i?n=r:l=r,e.querySelectorAll(ne(s.progressbarFillClass)).forEach((e=>{e.style.transform=`translate3d(0,0,0) scaleX(${n}) scaleY(${l})`,e.style.transitionDuration=`${t.params.speed}ms`}))}"custom"===s.type&&s.renderCustom?(e.innerHTML=s.renderCustom(t,a+1,u),0===r&&i("paginationRender",e)):(0===r&&i("paginationRender",e),i("paginationUpdate",e)),t.params.watchOverflow&&t.enabled&&e.classList[t.isLocked?"add":"remove"](s.lockClass)}))}function u(){const e=t.params.pagination;if(o())return;const s=t.virtual&&t.params.virtual.enabled?t.virtual.slides.length:t.grid&&t.params.grid.rows>1?t.slides.length/Math.ceil(t.params.grid.rows):t.slides.length;let a=t.pagination.el;a=T(a);let r="";if("bullets"===e.type){let a=t.params.loop?Math.ceil(s/t.params.slidesPerGroup):t.snapGrid.length;t.params.freeMode&&t.params.freeMode.enabled&&a>s&&(a=s);for(let s=0;s<a;s+=1)e.renderBullet?r+=e.renderBullet.call(t,s,e.bulletClass):r+=`<${e.bulletElement} ${t.isElement?'part="bullet"':""} class="${e.bulletClass}"></${e.bulletElement}>`}"fraction"===e.type&&(r=e.renderFraction?e.renderFraction.call(t,e.currentClass,e.totalClass):`<span class="${e.currentClass}"></span> / <span class="${e.totalClass}"></span>`),"progressbar"===e.type&&(r=e.renderProgressbar?e.renderProgressbar.call(t,e.progressbarFillClass):`<span class="${e.progressbarFillClass}"></span>`),t.pagination.bullets=[],a.forEach((s=>{"custom"!==e.type&&(s.innerHTML=r||""),"bullets"===e.type&&t.pagination.bullets.push(...s.querySelectorAll(ne(e.bulletClass)))})),"custom"!==e.type&&i("paginationRender",a[0])}function m(){t.params.pagination=re(t,t.originalParams.pagination,t.params.pagination,{el:"swiper-pagination"});const e=t.params.pagination;if(!e.el)return;let s;"string"==typeof e.el&&t.isElement&&(s=t.el.querySelector(e.el)),s||"string"!=typeof e.el||(s=[...document.querySelectorAll(e.el)]),s||(s=e.el),s&&0!==s.length&&(t.params.uniqueNavElements&&"string"==typeof e.el&&Array.isArray(s)&&s.length>1&&(s=[...t.el.querySelectorAll(e.el)],s.length>1&&(s=s.find((e=>E(e,".swiper")[0]===t.el)))),Array.isArray(s)&&1===s.length&&(s=s[0]),Object.assign(t.pagination,{el:s}),s=T(s),s.forEach((s=>{"bullets"===e.type&&e.clickable&&s.classList.add(...(e.clickableClass||"").split(" ")),s.classList.add(e.modifierClass+e.type),s.classList.add(t.isHorizontal()?e.horizontalClass:e.verticalClass),"bullets"===e.type&&e.dynamicBullets&&(s.classList.add(`${e.modifierClass}${e.type}-dynamic`),l=0,e.dynamicMainBullets<1&&(e.dynamicMainBullets=1)),"progressbar"===e.type&&e.progressbarOpposite&&s.classList.add(e.progressbarOppositeClass),e.clickable&&s.addEventListener("click",c),t.enabled||s.classList.add(e.lockClass)})))}function h(){const e=t.params.pagination;if(o())return;let s=t.pagination.el;s&&(s=T(s),s.forEach((s=>{s.classList.remove(e.hiddenClass),s.classList.remove(e.modifierClass+e.type),s.classList.remove(t.isHorizontal()?e.horizontalClass:e.verticalClass),e.clickable&&(s.classList.remove(...(e.clickableClass||"").split(" ")),s.removeEventListener("click",c))}))),t.pagination.bullets&&t.pagination.bullets.forEach((t=>t.classList.remove(...e.bulletActiveClass.split(" "))))}a("changeDirection",(()=>{if(!t.pagination||!t.pagination.el)return;const e=t.params.pagination;let{el:s}=t.pagination;s=T(s),s.forEach((s=>{s.classList.remove(e.horizontalClass,e.verticalClass),s.classList.add(t.isHorizontal()?e.horizontalClass:e.verticalClass)}))})),a("init",(()=>{!1===t.params.pagination.enabled?f():(m(),u(),p())})),a("activeIndexChange",(()=>{void 0===t.snapIndex&&p()})),a("snapIndexChange",(()=>{p()})),a("snapGridLengthChange",(()=>{u(),p()})),a("destroy",(()=>{h()})),a("enable disable",(()=>{let{el:e}=t.pagination;e&&(e=T(e),e.forEach((e=>e.classList[t.enabled?"remove":"add"](t.params.pagination.lockClass))))})),a("lock unlock",(()=>{p()})),a("click",((e,s)=>{const a=s.target,r=T(t.pagination.el);if(t.params.pagination.el&&t.params.pagination.hideOnClick&&r&&r.length>0&&!a.classList.contains(t.params.pagination.bulletClass)){if(t.navigation&&(t.navigation.nextEl&&a===t.navigation.nextEl||t.navigation.prevEl&&a===t.navigation.prevEl))return;const e=r[0].classList.contains(t.params.pagination.hiddenClass);i(!0===e?"paginationShow":"paginationHide"),r.forEach((e=>e.classList.toggle(t.params.pagination.hiddenClass)))}}));const f=()=>{t.el.classList.add(t.params.pagination.paginationDisabledClass);let{el:e}=t.pagination;e&&(e=T(e),e.forEach((e=>e.classList.add(t.params.pagination.paginationDisabledClass)))),h()};Object.assign(t.pagination,{enable:()=>{t.el.classList.remove(t.params.pagination.paginationDisabledClass);let{el:e}=t.pagination;e&&(e=T(e),e.forEach((e=>e.classList.remove(t.params.pagination.paginationDisabledClass)))),m(),u(),p()},disable:f,render:u,update:p,init:m,destroy:h})},function(e){let{swiper:t,extendParams:s,on:i,emit:r}=e;const o=a();let d,c,p,u,m=!1,h=null,f=null;function g(){if(!t.params.scrollbar.el||!t.scrollbar.el)return;const{scrollbar:e,rtlTranslate:s}=t,{dragEl:a,el:i}=e,r=t.params.scrollbar,n=t.params.loop?t.progressLoop:t.progress;let l=c,o=(p-c)*n;s?(o=-o,o>0?(l=c-o,o=0):-o+c>p&&(l=p+o)):o<0?(l=c+o,o=0):o+c>p&&(l=p-o),t.isHorizontal()?(a.style.transform=`translate3d(${o}px, 0, 0)`,a.style.width=`${l}px`):(a.style.transform=`translate3d(0px, ${o}px, 0)`,a.style.height=`${l}px`),r.hide&&(clearTimeout(h),i.style.opacity=1,h=setTimeout((()=>{i.style.opacity=0,i.style.transitionDuration="400ms"}),1e3))}function b(){if(!t.params.scrollbar.el||!t.scrollbar.el)return;const{scrollbar:e}=t,{dragEl:s,el:a}=e;s.style.width="",s.style.height="",p=t.isHorizontal()?a.offsetWidth:a.offsetHeight,u=t.size/(t.virtualSize+t.params.slidesOffsetBefore-(t.params.centeredSlides?t.snapGrid[0]:0)),c="auto"===t.params.scrollbar.dragSize?p*u:parseInt(t.params.scrollbar.dragSize,10),t.isHorizontal()?s.style.width=`${c}px`:s.style.height=`${c}px`,a.style.display=u>=1?"none":"",t.params.scrollbar.hide&&(a.style.opacity=0),t.params.watchOverflow&&t.enabled&&e.el.classList[t.isLocked?"add":"remove"](t.params.scrollbar.lockClass)}function y(e){return t.isHorizontal()?e.clientX:e.clientY}function E(e){const{scrollbar:s,rtlTranslate:a}=t,{el:i}=s;let r;r=(y(e)-w(i)[t.isHorizontal()?"left":"top"]-(null!==d?d:c/2))/(p-c),r=Math.max(Math.min(r,1),0),a&&(r=1-r);const n=t.minTranslate()+(t.maxTranslate()-t.minTranslate())*r;t.updateProgress(n),t.setTranslate(n),t.updateActiveIndex(),t.updateSlidesClasses()}function x(e){const s=t.params.scrollbar,{scrollbar:a,wrapperEl:i}=t,{el:n,dragEl:l}=a;m=!0,d=e.target===l?y(e)-e.target.getBoundingClientRect()[t.isHorizontal()?"left":"top"]:null,e.preventDefault(),e.stopPropagation(),i.style.transitionDuration="100ms",l.style.transitionDuration="100ms",E(e),clearTimeout(f),n.style.transitionDuration="0ms",s.hide&&(n.style.opacity=1),t.params.cssMode&&(t.wrapperEl.style["scroll-snap-type"]="none"),r("scrollbarDragStart",e)}function S(e){const{scrollbar:s,wrapperEl:a}=t,{el:i,dragEl:n}=s;m&&(e.preventDefault&&e.cancelable?e.preventDefault():e.returnValue=!1,E(e),a.style.transitionDuration="0ms",i.style.transitionDuration="0ms",n.style.transitionDuration="0ms",r("scrollbarDragMove",e))}function M(e){const s=t.params.scrollbar,{scrollbar:a,wrapperEl:i}=t,{el:n}=a;m&&(m=!1,t.params.cssMode&&(t.wrapperEl.style["scroll-snap-type"]="",i.style.transitionDuration=""),s.hide&&(clearTimeout(f),f=l((()=>{n.style.opacity=0,n.style.transitionDuration="400ms"}),1e3)),r("scrollbarDragEnd",e),s.snapOnRelease&&t.slideToClosest())}function C(e){const{scrollbar:s,params:a}=t,i=s.el;if(!i)return;const r=i,n=!!a.passiveListeners&&{passive:!1,capture:!1},l=!!a.passiveListeners&&{passive:!0,capture:!1};if(!r)return;const d="on"===e?"addEventListener":"removeEventListener";r[d]("pointerdown",x,n),o[d]("pointermove",S,n),o[d]("pointerup",M,l)}function P(){const{scrollbar:e,el:s}=t;t.params.scrollbar=re(t,t.originalParams.scrollbar,t.params.scrollbar,{el:"swiper-scrollbar"});const a=t.params.scrollbar;if(!a.el)return;let i,r;if("string"==typeof a.el&&t.isElement&&(i=t.el.querySelector(a.el)),i||"string"!=typeof a.el)i||(i=a.el);else if(i=o.querySelectorAll(a.el),!i.length)return;t.params.uniqueNavElements&&"string"==typeof a.el&&i.length>1&&1===s.querySelectorAll(a.el).length&&(i=s.querySelector(a.el)),i.length>0&&(i=i[0]),i.classList.add(t.isHorizontal()?a.horizontalClass:a.verticalClass),i&&(r=i.querySelector(ne(t.params.scrollbar.dragClass)),r||(r=v("div",t.params.scrollbar.dragClass),i.append(r))),Object.assign(e,{el:i,dragEl:r}),a.draggable&&t.params.scrollbar.el&&t.scrollbar.el&&C("on"),i&&i.classList[t.enabled?"remove":"add"](...n(t.params.scrollbar.lockClass))}function L(){const e=t.params.scrollbar,s=t.scrollbar.el;s&&s.classList.remove(...n(t.isHorizontal()?e.horizontalClass:e.verticalClass)),t.params.scrollbar.el&&t.scrollbar.el&&C("off")}s({scrollbar:{el:null,dragSize:"auto",hide:!1,draggable:!1,snapOnRelease:!0,lockClass:"swiper-scrollbar-lock",dragClass:"swiper-scrollbar-drag",scrollbarDisabledClass:"swiper-scrollbar-disabled",horizontalClass:"swiper-scrollbar-horizontal",verticalClass:"swiper-scrollbar-vertical"}}),t.scrollbar={el:null,dragEl:null},i("changeDirection",(()=>{if(!t.scrollbar||!t.scrollbar.el)return;const e=t.params.scrollbar;let{el:s}=t.scrollbar;s=T(s),s.forEach((s=>{s.classList.remove(e.horizontalClass,e.verticalClass),s.classList.add(t.isHorizontal()?e.horizontalClass:e.verticalClass)}))})),i("init",(()=>{!1===t.params.scrollbar.enabled?I():(P(),b(),g())})),i("update resize observerUpdate lock unlock changeDirection",(()=>{b()})),i("setTranslate",(()=>{g()})),i("setTransition",((e,s)=>{!function(e){t.params.scrollbar.el&&t.scrollbar.el&&(t.scrollbar.dragEl.style.transitionDuration=`${e}ms`)}(s)})),i("enable disable",(()=>{const{el:e}=t.scrollbar;e&&e.classList[t.enabled?"remove":"add"](...n(t.params.scrollbar.lockClass))})),i("destroy",(()=>{L()}));const I=()=>{t.el.classList.add(...n(t.params.scrollbar.scrollbarDisabledClass)),t.scrollbar.el&&t.scrollbar.el.classList.add(...n(t.params.scrollbar.scrollbarDisabledClass)),L()};Object.assign(t.scrollbar,{enable:()=>{t.el.classList.remove(...n(t.params.scrollbar.scrollbarDisabledClass)),t.scrollbar.el&&t.scrollbar.el.classList.remove(...n(t.params.scrollbar.scrollbarDisabledClass)),P(),b(),g()},disable:I,updateSize:b,setTranslate:g,init:P,destroy:L})},function(e){let{swiper:t,extendParams:s,on:a}=e;s({parallax:{enabled:!1}});const i="[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]",r=(e,s)=>{const{rtl:a}=t,i=a?-1:1,r=e.getAttribute("data-swiper-parallax")||"0";let n=e.getAttribute("data-swiper-parallax-x"),l=e.getAttribute("data-swiper-parallax-y");const o=e.getAttribute("data-swiper-parallax-scale"),d=e.getAttribute("data-swiper-parallax-opacity"),c=e.getAttribute("data-swiper-parallax-rotate");if(n||l?(n=n||"0",l=l||"0"):t.isHorizontal()?(n=r,l="0"):(l=r,n="0"),n=n.indexOf("%")>=0?parseInt(n,10)*s*i+"%":n*s*i+"px",l=l.indexOf("%")>=0?parseInt(l,10)*s+"%":l*s+"px",null!=d){const t=d-(d-1)*(1-Math.abs(s));e.style.opacity=t}let p=`translate3d(${n}, ${l}, 0px)`;if(null!=o){p+=` scale(${o-(o-1)*(1-Math.abs(s))})`}if(c&&null!=c){p+=` rotate(${c*s*-1}deg)`}e.style.transform=p},n=()=>{const{el:e,slides:s,progress:a,snapGrid:n,isElement:l}=t,o=f(e,i);t.isElement&&o.push(...f(t.hostEl,i)),o.forEach((e=>{r(e,a)})),s.forEach(((e,s)=>{let l=e.progress;t.params.slidesPerGroup>1&&"auto"!==t.params.slidesPerView&&(l+=Math.ceil(s/2)-a*(n.length-1)),l=Math.min(Math.max(l,-1),1),e.querySelectorAll(`${i}, [data-swiper-parallax-rotate]`).forEach((e=>{r(e,l)}))}))};a("beforeInit",(()=>{t.params.parallax.enabled&&(t.params.watchSlidesProgress=!0,t.originalParams.watchSlidesProgress=!0)})),a("init",(()=>{t.params.parallax.enabled&&n()})),a("setTranslate",(()=>{t.params.parallax.enabled&&n()})),a("setTransition",((e,s)=>{t.params.parallax.enabled&&function(e){void 0===e&&(e=t.params.speed);const{el:s,hostEl:a}=t,r=[...s.querySelectorAll(i)];t.isElement&&r.push(...a.querySelectorAll(i)),r.forEach((t=>{let s=parseInt(t.getAttribute("data-swiper-parallax-duration"),10)||e;0===e&&(s=0),t.style.transitionDuration=`${s}ms`}))}(s)}))},function(e){let{swiper:t,extendParams:s,on:a,emit:i}=e;const n=r();s({zoom:{enabled:!1,limitToOriginalSize:!1,maxRatio:3,minRatio:1,panOnMouseMove:!1,toggle:!0,containerClass:"swiper-zoom-container",zoomedSlideClass:"swiper-slide-zoomed"}}),t.zoom={enabled:!1};let l=1,o=!1,c=!1,p={x:0,y:0};const u=-3;let m,h;const g=[],v={originX:0,originY:0,slideEl:void 0,slideWidth:void 0,slideHeight:void 0,imageEl:void 0,imageWrapEl:void 0,maxRatio:3},b={isTouched:void 0,isMoved:void 0,currentX:void 0,currentY:void 0,minX:void 0,minY:void 0,maxX:void 0,maxY:void 0,width:void 0,height:void 0,startX:void 0,startY:void 0,touchesStart:{},touchesCurrent:{}},y={x:void 0,y:void 0,prevPositionX:void 0,prevPositionY:void 0,prevTime:void 0};let x,S=1;function T(){if(g.length<2)return 1;const e=g[0].pageX,t=g[0].pageY,s=g[1].pageX,a=g[1].pageY;return Math.sqrt((s-e)**2+(a-t)**2)}function M(){const e=t.params.zoom,s=v.imageWrapEl.getAttribute("data-swiper-zoom")||e.maxRatio;if(e.limitToOriginalSize&&v.imageEl&&v.imageEl.naturalWidth){const e=v.imageEl.naturalWidth/v.imageEl.offsetWidth;return Math.min(e,s)}return s}function C(e){const s=t.isElement?"swiper-slide":`.${t.params.slideClass}`;return!!e.target.matches(s)||t.slides.filter((t=>t.contains(e.target))).length>0}function P(e){const s=`.${t.params.zoom.containerClass}`;return!!e.target.matches(s)||[...t.hostEl.querySelectorAll(s)].filter((t=>t.contains(e.target))).length>0}function L(e){if("mouse"===e.pointerType&&g.splice(0,g.length),!C(e))return;const s=t.params.zoom;if(m=!1,h=!1,g.push(e),!(g.length<2)){if(m=!0,v.scaleStart=T(),!v.slideEl){v.slideEl=e.target.closest(`.${t.params.slideClass}, swiper-slide`),v.slideEl||(v.slideEl=t.slides[t.activeIndex]);let a=v.slideEl.querySelector(`.${s.containerClass}`);if(a&&(a=a.querySelectorAll("picture, img, svg, canvas, .swiper-zoom-target")[0]),v.imageEl=a,v.imageWrapEl=a?E(v.imageEl,`.${s.containerClass}`)[0]:void 0,!v.imageWrapEl)return void(v.imageEl=void 0);v.maxRatio=M()}if(v.imageEl){const[e,t]=function(){if(g.length<2)return{x:null,y:null};const e=v.imageEl.getBoundingClientRect();return[(g[0].pageX+(g[1].pageX-g[0].pageX)/2-e.x-n.scrollX)/l,(g[0].pageY+(g[1].pageY-g[0].pageY)/2-e.y-n.scrollY)/l]}();v.originX=e,v.originY=t,v.imageEl.style.transitionDuration="0ms"}o=!0}}function I(e){if(!C(e))return;const s=t.params.zoom,a=t.zoom,i=g.findIndex((t=>t.pointerId===e.pointerId));i>=0&&(g[i]=e),g.length<2||(h=!0,v.scaleMove=T(),v.imageEl&&(a.scale=v.scaleMove/v.scaleStart*l,a.scale>v.maxRatio&&(a.scale=v.maxRatio-1+(a.scale-v.maxRatio+1)**.5),a.scale<s.minRatio&&(a.scale=s.minRatio+1-(s.minRatio-a.scale+1)**.5),v.imageEl.style.transform=`translate3d(0,0,0) scale(${a.scale})`))}function z(e){if(!C(e))return;if("mouse"===e.pointerType&&"pointerout"===e.type)return;const s=t.params.zoom,a=t.zoom,i=g.findIndex((t=>t.pointerId===e.pointerId));i>=0&&g.splice(i,1),m&&h&&(m=!1,h=!1,v.imageEl&&(a.scale=Math.max(Math.min(a.scale,v.maxRatio),s.minRatio),v.imageEl.style.transitionDuration=`${t.params.speed}ms`,v.imageEl.style.transform=`translate3d(0,0,0) scale(${a.scale})`,l=a.scale,o=!1,a.scale>1&&v.slideEl?v.slideEl.classList.add(`${s.zoomedSlideClass}`):a.scale<=1&&v.slideEl&&v.slideEl.classList.remove(`${s.zoomedSlideClass}`),1===a.scale&&(v.originX=0,v.originY=0,v.slideEl=void 0)))}function A(){t.touchEventsData.preventTouchMoveFromPointerMove=!1}function $(e){const s="mouse"===e.pointerType&&t.params.zoom.panOnMouseMove;if(!C(e)||!P(e))return;const a=t.zoom;if(!v.imageEl)return;if(!b.isTouched||!v.slideEl)return void(s&&O(e));if(s)return void O(e);b.isMoved||(b.width=v.imageEl.offsetWidth||v.imageEl.clientWidth,b.height=v.imageEl.offsetHeight||v.imageEl.clientHeight,b.startX=d(v.imageWrapEl,"x")||0,b.startY=d(v.imageWrapEl,"y")||0,v.slideWidth=v.slideEl.offsetWidth,v.slideHeight=v.slideEl.offsetHeight,v.imageWrapEl.style.transitionDuration="0ms");const i=b.width*a.scale,r=b.height*a.scale;b.minX=Math.min(v.slideWidth/2-i/2,0),b.maxX=-b.minX,b.minY=Math.min(v.slideHeight/2-r/2,0),b.maxY=-b.minY,b.touchesCurrent.x=g.length>0?g[0].pageX:e.pageX,b.touchesCurrent.y=g.length>0?g[0].pageY:e.pageY;if(Math.max(Math.abs(b.touchesCurrent.x-b.touchesStart.x),Math.abs(b.touchesCurrent.y-b.touchesStart.y))>5&&(t.allowClick=!1),!b.isMoved&&!o){if(t.isHorizontal()&&(Math.floor(b.minX)===Math.floor(b.startX)&&b.touchesCurrent.x<b.touchesStart.x||Math.floor(b.maxX)===Math.floor(b.startX)&&b.touchesCurrent.x>b.touchesStart.x))return b.isTouched=!1,void A();if(!t.isHorizontal()&&(Math.floor(b.minY)===Math.floor(b.startY)&&b.touchesCurrent.y<b.touchesStart.y||Math.floor(b.maxY)===Math.floor(b.startY)&&b.touchesCurrent.y>b.touchesStart.y))return b.isTouched=!1,void A()}e.cancelable&&e.preventDefault(),e.stopPropagation(),clearTimeout(x),t.touchEventsData.preventTouchMoveFromPointerMove=!0,x=setTimeout((()=>{t.destroyed||A()})),b.isMoved=!0;const n=(a.scale-l)/(v.maxRatio-t.params.zoom.minRatio),{originX:c,originY:p}=v;b.currentX=b.touchesCurrent.x-b.touchesStart.x+b.startX+n*(b.width-2*c),b.currentY=b.touchesCurrent.y-b.touchesStart.y+b.startY+n*(b.height-2*p),b.currentX<b.minX&&(b.currentX=b.minX+1-(b.minX-b.currentX+1)**.8),b.currentX>b.maxX&&(b.currentX=b.maxX-1+(b.currentX-b.maxX+1)**.8),b.currentY<b.minY&&(b.currentY=b.minY+1-(b.minY-b.currentY+1)**.8),b.currentY>b.maxY&&(b.currentY=b.maxY-1+(b.currentY-b.maxY+1)**.8),y.prevPositionX||(y.prevPositionX=b.touchesCurrent.x),y.prevPositionY||(y.prevPositionY=b.touchesCurrent.y),y.prevTime||(y.prevTime=Date.now()),y.x=(b.touchesCurrent.x-y.prevPositionX)/(Date.now()-y.prevTime)/2,y.y=(b.touchesCurrent.y-y.prevPositionY)/(Date.now()-y.prevTime)/2,Math.abs(b.touchesCurrent.x-y.prevPositionX)<2&&(y.x=0),Math.abs(b.touchesCurrent.y-y.prevPositionY)<2&&(y.y=0),y.prevPositionX=b.touchesCurrent.x,y.prevPositionY=b.touchesCurrent.y,y.prevTime=Date.now(),v.imageWrapEl.style.transform=`translate3d(${b.currentX}px, ${b.currentY}px,0)`}function k(){const e=t.zoom;v.slideEl&&t.activeIndex!==t.slides.indexOf(v.slideEl)&&(v.imageEl&&(v.imageEl.style.transform="translate3d(0,0,0) scale(1)"),v.imageWrapEl&&(v.imageWrapEl.style.transform="translate3d(0,0,0)"),v.slideEl.classList.remove(`${t.params.zoom.zoomedSlideClass}`),e.scale=1,l=1,v.slideEl=void 0,v.imageEl=void 0,v.imageWrapEl=void 0,v.originX=0,v.originY=0)}function O(e){if(l<=1||!v.imageWrapEl)return;if(!C(e)||!P(e))return;const t=n.getComputedStyle(v.imageWrapEl).transform,s=new n.DOMMatrix(t);if(!c)return c=!0,p.x=e.clientX,p.y=e.clientY,b.startX=s.e,b.startY=s.f,b.width=v.imageEl.offsetWidth||v.imageEl.clientWidth,b.height=v.imageEl.offsetHeight||v.imageEl.clientHeight,v.slideWidth=v.slideEl.offsetWidth,void(v.slideHeight=v.slideEl.offsetHeight);const a=(e.clientX-p.x)*u,i=(e.clientY-p.y)*u,r=b.width*l,o=b.height*l,d=v.slideWidth,m=v.slideHeight,h=Math.min(d/2-r/2,0),f=-h,g=Math.min(m/2-o/2,0),w=-g,y=Math.max(Math.min(b.startX+a,f),h),E=Math.max(Math.min(b.startY+i,w),g);v.imageWrapEl.style.transitionDuration="0ms",v.imageWrapEl.style.transform=`translate3d(${y}px, ${E}px, 0)`,p.x=e.clientX,p.y=e.clientY,b.startX=y,b.startY=E}function D(e){const s=t.zoom,a=t.params.zoom;if(!v.slideEl){e&&e.target&&(v.slideEl=e.target.closest(`.${t.params.slideClass}, swiper-slide`)),v.slideEl||(t.params.virtual&&t.params.virtual.enabled&&t.virtual?v.slideEl=f(t.slidesEl,`.${t.params.slideActiveClass}`)[0]:v.slideEl=t.slides[t.activeIndex]);let s=v.slideEl.querySelector(`.${a.containerClass}`);s&&(s=s.querySelectorAll("picture, img, svg, canvas, .swiper-zoom-target")[0]),v.imageEl=s,v.imageWrapEl=s?E(v.imageEl,`.${a.containerClass}`)[0]:void 0}if(!v.imageEl||!v.imageWrapEl)return;let i,r,o,d,c,p,u,m,h,g,y,x,S,T,C,P,L,I;t.params.cssMode&&(t.wrapperEl.style.overflow="hidden",t.wrapperEl.style.touchAction="none"),v.slideEl.classList.add(`${a.zoomedSlideClass}`),void 0===b.touchesStart.x&&e?(i=e.pageX,r=e.pageY):(i=b.touchesStart.x,r=b.touchesStart.y);const z="number"==typeof e?e:null;1===l&&z&&(i=void 0,r=void 0,b.touchesStart.x=void 0,b.touchesStart.y=void 0);const A=M();s.scale=z||A,l=z||A,!e||1===l&&z?(u=0,m=0):(L=v.slideEl.offsetWidth,I=v.slideEl.offsetHeight,o=w(v.slideEl).left+n.scrollX,d=w(v.slideEl).top+n.scrollY,c=o+L/2-i,p=d+I/2-r,h=v.imageEl.offsetWidth||v.imageEl.clientWidth,g=v.imageEl.offsetHeight||v.imageEl.clientHeight,y=h*s.scale,x=g*s.scale,S=Math.min(L/2-y/2,0),T=Math.min(I/2-x/2,0),C=-S,P=-T,u=c*s.scale,m=p*s.scale,u<S&&(u=S),u>C&&(u=C),m<T&&(m=T),m>P&&(m=P)),z&&1===s.scale&&(v.originX=0,v.originY=0),v.imageWrapEl.style.transitionDuration="300ms",v.imageWrapEl.style.transform=`translate3d(${u}px, ${m}px,0)`,v.imageEl.style.transitionDuration="300ms",v.imageEl.style.transform=`translate3d(0,0,0) scale(${s.scale})`}function G(){const e=t.zoom,s=t.params.zoom;if(!v.slideEl){t.params.virtual&&t.params.virtual.enabled&&t.virtual?v.slideEl=f(t.slidesEl,`.${t.params.slideActiveClass}`)[0]:v.slideEl=t.slides[t.activeIndex];let e=v.slideEl.querySelector(`.${s.containerClass}`);e&&(e=e.querySelectorAll("picture, img, svg, canvas, .swiper-zoom-target")[0]),v.imageEl=e,v.imageWrapEl=e?E(v.imageEl,`.${s.containerClass}`)[0]:void 0}v.imageEl&&v.imageWrapEl&&(t.params.cssMode&&(t.wrapperEl.style.overflow="",t.wrapperEl.style.touchAction=""),e.scale=1,l=1,b.touchesStart.x=void 0,b.touchesStart.y=void 0,v.imageWrapEl.style.transitionDuration="300ms",v.imageWrapEl.style.transform="translate3d(0,0,0)",v.imageEl.style.transitionDuration="300ms",v.imageEl.style.transform="translate3d(0,0,0) scale(1)",v.slideEl.classList.remove(`${s.zoomedSlideClass}`),v.slideEl=void 0,v.originX=0,v.originY=0,t.params.zoom.panOnMouseMove&&(p={x:0,y:0},c&&(c=!1,b.startX=0,b.startY=0)))}function H(e){const s=t.zoom;s.scale&&1!==s.scale?G():D(e)}function X(){return{passiveListener:!!t.params.passiveListeners&&{passive:!0,capture:!1},activeListenerWithCapture:!t.params.passiveListeners||{passive:!1,capture:!0}}}function B(){const e=t.zoom;if(e.enabled)return;e.enabled=!0;const{passiveListener:s,activeListenerWithCapture:a}=X();t.wrapperEl.addEventListener("pointerdown",L,s),t.wrapperEl.addEventListener("pointermove",I,a),["pointerup","pointercancel","pointerout"].forEach((e=>{t.wrapperEl.addEventListener(e,z,s)})),t.wrapperEl.addEventListener("pointermove",$,a)}function Y(){const e=t.zoom;if(!e.enabled)return;e.enabled=!1;const{passiveListener:s,activeListenerWithCapture:a}=X();t.wrapperEl.removeEventListener("pointerdown",L,s),t.wrapperEl.removeEventListener("pointermove",I,a),["pointerup","pointercancel","pointerout"].forEach((e=>{t.wrapperEl.removeEventListener(e,z,s)})),t.wrapperEl.removeEventListener("pointermove",$,a)}Object.defineProperty(t.zoom,"scale",{get:()=>S,set(e){if(S!==e){const t=v.imageEl,s=v.slideEl;i("zoomChange",e,t,s)}S=e}}),a("init",(()=>{t.params.zoom.enabled&&B()})),a("destroy",(()=>{Y()})),a("touchStart",((e,s)=>{t.zoom.enabled&&function(e){const s=t.device;if(!v.imageEl)return;if(b.isTouched)return;s.android&&e.cancelable&&e.preventDefault(),b.isTouched=!0;const a=g.length>0?g[0]:e;b.touchesStart.x=a.pageX,b.touchesStart.y=a.pageY}(s)})),a("touchEnd",((e,s)=>{t.zoom.enabled&&function(){const e=t.zoom;if(g.length=0,!v.imageEl)return;if(!b.isTouched||!b.isMoved)return b.isTouched=!1,void(b.isMoved=!1);b.isTouched=!1,b.isMoved=!1;let s=300,a=300;const i=y.x*s,r=b.currentX+i,n=y.y*a,l=b.currentY+n;0!==y.x&&(s=Math.abs((r-b.currentX)/y.x)),0!==y.y&&(a=Math.abs((l-b.currentY)/y.y));const o=Math.max(s,a);b.currentX=r,b.currentY=l;const d=b.width*e.scale,c=b.height*e.scale;b.minX=Math.min(v.slideWidth/2-d/2,0),b.maxX=-b.minX,b.minY=Math.min(v.slideHeight/2-c/2,0),b.maxY=-b.minY,b.currentX=Math.max(Math.min(b.currentX,b.maxX),b.minX),b.currentY=Math.max(Math.min(b.currentY,b.maxY),b.minY),v.imageWrapEl.style.transitionDuration=`${o}ms`,v.imageWrapEl.style.transform=`translate3d(${b.currentX}px, ${b.currentY}px,0)`}()})),a("doubleTap",((e,s)=>{!t.animating&&t.params.zoom.enabled&&t.zoom.enabled&&t.params.zoom.toggle&&H(s)})),a("transitionEnd",(()=>{t.zoom.enabled&&t.params.zoom.enabled&&k()})),a("slideChange",(()=>{t.zoom.enabled&&t.params.zoom.enabled&&t.params.cssMode&&k()})),Object.assign(t.zoom,{enable:B,disable:Y,in:D,out:G,toggle:H})},function(e){let{swiper:t,extendParams:s,on:a}=e;function i(e,t){const s=function(){let e,t,s;return(a,i)=>{for(t=-1,e=a.length;e-t>1;)s=e+t>>1,a[s]<=i?t=s:e=s;return e}}();let a,i;return this.x=e,this.y=t,this.lastIndex=e.length-1,this.interpolate=function(e){return e?(i=s(this.x,e),a=i-1,(e-this.x[a])*(this.y[i]-this.y[a])/(this.x[i]-this.x[a])+this.y[a]):0},this}function r(){t.controller.control&&t.controller.spline&&(t.controller.spline=void 0,delete t.controller.spline)}s({controller:{control:void 0,inverse:!1,by:"slide"}}),t.controller={control:void 0},a("beforeInit",(()=>{if("undefined"!=typeof window&&("string"==typeof t.params.controller.control||t.params.controller.control instanceof HTMLElement)){("string"==typeof t.params.controller.control?[...document.querySelectorAll(t.params.controller.control)]:[t.params.controller.control]).forEach((e=>{if(t.controller.control||(t.controller.control=[]),e&&e.swiper)t.controller.control.push(e.swiper);else if(e){const s=`${t.params.eventsPrefix}init`,a=i=>{t.controller.control.push(i.detail[0]),t.update(),e.removeEventListener(s,a)};e.addEventListener(s,a)}}))}else t.controller.control=t.params.controller.control})),a("update",(()=>{r()})),a("resize",(()=>{r()})),a("observerUpdate",(()=>{r()})),a("setTranslate",((e,s,a)=>{t.controller.control&&!t.controller.control.destroyed&&t.controller.setTranslate(s,a)})),a("setTransition",((e,s,a)=>{t.controller.control&&!t.controller.control.destroyed&&t.controller.setTransition(s,a)})),Object.assign(t.controller,{setTranslate:function(e,s){const a=t.controller.control;let r,n;const l=t.constructor;function o(e){if(e.destroyed)return;const s=t.rtlTranslate?-t.translate:t.translate;"slide"===t.params.controller.by&&(!function(e){t.controller.spline=t.params.loop?new i(t.slidesGrid,e.slidesGrid):new i(t.snapGrid,e.snapGrid)}(e),n=-t.controller.spline.interpolate(-s)),n&&"container"!==t.params.controller.by||(r=(e.maxTranslate()-e.minTranslate())/(t.maxTranslate()-t.minTranslate()),!Number.isNaN(r)&&Number.isFinite(r)||(r=1),n=(s-t.minTranslate())*r+e.minTranslate()),t.params.controller.inverse&&(n=e.maxTranslate()-n),e.updateProgress(n),e.setTranslate(n,t),e.updateActiveIndex(),e.updateSlidesClasses()}if(Array.isArray(a))for(let e=0;e<a.length;e+=1)a[e]!==s&&a[e]instanceof l&&o(a[e]);else a instanceof l&&s!==a&&o(a)},setTransition:function(e,s){const a=t.constructor,i=t.controller.control;let r;function n(s){s.destroyed||(s.setTransition(e,t),0!==e&&(s.transitionStart(),s.params.autoHeight&&l((()=>{s.updateAutoHeight()})),x(s.wrapperEl,(()=>{i&&s.transitionEnd()}))))}if(Array.isArray(i))for(r=0;r<i.length;r+=1)i[r]!==s&&i[r]instanceof a&&n(i[r]);else i instanceof a&&s!==i&&n(i)}})},function(e){let{swiper:t,extendParams:s,on:i}=e;s({a11y:{enabled:!0,notificationClass:"swiper-notification",prevSlideMessage:"Previous slide",nextSlideMessage:"Next slide",firstSlideMessage:"This is the first slide",lastSlideMessage:"This is the last slide",paginationBulletMessage:"Go to slide {{index}}",slideLabelMessage:"{{index}} / {{slidesLength}}",containerMessage:null,containerRoleDescriptionMessage:null,containerRole:null,itemRoleDescriptionMessage:null,slideRole:"group",id:null,scrollOnFocus:!0}}),t.a11y={clicked:!1};let r,n,l=null,o=(new Date).getTime();function d(e){const t=l;0!==t.length&&(t.innerHTML="",t.innerHTML=e)}function c(e){(e=T(e)).forEach((e=>{e.setAttribute("tabIndex","0")}))}function p(e){(e=T(e)).forEach((e=>{e.setAttribute("tabIndex","-1")}))}function u(e,t){(e=T(e)).forEach((e=>{e.setAttribute("role",t)}))}function m(e,t){(e=T(e)).forEach((e=>{e.setAttribute("aria-roledescription",t)}))}function h(e,t){(e=T(e)).forEach((e=>{e.setAttribute("aria-label",t)}))}function f(e){(e=T(e)).forEach((e=>{e.setAttribute("aria-disabled",!0)}))}function g(e){(e=T(e)).forEach((e=>{e.setAttribute("aria-disabled",!1)}))}function w(e){if(13!==e.keyCode&&32!==e.keyCode)return;const s=t.params.a11y,a=e.target;if(!t.pagination||!t.pagination.el||a!==t.pagination.el&&!t.pagination.el.contains(e.target)||e.target.matches(ne(t.params.pagination.bulletClass))){if(t.navigation&&t.navigation.prevEl&&t.navigation.nextEl){const e=T(t.navigation.prevEl);T(t.navigation.nextEl).includes(a)&&(t.isEnd&&!t.params.loop||t.slideNext(),t.isEnd?d(s.lastSlideMessage):d(s.nextSlideMessage)),e.includes(a)&&(t.isBeginning&&!t.params.loop||t.slidePrev(),t.isBeginning?d(s.firstSlideMessage):d(s.prevSlideMessage))}t.pagination&&a.matches(ne(t.params.pagination.bulletClass))&&a.click()}}function b(){return t.pagination&&t.pagination.bullets&&t.pagination.bullets.length}function E(){return b()&&t.params.pagination.clickable}const x=(e,t,s)=>{c(e),"BUTTON"!==e.tagName&&(u(e,"button"),e.addEventListener("keydown",w)),h(e,s),function(e,t){(e=T(e)).forEach((e=>{e.setAttribute("aria-controls",t)}))}(e,t)},S=e=>{n&&n!==e.target&&!n.contains(e.target)&&(r=!0),t.a11y.clicked=!0},M=()=>{r=!1,requestAnimationFrame((()=>{requestAnimationFrame((()=>{t.destroyed||(t.a11y.clicked=!1)}))}))},C=e=>{o=(new Date).getTime()},P=e=>{if(t.a11y.clicked||!t.params.a11y.scrollOnFocus)return;if((new Date).getTime()-o<100)return;const s=e.target.closest(`.${t.params.slideClass}, swiper-slide`);if(!s||!t.slides.includes(s))return;n=s;const a=t.slides.indexOf(s)===t.activeIndex,i=t.params.watchSlidesProgress&&t.visibleSlides&&t.visibleSlides.includes(s);a||i||e.sourceCapabilities&&e.sourceCapabilities.firesTouchEvents||(t.isHorizontal()?t.el.scrollLeft=0:t.el.scrollTop=0,requestAnimationFrame((()=>{r||(t.params.loop?t.slideToLoop(parseInt(s.getAttribute("data-swiper-slide-index")),0):t.slideTo(t.slides.indexOf(s),0),r=!1)})))},L=()=>{const e=t.params.a11y;e.itemRoleDescriptionMessage&&m(t.slides,e.itemRoleDescriptionMessage),e.slideRole&&u(t.slides,e.slideRole);const s=t.slides.length;e.slideLabelMessage&&t.slides.forEach(((a,i)=>{const r=t.params.loop?parseInt(a.getAttribute("data-swiper-slide-index"),10):i;h(a,e.slideLabelMessage.replace(/\{\{index\}\}/,r+1).replace(/\{\{slidesLength\}\}/,s))}))},I=()=>{const e=t.params.a11y;t.el.append(l);const s=t.el;e.containerRoleDescriptionMessage&&m(s,e.containerRoleDescriptionMessage),e.containerMessage&&h(s,e.containerMessage),e.containerRole&&u(s,e.containerRole);const i=t.wrapperEl,r=e.id||i.getAttribute("id")||`swiper-wrapper-${n=16,void 0===n&&(n=16),"x".repeat(n).replace(/x/g,(()=>Math.round(16*Math.random()).toString(16)))}`;var n;const o=t.params.autoplay&&t.params.autoplay.enabled?"off":"polite";var d;d=r,T(i).forEach((e=>{e.setAttribute("id",d)})),function(e,t){(e=T(e)).forEach((e=>{e.setAttribute("aria-live",t)}))}(i,o),L();let{nextEl:c,prevEl:p}=t.navigation?t.navigation:{};if(c=T(c),p=T(p),c&&c.forEach((t=>x(t,r,e.nextSlideMessage))),p&&p.forEach((t=>x(t,r,e.prevSlideMessage))),E()){T(t.pagination.el).forEach((e=>{e.addEventListener("keydown",w)}))}a().addEventListener("visibilitychange",C),t.el.addEventListener("focus",P,!0),t.el.addEventListener("focus",P,!0),t.el.addEventListener("pointerdown",S,!0),t.el.addEventListener("pointerup",M,!0)};i("beforeInit",(()=>{l=v("span",t.params.a11y.notificationClass),l.setAttribute("aria-live","assertive"),l.setAttribute("aria-atomic","true")})),i("afterInit",(()=>{t.params.a11y.enabled&&I()})),i("slidesLengthChange snapGridLengthChange slidesGridLengthChange",(()=>{t.params.a11y.enabled&&L()})),i("fromEdge toEdge afterInit lock unlock",(()=>{t.params.a11y.enabled&&function(){if(t.params.loop||t.params.rewind||!t.navigation)return;const{nextEl:e,prevEl:s}=t.navigation;s&&(t.isBeginning?(f(s),p(s)):(g(s),c(s))),e&&(t.isEnd?(f(e),p(e)):(g(e),c(e)))}()})),i("paginationUpdate",(()=>{t.params.a11y.enabled&&function(){const e=t.params.a11y;b()&&t.pagination.bullets.forEach((s=>{t.params.pagination.clickable&&(c(s),t.params.pagination.renderBullet||(u(s,"button"),h(s,e.paginationBulletMessage.replace(/\{\{index\}\}/,y(s)+1)))),s.matches(ne(t.params.pagination.bulletActiveClass))?s.setAttribute("aria-current","true"):s.removeAttribute("aria-current")}))}()})),i("destroy",(()=>{t.params.a11y.enabled&&function(){l&&l.remove();let{nextEl:e,prevEl:s}=t.navigation?t.navigation:{};e=T(e),s=T(s),e&&e.forEach((e=>e.removeEventListener("keydown",w))),s&&s.forEach((e=>e.removeEventListener("keydown",w))),E()&&T(t.pagination.el).forEach((e=>{e.removeEventListener("keydown",w)}));a().removeEventListener("visibilitychange",C),t.el&&"string"!=typeof t.el&&(t.el.removeEventListener("focus",P,!0),t.el.removeEventListener("pointerdown",S,!0),t.el.removeEventListener("pointerup",M,!0))}()}))},function(e){let{swiper:t,extendParams:s,on:a}=e;s({history:{enabled:!1,root:"",replaceState:!1,key:"slides",keepQuery:!1}});let i=!1,n={};const l=e=>e.toString().replace(/\s+/g,"-").replace(/[^\w-]+/g,"").replace(/--+/g,"-").replace(/^-+/,"").replace(/-+$/,""),o=e=>{const t=r();let s;s=e?new URL(e):t.location;const a=s.pathname.slice(1).split("/").filter((e=>""!==e)),i=a.length;return{key:a[i-2],value:a[i-1]}},d=(e,s)=>{const a=r();if(!i||!t.params.history.enabled)return;let n;n=t.params.url?new URL(t.params.url):a.location;const o=t.virtual&&t.params.virtual.enabled?t.slidesEl.querySelector(`[data-swiper-slide-index="${s}"]`):t.slides[s];let d=l(o.getAttribute("data-history"));if(t.params.history.root.length>0){let s=t.params.history.root;"/"===s[s.length-1]&&(s=s.slice(0,s.length-1)),d=`${s}/${e?`${e}/`:""}${d}`}else n.pathname.includes(e)||(d=`${e?`${e}/`:""}${d}`);t.params.history.keepQuery&&(d+=n.search);const c=a.history.state;c&&c.value===d||(t.params.history.replaceState?a.history.replaceState({value:d},null,d):a.history.pushState({value:d},null,d))},c=(e,s,a)=>{if(s)for(let i=0,r=t.slides.length;i<r;i+=1){const r=t.slides[i];if(l(r.getAttribute("data-history"))===s){const s=t.getSlideIndex(r);t.slideTo(s,e,a)}}else t.slideTo(0,e,a)},p=()=>{n=o(t.params.url),c(t.params.speed,n.value,!1)};a("init",(()=>{t.params.history.enabled&&(()=>{const e=r();if(t.params.history){if(!e.history||!e.history.pushState)return t.params.history.enabled=!1,void(t.params.hashNavigation.enabled=!0);i=!0,n=o(t.params.url),n.key||n.value?(c(0,n.value,t.params.runCallbacksOnInit),t.params.history.replaceState||e.addEventListener("popstate",p)):t.params.history.replaceState||e.addEventListener("popstate",p)}})()})),a("destroy",(()=>{t.params.history.enabled&&(()=>{const e=r();t.params.history.replaceState||e.removeEventListener("popstate",p)})()})),a("transitionEnd _freeModeNoMomentumRelease",(()=>{i&&d(t.params.history.key,t.activeIndex)})),a("slideChange",(()=>{i&&t.params.cssMode&&d(t.params.history.key,t.activeIndex)}))},function(e){let{swiper:t,extendParams:s,emit:i,on:n}=e,l=!1;const o=a(),d=r();s({hashNavigation:{enabled:!1,replaceState:!1,watchState:!1,getSlideIndex(e,s){if(t.virtual&&t.params.virtual.enabled){const e=t.slides.find((e=>e.getAttribute("data-hash")===s));if(!e)return 0;return parseInt(e.getAttribute("data-swiper-slide-index"),10)}return t.getSlideIndex(f(t.slidesEl,`.${t.params.slideClass}[data-hash="${s}"], swiper-slide[data-hash="${s}"]`)[0])}}});const c=()=>{i("hashChange");const e=o.location.hash.replace("#",""),s=t.virtual&&t.params.virtual.enabled?t.slidesEl.querySelector(`[data-swiper-slide-index="${t.activeIndex}"]`):t.slides[t.activeIndex];if(e!==(s?s.getAttribute("data-hash"):"")){const s=t.params.hashNavigation.getSlideIndex(t,e);if(void 0===s||Number.isNaN(s))return;t.slideTo(s)}},p=()=>{if(!l||!t.params.hashNavigation.enabled)return;const e=t.virtual&&t.params.virtual.enabled?t.slidesEl.querySelector(`[data-swiper-slide-index="${t.activeIndex}"]`):t.slides[t.activeIndex],s=e?e.getAttribute("data-hash")||e.getAttribute("data-history"):"";t.params.hashNavigation.replaceState&&d.history&&d.history.replaceState?(d.history.replaceState(null,null,`#${s}`||""),i("hashSet")):(o.location.hash=s||"",i("hashSet"))};n("init",(()=>{t.params.hashNavigation.enabled&&(()=>{if(!t.params.hashNavigation.enabled||t.params.history&&t.params.history.enabled)return;l=!0;const e=o.location.hash.replace("#","");if(e){const s=0,a=t.params.hashNavigation.getSlideIndex(t,e);t.slideTo(a||0,s,t.params.runCallbacksOnInit,!0)}t.params.hashNavigation.watchState&&d.addEventListener("hashchange",c)})()})),n("destroy",(()=>{t.params.hashNavigation.enabled&&t.params.hashNavigation.watchState&&d.removeEventListener("hashchange",c)})),n("transitionEnd _freeModeNoMomentumRelease",(()=>{l&&p()})),n("slideChange",(()=>{l&&t.params.cssMode&&p()}))},function(e){let t,s,{swiper:i,extendParams:r,on:n,emit:l,params:o}=e;i.autoplay={running:!1,paused:!1,timeLeft:0},r({autoplay:{enabled:!1,delay:3e3,waitForTransition:!0,disableOnInteraction:!1,stopOnLastSlide:!1,reverseDirection:!1,pauseOnMouseEnter:!1}});let d,c,p,u,m,h,f,g,v=o&&o.autoplay?o.autoplay.delay:3e3,w=o&&o.autoplay?o.autoplay.delay:3e3,b=(new Date).getTime();function y(e){i&&!i.destroyed&&i.wrapperEl&&e.target===i.wrapperEl&&(i.wrapperEl.removeEventListener("transitionend",y),g||e.detail&&e.detail.bySwiperTouchMove||C())}const E=()=>{if(i.destroyed||!i.autoplay.running)return;i.autoplay.paused?c=!0:c&&(w=d,c=!1);const e=i.autoplay.paused?d:b+w-(new Date).getTime();i.autoplay.timeLeft=e,l("autoplayTimeLeft",e,e/v),s=requestAnimationFrame((()=>{E()}))},x=e=>{if(i.destroyed||!i.autoplay.running)return;cancelAnimationFrame(s),E();let a=void 0===e?i.params.autoplay.delay:e;v=i.params.autoplay.delay,w=i.params.autoplay.delay;const r=(()=>{let e;if(e=i.virtual&&i.params.virtual.enabled?i.slides.find((e=>e.classList.contains("swiper-slide-active"))):i.slides[i.activeIndex],!e)return;return parseInt(e.getAttribute("data-swiper-autoplay"),10)})();!Number.isNaN(r)&&r>0&&void 0===e&&(a=r,v=r,w=r),d=a;const n=i.params.speed,o=()=>{i&&!i.destroyed&&(i.params.autoplay.reverseDirection?!i.isBeginning||i.params.loop||i.params.rewind?(i.slidePrev(n,!0,!0),l("autoplay")):i.params.autoplay.stopOnLastSlide||(i.slideTo(i.slides.length-1,n,!0,!0),l("autoplay")):!i.isEnd||i.params.loop||i.params.rewind?(i.slideNext(n,!0,!0),l("autoplay")):i.params.autoplay.stopOnLastSlide||(i.slideTo(0,n,!0,!0),l("autoplay")),i.params.cssMode&&(b=(new Date).getTime(),requestAnimationFrame((()=>{x()}))))};return a>0?(clearTimeout(t),t=setTimeout((()=>{o()}),a)):requestAnimationFrame((()=>{o()})),a},S=()=>{b=(new Date).getTime(),i.autoplay.running=!0,x(),l("autoplayStart")},T=()=>{i.autoplay.running=!1,clearTimeout(t),cancelAnimationFrame(s),l("autoplayStop")},M=(e,s)=>{if(i.destroyed||!i.autoplay.running)return;clearTimeout(t),e||(f=!0);const a=()=>{l("autoplayPause"),i.params.autoplay.waitForTransition?i.wrapperEl.addEventListener("transitionend",y):C()};if(i.autoplay.paused=!0,s)return h&&(d=i.params.autoplay.delay),h=!1,void a();const r=d||i.params.autoplay.delay;d=r-((new Date).getTime()-b),i.isEnd&&d<0&&!i.params.loop||(d<0&&(d=0),a())},C=()=>{i.isEnd&&d<0&&!i.params.loop||i.destroyed||!i.autoplay.running||(b=(new Date).getTime(),f?(f=!1,x(d)):x(),i.autoplay.paused=!1,l("autoplayResume"))},P=()=>{if(i.destroyed||!i.autoplay.running)return;const e=a();"hidden"===e.visibilityState&&(f=!0,M(!0)),"visible"===e.visibilityState&&C()},L=e=>{"mouse"===e.pointerType&&(f=!0,g=!0,i.animating||i.autoplay.paused||M(!0))},I=e=>{"mouse"===e.pointerType&&(g=!1,i.autoplay.paused&&C())};n("init",(()=>{i.params.autoplay.enabled&&(i.params.autoplay.pauseOnMouseEnter&&(i.el.addEventListener("pointerenter",L),i.el.addEventListener("pointerleave",I)),a().addEventListener("visibilitychange",P),S())})),n("destroy",(()=>{i.el&&"string"!=typeof i.el&&(i.el.removeEventListener("pointerenter",L),i.el.removeEventListener("pointerleave",I)),a().removeEventListener("visibilitychange",P),i.autoplay.running&&T()})),n("_freeModeStaticRelease",(()=>{(u||f)&&C()})),n("_freeModeNoMomentumRelease",(()=>{i.params.autoplay.disableOnInteraction?T():M(!0,!0)})),n("beforeTransitionStart",((e,t,s)=>{!i.destroyed&&i.autoplay.running&&(s||!i.params.autoplay.disableOnInteraction?M(!0,!0):T())})),n("sliderFirstMove",(()=>{!i.destroyed&&i.autoplay.running&&(i.params.autoplay.disableOnInteraction?T():(p=!0,u=!1,f=!1,m=setTimeout((()=>{f=!0,u=!0,M(!0)}),200)))})),n("touchEnd",(()=>{if(!i.destroyed&&i.autoplay.running&&p){if(clearTimeout(m),clearTimeout(t),i.params.autoplay.disableOnInteraction)return u=!1,void(p=!1);u&&i.params.cssMode&&C(),u=!1,p=!1}})),n("slideChange",(()=>{!i.destroyed&&i.autoplay.running&&(h=!0)})),Object.assign(i.autoplay,{start:S,stop:T,pause:M,resume:C})},function(e){let{swiper:t,extendParams:s,on:i}=e;s({thumbs:{swiper:null,multipleActiveThumbs:!0,autoScrollOffset:0,slideThumbActiveClass:"swiper-slide-thumb-active",thumbsContainerClass:"swiper-thumbs"}});let r=!1,n=!1;function l(){const e=t.thumbs.swiper;if(!e||e.destroyed)return;const s=e.clickedIndex,a=e.clickedSlide;if(a&&a.classList.contains(t.params.thumbs.slideThumbActiveClass))return;if(null==s)return;let i;i=e.params.loop?parseInt(e.clickedSlide.getAttribute("data-swiper-slide-index"),10):s,t.params.loop?t.slideToLoop(i):t.slideTo(i)}function o(){const{thumbs:e}=t.params;if(r)return!1;r=!0;const s=t.constructor;if(e.swiper instanceof s)t.thumbs.swiper=e.swiper,Object.assign(t.thumbs.swiper.originalParams,{watchSlidesProgress:!0,slideToClickedSlide:!1}),Object.assign(t.thumbs.swiper.params,{watchSlidesProgress:!0,slideToClickedSlide:!1}),t.thumbs.swiper.update();else if(c(e.swiper)){const a=Object.assign({},e.swiper);Object.assign(a,{watchSlidesProgress:!0,slideToClickedSlide:!1}),t.thumbs.swiper=new s(a),n=!0}return t.thumbs.swiper.el.classList.add(t.params.thumbs.thumbsContainerClass),t.thumbs.swiper.on("tap",l),!0}function d(e){const s=t.thumbs.swiper;if(!s||s.destroyed)return;const a="auto"===s.params.slidesPerView?s.slidesPerViewDynamic():s.params.slidesPerView;let i=1;const r=t.params.thumbs.slideThumbActiveClass;if(t.params.slidesPerView>1&&!t.params.centeredSlides&&(i=t.params.slidesPerView),t.params.thumbs.multipleActiveThumbs||(i=1),i=Math.floor(i),s.slides.forEach((e=>e.classList.remove(r))),s.params.loop||s.params.virtual&&s.params.virtual.enabled)for(let e=0;e<i;e+=1)f(s.slidesEl,`[data-swiper-slide-index="${t.realIndex+e}"]`).forEach((e=>{e.classList.add(r)}));else for(let e=0;e<i;e+=1)s.slides[t.realIndex+e]&&s.slides[t.realIndex+e].classList.add(r);const n=t.params.thumbs.autoScrollOffset,l=n&&!s.params.loop;if(t.realIndex!==s.realIndex||l){const i=s.activeIndex;let r,o;if(s.params.loop){const e=s.slides.find((e=>e.getAttribute("data-swiper-slide-index")===`${t.realIndex}`));r=s.slides.indexOf(e),o=t.activeIndex>t.previousIndex?"next":"prev"}else r=t.realIndex,o=r>t.previousIndex?"next":"prev";l&&(r+="next"===o?n:-1*n),s.visibleSlidesIndexes&&s.visibleSlidesIndexes.indexOf(r)<0&&(s.params.centeredSlides?r=r>i?r-Math.floor(a/2)+1:r+Math.floor(a/2)-1:r>i&&s.params.slidesPerGroup,s.slideTo(r,e?0:void 0))}}t.thumbs={swiper:null},i("beforeInit",(()=>{const{thumbs:e}=t.params;if(e&&e.swiper)if("string"==typeof e.swiper||e.swiper instanceof HTMLElement){const s=a(),i=()=>{const a="string"==typeof e.swiper?s.querySelector(e.swiper):e.swiper;if(a&&a.swiper)e.swiper=a.swiper,o(),d(!0);else if(a){const s=`${t.params.eventsPrefix}init`,i=r=>{e.swiper=r.detail[0],a.removeEventListener(s,i),o(),d(!0),e.swiper.update(),t.update()};a.addEventListener(s,i)}return a},r=()=>{if(t.destroyed)return;i()||requestAnimationFrame(r)};requestAnimationFrame(r)}else o(),d(!0)})),i("slideChange update resize observerUpdate",(()=>{d()})),i("setTransition",((e,s)=>{const a=t.thumbs.swiper;a&&!a.destroyed&&a.setTransition(s)})),i("beforeDestroy",(()=>{const e=t.thumbs.swiper;e&&!e.destroyed&&n&&e.destroy()})),Object.assign(t.thumbs,{init:o,update:d})},function(e){let{swiper:t,extendParams:s,emit:a,once:i}=e;s({freeMode:{enabled:!1,momentum:!0,momentumRatio:1,momentumBounce:!0,momentumBounceRatio:1,momentumVelocityRatio:1,sticky:!1,minimumVelocity:.02}}),Object.assign(t,{freeMode:{onTouchStart:function(){if(t.params.cssMode)return;const e=t.getTranslate();t.setTranslate(e),t.setTransition(0),t.touchEventsData.velocities.length=0,t.freeMode.onTouchEnd({currentPos:t.rtl?t.translate:-t.translate})},onTouchMove:function(){if(t.params.cssMode)return;const{touchEventsData:e,touches:s}=t;0===e.velocities.length&&e.velocities.push({position:s[t.isHorizontal()?"startX":"startY"],time:e.touchStartTime}),e.velocities.push({position:s[t.isHorizontal()?"currentX":"currentY"],time:o()})},onTouchEnd:function(e){let{currentPos:s}=e;if(t.params.cssMode)return;const{params:r,wrapperEl:n,rtlTranslate:l,snapGrid:d,touchEventsData:c}=t,p=o()-c.touchStartTime;if(s<-t.minTranslate())t.slideTo(t.activeIndex);else if(s>-t.maxTranslate())t.slides.length<d.length?t.slideTo(d.length-1):t.slideTo(t.slides.length-1);else{if(r.freeMode.momentum){if(c.velocities.length>1){const e=c.velocities.pop(),s=c.velocities.pop(),a=e.position-s.position,i=e.time-s.time;t.velocity=a/i,t.velocity/=2,Math.abs(t.velocity)<r.freeMode.minimumVelocity&&(t.velocity=0),(i>150||o()-e.time>300)&&(t.velocity=0)}else t.velocity=0;t.velocity*=r.freeMode.momentumVelocityRatio,c.velocities.length=0;let e=1e3*r.freeMode.momentumRatio;const s=t.velocity*e;let p=t.translate+s;l&&(p=-p);let u,m=!1;const h=20*Math.abs(t.velocity)*r.freeMode.momentumBounceRatio;let f;if(p<t.maxTranslate())r.freeMode.momentumBounce?(p+t.maxTranslate()<-h&&(p=t.maxTranslate()-h),u=t.maxTranslate(),m=!0,c.allowMomentumBounce=!0):p=t.maxTranslate(),r.loop&&r.centeredSlides&&(f=!0);else if(p>t.minTranslate())r.freeMode.momentumBounce?(p-t.minTranslate()>h&&(p=t.minTranslate()+h),u=t.minTranslate(),m=!0,c.allowMomentumBounce=!0):p=t.minTranslate(),r.loop&&r.centeredSlides&&(f=!0);else if(r.freeMode.sticky){let e;for(let t=0;t<d.length;t+=1)if(d[t]>-p){e=t;break}p=Math.abs(d[e]-p)<Math.abs(d[e-1]-p)||"next"===t.swipeDirection?d[e]:d[e-1],p=-p}if(f&&i("transitionEnd",(()=>{t.loopFix()})),0!==t.velocity){if(e=l?Math.abs((-p-t.translate)/t.velocity):Math.abs((p-t.translate)/t.velocity),r.freeMode.sticky){const s=Math.abs((l?-p:p)-t.translate),a=t.slidesSizesGrid[t.activeIndex];e=s<a?r.speed:s<2*a?1.5*r.speed:2.5*r.speed}}else if(r.freeMode.sticky)return void t.slideToClosest();r.freeMode.momentumBounce&&m?(t.updateProgress(u),t.setTransition(e),t.setTranslate(p),t.transitionStart(!0,t.swipeDirection),t.animating=!0,x(n,(()=>{t&&!t.destroyed&&c.allowMomentumBounce&&(a("momentumBounce"),t.setTransition(r.speed),setTimeout((()=>{t.setTranslate(u),x(n,(()=>{t&&!t.destroyed&&t.transitionEnd()}))}),0))}))):t.velocity?(a("_freeModeNoMomentumRelease"),t.updateProgress(p),t.setTransition(e),t.setTranslate(p),t.transitionStart(!0,t.swipeDirection),t.animating||(t.animating=!0,x(n,(()=>{t&&!t.destroyed&&t.transitionEnd()})))):t.updateProgress(p),t.updateActiveIndex(),t.updateSlidesClasses()}else{if(r.freeMode.sticky)return void t.slideToClosest();r.freeMode&&a("_freeModeNoMomentumRelease")}(!r.freeMode.momentum||p>=r.longSwipesMs)&&(a("_freeModeStaticRelease"),t.updateProgress(),t.updateActiveIndex(),t.updateSlidesClasses())}}}})},function(e){let t,s,a,i,{swiper:r,extendParams:n,on:l}=e;n({grid:{rows:1,fill:"column"}});const o=()=>{let e=r.params.spaceBetween;return"string"==typeof e&&e.indexOf("%")>=0?e=parseFloat(e.replace("%",""))/100*r.size:"string"==typeof e&&(e=parseFloat(e)),e};l("init",(()=>{i=r.params.grid&&r.params.grid.rows>1})),l("update",(()=>{const{params:e,el:t}=r,s=e.grid&&e.grid.rows>1;i&&!s?(t.classList.remove(`${e.containerModifierClass}grid`,`${e.containerModifierClass}grid-column`),a=1,r.emitContainerClasses()):!i&&s&&(t.classList.add(`${e.containerModifierClass}grid`),"column"===e.grid.fill&&t.classList.add(`${e.containerModifierClass}grid-column`),r.emitContainerClasses()),i=s})),r.grid={initSlides:e=>{const{slidesPerView:i}=r.params,{rows:n,fill:l}=r.params.grid,o=r.virtual&&r.params.virtual.enabled?r.virtual.slides.length:e.length;a=Math.floor(o/n),t=Math.floor(o/n)===o/n?o:Math.ceil(o/n)*n,"auto"!==i&&"row"===l&&(t=Math.max(t,i*n)),s=t/n},unsetSlides:()=>{r.slides&&r.slides.forEach((e=>{e.swiperSlideGridSet&&(e.style.height="",e.style[r.getDirectionLabel("margin-top")]="")}))},updateSlide:(e,i,n)=>{const{slidesPerGroup:l}=r.params,d=o(),{rows:c,fill:p}=r.params.grid,u=r.virtual&&r.params.virtual.enabled?r.virtual.slides.length:n.length;let m,h,f;if("row"===p&&l>1){const s=Math.floor(e/(l*c)),a=e-c*l*s,r=0===s?l:Math.min(Math.ceil((u-s*c*l)/c),l);f=Math.floor(a/r),h=a-f*r+s*l,m=h+f*t/c,i.style.order=m}else"column"===p?(h=Math.floor(e/c),f=e-h*c,(h>a||h===a&&f===c-1)&&(f+=1,f>=c&&(f=0,h+=1))):(f=Math.floor(e/s),h=e-f*s);i.row=f,i.column=h,i.style.height=`calc((100% - ${(c-1)*d}px) / ${c})`,i.style[r.getDirectionLabel("margin-top")]=0!==f?d&&`${d}px`:"",i.swiperSlideGridSet=!0},updateWrapperSize:(e,s)=>{const{centeredSlides:a,roundLengths:i}=r.params,n=o(),{rows:l}=r.params.grid;if(r.virtualSize=(e+n)*t,r.virtualSize=Math.ceil(r.virtualSize/l)-n,r.params.cssMode||(r.wrapperEl.style[r.getDirectionLabel("width")]=`${r.virtualSize+n}px`),a){const e=[];for(let t=0;t<s.length;t+=1){let a=s[t];i&&(a=Math.floor(a)),s[t]<r.virtualSize+s[0]&&e.push(a)}s.splice(0,s.length),s.push(...e)}}}},function(e){let{swiper:t}=e;Object.assign(t,{appendSlide:le.bind(t),prependSlide:oe.bind(t),addSlide:de.bind(t),removeSlide:ce.bind(t),removeAllSlides:pe.bind(t)})},function(e){let{swiper:t,extendParams:s,on:a}=e;s({fadeEffect:{crossFade:!1}}),ue({effect:"fade",swiper:t,on:a,setTranslate:()=>{const{slides:e}=t;t.params.fadeEffect;for(let s=0;s<e.length;s+=1){const e=t.slides[s];let a=-e.swiperSlideOffset;t.params.virtualTranslate||(a-=t.translate);let i=0;t.isHorizontal()||(i=a,a=0);const r=t.params.fadeEffect.crossFade?Math.max(1-Math.abs(e.progress),0):1+Math.min(Math.max(e.progress,-1),0),n=me(0,e);n.style.opacity=r,n.style.transform=`translate3d(${a}px, ${i}px, 0px)`}},setTransition:e=>{const s=t.slides.map((e=>h(e)));s.forEach((t=>{t.style.transitionDuration=`${e}ms`})),he({swiper:t,duration:e,transformElements:s,allSlides:!0})},overwriteParams:()=>({slidesPerView:1,slidesPerGroup:1,watchSlidesProgress:!0,spaceBetween:0,virtualTranslate:!t.params.cssMode})})},function(e){let{swiper:t,extendParams:s,on:a}=e;s({cubeEffect:{slideShadows:!0,shadow:!0,shadowOffset:20,shadowScale:.94}});const i=(e,t,s)=>{let a=s?e.querySelector(".swiper-slide-shadow-left"):e.querySelector(".swiper-slide-shadow-top"),i=s?e.querySelector(".swiper-slide-shadow-right"):e.querySelector(".swiper-slide-shadow-bottom");a||(a=v("div",("swiper-slide-shadow-cube swiper-slide-shadow-"+(s?"left":"top")).split(" ")),e.append(a)),i||(i=v("div",("swiper-slide-shadow-cube swiper-slide-shadow-"+(s?"right":"bottom")).split(" ")),e.append(i)),a&&(a.style.opacity=Math.max(-t,0)),i&&(i.style.opacity=Math.max(t,0))};ue({effect:"cube",swiper:t,on:a,setTranslate:()=>{const{el:e,wrapperEl:s,slides:a,width:r,height:n,rtlTranslate:l,size:o,browser:d}=t,c=M(t),p=t.params.cubeEffect,u=t.isHorizontal(),m=t.virtual&&t.params.virtual.enabled;let h,f=0;p.shadow&&(u?(h=t.wrapperEl.querySelector(".swiper-cube-shadow"),h||(h=v("div","swiper-cube-shadow"),t.wrapperEl.append(h)),h.style.height=`${r}px`):(h=e.querySelector(".swiper-cube-shadow"),h||(h=v("div","swiper-cube-shadow"),e.append(h))));for(let e=0;e<a.length;e+=1){const t=a[e];let s=e;m&&(s=parseInt(t.getAttribute("data-swiper-slide-index"),10));let r=90*s,n=Math.floor(r/360);l&&(r=-r,n=Math.floor(-r/360));const d=Math.max(Math.min(t.progress,1),-1);let h=0,g=0,v=0;s%4==0?(h=4*-n*o,v=0):(s-1)%4==0?(h=0,v=4*-n*o):(s-2)%4==0?(h=o+4*n*o,v=o):(s-3)%4==0&&(h=-o,v=3*o+4*o*n),l&&(h=-h),u||(g=h,h=0);const w=`rotateX(${c(u?0:-r)}deg) rotateY(${c(u?r:0)}deg) translate3d(${h}px, ${g}px, ${v}px)`;d<=1&&d>-1&&(f=90*s+90*d,l&&(f=90*-s-90*d)),t.style.transform=w,p.slideShadows&&i(t,d,u)}if(s.style.transformOrigin=`50% 50% -${o/2}px`,s.style["-webkit-transform-origin"]=`50% 50% -${o/2}px`,p.shadow)if(u)h.style.transform=`translate3d(0px, ${r/2+p.shadowOffset}px, ${-r/2}px) rotateX(89.99deg) rotateZ(0deg) scale(${p.shadowScale})`;else{const e=Math.abs(f)-90*Math.floor(Math.abs(f)/90),t=1.5-(Math.sin(2*e*Math.PI/360)/2+Math.cos(2*e*Math.PI/360)/2),s=p.shadowScale,a=p.shadowScale/t,i=p.shadowOffset;h.style.transform=`scale3d(${s}, 1, ${a}) translate3d(0px, ${n/2+i}px, ${-n/2/a}px) rotateX(-89.99deg)`}const g=(d.isSafari||d.isWebView)&&d.needPerspectiveFix?-o/2:0;s.style.transform=`translate3d(0px,0,${g}px) rotateX(${c(t.isHorizontal()?0:f)}deg) rotateY(${c(t.isHorizontal()?-f:0)}deg)`,s.style.setProperty("--swiper-cube-translate-z",`${g}px`)},setTransition:e=>{const{el:s,slides:a}=t;if(a.forEach((t=>{t.style.transitionDuration=`${e}ms`,t.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((t=>{t.style.transitionDuration=`${e}ms`}))})),t.params.cubeEffect.shadow&&!t.isHorizontal()){const t=s.querySelector(".swiper-cube-shadow");t&&(t.style.transitionDuration=`${e}ms`)}},recreateShadows:()=>{const e=t.isHorizontal();t.slides.forEach((t=>{const s=Math.max(Math.min(t.progress,1),-1);i(t,s,e)}))},getEffectParams:()=>t.params.cubeEffect,perspective:()=>!0,overwriteParams:()=>({slidesPerView:1,slidesPerGroup:1,watchSlidesProgress:!0,resistanceRatio:0,spaceBetween:0,centeredSlides:!1,virtualTranslate:!0})})},function(e){let{swiper:t,extendParams:s,on:a}=e;s({flipEffect:{slideShadows:!0,limitRotation:!0}});const i=(e,s)=>{let a=t.isHorizontal()?e.querySelector(".swiper-slide-shadow-left"):e.querySelector(".swiper-slide-shadow-top"),i=t.isHorizontal()?e.querySelector(".swiper-slide-shadow-right"):e.querySelector(".swiper-slide-shadow-bottom");a||(a=fe("flip",e,t.isHorizontal()?"left":"top")),i||(i=fe("flip",e,t.isHorizontal()?"right":"bottom")),a&&(a.style.opacity=Math.max(-s,0)),i&&(i.style.opacity=Math.max(s,0))};ue({effect:"flip",swiper:t,on:a,setTranslate:()=>{const{slides:e,rtlTranslate:s}=t,a=t.params.flipEffect,r=M(t);for(let n=0;n<e.length;n+=1){const l=e[n];let o=l.progress;t.params.flipEffect.limitRotation&&(o=Math.max(Math.min(l.progress,1),-1));const d=l.swiperSlideOffset;let c=-180*o,p=0,u=t.params.cssMode?-d-t.translate:-d,m=0;t.isHorizontal()?s&&(c=-c):(m=u,u=0,p=-c,c=0),l.style.zIndex=-Math.abs(Math.round(o))+e.length,a.slideShadows&&i(l,o);const h=`translate3d(${u}px, ${m}px, 0px) rotateX(${r(p)}deg) rotateY(${r(c)}deg)`;me(0,l).style.transform=h}},setTransition:e=>{const s=t.slides.map((e=>h(e)));s.forEach((t=>{t.style.transitionDuration=`${e}ms`,t.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((t=>{t.style.transitionDuration=`${e}ms`}))})),he({swiper:t,duration:e,transformElements:s})},recreateShadows:()=>{t.params.flipEffect,t.slides.forEach((e=>{let s=e.progress;t.params.flipEffect.limitRotation&&(s=Math.max(Math.min(e.progress,1),-1)),i(e,s)}))},getEffectParams:()=>t.params.flipEffect,perspective:()=>!0,overwriteParams:()=>({slidesPerView:1,slidesPerGroup:1,watchSlidesProgress:!0,spaceBetween:0,virtualTranslate:!t.params.cssMode})})},function(e){let{swiper:t,extendParams:s,on:a}=e;s({coverflowEffect:{rotate:50,stretch:0,depth:100,scale:1,modifier:1,slideShadows:!0}}),ue({effect:"coverflow",swiper:t,on:a,setTranslate:()=>{const{width:e,height:s,slides:a,slidesSizesGrid:i}=t,r=t.params.coverflowEffect,n=t.isHorizontal(),l=t.translate,o=n?e/2-l:s/2-l,d=n?r.rotate:-r.rotate,c=r.depth,p=M(t);for(let e=0,t=a.length;e<t;e+=1){const t=a[e],s=i[e],l=(o-t.swiperSlideOffset-s/2)/s,u="function"==typeof r.modifier?r.modifier(l):l*r.modifier;let m=n?d*u:0,h=n?0:d*u,f=-c*Math.abs(u),g=r.stretch;"string"==typeof g&&-1!==g.indexOf("%")&&(g=parseFloat(r.stretch)/100*s);let v=n?0:g*u,w=n?g*u:0,b=1-(1-r.scale)*Math.abs(u);Math.abs(w)<.001&&(w=0),Math.abs(v)<.001&&(v=0),Math.abs(f)<.001&&(f=0),Math.abs(m)<.001&&(m=0),Math.abs(h)<.001&&(h=0),Math.abs(b)<.001&&(b=0);const y=`translate3d(${w}px,${v}px,${f}px)  rotateX(${p(h)}deg) rotateY(${p(m)}deg) scale(${b})`;if(me(0,t).style.transform=y,t.style.zIndex=1-Math.abs(Math.round(u)),r.slideShadows){let e=n?t.querySelector(".swiper-slide-shadow-left"):t.querySelector(".swiper-slide-shadow-top"),s=n?t.querySelector(".swiper-slide-shadow-right"):t.querySelector(".swiper-slide-shadow-bottom");e||(e=fe("coverflow",t,n?"left":"top")),s||(s=fe("coverflow",t,n?"right":"bottom")),e&&(e.style.opacity=u>0?u:0),s&&(s.style.opacity=-u>0?-u:0)}}},setTransition:e=>{t.slides.map((e=>h(e))).forEach((t=>{t.style.transitionDuration=`${e}ms`,t.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((t=>{t.style.transitionDuration=`${e}ms`}))}))},perspective:()=>!0,overwriteParams:()=>({watchSlidesProgress:!0})})},function(e){let{swiper:t,extendParams:s,on:a}=e;s({creativeEffect:{limitProgress:1,shadowPerProgress:!1,progressMultiplier:1,perspective:!0,prev:{translate:[0,0,0],rotate:[0,0,0],opacity:1,scale:1},next:{translate:[0,0,0],rotate:[0,0,0],opacity:1,scale:1}}});const i=e=>"string"==typeof e?e:`${e}px`;ue({effect:"creative",swiper:t,on:a,setTranslate:()=>{const{slides:e,wrapperEl:s,slidesSizesGrid:a}=t,r=t.params.creativeEffect,{progressMultiplier:n}=r,l=t.params.centeredSlides,o=M(t);if(l){const e=a[0]/2-t.params.slidesOffsetBefore||0;s.style.transform=`translateX(calc(50% - ${e}px))`}for(let s=0;s<e.length;s+=1){const a=e[s],d=a.progress,c=Math.min(Math.max(a.progress,-r.limitProgress),r.limitProgress);let p=c;l||(p=Math.min(Math.max(a.originalProgress,-r.limitProgress),r.limitProgress));const u=a.swiperSlideOffset,m=[t.params.cssMode?-u-t.translate:-u,0,0],h=[0,0,0];let f=!1;t.isHorizontal()||(m[1]=m[0],m[0]=0);let g={translate:[0,0,0],rotate:[0,0,0],scale:1,opacity:1};c<0?(g=r.next,f=!0):c>0&&(g=r.prev,f=!0),m.forEach(((e,t)=>{m[t]=`calc(${e}px + (${i(g.translate[t])} * ${Math.abs(c*n)}))`})),h.forEach(((e,t)=>{let s=g.rotate[t]*Math.abs(c*n);h[t]=s})),a.style.zIndex=-Math.abs(Math.round(d))+e.length;const v=m.join(", "),w=`rotateX(${o(h[0])}deg) rotateY(${o(h[1])}deg) rotateZ(${o(h[2])}deg)`,b=p<0?`scale(${1+(1-g.scale)*p*n})`:`scale(${1-(1-g.scale)*p*n})`,y=p<0?1+(1-g.opacity)*p*n:1-(1-g.opacity)*p*n,E=`translate3d(${v}) ${w} ${b}`;if(f&&g.shadow||!f){let e=a.querySelector(".swiper-slide-shadow");if(!e&&g.shadow&&(e=fe("creative",a)),e){const t=r.shadowPerProgress?c*(1/r.limitProgress):c;e.style.opacity=Math.min(Math.max(Math.abs(t),0),1)}}const x=me(0,a);x.style.transform=E,x.style.opacity=y,g.origin&&(x.style.transformOrigin=g.origin)}},setTransition:e=>{const s=t.slides.map((e=>h(e)));s.forEach((t=>{t.style.transitionDuration=`${e}ms`,t.querySelectorAll(".swiper-slide-shadow").forEach((t=>{t.style.transitionDuration=`${e}ms`}))})),he({swiper:t,duration:e,transformElements:s,allSlides:!0})},perspective:()=>t.params.creativeEffect.perspective,overwriteParams:()=>({watchSlidesProgress:!0,virtualTranslate:!t.params.cssMode})})},function(e){let{swiper:t,extendParams:s,on:a}=e;s({cardsEffect:{slideShadows:!0,rotate:!0,perSlideRotate:2,perSlideOffset:8}}),ue({effect:"cards",swiper:t,on:a,setTranslate:()=>{const{slides:e,activeIndex:s,rtlTranslate:a}=t,i=t.params.cardsEffect,{startTranslate:r,isTouched:n}=t.touchEventsData,l=a?-t.translate:t.translate;for(let o=0;o<e.length;o+=1){const d=e[o],c=d.progress,p=Math.min(Math.max(c,-4),4);let u=d.swiperSlideOffset;t.params.centeredSlides&&!t.params.cssMode&&(t.wrapperEl.style.transform=`translateX(${t.minTranslate()}px)`),t.params.centeredSlides&&t.params.cssMode&&(u-=e[0].swiperSlideOffset);let m=t.params.cssMode?-u-t.translate:-u,h=0;const f=-100*Math.abs(p);let g=1,v=-i.perSlideRotate*p,w=i.perSlideOffset-.75*Math.abs(p);const b=t.virtual&&t.params.virtual.enabled?t.virtual.from+o:o,y=(b===s||b===s-1)&&p>0&&p<1&&(n||t.params.cssMode)&&l<r,E=(b===s||b===s+1)&&p<0&&p>-1&&(n||t.params.cssMode)&&l>r;if(y||E){const e=(1-Math.abs((Math.abs(p)-.5)/.5))**.5;v+=-28*p*e,g+=-.5*e,w+=96*e,h=-25*e*Math.abs(p)+"%"}if(m=p<0?`calc(${m}px ${a?"-":"+"} (${w*Math.abs(p)}%))`:p>0?`calc(${m}px ${a?"-":"+"} (-${w*Math.abs(p)}%))`:`${m}px`,!t.isHorizontal()){const e=h;h=m,m=e}const x=p<0?""+(1+(1-g)*p):""+(1-(1-g)*p),S=`\n        translate3d(${m}, ${h}, ${f}px)\n        rotateZ(${i.rotate?a?-v:v:0}deg)\n        scale(${x})\n      `;if(i.slideShadows){let e=d.querySelector(".swiper-slide-shadow");e||(e=fe("cards",d)),e&&(e.style.opacity=Math.min(Math.max((Math.abs(p)-.5)/.5,0),1))}d.style.zIndex=-Math.abs(Math.round(c))+e.length;me(0,d).style.transform=S}},setTransition:e=>{const s=t.slides.map((e=>h(e)));s.forEach((t=>{t.style.transitionDuration=`${e}ms`,t.querySelectorAll(".swiper-slide-shadow").forEach((t=>{t.style.transitionDuration=`${e}ms`}))})),he({swiper:t,duration:e,transformElements:s})},perspective:()=>!0,overwriteParams:()=>({watchSlidesProgress:!0,virtualTranslate:!t.params.cssMode})})}];return ie.use(ge),ie}();
//# sourceMappingURL=swiper-bundle.min.js.map