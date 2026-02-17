var cardDetailExperienceController = /** @class */ (function () {
    function cardDetailExperienceController($scope, $parse, toaster, cardWebService) {
        this.$scope = $scope;
        this.$parse = $parse;
        this.toaster = toaster;
        this.groupName = cardDetailTabNameFromEnum.getName(cardDetailTab.EXPERIENCE);
        this.cardDetailTabEnum = cardDetailTab;
        this.experienceDragStartIndex = null;
        this.scope = $scope;
        this.scope.controller = this;
        this.callerController = $scope.$parent.controller;
        this.baseController = $scope.baseController;
        this.cardWebService = cardWebService;
        this.callerController.registerCardDetailExperienceController(this);
        this.initialize();
    }
    Object.defineProperty(cardDetailExperienceController.prototype, "hasScreenDetailBeenLoaded", {
        get: function () {
            return this.callerController.hasScreenDetailBeenLoaded;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailExperienceController.prototype, "hasCardDetailBeenLoaded", {
        get: function () {
            return this.callerController.hasCardDetailBeenLoaded;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailExperienceController.prototype, "screenMode", {
        get: function () {
            return this.callerController.screenModeManager.currentMode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailExperienceController.prototype, "cardDetail", {
        get: function () {
            return this.callerController.screenModeManager.entity;
        },
        set: function (value) {
            this.callerController.screenModeManager.entity = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailExperienceController.prototype, "isEditable", {
        get: function () {
            var self = this;
            return self.callerController.isEditable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailExperienceController.prototype, "isNew", {
        get: function () {
            var self = this;
            return self.callerController.isNew;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailExperienceController.prototype, "formName", {
        get: function () {
            return this.callerController.formName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailExperienceController.prototype, "isCardStateEditable", {
        get: function () {
            var self = this;
            var isAdmin = self.baseController.commonController.isAdmin();
            return self.callerController.isEditable && isAdmin;
        },
        enumerable: true,
        configurable: true
    });
    cardDetailExperienceController.prototype.initialize = function () {
        var self = this;
        self.registerValidations();
    };
    cardDetailExperienceController.prototype.registerValidations = function () {
        var self = this;
        if (self.formValidator != null) {
            self.formValidator.deRegister();
        }
        self.formValidator = new formValidator(this.$parse, this.toaster, self.scope, self.formName);
        self.formValidator.registerGroupValidation(self.groupName, []);
    };
    cardDetailExperienceController.prototype.onDetailLoaded = function () {
        var self = this;
    };
    cardDetailExperienceController.prototype.upload = function (file, arrayToUpload, isArray) {
        var self = this;
        self.baseController.upload(file, arrayToUpload, isArray);
    };
    cardDetailExperienceController.prototype.deleteImage = function (picture, pictureDataList, isArray) {
        var self = this;
        self.baseController.deleteImage(picture, pictureDataList, isArray);
    };
    cardDetailExperienceController.prototype.addExperience = function () {
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
    };
    cardDetailExperienceController.prototype.removeExperience = function (experience) {
        var self = this;
        var position = self.baseController.searchForEntityInList("idStructureExperience", self.cardDetail.experience, experience, "idLocal");
        if (!self.baseController.isNullOrUndefined(position) && position > -1) {
            self.cardDetail.experience.splice(position, 1);
        }
        this.cardDetail.experience.forEach(function (experience, i) {
            experience.displayOrder = i + 1;
        });
    };
    // Experience Drag and Drop Methods
    cardDetailExperienceController.prototype.handleExperienceDragStart = function (event, index) {
        this.experienceDragStartIndex = index;
        if (event.dataTransfer) {
            event.dataTransfer.effectAllowed = 'move';
        }
    };
    cardDetailExperienceController.prototype.handleExperienceDragOver = function (event, index) {
        event.preventDefault(); // Allow drop
    };
    cardDetailExperienceController.prototype.handleExperienceDrop = function (event, dropIndex) {
        event.preventDefault();
        var fromIndex = this.experienceDragStartIndex;
        var toIndex = dropIndex;
        if (fromIndex === null || fromIndex === toIndex)
            return;
        var item = this.cardDetail.experience[fromIndex];
        this.cardDetail.experience.splice(fromIndex, 1);
        this.cardDetail.experience.splice(toIndex, 0, item);
        this.cardDetail.experience.forEach(function (experience, i) {
            experience.displayOrder = i + 1;
        });
        this.experienceDragStartIndex = null;
        this.$scope.$apply(); // trigger digest
    };
    cardDetailExperienceController.prototype.handleExperienceDragEnd = function (event) {
        this.experienceDragStartIndex = null;
    };
    // Experience Skills Methods
    cardDetailExperienceController.prototype.addSkill = function (experience) {
        var self = this;
        if (!experience.skills) {
            experience.skills = [];
        }
        var newSkill = {
            name: '',
            idLocal: self.baseController.generateUUID(),
            idStructureExperience: experience.idLocal
        };
        experience.skills.push(newSkill);
    };
    cardDetailExperienceController.prototype.removeSkill = function (experience, skill) {
        var self = this;
        var position = self.baseController.searchForEntityInList("idStructureExperienceSkill", experience.skills, skill, "idLocal");
        if (!self.baseController.isNullOrUndefined(position) && position > -1) {
            experience.skills.splice(position, 1);
        }
    };
    // Experience Media Methods
    cardDetailExperienceController.prototype.addMedia = function (experience) {
        var self = this;
        if (!experience.media) {
            experience.media = [];
        }
        var newMedia = {
            idLocal: self.baseController.generateUUID(),
            idStructureExperience: experience.idLocal,
            document: new pictureDataModel()
        };
        experience.media.push(newMedia);
    };
    cardDetailExperienceController.prototype.removeMedia = function (experience, media) {
        var self = this;
        var position = self.baseController.searchForEntityInList("idStructureExperienceMedia", experience.media, media, "idLocal");
        if (!self.baseController.isNullOrUndefined(position) && position > -1) {
            experience.media.splice(position, 1);
        }
    };
    return cardDetailExperienceController;
}());
cardModule.controller("cardDetailExperienceController", ["$scope",
    "$parse",
    "toaster",
    "cardWebService",
    cardDetailExperienceController
]);
