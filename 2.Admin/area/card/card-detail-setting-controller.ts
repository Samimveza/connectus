class cardDetailSettingController implements IChildCardDetailController {
    scope;
    baseController: baseController;
    callerController: ICardDetailSettingsCaller;
    groupName: string = cardDetailTabNameFromEnum.getName(cardDetailTab.SETTINGS);

    cardWebService: cardWebService;

    formValidator: formValidator;
    cardDetailTabEnum = cardDetailTab;


    timeFilter = 'MONTH';
    viewsChart = null;
    structureViews: getStructureViewsResponse[] = [];
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

        this.callerController.registerCardDetailSettingsController(this);
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

    get baseSlugUrl() {
        var self = this;
        return self.callerController.baseSlugUrl;
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

        self.formValidator.registerValidationForMandatory(self.scope, 'cardName', 'Name of the card in settings tab');

        self.formValidator.registerGroupValidation(self.groupName, ['cardName'])

    }

    public onDetailLoaded() {
        var self = this;
        self.generateQRCode();
        self.updateViewsGraph();
    }

    public upload(file, arrayToUpload, isArray) {
        var self = this;
        self.baseController.upload(file, arrayToUpload, isArray)
    }

    public deleteImage(picture: pictureDataModel, pictureDataList: pictureDataModel[], isArray) {
        var self = this;
        self.baseController.deleteImage(picture, pictureDataList, isArray);
    }


    public setTimeFilter(filter) {
        var self = this;

        self.timeFilter = filter;
        self.updateViewsGraph();
    };

    public updateViewsGraph() {
        var self = this;

        if (self.isNew) {
            return;
        }

        var _getStructureViewsDto = new getStructureViewsDto();
        _getStructureViewsDto.idStructure = self.cardDetail.idStructure;
        _getStructureViewsDto.filterDate = new Date();
        _getStructureViewsDto.outputType = self.timeFilter;

        self.cardWebService.getStructureViews(_getStructureViewsDto)
            .then(function (response: baseResultReturnType<getStructureViewsResponse[]>) {
                if (response.status == STATUS_MESSAGE.SUCCESS) {
                    self.populateStructureViews(response.result);
                } else {
                    self.baseController.showMessage(response.errorMessage, "", ALERT_MESSAGE_TYPE.ERROR);
                }
            }).catch(function (errorMsg) {
                self.baseController.showMessage(errorMsg, "We encountered a problem while processing your request. Please try again later or contact support (contact@connectus.mu) if the issue persists.", ALERT_MESSAGE_TYPE.ERROR);
            }).finally(function () {
                self.baseController.hideLoading();
            });



    }

    public populateStructureViews(views: getStructureViewsResponse[]) {
        var self = this;

        self.structureViews = views;

        const ctx = document.getElementById('viewsChart');
        const { labels, data } = self.formatStructureViewsData();

        if (self.viewsChart) {
            self.viewsChart.destroy();
        }

        self.viewsChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Views',
                    data: data,
                    borderColor: 'var(--purple)',
                    backgroundColor: 'rgba(147, 51, 234, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    public formatStructureViewsData() {
        var self = this;
        const data = [];
        const labels = [];
        let points = 0;

        switch (self.timeFilter) {
            case 'DAY':
                points = 24;
                // Get today's date at midnight
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                // Initialize hourly counts
                for (let i = 0; i < points; i++) {
                    labels.push(`${i}:00`);
                    data.push(0);
                }

                // Count views for today by hour
                self.structureViews.forEach(view => {
                    const viewDate = new Date(view.date);
                    if (viewDate.toDateString() === today.toDateString()) {
                        const hour = viewDate.getHours();
                        data[hour] += view.noOfViews;
                    }
                });
                break;

            case 'MONTH':
                points = 30;
                // Get start of current month
                const startOfMonth = new Date();
                startOfMonth.setDate(1);
                startOfMonth.setHours(0, 0, 0, 0);

                // Initialize daily counts
                for (let i = 1; i <= points; i++) {
                    labels.push(`Day ${i}`);
                    data.push(0);
                }

                // Count views by day of month
                self.structureViews.forEach(view => {
                    const viewDate = new Date(view.date);
                    if (viewDate.getMonth() === startOfMonth.getMonth() &&
                        viewDate.getFullYear() === startOfMonth.getFullYear()) {
                        const day = viewDate.getDate() - 1;
                        data[day] += view.noOfViews;
                    }
                });
                break;

            case 'YEAR':
                points = 12;
                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                // Get start of current year
                const startOfYear = new Date();
                startOfYear.setMonth(0, 1);
                startOfYear.setHours(0, 0, 0, 0);

                // Initialize monthly counts
                for (let i = 0; i < points; i++) {
                    labels.push(months[i]);
                    data.push(0);
                }

                // Count views by month
                self.structureViews.forEach(view => {
                    const viewDate = new Date(view.date);
                    if (viewDate.getFullYear() === startOfYear.getFullYear()) {
                        const month = viewDate.getMonth();
                        data[month] += view.noOfViews;
                    }
                });
                break;
        }

        /*
        switch (filter) {
            case 'day':
                points = 24;
                for (let i = 0; i < points; i++) {
                    labels.push(`${i}:00`);
                    data.push(Math.floor(Math.random() * 50));
                }
                break;
            case 'month':
                points = 30;
                for (let i = 1; i <= points; i++) {
                    labels.push(`Day ${i}`);
                    data.push(Math.floor(Math.random() * 100));
                }
                break;
            case 'year':
                points = 12;
                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                for (let i = 0; i < points; i++) {
                    labels.push(months[i]);
                    data.push(Math.floor(Math.random() * 500));
                }
                break;
        }
        */
        return { labels, data };
    }

    public copyLink(): void {
        var self = this;

        if (self.isNew) {
            self.baseController.showToast(TOASTER_TYPE.INFO, "Please save the card first to generate a link.")
            return;
        }

        const link = self.cardDetail.qrCodeUrl;
        var _navigator: any = navigator || window.navigator; // Fallback for older browsers

        if (_navigator && _navigator.clipboard) {
            _navigator.clipboard.writeText(link).then(() => {
                self.baseController.showToast(ALERT_MESSAGE_TYPE.SUCCESS, "Link Copied", "Link Copied");
            }).catch(err => {
                console.error("Clipboard copy failed", err);
                self.baseController.showToast(ALERT_MESSAGE_TYPE.ERROR, "Failed", "Could not copy link.");
            });
        } else {
            console.warn("Clipboard API not available");
            self.baseController.showToast(ALERT_MESSAGE_TYPE.WARNING, "Unavailable", "Clipboard not supported.");
        }
    }


    public shareByEmail(): void {
        var self = this;

        if (self.isNew) {
            self.baseController.showToast(TOASTER_TYPE.INFO, "Please save the card first to share by email.")
            return;
        }

        const link = self.cardDetail.qrCodeUrl;
        const subject = encodeURIComponent("Check out this profile");
        const body = encodeURIComponent(`Hi,\n\nI wanted to share this link with you:\n${link}\n\nBest regards.`);
        const mailtoLink = `mailto:?subject=${subject}&body=${body}`;

        // Open the mail client
        window.location.href = mailtoLink;

        self.baseController.showToast(ALERT_MESSAGE_TYPE.SUCCESS, "Email Client Opened", "You can now send the link.");
    }


    public deleteCard() {
        var self = this;
        if (self.baseController.isNullOrUndefined(self.cardDetail.idStructure)) {

            self.baseController.showMessage("Cannot delete card which has not been saved", "", ALERT_MESSAGE_TYPE.ERROR);
            return;
        }

        self.baseController.showMessage("Are you sure you want to delete the card ?", "Delete confirmation", ALERT_MESSAGE_TYPE.WARNING, true, self.confirmDelete, true, "Yes, i confirm the deletion of the card", "Cancel", null, self, null);


    }

    public confirmDelete(caller: cardDetailSettingController) {
        var self;
        if (caller == null)
            self = this;
        else
            self = caller;

        self.baseController.showLoading();
        var _getBookingSettingDto = new getCardDto();
        _getBookingSettingDto.idStructure = self.cardDetail.idStructure;

        self.cardWebService.deleteCard(_getBookingSettingDto)
            .then(function (response: baseResultReturnType<structureModel>) {
                if (response.status == STATUS_MESSAGE.SUCCESS) {
                    self.baseController.showToast(ALERT_MESSAGE_TYPE.SUCCESS, "Card Deleted Successfully", "Card Deleted Successfully");
                    window.location.href = "/card-list/";
                } else {
                    self.baseController.showMessage(response.errorMessage, "", ALERT_MESSAGE_TYPE.ERROR);
                }
            }).catch(function (errorMsg) {
                self.baseController.showMessage(errorMsg, "We encountered a problem while processing your request. Please try again later or contact support (contact@connectus.mu) if the issue persists.", ALERT_MESSAGE_TYPE.ERROR);
            }).finally(function () {
                self.baseController.hideLoading();
            });
    }

    // Function to generate QR code
    public generateQRCode() {
        var self = this;
        var link = "";

        if (self.baseController.isNullOrUndefined(self.cardDetail) || self.baseController.isNullOrUndefined(self.cardDetail.qrCodeUrl)) {
            return;
        }

        link = self.cardDetail.qrCodeUrl;

        const qrcode = new QRCode(document.getElementById("qrcode"), {
            text: link,
            width: 300,
            height: 300,
        });
    }


    public copyFullSlugUrl(): void {
        var self = this;

        if (self.isNew) {
            self.baseController.showToast(TOASTER_TYPE.INFO, "Please save the card first to copy the link.")
            return;
        }

        const link = self.cardDetail.fullSlugUrl;
        var _navigator: any = navigator || window.navigator; // Fallback for older browsers

        if (_navigator && _navigator.clipboard) {
            _navigator.clipboard.writeText(link).then(() => {
                self.baseController.showToast(ALERT_MESSAGE_TYPE.SUCCESS, "Link Copied", "Link Copied");
            }).catch(err => {
                console.error("Clipboard copy failed", err);
                self.baseController.showToast(ALERT_MESSAGE_TYPE.ERROR, "Failed", "Could not copy link.");
            });
        } else {
            console.warn("Clipboard API not available");
            self.baseController.showToast(ALERT_MESSAGE_TYPE.WARNING, "Unavailable", "Clipboard not supported.");
        }
    }

    public previewProfile(): void {
        var self = this;

        if (self.isNew) {
            self.baseController.showToast(TOASTER_TYPE.INFO, "Please save the card first to preview.")
            return;
        }

        const link = self.cardDetail.fullSlugUrl;
        if (link) {
            window.open(link, '_blank');
        } else {
            self.baseController.showToast(ALERT_MESSAGE_TYPE.WARNING, "Preview Unavailable", "Please save the card first to preview.");
        }
    }
}

cardModule.controller("cardDetailSettingController"
    , ["$scope"
        , "$parse"
        , "toaster"
        , "cardWebService"
        , cardDetailSettingController
    ]);


declare var Chart;
declare var QRCode: any;