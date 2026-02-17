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


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var otpDto = /** @class */ (function () {
    function otpDto() {
    }
    return otpDto;
}());
var otpReturnType = /** @class */ (function () {
    function otpReturnType() {
    }
    return otpReturnType;
}());
var registerDto = /** @class */ (function () {
    function registerDto() {
    }
    return registerDto;
}());
var registerReturnType = /** @class */ (function () {
    function registerReturnType() {
    }
    return registerReturnType;
}());
var resendOtpDto = /** @class */ (function () {
    function resendOtpDto() {
    }
    return resendOtpDto;
}());
var resendOtpReturnType = /** @class */ (function () {
    function resendOtpReturnType() {
    }
    return resendOtpReturnType;
}());
/** INTEGRATION */
var integrationModel = /** @class */ (function () {
    function integrationModel() {
    }
    return integrationModel;
}());
var integrationSortingPagingInfo = /** @class */ (function (_super) {
    __extends(integrationSortingPagingInfo, _super);
    function integrationSortingPagingInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return integrationSortingPagingInfo;
}(sortingPagingInfoModel));
var integrationDetailSortingPagingInfo = /** @class */ (function (_super) {
    __extends(integrationDetailSortingPagingInfo, _super);
    function integrationDetailSortingPagingInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return integrationDetailSortingPagingInfo;
}(sortingPagingInfoModel));
var integrationListViewModel = /** @class */ (function () {
    function integrationListViewModel() {
    }
    return integrationListViewModel;
}());
var getIntegrationListReturnType = /** @class */ (function (_super) {
    __extends(getIntegrationListReturnType, _super);
    function getIntegrationListReturnType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return getIntegrationListReturnType;
}(integrationModel));
var getIntegrationDto = /** @class */ (function () {
    function getIntegrationDto() {
    }
    return getIntegrationDto;
}());
var getIntegrationDetailScreenConstantReturnType = /** @class */ (function () {
    function getIntegrationDetailScreenConstantReturnType() {
    }
    return getIntegrationDetailScreenConstantReturnType;
}());
var saveIntegrationDto = /** @class */ (function (_super) {
    __extends(saveIntegrationDto, _super);
    function saveIntegrationDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return saveIntegrationDto;
}(integrationModel));
var serviceProviderListViewModel = /** @class */ (function (_super) {
    __extends(serviceProviderListViewModel, _super);
    function serviceProviderListViewModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return serviceProviderListViewModel;
}(getIntegrationListReturnType));
var downloadFileDto = /** @class */ (function () {
    function downloadFileDto() {
    }
    return downloadFileDto;
}());
var downloadInvoiceReturnType = /** @class */ (function () {
    function downloadInvoiceReturnType() {
    }
    return downloadInvoiceReturnType;
}());
/** CARD */
var cardSortingPagingInfo = /** @class */ (function (_super) {
    __extends(cardSortingPagingInfo, _super);
    function cardSortingPagingInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return cardSortingPagingInfo;
}(sortingPagingInfoModel));
var cardDetailSortingPagingInfo = /** @class */ (function (_super) {
    __extends(cardDetailSortingPagingInfo, _super);
    function cardDetailSortingPagingInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return cardDetailSortingPagingInfo;
}(sortingPagingInfoModel));
var cardListViewModel = /** @class */ (function () {
    function cardListViewModel() {
    }
    return cardListViewModel;
}());
var getCardListReturnType = /** @class */ (function (_super) {
    __extends(getCardListReturnType, _super);
    function getCardListReturnType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return getCardListReturnType;
}(integrationModel));
var getCardDto = /** @class */ (function () {
    function getCardDto() {
    }
    return getCardDto;
}());
var getCardDetailScreenConstantReturnType = /** @class */ (function () {
    function getCardDetailScreenConstantReturnType() {
    }
    return getCardDetailScreenConstantReturnType;
}());
var saveCardDto = /** @class */ (function (_super) {
    __extends(saveCardDto, _super);
    function saveCardDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return saveCardDto;
}(integrationModel));
/** STRUCTURE */
var structureModel = /** @class */ (function () {
    function structureModel() {
    }
    return structureModel;
}());
var structure_StructureFieldModel = /** @class */ (function () {
    function structure_StructureFieldModel() {
    }
    return structure_StructureFieldModel;
}());
var addressModel = /** @class */ (function () {
    function addressModel() {
    }
    return addressModel;
}());
var socialNetwork = /** @class */ (function () {
    function socialNetwork() {
    }
    return socialNetwork;
}());
var contact = /** @class */ (function () {
    function contact() {
    }
    return contact;
}());
var profilePicture = /** @class */ (function () {
    function profilePicture() {
    }
    return profilePicture;
}());
var coverPicture = /** @class */ (function () {
    function coverPicture() {
    }
    return coverPicture;
}());
var structureType = /** @class */ (function () {
    function structureType() {
    }
    return structureType;
}());
var cardDetailScreenConstantReturnType = /** @class */ (function () {
    function cardDetailScreenConstantReturnType() {
    }
    return cardDetailScreenConstantReturnType;
}());
var structureFieldModel = /** @class */ (function () {
    function structureFieldModel() {
    }
    return structureFieldModel;
}());
/** END STRUCTURE*/

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
        var self = this;
        var deferred = this.q.defer();
        this.http({
            method: method,
            url: isExternal ? url : self.globalVariableFactory.serverUrl + url,
            dataType: 'json',
            contentType: 'application/json',
            timeout: 600000,
            data: data,
            headers: {
                'Content-Type': 'application/json' // <-- Important, since you are posting JSON
            }
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
        var self = this;
        var deferred = this.q.defer();
        this.http({
            method: method,
            url: self.globalVariableFactory.serverUrl + url,
            dataType: 'json',
            contentType: 'application/json',
            timeout: 600000,
            cache: false,
            data: data,
            responseType: 'arraybuffer',
            headers: {
                'Content-Type': 'application/json' // <-- Important, since you are posting JSON
            }
        })
            .then(function (response) {
            deferred.resolve(response);
        })
            .catch(function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    genericWebConnectionService.prototype.loadDownloadRequestDirect = function (method, url, data) {
        var self = this;
        var deferred = this.q.defer();
        this.http({
            method: method,
            url: url,
            dataType: 'json',
            contentType: 'application/json',
            timeout: 600000,
            cache: false,
            data: data,
            responseType: 'arraybuffer',
            headers: {
                'Content-Type': 'application/json' // <-- Important, since you are posting JSON
            }
        })
            .then(function (response) {
            // Check if the response has a content-disposition header indicating a file attachment
            var contentDisposition = response.headers('Content-Disposition');
            var contentType = response.headers('Content-Type');
            console.log(contentType);
            console.log(contentDisposition);
            if (contentDisposition && contentDisposition.indexOf('attachment') !== -1) {
                // Extract filename from Content-Disposition header
                //const filename = contentDisposition.split('filename=')[1].replace(/"/g, '');
                var filename = '';
                // Try to extract filename from Content-Disposition header
                var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                var matches = filenameRegex.exec(contentDisposition);
                if (matches != null && matches[1]) {
                    filename = matches[1].replace(/['"]/g, ''); // Remove quotes if any
                }
                // Check if the filename*=UTF-8 is present and properly decode it
                var utf8FilenameRegex = /filename\*\=UTF-8''(.*)/;
                var utf8Matches = utf8FilenameRegex.exec(contentDisposition);
                if (utf8Matches != null && utf8Matches[1]) {
                    filename = decodeURIComponent(utf8Matches[1]);
                }
                // Create a Blob from the response data
                var blob = new Blob([response.data], { type: contentType });
                var url_1 = window.URL.createObjectURL(blob);
                // Create a link element to trigger the download
                var a = document.createElement('a');
                a.href = url_1;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url_1);
                deferred.resolve('File downloaded');
            }
            else {
                // If not a file, resolve normally
                deferred.resolve(response.data);
            }
        })
            .catch(function (err) {
            deferred.reject(err);
        })
            .finally(function () {
            // Optional: Any cleanup tasks can be added here
        });
        return deferred.promise;
    };
    return genericWebConnectionService;
}());

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
    CUSTOM_VARIABLES.ROLES = "roles";
    CUSTOM_VARIABLES.DOMAINKEY = "Domain";
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
                    _customErrorMessage = _fieldLabel + " is mandatory";
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
            customErrorMessage = fieldLabel + " is mandatory";
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
            _pictureData.name = response.result.name;
            _pictureData.idDocument = response.result.idDocument;
            _pictureData.url = response.result.url;
            if (isArray) {
                objectContainer.push(_pictureData);
            }
            else {
                objectContainer.idDocument = _pictureData.idDocument;
                objectContainer.name = _pictureData.name;
                objectContainer.url = _pictureData.url;
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
//baseModule.config(function ($interpolateProvider) {
//    $interpolateProvider.startSymbol('[[').endSymbol(']]');
//});
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

//requestFullscreenAndLockOrientation();
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
        console.log('log');
        self.commonController.logout();
    };
    return headerController;
}());
commonModule.controller("headerController", ["$scope",
    "commonWebService",
    headerController
]);

var authenticationWebService = /** @class */ (function () {
    function authenticationWebService(genericWebConnectionService, globalVariableFactory) {
        this.genericWebConnectionService = genericWebConnectionService;
        this.globalVariableFactory = globalVariableFactory;
    }
    authenticationWebService.prototype.login = function (loginDto) {
        var url = '/api/authenticate';
        var data = loginDto;
        return this.genericWebConnectionService.postRequest(url, data);
    };
    authenticationWebService.prototype.validateOtp = function (otpDto) {
        var url = '/api/validate-otp';
        var data = otpDto;
        return this.genericWebConnectionService.postRequest(url, data);
    };
    authenticationWebService.prototype.resendOtp = function (otpDto) {
        var url = '/api/resend-otp';
        var data = otpDto;
        return this.genericWebConnectionService.postRequest(url, data);
    };
    authenticationWebService.prototype.register = function (loginDto) {
        var url = '/api/register';
        var data = loginDto;
        return this.genericWebConnectionService.postRequest(url, data);
    };
    authenticationWebService.prototype.forgotPassword = function (loginDto) {
        var url = '/api/forgot-password';
        var data = loginDto;
        return this.genericWebConnectionService.postRequest(url, data);
    };
    authenticationWebService.prototype.forgotPasswordWithOtp = function (loginDto) {
        var url = '/api/forgot-password-with-otp';
        var data = loginDto;
        return this.genericWebConnectionService.postRequest(url, data);
    };
    return authenticationWebService;
}());

var authenticationModule = angular.module("authenticationModule", ['purplefox.numeric']);
authenticationModule.service("authenticationWebService", ["genericWebConnectionService",
    "globalVariableFactory",
    authenticationWebService]);
baseModule.requires.push("authenticationModule");

