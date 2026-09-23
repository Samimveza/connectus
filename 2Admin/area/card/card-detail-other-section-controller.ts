class cardDetailOtherSectionController implements IChildCardDetailController {
    scope;
    baseController: baseController;
    callerController: ICardDetailOtherSectionCaller;
    groupName: string = cardDetailTabNameFromEnum.getName(cardDetailTab.OTHER_SECTIONS);

    cardWebService: cardWebService;

    formValidator: formValidator;
    cardDetailTabEnum = cardDetailTab;
    searchQuery

    public accordionDragStartIndex: number = null;
    public galleryDragStartIndex: number = null;
    public memberDragStartIndex: number = null;
    
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

        this.callerController.registerCardDetailOtherSectionController(this);
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

    // Company Features Methods
    public addAccordion(): void {
        var self = this;
        const newAccordion = {
            name: '',
            description: '',
            displayOrder: this.cardDetail.accordions.length + 1,
            idLocal: self.baseController.generateUUID()
        };
        this.cardDetail.accordions.push(newAccordion);
    }

    public removeAccordion(accordion): void {
        var self = this;


        var position = self.baseController.searchForEntityInList("idStructureAccordionReference", self.cardDetail.accordions, accordion, "idLocal");

        if (!self.baseController.isNullOrUndefined(position) && position > -1) {
            self.cardDetail.accordions.splice(position, 1);
        }

        // Update display order for remaining features
        this.cardDetail.accordions.forEach((accordion: any, i: number) => {
            accordion.displayOrder = i + 1;
        });
    }

    // Feature Drag and Drop Methods
    public handleAccordionDragStart(event: DragEvent, index: number): void {
        this.accordionDragStartIndex = index;
        event.dataTransfer.effectAllowed = 'move';
    }

    public handleAccordionDragOver(event: DragEvent, index: number): void {
        event.preventDefault(); // Allow drop
    }

    public handleAccordionDrop(event: DragEvent, dropIndex: number): void {
        event.preventDefault();

        const fromIndex = this.accordionDragStartIndex;
        const toIndex = dropIndex;

        if (fromIndex === null || fromIndex === toIndex) return;

        const item = this.cardDetail.accordions[fromIndex];
        this.cardDetail.accordions.splice(fromIndex, 1);
        this.cardDetail.accordions.splice(toIndex, 0, item);

        // Update displayOrder
        this.cardDetail.accordions.forEach((accordion: any, i: number) => {
            accordion.displayOrder = i + 1;
        });

        this.accordionDragStartIndex = null;
        this.$scope.$apply(); // trigger digest
    }

    public handleAccordionDragEnd(event: DragEvent): void {
        this.accordionDragStartIndex = null;
    }

    // Company Gallery Methods
    public addGallery(): void {
        var self = this;
        const newGallery = {
            displayOrder: this.cardDetail.gallery.length + 1,
            image: {},
            idLocal: self.baseController.generateUUID()
        };
        this.cardDetail.gallery.push(newGallery);
    }

    public removeGallery(gallery): void {
        var self = this;


        var position = self.baseController.searchForEntityInList("idStructureGalleryReference", self.cardDetail.gallery, gallery, "idLocal");


        if (!self.baseController.isNullOrUndefined(position) && position > -1) {
            self.cardDetail.gallery.splice(position, 1);
        }

        // Update display order for remaining gallery
        this.cardDetail.gallery.forEach((gallery: any, i: number) => {
            gallery.displayOrder = i + 1;
        });
    }

    // Feature Drag and Drop Methods
    public handleGalleryDragStart(event: DragEvent, index: number): void {
        this.galleryDragStartIndex = index;
        event.dataTransfer.effectAllowed = 'move';
    }

    public handleGalleryDragOver(event: DragEvent, index: number): void {
        event.preventDefault(); // Allow drop
    }

    public handleGalleryDrop(event: DragEvent, dropIndex: number): void {
        event.preventDefault();

        const fromIndex = this.galleryDragStartIndex;
        const toIndex = dropIndex;

        if (fromIndex === null || fromIndex === toIndex) return;

        const item = this.cardDetail.gallery[fromIndex];
        this.cardDetail.gallery.splice(fromIndex, 1);
        this.cardDetail.gallery.splice(toIndex, 0, item);

        // Update displayOrder
        this.cardDetail.gallery.forEach((gallery: any, i: number) => {
            gallery.displayOrder = i + 1;
        });

        this.galleryDragStartIndex = null;
        this.$scope.$apply(); // trigger digest
    }

    public handleGalleryDragEnd(event: DragEvent): void {
        this.galleryDragStartIndex = null;
    }




    // Company Team Members Methods
    public addMember(): void {
        var self = this;
        const newMember = {
            firstName: '',
            lastName: '',
            title: '',
            description: '',
            photo: { },
            displayOrder: this.cardDetail.members.length + 1,
            idLocal: self.baseController.generateUUID()
        };
        this.cardDetail.members.push(newMember);
    }

    public removeMember(member): void {
        var self = this;

        var position = self.baseController.searchForEntityInList("idStructureMemberReference", self.cardDetail.members, member, "idLocal");

        console.log(member);
        console.log(position);

        if (!self.baseController.isNullOrUndefined(position) && position > -1) {
            self.cardDetail.members.splice(position, 1);
        }

        // Update display order for remaining team members
        this.cardDetail.members.forEach((member: any, i: number) => {
            member.displayOrder = i + 1;
        });
    }

    // Team Member Drag and Drop Methods
    public handleMemberDragStart(event: DragEvent, index: number): void {
        this.memberDragStartIndex = index;
        event.dataTransfer.effectAllowed = 'move';
    }

    public handleMemberDragOver(event: DragEvent, index: number): void {
        event.preventDefault(); // Allow drop
    }

    public handleMemberDrop(event: DragEvent, dropIndex: number): void {
        event.preventDefault();

        const fromIndex = this.memberDragStartIndex;
        const toIndex = dropIndex;

        if (fromIndex === null || fromIndex === toIndex) return;

        const item = this.cardDetail.members[fromIndex];
        this.cardDetail.members.splice(fromIndex, 1);
        this.cardDetail.members.splice(toIndex, 0, item);

        // Update displayOrder
        this.cardDetail.members.forEach((member: any, i: number) => {
            member.displayOrder = i + 1;
        });

        this.memberDragStartIndex = null;
        this.$scope.$apply(); // trigger digest
    }

    public handleMemberDragEnd(event: DragEvent): void {
        this.memberDragStartIndex = null;
    }
}

cardModule.controller("cardDetailOtherSectionController"
    , ["$scope"
        , "$parse"
        , "toaster"
        , "cardWebService"
        , cardDetailOtherSectionController
    ]);
