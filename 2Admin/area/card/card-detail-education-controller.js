var cardDetailEducationController = /** @class */ (function () {
    function cardDetailEducationController($scope, $parse, toaster, cardWebService) {
        this.$scope = $scope;
        this.$parse = $parse;
        this.toaster = toaster;
        this.groupName = cardDetailTabNameFromEnum.getName(cardDetailTab.EDUCATION);
        this.cardDetailTabEnum = cardDetailTab;
        // Drag state for education items
        this.educationDragStartIndex = null;
        this.scope = $scope;
        this.scope.controller = this;
        this.callerController = $scope.$parent.controller;
        this.baseController = $scope.baseController;
        this.cardWebService = cardWebService;
        this.callerController.registerCardDetailEducationController(this);
        this.initialize();
    }
    Object.defineProperty(cardDetailEducationController.prototype, "hasScreenDetailBeenLoaded", {
        get: function () {
            return this.callerController.hasScreenDetailBeenLoaded;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailEducationController.prototype, "hasCardDetailBeenLoaded", {
        get: function () {
            return this.callerController.hasCardDetailBeenLoaded;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailEducationController.prototype, "screenMode", {
        get: function () {
            return this.callerController.screenModeManager.currentMode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailEducationController.prototype, "cardDetail", {
        get: function () {
            return this.callerController.screenModeManager.entity;
        },
        set: function (value) {
            this.callerController.screenModeManager.entity = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailEducationController.prototype, "isEditable", {
        get: function () {
            var self = this;
            return self.callerController.isEditable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailEducationController.prototype, "isNew", {
        get: function () {
            var self = this;
            return self.callerController.isNew;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailEducationController.prototype, "formName", {
        get: function () {
            return this.callerController.formName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailEducationController.prototype, "isCardStateEditable", {
        get: function () {
            var self = this;
            var isAdmin = self.baseController.commonController.isAdmin();
            return self.callerController.isEditable && isAdmin;
        },
        enumerable: true,
        configurable: true
    });
    cardDetailEducationController.prototype.initialize = function () {
        var self = this;
        self.registerValidations();
    };
    cardDetailEducationController.prototype.registerValidations = function () {
        var self = this;
        if (self.formValidator != null) {
            self.formValidator.deRegister();
        }
        self.formValidator = new formValidator(this.$parse, this.toaster, self.scope, self.formName);
        self.formValidator.registerGroupValidation(self.groupName, []);
    };
    cardDetailEducationController.prototype.onDetailLoaded = function () {
        var self = this;
    };
    cardDetailEducationController.prototype.upload = function (file, arrayToUpload, isArray) {
        var self = this;
        self.baseController.upload(file, arrayToUpload, isArray);
    };
    cardDetailEducationController.prototype.deleteImage = function (picture, pictureDataList, isArray) {
        var self = this;
        self.baseController.deleteImage(picture, pictureDataList, isArray);
    };
    cardDetailEducationController.prototype.addEducation = function () {
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
    };
    cardDetailEducationController.prototype.removeEducation = function (education) {
        var self = this;
        var position = self.baseController.searchForEntityInList("idStructureEducation", self.cardDetail.education, education, "idLocal");
        if (!self.baseController.isNullOrUndefined(position) && position > -1) {
            self.cardDetail.education.splice(position, 1);
        }
        // Update display order for remaining education items
        this.cardDetail.education.forEach(function (education, i) {
            education.displayOrder = i + 1;
        });
    };
    // Education Drag and Drop Methods
    cardDetailEducationController.prototype.handleEducationDragStart = function (event, index) {
        this.educationDragStartIndex = index;
        if (event.dataTransfer) {
            event.dataTransfer.effectAllowed = 'move';
        }
    };
    cardDetailEducationController.prototype.handleEducationDragOver = function (event, index) {
        event.preventDefault(); // Allow drop
    };
    cardDetailEducationController.prototype.handleEducationDrop = function (event, dropIndex) {
        event.preventDefault();
        var fromIndex = this.educationDragStartIndex;
        var toIndex = dropIndex;
        if (fromIndex === null || fromIndex === toIndex)
            return;
        var item = this.cardDetail.education[fromIndex];
        this.cardDetail.education.splice(fromIndex, 1);
        this.cardDetail.education.splice(toIndex, 0, item);
        // Update displayOrder
        this.cardDetail.education.forEach(function (education, i) {
            education.displayOrder = i + 1;
        });
        this.educationDragStartIndex = null;
        this.$scope.$apply(); // trigger digest
    };
    cardDetailEducationController.prototype.handleEducationDragEnd = function (event) {
        this.educationDragStartIndex = null;
    };
    // Education Skills Methods
    cardDetailEducationController.prototype.addSkill = function (education) {
        var self = this;
        if (!education.skills) {
            education.skills = [];
        }
        var newSkill = {
            name: '',
            idLocal: self.baseController.generateUUID(),
            idStructureEducation: education.idLocal
        };
        education.skills.push(newSkill);
    };
    cardDetailEducationController.prototype.removeSkill = function (education, skill) {
        var self = this;
        var position = self.baseController.searchForEntityInList("idStructureEducationSkill", education.skills, skill, "idLocal");
        if (!self.baseController.isNullOrUndefined(position) && position > -1) {
            education.skills.splice(position, 1);
        }
    };
    // Education Media Methods
    cardDetailEducationController.prototype.addMedia = function (education) {
        var self = this;
        if (!education.media) {
            education.media = [];
        }
        var newMedia = {
            idLocal: self.baseController.generateUUID(),
            idStructureEducation: education.idLocal,
            document: new pictureDataModel()
        };
        education.media.push(newMedia);
    };
    cardDetailEducationController.prototype.removeMedia = function (education, media) {
        var self = this;
        var position = self.baseController.searchForEntityInList("idStructureEducationMedia", education.media, media, "idLocal");
        if (!self.baseController.isNullOrUndefined(position) && position > -1) {
            education.media.splice(position, 1);
        }
    };
    return cardDetailEducationController;
}());
cardModule.controller("cardDetailEducationController", ["$scope",
    "$parse",
    "toaster",
    "cardWebService",
    cardDetailEducationController
]);
