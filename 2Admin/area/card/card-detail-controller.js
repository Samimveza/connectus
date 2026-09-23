var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var cardDetailController = /** @class */ (function () {
    function cardDetailController($scope, $parse, toaster, cardDetailWebService) {
        this.$parse = $parse;
        this.toaster = toaster;
        this.previsualizeUrl = '';
        this.preloadedData = {
            structureFields: []
        };
        this.childControllers = [];
        this.formName = 'cardDetailForm';
        this.currentState = cardDetailTab.INFORMATION;
        this.cardDetailTab = cardDetailTab;
        this.cardDetailStepInfo = cardDetailStepInfo;
        this.step = cardDetailStepInfo.EMAIL;
        this.titles = [
            "Mr",
            "Mrs",
            "Ms",
        ];
        this.groupFieldCategories = [];
        this.structureTypeEnum = structureTypeEnum;
        var self = this;
        $scope.controller = this;
        this.cardDetailWebService = cardDetailWebService;
        this.scope = $scope;
        this.baseController = this.scope.baseController;
        this.initVariables();
        this.registerValidations();
    }
    Object.defineProperty(cardDetailController.prototype, "screenMode", {
        get: function () {
            return this.screenModeManager.currentMode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailController.prototype, "cardDetail", {
        get: function () {
            return this.screenModeManager.entity;
        },
        enumerable: true,
        configurable: true
    });
    cardDetailController.prototype.registerCardDetailBasicInfoController = function (cardDetailBasicInfoController) {
        this.cardDetailBasicInfoController = cardDetailBasicInfoController;
        this.childControllers.push(cardDetailBasicInfoController);
    };
    cardDetailController.prototype.registerCardDetailInformationController = function (cardDetailInformationController) {
        this.cardDetailInformationController = cardDetailInformationController;
        this.childControllers.push(cardDetailInformationController);
    };
    cardDetailController.prototype.registerCardDetailFieldsController = function (cardDetailFieldsController) {
        this.cardDetailFieldsController = cardDetailFieldsController;
        this.childControllers.push(cardDetailFieldsController);
    };
    cardDetailController.prototype.registerCardDetailSettingsController = function (cardDetailSettingsController) {
        this.cardDetailSettingsController = cardDetailSettingsController;
        this.childControllers.push(cardDetailSettingsController);
    };
    cardDetailController.prototype.registerCardDetailCreationController = function (cardDetailCreationController) {
        this.cardDetailCreationController = cardDetailCreationController;
        this.childControllers.push(cardDetailCreationController);
    };
    cardDetailController.prototype.registerCardDetailOtherSectionController = function (cardDetailOtherSectionController) {
        this.cardDetailOtherSectionController = cardDetailOtherSectionController;
        this.childControllers.push(cardDetailOtherSectionController);
    };
    cardDetailController.prototype.registerCardDetailOpeningHoursController = function (cardDetailOpeningHoursController) {
        this.cardDetailOpeningHoursController = cardDetailOpeningHoursController;
        this.childControllers.push(cardDetailOpeningHoursController);
    };
    cardDetailController.prototype.registerCardDetailMessagesController = function (cardDetailMessagesController) {
        this.cardDetailMessagesController = cardDetailMessagesController;
        this.childControllers.push(cardDetailMessagesController);
    };
    cardDetailController.prototype.registerCardDetailPortfolioController = function (cardDetailPortfolioController) {
        this.cardDetailPortfolioController = cardDetailPortfolioController;
        this.childControllers.push(cardDetailPortfolioController);
    };
    cardDetailController.prototype.registerCardDetailEducationController = function (cardDetailEducationController) {
        this.cardDetailEducationController = cardDetailEducationController;
        this.childControllers.push(cardDetailEducationController);
    };
    cardDetailController.prototype.registerCardDetailExperienceController = function (cardDetailExperienceController) {
        this.cardDetailExperienceController = cardDetailExperienceController;
        this.childControllers.push(cardDetailExperienceController);
    };
    Object.defineProperty(cardDetailController.prototype, "isNew", {
        get: function () {
            var self = this;
            return self.baseController.isNullOrUndefined(self.id);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailController.prototype, "isEditable", {
        get: function () {
            var self = this;
            if (!self.baseController.commonController.hasEditPermission()) {
                return false;
            }
            return self.screenModeManager.currentMode == SCREEN_MODE.ADD || self.screenModeManager.currentMode == SCREEN_MODE.EDIT;
        },
        enumerable: true,
        configurable: true
    });
    cardDetailController.prototype.initVariables = function () {
        var self = this;
        this.baseController = this.scope.baseController;
    };
    cardDetailController.prototype.setInfo = function (id, mode, structureType) {
        var self = this;
        self.formValidator = new formValidator(self.$parse, self.toaster, self.scope, self.formName);
        self.id = id;
        self.screenModeManager = new screenModeManager(self, self.saveMethod, false);
        self.screenModeManager.currentMode = mode;
        self.structureType = structureType;
        self.loadScreenConstants();
        if (mode == SCREEN_MODE.ADD) {
            self.step = cardDetailStepInfo.EDIT; //TODO: Change to email.
            var _card = new cardDetailViewModel();
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
        }
        else {
            self.step = cardDetailStepInfo.EDIT;
            self.loadEntity();
        }
        self.initialize();
    };
    cardDetailController.prototype.initialize = function () {
        var self = this;
    };
    cardDetailController.prototype.goToStep = function (step) {
        var self = this;
        self.step = step;
    };
    cardDetailController.prototype.loadEntity = function () {
        var self = this;
        self.baseController.showLoading();
        var _getBookingSettingDto = new getCardDto();
        _getBookingSettingDto.idStructure = self.id;
        self.cardDetailWebService.getCard(_getBookingSettingDto)
            .then(function (response) {
            if (response.status == STATUS_MESSAGE.SUCCESS) {
                self.screenModeManager.setEntity(self.formatEntity(response.result));
                self.onCardDetailLoaded();
            }
            else {
                self.baseController.showMessage(response.errorMessage, "", ALERT_MESSAGE_TYPE.ERROR);
            }
        }).catch(function (errorMsg) {
            self.baseController.showMessage(errorMsg, "We encountered a problem while processing your request. Please try again later or contact support (contact@connectus.mu) if the issue persists.", ALERT_MESSAGE_TYPE.ERROR);
        }).finally(function () {
            self.baseController.hideLoading();
        });
    };
    cardDetailController.prototype.formatEntity = function (entity) {
        var self = this;
        var returnData = JSON.parse(JSON.stringify(entity));
        return self.applyObjectCorrections(returnData);
    };
    cardDetailController.prototype.applyObjectCorrections = function (item) {
        var self = this;
        if (!self.baseController.isNullOrUndefined(item.structureFields) && item.structureFields.length > 0) {
            // First ensure all fields have a displayOrder
            var maxOrder_1 = 0;
            item.structureFields.forEach(function (field) {
                if (!field.displayOrder && field.displayOrder !== 0) {
                    maxOrder_1 = Math.max.apply(Math, item.structureFields.map(function (f) { return f.displayOrder || 0; }));
                    field.displayOrder = maxOrder_1 + 1;
                }
            });
            // Sort by displayOrder
            item.structureFields.sort(function (a, b) {
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
    };
    cardDetailController.prototype.saveMethod = function (modifiedEntity, caller) {
        var self = caller;
        self.registerValidations();
        if (!self.validateForGroups()) {
            // self.screenModeManager.setMode(SCREEN_MODE.EDIT);
            return;
        }
        if (!self.baseController.isNullOrUndefined(self.cardDetailOpeningHoursController)) {
            self.cardDetailOpeningHoursController.saveOpeningHours();
        }
        var _saveCardDto = self.formatEntityBeforeSave(self.cardDetail);
        self.baseController.showLoading();
        self.cardDetailWebService.saveCard(_saveCardDto)
            .then(function (response) {
            if (response.status == STATUS_MESSAGE.SUCCESS) {
                self.baseController.showToast(TOASTER_TYPE.SUCCESS, "Saved successfully");
                self.screenModeManager.setEntity(self.formatEntity(response.result));
                self.id = response.result.idStructure;
                self.formatOnAllDetail();
            }
            else {
                self.baseController.showMessage(response.errorMessage, "", ALERT_MESSAGE_TYPE.ERROR, false, null, true);
            }
        }).catch(function (errorMsg) {
            self.baseController.showMessage(errorMsg, "We encountered a problem while processing your request. Please try again later or contact support (contact@connectus.mu) if the issue persists.", ALERT_MESSAGE_TYPE.ERROR);
            self.screenModeManager.setMode(SCREEN_MODE.EDIT);
        }).finally(function () {
            self.baseController.hideLoading();
        });
    };
    cardDetailController.prototype.registerValidations = function () {
        var self = this;
        for (var i = 0; i < self.childControllers.length; i++) {
            var currentChild = self.childControllers[i];
            currentChild.registerValidations();
        }
    };
    cardDetailController.prototype.validateForGroups = function () {
        var self = this;
        var isValid = true;
        var errorMessages = [];
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
    };
    cardDetailController.prototype.idGroupValid = function (profileTab) {
        var self = this;
        var isValid = true;
        var groupName = cardDetailTabNameFromEnum.getName(profileTab);
        var childValidator = Enumerable.From(self.childControllers).Where(function (childController) {
            return childController.groupName == groupName;
        }).FirstOrDefault(null);
        if (childValidator != null && childValidator.hasScreenDetailBeenLoaded) {
            isValid = childValidator.formValidator.validateGroup(groupName, false);
        }
        return isValid;
    };
    cardDetailController.prototype.loadScreenConstants = function () {
        var self = this;
        self.cardDetailWebService.getCardDetaiScreenConstant()
            .then(function (response) {
            if (response.status == STATUS_MESSAGE.SUCCESS) {
                self.preloadedData.structureFields = response.result.structureFields;
                self.formatScreenConstant(response.result);
                self.onScreenDetailLoaded();
            }
            else {
                self.baseController.showMessage(response.errorMessage, "", ALERT_MESSAGE_TYPE.ERROR);
            }
        }).catch(function (errorMsg) {
            self.baseController.showMessage(errorMsg, "We encountered a problem while processing your request. Please try again later or contact support (contact@connectus.mu) if the issue persists.", ALERT_MESSAGE_TYPE.ERROR);
        }).finally(function () {
            self.baseController.hideLoading();
        });
    };
    cardDetailController.prototype.formatScreenConstant = function (data) {
        var self = this;
        var fields = data.structureFields;
        var groups = {};
        fields.forEach(function (field) {
            var key = field.isPopular ? 'Popular' : field.structureFieldCategory;
            if (!groups[key]) {
                groups[key] = [];
            }
            groups[key].push(field);
        });
        var sortedKeys = Object.keys(groups)
            .filter(function (k) { return k !== 'Popular'; })
            .sort(function (a, b) { return a.localeCompare(b); });
        var finalGroup = [];
        if (groups['Popular']) {
            finalGroup.push({ category: 'Popular', items: groups['Popular'] });
        }
        sortedKeys.forEach(function (k) {
            finalGroup.push({ category: k, items: groups[k] });
        });
        self.groupFieldCategories = finalGroup;
        if (self.structureType == this.structureTypeEnum.INDIVIDUAL) {
            self.baseSlugUrl = data.individualBaseSlugUrl;
            self.profileColorVariants = data.individualProfileColorVariants;
        }
        else if (self.structureType == this.structureTypeEnum.LEGAL_ENTITY) {
            self.baseSlugUrl = data.legalEntityBaseSlugUrl;
            self.profileColorVariants = data.legalEntityProfileColorVariants;
        }
        self.profileColorVariants = data.individualProfileColorVariants;
        self.structurerCategoriesHiearchy = flattenCategories(data.structurerCategoriesHiearchy);
    };
    cardDetailController.prototype.onCardDetailLoaded = function () {
        var self = this;
        self.hasCardDetailBeenLoaded = true;
        self.onAllDetailLoaded();
    };
    cardDetailController.prototype.onScreenDetailLoaded = function () {
        var self = this;
        self.hasScreenDetailBeenLoaded = true;
        self.onAllDetailLoaded();
    };
    cardDetailController.prototype.onAllDetailLoaded = function () {
        var self = this;
        if (self.hasScreenDetailBeenLoaded && self.hasCardDetailBeenLoaded) {
            self.formatOnAllDetail();
            self.childControllers.forEach(function (controller) {
                controller.onDetailLoaded();
            });
        }
    };
    cardDetailController.prototype.formatOnAllDetail = function () {
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
            self.cardDetail.addresses.sort(function (a, b) {
                return (a.displayOrder || 0) - (b.displayOrder || 0);
            });
        }
        //sort accordions
        if (!self.baseController.isNullOrUndefined(self.cardDetail.accordions) && self.cardDetail.accordions.length > 0) {
            self.cardDetail.accordions.sort(function (a, b) {
                return (a.displayOrder || 0) - (b.displayOrder || 0);
            });
        }
        //sort features
        if (!self.baseController.isNullOrUndefined(self.cardDetail.features) && self.cardDetail.features.length > 0) {
            self.cardDetail.features.sort(function (a, b) {
                return (a.displayOrder || 0) - (b.displayOrder || 0);
            });
        }
        //sort gallery
        if (!self.baseController.isNullOrUndefined(self.cardDetail.gallery) && self.cardDetail.gallery.length > 0) {
            self.cardDetail.gallery.sort(function (a, b) {
                return (a.displayOrder || 0) - (b.displayOrder || 0);
            });
        }
        //sort education
        if (!self.baseController.isNullOrUndefined(self.cardDetail.education) && self.cardDetail.education.length > 0) {
            self.cardDetail.education.sort(function (a, b) {
                return (a.displayOrder || 0) - (b.displayOrder || 0);
            });
        }
        //sort experience
        if (!self.baseController.isNullOrUndefined(self.cardDetail.experience) && self.cardDetail.experience.length > 0) {
            self.cardDetail.experience.sort(function (a, b) {
                return (a.displayOrder || 0) - (b.displayOrder || 0);
            });
        }
        //sort members
        if (!self.baseController.isNullOrUndefined(self.cardDetail.members) && self.cardDetail.members.length > 0) {
            self.cardDetail.members.sort(function (a, b) {
                return (a.displayOrder || 0) - (b.displayOrder || 0);
            });
        }
        //sort tags
        if (!self.baseController.isNullOrUndefined(self.cardDetail.tags) && self.cardDetail.tags.length > 0) {
            self.cardDetail.tags.sort(function (a, b) {
                return (a.displayOrder || 0) - (b.displayOrder || 0);
            });
        }
        //sort portfolios
        if (!self.baseController.isNullOrUndefined(self.cardDetail.portfolios) && self.cardDetail.portfolios.length > 0) {
            self.cardDetail.portfolios.sort(function (a, b) {
                return (a.displayOrder || 0) - (b.displayOrder || 0);
            });
        }
    };
    cardDetailController.prototype.formatEntityBeforeSave = function (entity) {
        var self = this;
        var formattedEntity = self.baseController.cloneObject(entity);
        return formattedEntity;
    };
    cardDetailController.prototype.setCurrentState = function (cardDetailTab) {
        var self = this;
        self.currentState = cardDetailTab;
    };
    cardDetailController.prototype.upload = function (file, arrayToUpload, isArray) {
        var self = this;
        self.baseController.upload(file, arrayToUpload, isArray);
    };
    cardDetailController.prototype.deleteImage = function (picture, pictureDataList, isArray) {
        var self = this;
        self.baseController.deleteImage(picture, pictureDataList, isArray);
    };
    cardDetailController.prototype.onNextClick = function () {
        var self = this;
        self.step = self.step + 1;
    };
    return cardDetailController;
}());
cardModule.controller("cardDetailController", ["$scope",
    "$parse",
    "toaster",
    "cardWebService",
    cardDetailController
]);
var cardDetailTab;
(function (cardDetailTab) {
    cardDetailTab[cardDetailTab["BASIC_INFO"] = 1] = "BASIC_INFO";
    cardDetailTab[cardDetailTab["INFORMATION"] = 2] = "INFORMATION";
    cardDetailTab[cardDetailTab["FIELDS"] = 3] = "FIELDS";
    cardDetailTab[cardDetailTab["SETTINGS"] = 4] = "SETTINGS";
    cardDetailTab[cardDetailTab["EDUCATION"] = 5] = "EDUCATION";
    cardDetailTab[cardDetailTab["EXPERIENCE"] = 6] = "EXPERIENCE";
    cardDetailTab[cardDetailTab["OTHER_SECTIONS"] = 7] = "OTHER_SECTIONS";
    cardDetailTab[cardDetailTab["MESSAGES"] = 8] = "MESSAGES";
    cardDetailTab[cardDetailTab["OPENING_HOURS"] = 9] = "OPENING_HOURS";
    cardDetailTab[cardDetailTab["PORTFOLIO"] = 10] = "PORTFOLIO";
})(cardDetailTab || (cardDetailTab = {}));
var cardDetailStepInfo;
(function (cardDetailStepInfo) {
    cardDetailStepInfo[cardDetailStepInfo["EMAIL"] = 1] = "EMAIL";
    cardDetailStepInfo[cardDetailStepInfo["COMPANY"] = 2] = "COMPANY";
    cardDetailStepInfo[cardDetailStepInfo["PHOTO"] = 3] = "PHOTO";
    cardDetailStepInfo[cardDetailStepInfo["PHONE"] = 4] = "PHONE";
    cardDetailStepInfo[cardDetailStepInfo["EDIT"] = 5] = "EDIT";
})(cardDetailStepInfo || (cardDetailStepInfo = {}));
var cardDetailTabNameFromEnum = /** @class */ (function () {
    function cardDetailTabNameFromEnum() {
    }
    cardDetailTabNameFromEnum.getName = function (_subscriptionSettingTab) {
        var name;
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
    };
    return cardDetailTabNameFromEnum;
}());
var cardDetailViewModel = /** @class */ (function (_super) {
    __extends(cardDetailViewModel, _super);
    function cardDetailViewModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return cardDetailViewModel;
}(structureModel));
function flattenCategories(categories, parentPath) {
    if (parentPath === void 0) { parentPath = ''; }
    var flattened = [];
    for (var _i = 0, categories_1 = categories; _i < categories_1.length; _i++) {
        var category = categories_1[_i];
        var currentPath = parentPath ? parentPath + " : " + category.name : category.name;
        if (category.children && category.children.length > 0) {
            flattened.push.apply(flattened, flattenCategories(category.children, currentPath));
        }
        else {
            flattened.push({
                id: category.idStructureCategory,
                hierarchy: currentPath
            });
        }
    }
    return flattened;
}
