var cardDetailPortfolioController = /** @class */ (function () {
    function cardDetailPortfolioController($scope, $parse, toaster, cardWebService) {
        this.$scope = $scope;
        this.$parse = $parse;
        this.toaster = toaster;
        this.groupName = cardDetailTabNameFromEnum.getName(cardDetailTab.PORTFOLIO);
        this.cardDetailTabEnum = cardDetailTab;
        this.portfolioDragStartIndex = null;
        this.scope = $scope;
        this.scope.controller = this;
        this.callerController = $scope.$parent.controller;
        this.baseController = $scope.baseController;
        this.cardWebService = cardWebService;
        this.callerController.registerCardDetailPortfolioController(this);
        this.initialize();
    }
    Object.defineProperty(cardDetailPortfolioController.prototype, "hasScreenDetailBeenLoaded", {
        get: function () {
            return this.callerController.hasScreenDetailBeenLoaded;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailPortfolioController.prototype, "hasCardDetailBeenLoaded", {
        get: function () {
            return this.callerController.hasCardDetailBeenLoaded;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailPortfolioController.prototype, "screenMode", {
        get: function () {
            return this.callerController.screenModeManager.currentMode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailPortfolioController.prototype, "cardDetail", {
        get: function () {
            return this.callerController.screenModeManager.entity;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailPortfolioController.prototype, "isEditable", {
        get: function () {
            var self = this;
            return self.callerController.isEditable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailPortfolioController.prototype, "isNew", {
        get: function () {
            var self = this;
            return self.callerController.isNew;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailPortfolioController.prototype, "formName", {
        get: function () {
            return this.callerController.formName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailPortfolioController.prototype, "isCardStateEditable", {
        get: function () {
            var self = this;
            var isAdmin = self.baseController.commonController.isAdmin();
            return self.callerController.isEditable && isAdmin;
        },
        enumerable: true,
        configurable: true
    });
    cardDetailPortfolioController.prototype.initialize = function () {
        var self = this;
        self.registerValidations();
    };
    cardDetailPortfolioController.prototype.registerValidations = function () {
        var self = this;
        if (self.formValidator != null) {
            self.formValidator.deRegister();
        }
        self.formValidator = new formValidator(this.$parse, this.toaster, self.scope, self.formName);
        self.formValidator.registerGroupValidation(self.groupName, []);
    };
    cardDetailPortfolioController.prototype.onDetailLoaded = function () {
        var self = this;
    };
    cardDetailPortfolioController.prototype.upload = function (file, arrayToUpload, isArray) {
        var self = this;
        self.baseController.upload(file, arrayToUpload, isArray);
    };
    // Company Portfolio Methods
    cardDetailPortfolioController.prototype.addPortfolio = function () {
        var self = this;
        var newPortfolio = {
            displayOrder: self.cardDetail.portfolios.length + 1,
            image: {},
            idLocal: self.baseController.generateUUID(),
            additionalImages: []
        };
        self.cardDetail.portfolios.push(newPortfolio);
    };
    cardDetailPortfolioController.prototype.removePortfolio = function (portfolio) {
        var self = this;
        var position = self.baseController.searchForEntityInList("idStructurePortfolioReference", self.cardDetail.portfolios, portfolio, "idLocal");
        if (!self.baseController.isNullOrUndefined(position) && position > -1) {
            self.cardDetail.portfolios.splice(position, 1);
        }
        // Update display order for remaining portfolios    
        self.cardDetail.portfolios.forEach(function (portfolio, i) {
            portfolio.displayOrder = i + 1;
        });
    };
    // Feature Drag and Drop Methods
    cardDetailPortfolioController.prototype.handlePortfolioDragStart = function (event, index) {
        this.portfolioDragStartIndex = index;
        event.dataTransfer.effectAllowed = 'move';
    };
    cardDetailPortfolioController.prototype.handlePortfolioDragOver = function (event, index) {
        event.preventDefault(); // Allow drop
    };
    cardDetailPortfolioController.prototype.handlePortfolioDrop = function (event, dropIndex) {
        event.preventDefault();
        var fromIndex = this.portfolioDragStartIndex;
        var toIndex = dropIndex;
        if (fromIndex === null || fromIndex === toIndex)
            return;
        var item = this.cardDetail.portfolios[fromIndex];
        this.cardDetail.portfolios.splice(fromIndex, 1);
        this.cardDetail.portfolios.splice(toIndex, 0, item);
        // Update displayOrder
        this.cardDetail.portfolios.forEach(function (portfolio, i) {
            portfolio.displayOrder = i + 1;
        });
        this.portfolioDragStartIndex = null;
        this.$scope.$apply(); // trigger digest
    };
    cardDetailPortfolioController.prototype.handlePortfolioDragEnd = function (event) {
        this.portfolioDragStartIndex = null;
    };
    // Add new image slot
    cardDetailPortfolioController.prototype.addAdditionalImage = function (file, additionalImages, isArray) {
        var self = this;
        var newImage = {
            displayOrder: additionalImages.length + 1,
            image: {},
            idLocal: self.baseController.generateUUID()
        };
        self.uploadAdditionalImage(file, newImage.image, false).then(function () {
            additionalImages.push(newImage);
        });
    };
    // Upload additional image
    cardDetailPortfolioController.prototype.uploadAdditionalImage = function (file, arrayToUpload, isArray) {
        var self = this;
        var deferred = self.baseController.q.defer();
        self.baseController.upload(file, arrayToUpload, isArray).then(function (response) {
            deferred.resolve();
        })
            .catch(function (response) {
            deferred.reject();
        });
        return deferred.promise;
    };
    // Remove additional image
    cardDetailPortfolioController.prototype.removeAdditionalImage = function (additionalImages, image) {
        var self = this;
        var position = self.baseController.searchForEntityInList("idAdditionalImageReference", additionalImages, image, "idLocal");
        if (!self.baseController.isNullOrUndefined(position) && position > -1) {
            additionalImages.splice(position, 1);
        }
        // Update display order for remaining additional images    
        additionalImages.forEach(function (image, i) {
            image.displayOrder = i + 1;
        });
    };
    // Drag and drop handlers for additional images
    cardDetailPortfolioController.prototype.handleAdditionalImageDragStart = function (event, index, portfolioItem) { };
    cardDetailPortfolioController.prototype.handleAdditionalImageDragOver = function (event, index, portfolioItem) { };
    cardDetailPortfolioController.prototype.handleAdditionalImageDrop = function (event, index, portfolioItem) { };
    cardDetailPortfolioController.prototype.handleAdditionalImageDragEnd = function (event) { };
    return cardDetailPortfolioController;
}());
cardModule.controller("cardDetailPortfolioController", ["$scope",
    "$parse",
    "toaster",
    "cardWebService",
    cardDetailPortfolioController
]);
