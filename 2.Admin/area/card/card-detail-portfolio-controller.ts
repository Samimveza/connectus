class cardDetailPortfolioController implements IChildCardDetailController {
    scope;
    baseController: baseController;
    callerController: ICardDetailPortfolioCaller;
    groupName: string = cardDetailTabNameFromEnum.getName(cardDetailTab.PORTFOLIO);

    cardWebService: cardWebService;

    formValidator: formValidator;
    cardDetailTabEnum = cardDetailTab;
    searchQuery

    public portfolioDragStartIndex: number = null;

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

        this.callerController.registerCardDetailPortfolioController(this);
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

    // Company Portfolio Methods
    public addPortfolio(): void {
        var self = this;
        const newPortfolio = {
            displayOrder: self.cardDetail.portfolios.length + 1,
            image: {},
            idLocal: self.baseController.generateUUID(),
            additionalImages: []
        };
        self.cardDetail.portfolios.push(newPortfolio);
    }

    public removePortfolio(portfolio): void {
        var self = this;


        var position = self.baseController.searchForEntityInList("idStructurePortfolioReference", self.cardDetail.portfolios, portfolio, "idLocal");
        if (!self.baseController.isNullOrUndefined(position) && position > -1) {
            self.cardDetail.portfolios.splice(position, 1);
        }

        // Update display order for remaining portfolios    
        self.cardDetail.portfolios.forEach((portfolio: any, i: number) => {
            portfolio.displayOrder = i + 1;
        });
    }

    // Feature Drag and Drop Methods
    public handlePortfolioDragStart(event: DragEvent, index: number): void {
        this.portfolioDragStartIndex = index;
        event.dataTransfer.effectAllowed = 'move';
    }

    public handlePortfolioDragOver(event: DragEvent, index: number): void {
        event.preventDefault(); // Allow drop
    }

    public handlePortfolioDrop(event: DragEvent, dropIndex: number): void {
        event.preventDefault();

        const fromIndex = this.portfolioDragStartIndex;
        const toIndex = dropIndex;

        if (fromIndex === null || fromIndex === toIndex) return;

        const item = this.cardDetail.portfolios[fromIndex];
        this.cardDetail.portfolios.splice(fromIndex, 1);
        this.cardDetail.portfolios.splice(toIndex, 0, item);

        // Update displayOrder
        this.cardDetail.portfolios.forEach((portfolio: any, i: number) => {
            portfolio.displayOrder = i + 1;
        });

        this.portfolioDragStartIndex = null;
        this.$scope.$apply(); // trigger digest
    }

    public handlePortfolioDragEnd(event: DragEvent): void {
        this.portfolioDragStartIndex = null;
    }



    // Add new image slot
    public addAdditionalImage(file, additionalImages, isArray) {
        var self = this;

        const newImage = {
            displayOrder: additionalImages.length + 1,
            image: {},
            idLocal: self.baseController.generateUUID()
        };

        self.uploadAdditionalImage(file, newImage.image, false).then(function () {
            additionalImages.push(newImage);
        })
    }

    // Upload additional image
    public uploadAdditionalImage(file, arrayToUpload, isArray) {
        var self = this;
        var deferred: any = self.baseController.q.defer();

        self.baseController.upload(file, arrayToUpload, isArray).then(function (response) {
            deferred.resolve();
        })
        .catch(function (response) {
            deferred.reject();
        })

        return deferred.promise;

    }

    // Remove additional image
    public removeAdditionalImage(additionalImages, image) {
        var self = this;

        var position = self.baseController.searchForEntityInList("idAdditionalImageReference", additionalImages, image, "idLocal");
        if (!self.baseController.isNullOrUndefined(position) && position > -1) {
            additionalImages.splice(position, 1);
        }

        // Update display order for remaining additional images    
        additionalImages.forEach((image: any, i: number) => {
            image.displayOrder = i + 1;
        });
    }

    // Drag and drop handlers for additional images
    public handleAdditionalImageDragStart(event, index, portfolioItem) { }
    public handleAdditionalImageDragOver(event, index, portfolioItem) { }
    public handleAdditionalImageDrop(event, index, portfolioItem) { }
    public handleAdditionalImageDragEnd(event) { }
}

cardModule.controller("cardDetailPortfolioController"
    , ["$scope"
        , "$parse"
        , "toaster"
        , "cardWebService"
        , cardDetailPortfolioController
    ]);
