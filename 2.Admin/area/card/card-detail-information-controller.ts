class cardDetailInformationController implements IChildCardDetailController {
    scope;
    baseController: baseController;
    callerController: ICardDetailInformationCaller;
    groupName: string = cardDetailTabNameFromEnum.getName(cardDetailTab.INFORMATION);

    cardWebService: cardWebService;

    formValidator: formValidator;
    cardDetailTabEnum = cardDetailTab;

    // Drag state for addresses
    public addressDragStartIndex: number = null;

    // Drag state for features
    public featureDragStartIndex: number = null;

    // Drag state for tags
    public tagDragStartIndex: number = null;

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

        this.callerController.registerCardDetailInformationController(this);
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


    get titles() {

        var self = this;
        return self.callerController.titles;
    }

    get profileColorVariants() {
        var self = this;
        return self.callerController.profileColorVariants;
    }

    get structureCategoriesHiearchy() {
        var self = this;
        return self.callerController.structurerCategoriesHiearchy;

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


    public setColor(color) {
        var self = this;
        self.cardDetail.color = color;
    }

    public setColorVariant(variant) {
        var self = this;
        self.cardDetail.idColourVariant = variant.idVariant;
        /*
        // Find the selected variant in the available variants
        const selectedVariant = self.individualProfileColorVariants.find(v => v.name === variant.name);
        if (selectedVariant) {
            // Set the primary color as the main color (for backward compatibility)
            const primaryColor = selectedVariant.colors.find(c => c.attributeName === '--color-primary');
            if (primaryColor) {
                self.cardDetail.color = primaryColor.color;
            }
        }
            */
    }

    public addAddress() {
        var self = this;
        var address = new addressModel();
        address.idLocal = self.baseController.generateUUID();
        address.displayOrder = self.cardDetail.addresses.length + 1;
        self.cardDetail.addresses.push(address);
    }


    public removeAddress(address) {
        var self = this;
        var position = self.baseController.searchForEntityInList("idAddressReference", self.cardDetail.addresses, address, "idLocal");
        console.log(address);
        console.log(position);

        if (!self.baseController.isNullOrUndefined(position) && position > -1) {
            self.cardDetail.addresses.splice(position, 1);
        }

        // Update display order for remaining addresses
        this.cardDetail.addresses.forEach((address: any, i: number) => {
            address.displayOrder = i + 1;
        });
    }

    // Address Drag and Drop Methods
    public handleAddressDragStart(event: DragEvent, index: number): void {
        this.addressDragStartIndex = index;
        event.dataTransfer.effectAllowed = 'move';
    }

    public handleAddressDragOver(event: DragEvent, index: number): void {
        event.preventDefault(); // Allow drop
    }

    public handleAddressDrop(event: DragEvent, dropIndex: number): void {
        event.preventDefault();

        const fromIndex = this.addressDragStartIndex;
        const toIndex = dropIndex;

        if (fromIndex === null || fromIndex === toIndex) return;

        const item = this.cardDetail.addresses[fromIndex];
        this.cardDetail.addresses.splice(fromIndex, 1);
        this.cardDetail.addresses.splice(toIndex, 0, item);

        // Update displayOrder
        this.cardDetail.addresses.forEach((address: any, i: number) => {
            address.displayOrder = i + 1;
        });

        this.addressDragStartIndex = null;
        this.$scope.$apply(); // trigger digest
    }

    public handleAddressDragEnd(event: DragEvent): void {
        this.addressDragStartIndex = null;
    }

    public addCategory() {
        var self = this;
        if (!self.cardDetail.categories) {
            self.cardDetail.categories = [];
        }

        var newCategory = {
            idLocal: self.baseController.generateUUID(),
            selectedCategory: null,
            isPrimary: false
        };

        self.cardDetail.categories.push(newCategory);
    }

    public removeCategory(category) {
        var self = this;
        var position = self.baseController.searchForEntityInList("idStructureStructureCategoryReference", self.cardDetail.categories, category, "idLocal");

        if (!self.baseController.isNullOrUndefined(position) && position > -1) {
            self.cardDetail.categories.splice(position, 1);
        }
    }

    public onCategorySelected(category) {
        var self = this;
        category.idStructureCategory = category.selectedCategory.id;
    }

    public setPrimaryCategory(selectedCategory) {
        var self = this;
        if (selectedCategory.isPrimary && self.cardDetail.categories) {
            // Ensure only one category is primary
            self.cardDetail.categories.forEach(category => {
                if (category !== selectedCategory) {
                    category.isPrimary = false;
                }
            });
        }
    }



    // Company Features Methods
    public addFeature(): void {
        var self = this;

        const newFeature = {
            name: '',
            description: '',
            displayOrder: this.cardDetail.features.length + 1,
            idLocal: self.baseController.generateUUID()
        };
        this.cardDetail.features.push(newFeature);
    }

    public removeFeature(feature): void {
        var self = this;

        var position = self.baseController.searchForEntityInList("idStructureFeatureReference", self.cardDetail.features, feature, "idLocal");

        if (!self.baseController.isNullOrUndefined(position) && position > -1) {
            self.cardDetail.features.splice(position, 1);
        }

        // Update display order for remaining features
        this.cardDetail.features.forEach((feature: any, i: number) => {
            feature.displayOrder = i + 1;
        });
    }

    // Feature Drag and Drop Methods
    public handleFeatureDragStart(event: DragEvent, index: number): void {
        this.featureDragStartIndex = index;
        event.dataTransfer.effectAllowed = 'move';
    }

    public handleFeatureDragOver(event: DragEvent, index: number): void {
        event.preventDefault(); // Allow drop
    }

    public handleFeatureDrop(event: DragEvent, dropIndex: number): void {
        event.preventDefault();

        const fromIndex = this.featureDragStartIndex;
        const toIndex = dropIndex;

        if (fromIndex === null || fromIndex === toIndex) return;

        const item = this.cardDetail.features[fromIndex];
        this.cardDetail.features.splice(fromIndex, 1);
        this.cardDetail.features.splice(toIndex, 0, item);

        // Update displayOrder
        this.cardDetail.features.forEach((feature: any, i: number) => {
            feature.displayOrder = i + 1;
        });

        this.featureDragStartIndex = null;
        this.$scope.$apply(); // trigger digest
    }

    public handleFeatureDragEnd(event: DragEvent): void {
        this.featureDragStartIndex = null;
    }

    // Company Tags Methods
    public addTag(): void {
        var self = this;

        const newTag = {
            name: '',
            displayOrder: this.cardDetail.tags.length + 1,
            idLocal: self.baseController.generateUUID()
        };
        this.cardDetail.tags.push(newTag);
    }

    public removeTag(tag): void {
        var self = this;

        var position = self.baseController.searchForEntityInList("idStructureStructureTagReference", self.cardDetail.tags, tag, "idLocal");
        if (!self.baseController.isNullOrUndefined(position) && position > -1) {
            self.cardDetail.tags.splice(position, 1);
        }

        // Update display order for remaining tags
        this.cardDetail.tags.forEach((tag: any, i: number) => {
            tag.displayOrder = i + 1;
        });
    }

    // Tag Drag and Drop Methods
    public handleTagDragStart(event: DragEvent, index: number): void {
        this.tagDragStartIndex = index;
        event.dataTransfer.effectAllowed = 'move';
    }

    public handleTagDragOver(event: DragEvent, index: number): void {
        event.preventDefault(); // Allow drop
    }

    public handleTagDrop(event: DragEvent, dropIndex: number): void {
        event.preventDefault();

        const fromIndex = this.tagDragStartIndex;
        const toIndex = dropIndex;

        if (fromIndex === null || fromIndex === toIndex) return;

        const item = this.cardDetail.tags[fromIndex];
        this.cardDetail.tags.splice(fromIndex, 1);
        this.cardDetail.tags.splice(toIndex, 0, item);

        // Update displayOrder
        this.cardDetail.tags.forEach((tag: any, i: number) => {
            tag.displayOrder = i + 1;
        });

        this.tagDragStartIndex = null;
        this.$scope.$apply(); // trigger digest
    }

    public handleTagDragEnd(event: DragEvent): void {
        this.tagDragStartIndex = null;
    }

}

cardModule.controller("cardDetailInformationController"
    , ["$scope"
        , "$parse"
        , "toaster"
        , "cardWebService"
        , cardDetailInformationController
    ]);
