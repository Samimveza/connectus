var cardDetailFieldsController = /** @class */ (function () {
    function cardDetailFieldsController($scope, $parse, toaster, cardWebService) {
        var _this = this;
        this.$scope = $scope;
        this.$parse = $parse;
        this.toaster = toaster;
        this.groupName = cardDetailTabNameFromEnum.getName(cardDetailTab.FIELDS);
        this.cardDetailTabEnum = cardDetailTab;
        this.filterFields = function (item) {
            if (!_this.searchQuery)
                return true;
            return item.name.toLowerCase().includes(_this.searchQuery.toLowerCase());
        };
        this.dragStartIndex = null;
        this.scope = $scope;
        this.scope.controller = this;
        this.callerController = $scope.$parent.controller;
        this.baseController = $scope.baseController;
        this.cardWebService = cardWebService;
        this.callerController.registerCardDetailFieldsController(this);
        this.initialize();
    }
    Object.defineProperty(cardDetailFieldsController.prototype, "hasScreenDetailBeenLoaded", {
        get: function () {
            return this.callerController.hasScreenDetailBeenLoaded;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailFieldsController.prototype, "hasCardDetailBeenLoaded", {
        get: function () {
            return this.callerController.hasCardDetailBeenLoaded;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailFieldsController.prototype, "screenMode", {
        get: function () {
            return this.callerController.screenModeManager.currentMode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailFieldsController.prototype, "cardDetail", {
        get: function () {
            return this.callerController.screenModeManager.entity;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailFieldsController.prototype, "isEditable", {
        get: function () {
            var self = this;
            return self.callerController.isEditable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailFieldsController.prototype, "isNew", {
        get: function () {
            var self = this;
            return self.callerController.isNew;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailFieldsController.prototype, "formName", {
        get: function () {
            return this.callerController.formName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailFieldsController.prototype, "isCardStateEditable", {
        get: function () {
            var self = this;
            var isAdmin = self.baseController.commonController.isAdmin();
            return self.callerController.isEditable && isAdmin;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailFieldsController.prototype, "structureFields", {
        get: function () {
            var self = this;
            return self.callerController.groupFieldCategories;
        },
        enumerable: true,
        configurable: true
    });
    cardDetailFieldsController.prototype.initialize = function () {
        var self = this;
        self.registerValidations();
    };
    cardDetailFieldsController.prototype.registerValidations = function () {
        var self = this;
        if (self.formValidator != null) {
            self.formValidator.deRegister();
        }
        self.formValidator = new formValidator(this.$parse, this.toaster, self.scope, self.formName);
        self.formValidator.registerGroupValidation(self.groupName, []);
    };
    cardDetailFieldsController.prototype.onDetailLoaded = function () {
        var self = this;
    };
    cardDetailFieldsController.prototype.upload = function (file, arrayToUpload, isArray) {
        var self = this;
        if (self.baseController.isNullOrUndefined(arrayToUpload.document)) {
            arrayToUpload.document = {};
        }
        self.baseController.upload(file, arrayToUpload.document, isArray);
    };
    cardDetailFieldsController.prototype.deleteImage = function (picture, pictureDataList, isArray) {
        var self = this;
        self.baseController.deleteImage(picture, pictureDataList, isArray);
    };
    cardDetailFieldsController.prototype.removeField = function (structureField) {
        var self = this;
        var position = self.baseController.searchForEntityInList("idStructureStructureFieldReference", self.cardDetail.structureFields, structureField, "idLocal");
        if (!self.baseController.isNullOrUndefined(position) && position > -1) {
            self.cardDetail.structureFields.splice(position, 1);
        }
    };
    cardDetailFieldsController.prototype.addField = function (field) {
        var self = this;
        var structure_StructureField = new structure_StructureFieldModel();
        structure_StructureField.idLocal = self.baseController.generateUUID();
        structure_StructureField.idStructureField = field.idStructureField;
        structure_StructureField.structureField = field;
        structure_StructureField.displayOrder = self.cardDetail.structureFields.length + 1;
        self.cardDetail.structureFields.push(structure_StructureField);
    };
    cardDetailFieldsController.prototype.handleDragStart = function (event, index) {
        this.dragStartIndex = index;
        event.dataTransfer.effectAllowed = 'move';
    };
    cardDetailFieldsController.prototype.handleDragOver = function (event, index) {
        event.preventDefault(); // Allow drop
    };
    cardDetailFieldsController.prototype.handleDrop = function (event, dropIndex) {
        event.preventDefault();
        var fromIndex = this.dragStartIndex;
        var toIndex = dropIndex;
        if (fromIndex === null || fromIndex === toIndex)
            return;
        var item = this.cardDetail.structureFields[fromIndex];
        this.cardDetail.structureFields.splice(fromIndex, 1);
        this.cardDetail.structureFields.splice(toIndex, 0, item);
        // Optional: update displayOrder
        this.cardDetail.structureFields.forEach(function (f, i) { return f.displayOrder = i + 1; });
        this.dragStartIndex = null;
        this.scope.$apply(); // trigger digest
    };
    cardDetailFieldsController.prototype.handleDragEnd = function (event) {
        this.dragStartIndex = null;
    };
    return cardDetailFieldsController;
}());
cardModule.controller("cardDetailFieldsController", ["$scope",
    "$parse",
    "toaster",
    "cardWebService",
    cardDetailFieldsController
]);
