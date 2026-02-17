var cardDetailOtherSectionController = /** @class */ (function () {
    function cardDetailOtherSectionController($scope, $parse, toaster, cardWebService) {
        this.$scope = $scope;
        this.$parse = $parse;
        this.toaster = toaster;
        this.groupName = cardDetailTabNameFromEnum.getName(cardDetailTab.OTHER_SECTIONS);
        this.cardDetailTabEnum = cardDetailTab;
        this.accordionDragStartIndex = null;
        this.galleryDragStartIndex = null;
        this.memberDragStartIndex = null;
        this.scope = $scope;
        this.scope.controller = this;
        this.callerController = $scope.$parent.controller;
        this.baseController = $scope.baseController;
        this.cardWebService = cardWebService;
        this.callerController.registerCardDetailOtherSectionController(this);
        this.initialize();
    }
    Object.defineProperty(cardDetailOtherSectionController.prototype, "hasScreenDetailBeenLoaded", {
        get: function () {
            return this.callerController.hasScreenDetailBeenLoaded;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailOtherSectionController.prototype, "hasCardDetailBeenLoaded", {
        get: function () {
            return this.callerController.hasCardDetailBeenLoaded;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailOtherSectionController.prototype, "screenMode", {
        get: function () {
            return this.callerController.screenModeManager.currentMode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailOtherSectionController.prototype, "cardDetail", {
        get: function () {
            return this.callerController.screenModeManager.entity;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailOtherSectionController.prototype, "isEditable", {
        get: function () {
            var self = this;
            return self.callerController.isEditable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailOtherSectionController.prototype, "isNew", {
        get: function () {
            var self = this;
            return self.callerController.isNew;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailOtherSectionController.prototype, "formName", {
        get: function () {
            return this.callerController.formName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailOtherSectionController.prototype, "isCardStateEditable", {
        get: function () {
            var self = this;
            var isAdmin = self.baseController.commonController.isAdmin();
            return self.callerController.isEditable && isAdmin;
        },
        enumerable: true,
        configurable: true
    });
    cardDetailOtherSectionController.prototype.initialize = function () {
        var self = this;
        self.registerValidations();
    };
    cardDetailOtherSectionController.prototype.registerValidations = function () {
        var self = this;
        if (self.formValidator != null) {
            self.formValidator.deRegister();
        }
        self.formValidator = new formValidator(this.$parse, this.toaster, self.scope, self.formName);
        self.formValidator.registerGroupValidation(self.groupName, []);
    };
    cardDetailOtherSectionController.prototype.onDetailLoaded = function () {
        var self = this;
    };
    cardDetailOtherSectionController.prototype.upload = function (file, arrayToUpload, isArray) {
        var self = this;
        self.baseController.upload(file, arrayToUpload, isArray);
    };
    // Company Features Methods
    cardDetailOtherSectionController.prototype.addAccordion = function () {
        var self = this;
        var newAccordion = {
            name: '',
            description: '',
            displayOrder: this.cardDetail.accordions.length + 1,
            idLocal: self.baseController.generateUUID()
        };
        this.cardDetail.accordions.push(newAccordion);
    };
    cardDetailOtherSectionController.prototype.removeAccordion = function (accordion) {
        var self = this;
        var position = self.baseController.searchForEntityInList("idStructureAccordionReference", self.cardDetail.accordions, accordion, "idLocal");
        if (!self.baseController.isNullOrUndefined(position) && position > -1) {
            self.cardDetail.accordions.splice(position, 1);
        }
        // Update display order for remaining features
        this.cardDetail.accordions.forEach(function (accordion, i) {
            accordion.displayOrder = i + 1;
        });
    };
    // Feature Drag and Drop Methods
    cardDetailOtherSectionController.prototype.handleAccordionDragStart = function (event, index) {
        this.accordionDragStartIndex = index;
        event.dataTransfer.effectAllowed = 'move';
    };
    cardDetailOtherSectionController.prototype.handleAccordionDragOver = function (event, index) {
        event.preventDefault(); // Allow drop
    };
    cardDetailOtherSectionController.prototype.handleAccordionDrop = function (event, dropIndex) {
        event.preventDefault();
        var fromIndex = this.accordionDragStartIndex;
        var toIndex = dropIndex;
        if (fromIndex === null || fromIndex === toIndex)
            return;
        var item = this.cardDetail.accordions[fromIndex];
        this.cardDetail.accordions.splice(fromIndex, 1);
        this.cardDetail.accordions.splice(toIndex, 0, item);
        // Update displayOrder
        this.cardDetail.accordions.forEach(function (accordion, i) {
            accordion.displayOrder = i + 1;
        });
        this.accordionDragStartIndex = null;
        this.$scope.$apply(); // trigger digest
    };
    cardDetailOtherSectionController.prototype.handleAccordionDragEnd = function (event) {
        this.accordionDragStartIndex = null;
    };
    // Company Gallery Methods
    cardDetailOtherSectionController.prototype.addGallery = function () {
        var self = this;
        var newGallery = {
            displayOrder: this.cardDetail.gallery.length + 1,
            image: {},
            idLocal: self.baseController.generateUUID()
        };
        this.cardDetail.gallery.push(newGallery);
    };
    cardDetailOtherSectionController.prototype.removeGallery = function (gallery) {
        var self = this;
        var position = self.baseController.searchForEntityInList("idStructureGalleryReference", self.cardDetail.gallery, gallery, "idLocal");
        if (!self.baseController.isNullOrUndefined(position) && position > -1) {
            self.cardDetail.gallery.splice(position, 1);
        }
        // Update display order for remaining gallery
        this.cardDetail.gallery.forEach(function (gallery, i) {
            gallery.displayOrder = i + 1;
        });
    };
    // Feature Drag and Drop Methods
    cardDetailOtherSectionController.prototype.handleGalleryDragStart = function (event, index) {
        this.galleryDragStartIndex = index;
        event.dataTransfer.effectAllowed = 'move';
    };
    cardDetailOtherSectionController.prototype.handleGalleryDragOver = function (event, index) {
        event.preventDefault(); // Allow drop
    };
    cardDetailOtherSectionController.prototype.handleGalleryDrop = function (event, dropIndex) {
        event.preventDefault();
        var fromIndex = this.galleryDragStartIndex;
        var toIndex = dropIndex;
        if (fromIndex === null || fromIndex === toIndex)
            return;
        var item = this.cardDetail.gallery[fromIndex];
        this.cardDetail.gallery.splice(fromIndex, 1);
        this.cardDetail.gallery.splice(toIndex, 0, item);
        // Update displayOrder
        this.cardDetail.gallery.forEach(function (gallery, i) {
            gallery.displayOrder = i + 1;
        });
        this.galleryDragStartIndex = null;
        this.$scope.$apply(); // trigger digest
    };
    cardDetailOtherSectionController.prototype.handleGalleryDragEnd = function (event) {
        this.galleryDragStartIndex = null;
    };
    // Company Team Members Methods
    cardDetailOtherSectionController.prototype.addMember = function () {
        var self = this;
        var newMember = {
            firstName: '',
            lastName: '',
            title: '',
            description: '',
            photo: {},
            displayOrder: this.cardDetail.members.length + 1,
            idLocal: self.baseController.generateUUID()
        };
        this.cardDetail.members.push(newMember);
    };
    cardDetailOtherSectionController.prototype.removeMember = function (member) {
        var self = this;
        var position = self.baseController.searchForEntityInList("idStructureMemberReference", self.cardDetail.members, member, "idLocal");
        console.log(member);
        console.log(position);
        if (!self.baseController.isNullOrUndefined(position) && position > -1) {
            self.cardDetail.members.splice(position, 1);
        }
        // Update display order for remaining team members
        this.cardDetail.members.forEach(function (member, i) {
            member.displayOrder = i + 1;
        });
    };
    // Team Member Drag and Drop Methods
    cardDetailOtherSectionController.prototype.handleMemberDragStart = function (event, index) {
        this.memberDragStartIndex = index;
        event.dataTransfer.effectAllowed = 'move';
    };
    cardDetailOtherSectionController.prototype.handleMemberDragOver = function (event, index) {
        event.preventDefault(); // Allow drop
    };
    cardDetailOtherSectionController.prototype.handleMemberDrop = function (event, dropIndex) {
        event.preventDefault();
        var fromIndex = this.memberDragStartIndex;
        var toIndex = dropIndex;
        if (fromIndex === null || fromIndex === toIndex)
            return;
        var item = this.cardDetail.members[fromIndex];
        this.cardDetail.members.splice(fromIndex, 1);
        this.cardDetail.members.splice(toIndex, 0, item);
        // Update displayOrder
        this.cardDetail.members.forEach(function (member, i) {
            member.displayOrder = i + 1;
        });
        this.memberDragStartIndex = null;
        this.$scope.$apply(); // trigger digest
    };
    cardDetailOtherSectionController.prototype.handleMemberDragEnd = function (event) {
        this.memberDragStartIndex = null;
    };
    return cardDetailOtherSectionController;
}());
cardModule.controller("cardDetailOtherSectionController", ["$scope",
    "$parse",
    "toaster",
    "cardWebService",
    cardDetailOtherSectionController
]);