var loginController = /** @class */ (function () {
    function loginController($scope, $parse, toaster, authenticationWebService) {
        this.$parse = $parse;
        this.toaster = toaster;
        this.preloadedData = {};
        this.formName = 'loginForm';
        this.groupName = 'loginForm';
        this.groupNameVerifyOtp = 'verifyOtpForm';
        this.loginModel = {
            email: null,
            password: null,
            otp: null
        };
        this.step = 1;
        this.showPassword = false;
        this.otpResetInteval = 60;
        this.otpTimer = 60;
        this.isResendOtpEnabled = false;
        var self = this;
        $scope.controller = this;
        this.authenticationWebService = authenticationWebService;
        this.scope = $scope;
        this.baseController = this.scope.baseController;
        this.initVariables();
    }
    loginController.prototype.initVariables = function () {
        var self = this;
        this.baseController = this.scope.baseController;
    };
    loginController.prototype.setInfo = function () {
        var self = this;
        self.initialize();
    };
    loginController.prototype.initialize = function () {
        var self = this;
        if (self.formValidator != null) {
            self.formValidator.deRegister();
        }
        self.formValidator = new formValidator(this.$parse, this.toaster, self.scope, self.formName);
        self.formValidator.registerValidationForMandatory(self.scope, 'email', 'Email');
        self.formValidator.registerValidationForMandatory(self.scope, 'password', 'Password');
        self.formValidator.registerValidationForMandatory(self.scope, 'otp', 'OTP');
        self.formValidator.registerGroupValidation(self.groupName, ['email', 'password']);
        self.formValidator.registerGroupValidation(self.groupNameVerifyOtp, ['otp']);
    };
    loginController.prototype.validateForGroups = function (groupName) {
        if (groupName === void 0) { groupName = null; }
        var self = this;
        var groupToValidate = groupName != null ? groupName : self.groupName;
        var isValid = self.formValidator.validateGroup(groupToValidate, false, true);
        var errorMessages = errorMessages = self.formValidator.getAllValidationMessagesForGroup(groupToValidate);
        if (errorMessages.length > 0) {
            self.baseController.toaster.pop({
                type: 'error',
                body: errorMessages.join('</br>'),
                bodyOutputType: 'trustedHtml'
            });
        }
        return isValid;
    };
    loginController.prototype.login = function () {
        var self = this;
        if (!self.validateForGroups()) {
            return;
        }
        self.baseController.showLoading();
        var _loginDto = new loginDto();
        _loginDto.email = self.loginModel.email;
        _loginDto.password = self.loginModel.password;
        self.authenticationWebService.login(_loginDto)
            .then(function (response) {
            if (response.status == STATUS_MESSAGE.SUCCESS) {
                if (response.result.result == true) {
                    var user = new userLoginModel();
                    user.firstname = response.result.firstname;
                    user.lastname = response.result.lastname;
                    user.username = response.result.username;
                    self.baseController.$window.localStorage.setItem(CUSTOM_VARIABLES.AUTHKEY, response.result.token);
                    self.baseController.$window.localStorage.setItem(CUSTOM_VARIABLES.ROLES, angular.toJson(response.result.roles));
                    self.baseController.$window.localStorage.setItem(CUSTOM_VARIABLES.CURRENT_USER, angular.toJson(user));
                    //self.baseController.$window.sessionStorage.setItem(CUSTOM_VARIABLES.PERMISSIONKEY, angular.toJson(response.result.permissions));
                    window.location.href = "/integration-list/";
                }
                else if (response.result.result == false && response.result.requireEmailVerification) {
                    self.baseController.showToast(TOASTER_TYPE.SUCCESS, "Email verification required");
                    self.step = 2;
                    self.startOtpTimer();
                }
                else {
                    self.baseController.showMessage(response.errorMessage, "", ALERT_MESSAGE_TYPE.ERROR);
                }
            }
            else {
                self.baseController.showMessage(response.errorMessage, "", ALERT_MESSAGE_TYPE.ERROR);
            }
        }).catch(function (errorMsg) {
            self.baseController.showMessage(errorMsg, "An Error Has Occured On Server, Please Contact Server Admin", ALERT_MESSAGE_TYPE.ERROR);
        }).finally(function () {
            self.baseController.hideLoading();
        });
    };
    loginController.prototype.startOtpTimer = function () {
        var self = this;
        self.isResendOtpEnabled = false;
        setTimeout(function () {
            self.otpTimer = self.otpResetInteval;
            document.getElementById("otpTimer").innerHTML = self.formatSecondsToMMSS(self.otpTimer);
            self.isResendOtpEnabled = true;
            clearInterval(self.otpTimerInterval);
            self.scope.$apply();
        }, self.otpResetInteval * 1000);
        self.otpTimerInterval = setInterval(function () {
            document.getElementById("otpTimer").innerHTML = self.formatSecondsToMMSS(self.otpTimer);
            self.otpTimer--;
        }, 1000);
    };
    loginController.prototype.formatSecondsToMMSS = function (totalSeconds) {
        var minutes = (Math.floor(totalSeconds / 60)) + "";
        var seconds = (totalSeconds % 60) + "";
        return (minutes).padStart(2, '0') + ":" + (seconds).padStart(2, '0');
    };
    loginController.prototype.verifyOtp = function () {
        var self = this;
        if (self.step == 2 && !self.validateForGroups(self.groupNameVerifyOtp)) {
            return;
        }
        self.baseController.showLoading();
        var _loginDto = new loginDto();
        _loginDto.email = self.loginModel.email;
        _loginDto.otp = self.loginModel.otp;
        self.authenticationWebService.validateOtp(_loginDto)
            .then(function (response) {
            if (response.status == STATUS_MESSAGE.SUCCESS) {
                if (response.result.result) {
                    self.baseController.showToast(TOASTER_TYPE.SUCCESS, "Otp validated, please login now");
                    self.step = 1;
                }
                else {
                    self.baseController.showToast(TOASTER_TYPE.WARNING, "Otp could not be validated, please try again");
                }
            }
            else {
                self.baseController.showMessage(response.errorMessage, "", ALERT_MESSAGE_TYPE.ERROR);
            }
        }).catch(function (errorMsg) {
            self.baseController.showMessage(errorMsg, "An Error Has Occured On Server, Please Contact Server Admin", ALERT_MESSAGE_TYPE.ERROR);
        }).finally(function () {
            self.baseController.hideLoading();
        });
    };
    loginController.prototype.togglePassword = function () {
        var self = this;
        self.showPassword = !self.showPassword;
    };
    loginController.prototype.resendOtp = function () {
        var self = this;
        console.log('resend');
        var _loginDto = new loginDto();
        _loginDto.email = self.loginModel.email;
        self.baseController.showLoading();
        self.authenticationWebService.resendOtp(_loginDto)
            .then(function (response) {
            if (response.status == STATUS_MESSAGE.SUCCESS) {
                if (response.result.result) {
                    self.baseController.showToast(TOASTER_TYPE.SUCCESS, "Otp resent, please check your email");
                    self.startOtpTimer();
                }
                else {
                    self.baseController.showToast(TOASTER_TYPE.WARNING, "Otp could not be resent, please try again");
                }
            }
            else {
                self.baseController.showMessage(response.errorMessage, "", ALERT_MESSAGE_TYPE.ERROR);
            }
        }).catch(function (errorMsg) {
            self.baseController.showMessage(errorMsg, "An Error Has Occured On Server, Please Contact Server Admin", ALERT_MESSAGE_TYPE.ERROR);
        }).finally(function () {
            self.baseController.hideLoading();
        });
    };
    return loginController;
}());
authenticationModule.controller("loginController", ["$scope",
    "$parse",
    "toaster",
    "authenticationWebService",
    loginController
]);

var signupController = /** @class */ (function () {
    function signupController($scope, $parse, toaster, authenticationWebService) {
        this.$parse = $parse;
        this.toaster = toaster;
        this.preloadedData = {};
        this.formName = 'signupForm';
        this.groupName = 'signupForm';
        this.groupNameVerifyOtp = 'verifyOtpForm';
        this.loginModel = {
            email: null,
            password: null,
            passwordVerify: null,
            otp: null
        };
        this.step = 1;
        this.showPassword = false;
        this.otpResetInteval = 60;
        this.otpTimer = 60;
        this.isResendOtpEnabled = false;
        var self = this;
        $scope.controller = this;
        this.authenticationWebService = authenticationWebService;
        this.scope = $scope;
        this.baseController = this.scope.baseController;
        this.initVariables();
    }
    signupController.prototype.initVariables = function () {
        var self = this;
        this.baseController = this.scope.baseController;
    };
    signupController.prototype.setInfo = function () {
        var self = this;
        self.initialize();
    };
    signupController.prototype.initialize = function () {
        var self = this;
        if (self.formValidator != null) {
            self.formValidator.deRegister();
        }
        self.formValidator = new formValidator(this.$parse, this.toaster, self.scope, self.formName);
        self.formValidator.registerValidationForMandatory(self.scope, 'email', 'Email');
        self.formValidator.registerValidationForMandatory(self.scope, 'password', 'Password');
        self.formValidator.registerValidationForMandatory(self.scope, 'passwordVerify', 'Verify Password');
        self.formValidator.registerValidationForMandatory(self.scope, 'otp', 'OTP');
        self.formValidator.registerValidation('passwordMatch', "Password does not match", function () {
            if (self.loginModel.password != self.loginModel.passwordVerify) {
                return false;
            }
            return true;
        });
        self.formValidator.registerGroupValidation(self.groupName, ['email', 'password', 'passwordVerify', 'passwordMatch']);
        self.formValidator.registerGroupValidation(self.groupNameVerifyOtp, ['otp']);
    };
    signupController.prototype.validateForGroups = function (groupName) {
        if (groupName === void 0) { groupName = null; }
        var self = this;
        var groupToValidate = groupName != null ? groupName : self.groupName;
        var isValid = self.formValidator.validateGroup(groupToValidate, false, true);
        var errorMessages = errorMessages = self.formValidator.getAllValidationMessagesForGroup(groupToValidate);
        if (errorMessages.length > 0) {
            self.baseController.toaster.pop({
                type: 'error',
                body: errorMessages.join('</br>'),
                bodyOutputType: 'trustedHtml'
            });
        }
        return isValid;
    };
    signupController.prototype.register = function () {
        var self = this;
        if (self.step == 1 && !self.validateForGroups(self.groupName)) {
            return;
        }
        self.baseController.showLoading();
        var _loginDto = new loginDto();
        _loginDto.email = self.loginModel.email;
        _loginDto.password = self.loginModel.password;
        self.authenticationWebService.register(_loginDto)
            .then(function (response) {
            if (response.status == STATUS_MESSAGE.SUCCESS) {
                if (response.result.result) {
                    self.step = 2;
                    self.startOtpTimer();
                    self.baseController.showToast(TOASTER_TYPE.SUCCESS, "Registration successful");
                }
            }
            else {
                self.baseController.showMessage(response.errorMessage, "", ALERT_MESSAGE_TYPE.ERROR);
            }
        }).catch(function (errorMsg) {
            self.baseController.showMessage(errorMsg, "An Error Has Occured On Server, Please Contact Server Admin", ALERT_MESSAGE_TYPE.ERROR);
        }).finally(function () {
            self.baseController.hideLoading();
        });
    };
    signupController.prototype.startOtpTimer = function () {
        var self = this;
        self.isResendOtpEnabled = false;
        setTimeout(function () {
            self.otpTimer = self.otpResetInteval;
            document.getElementById("otpTimer").innerHTML = self.formatSecondsToMMSS(self.otpTimer);
            self.isResendOtpEnabled = true;
            clearInterval(self.otpTimerInterval);
            self.scope.$apply();
        }, self.otpResetInteval * 1000);
        self.otpTimerInterval = setInterval(function () {
            document.getElementById("otpTimer").innerHTML = self.formatSecondsToMMSS(self.otpTimer);
            self.otpTimer--;
        }, 1000);
    };
    signupController.prototype.formatSecondsToMMSS = function (totalSeconds) {
        var minutes = (Math.floor(totalSeconds / 60)) + "";
        var seconds = (totalSeconds % 60) + "";
        return (minutes).padStart(2, '0') + ":" + (seconds).padStart(2, '0');
    };
    signupController.prototype.verifyOtp = function () {
        var self = this;
        if (self.step == 2 && !self.validateForGroups(self.groupNameVerifyOtp)) {
            return;
        }
        self.baseController.showLoading();
        var _loginDto = new loginDto();
        _loginDto.email = self.loginModel.email;
        _loginDto.otp = self.loginModel.otp;
        self.authenticationWebService.validateOtp(_loginDto)
            .then(function (response) {
            if (response.status == STATUS_MESSAGE.SUCCESS) {
                if (response.result.result) {
                    self.baseController.showToast(TOASTER_TYPE.SUCCESS, "Otp validated, please login to continue");
                    window.location.href = "/login";
                }
                else {
                    self.baseController.showToast(TOASTER_TYPE.WARNING, "Otp could not be validated, please try again");
                }
            }
            else {
                self.baseController.showMessage(response.errorMessage, "", ALERT_MESSAGE_TYPE.ERROR);
            }
        }).catch(function (errorMsg) {
            self.baseController.showMessage(errorMsg, "An Error Has Occured On Server, Please Contact Server Admin", ALERT_MESSAGE_TYPE.ERROR);
        }).finally(function () {
            self.baseController.hideLoading();
        });
    };
    signupController.prototype.togglePassword = function () {
        var self = this;
        self.showPassword = !self.showPassword;
    };
    signupController.prototype.resendOtp = function () {
        var self = this;
        console.log('resend');
        var _loginDto = new loginDto();
        _loginDto.email = self.loginModel.email;
        self.baseController.showLoading();
        self.authenticationWebService.resendOtp(_loginDto)
            .then(function (response) {
            if (response.status == STATUS_MESSAGE.SUCCESS) {
                if (response.result.result) {
                    self.baseController.showToast(TOASTER_TYPE.SUCCESS, "Otp resent, please check your email");
                    self.startOtpTimer();
                }
                else {
                    self.baseController.showToast(TOASTER_TYPE.WARNING, "Otp could not be resent, please try again");
                }
            }
            else {
                self.baseController.showMessage(response.errorMessage, "", ALERT_MESSAGE_TYPE.ERROR);
            }
        }).catch(function (errorMsg) {
            self.baseController.showMessage(errorMsg, "An Error Has Occured On Server, Please Contact Server Admin", ALERT_MESSAGE_TYPE.ERROR);
        }).finally(function () {
            self.baseController.hideLoading();
        });
    };
    return signupController;
}());
authenticationModule.controller("signupController", ["$scope",
    "$parse",
    "toaster",
    "authenticationWebService",
    signupController
]);

