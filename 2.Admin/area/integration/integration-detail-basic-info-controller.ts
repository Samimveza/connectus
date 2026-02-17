class integrationDetailBasicInfoController implements IChildIntegrationDetailController {
    scope;
    baseController: baseController;
    callerController: IIntegrationDetailBasicInfoCaller;
    groupName: string = integrationDetailTabNameFromEnum.getName(integrationDetailTab.BASIC_INFO);

    integrationWebService: integrationWebService;

    formValidator: formValidator;
    integrationDetailTabEnum = integrationDetailTab;
    isSiteUrlAvailable: boolean = true;

    mapInstance;
    locationMarker;
    autocomplete;

    constructor(private $scope
        , private $parse
        , private toaster
        , integrationWebService
    ) {
        this.scope = $scope;
        this.scope.controller = this;
        this.callerController = $scope.$parent.controller;
        this.baseController = $scope.baseController;
        this.integrationWebService = integrationWebService;

        this.callerController.registerIntegrationDetailBasicInfoController(this);
        this.initialize();
    }


    get hasScreenDetailBeenLoaded(): boolean {
        return this.callerController.hasScreenDetailBeenLoaded;
    }

    get hasIntegrationDetailBeenLoaded(): boolean {
        return this.callerController.hasIntegrationDetailBeenLoaded;
    }

    get screenMode(): SCREEN_MODE {
        return this.callerController.screenModeManager.currentMode;
    }

    get integrationDetail(): integrationDetailViewModel {
        return this.callerController.screenModeManager.entity;
    }


    get isEditable(): boolean {
        var self = this;
        return self.callerController.isEditable;
    }

    get isNew(): boolean {
        var self = this;
        return self.callerController.isNew;
    }
    get formName(): string {
        return this.callerController.formName;
    }

    get isIntegrationStateEditable() {
        var self = this;

        var isAdmin = self.baseController.commonController.isAdmin();

        return self.callerController.isEditable && isAdmin;
    }


    public initialize() {
        var self = this;
        self.registerValidations();
    }

    public registerValidations() {
        var self = this;
        if (self.formValidator != null) {
            self.formValidator.deRegister();
        }

        self.formValidator = new formValidator(this.$parse, this.toaster, self.scope, self.formName);

        self.formValidator.registerValidationForMandatory(self.scope, 'enterpriseName', 'Nom du magasin');


        self.formValidator.registerGroupValidation(self.groupName, ['enterpriseName'])
    }

    public onDetailLoaded() {
        var self = this;
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

integrationModule.controller("integrationDetailBasicInfoController"
    , ["$scope"
        , "$parse"
        , "toaster"
        , "integrationWebService"
        , integrationDetailBasicInfoController
    ]);
