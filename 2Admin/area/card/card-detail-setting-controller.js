var cardDetailSettingController = /** @class */ (function () {
    function cardDetailSettingController($scope, $parse, toaster, cardWebService) {
        this.$scope = $scope;
        this.$parse = $parse;
        this.toaster = toaster;
        this.groupName = cardDetailTabNameFromEnum.getName(cardDetailTab.SETTINGS);
        this.cardDetailTabEnum = cardDetailTab;
        this.timeFilter = 'MONTH';
        this.viewsChart = null;
        this.structureViews = [];
        this.scope = $scope;
        this.scope.controller = this;
        this.callerController = $scope.$parent.controller;
        this.baseController = $scope.baseController;
        this.cardWebService = cardWebService;
        this.callerController.registerCardDetailSettingsController(this);
        this.initialize();
    }
    Object.defineProperty(cardDetailSettingController.prototype, "hasScreenDetailBeenLoaded", {
        get: function () {
            return this.callerController.hasScreenDetailBeenLoaded;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailSettingController.prototype, "hasCardDetailBeenLoaded", {
        get: function () {
            return this.callerController.hasCardDetailBeenLoaded;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailSettingController.prototype, "screenMode", {
        get: function () {
            return this.callerController.screenModeManager.currentMode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailSettingController.prototype, "cardDetail", {
        get: function () {
            return this.callerController.screenModeManager.entity;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailSettingController.prototype, "isEditable", {
        get: function () {
            var self = this;
            return self.callerController.isEditable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailSettingController.prototype, "isNew", {
        get: function () {
            var self = this;
            return self.callerController.isNew;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailSettingController.prototype, "formName", {
        get: function () {
            return this.callerController.formName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailSettingController.prototype, "isCardStateEditable", {
        get: function () {
            var self = this;
            var isAdmin = self.baseController.commonController.isAdmin();
            return self.callerController.isEditable && isAdmin;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailSettingController.prototype, "baseSlugUrl", {
        get: function () {
            var self = this;
            return self.callerController.baseSlugUrl;
        },
        enumerable: true,
        configurable: true
    });
    cardDetailSettingController.prototype.initialize = function () {
        var self = this;
        self.registerValidations();
    };
    cardDetailSettingController.prototype.registerValidations = function () {
        var self = this;
        if (self.formValidator != null) {
            self.formValidator.deRegister();
        }
        self.formValidator = new formValidator(this.$parse, this.toaster, self.scope, self.formName);
        self.formValidator.registerValidationForMandatory(self.scope, 'cardName', 'Name of the card in settings tab');
        self.formValidator.registerGroupValidation(self.groupName, ['cardName']);
    };
    cardDetailSettingController.prototype.onDetailLoaded = function () {
        var self = this;
        self.generateQRCode();
        self.updateViewsGraph();
    };
    cardDetailSettingController.prototype.upload = function (file, arrayToUpload, isArray) {
        var self = this;
        self.baseController.upload(file, arrayToUpload, isArray);
    };
    cardDetailSettingController.prototype.deleteImage = function (picture, pictureDataList, isArray) {
        var self = this;
        self.baseController.deleteImage(picture, pictureDataList, isArray);
    };
    cardDetailSettingController.prototype.setTimeFilter = function (filter) {
        var self = this;
        self.timeFilter = filter;
        self.updateViewsGraph();
    };
    ;
    cardDetailSettingController.prototype.updateViewsGraph = function () {
        var self = this;
        if (self.isNew) {
            return;
        }
        var _getStructureViewsDto = new getStructureViewsDto();
        _getStructureViewsDto.idStructure = self.cardDetail.idStructure;
        _getStructureViewsDto.filterDate = new Date();
        _getStructureViewsDto.outputType = self.timeFilter;
        self.cardWebService.getStructureViews(_getStructureViewsDto)
            .then(function (response) {
            if (response.status == STATUS_MESSAGE.SUCCESS) {
                self.populateStructureViews(response.result);
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
    cardDetailSettingController.prototype.populateStructureViews = function (views) {
        var self = this;
        self.structureViews = views;
        var ctx = document.getElementById('viewsChart');
        var _a = self.formatStructureViewsData(), labels = _a.labels, data = _a.data;
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
    };
    cardDetailSettingController.prototype.formatStructureViewsData = function () {
        var self = this;
        var data = [];
        var labels = [];
        var points = 0;
        switch (self.timeFilter) {
            case 'DAY':
                points = 24;
                // Get today's date at midnight
                var today_1 = new Date();
                today_1.setHours(0, 0, 0, 0);
                // Initialize hourly counts
                for (var i = 0; i < points; i++) {
                    labels.push(i + ":00");
                    data.push(0);
                }
                // Count views for today by hour
                self.structureViews.forEach(function (view) {
                    var viewDate = new Date(view.date);
                    if (viewDate.toDateString() === today_1.toDateString()) {
                        var hour = viewDate.getHours();
                        data[hour] += view.noOfViews;
                    }
                });
                break;
            case 'MONTH':
                points = 30;
                // Get start of current month
                var startOfMonth_1 = new Date();
                startOfMonth_1.setDate(1);
                startOfMonth_1.setHours(0, 0, 0, 0);
                // Initialize daily counts
                for (var i = 1; i <= points; i++) {
                    labels.push("Day " + i);
                    data.push(0);
                }
                // Count views by day of month
                self.structureViews.forEach(function (view) {
                    var viewDate = new Date(view.date);
                    if (viewDate.getMonth() === startOfMonth_1.getMonth() &&
                        viewDate.getFullYear() === startOfMonth_1.getFullYear()) {
                        var day = viewDate.getDate() - 1;
                        data[day] += view.noOfViews;
                    }
                });
                break;
            case 'YEAR':
                points = 12;
                var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                // Get start of current year
                var startOfYear_1 = new Date();
                startOfYear_1.setMonth(0, 1);
                startOfYear_1.setHours(0, 0, 0, 0);
                // Initialize monthly counts
                for (var i = 0; i < points; i++) {
                    labels.push(months[i]);
                    data.push(0);
                }
                // Count views by month
                self.structureViews.forEach(function (view) {
                    var viewDate = new Date(view.date);
                    if (viewDate.getFullYear() === startOfYear_1.getFullYear()) {
                        var month = viewDate.getMonth();
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
        return { labels: labels, data: data };
    };
    cardDetailSettingController.prototype.copyLink = function () {
        var self = this;
        if (self.isNew) {
            self.baseController.showToast(TOASTER_TYPE.INFO, "Please save the card first to generate a link.");
            return;
        }
        var link = self.cardDetail.qrCodeUrl;
        var _navigator = navigator || window.navigator; // Fallback for older browsers
        if (_navigator && _navigator.clipboard) {
            _navigator.clipboard.writeText(link).then(function () {
                self.baseController.showToast(ALERT_MESSAGE_TYPE.SUCCESS, "Link Copied", "Link Copied");
            }).catch(function (err) {
                console.error("Clipboard copy failed", err);
                self.baseController.showToast(ALERT_MESSAGE_TYPE.ERROR, "Failed", "Could not copy link.");
            });
        }
        else {
            console.warn("Clipboard API not available");
            self.baseController.showToast(ALERT_MESSAGE_TYPE.WARNING, "Unavailable", "Clipboard not supported.");
        }
    };
    cardDetailSettingController.prototype.shareByEmail = function () {
        var self = this;
        if (self.isNew) {
            self.baseController.showToast(TOASTER_TYPE.INFO, "Please save the card first to share by email.");
            return;
        }
        var link = self.cardDetail.qrCodeUrl;
        var subject = encodeURIComponent("Check out this profile");
        var body = encodeURIComponent("Hi,\n\nI wanted to share this link with you:\n" + link + "\n\nBest regards.");
        var mailtoLink = "mailto:?subject=" + subject + "&body=" + body;
        // Open the mail client
        window.location.href = mailtoLink;
        self.baseController.showToast(ALERT_MESSAGE_TYPE.SUCCESS, "Email Client Opened", "You can now send the link.");
    };
    cardDetailSettingController.prototype.deleteCard = function () {
        var self = this;
        if (self.baseController.isNullOrUndefined(self.cardDetail.idStructure)) {
            self.baseController.showMessage("Cannot delete card which has not been saved", "", ALERT_MESSAGE_TYPE.ERROR);
            return;
        }
        self.baseController.showMessage("Are you sure you want to delete the card ?", "Delete confirmation", ALERT_MESSAGE_TYPE.WARNING, true, self.confirmDelete, true, "Yes, i confirm the deletion of the card", "Cancel", null, self, null);
    };
    cardDetailSettingController.prototype.confirmDelete = function (caller) {
        var self;
        if (caller == null)
            self = this;
        else
            self = caller;
        self.baseController.showLoading();
        var _getBookingSettingDto = new getCardDto();
        _getBookingSettingDto.idStructure = self.cardDetail.idStructure;
        self.cardWebService.deleteCard(_getBookingSettingDto)
            .then(function (response) {
            if (response.status == STATUS_MESSAGE.SUCCESS) {
                self.baseController.showToast(ALERT_MESSAGE_TYPE.SUCCESS, "Card Deleted Successfully", "Card Deleted Successfully");
                window.location.href = "/card-list/";
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
    // Function to generate QR code
    cardDetailSettingController.prototype.generateQRCode = function () {
        var self = this;
        var link = "";
        if (self.baseController.isNullOrUndefined(self.cardDetail) || self.baseController.isNullOrUndefined(self.cardDetail.qrCodeUrl)) {
            return;
        }
        link = self.cardDetail.qrCodeUrl;
        var qrcode = new QRCode(document.getElementById("qrcode"), {
            text: link,
            width: 300,
            height: 300,
        });
    };
    cardDetailSettingController.prototype.copyFullSlugUrl = function () {
        var self = this;
        if (self.isNew) {
            self.baseController.showToast(TOASTER_TYPE.INFO, "Please save the card first to copy the link.");
            return;
        }
        var link = self.cardDetail.fullSlugUrl;
        var _navigator = navigator || window.navigator; // Fallback for older browsers
        if (_navigator && _navigator.clipboard) {
            _navigator.clipboard.writeText(link).then(function () {
                self.baseController.showToast(ALERT_MESSAGE_TYPE.SUCCESS, "Link Copied", "Link Copied");
            }).catch(function (err) {
                console.error("Clipboard copy failed", err);
                self.baseController.showToast(ALERT_MESSAGE_TYPE.ERROR, "Failed", "Could not copy link.");
            });
        }
        else {
            console.warn("Clipboard API not available");
            self.baseController.showToast(ALERT_MESSAGE_TYPE.WARNING, "Unavailable", "Clipboard not supported.");
        }
    };
    cardDetailSettingController.prototype.previewProfile = function () {
        var self = this;
        if (self.isNew) {
            self.baseController.showToast(TOASTER_TYPE.INFO, "Please save the card first to preview.");
            return;
        }
        var link = self.cardDetail.fullSlugUrl;
        if (link) {
            window.open(link, '_blank');
        }
        else {
            self.baseController.showToast(ALERT_MESSAGE_TYPE.WARNING, "Preview Unavailable", "Please save the card first to preview.");
        }
    };
    return cardDetailSettingController;
}());
cardModule.controller("cardDetailSettingController", ["$scope",
    "$parse",
    "toaster",
    "cardWebService",
    cardDetailSettingController
]);
