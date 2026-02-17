class cardDetailExperienceController implements IChildCardDetailController {
    scope;
    baseController: baseController;
    callerController: ICardDetailExperienceCaller;
    groupName: string = cardDetailTabNameFromEnum.getName(cardDetailTab.EXPERIENCE);

    cardWebService: cardWebService;

    formValidator: formValidator;
    cardDetailTabEnum = cardDetailTab;

    public experienceDragStartIndex: number = null;

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

        this.callerController.registerCardDetailExperienceController(this);
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

    public addExperience() {
        var self = this;
        if (!self.cardDetail.experience) {
            self.cardDetail.experience = [];
        }

        var experience = new experienceModel();
        experience.idLocal = self.baseController.generateUUID();
        experience.displayOrder = self.cardDetail.experience.length + 1;
        experience.skills = [];
        experience.media = [];
        self.cardDetail.experience.push(experience);
    }

    public removeExperience(experience) {
        var self = this;
        var position = self.baseController.searchForEntityInList("idStructureExperience", self.cardDetail.experience, experience, "idLocal");

        if (!self.baseController.isNullOrUndefined(position) && position > -1) {
            self.cardDetail.experience.splice(position, 1);
        }

        this.cardDetail.experience.forEach((experience: any, i: number) => {
            experience.displayOrder = i + 1;
        });
    }

    // Experience Drag and Drop Methods
    public handleExperienceDragStart(event: DragEvent, index: number): void {
        this.experienceDragStartIndex = index;
        if (event.dataTransfer) {
            event.dataTransfer.effectAllowed = 'move';
        }
    }

    public handleExperienceDragOver(event: DragEvent, index: number): void {
        event.preventDefault(); // Allow drop
    }

    public handleExperienceDrop(event: DragEvent, dropIndex: number): void {
        event.preventDefault();

        const fromIndex = this.experienceDragStartIndex;
        const toIndex = dropIndex;

        if (fromIndex === null || fromIndex === toIndex) return;

        const item = this.cardDetail.experience[fromIndex];
        this.cardDetail.experience.splice(fromIndex, 1);
        this.cardDetail.experience.splice(toIndex, 0, item);

        this.cardDetail.experience.forEach((experience: any, i: number) => {
            experience.displayOrder = i + 1;
        });

        this.experienceDragStartIndex = null;
        this.$scope.$apply(); // trigger digest
    }

    public handleExperienceDragEnd(event: DragEvent): void {
        this.experienceDragStartIndex = null;
    }

    // Experience Skills Methods
    public addSkill(experience): void {
        var self = this;
        if (!experience.skills) {
            experience.skills = [];
        }

        const newSkill = {
            name: '',
            idLocal: self.baseController.generateUUID(),
            idStructureExperience: experience.idLocal
        };
        experience.skills.push(newSkill);
    }

    public removeSkill(experience, skill): void {
        var self = this;
        var position = self.baseController.searchForEntityInList("idStructureExperienceSkill", experience.skills, skill, "idLocal");
        if (!self.baseController.isNullOrUndefined(position) && position > -1) {
            experience.skills.splice(position, 1);
        }
    }

    // Experience Media Methods
    public addMedia(experience): void {
        var self = this;
        if (!experience.media) {
            experience.media = [];
        }

        const newMedia = {
            idLocal: self.baseController.generateUUID(),
            idStructureExperience: experience.idLocal,
            document: new pictureDataModel()
        };
        experience.media.push(newMedia);
    }

    public removeMedia(experience, media): void {
        var self = this;
        var position = self.baseController.searchForEntityInList("idStructureExperienceMedia", experience.media, media, "idLocal");
        if (!self.baseController.isNullOrUndefined(position) && position > -1) {
            experience.media.splice(position, 1);
        }
    }
}

cardModule.controller("cardDetailExperienceController"
    , ["$scope"
        , "$parse"
        , "toaster"
        , "cardWebService"
        , cardDetailExperienceController
    ]);
