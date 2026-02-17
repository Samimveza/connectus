class cardDetailController implements ICardDetailBasicInfoCaller {

    isExpired: boolean;
    scope;
    baseController: baseController;
    cardDetailWebService: cardWebService;
    screenModeManager: screenModeManager<cardDetailViewModel, cardDetailController>;
    id: string;
    previsualizeUrl: string = '';

    preloadedData: {
        structureFields
    } = {
            structureFields: []
        };

    formValidator: formValidator;

    childControllers: IChildCardDetailController[] = [];

    cardDetailBasicInfoController: cardDetailBasicInfoController;
    cardDetailInformationController: cardDetailInformationController;
    cardDetailFieldsController: cardDetailFieldsController;
    cardDetailSettingsController: cardDetailSettingController;
    cardDetailCreationController: cardDetailCreationController;

    cardDetailOtherSectionController: cardDetailOtherSectionController;
    cardDetailOpeningHoursController: cardDetailOpeningHoursController;
    cardDetailMessagesController: cardDetailMessagesController;
    cardDetailPortfolioController: cardDetailPortfolioController;
    cardDetailEducationController: cardDetailEducationController;
    cardDetailExperienceController: cardDetailExperienceController;
    formName: string = 'cardDetailForm';
    hasScreenDetailBeenLoaded: boolean;
    hasCardDetailBeenLoaded: boolean;

    currentState: cardDetailTab = cardDetailTab.INFORMATION;
    cardDetailTab = cardDetailTab;
    cardDetailStepInfo = cardDetailStepInfo;

    step = cardDetailStepInfo.EMAIL;

    titles = [
        "Mr",
        "Mrs",
        "Ms",
    ]

    groupFieldCategories = [];

    structureType;
    structureTypeEnum = structureTypeEnum;

    structurerCategoriesHiearchy;

    baseSlugUrl;
    profileColorVariants;
    constructor($scope
        , private $parse
        , private toaster
        , cardDetailWebService) {
        var self = this;

        $scope.controller = this;
        this.cardDetailWebService = cardDetailWebService;

        this.scope = $scope;

        this.baseController = this.scope.baseController;

        this.initVariables();
        this.registerValidations();
    }

    get screenMode(): SCREEN_MODE {
        return this.screenModeManager.currentMode;
    }

    get cardDetail(): cardDetailViewModel {
        return this.screenModeManager.entity;
    }

    registerCardDetailBasicInfoController(cardDetailBasicInfoController: cardDetailBasicInfoController) {
        this.cardDetailBasicInfoController = cardDetailBasicInfoController;
        this.childControllers.push(cardDetailBasicInfoController);
    }

    registerCardDetailInformationController(cardDetailInformationController: cardDetailInformationController) {
        this.cardDetailInformationController = cardDetailInformationController;
        this.childControllers.push(cardDetailInformationController);
    }

    registerCardDetailFieldsController(cardDetailFieldsController: cardDetailFieldsController) {
        this.cardDetailFieldsController = cardDetailFieldsController;
        this.childControllers.push(cardDetailFieldsController);
    }

    registerCardDetailSettingsController(cardDetailSettingsController: cardDetailSettingController) {
        this.cardDetailSettingsController = cardDetailSettingsController;
        this.childControllers.push(cardDetailSettingsController);
    }


    registerCardDetailCreationController(cardDetailCreationController: cardDetailCreationController) {
        this.cardDetailCreationController = cardDetailCreationController;
        this.childControllers.push(cardDetailCreationController);
    }


    registerCardDetailOtherSectionController(cardDetailOtherSectionController: cardDetailOtherSectionController) {
        this.cardDetailOtherSectionController = cardDetailOtherSectionController;
        this.childControllers.push(cardDetailOtherSectionController);
    }

    registerCardDetailOpeningHoursController(cardDetailOpeningHoursController: cardDetailOpeningHoursController) {  
        this.cardDetailOpeningHoursController = cardDetailOpeningHoursController;
        this.childControllers.push(cardDetailOpeningHoursController);
    }

    registerCardDetailMessagesController(cardDetailMessagesController: cardDetailMessagesController) {
        this.cardDetailMessagesController = cardDetailMessagesController;
        this.childControllers.push(cardDetailMessagesController);
    }

    registerCardDetailPortfolioController(cardDetailPortfolioController: cardDetailPortfolioController) {
        this.cardDetailPortfolioController = cardDetailPortfolioController;
        this.childControllers.push(cardDetailPortfolioController);
    }

    registerCardDetailEducationController(cardDetailEducationController: cardDetailEducationController) {
        this.cardDetailEducationController = cardDetailEducationController;
        this.childControllers.push(cardDetailEducationController);
    }

    registerCardDetailExperienceController(cardDetailExperienceController: cardDetailExperienceController) {
        this.cardDetailExperienceController = cardDetailExperienceController;
        this.childControllers.push(cardDetailExperienceController);
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

    public setInfo(id: string, mode: SCREEN_MODE, structureType: structureTypeEnum) {
        var self = this;
        self.formValidator = new formValidator(self.$parse, self.toaster, self.scope, self.formName);
        self.id = id;

        self.screenModeManager = new screenModeManager<cardDetailViewModel, cardDetailController>(self, self.saveMethod, false);
        self.screenModeManager.currentMode = mode;

        self.structureType = structureType;

        self.loadScreenConstants();

        if (mode == SCREEN_MODE.ADD) {
            self.step = cardDetailStepInfo.EDIT; //TODO: Change to email.

            var _card: cardDetailViewModel = new cardDetailViewModel();
            _card.profilePicture = new pictureDataModel();
            _card.coverPicture = new pictureDataModel();
            _card.contacts = [];
            _card.socialNetworks = [];
            _card.addresses = [];
            _card.structureFields = [];
            _card.stats = { totalViews: 0 };
            _card.views = [];
            _card.cardName = "My Card - " + new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
            _card.categories = [];
            _card.features = [];
            _card.tags = [];
            _card.accordions = [];
            _card.gallery = [];
            _card.members = [];
            _card.messages = [];
            _card.portfolios = [];
            _card.structureTypeCode = self.structureType;

            self.screenModeManager.setEntity(self.formatEntity(_card));
            self.onCardDetailLoaded();
        } else {
            self.step = cardDetailStepInfo.EDIT;
            self.loadEntity();
        }

        self.initialize();
    }

    public initialize() {
        var self = this;
    }

    public goToStep(step) {
        var self = this;
        self.step = step;
    }

    public loadEntity() {
        var self = this;
        self.baseController.showLoading();
        var _getBookingSettingDto = new getCardDto();
        _getBookingSettingDto.idStructure = self.id;

        self.cardDetailWebService.getCard(_getBookingSettingDto)
            .then(function (response: baseResultReturnType<structureModel>) {
                if (response.status == STATUS_MESSAGE.SUCCESS) {
                    self.screenModeManager.setEntity(self.formatEntity(response.result));
                    self.onCardDetailLoaded();
                } else {
                    self.baseController.showMessage(response.errorMessage, "", ALERT_MESSAGE_TYPE.ERROR);
                }
            }).catch(function (errorMsg) {
                self.baseController.showMessage(errorMsg, "We encountered a problem while processing your request. Please try again later or contact support (contact@connectus.mu) if the issue persists.", ALERT_MESSAGE_TYPE.ERROR);
            }).finally(function () {
                self.baseController.hideLoading();
            });
    }

    public formatEntity(entity: structureModel): cardDetailViewModel {
        var self = this;
        var returnData: cardDetailViewModel = JSON.parse(JSON.stringify(entity));

        return self.applyObjectCorrections(returnData);
    }

    public applyObjectCorrections(item: cardDetailViewModel) {
        var self = this;

        if (!self.baseController.isNullOrUndefined(item.structureFields) && item.structureFields.length > 0) {
            // First ensure all fields have a displayOrder
            let maxOrder = 0;
            item.structureFields.forEach(field => {
                if (!field.displayOrder && field.displayOrder !== 0) {
                    maxOrder = Math.max(...item.structureFields.map(f => f.displayOrder || 0));
                    field.displayOrder = maxOrder + 1;
                }
            });

            // Sort by displayOrder
            item.structureFields.sort((a, b) => {
                return (a.displayOrder || 0) - (b.displayOrder || 0);
            });
        }

        if (self.baseController.isNullOrUndefined(item.portfolios)) {
            item.portfolios = [];
        }

        Enumerable.From(item.portfolios).ForEach(function (portfolio) {
            if (self.baseController.isNullOrUndefined(portfolio.image)) {
                portfolio.image = new pictureDataModel();
            }

            if (self.baseController.isNullOrUndefined(portfolio.additionalImages)) {
                portfolio.additionalImages = [];
            }

            Enumerable.From(portfolio.additionalImages).ForEach(function (additionalImage) {
                if (self.baseController.isNullOrUndefined(additionalImage.image)) {
                    additionalImage.image = new pictureDataModel();
                }
            });
        });

        
        return item;
    }


    public saveMethod(modifiedEntity: cardDetailViewModel, caller: cardDetailController) {
        var self: cardDetailController = caller;

        self.registerValidations();

        if (!self.validateForGroups()) {
           // self.screenModeManager.setMode(SCREEN_MODE.EDIT);
            return;
        }

        if (!self.baseController.isNullOrUndefined(self.cardDetailOpeningHoursController)) {
            self.cardDetailOpeningHoursController.saveOpeningHours();
        }

        var _saveCardDto: saveCardDto = self.formatEntityBeforeSave(self.cardDetail);

        self.baseController.showLoading();

        self.cardDetailWebService.saveCard(_saveCardDto)
            .then(function (response: baseResultReturnType<structureModel>) {
                if (response.status == STATUS_MESSAGE.SUCCESS) {
                    self.baseController.showToast(TOASTER_TYPE.SUCCESS,"Saved successfully");
                    self.screenModeManager.setEntity(self.formatEntity(response.result));
                    self.id = response.result.idStructure;
                    self.formatOnAllDetail();
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

    public idGroupValid(profileTab: cardDetailTab): boolean {
        var self = this;
        let isValid: boolean = true;

        let groupName = cardDetailTabNameFromEnum.getName(profileTab);
        let childValidator: IChildCardDetailController = Enumerable.From(self.childControllers).Where(function (childController: IChildCardDetailController) {
            return childController.groupName == groupName
        }).FirstOrDefault(null);

        if (childValidator != null && childValidator.hasScreenDetailBeenLoaded) {
            isValid = childValidator.formValidator.validateGroup(groupName, false)
        }

        return isValid;
    }

    public loadScreenConstants() {
        var self = this;

        self.cardDetailWebService.getCardDetaiScreenConstant()
            .then(function (response: baseResultReturnType<cardDetailScreenConstantReturnType>) {
                if (response.status == STATUS_MESSAGE.SUCCESS) {
                    self.preloadedData.structureFields = response.result.structureFields;

                    self.formatScreenConstant(response.result);

                    self.onScreenDetailLoaded();
                } else {
                    self.baseController.showMessage(response.errorMessage, "", ALERT_MESSAGE_TYPE.ERROR);
                }
            }).catch(function (errorMsg) {
                self.baseController.showMessage(errorMsg, "We encountered a problem while processing your request. Please try again later or contact support (contact@connectus.mu) if the issue persists.", ALERT_MESSAGE_TYPE.ERROR);
            }).finally(function () {
                self.baseController.hideLoading();
            });
    }

    public formatScreenConstant(data: cardDetailScreenConstantReturnType) {
        var self = this;

        var fields = data.structureFields;

        var groups = {};
        fields.forEach(field => {
            const key = field.isPopular ? 'Popular' : field.structureFieldCategory;
            if (!groups[key]) {
                groups[key] = [];
            }
            groups[key].push(field);
        });
        
        const sortedKeys = Object.keys(groups)
            .filter(k => k !== 'Popular')
            .sort((a, b) => a.localeCompare(b));

        const finalGroup = [];
        if (groups['Popular']) {
            finalGroup.push({ category: 'Popular', items: groups['Popular'] });
        }
        sortedKeys.forEach(k => {
            finalGroup.push({ category: k, items: groups[k] });
        });
        self.groupFieldCategories = finalGroup;

        if (self.structureType == this.structureTypeEnum.INDIVIDUAL) {
            self.baseSlugUrl = data.individualBaseSlugUrl;
            self.profileColorVariants = data.individualProfileColorVariants;

        } else if (self.structureType == this.structureTypeEnum.LEGAL_ENTITY) {
            self.baseSlugUrl = data.legalEntityBaseSlugUrl;
            self.profileColorVariants = data.legalEntityProfileColorVariants;
        }


        self.profileColorVariants = data.individualProfileColorVariants;

        self.structurerCategoriesHiearchy = flattenCategories(data.structurerCategoriesHiearchy);
    }

    public onCardDetailLoaded() {
        var self = this;
        self.hasCardDetailBeenLoaded = true;

        self.onAllDetailLoaded();
    }

    public onScreenDetailLoaded() {
        var self = this;
        self.hasScreenDetailBeenLoaded = true;
        self.onAllDetailLoaded();
    }

    public onAllDetailLoaded() {
        var self = this;
        if (self.hasScreenDetailBeenLoaded && self.hasCardDetailBeenLoaded) {
            self.formatOnAllDetail();

            self.childControllers.forEach(function (controller: IChildCardDetailController) {
                controller.onDetailLoaded();
            })
        }
    }

    public formatOnAllDetail() {
        var self = this;

        if (self.baseController.isNullOrUndefined(self.cardDetail.workingHours)) {
            self.cardDetail.workingHours = {};
        }


        if (self.baseController.isNullOrUndefined(self.cardDetail.messages)) {
            self.cardDetail.messages = [];
        }

        //assign category here;
        Enumerable.From(self.cardDetail.categories).ForEach(function (category) {
            category.selectedCategory = Enumerable.From(self.structurerCategoriesHiearchy).Where(function (hierarchy) {
                return hierarchy.id == category.idStructureCategory;
            }).FirstOrDefault(null);
        });

        //sort addresses
        if (!self.baseController.isNullOrUndefined(self.cardDetail.addresses) && self.cardDetail.addresses.length > 0) {
            self.cardDetail.addresses.sort((a, b) => {
                return (a.displayOrder || 0) - (b.displayOrder || 0);
            });
        }

        //sort accordions
        if (!self.baseController.isNullOrUndefined(self.cardDetail.accordions) && self.cardDetail.accordions.length > 0) {
            self.cardDetail.accordions.sort((a, b) => {
                return (a.displayOrder || 0) - (b.displayOrder || 0);
            });
        }

        //sort features
        if (!self.baseController.isNullOrUndefined(self.cardDetail.features) && self.cardDetail.features.length > 0) {
            self.cardDetail.features.sort((a, b) => {
                return (a.displayOrder || 0) - (b.displayOrder || 0);
            });
        }

        //sort gallery
        if (!self.baseController.isNullOrUndefined(self.cardDetail.gallery) && self.cardDetail.gallery.length > 0) {
            self.cardDetail.gallery.sort((a, b) => {
                return (a.displayOrder || 0) - (b.displayOrder || 0);
            });
        }

        //sort education
        if (!self.baseController.isNullOrUndefined(self.cardDetail.education) && self.cardDetail.education.length > 0) {
            self.cardDetail.education.sort((a, b) => {
                return (a.displayOrder || 0) - (b.displayOrder || 0);
            });
        }

        //sort experience
        if (!self.baseController.isNullOrUndefined(self.cardDetail.experience) && self.cardDetail.experience.length > 0) {
            self.cardDetail.experience.sort((a, b) => {
                return (a.displayOrder || 0) - (b.displayOrder || 0);
            });
        }

        //sort members
        if (!self.baseController.isNullOrUndefined(self.cardDetail.members) && self.cardDetail.members.length > 0) {
            self.cardDetail.members.sort((a, b) => {
                return (a.displayOrder || 0) - (b.displayOrder || 0);
            });
        }

        //sort tags
        if (!self.baseController.isNullOrUndefined(self.cardDetail.tags) && self.cardDetail.tags.length > 0) {
            self.cardDetail.tags.sort((a, b) => {
                return (a.displayOrder || 0) - (b.displayOrder || 0);
            });
        }

        //sort portfolios
        if (!self.baseController.isNullOrUndefined(self.cardDetail.portfolios) && self.cardDetail.portfolios.length > 0) {
            self.cardDetail.portfolios.sort((a, b) => {
                return (a.displayOrder || 0) - (b.displayOrder || 0);
            });
        }
    }

    public formatEntityBeforeSave(entity: cardDetailViewModel): saveCardDto {
        var self = this;
        var formattedEntity: saveCardDto = self.baseController.cloneObject(entity);

        return formattedEntity;
    }

    public setCurrentState(cardDetailTab: cardDetailTab) {
        var self = this;
        self.currentState = cardDetailTab;
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
        self.step = self.step + 1;
    }
}

cardModule.controller("cardDetailController"
    , ["$scope"
        , "$parse"
        , "toaster"
        , "cardWebService"
        , cardDetailController
    ]);

enum cardDetailTab {
    BASIC_INFO = 1,
    INFORMATION = 2,
    FIELDS = 3,
    SETTINGS = 4,
    EDUCATION = 5,
    EXPERIENCE = 6,
    OTHER_SECTIONS = 7, 
    MESSAGES = 8, 
    OPENING_HOURS = 9,
    PORTFOLIO = 10,
}


enum cardDetailStepInfo {
    EMAIL = 1,
    COMPANY = 2,
    PHOTO = 3,
    PHONE = 4,
    EDIT = 5,
}

class cardDetailTabNameFromEnum {
    static getName(_subscriptionSettingTab: cardDetailTab) {
        let name: string;

        switch (_subscriptionSettingTab) {
            case cardDetailTab.BASIC_INFO:
                name = 'BASIC_INFO';
                break;

            case cardDetailTab.INFORMATION:
                name = 'INFORMATION';
                break;

            case cardDetailTab.FIELDS:
                name = 'FIELDS';
                break;

            case cardDetailTab.SETTINGS:
                name = 'SETTINGS';
                break;


            case cardDetailTab.OTHER_SECTIONS:
                name = 'OTHER_SECTIONS';
                break;


            case cardDetailTab.MESSAGES:
                name = 'MESSAGES';
                break;


            case cardDetailTab.OPENING_HOURS:
                name = 'OPENING_HOURS';
                break;

            case cardDetailTab.EDUCATION:
                name = 'EDUCATION';
                break;
            case cardDetailTab.EXPERIENCE:
                name = 'EXPERIENCE';
                break;
            case cardDetailTab.OTHER_SECTIONS:
                name = 'OTHER_SECTIONS';
                break;
            case cardDetailTab.MESSAGES:
                name = 'MESSAGES';
                break;
            case cardDetailTab.OPENING_HOURS:
                name = 'OPENING_HOURS';
                break;
            case cardDetailTab.PORTFOLIO:
                name = 'PORTFOLIO';
                break;

        }
        return name;
    }
}

class cardDetailViewModel extends structureModel {
    structureTypeCode;
}


function flattenCategories(categories, parentPath = '') {
    const flattened = [];

    for (const category of categories) {
        const currentPath = parentPath ? `${parentPath} : ${category.name}` : category.name;

        if (category.children && category.children.length > 0) {
            flattened.push(...flattenCategories(category.children, currentPath));
        } else {
            flattened.push({
                id: category.idStructureCategory,
                hierarchy: currentPath
            });
        }
    }

    return flattened;
}