var forgotPasswordController = /** @class */ (function () {
    function forgotPasswordController($scope, $parse, toaster, authenticationWebService) {
        this.$parse = $parse;
        this.toaster = toaster;
        this.preloadedData = {};
        this.formName = 'forgotPasswordForm';
        this.groupName = 'forgotPasswordForm';
        this.groupNameVerifyOtp = 'verifyOtpForm';
        this.loginModel = {
            email: null,
            password: null,
            passwordVerify: null,
            otp: null
        };
        this.step = 1;
        this.showPassword = false;
        this.otpResetInteval = 60;
        this.otpTimer = 60;
        this.isResendOtpEnabled = false;
        var self = this;
        $scope.controller = this;
        this.authenticationWebService = authenticationWebService;
        this.scope = $scope;
        this.baseController = this.scope.baseController;
        this.initVariables();
    }
    forgotPasswordController.prototype.initVariables = function () {
        var self = this;
        this.baseController = this.scope.baseController;
    };
    forgotPasswordController.prototype.setInfo = function () {
        var self = this;
        self.initialize();
    };
    forgotPasswordController.prototype.initialize = function () {
        var self = this;
        if (self.formValidator != null) {
            self.formValidator.deRegister();
        }
        self.formValidator = new formValidator(this.$parse, this.toaster, self.scope, self.formName);
        self.formValidator.registerValidationForMandatory(self.scope, 'email', 'Email');
        self.formValidator.registerValidationForMandatory(self.scope, 'password', 'Password');
        self.formValidator.registerValidationForMandatory(self.scope, 'passwordVerify', 'Verify Password');
        self.formValidator.registerValidationForMandatory(self.scope, 'otp', 'OTP');
        self.formValidator.registerValidation('passwordMatch', "Password does not match", function () {
            if (self.loginModel.password != self.loginModel.passwordVerify) {
                return false;
            }
            return true;
        });
        self.formValidator.registerGroupValidation(self.groupName, ['email']);
        self.formValidator.registerGroupValidation(self.groupNameVerifyOtp, ['otp', 'password', 'passwordVerify', 'passwordMatch']);
    };
    forgotPasswordController.prototype.validateForGroups = function (groupName) {
        if (groupName === void 0) { groupName = null; }
        var self = this;
        var groupToValidate = groupName != null ? groupName : self.groupName;
        var isValid = self.formValidator.validateGroup(groupToValidate, false, true);
        var errorMessages = errorMessages = self.formValidator.getAllValidationMessagesForGroup(groupToValidate);
        if (errorMessages.length > 0) {
            self.baseController.toaster.pop({
                type: 'error',
                body: errorMessages.join('</br>'),
                bodyOutputType: 'trustedHtml'
            });
        }
        return isValid;
    };
    forgotPasswordController.prototype.forgotPassword = function () {
        var self = this;
        if (self.step == 1 && !self.validateForGroups(self.groupName)) {
            return;
        }
        self.baseController.showLoading();
        var _loginDto = new loginDto();
        _loginDto.email = self.loginModel.email;
        self.authenticationWebService.forgotPassword(_loginDto)
            .then(function (response) {
            if (response.status == STATUS_MESSAGE.SUCCESS) {
                if (response.result.result) {
                    self.step = 2;
                    self.startOtpTimer();
                    self.baseController.showToast(TOASTER_TYPE.SUCCESS, "OTP sent to your email");
                }
            }
            else {
                self.baseController.showMessage(response.errorMessage, "", ALERT_MESSAGE_TYPE.ERROR);
            }
        }).catch(function (errorMsg) {
            self.baseController.showMessage(errorMsg, "An Error Has Occured On Server, Please Contact Server Admin", ALERT_MESSAGE_TYPE.ERROR);
        }).finally(function () {
            self.baseController.hideLoading();
        });
    };
    forgotPasswordController.prototype.startOtpTimer = function () {
        var self = this;
        self.isResendOtpEnabled = false;
        setTimeout(function () {
            self.otpTimer = self.otpResetInteval;
            document.getElementById("otpTimer").innerHTML = self.formatSecondsToMMSS(self.otpTimer);
            self.isResendOtpEnabled = true;
            clearInterval(self.otpTimerInterval);
            self.scope.$apply();
        }, self.otpResetInteval * 1000);
        self.otpTimerInterval = setInterval(function () {
            document.getElementById("otpTimer").innerHTML = self.formatSecondsToMMSS(self.otpTimer);
            self.otpTimer--;
        }, 1000);
    };
    forgotPasswordController.prototype.formatSecondsToMMSS = function (totalSeconds) {
        var minutes = (Math.floor(totalSeconds / 60)) + "";
        var seconds = (totalSeconds % 60) + "";
        return (minutes).padStart(2, '0') + ":" + (seconds).padStart(2, '0');
    };
    forgotPasswordController.prototype.verifyOtp = function () {
        var self = this;
        if (self.step == 2 && !self.validateForGroups(self.groupNameVerifyOtp)) {
            return;
        }
        self.baseController.showLoading();
        var _loginDto = new loginDto();
        _loginDto.email = self.loginModel.email;
        _loginDto.password = self.loginModel.password;
        _loginDto.otp = self.loginModel.otp;
        self.authenticationWebService.forgotPasswordWithOtp(_loginDto)
            .then(function (response) {
            if (response.status == STATUS_MESSAGE.SUCCESS) {
                if (response.result.result) {
                    self.baseController.showToast(TOASTER_TYPE.SUCCESS, "Otp validated, please login to continue");
                    window.location.href = "/login";
                }
                else {
                    self.baseController.showToast(TOASTER_TYPE.WARNING, "Otp could not be validated, please try again");
                }
            }
            else {
                self.baseController.showMessage(response.errorMessage, "", ALERT_MESSAGE_TYPE.ERROR);
            }
        }).catch(function (errorMsg) {
            self.baseController.showMessage(errorMsg, "An Error Has Occured On Server, Please Contact Server Admin", ALERT_MESSAGE_TYPE.ERROR);
        }).finally(function () {
            self.baseController.hideLoading();
        });
    };
    forgotPasswordController.prototype.togglePassword = function () {
        var self = this;
        self.showPassword = !self.showPassword;
    };
    forgotPasswordController.prototype.resendOtp = function () {
        var self = this;
        console.log('resend');
        var _loginDto = new loginDto();
        _loginDto.email = self.loginModel.email;
        self.baseController.showLoading();
        self.authenticationWebService.resendOtp(_loginDto)
            .then(function (response) {
            if (response.status == STATUS_MESSAGE.SUCCESS) {
                if (response.result.result) {
                    self.baseController.showToast(TOASTER_TYPE.SUCCESS, "Otp resent, please check your email");
                    self.startOtpTimer();
                }
                else {
                    self.baseController.showToast(TOASTER_TYPE.WARNING, "Otp could not be resent, please try again");
                }
            }
            else {
                self.baseController.showMessage(response.errorMessage, "", ALERT_MESSAGE_TYPE.ERROR);
            }
        }).catch(function (errorMsg) {
            self.baseController.showMessage(errorMsg, "An Error Has Occured On Server, Please Contact Server Admin", ALERT_MESSAGE_TYPE.ERROR);
        }).finally(function () {
            self.baseController.hideLoading();
        });
    };
    return forgotPasswordController;
}());
authenticationModule.controller("forgotPasswordController", ["$scope",
    "$parse",
    "toaster",
    "authenticationWebService",
    forgotPasswordController
]);

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

var integrationModule = angular.module("integrationModule", ['purplefox.numeric', 'ngMap']);
integrationModule.service("integrationWebService", ["genericWebConnectionService",
    "globalVariableFactory",
    integrationWebService]);
baseModule.requires.push("integrationModule");

var integrationListController = /** @class */ (function () {
    function integrationListController($scope, integrationWebService) {
        var self = this;
        $scope.controller = this;
        this.scope = $scope;
        this.baseController = this.scope.baseController;
        this.integrationWebService = integrationWebService;
        this.initVariables();
    }
    integrationListController.prototype.initVariables = function () {
        var self = this;
        self.baseController = this.scope.baseController;
    };
    integrationListController.prototype.setInfo = function () {
        var self = this;
        self.intializePagingInfo();
        self.gridLoad();
    };
    integrationListController.prototype.intializePagingInfo = function () {
        var self = this;
        self.paging = new integrationSortingPagingInfo();
        self.paging.currentPageIndex = 1;
        self.paging.pageSize = 10;
        self.paging.pageCount = 0;
        self.paging.sortField = "";
        self.paging.sortColumn = "";
        self.paging.sortByDesc = false;
    };
    integrationListController.prototype.gridLoad = function () {
        var self = this;
        var sorting = self.baseController.cloneObject(self.paging);
        sorting.currentPageIndex--;
        self.baseController.showLoading();
        self.integrationWebService.getIntegrationList(sorting)
            .then(function (response) {
            if (response.status == STATUS_MESSAGE.SUCCESS) {
                self.paging.pageCount = response.result.totalCount;
                self.list = self.formatList(response.result.entityList);
                self.onGridLoaded();
            }
            else {
                self.baseController.showMessage(response.errorMessage, "", ALERT_MESSAGE_TYPE.ERROR, false, null, true);
            }
        })
            .catch(function (error) {
            self.baseController.hideLoading();
            self.baseController.showMessage("An Error Has Occured On Server, Please Contact Server Admin", error, ALERT_MESSAGE_TYPE.ERROR, false, null, true);
        })
            .finally(function () {
            self.baseController.hideLoading();
        });
    };
    integrationListController.prototype.onGridLoaded = function () {
    };
    integrationListController.prototype.formatList = function (contactFormList) {
        var self = this;
        var _integrationList = [];
        Enumerable.From(contactFormList).ForEach(function (integration) {
            var _formatted = self.baseController.cloneObject(integration);
            _integrationList.push(_formatted);
        });
        return _integrationList;
    };
    integrationListController.prototype.onEditClick = function (item) {
        var self = this;
        //window.location.href = "/service-provider-detail/" + item.id + "/" + SCREEN_MODE.VIEW;
    };
    integrationListController.prototype.viewIntegration = function (integration) {
        var self = this;
        window.location.href = "/integration-detail/?it=" + integration.idIntegrationType;
    };
    return integrationListController;
}());
integrationModule.controller("integrationListController", ["$scope",
    "integrationWebService",
    integrationListController
]);

