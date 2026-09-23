class cardDetailEducationController implements IChildCardDetailController {
    scope;
    baseController: baseController;
    callerController: ICardDetailEducationCaller;
    groupName: string = cardDetailTabNameFromEnum.getName(cardDetailTab.EDUCATION);

    cardWebService: cardWebService;

    formValidator: formValidator;
    cardDetailTabEnum = cardDetailTab;

    // Drag state for education items
    public educationDragStartIndex: number = null;

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

        this.callerController.registerCardDetailEducationController(this);
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

    set cardDetail(value: cardDetailViewModel) {    
        this.callerController.screenModeManager.entity = value;
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

    public addEducation() {
        var self = this;
        if (!self.cardDetail.education) {
            self.cardDetail.education = [];
        }

        var education = new educationModel();
        education.idLocal = self.baseController.generateUUID();
        education.displayOrder = self.cardDetail.education.length + 1;
        education.skills = [];
        education.media = [];
        self.cardDetail.education.push(education);
    }

    public removeEducation(education) {
        var self = this;
        var position = self.baseController.searchForEntityInList("idStructureEducation", self.cardDetail.education, education, "idLocal");

        if (!self.baseController.isNullOrUndefined(position) && position > -1) {
            self.cardDetail.education.splice(position, 1);
        }

        // Update display order for remaining education items
        this.cardDetail.education.forEach((education: any, i: number) => {
            education.displayOrder = i + 1;
        });
    }

    // Education Drag and Drop Methods
    public handleEducationDragStart(event: DragEvent, index: number): void {
        this.educationDragStartIndex = index;
        if (event.dataTransfer) {
            event.dataTransfer.effectAllowed = 'move';
        }
    }

    public handleEducationDragOver(event: DragEvent, index: number): void {
        event.preventDefault(); // Allow drop
    }

    public handleEducationDrop(event: DragEvent, dropIndex: number): void {
        event.preventDefault();

        const fromIndex = this.educationDragStartIndex;
        const toIndex = dropIndex;

        if (fromIndex === null || fromIndex === toIndex) return;

        const item = this.cardDetail.education[fromIndex];
        this.cardDetail.education.splice(fromIndex, 1);
        this.cardDetail.education.splice(toIndex, 0, item);

        // Update displayOrder
        this.cardDetail.education.forEach((education: any, i: number) => {
            education.displayOrder = i + 1;
        });

        this.educationDragStartIndex = null;
        this.$scope.$apply(); // trigger digest
    }

    public handleEducationDragEnd(event: DragEvent): void {
        this.educationDragStartIndex = null;
    }

    // Education Skills Methods
    public addSkill(education): void {
        var self = this;
        if (!education.skills) {
            education.skills = [];
        }

        const newSkill = {
            name: '',
            idLocal: self.baseController.generateUUID(),
            idStructureEducation: education.idLocal
        };
        education.skills.push(newSkill);
    }

    public removeSkill(education, skill): void {
        var self = this;
        var position = self.baseController.searchForEntityInList("idStructureEducationSkill", education.skills, skill, "idLocal");
        if (!self.baseController.isNullOrUndefined(position) && position > -1) {
            education.skills.splice(position, 1);
        }
    }

    // Education Media Methods
    public addMedia(education): void {
        var self = this;
        if (!education.media) {
            education.media = [];
        }

        const newMedia = {
            idLocal: self.baseController.generateUUID(),
            idStructureEducation: education.idLocal,
            document: new pictureDataModel()
        };
        education.media.push(newMedia);
    }

    public removeMedia(education, media): void {
        var self = this;
        var position = self.baseController.searchForEntityInList("idStructureEducationMedia", education.media, media, "idLocal");
        if (!self.baseController.isNullOrUndefined(position) && position > -1) {
            education.media.splice(position, 1);
        }
    }
}

cardModule.controller("cardDetailEducationController"
    , ["$scope"
        , "$parse"
        , "toaster"
        , "cardWebService"
        , cardDetailEducationController
    ]);
