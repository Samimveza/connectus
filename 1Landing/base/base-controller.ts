class baseController {
    $scope;
    $rootScope;
    $location;
    $anchorScroll;
    $localStorage;
    $window;
    $timeout;
    $uibModal;
    $document;
    $parse;
    layoutCustomisation: layoutCustomisation;
    SweetAlert;
    toaster;
    globalVariableFactory: globalVariableFactory;
    isCpfLoadingInProgress: boolean = false;
    modalInstanceForLoading = null;
    isFooterShown: boolean = false;
    pageSizeList: any[];
    pageSizeLargerList: any[];
    q: ng.IQService;
    state: string;
    moment;
    actionName: string;
    areaName: string;
    confirmBtnColor: string;
    datePickersState;
    ckeditorOptions;
    datepickerOptions;
    formWizard: {
        form: any,
        currentStep: number
        validationForStep?: {},
        controller: any
    }
    columnEnums: any;
    modeEnums;
    loginStatusEnum;
    roleEnum;
    authenticationTypeEnum;
    isInitialized: boolean = false;
    loadedControllerInstances: controllerInstanceDetail[] = [];
    loadedControllerInstancesListeners: controllerInstanceListenerDetail[] = [];
    areFileTypeBeingLoaded: boolean = false;
    fileUploadStates: fileUploadStateModel[] = [];

    loadingMessages: string = "test";
    signalR;
    commomModel: any = {};

    isLoadingShown: boolean = false;
    uploadService;


    //MAP RELATED
    autocomplete: any = [];
    onPlaceSearchedCallerFunction;
    onPlaceSearchedCallerInstance;
    searchData = {
        searchPlaceHolder:null,
        selectedCity: null,
        selectedPostalCode: null,
        selectedLatLng: null,
        selectedRegion: null,
        selectedPrestation: [],
    }


    get tinymceOptions() {
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
    }

    get tinymceBasicOptions() {
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
    }

    get commonController(): commonController {
        var self = this;
        var controller = self.getLoadedControllerByName('commonController');
        if (controller != null) {
            return controller.instance;
        }
        return null;
    }

    permissionEnum;

    constructor(
        $scope,
        $rootScope,
        $location,
        $anchorScroll,
        $localStorage,
        $window,
        $timeout,
        $uibModal,
        $q,
        $document,
        $parse,
        SweetAlert,
        toaster,
        globalVariableFactory: globalVariableFactory,
        Upload
    ) {
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

    public initializeVariables() {
        var self = this;
        self.initializeTemplate();
        self.pageSizeList = [
            { text: "10", value: 10 }
            , { text: "20", value: 20 }
            , { text: "30", value: 30 }
            , { text: "50", value: 50 }
            , { text: "100", value: 100 }
        ];
        self.pageSizeLargerList = [
            { text: "100", value: 100 }
            , { text: "200", value: 200 }
            , { text: "400", value: 400 }
        ];
        self.columnEnums =
        {
        };
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
        }

        self.confirmBtnColor = "";
        this.permissionEnum = permissions;
        this.preventFromNavigatingAwayIfSamePage();
        this.goToSectionWithOffsetIfSet();
    }

    public getBaseLocation(): geoLocation {
        var self = this;
        if (window.localStorage.getItem("CenterLocation") == null) {
            var _geolocation: geoLocation = new geoLocation();
            navigator.geolocation.getCurrentPosition(function (location) {
                _geolocation.lat = location.coords.latitude;
                _geolocation.lng = location.coords.longitude;
                _geolocation.zoom = 10;
                window.localStorage.setItem("CenterLocation", JSON.stringify(_geolocation));
            }, function (error) {
                alert("Please enable location on browser");
            }, { timeout: 10000 });
        } else {
            var geoString = window.localStorage.getItem("CenterLocation");
            _geolocation = JSON.parse(geoString);
        }
        return _geolocation;
    }


    public getLoadedControllerByName(controllerName: string) {
        var self = this;


        return Enumerable.From(self.loadedControllerInstances).Where(function (_listenerControllerInstance: controllerInstanceDetail) {
            return _listenerControllerInstance.controllerName == controllerName;
        }).FirstOrDefault(null);
    }

    public addLoadedControllerInstance(controllerInstance: controllerInstanceDetail) {
        var self = this;

        self.loadedControllerInstances.push(controllerInstance);

        self.notifyListenersForLoadedController(controllerInstance);
    }


    public notifyListenersForLoadedController(loadedControllerInstance: controllerInstanceDetail) {
        var self = this;
        var listenerList: controllerInstanceListenerDetail = Enumerable.From(self.loadedControllerInstancesListeners).Where(function (listener: controllerInstanceListenerDetail) {
            return listener.controllerName == loadedControllerInstance.controllerName;
        }).FirstOrDefault(null);

        if (listenerList != null) {
            listenerList.listenerFunctions.forEach(function (listener: controllerInstanceListenerFunctionDetail) {
                listener.function(loadedControllerInstance.instance, listener.callerInstance)
            })
        }
    }

    public addListenerToControllerInstance(controllerToListenName: string, listener: controllerInstanceListenerFunctionDetail) {
        var self = this;

        var controllerToListen: controllerInstanceListenerDetail = Enumerable.From(self.loadedControllerInstancesListeners).Where(function (controllerInstances: controllerInstanceListenerDetail) {
            return controllerInstances.controllerName == controllerToListenName;
        }).FirstOrDefault(null);

        if (controllerToListen == null) {
            controllerToListen = new controllerInstanceListenerDetail();
            controllerToListen.controllerName = controllerToListenName;
            controllerToListen.listenerFunctions = [listener];
            self.loadedControllerInstancesListeners.push(controllerToListen);
        } else {
            controllerToListen.listenerFunctions.push(listener);
        }
    }


    public getOrAddToListenerControllerInstance(controllerToListenName: string, listener: controllerInstanceListenerFunctionDetail) {
        var self = this;
        var instance: controllerInstanceDetail = Enumerable.From(self.loadedControllerInstances).Where(function (_listenerControllerInstance: controllerInstanceDetail) {
            return _listenerControllerInstance.controllerName == controllerToListenName
        }).FirstOrDefault(null);

        if (instance == null) {
            self.addListenerToControllerInstance(controllerToListenName, listener);
            return null;
        } else {
            return instance.instance;
        }
    }



    public initializeTemplate() {
        var self = this;
    }

    public saveTemplateLayout() {
        var self = this;
        self.$window.sessionStorage.setItem(CUSTOM_VARIABLES.LAYOUT, JSON.stringify(self.layoutCustomisation));
    }

    public initFormWizard(form: any, validationForStep: any, controller: any) {
        var self = this;
        self.formWizard = {
            form: form,
            currentStep: 1,
            validationForStep: validationForStep,
            controller: controller
        };
    }

    public formWizardNext() {
        var self = this;
        self.toTheTop();
        if (self.validateForm(self.formWizard.form) && self.execValidationsForStep(self.formWizard.currentStep)) {
            self.formWizardNextStep();
        }
    }

    public formWizardPrevious() {
        var self = this;
        self.toTheTop();
        self.formWizardPrevStep();
    }
    public formWizardGoTo(step: number) {
        var self = this;

        if ((self.formWizard.currentStep) > (step)) { //go back
            self.toTheTop();
            self.formWizardGoToStep(step);

        } else {
            if (self.validateForm(self.formWizard.form) && self.execValidationsForStep(self.formWizard.currentStep)) { //go next
                self.toTheTop();
                self.formWizardGoToStep(step);
            }
        }
    }
    public formWizardSubmit() {

    }
    public formWizardReset() {

    }

    public formWizardNextStep() {
        var self = this;
        self.formWizard.currentStep++;
    }

    public formWizardPrevStep() {
        var self = this;
        self.formWizard.currentStep--;
    }

    public formWizardGoToStep(step: number) {
        var self = this;
        self.formWizard.currentStep = step;
    }
    public execValidationsForStep(step: number) {
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
    }

    public toTheTop() {
        var self = this;
        self.$document.scrollTopAnimated(0, 600);
    }

    public showFooter() {
        this.isFooterShown = true;
    }

    public hideFooter() {
        this.isFooterShown = true;
    }

    public showMessage(message: string, title: string, messageType: string, showCancelButton: boolean = false, okCallback = null, isHtml = false, okButtonText = "Ok", cancelButttonText = "Cancel", cancelCallback = null, caller = null, params: any = null) {
        var self = this;

        if (messageType == ALERT_MESSAGE_TYPE.ERROR && self.isNullOrUndefined(isHtml))
            isHtml = true;

        if (messageType == ALERT_MESSAGE_TYPE.WARNING || messageType == ALERT_MESSAGE_TYPE.ERROR) {
            self.confirmBtnColor = "#da4f4a";
        } else {
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
            } else {
                if (cancelCallback != null)
                    cancelCallback(caller);
            }
        });
    }
    public showCustomModal(modalController, modalTemplateUrl, caller, dataToPass, onOk, onCancel, size = 'lg', backdrop = '', cssClass = '', shouldShareSameScope = false
        , windowTopClass = '', scrollable = false
    ) {

        var self = this;
        var modalData: any = {
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
                    return self
                }
            }
        }
        if (shouldShareSameScope) {
            modalData.scope = self.$scope
        }
        var modalInstance = self.$uibModal.open(modalData);

        modalInstance.result.then(onOk, onCancel);
        return modalInstance;
    }

    public showLoading() {
        var self = this;
        self.isLoadingShown = true;
        //if (self.modalInstanceForLoading == null) {
        //    self.modalInstanceForLoading = self.$uibModal.open({
        //        template: '<div class="modal-body modal-loading-body" ><img src="' + self.globalVariableFactory.cdnUrl + '/Images/loader.svg" style="width:125px;"></div>',
        //        backdrop: 'static',
        //        windowClass: 'loading-center-modal'
        //    });
        //}
    }

    public hideLoading() {
        var self = this;
        self.isLoadingShown = false;

        //if (self.modalInstanceForLoading != null) {
        //    self.modalInstanceForLoading.close();
        //    self.modalInstanceForLoading = null;
        //}
    }

    public showToast(toasterType: TOASTER_TYPE, toasterTitle: string, toasterText: string = "") {
        this.toaster.pop(toasterType, toasterTitle, toasterText);
    }

    public isNullOrUndefined(val) {
        return angular.isUndefined(val) || val == null;
    }

    public getAbbreviation(word: string) {
        return word.toUpperCase().match(/\b\w/g).join('');
    }

    public validateForm(form) {
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
    }

    public searchForEntityInList(entityIdName: string, list: any[], comparisonCriteria, localIdName: string = null): number {
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
            } else {
                return positionOfEntity;
            }
        } else {
            return null;
        }
    }

    public cloneObject(obj) {
        return JSON.parse(JSON.stringify(obj), dateParser.dateParserScreenMode);
    }

    public generateUUID() { // Public Domain/MIT
        var d = new Date().getTime();
        if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
            d += performance.now(); //use high-precision timer if available
        }
        return 'xxxxxxxx_xxxx_4xxx_yxxx_xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }

    public toggleDatePicker(id: string) {
        var self = this;
        if (self.isNullOrUndefined(self.datePickersState[id])) {
            self.datePickersState[id] = true;
        } else {
            self.datePickersState[id] = !self.datePickersState[id];
        }
    }

    public getFileExtension(fileName: string): string {
        var self = this;
        var re = /(?:\.([^.]+))?$/;
        return re.exec(fileName)[1];
    }

    public getFileNameWithoutExtension(fileName: string): string {
        var self = this;
        return fileName.substring(0, fileName.lastIndexOf('.'))
    }


    public redirectToUrlFromBase(url: string) {
        var self = this;
        self.$window.location = self.globalVariableFactory.baseServerUrl + "/" + url;
    }

    public getRandomColorCode() {
        var self = this;
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    public getClientSlug() {
        return window.location.host.split('.')[1] ? window.location.host.split('.')[0] : null;
    }

    public getStorageForSessionData() {
        var self = this;
        return self.$window.localStorage;
    }

    public getEditorOptions() {
        var self = this;
        return [
            ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre', 'quote'],
            ['bold', 'italics', 'underline', 'strikeThrough', 'ul', 'ol', 'redo', 'undo', 'clear'],
            ['justifyLeft', 'justifyCenter', 'justifyRight', 'indent', 'outdent'],
            ['html', 'insertImage', 'insertLink', 'insertVideo', 'wordcount', 'charcount']
        ];
    }

    public formatToDateOnly(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }


    public uploadFile(file, ignoreFileSize = false): ng.IPromise<baseResultReturnType<fileUploadReturnType>> {
        var self = this;
        var deferred: any = self.q.defer();

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
    }

    public upload(file, objectContainer, isArray) {
        var self = this;

        if (self.isNullOrUndefined(file)) {
            return;
        }

        self.showLoading();

        self.uploadFile(file)
            .then(function (response: baseResultReturnType<fileUploadReturnType>) {
                self.hideLoading();

                var _pictureData: pictureDataModel = new pictureDataModel();
                _pictureData.idDocumentLocal = self.generateUUID();

                _pictureData.name = response.result.name;
                _pictureData.idDocument = response.result.idDocument;
                _pictureData.url = response.result.url;


                if (isArray) {
                    objectContainer.push(_pictureData);
                } else {
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
            })
    }

    public deleteImage(picture: pictureDataModel, pictureDataList: pictureDataModel[], isArray) {
        var self = this;

        if (isArray) {
            console.log(picture);
            var position = self.searchForEntityInList("id", pictureDataList, picture, "idLocal");
            pictureDataList.splice(position, 1);
        } else {
            picture = null;
        }
    }

    public checkIfImageIsSquare(fileObject): ng.IPromise<boolean> {
        var self = this;
        var deferred: any = self.q.defer();

        var isValid = true;

        var fileUpload = fileObject;

        if (typeof (fileUpload) != "undefined") {
            var reader = new FileReader();
            reader.readAsDataURL(fileUpload);
            reader.onload = function (e: any) {
                var image = new Image();
                image.src = e.target.result;
                image.onload = function () {
                    var _element: any = this;

                    var _height: number = _element.height;
                    var _width: number = _element.width;

                    if (_width >= _height + 20 || _width <= _height - 20) {
                        deferred.reject("La taille de l'image est incorrecte");
                    }

                    deferred.resolve(true);
                };
            }
        } else {
            deferred.reject("HTML5 unsuported");
        }

        return deferred.promise;

    }

    public validateImage(fileObject, width = null, height = null): ng.IPromise<boolean> {
        var self = this;
        var deferred: any = self.q.defer();

        var isValid = true;
        var error = null;

        var fileUpload = fileObject;
        var regex = new RegExp("([a-zA-Z0-9\s_\\.\-:])+(.jpg|.png|.gif|jpeg|svg)$");
        if (regex.test(fileUpload.name.toLowerCase())) {

            if (typeof (fileUpload) != "undefined") {
                var reader = new FileReader();
                reader.readAsDataURL(fileUpload);
                reader.onload = function (e: any) {
                    var image = new Image();
                    image.src = e.target.result;
                    image.onload = function () {
                        var _element: any = this;

                        var _height: number = _element.height;
                        var _width: number = _element.width;

                        if (!self.isNullOrUndefined(width) && !eval(_width.toString() + ' ' + width)) {
                            deferred.reject("La taille de l'image est incorrecte");
                        }
                        if (!self.isNullOrUndefined(height) && !eval(_height.toString() + ' ' + height)) {
                            deferred.reject("La taille de l'image est incorrecte");
                        }

                        deferred.resolve(true);
                    };
                }
            } else {
                deferred.reject("HTML5 unsuported");
            }
        } else {
            deferred.reject("Le fichier téléchargé n'est pas une image");
        }

        //return {
        //    isValid: isValid,
        //    error: error
        //};

        return deferred.promise;
    }

    public openImageModal(image: any, scope) {
        var self = this;

        self.globalVariableFactory.sessionVariables.putVariableInSessionSpace(sessionVariableSpaceEnum.SERVICE_PROVIDER_CONTROLLER, "CONTROLLER", self);

        self.globalVariableFactory.sessionVariables.putVariableInSessionSpace(sessionVariableSpaceEnum.TRANSFER, "IMAGEDATA", image)


        self.showCustomModal('',
            self.globalVariableFactory.baseServerUrl + 'imageModal',
            self,
            {
                $scope: scope,
            },
            self.onOpenImageModalOk,
            () => { },
            'lg', '', '', true);
    }

    public onOpenImageModalOk() {

    }


    public goToSection(sectionId) {
        var self = this;
        if (self.$location.hash() !== sectionId) {
            self.$location.hash(sectionId);
        } else {
            self.$anchorScroll();
        }
    }

    public goToSectionWithOffsetIfSet(idToNavigateTo = null) {
        var self = this;

        var paramValue = null
        if (idToNavigateTo == null) {
            var currentUrl = new URL(window.location.href);
            var params = new URLSearchParams(currentUrl.search);
            paramValue = params.get("section");
        } else {
            paramValue = idToNavigateTo;
        }

        if (!self.isNullOrUndefined(paramValue)) {

            var section = document.getElementById(paramValue);

            if (!self.isNullOrUndefined(section)) {
                var scrollTop = 170;// window.innerWidth <= 991 ? 360 : 180;
                console.log(scrollTop);
                $('html, body').animate({
                    scrollTop: $("#" + paramValue).offset().top - scrollTop
                }, 1);
            }
        }
    }

    public preventFromNavigatingAwayIfSamePage() {
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

                    self.goToSectionWithOffsetIfSet(paramSection)
                }
            });
        }
    }

    //This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
    public calcCrow(lat1, lon1, lat2, lon2) {
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
    }

    // Converts numeric degrees to radians
    public toRad(Value) {
        return Value * Math.PI / 180;
    }

    public isImage(fileUrl) {
        var self = this;
        if (!fileUrl) return false;
        // Check if the URL ends with common image extensions
        return /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i.test(fileUrl);
    }

    public initializeMapIfAvailable(searchPlaceHolder, onPlaceSearchedCallerFunction, onPlaceSearchedCallerInstance) {
        var self = this;

        self.onPlaceSearchedCallerFunction = onPlaceSearchedCallerFunction;
        self.onPlaceSearchedCallerInstance = onPlaceSearchedCallerInstance;
        self.searchData.searchPlaceHolder = searchPlaceHolder;


        var searchPlaceholderElement = document.getElementById(searchPlaceHolder);

        self.autocomplete[searchPlaceHolder] = new google.maps.places.Autocomplete(
            (document.getElementById(searchPlaceHolder)), {
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

        self.autocomplete[searchPlaceHolder].addListener('place_changed', () => {
            self.onPlaceSearched();
        });

        google.maps.event.addDomListener(searchPlaceholderElement, 'keydown', function (event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                self.onPlaceSearched();
            }
        });
    }


    public onPlaceSearched() {
        var self = this;
        var places = self.autocomplete[self.searchData.searchPlaceHolder].getPlace();

        self.searchData.selectedRegion = null;
        self.searchData.selectedCity = null;
        self.searchData.selectedPostalCode = null;
        self.searchData.selectedLatLng = null;

        if (!self.isNullOrUndefined(places.geometry) && !self.isNullOrUndefined(places.geometry.location)) {
            self.searchData.selectedLatLng = places.geometry.location.lat() + "," + places.geometry.location.lng()
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
    }

    public onSearchClicked() {
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
        } else {
            var elment: any = document.getElementById("place-search-input")
            city = elment.value;
        }

        if (!self.isNullOrUndefined(self.searchData.selectedPostalCode)) {
            postCode = self.searchData.selectedPostalCode.long_name;
        }

        if (!self.isNullOrUndefined(self.searchData.selectedLatLng)) {
            latlng = self.searchData.selectedLatLng;
        }

        var selectedPrestation = Enumerable.From(self.searchData.selectedPrestation).Where(function (prestation) {
            return !self.isNullOrUndefined(prestation) && !self.isNullOrUndefined(prestation.id)
        }).ToArray();

        var selectedPrestationId = Enumerable.From(selectedPrestation).Select(function (prestation) {
            return prestation.id;
        }).ToArray();


        prestation = selectedPrestationId.join(",");
        window.location.href = "/search?region=" + region + "&city=" + city
            + "&postcode=" + postCode
            + "&prestation=" + prestation
            + "&latlng=" + latlng;
    }

    public clearAllSearches() {
        var self = this;
        self.searchData.selectedPostalCode = null;
        self.searchData.selectedCity = null;
        self.searchData.selectedPrestation = [];

    }

    public areFiltersActive() {
        var self = this;
        return self.searchData.selectedPostalCode != null ||
            self.searchData.selectedCity != null ||
            self.searchData.selectedPrestation.length > 0;
    }

    public getMyLocation() {
        var self = this;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var lat = position.coords.latitude;
                var lng = position.coords.longitude;
                self.searchData.selectedLatLng = lat + "," + lng;
                self.onSearchClicked();
            });
        } else {
            self.showToast(TOASTER_TYPE.WARNING, "Votre navigateur n'a pas cette fonctionalite");
        }
    }
}

declare var google: any;