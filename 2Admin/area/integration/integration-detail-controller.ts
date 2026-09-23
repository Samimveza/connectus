class integrationDetailController implements IIntegrationDetailBasicInfoCaller {

    isExpired: boolean;
    scope;
    baseController: baseController;
    integrationDetailWebService: integrationWebService;
    screenModeManager: screenModeManager<integrationDetailViewModel, integrationDetailController>;
    id: string;
    previsualizeUrl: string = '';

    preloadedData: {
       

    } = {

        };

    formValidator: formValidator;

    childControllers: IChildIntegrationDetailController[] = [];

    integrationDetailBasicInfoController: integrationDetailBasicInfoController;

    formName: string = 'integrationDetailForm';
    hasScreenDetailBeenLoaded: boolean;
    hasIntegrationDetailBeenLoaded: boolean;

    currentState: integrationDetailTab = integrationDetailTab.BASIC_INFO;
    integrationDetailTab = integrationDetailTab;

    viewState;

    constructor($scope
        , private $parse
        , private toaster
        , integrationDetailWebService) {
        var self = this;

        $scope.controller = this;
        this.integrationDetailWebService = integrationDetailWebService;

        this.scope = $scope;

        this.baseController = this.scope.baseController;

        this.initVariables();
        this.registerValidations();
    }

    get screenMode(): SCREEN_MODE {
        return this.screenModeManager.currentMode;
    }

    get integrationDetail(): integrationDetailViewModel {
        return this.screenModeManager.entity;
    }

    registerIntegrationDetailBasicInfoController(integrationDetailBasicInfoController: integrationDetailBasicInfoController) {
        this.integrationDetailBasicInfoController = integrationDetailBasicInfoController;
        this.childControllers.push(integrationDetailBasicInfoController);
    }


    get isNew(): boolean {
        var self = this;

        return self.baseController.isNullOrUndefined(self.id);
    }

    get isEditable(): boolean {
        var self = this;

        if (!self.baseController.commonController.hasEditPermission()) {
            return false;
        }

        return self.screenModeManager.currentMode == SCREEN_MODE.ADD || self.screenModeManager.currentMode == SCREEN_MODE.EDIT;
    }


    public initVariables() {
        var self = this;
        this.baseController = this.scope.baseController;
    }

    public setInfo(id: string, mode: SCREEN_MODE, viewState) {
        var self = this;
        self.formValidator = new formValidator(self.$parse, self.toaster, self.scope, self.formName);
        self.id = id;
        self.viewState = viewState;


        self.screenModeManager = new screenModeManager<integrationDetailViewModel, integrationDetailController>(self, self.saveMethod, false);
        self.screenModeManager.currentMode = mode;
        self.loadScreenConstants();

        if (mode == SCREEN_MODE.ADD) {
            var _integration: integrationDetailViewModel = new integrationDetailViewModel();
           

            self.screenModeManager.setEntity(self.formatEntity(_integration));
            self.onIntegrationDetailLoaded();

        } else {
            self.loadEntity();
        }

        self.initialize();
    }

    public initialize() {
        var self = this;
    }

    public loadEntity() {
        var self = this;
        self.baseController.showLoading();
        var _getBookingSettingDto = new getIntegrationDto();
        _getBookingSettingDto.idIntegrationType = self.id;

        self.integrationDetailWebService.getIntegration(_getBookingSettingDto)
            .then(function (response: baseResultReturnType<integrationModel>) {
                if (response.status == STATUS_MESSAGE.SUCCESS) {
                    self.screenModeManager.setEntity(self.formatEntity(response.result));
                    self.onIntegrationDetailLoaded();
                } else {
                    self.baseController.showMessage(response.errorMessage, "", ALERT_MESSAGE_TYPE.ERROR);
                }
            }).catch(function (errorMsg) {
                self.baseController.showMessage(errorMsg, "We encountered a problem while processing your request. Please try again later or contact support (contact@connectus.mu) if the issue persists.", ALERT_MESSAGE_TYPE.ERROR);
            }).finally(function () {
                self.baseController.hideLoading();
            });
    }

    public formatEntity(entity: integrationModel): integrationDetailViewModel {
        var self = this;
        var returnData: integrationDetailViewModel = JSON.parse(JSON.stringify(entity));


        return self.applyObjectCorrections(returnData);
    }

    public applyObjectCorrections(item: integrationDetailViewModel) {
        var self = this;

       
        return item;
    }

  
    public saveMethod(modifiedEntity: integrationDetailViewModel, caller: integrationDetailController) {
        var self: integrationDetailController = caller;

        self.registerValidations();

        if (!self.validateForGroups()) {
            self.screenModeManager.setMode(SCREEN_MODE.EDIT);
            return;
        }

        var _saveIntegrationDto: saveIntegrationDto = self.formatEntityBeforeSave(self.integrationDetail);

        self.baseController.showLoading();

        self.integrationDetailWebService.saveIntegration(_saveIntegrationDto)
            .then(function (response: baseResultReturnType<integrationModel>) {
                if (response.status == STATUS_MESSAGE.SUCCESS) {
                    self.baseController.showToast(TOASTER_TYPE.SUCCESS, "Enregistré avec succès");
                    self.screenModeManager.setEntity(self.formatEntity(response.result));
                    self.id = response.result.idIntegration;
                } else {
                    self.baseController.showMessage(response.errorMessage, "", ALERT_MESSAGE_TYPE.ERROR, false, null, true);
                }

            }).catch(function (errorMsg) {
                self.baseController.showMessage(errorMsg, "We encountered a problem while processing your request. Please try again later or contact support (contact@connectus.mu) if the issue persists.", ALERT_MESSAGE_TYPE.ERROR);
                self.screenModeManager.setMode(SCREEN_MODE.EDIT);
            }).finally(function () {
                self.baseController.hideLoading();
            });
    }


    public registerValidations() {
        var self = this;
        for (var i = 0; i < self.childControllers.length; i++) {
            var currentChild = self.childControllers[i];
            currentChild.registerValidations();
        }
    }

    public validateForGroups(): boolean {
        var self = this;
        var isValid: boolean = true;

        var errorMessages: string[] = [];
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
    }

    public idGroupValid(profileTab: integrationDetailTab): boolean {
        var self = this;
        let isValid: boolean = true;

        let groupName = integrationDetailTabNameFromEnum.getName(profileTab);
        let childValidator: IChildIntegrationDetailController = Enumerable.From(self.childControllers).Where(function (childController: IChildIntegrationDetailController) {
            return childController.groupName == groupName
        }).FirstOrDefault(null);

        if (childValidator != null && childValidator.hasScreenDetailBeenLoaded) {
            isValid = childValidator.formValidator.validateGroup(groupName, false)
        }

        return isValid;
    }

    public loadScreenConstants() {
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
        //        self.baseController.showMessage(errorMsg, "We encountered a problem while processing your request. Please try again later or contact support (contact@connectus.mu) if the issue persists.", ALERT_MESSAGE_TYPE.ERROR);
        //    }).finally(function () {
        //        self.baseController.hideLoading();
        //    });
    }

    public onIntegrationDetailLoaded() {
        var self = this;
        self.hasIntegrationDetailBeenLoaded = true;



        self.onAllDetailLoaded();
    }

    public onScreenDetailLoaded() {
        var self = this;
        self.hasScreenDetailBeenLoaded = true;
        self.onAllDetailLoaded();
    }

    public onAllDetailLoaded() {
        var self = this;
        if (self.hasScreenDetailBeenLoaded && self.hasIntegrationDetailBeenLoaded) {
            self.formatOnAllDetail();

            self.childControllers.forEach(function (controller: IChildIntegrationDetailController) {
                controller.onDetailLoaded();
            })
        }
    }

    public formatOnAllDetail() {
        var self = this;

       

    }

    public formatEntityBeforeSave(entity: integrationDetailViewModel): saveIntegrationDto {
        var self = this;
        var formattedEntity: saveIntegrationDto = self.baseController.cloneObject(entity);

    

        return formattedEntity;
    }

    public setCurrentState(integrationDetailTab: integrationDetailTab) {
        var self = this;
        self.currentState = integrationDetailTab;
    }

    public upload(file, arrayToUpload, isArray) {
        var self = this;
        self.baseController.upload(file, arrayToUpload, isArray)
    }

    public deleteImage(picture: pictureDataModel, pictureDataList: pictureDataModel[], isArray) {
        var self = this;
        self.baseController.deleteImage(picture, pictureDataList, isArray);
    }
}

integrationModule.controller("integrationDetailController"
    , ["$scope"
        , "$parse"
        , "toaster"
        , "integrationWebService"
        , integrationDetailController
    ]);

enum integrationDetailTab {
    BASIC_INFO = 1,
   
}

class integrationDetailTabNameFromEnum {
    static getName(_subscriptionSettingTab: integrationDetailTab) {
        let name: string;

        switch (_subscriptionSettingTab) {
            case integrationDetailTab.BASIC_INFO:
                name = 'BASIC_INFO';
                break;


        }
        return name;
    }
}

class integrationDetailViewModel extends integrationModel {
   
}
