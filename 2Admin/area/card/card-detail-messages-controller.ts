class cardDetailMessagesController implements IChildCardDetailController {
    scope;
    baseController: baseController;
    callerController: ICardDetailMessagesCaller;
    groupName: string = cardDetailTabNameFromEnum.getName(cardDetailTab.MESSAGES);

    cardWebService: cardWebService;

    formValidator: formValidator;
    cardDetailTabEnum = cardDetailTab;
    searchQuery;

    paging: messageSortingPagingInfo;
    messages: structureMessageListReturnType[] = [];
    visiblePages
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

        this.callerController.registerCardDetailMessagesController(this);
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


    public intializePagingInfo() {
        var self = this;
        self.paging = new messageSortingPagingInfo();

        self.resetPagingInfo();
        self.paging.sortByDesc = false;
        self.calculateVisiblePages();
    }

    public resetPagingInfo() {
        var self = this;

        self.paging.pageIndex = 1;
        self.paging.pageSize = 10;
        self.paging.pageCount = 0;
        self.paging.sortField = "";
        self.paging.sortColumn = "";
        self.paging.idStructure = self.cardDetail.idStructure;
    }

    public calculateVisiblePages() {
        var self = this;
        var totalPages = Math.ceil(self.paging.pageCount / self.paging.pageSize);
        var currentPage = self.paging.pageIndex;
        var visiblePages = [];

        if (totalPages <= 7) {
            // Show all pages if 7 or fewer
            for (var i = 1; i <= totalPages; i++) {
                visiblePages.push(i);
            }
        } else {
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
    }

    public loadMessages() {
        var self = this;
        self.gridLoad();
    }

    public onDetailLoaded() {
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
    }

    public gridLoad() {
        var self = this;
        var sorting: messageSortingPagingInfo = self.baseController.cloneObject(self.paging);

        sorting.pageIndex--;
        self.baseController.showLoading();

        self.cardWebService.structureMessageList(sorting)
            .then(function (response: baseResultReturnType<baseListReturnType<structureMessageListReturnType[]>>) {
                if (response.status == STATUS_MESSAGE.SUCCESS) {
                    self.paging.pageCount = response.result.totalCount;
                    self.messages = self.formatList(response.result.entityList);
                    self.calculateVisiblePages();
                    self.onGridLoaded();
                } else {
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

    public onGridLoaded() {
        // Additional logic after grid loads if needed
    }

    public formatList(contactFormList: structureMessageListReturnType[]): structureMessageListReturnType[] {
        var self = this;
        var _cardList: structureMessageListReturnType[] = [];
        Enumerable.From(contactFormList).ForEach(function (card: structureMessageListReturnType) {
            var _formatted: structureMessageListReturnType = self.baseController.cloneObject(card);
            _formatted.messagePreview = card.messageContent.substring(0, 100);
            _cardList.push(_formatted);
        })
        return _cardList;
    }


    public viewMessage(message) {
        var self = this;
        self.baseController.globalVariableFactory.sessionVariables.putVariableInSessionSpace(sessionVariableSpaceEnum.CALLER_CONTROLLER, "CONTROLLER", self);

        self.baseController.globalVariableFactory.sessionVariables.putVariableInSessionSpace(sessionVariableSpaceEnum.TRANSFER, "MESSAGE", message);

        self.baseController.showCustomModal('',
            self.baseController.globalVariableFactory.baseServerUrl + '/message-modal',
            self,
            {
                $scope: self.scope,
            },
            self.onVewMessageOk,
            () => { },
            'lg', '', 'Windowclass', true, 'front-quote-container', true);
    }

    public onVewMessageOk(data: sessionVariables) {
        var self: cardDetailMessagesController = data.getVariableFromSessionSpace(sessionVariableSpaceEnum.CALLER_CONTROLLER, "CONTROLLER");
        var message = data.getVariableFromSessionSpace(sessionVariableSpaceEnum.TRANSFER, "MESSAGE");
        var messageStatus = data.getVariableFromSessionSpace(sessionVariableSpaceEnum.TRANSFER, "MESSAGE_STATUS");

        if (messageStatus == "READ") {

            var _request: manipulateMessageReadStateDto = new manipulateMessageReadStateDto();
            _request.idMessageReference = message.structureMessageReference;
            _request.isRead = true;
            self.baseController.showLoading();

            self.cardWebService.manipulateMessageReadState(_request)
                .then(function (response: baseResultReturnType<structureMessageListReturnType>) {
                    if (response.status == STATUS_MESSAGE.SUCCESS) {
                        self.baseController.hideLoading();
                        self.baseController.showMessage("Message marked as read successfully.", "", ALERT_MESSAGE_TYPE.SUCCESS, false, null, true);

                        self.gridLoad(); // Refresh the message list

                    } else {
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

    
    }

    public goToFirstPage() {
        var self = this;
        if (self.paging.pageIndex !== 1) {
            self.paging.pageIndex = 1;
            self.gridLoad();
        }
    }

    public goToPreviousPage() {
        var self = this;
        if (self.paging.pageIndex > 1) {
            self.paging.pageIndex--;
            self.gridLoad();
        }
    }

    public goToPage(pageNumber: number) {
        var self = this;
        if (pageNumber !== self.paging.pageIndex && pageNumber > 0 && pageNumber <= Math.ceil(self.paging.pageCount / self.paging.pageSize)) {
            self.paging.pageIndex = pageNumber;
            self.gridLoad();
        }
    }

    public goToNextPage() {
        var self = this;
        var totalPages = Math.ceil(self.paging.pageCount / self.paging.pageSize);
        if (self.paging.pageIndex < totalPages) {
            self.paging.pageIndex++;
            self.gridLoad();
        }
    }

    public goToLastPage() {
        var self = this;
        var totalPages = Math.ceil(self.paging.pageCount / self.paging.pageSize);
        if (self.paging.pageIndex !== totalPages) {
            self.paging.pageIndex = totalPages;
            self.gridLoad();
        }
    }

    public onItemsPerPageChange() {
        var self = this;
        self.paging.pageIndex = 1; // Reset to first page when changing page size
        self.gridLoad();
    }

}

cardModule.controller("cardDetailMessagesController"
    , ["$scope"
        , "$parse"
        , "toaster"
        , "cardWebService"
        , cardDetailMessagesController
    ]);
