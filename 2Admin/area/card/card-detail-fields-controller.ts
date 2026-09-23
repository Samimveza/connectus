class cardDetailFieldsController implements IChildCardDetailController {
    scope;
    baseController: baseController;
    callerController: ICardDetailFieldsCaller;
    groupName: string = cardDetailTabNameFromEnum.getName(cardDetailTab.FIELDS);

    cardWebService: cardWebService;

    formValidator: formValidator;
    cardDetailTabEnum = cardDetailTab;
    searchQuery
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

        this.callerController.registerCardDetailFieldsController(this);
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

    get structureFields() {
        var self = this;
        return self.callerController.groupFieldCategories;
    }

    public filterFields = (item) => {
        if (!this.searchQuery) return true;

        return item.name.toLowerCase().includes(this.searchQuery.toLowerCase());
    };

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
        if (self.baseController.isNullOrUndefined(arrayToUpload.document)) {
            arrayToUpload.document = {};
        }
        self.baseController.upload(file, arrayToUpload.document, isArray)
    }

    public deleteImage(picture: pictureDataModel, pictureDataList: pictureDataModel[], isArray) {
        var self = this;
        self.baseController.deleteImage(picture, pictureDataList, isArray);
    }

    public removeField(structureField) {
        var self = this;

        var position = self.baseController.searchForEntityInList("idStructureStructureFieldReference", self.cardDetail.structureFields, structureField, "idLocal");

        if (!self.baseController.isNullOrUndefined(position) && position > -1) {
            self.cardDetail.structureFields.splice(position, 1);
        }
    }

    public addField(field) {
        var self = this;

        var structure_StructureField = new structure_StructureFieldModel();
        structure_StructureField.idLocal = self.baseController.generateUUID();
        structure_StructureField.idStructureField = field.idStructureField;
        structure_StructureField.structureField = field;
        structure_StructureField.displayOrder = self.cardDetail.structureFields.length + 1;

        self.cardDetail.structureFields.push(structure_StructureField);
    }
    public dragStartIndex: number = null;

    public handleDragStart(event: DragEvent, index: number) {
        this.dragStartIndex = index;
        event.dataTransfer.effectAllowed = 'move';
    }

    public handleDragOver(event: DragEvent, index: number) {
        event.preventDefault(); // Allow drop
    }

    public handleDrop(event: DragEvent, dropIndex: number) {
        event.preventDefault();

        const fromIndex = this.dragStartIndex;
        const toIndex = dropIndex;

        if (fromIndex === null || fromIndex === toIndex) return;

        const item = this.cardDetail.structureFields[fromIndex];
        this.cardDetail.structureFields.splice(fromIndex, 1);
        this.cardDetail.structureFields.splice(toIndex, 0, item);

        // Optional: update displayOrder
        this.cardDetail.structureFields.forEach((f, i) => f.displayOrder = i + 1);

        this.dragStartIndex = null;
        this.scope.$apply(); // trigger digest
    }

    public handleDragEnd(event: DragEvent) {
        this.dragStartIndex = null;
    }

}

cardModule.controller("cardDetailFieldsController"
    , ["$scope"
        , "$parse"
        , "toaster"
        , "cardWebService"
        , cardDetailFieldsController
    ]);