var integrationDetailListController = /** @class */ (function () {
    function integrationDetailListController($scope, integrationWebService) {
        var self = this;
        $scope.controller = this;
        this.scope = $scope;
        this.baseController = this.scope.baseController;
        this.integrationWebService = integrationWebService;
        this.initVariables();
    }
    integrationDetailListController.prototype.initVariables = function () {
        var self = this;
        self.baseController = this.scope.baseController;
    };
    integrationDetailListController.prototype.setInfo = function (idIntegrationType) {
        var self = this;
        self.idIntegrationType = idIntegrationType;
        self.intializePagingInfo();
        self.gridLoad();
    };
    integrationDetailListController.prototype.intializePagingInfo = function () {
        var self = this;
        self.paging = new integrationDetailSortingPagingInfo();
        self.resetPagingInfo();
        self.paging.sortByDesc = false;
    };
    integrationDetailListController.prototype.resetPagingInfo = function () {
        var self = this;
        self.paging.currentPageIndex = 1;
        self.paging.pageSize = 10;
        self.paging.pageCount = 0;
        self.paging.sortField = "";
        self.paging.sortColumn = "";
        self.paging.idIntegrationType = self.idIntegrationType;
    };
    integrationDetailListController.prototype.gridLoad = function () {
        var self = this;
        var sorting = self.baseController.cloneObject(self.paging);
        sorting.currentPageIndex--;
        self.baseController.showLoading();
        self.integrationWebService.getIntegrationDetailList(sorting)
            .then(function (response) {
            if (response.status == STATUS_MESSAGE.SUCCESS) {
                self.paging.pageCount = response.result.totalCount;
                self.list = self.formatList(response.result.entityList);
                self.onGridLoaded();
            }
            else {
                self.baseController.showMessage(response.errorMessage, "", ALERT_MESSAGE_TYPE.ERROR, false, null, true);
            }
        })
            .catch(function (error) {
            self.baseController.hideLoading();
            self.baseController.showMessage("An Error Has Occured On Server, Please Contact Server Admin", error, ALERT_MESSAGE_TYPE.ERROR, false, null, true);
        })
            .finally(function () {
            self.baseController.hideLoading();
        });
    };
    integrationDetailListController.prototype.onGridLoaded = function () {
    };
    integrationDetailListController.prototype.formatList = function (contactFormList) {
        var self = this;
        var _integrationList = [];
        Enumerable.From(contactFormList).ForEach(function (integration) {
            var _formatted = self.baseController.cloneObject(integration);
            _integrationList.push(_formatted);
        });
        return _integrationList;
    };
    integrationDetailListController.prototype.loadMore = function () {
        var self = this;
        self.paging.currentPageIndex++;
        self.gridLoad();
    };
    integrationDetailListController.prototype.sortBy = function () {
        var self = this;
        self.paging.sortByDesc = !self.paging.sortByDesc;
        self.resetPagingInfo();
        self.gridLoad();
    };
    integrationDetailListController.prototype.search = function () {
        var self = this;
        self.resetPagingInfo();
        self.gridLoad();
    };
    integrationDetailListController.prototype.onActionClick = function (action) {
        var self = this;
        if (action.idActionType == "a639a43a-6f0a-4fca-a06b-8ae15c4bd386") { // direct url
            window.open(action.url);
        }
        else if (action.idActionType == "6226cf21-2511-4c16-a7ac-7f790d242465") { //download
            self.downloadFile(action.url);
        }
    };
    integrationDetailListController.prototype.downloadFile = function (url) {
        var self = this;
        var fileArray = self.integrationWebService.genericWebConnectionService.loadDownloadRequestDirect("GET", url, {});
    };
    return integrationDetailListController;
}());
integrationModule.controller("integrationDetailListController", ["$scope",
    "integrationWebService",
    integrationDetailListController
]);

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var integrationDetailController = /** @class */ (function () {
    function integrationDetailController($scope, $parse, toaster, integrationDetailWebService) {
        this.$parse = $parse;
        this.toaster = toaster;
        this.previsualizeUrl = '';
        this.preloadedData = {};
        this.childControllers = [];
        this.formName = 'integrationDetailForm';
        this.currentState = integrationDetailTab.BASIC_INFO;
        this.integrationDetailTab = integrationDetailTab;
        var self = this;
        $scope.controller = this;
        this.integrationDetailWebService = integrationDetailWebService;
        this.scope = $scope;
        this.baseController = this.scope.baseController;
        this.initVariables();
        this.registerValidations();
    }
    Object.defineProperty(integrationDetailController.prototype, "screenMode", {
        get: function () {
            return this.screenModeManager.currentMode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(integrationDetailController.prototype, "integrationDetail", {
        get: function () {
            return this.screenModeManager.entity;
        },
        enumerable: true,
        configurable: true
    });
    integrationDetailController.prototype.registerIntegrationDetailBasicInfoController = function (integrationDetailBasicInfoController) {
        this.integrationDetailBasicInfoController = integrationDetailBasicInfoController;
        this.childControllers.push(integrationDetailBasicInfoController);
    };
    Object.defineProperty(integrationDetailController.prototype, "isNew", {
        get: function () {
            var self = this;
            return self.baseController.isNullOrUndefined(self.id);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(integrationDetailController.prototype, "isEditable", {
        get: function () {
            var self = this;
            if (!self.baseController.commonController.hasEditPermission()) {
                return false;
            }
            return self.screenModeManager.currentMode == SCREEN_MODE.ADD || self.screenModeManager.currentMode == SCREEN_MODE.EDIT;
        },
        enumerable: true,
        configurable: true
    });
    integrationDetailController.prototype.initVariables = function () {
        var self = this;
        this.baseController = this.scope.baseController;
    };
    integrationDetailController.prototype.setInfo = function (id, mode, viewState) {
        var self = this;
        self.formValidator = new formValidator(self.$parse, self.toaster, self.scope, self.formName);
        self.id = id;
        self.viewState = viewState;
        self.screenModeManager = new screenModeManager(self, self.saveMethod, false);
        self.screenModeManager.currentMode = mode;
        self.loadScreenConstants();
        if (mode == SCREEN_MODE.ADD) {
            var _integration = new integrationDetailViewModel();
            self.screenModeManager.setEntity(self.formatEntity(_integration));
            self.onIntegrationDetailLoaded();
        }
        else {
            self.loadEntity();
        }
        self.initialize();
    };
    integrationDetailController.prototype.initialize = function () {
        var self = this;
    };
    integrationDetailController.prototype.loadEntity = function () {
        var self = this;
        self.baseController.showLoading();
        var _getBookingSettingDto = new getIntegrationDto();
        _getBookingSettingDto.idIntegrationType = self.id;
        self.integrationDetailWebService.getIntegration(_getBookingSettingDto)
            .then(function (response) {
            if (response.status == STATUS_MESSAGE.SUCCESS) {
                self.screenModeManager.setEntity(self.formatEntity(response.result));
                self.onIntegrationDetailLoaded();
            }
            else {
                self.baseController.showMessage(response.errorMessage, "", ALERT_MESSAGE_TYPE.ERROR);
            }
        }).catch(function (errorMsg) {
            self.baseController.showMessage(errorMsg, "An Error Has Occured On Server, Please Contact Server Admin", ALERT_MESSAGE_TYPE.ERROR);
        }).finally(function () {
            self.baseController.hideLoading();
        });
    };
    integrationDetailController.prototype.formatEntity = function (entity) {
        var self = this;
        var returnData = JSON.parse(JSON.stringify(entity));
        return self.applyObjectCorrections(returnData);
    };
    integrationDetailController.prototype.applyObjectCorrections = function (item) {
        var self = this;
        return item;
    };
    integrationDetailController.prototype.saveMethod = function (modifiedEntity, caller) {
        var self = caller;
        self.registerValidations();
        if (!self.validateForGroups()) {
            self.screenModeManager.setMode(SCREEN_MODE.EDIT);
            return;
        }
        var _saveIntegrationDto = self.formatEntityBeforeSave(self.integrationDetail);
        self.baseController.showLoading();
        self.integrationDetailWebService.saveIntegration(_saveIntegrationDto)
            .then(function (response) {
            if (response.status == STATUS_MESSAGE.SUCCESS) {
                self.baseController.showToast(TOASTER_TYPE.SUCCESS, "Enregistré avec succès");
                self.screenModeManager.setEntity(self.formatEntity(response.result));
                self.id = response.result.idIntegration;
            }
            else {
                self.baseController.showMessage(response.errorMessage, "", ALERT_MESSAGE_TYPE.ERROR, false, null, true);
            }
        }).catch(function (errorMsg) {
            self.baseController.showMessage(errorMsg, "An Error Has Occured On Server, Please Contact Server Admin", ALERT_MESSAGE_TYPE.ERROR);
            self.screenModeManager.setMode(SCREEN_MODE.EDIT);
        }).finally(function () {
            self.baseController.hideLoading();
        });
    };
    integrationDetailController.prototype.registerValidations = function () {
        var self = this;
        for (var i = 0; i < self.childControllers.length; i++) {
            var currentChild = self.childControllers[i];
            currentChild.registerValidations();
        }
    };
    integrationDetailController.prototype.validateForGroups = function () {
        var self = this;
        var isValid = true;
        var errorMessages = [];
        for (var i = 0; i < self.childControllers.length; i++) {
            var currentChild = self.childControllers[i];
            isValid = isValid && currentChild.formValidator.validateGroup(currentChild.groupName, false, true);
            errorMessages = errorMessages.concat(currentChild.formValidator.getAllValidationMessagesForGroup(currentChild.groupName));
        }
        if (errorMessages.length > 0) {
            self.baseController.toaster.pop({
                type: 'error',
                body: errorMessages.join('</br>'),
                bodyOutputType: 'trustedHtml'
            });
        }
        return isValid;
    };
    integrationDetailController.prototype.idGroupValid = function (profileTab) {
        var self = this;
        var isValid = true;
        var groupName = integrationDetailTabNameFromEnum.getName(profileTab);
        var childValidator = Enumerable.From(self.childControllers).Where(function (childController) {
            return childController.groupName == groupName;
        }).FirstOrDefault(null);
        if (childValidator != null && childValidator.hasScreenDetailBeenLoaded) {
            isValid = childValidator.formValidator.validateGroup(groupName, false);
        }
        return isValid;
    };
    integrationDetailController.prototype.loadScreenConstants = function () {
        var self = this;
        self.onScreenDetailLoaded();
        //self.integrationDetailWebService.integrationDetailScreenConstantJson()
        //    .then(function (response: baseResultReturnType<getIntegrationDetailScreenConstantReturnType>) {
        //        if (response.status == STATUS_MESSAGE.SUCCESS) {
        //            self.onScreenDetailLoaded();
        //        } else {
        //            self.baseController.showMessage(response.errorMessage, "", ALERT_MESSAGE_TYPE.ERROR);
        //        }
        //    }).catch(function (errorMsg) {
        //        self.baseController.showMessage(errorMsg, "An Error Has Occured On Server, Please Contact Server Admin", ALERT_MESSAGE_TYPE.ERROR);
        //    }).finally(function () {
        //        self.baseController.hideLoading();
        //    });
    };
    integrationDetailController.prototype.onIntegrationDetailLoaded = function () {
        var self = this;
        self.hasIntegrationDetailBeenLoaded = true;
        self.onAllDetailLoaded();
    };
    integrationDetailController.prototype.onScreenDetailLoaded = function () {
        var self = this;
        self.hasScreenDetailBeenLoaded = true;
        self.onAllDetailLoaded();
    };
    integrationDetailController.prototype.onAllDetailLoaded = function () {
        var self = this;
        if (self.hasScreenDetailBeenLoaded && self.hasIntegrationDetailBeenLoaded) {
            self.formatOnAllDetail();
            self.childControllers.forEach(function (controller) {
                controller.onDetailLoaded();
            });
        }
    };
    integrationDetailController.prototype.formatOnAllDetail = function () {
        var self = this;
    };
    integrationDetailController.prototype.formatEntityBeforeSave = function (entity) {
        var self = this;
        var formattedEntity = self.baseController.cloneObject(entity);
        return formattedEntity;
    };
    integrationDetailController.prototype.setCurrentState = function (integrationDetailTab) {
        var self = this;
        self.currentState = integrationDetailTab;
    };
    integrationDetailController.prototype.upload = function (file, arrayToUpload, isArray) {
        var self = this;
        self.baseController.upload(file, arrayToUpload, isArray);
    };
    integrationDetailController.prototype.deleteImage = function (picture, pictureDataList, isArray) {
        var self = this;
        self.baseController.deleteImage(picture, pictureDataList, isArray);
    };
    return integrationDetailController;
}());
integrationModule.controller("integrationDetailController", ["$scope",
    "$parse",
    "toaster",
    "integrationWebService",
    integrationDetailController
]);
var integrationDetailTab;
(function (integrationDetailTab) {
    integrationDetailTab[integrationDetailTab["BASIC_INFO"] = 1] = "BASIC_INFO";
})(integrationDetailTab || (integrationDetailTab = {}));
var integrationDetailTabNameFromEnum = /** @class */ (function () {
    function integrationDetailTabNameFromEnum() {
    }
    integrationDetailTabNameFromEnum.getName = function (_subscriptionSettingTab) {
        var name;
        switch (_subscriptionSettingTab) {
            case integrationDetailTab.BASIC_INFO:
                name = 'BASIC_INFO';
                break;
        }
        return name;
    };
    return integrationDetailTabNameFromEnum;
}());
var integrationDetailViewModel = /** @class */ (function (_super) {
    __extends(integrationDetailViewModel, _super);
    function integrationDetailViewModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return integrationDetailViewModel;
}(integrationModel));

var integrationDetailBasicInfoController = /** @class */ (function () {
    function integrationDetailBasicInfoController($scope, $parse, toaster, integrationWebService) {
        this.$scope = $scope;
        this.$parse = $parse;
        this.toaster = toaster;
        this.groupName = integrationDetailTabNameFromEnum.getName(integrationDetailTab.BASIC_INFO);
        this.integrationDetailTabEnum = integrationDetailTab;
        this.isSiteUrlAvailable = true;
        this.scope = $scope;
        this.scope.controller = this;
        this.callerController = $scope.$parent.controller;
        this.baseController = $scope.baseController;
        this.integrationWebService = integrationWebService;
        this.callerController.registerIntegrationDetailBasicInfoController(this);
        this.initialize();
    }
    Object.defineProperty(integrationDetailBasicInfoController.prototype, "hasScreenDetailBeenLoaded", {
        get: function () {
            return this.callerController.hasScreenDetailBeenLoaded;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(integrationDetailBasicInfoController.prototype, "hasIntegrationDetailBeenLoaded", {
        get: function () {
            return this.callerController.hasIntegrationDetailBeenLoaded;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(integrationDetailBasicInfoController.prototype, "screenMode", {
        get: function () {
            return this.callerController.screenModeManager.currentMode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(integrationDetailBasicInfoController.prototype, "integrationDetail", {
        get: function () {
            return this.callerController.screenModeManager.entity;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(integrationDetailBasicInfoController.prototype, "isEditable", {
        get: function () {
            var self = this;
            return self.callerController.isEditable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(integrationDetailBasicInfoController.prototype, "isNew", {
        get: function () {
            var self = this;
            return self.callerController.isNew;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(integrationDetailBasicInfoController.prototype, "formName", {
        get: function () {
            return this.callerController.formName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(integrationDetailBasicInfoController.prototype, "isIntegrationStateEditable", {
        get: function () {
            var self = this;
            var isAdmin = self.baseController.commonController.isAdmin();
            return self.callerController.isEditable && isAdmin;
        },
        enumerable: true,
        configurable: true
    });
    integrationDetailBasicInfoController.prototype.initialize = function () {
        var self = this;
        self.registerValidations();
    };
    integrationDetailBasicInfoController.prototype.registerValidations = function () {
        var self = this;
        if (self.formValidator != null) {
            self.formValidator.deRegister();
        }
        self.formValidator = new formValidator(this.$parse, this.toaster, self.scope, self.formName);
        self.formValidator.registerValidationForMandatory(self.scope, 'enterpriseName', 'Nom du magasin');
        self.formValidator.registerGroupValidation(self.groupName, ['enterpriseName']);
    };
    integrationDetailBasicInfoController.prototype.onDetailLoaded = function () {
        var self = this;
    };
    integrationDetailBasicInfoController.prototype.upload = function (file, arrayToUpload, isArray) {
        var self = this;
        self.baseController.upload(file, arrayToUpload, isArray);
    };
    integrationDetailBasicInfoController.prototype.deleteImage = function (picture, pictureDataList, isArray) {
        var self = this;
        self.baseController.deleteImage(picture, pictureDataList, isArray);
    };
    return integrationDetailBasicInfoController;
}());
integrationModule.controller("integrationDetailBasicInfoController", ["$scope",
    "$parse",
    "toaster",
    "integrationWebService",
    integrationDetailBasicInfoController
]);

var cardWebService = /** @class */ (function () {
    function cardWebService(genericWebConnectionService, globalVariableFactory) {
        this.genericWebConnectionService = genericWebConnectionService;
        this.globalVariableFactory = globalVariableFactory;
    }
    cardWebService.prototype.structureList = function (sortingPagingInfo) {
        var url = '/api/structure-list';
        var data = sortingPagingInfo;
        return this.genericWebConnectionService.postRequest(url, data);
    };
    cardWebService.prototype.getCardDetaiScreenConstant = function () {
        var url = '/api/card-detail-screen-constant';
        var data = {};
        return this.genericWebConnectionService.postRequest(url, data);
    };
    cardWebService.prototype.saveCard = function (saveCardDto) {
        var url = '/api/structure-create';
        var data = saveCardDto;
        return this.genericWebConnectionService.postRequest(url, data);
    };
    cardWebService.prototype.getCard = function (getCardDto) {
        var url = '/api/structure-detail';
        var data = getCardDto;
        return this.genericWebConnectionService.postRequest(url, data);
    };
    cardWebService.prototype.deleteCard = function (getCardDto) {
        var url = '/api/structure-delete';
        var data = getCardDto;
        return this.genericWebConnectionService.postRequest(url, data);
    };
    return cardWebService;
}());

var cardModule = angular.module("cardModule", ['purplefox.numeric', 'ngMap']);
cardModule.service("cardWebService", ["genericWebConnectionService",
    "globalVariableFactory",
    cardWebService]);
cardModule.directive('dragEvents', function () {
    return {
        restrict: 'A',
        scope: {
            dragStart: '&',
            dragOver: '&',
            drop: '&',
            dragEnd: '&'
        },
        link: function (scope, element) {
            element.attr('draggable', true);
            element[0].addEventListener('dragstart', function (e) {
                element.addClass('dragging');
                scope.dragStart({ $event: e });
            });
            element[0].addEventListener('dragover', function (e) {
                e.preventDefault();
                element.addClass('drag-over');
                scope.dragOver({ $event: e });
            });
            element[0].addEventListener('dragleave', function () {
                element.removeClass('drag-over');
            });
            element[0].addEventListener('drop', function (e) {
                e.preventDefault();
                element.removeClass('drag-over');
                scope.drop({ $event: e });
            });
            element[0].addEventListener('dragend', function (e) {
                element.removeClass('dragging');
                element.removeClass('drag-over');
                scope.dragEnd({ $event: e });
            });
        }
    };
});
baseModule.requires.push("cardModule");

var cardListController = /** @class */ (function () {
    function cardListController($scope, cardWebService) {
        var self = this;
        $scope.controller = this;
        this.scope = $scope;
        this.baseController = this.scope.baseController;
        this.cardWebService = cardWebService;
        this.initVariables();
    }
    cardListController.prototype.initVariables = function () {
        var self = this;
        self.baseController = this.scope.baseController;
    };
    cardListController.prototype.setInfo = function () {
        var self = this;
        self.intializePagingInfo();
        self.gridLoad();
    };
    cardListController.prototype.intializePagingInfo = function () {
        var self = this;
        self.paging = new cardSortingPagingInfo();
        self.resetPagingInfo();
        self.paging.sortByDesc = false;
    };
    cardListController.prototype.resetPagingInfo = function () {
        var self = this;
        self.paging.currentPageIndex = 1;
        self.paging.pageSize = 10;
        self.paging.pageCount = 0;
        self.paging.sortField = "";
        self.paging.sortColumn = "";
    };
    cardListController.prototype.gridLoad = function () {
        var self = this;
        var sorting = self.baseController.cloneObject(self.paging);
        sorting.currentPageIndex--;
        self.baseController.showLoading();
        self.cardWebService.structureList(sorting)
            .then(function (response) {
            if (response.status == STATUS_MESSAGE.SUCCESS) {
                self.paging.pageCount = response.result.totalCount;
                self.list = self.formatList(response.result.entityList);
                self.onGridLoaded();
            }
            else {
                self.baseController.showMessage(response.errorMessage, "", ALERT_MESSAGE_TYPE.ERROR, false, null, true);
            }
        })
            .catch(function (error) {
            self.baseController.hideLoading();
            self.baseController.showMessage("An Error Has Occured On Server, Please Contact Server Admin", error, ALERT_MESSAGE_TYPE.ERROR, false, null, true);
        })
            .finally(function () {
            self.baseController.hideLoading();
        });
    };
    cardListController.prototype.onGridLoaded = function () {
    };
    cardListController.prototype.formatList = function (contactFormList) {
        var self = this;
        var _cardList = [];
        Enumerable.From(contactFormList).ForEach(function (card) {
            var _formatted = self.baseController.cloneObject(card);
            _cardList.push(_formatted);
        });
        return _cardList;
    };
    cardListController.prototype.loadMore = function () {
        var self = this;
        self.paging.currentPageIndex++;
        self.gridLoad();
    };
    cardListController.prototype.sortBy = function () {
        var self = this;
        self.paging.sortByDesc = !self.paging.sortByDesc;
        self.resetPagingInfo();
        self.gridLoad();
    };
    cardListController.prototype.search = function () {
        var self = this;
        self.resetPagingInfo();
        self.gridLoad();
    };
    cardListController.prototype.onEditClick = function (card) {
        var self = this;
        window.location.href = "/card-detail/" + card.id + "/" + SCREEN_MODE.EDIT;
    };
    cardListController.prototype.newCard = function (card) {
        var self = this;
        window.location.href = "/card-detail/-1/" + SCREEN_MODE.ADD;
    };
    return cardListController;
}());
cardModule.controller("cardListController", ["$scope",
    "cardWebService",
    cardListController
]);

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var cardDetailController = /** @class */ (function () {
    function cardDetailController($scope, $parse, toaster, cardDetailWebService) {
        this.$parse = $parse;
        this.toaster = toaster;
        this.previsualizeUrl = '';
        this.preloadedData = {
            structureFields: []
        };
        this.childControllers = [];
        this.formName = 'cardDetailForm';
        this.currentState = cardDetailTab.INFORMATION;
        this.cardDetailTab = cardDetailTab;
        this.cardDetailStepInfo = cardDetailStepInfo;
        this.step = cardDetailStepInfo.EMAIL;
        this.titles = [
            "Mr",
            "Mrs",
            "Ms",
        ];
        this.groupFieldCategories = [];
        var self = this;
        $scope.controller = this;
        this.cardDetailWebService = cardDetailWebService;
        this.scope = $scope;
        this.baseController = this.scope.baseController;
        this.initVariables();
        this.registerValidations();
    }
    Object.defineProperty(cardDetailController.prototype, "screenMode", {
        get: function () {
            return this.screenModeManager.currentMode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailController.prototype, "cardDetail", {
        get: function () {
            return this.screenModeManager.entity;
        },
        enumerable: true,
        configurable: true
    });
    cardDetailController.prototype.registerCardDetailBasicInfoController = function (cardDetailBasicInfoController) {
        this.cardDetailBasicInfoController = cardDetailBasicInfoController;
        this.childControllers.push(cardDetailBasicInfoController);
    };
    cardDetailController.prototype.registerCardDetailInformationController = function (cardDetailInformationController) {
        this.cardDetailInformationController = cardDetailInformationController;
        this.childControllers.push(cardDetailInformationController);
    };
    cardDetailController.prototype.registerCardDetailFieldsController = function (cardDetailFieldsController) {
        this.cardDetailFieldsController = cardDetailFieldsController;
        this.childControllers.push(cardDetailFieldsController);
    };
    cardDetailController.prototype.registerCardDetailSettingsController = function (cardDetailSettingsController) {
        this.cardDetailSettingsController = cardDetailSettingsController;
        this.childControllers.push(cardDetailSettingsController);
    };
    cardDetailController.prototype.registerCardDetailCreationController = function (cardDetailCreationController) {
        this.cardDetailCreationController = cardDetailCreationController;
        this.childControllers.push(cardDetailCreationController);
    };
    Object.defineProperty(cardDetailController.prototype, "isNew", {
        get: function () {
            var self = this;
            return self.baseController.isNullOrUndefined(self.id);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailController.prototype, "isEditable", {
        get: function () {
            var self = this;
            if (!self.baseController.commonController.hasEditPermission()) {
                return false;
            }
            return self.screenModeManager.currentMode == SCREEN_MODE.ADD || self.screenModeManager.currentMode == SCREEN_MODE.EDIT;
        },
        enumerable: true,
        configurable: true
    });
    cardDetailController.prototype.initVariables = function () {
        var self = this;
        this.baseController = this.scope.baseController;
    };
    cardDetailController.prototype.setInfo = function (id, mode, viewState) {
        var self = this;
        self.formValidator = new formValidator(self.$parse, self.toaster, self.scope, self.formName);
        self.id = id;
        self.viewState = viewState;
        self.screenModeManager = new screenModeManager(self, self.saveMethod, false);
        self.screenModeManager.currentMode = mode;
        self.loadScreenConstants();
        if (mode == SCREEN_MODE.ADD) {
            self.step = cardDetailStepInfo.EMAIL;
            var _card = new cardDetailViewModel();
            _card.profilePicture = new pictureDataModel();
            _card.coverPicture = new pictureDataModel();
            _card.contacts = [];
            _card.socialNetworks = [];
            _card.addresses = [];
            _card.structureFields = [];
            _card.stats = { totalViews: 0 };
            _card.cardName = "My Card - " + new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
            self.screenModeManager.setEntity(self.formatEntity(_card));
            self.onCardDetailLoaded();
        }
        else {
            self.step = cardDetailStepInfo.EDIT;
            self.loadEntity();
        }
        self.initialize();
    };
    cardDetailController.prototype.initialize = function () {
        var self = this;
    };
    cardDetailController.prototype.loadEntity = function () {
        var self = this;
        self.baseController.showLoading();
        var _getBookingSettingDto = new getCardDto();
        _getBookingSettingDto.idStructure = self.id;
        self.cardDetailWebService.getCard(_getBookingSettingDto)
            .then(function (response) {
            if (response.status == STATUS_MESSAGE.SUCCESS) {
                self.screenModeManager.setEntity(self.formatEntity(response.result));
                self.onCardDetailLoaded();
            }
            else {
                self.baseController.showMessage(response.errorMessage, "", ALERT_MESSAGE_TYPE.ERROR);
            }
        }).catch(function (errorMsg) {
            self.baseController.showMessage(errorMsg, "An Error Has Occured On Server, Please Contact Server Admin", ALERT_MESSAGE_TYPE.ERROR);
        }).finally(function () {
            self.baseController.hideLoading();
        });
    };
    cardDetailController.prototype.formatEntity = function (entity) {
        var self = this;
        var returnData = JSON.parse(JSON.stringify(entity));
        return self.applyObjectCorrections(returnData);
    };
    cardDetailController.prototype.applyObjectCorrections = function (item) {
        var self = this;
        if (!self.baseController.isNullOrUndefined(item.structureFields) && item.structureFields.length > 0) {
            // First ensure all fields have a displayOrder
            var maxOrder_1 = 0;
            item.structureFields.forEach(function (field) {
                if (!field.displayOrder && field.displayOrder !== 0) {
                    maxOrder_1 = Math.max.apply(Math, item.structureFields.map(function (f) { return f.displayOrder || 0; }));
                    field.displayOrder = maxOrder_1 + 1;
                }
            });
            // Sort by displayOrder
            item.structureFields.sort(function (a, b) {
                return (a.displayOrder || 0) - (b.displayOrder || 0);
            });
        }
        return item;
    };
    cardDetailController.prototype.saveMethod = function (modifiedEntity, caller) {
        var self = caller;
        self.registerValidations();
        if (!self.validateForGroups()) {
            // self.screenModeManager.setMode(SCREEN_MODE.EDIT);
            return;
        }
        var _saveCardDto = self.formatEntityBeforeSave(self.cardDetail);
        self.baseController.showLoading();
        self.cardDetailWebService.saveCard(_saveCardDto)
            .then(function (response) {
            if (response.status == STATUS_MESSAGE.SUCCESS) {
                self.baseController.showToast(TOASTER_TYPE.SUCCESS, "Saved successfully");
                self.screenModeManager.setEntity(self.formatEntity(response.result));
                self.id = response.result.idStructure;
            }
            else {
                self.baseController.showMessage(response.errorMessage, "", ALERT_MESSAGE_TYPE.ERROR, false, null, true);
            }
        }).catch(function (errorMsg) {
            self.baseController.showMessage(errorMsg, "An Error Has Occured On Server, Please Contact Server Admin", ALERT_MESSAGE_TYPE.ERROR);
            self.screenModeManager.setMode(SCREEN_MODE.EDIT);
        }).finally(function () {
            self.baseController.hideLoading();
        });
    };
    cardDetailController.prototype.registerValidations = function () {
        var self = this;
        for (var i = 0; i < self.childControllers.length; i++) {
            var currentChild = self.childControllers[i];
            currentChild.registerValidations();
        }
    };
    cardDetailController.prototype.validateForGroups = function () {
        var self = this;
        var isValid = true;
        var errorMessages = [];
        for (var i = 0; i < self.childControllers.length; i++) {
            var currentChild = self.childControllers[i];
            isValid = isValid && currentChild.formValidator.validateGroup(currentChild.groupName, false, true);
            errorMessages = errorMessages.concat(currentChild.formValidator.getAllValidationMessagesForGroup(currentChild.groupName));
        }
        if (errorMessages.length > 0) {
            self.baseController.toaster.pop({
                type: 'error',
                body: errorMessages.join('</br>'),
                bodyOutputType: 'trustedHtml'
            });
        }
        return isValid;
    };
    cardDetailController.prototype.idGroupValid = function (profileTab) {
        var self = this;
        var isValid = true;
        var groupName = cardDetailTabNameFromEnum.getName(profileTab);
        var childValidator = Enumerable.From(self.childControllers).Where(function (childController) {
            return childController.groupName == groupName;
        }).FirstOrDefault(null);
        if (childValidator != null && childValidator.hasScreenDetailBeenLoaded) {
            isValid = childValidator.formValidator.validateGroup(groupName, false);
        }
        return isValid;
    };
    cardDetailController.prototype.loadScreenConstants = function () {
        var self = this;
        self.onScreenDetailLoaded();
        self.cardDetailWebService.getCardDetaiScreenConstant()
            .then(function (response) {
            if (response.status == STATUS_MESSAGE.SUCCESS) {
                self.preloadedData.structureFields = response.result.structureFields;
                self.formatScreenConstant(response.result);
                self.onScreenDetailLoaded();
            }
            else {
                self.baseController.showMessage(response.errorMessage, "", ALERT_MESSAGE_TYPE.ERROR);
            }
        }).catch(function (errorMsg) {
            self.baseController.showMessage(errorMsg, "An Error Has Occured On Server, Please Contact Server Admin", ALERT_MESSAGE_TYPE.ERROR);
        }).finally(function () {
            self.baseController.hideLoading();
        });
    };
    cardDetailController.prototype.formatScreenConstant = function (data) {
        var self = this;
        var fields = data.structureFields;
        var groups = {};
        fields.forEach(function (field) {
            var key = field.isPopular ? 'Popular' : field.structureFieldCategory;
            if (!groups[key]) {
                groups[key] = [];
            }
            groups[key].push(field);
        });
        var sortedKeys = Object.keys(groups)
            .filter(function (k) { return k !== 'Popular'; })
            .sort(function (a, b) { return a.localeCompare(b); });
        var finalGroup = [];
        if (groups['Popular']) {
            finalGroup.push({ category: 'Popular', items: groups['Popular'] });
        }
        sortedKeys.forEach(function (k) {
            finalGroup.push({ category: k, items: groups[k] });
        });
        self.groupFieldCategories = finalGroup;
        self.individualBaseSlugUrl = data.individualBaseSlugUrl;
    };
    cardDetailController.prototype.onCardDetailLoaded = function () {
        var self = this;
        self.hasCardDetailBeenLoaded = true;
        self.onAllDetailLoaded();
    };
    cardDetailController.prototype.onScreenDetailLoaded = function () {
        var self = this;
        self.hasScreenDetailBeenLoaded = true;
        self.onAllDetailLoaded();
    };
    cardDetailController.prototype.onAllDetailLoaded = function () {
        var self = this;
        if (self.hasScreenDetailBeenLoaded && self.hasCardDetailBeenLoaded) {
            self.formatOnAllDetail();
            self.childControllers.forEach(function (controller) {
                controller.onDetailLoaded();
            });
        }
    };
    cardDetailController.prototype.formatOnAllDetail = function () {
        var self = this;
    };
    cardDetailController.prototype.formatEntityBeforeSave = function (entity) {
        var self = this;
        var formattedEntity = self.baseController.cloneObject(entity);
        return formattedEntity;
    };
    cardDetailController.prototype.setCurrentState = function (cardDetailTab) {
        var self = this;
        self.currentState = cardDetailTab;
    };
    cardDetailController.prototype.upload = function (file, arrayToUpload, isArray) {
        var self = this;
        self.baseController.upload(file, arrayToUpload, isArray);
    };
    cardDetailController.prototype.deleteImage = function (picture, pictureDataList, isArray) {
        var self = this;
        self.baseController.deleteImage(picture, pictureDataList, isArray);
    };
    cardDetailController.prototype.onNextClick = function () {
        var self = this;
        self.step = self.step + 1;
    };
    return cardDetailController;
}());
cardModule.controller("cardDetailController", ["$scope",
    "$parse",
    "toaster",
    "cardWebService",
    cardDetailController
]);
var cardDetailTab;
(function (cardDetailTab) {
    cardDetailTab[cardDetailTab["BASIC_INFO"] = 1] = "BASIC_INFO";
    cardDetailTab[cardDetailTab["INFORMATION"] = 2] = "INFORMATION";
    cardDetailTab[cardDetailTab["FIELDS"] = 3] = "FIELDS";
    cardDetailTab[cardDetailTab["SETTINGS"] = 4] = "SETTINGS";
})(cardDetailTab || (cardDetailTab = {}));
var cardDetailStepInfo;
(function (cardDetailStepInfo) {
    cardDetailStepInfo[cardDetailStepInfo["EMAIL"] = 1] = "EMAIL";
    cardDetailStepInfo[cardDetailStepInfo["COMPANY"] = 2] = "COMPANY";
    cardDetailStepInfo[cardDetailStepInfo["PHOTO"] = 3] = "PHOTO";
    cardDetailStepInfo[cardDetailStepInfo["PHONE"] = 4] = "PHONE";
    cardDetailStepInfo[cardDetailStepInfo["EDIT"] = 5] = "EDIT";
})(cardDetailStepInfo || (cardDetailStepInfo = {}));
var cardDetailTabNameFromEnum = /** @class */ (function () {
    function cardDetailTabNameFromEnum() {
    }
    cardDetailTabNameFromEnum.getName = function (_subscriptionSettingTab) {
        var name;
        switch (_subscriptionSettingTab) {
            case cardDetailTab.BASIC_INFO:
                name = 'BASIC_INFO';
                break;
            case cardDetailTab.INFORMATION:
                name = 'INFORMATION';
                break;
            case cardDetailTab.FIELDS:
                name = 'FIELDS';
                break;
            case cardDetailTab.SETTINGS:
                name = 'SETTINGS';
                break;
        }
        return name;
    };
    return cardDetailTabNameFromEnum;
}());
var cardDetailViewModel = /** @class */ (function (_super) {
    __extends(cardDetailViewModel, _super);
    function cardDetailViewModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return cardDetailViewModel;
}(structureModel));

var cardDetailBasicInfoController = /** @class */ (function () {
    function cardDetailBasicInfoController($scope, $parse, toaster, cardWebService) {
        this.$scope = $scope;
        this.$parse = $parse;
        this.toaster = toaster;
        this.groupName = cardDetailTabNameFromEnum.getName(cardDetailTab.BASIC_INFO);
        this.cardDetailTabEnum = cardDetailTab;
        this.isSiteUrlAvailable = true;
        this.scope = $scope;
        this.scope.controller = this;
        this.callerController = $scope.$parent.controller;
        this.baseController = $scope.baseController;
        this.cardWebService = cardWebService;
        this.callerController.registerCardDetailBasicInfoController(this);
        this.initialize();
    }
    Object.defineProperty(cardDetailBasicInfoController.prototype, "hasScreenDetailBeenLoaded", {
        get: function () {
            return this.callerController.hasScreenDetailBeenLoaded;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailBasicInfoController.prototype, "hasCardDetailBeenLoaded", {
        get: function () {
            return this.callerController.hasCardDetailBeenLoaded;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailBasicInfoController.prototype, "screenMode", {
        get: function () {
            return this.callerController.screenModeManager.currentMode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailBasicInfoController.prototype, "cardDetail", {
        get: function () {
            return this.callerController.screenModeManager.entity;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailBasicInfoController.prototype, "isEditable", {
        get: function () {
            var self = this;
            return self.callerController.isEditable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailBasicInfoController.prototype, "isNew", {
        get: function () {
            var self = this;
            return self.callerController.isNew;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailBasicInfoController.prototype, "formName", {
        get: function () {
            return this.callerController.formName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailBasicInfoController.prototype, "isCardStateEditable", {
        get: function () {
            var self = this;
            var isAdmin = self.baseController.commonController.isAdmin();
            return self.callerController.isEditable && isAdmin;
        },
        enumerable: true,
        configurable: true
    });
    cardDetailBasicInfoController.prototype.initialize = function () {
        var self = this;
        self.registerValidations();
    };
    cardDetailBasicInfoController.prototype.registerValidations = function () {
        var self = this;
        if (self.formValidator != null) {
            self.formValidator.deRegister();
        }
        self.formValidator = new formValidator(this.$parse, this.toaster, self.scope, self.formName);
        self.formValidator.registerValidationForMandatory(self.scope, 'enterpriseName', 'Nom du magasin');
        self.formValidator.registerGroupValidation(self.groupName, ['enterpriseName']);
    };
    cardDetailBasicInfoController.prototype.onDetailLoaded = function () {
        var self = this;
    };
    cardDetailBasicInfoController.prototype.upload = function (file, arrayToUpload, isArray) {
        var self = this;
        self.baseController.upload(file, arrayToUpload, isArray);
    };
    cardDetailBasicInfoController.prototype.deleteImage = function (picture, pictureDataList, isArray) {
        var self = this;
        self.baseController.deleteImage(picture, pictureDataList, isArray);
    };
    cardDetailBasicInfoController.prototype.setColor = function (color) {
        var self = this;
        self.cardDetail.color = color;
        console.log(color);
    };
    return cardDetailBasicInfoController;
}());
cardModule.controller("cardDetailBasicInfoController", ["$scope",
    "$parse",
    "toaster",
    "cardWebService",
    cardDetailBasicInfoController
]);

var cardDetailInformationController = /** @class */ (function () {
    function cardDetailInformationController($scope, $parse, toaster, cardWebService) {
        this.$scope = $scope;
        this.$parse = $parse;
        this.toaster = toaster;
        this.groupName = cardDetailTabNameFromEnum.getName(cardDetailTab.INFORMATION);
        this.cardDetailTabEnum = cardDetailTab;
        this.scope = $scope;
        this.scope.controller = this;
        this.callerController = $scope.$parent.controller;
        this.baseController = $scope.baseController;
        this.cardWebService = cardWebService;
        this.callerController.registerCardDetailInformationController(this);
        this.initialize();
    }
    Object.defineProperty(cardDetailInformationController.prototype, "hasScreenDetailBeenLoaded", {
        get: function () {
            return this.callerController.hasScreenDetailBeenLoaded;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailInformationController.prototype, "hasCardDetailBeenLoaded", {
        get: function () {
            return this.callerController.hasCardDetailBeenLoaded;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailInformationController.prototype, "screenMode", {
        get: function () {
            return this.callerController.screenModeManager.currentMode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailInformationController.prototype, "cardDetail", {
        get: function () {
            return this.callerController.screenModeManager.entity;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailInformationController.prototype, "isEditable", {
        get: function () {
            var self = this;
            return self.callerController.isEditable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailInformationController.prototype, "isNew", {
        get: function () {
            var self = this;
            return self.callerController.isNew;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailInformationController.prototype, "formName", {
        get: function () {
            return this.callerController.formName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailInformationController.prototype, "isCardStateEditable", {
        get: function () {
            var self = this;
            var isAdmin = self.baseController.commonController.isAdmin();
            return self.callerController.isEditable && isAdmin;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailInformationController.prototype, "titles", {
        get: function () {
            var self = this;
            return self.callerController.titles;
        },
        enumerable: true,
        configurable: true
    });
    cardDetailInformationController.prototype.initialize = function () {
        var self = this;
        self.registerValidations();
    };
    cardDetailInformationController.prototype.registerValidations = function () {
        var self = this;
        if (self.formValidator != null) {
            self.formValidator.deRegister();
        }
        self.formValidator = new formValidator(this.$parse, this.toaster, self.scope, self.formName);
        self.formValidator.registerGroupValidation(self.groupName, []);
    };
    cardDetailInformationController.prototype.onDetailLoaded = function () {
        var self = this;
    };
    cardDetailInformationController.prototype.upload = function (file, arrayToUpload, isArray) {
        var self = this;
        self.baseController.upload(file, arrayToUpload, isArray);
    };
    cardDetailInformationController.prototype.deleteImage = function (picture, pictureDataList, isArray) {
        var self = this;
        self.baseController.deleteImage(picture, pictureDataList, isArray);
    };
    cardDetailInformationController.prototype.setColor = function (color) {
        var self = this;
        self.cardDetail.color = color;
    };
    cardDetailInformationController.prototype.addAddress = function () {
        var self = this;
        var address = new addressModel();
        address.idLocal = self.baseController.generateUUID();
        self.cardDetail.addresses.push(address);
    };
    cardDetailInformationController.prototype.removeAddress = function (address) {
        var self = this;
        var position = self.baseController.searchForEntityInList("idAddressReference", self.cardDetail.addresses, address, "idLocal");
        if (!self.baseController.isNullOrUndefined(position) && position > -1) {
            self.cardDetail.addresses.splice(position, 1);
        }
    };
    return cardDetailInformationController;
}());
cardModule.controller("cardDetailInformationController", ["$scope",
    "$parse",
    "toaster",
    "cardWebService",
    cardDetailInformationController
]);

var cardDetailFieldsController = /** @class */ (function () {
    function cardDetailFieldsController($scope, $parse, toaster, cardWebService) {
        var _this = this;
        this.$scope = $scope;
        this.$parse = $parse;
        this.toaster = toaster;
        this.groupName = cardDetailTabNameFromEnum.getName(cardDetailTab.FIELDS);
        this.cardDetailTabEnum = cardDetailTab;
        this.filterFields = function (item) {
            if (!_this.searchQuery)
                return true;
            return item.name.toLowerCase().includes(_this.searchQuery.toLowerCase());
        };
        this.dragStartIndex = null;
        this.scope = $scope;
        this.scope.controller = this;
        this.callerController = $scope.$parent.controller;
        this.baseController = $scope.baseController;
        this.cardWebService = cardWebService;
        this.callerController.registerCardDetailFieldsController(this);
        this.initialize();
    }
    Object.defineProperty(cardDetailFieldsController.prototype, "hasScreenDetailBeenLoaded", {
        get: function () {
            return this.callerController.hasScreenDetailBeenLoaded;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailFieldsController.prototype, "hasCardDetailBeenLoaded", {
        get: function () {
            return this.callerController.hasCardDetailBeenLoaded;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailFieldsController.prototype, "screenMode", {
        get: function () {
            return this.callerController.screenModeManager.currentMode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailFieldsController.prototype, "cardDetail", {
        get: function () {
            return this.callerController.screenModeManager.entity;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailFieldsController.prototype, "isEditable", {
        get: function () {
            var self = this;
            return self.callerController.isEditable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailFieldsController.prototype, "isNew", {
        get: function () {
            var self = this;
            return self.callerController.isNew;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailFieldsController.prototype, "formName", {
        get: function () {
            return this.callerController.formName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailFieldsController.prototype, "isCardStateEditable", {
        get: function () {
            var self = this;
            var isAdmin = self.baseController.commonController.isAdmin();
            return self.callerController.isEditable && isAdmin;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailFieldsController.prototype, "structureFields", {
        get: function () {
            var self = this;
            return self.callerController.groupFieldCategories;
        },
        enumerable: true,
        configurable: true
    });
    cardDetailFieldsController.prototype.initialize = function () {
        var self = this;
        self.registerValidations();
    };
    cardDetailFieldsController.prototype.registerValidations = function () {
        var self = this;
        if (self.formValidator != null) {
            self.formValidator.deRegister();
        }
        self.formValidator = new formValidator(this.$parse, this.toaster, self.scope, self.formName);
        self.formValidator.registerGroupValidation(self.groupName, []);
    };
    cardDetailFieldsController.prototype.onDetailLoaded = function () {
        var self = this;
    };
    cardDetailFieldsController.prototype.upload = function (file, arrayToUpload, isArray) {
        var self = this;
        if (self.baseController.isNullOrUndefined(arrayToUpload.document)) {
            arrayToUpload.document = {};
        }
        self.baseController.upload(file, arrayToUpload.document, isArray);
    };
    cardDetailFieldsController.prototype.deleteImage = function (picture, pictureDataList, isArray) {
        var self = this;
        self.baseController.deleteImage(picture, pictureDataList, isArray);
    };
    cardDetailFieldsController.prototype.removeField = function (structureField) {
        var self = this;
        var position = self.baseController.searchForEntityInList("idStructure_StructureField", self.cardDetail.structureFields, structureField, "idLocal");
        if (!self.baseController.isNullOrUndefined(position) && position > -1) {
            self.cardDetail.structureFields.splice(position, 1);
        }
    };
    cardDetailFieldsController.prototype.addField = function (field) {
        var self = this;
        var structure_StructureField = new structure_StructureFieldModel();
        structure_StructureField.idLocal = self.baseController.generateUUID();
        structure_StructureField.idStructureField = field.idStructureField;
        structure_StructureField.structureField = field;
        structure_StructureField.displayOrder = self.cardDetail.structureFields.length + 1;
        self.cardDetail.structureFields.push(structure_StructureField);
    };
    cardDetailFieldsController.prototype.handleDragStart = function (event, index) {
        this.dragStartIndex = index;
        event.dataTransfer.effectAllowed = 'move';
    };
    cardDetailFieldsController.prototype.handleDragOver = function (event, index) {
        event.preventDefault(); // Allow drop
    };
    cardDetailFieldsController.prototype.handleDrop = function (event, dropIndex) {
        event.preventDefault();
        var fromIndex = this.dragStartIndex;
        var toIndex = dropIndex;
        if (fromIndex === null || fromIndex === toIndex)
            return;
        var item = this.cardDetail.structureFields[fromIndex];
        this.cardDetail.structureFields.splice(fromIndex, 1);
        this.cardDetail.structureFields.splice(toIndex, 0, item);
        // Optional: update displayOrder
        this.cardDetail.structureFields.forEach(function (f, i) { return f.displayOrder = i + 1; });
        this.dragStartIndex = null;
        this.scope.$apply(); // trigger digest
    };
    cardDetailFieldsController.prototype.handleDragEnd = function (event) {
        this.dragStartIndex = null;
    };
    return cardDetailFieldsController;
}());
cardModule.controller("cardDetailFieldsController", ["$scope",
    "$parse",
    "toaster",
    "cardWebService",
    cardDetailFieldsController
]);

var cardDetailSettingController = /** @class */ (function () {
    function cardDetailSettingController($scope, $parse, toaster, cardWebService) {
        this.$scope = $scope;
        this.$parse = $parse;
        this.toaster = toaster;
        this.groupName = cardDetailTabNameFromEnum.getName(cardDetailTab.SETTINGS);
        this.cardDetailTabEnum = cardDetailTab;
        this.timeFilter = 'month';
        this.viewsChart = null;
        this.scope = $scope;
        this.scope.controller = this;
        this.callerController = $scope.$parent.controller;
        this.baseController = $scope.baseController;
        this.cardWebService = cardWebService;
        this.callerController.registerCardDetailSettingsController(this);
        this.initialize();
    }
    Object.defineProperty(cardDetailSettingController.prototype, "hasScreenDetailBeenLoaded", {
        get: function () {
            return this.callerController.hasScreenDetailBeenLoaded;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailSettingController.prototype, "hasCardDetailBeenLoaded", {
        get: function () {
            return this.callerController.hasCardDetailBeenLoaded;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailSettingController.prototype, "screenMode", {
        get: function () {
            return this.callerController.screenModeManager.currentMode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailSettingController.prototype, "cardDetail", {
        get: function () {
            return this.callerController.screenModeManager.entity;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailSettingController.prototype, "isEditable", {
        get: function () {
            var self = this;
            return self.callerController.isEditable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailSettingController.prototype, "isNew", {
        get: function () {
            var self = this;
            return self.callerController.isNew;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailSettingController.prototype, "formName", {
        get: function () {
            return this.callerController.formName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailSettingController.prototype, "isCardStateEditable", {
        get: function () {
            var self = this;
            var isAdmin = self.baseController.commonController.isAdmin();
            return self.callerController.isEditable && isAdmin;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailSettingController.prototype, "individualBaseSlugUrl", {
        get: function () {
            var self = this;
            return self.callerController.individualBaseSlugUrl;
        },
        enumerable: true,
        configurable: true
    });
    cardDetailSettingController.prototype.initialize = function () {
        var self = this;
        self.registerValidations();
        self.updateViewsGraph();
    };
    cardDetailSettingController.prototype.registerValidations = function () {
        var self = this;
        if (self.formValidator != null) {
            self.formValidator.deRegister();
        }
        self.formValidator = new formValidator(this.$parse, this.toaster, self.scope, self.formName);
        self.formValidator.registerValidationForMandatory(self.scope, 'cardName', 'Name of the card in settings tab');
        self.formValidator.registerGroupValidation(self.groupName, ['cardName']);
    };
    cardDetailSettingController.prototype.onDetailLoaded = function () {
        var self = this;
        self.generateQRCode();
    };
    cardDetailSettingController.prototype.upload = function (file, arrayToUpload, isArray) {
        var self = this;
        self.baseController.upload(file, arrayToUpload, isArray);
    };
    cardDetailSettingController.prototype.deleteImage = function (picture, pictureDataList, isArray) {
        var self = this;
        self.baseController.deleteImage(picture, pictureDataList, isArray);
    };
    cardDetailSettingController.prototype.setTimeFilter = function (filter) {
        var self = this;
        self.timeFilter = filter;
        self.updateViewsGraph();
    };
    ;
    cardDetailSettingController.prototype.updateViewsGraph = function () {
        var self = this;
        var ctx = document.getElementById('viewsChart');
        var _a = self.generateMockData(self.timeFilter), labels = _a.labels, data = _a.data;
        if (self.viewsChart) {
            self.viewsChart.destroy();
        }
        self.viewsChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                        label: 'Views',
                        data: data,
                        borderColor: 'var(--purple)',
                        backgroundColor: 'rgba(147, 51, 234, 0.1)',
                        borderWidth: 2,
                        tension: 0.4,
                        fill: true
                    }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    };
    cardDetailSettingController.prototype.generateMockData = function (filter) {
        var data = [];
        var labels = [];
        var points = 0;
        /*
        switch (filter) {
            case 'day':
                points = 24;
                for (let i = 0; i < points; i++) {
                    labels.push(`${i}:00`);
                    data.push(Math.floor(Math.random() * 50));
                }
                break;
            case 'month':
                points = 30;
                for (let i = 1; i <= points; i++) {
                    labels.push(`Day ${i}`);
                    data.push(Math.floor(Math.random() * 100));
                }
                break;
            case 'year':
                points = 12;
                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                for (let i = 0; i < points; i++) {
                    labels.push(months[i]);
                    data.push(Math.floor(Math.random() * 500));
                }
                break;
        }
        */
        return { labels: labels, data: data };
    };
    cardDetailSettingController.prototype.copyLink = function () {
        var _this = this;
        var self = self;
        var link = self.cardDetail.fullSlugUrl;
        var _navigator = navigator || window.navigator; // Fallback for older browsers
        if (_navigator && _navigator.clipboard) {
            _navigator.clipboard.writeText(link).then(function () {
                _this.baseController.showToast(ALERT_MESSAGE_TYPE.SUCCESS, "Link Copied", "Link Copied");
            }).catch(function (err) {
                console.error("Clipboard copy failed", err);
                self.baseController.showToast(ALERT_MESSAGE_TYPE.ERROR, "Failed", "Could not copy link.");
            });
        }
        else {
            console.warn("Clipboard API not available");
            self.baseController.showToast(ALERT_MESSAGE_TYPE.WARNING, "Unavailable", "Clipboard not supported.");
        }
    };
    cardDetailSettingController.prototype.shareByEmail = function () {
        var self = this;
        var link = self.cardDetail.fullSlugUrl;
        var subject = encodeURIComponent("Check out this profile");
        var body = encodeURIComponent("Hi,\n\nI wanted to share this link with you:\n" + link + "\n\nBest regards.");
        var mailtoLink = "mailto:?subject=" + subject + "&body=" + body;
        // Open the mail client
        window.location.href = mailtoLink;
        self.baseController.showToast(ALERT_MESSAGE_TYPE.SUCCESS, "Email Client Opened", "You can now send the link.");
    };
    cardDetailSettingController.prototype.deleteCard = function () {
        var self = this;
        if (self.baseController.isNullOrUndefined(self.cardDetail.idStructure)) {
            self.baseController.showMessage("Cannot delete card which has not been saved", "", ALERT_MESSAGE_TYPE.ERROR);
            return;
        }
        self.baseController.showMessage("Are you sure you want to delete the card ?", "Delete confirmation", ALERT_MESSAGE_TYPE.WARNING, true, self.confirmDelete, true, "Yes, i confirm the deletion of the card", "Cancel", null, self, null);
    };
    cardDetailSettingController.prototype.confirmDelete = function (caller) {
        var self;
        if (caller == null)
            self = this;
        else
            self = caller;
        self.baseController.showLoading();
        var _getBookingSettingDto = new getCardDto();
        _getBookingSettingDto.idStructure = self.cardDetail.idStructure;
        self.cardWebService.deleteCard(_getBookingSettingDto)
            .then(function (response) {
            if (response.status == STATUS_MESSAGE.SUCCESS) {
                self.baseController.showToast(ALERT_MESSAGE_TYPE.SUCCESS, "Card Deleted Successfully", "Card Deleted Successfully");
                window.location.href = "/card-list/";
            }
            else {
                self.baseController.showMessage(response.errorMessage, "", ALERT_MESSAGE_TYPE.ERROR);
            }
        }).catch(function (errorMsg) {
            self.baseController.showMessage(errorMsg, "An Error Has Occured On Server, Please Contact Server Admin", ALERT_MESSAGE_TYPE.ERROR);
        }).finally(function () {
            self.baseController.hideLoading();
        });
    };
    // Function to generate QR code
    cardDetailSettingController.prototype.generateQRCode = function () {
        var self = this;
        var link = "";
        if (self.baseController.isNullOrUndefined(self.cardDetail) || self.baseController.isNullOrUndefined(self.cardDetail.qrCodeUrl)) {
            return;
        }
        link = self.cardDetail.fullSlugUrl;
        console.log(document.getElementById("qrcode"));
        var qrcode = new QRCode(document.getElementById("qrcode"), {
            text: link,
            width: 300,
            height: 300,
        });
    };
    return cardDetailSettingController;
}());
cardModule.controller("cardDetailSettingController", ["$scope",
    "$parse",
    "toaster",
    "cardWebService",
    cardDetailSettingController
]);

var cardDetailCreationController = /** @class */ (function () {
    function cardDetailCreationController($scope, $parse, toaster, cardWebService) {
        this.$scope = $scope;
        this.$parse = $parse;
        this.toaster = toaster;
        this.groupName = cardDetailTabNameFromEnum.getName(cardDetailTab.SETTINGS);
        this.cardDetailTabEnum = cardDetailTab;
        this.scope = $scope;
        this.scope.controller = this;
        this.callerController = $scope.$parent.controller;
        this.baseController = $scope.baseController;
        this.cardWebService = cardWebService;
        this.callerController.registerCardDetailCreationController(this);
        this.initialize();
    }
    Object.defineProperty(cardDetailCreationController.prototype, "hasScreenDetailBeenLoaded", {
        get: function () {
            return this.callerController.hasScreenDetailBeenLoaded;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailCreationController.prototype, "hasCardDetailBeenLoaded", {
        get: function () {
            return this.callerController.hasCardDetailBeenLoaded;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailCreationController.prototype, "screenMode", {
        get: function () {
            return this.callerController.screenModeManager.currentMode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailCreationController.prototype, "cardDetail", {
        get: function () {
            return this.callerController.screenModeManager.entity;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailCreationController.prototype, "isEditable", {
        get: function () {
            var self = this;
            return self.callerController.isEditable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailCreationController.prototype, "isNew", {
        get: function () {
            var self = this;
            return self.callerController.isNew;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailCreationController.prototype, "formName", {
        get: function () {
            return this.callerController.formName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailCreationController.prototype, "isCardStateEditable", {
        get: function () {
            var self = this;
            var isAdmin = self.baseController.commonController.isAdmin();
            return self.callerController.isEditable && isAdmin;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailCreationController.prototype, "step", {
        get: function () {
            var self = this;
            return self.callerController.step;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailCreationController.prototype, "cardDetailStepInfo", {
        get: function () {
            var self = this;
            return self.callerController.cardDetailStepInfo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailCreationController.prototype, "arrowClass", {
        get: function () {
            var self = this;
            var position = "";
            if (self.step == 1 || self.step == 2) {
                return 'arrow-pos-1';
            }
            else if (self.step == 3) {
                return 'arrow-pos-3';
            }
            else if (self.step == 4) {
                return 'arrow-pos-4';
            }
            return '';
        },
        enumerable: true,
        configurable: true
    });
    cardDetailCreationController.prototype.initialize = function () {
        var self = this;
        self.registerValidations();
    };
    cardDetailCreationController.prototype.registerValidations = function () {
        var self = this;
        if (self.formValidator != null) {
            self.formValidator.deRegister();
        }
        self.formValidator = new formValidator(this.$parse, this.toaster, self.scope, self.formName);
        self.formValidator.registerGroupValidation(self.groupName, []);
    };
    cardDetailCreationController.prototype.onDetailLoaded = function () {
        var self = this;
    };
    cardDetailCreationController.prototype.upload = function (file, arrayToUpload, isArray) {
        var self = this;
        self.baseController.upload(file, arrayToUpload, isArray);
    };
    cardDetailCreationController.prototype.deleteImage = function (picture, pictureDataList, isArray) {
        var self = this;
        self.baseController.deleteImage(picture, pictureDataList, isArray);
    };
    cardDetailCreationController.prototype.onNextClick = function () {
        var self = this;
        self.callerController.onNextClick();
    };
    return cardDetailCreationController;
}());
cardModule.controller("cardDetailCreationController", ["$scope",
    "$parse",
    "toaster",
    "cardWebService",
    cardDetailCreationController
]);
