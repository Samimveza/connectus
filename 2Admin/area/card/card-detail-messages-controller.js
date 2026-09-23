var cardDetailMessagesController = /** @class */ (function () {
    function cardDetailMessagesController($scope, $parse, toaster, cardWebService) {
        this.$scope = $scope;
        this.$parse = $parse;
        this.toaster = toaster;
        this.groupName = cardDetailTabNameFromEnum.getName(cardDetailTab.MESSAGES);
        this.cardDetailTabEnum = cardDetailTab;
        this.messages = [];
        this.scope = $scope;
        this.scope.controller = this;
        this.callerController = $scope.$parent.controller;
        this.baseController = $scope.baseController;
        this.cardWebService = cardWebService;
        this.callerController.registerCardDetailMessagesController(this);
        this.initialize();
    }
    Object.defineProperty(cardDetailMessagesController.prototype, "hasScreenDetailBeenLoaded", {
        get: function () {
            return this.callerController.hasScreenDetailBeenLoaded;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailMessagesController.prototype, "hasCardDetailBeenLoaded", {
        get: function () {
            return this.callerController.hasCardDetailBeenLoaded;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailMessagesController.prototype, "screenMode", {
        get: function () {
            return this.callerController.screenModeManager.currentMode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailMessagesController.prototype, "cardDetail", {
        get: function () {
            return this.callerController.screenModeManager.entity;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailMessagesController.prototype, "isEditable", {
        get: function () {
            var self = this;
            return self.callerController.isEditable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailMessagesController.prototype, "isNew", {
        get: function () {
            var self = this;
            return self.callerController.isNew;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailMessagesController.prototype, "formName", {
        get: function () {
            return this.callerController.formName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailMessagesController.prototype, "isCardStateEditable", {
        get: function () {
            var self = this;
            var isAdmin = self.baseController.commonController.isAdmin();
            return self.callerController.isEditable && isAdmin;
        },
        enumerable: true,
        configurable: true
    });
    cardDetailMessagesController.prototype.initialize = function () {
        var self = this;
        self.registerValidations();
    };
    cardDetailMessagesController.prototype.registerValidations = function () {
        var self = this;
        if (self.formValidator != null) {
            self.formValidator.deRegister();
        }
        self.formValidator = new formValidator(this.$parse, this.toaster, self.scope, self.formName);
        self.formValidator.registerGroupValidation(self.groupName, []);
    };
    cardDetailMessagesController.prototype.intializePagingInfo = function () {
        var self = this;
        self.paging = new messageSortingPagingInfo();
        self.resetPagingInfo();
        self.paging.sortByDesc = false;
        self.calculateVisiblePages();
    };
    cardDetailMessagesController.prototype.resetPagingInfo = function () {
        var self = this;
        self.paging.pageIndex = 1;
        self.paging.pageSize = 10;
        self.paging.pageCount = 0;
        self.paging.sortField = "";
        self.paging.sortColumn = "";
        self.paging.idStructure = self.cardDetail.idStructure;
    };
    cardDetailMessagesController.prototype.calculateVisiblePages = function () {
        var self = this;
        var totalPages = Math.ceil(self.paging.pageCount / self.paging.pageSize);
        var currentPage = self.paging.pageIndex;
        var visiblePages = [];
        if (totalPages <= 7) {
            // Show all pages if 7 or fewer
            for (var i = 1; i <= totalPages; i++) {
                visiblePages.push(i);
            }
        }
        else {
            // Always show first page
            visiblePages.push(1);
            if (currentPage > 4) {
                visiblePages.push('...');
            }
            // Show pages around current page
            var start = Math.max(2, currentPage - 1);
            var end = Math.min(totalPages - 1, currentPage + 1);
            for (var i = start; i <= end; i++) {
                visiblePages.push(i);
            }
            if (currentPage < totalPages - 3) {
                visiblePages.push('...');
            }
            // Always show last page
            if (totalPages > 1) {
                visiblePages.push(totalPages);
            }
        }
        self.visiblePages = visiblePages;
    };
    cardDetailMessagesController.prototype.loadMessages = function () {
        var self = this;
        self.gridLoad();
    };
    cardDetailMessagesController.prototype.onDetailLoaded = function () {
        var self = this;
        self.intializePagingInfo();
        self.gridLoad();
        //self.cardDetail.messages.push({
        //    'firstname':'John',
        //    'lastname':'Doe',
        //    'email':'john.doe@example.com',
        //    'phone':'1234567890',
        //    'message':'This is a test message',
        //    'dateReceived':new Date()
        //});
    };
    cardDetailMessagesController.prototype.gridLoad = function () {
        var self = this;
        var sorting = self.baseController.cloneObject(self.paging);
        sorting.pageIndex--;
        self.baseController.showLoading();
        self.cardWebService.structureMessageList(sorting)
            .then(function (response) {
            if (response.status == STATUS_MESSAGE.SUCCESS) {
                self.paging.pageCount = response.result.totalCount;
                self.messages = self.formatList(response.result.entityList);
                self.calculateVisiblePages();
                self.onGridLoaded();
            }
            else {
                self.baseController.showMessage(response.errorMessage, "", ALERT_MESSAGE_TYPE.ERROR, false, null, true);
            }
        })
            .catch(function (error) {
            self.baseController.hideLoading();
            self.baseController.showMessage("We encountered a problem while processing your request. Please try again later or contact support (contact@connectus.mu) if the issue persists.", error, ALERT_MESSAGE_TYPE.ERROR, false, null, true);
        })
            .finally(function () {
            self.baseController.hideLoading();
        });
    };
    cardDetailMessagesController.prototype.onGridLoaded = function () {
        // Additional logic after grid loads if needed
    };
    cardDetailMessagesController.prototype.formatList = function (contactFormList) {
        var self = this;
        var _cardList = [];
        Enumerable.From(contactFormList).ForEach(function (card) {
            var _formatted = self.baseController.cloneObject(card);
            _formatted.messagePreview = card.messageContent.substring(0, 100);
            _cardList.push(_formatted);
        });
        return _cardList;
    };
    cardDetailMessagesController.prototype.viewMessage = function (message) {
        var self = this;
        self.baseController.globalVariableFactory.sessionVariables.putVariableInSessionSpace(sessionVariableSpaceEnum.CALLER_CONTROLLER, "CONTROLLER", self);
        self.baseController.globalVariableFactory.sessionVariables.putVariableInSessionSpace(sessionVariableSpaceEnum.TRANSFER, "MESSAGE", message);
        self.baseController.showCustomModal('', self.baseController.globalVariableFactory.baseServerUrl + '/message-modal', self, {
            $scope: self.scope,
        }, self.onVewMessageOk, function () { }, 'lg', '', 'Windowclass', true, 'front-quote-container', true);
    };
    cardDetailMessagesController.prototype.onVewMessageOk = function (data) {
        var self = data.getVariableFromSessionSpace(sessionVariableSpaceEnum.CALLER_CONTROLLER, "CONTROLLER");
        var message = data.getVariableFromSessionSpace(sessionVariableSpaceEnum.TRANSFER, "MESSAGE");
        var messageStatus = data.getVariableFromSessionSpace(sessionVariableSpaceEnum.TRANSFER, "MESSAGE_STATUS");
        if (messageStatus == "READ") {
            var _request = new manipulateMessageReadStateDto();
            _request.idMessageReference = message.structureMessageReference;
            _request.isRead = true;
            self.baseController.showLoading();
            self.cardWebService.manipulateMessageReadState(_request)
                .then(function (response) {
                if (response.status == STATUS_MESSAGE.SUCCESS) {
                    self.baseController.hideLoading();
                    self.baseController.showMessage("Message marked as read successfully.", "", ALERT_MESSAGE_TYPE.SUCCESS, false, null, true);
                    self.gridLoad(); // Refresh the message list
                }
                else {
                    self.baseController.showMessage(response.errorMessage, "", ALERT_MESSAGE_TYPE.ERROR, false, null, true);
                }
            })
                .catch(function (error) {
                self.baseController.hideLoading();
                self.baseController.showMessage("We encountered a problem while processing your request. Please try again later or contact support (contact@connectus.mu) if the issue persists.", error, ALERT_MESSAGE_TYPE.ERROR, false, null, true);
            })
                .finally(function () {
                self.baseController.hideLoading();
            });
        }
    };
    cardDetailMessagesController.prototype.goToFirstPage = function () {
        var self = this;
        if (self.paging.pageIndex !== 1) {
            self.paging.pageIndex = 1;
            self.gridLoad();
        }
    };
    cardDetailMessagesController.prototype.goToPreviousPage = function () {
        var self = this;
        if (self.paging.pageIndex > 1) {
            self.paging.pageIndex--;
            self.gridLoad();
        }
    };
    cardDetailMessagesController.prototype.goToPage = function (pageNumber) {
        var self = this;
        if (pageNumber !== self.paging.pageIndex && pageNumber > 0 && pageNumber <= Math.ceil(self.paging.pageCount / self.paging.pageSize)) {
            self.paging.pageIndex = pageNumber;
            self.gridLoad();
        }
    };
    cardDetailMessagesController.prototype.goToNextPage = function () {
        var self = this;
        var totalPages = Math.ceil(self.paging.pageCount / self.paging.pageSize);
        if (self.paging.pageIndex < totalPages) {
            self.paging.pageIndex++;
            self.gridLoad();
        }
    };
    cardDetailMessagesController.prototype.goToLastPage = function () {
        var self = this;
        var totalPages = Math.ceil(self.paging.pageCount / self.paging.pageSize);
        if (self.paging.pageIndex !== totalPages) {
            self.paging.pageIndex = totalPages;
            self.gridLoad();
        }
    };
    cardDetailMessagesController.prototype.onItemsPerPageChange = function () {
        var self = this;
        self.paging.pageIndex = 1; // Reset to first page when changing page size
        self.gridLoad();
    };
    return cardDetailMessagesController;
}());
cardModule.controller("cardDetailMessagesController", ["$scope",
    "$parse",
    "toaster",
    "cardWebService",
    cardDetailMessagesController
]);
