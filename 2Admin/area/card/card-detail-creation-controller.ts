class cardDetailCreationController implements IChildCardDetailController {
    scope;
    baseController: baseController;
    callerController: ICardDetailCreationCaller;
    groupName: string = cardDetailTabNameFromEnum.getName(cardDetailTab.SETTINGS);

    cardWebService: cardWebService;

    formValidator: formValidator;
    cardDetailTabEnum = cardDetailTab;

    constructor(private $scope
        , private $parse
        , private toaster
        , cardWebService
    ) {
        this.scope = $scope;
        this.scope.controller = this;
        this.callerController = $scope.$parent.controller;
        this.baseController = $scope.baseController;
        this.cardWebService = cardWebService;

        this.callerController.registerCardDetailCreationController(this);
        this.initialize();
    }


    get hasScreenDetailBeenLoaded(): boolean {
        return this.callerController.hasScreenDetailBeenLoaded;
    }

    get hasCardDetailBeenLoaded(): boolean {
        return this.callerController.hasCardDetailBeenLoaded;
    }

    get screenMode(): SCREEN_MODE {
        return this.callerController.screenModeManager.currentMode;
    }

    get cardDetail(): cardDetailViewModel {
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

    get isCardStateEditable() {
        var self = this;

        var isAdmin = self.baseController.commonController.isAdmin();

        return self.callerController.isEditable && isAdmin;
    }

    get step() {
        var self = this;
        return self.callerController.step;
    }

    get cardDetailStepInfo() {
        var self = this;
        return self.callerController.cardDetailStepInfo;
    }

    get arrowClass() {
        var self = this;
        var position = "";
        if (self.step == 1 || self.step == 2) {
            return 'arrow-pos-1';
        } else if (self.step == 3) {
            return 'arrow-pos-3';
        } else if (self.step == 4) {
            return 'arrow-pos-4';
        }

        return '';
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
        self.formValidator.registerGroupValidation(self.groupName, [])
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

    public onNextClick() {
        var self = this;
        self.callerController.onNextClick();
    }

    public goToStep(step) {
        var self = this;
        self.callerController.goToStep(step);
    }

}

cardModule.controller("cardDetailCreationController"
    , ["$scope"
        , "$parse"
        , "toaster"
        , "cardWebService"
        , cardDetailCreationController
    ]);
