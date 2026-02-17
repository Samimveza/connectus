var cardDetailOpeningHoursController = /** @class */ (function () {
    function cardDetailOpeningHoursController($scope, $parse, toaster, cardWebService) {
        this.$scope = $scope;
        this.$parse = $parse;
        this.toaster = toaster;
        this.groupName = cardDetailTabNameFromEnum.getName(cardDetailTab.OPENING_HOURS);
        this.cardDetailTabEnum = cardDetailTab;
        // Opening hours data
        this.days = [];
        this.scope = $scope;
        this.scope.controller = this;
        this.callerController = $scope.$parent.controller;
        this.baseController = $scope.baseController;
        this.cardWebService = cardWebService;
        this.callerController.registerCardDetailOpeningHoursController(this);
        this.initialize();
    }
    Object.defineProperty(cardDetailOpeningHoursController.prototype, "hasScreenDetailBeenLoaded", {
        get: function () {
            return this.callerController.hasScreenDetailBeenLoaded;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailOpeningHoursController.prototype, "hasCardDetailBeenLoaded", {
        get: function () {
            return this.callerController.hasCardDetailBeenLoaded;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailOpeningHoursController.prototype, "screenMode", {
        get: function () {
            return this.callerController.screenModeManager.currentMode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailOpeningHoursController.prototype, "cardDetail", {
        get: function () {
            return this.callerController.screenModeManager.entity;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailOpeningHoursController.prototype, "isEditable", {
        get: function () {
            var self = this;
            return self.callerController.isEditable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailOpeningHoursController.prototype, "isNew", {
        get: function () {
            var self = this;
            return self.callerController.isNew;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailOpeningHoursController.prototype, "formName", {
        get: function () {
            return this.callerController.formName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(cardDetailOpeningHoursController.prototype, "isCardStateEditable", {
        get: function () {
            var self = this;
            var isAdmin = self.baseController.commonController.isAdmin();
            return self.callerController.isEditable && isAdmin;
        },
        enumerable: true,
        configurable: true
    });
    cardDetailOpeningHoursController.prototype.initialize = function () {
        var self = this;
        self.initializeDays();
        self.registerValidations();
    };
    cardDetailOpeningHoursController.prototype.initializeDays = function () {
        var self = this;
        self.days = [
            { name: 'Monday', short: 'MON', dayOfWeek: 1, isOpen: true, timeSlots: [self.createDefaultTimeSlot()] },
            { name: 'Tuesday', short: 'TUE', dayOfWeek: 2, isOpen: true, timeSlots: [self.createDefaultTimeSlot()] },
            { name: 'Wednesday', short: 'WED', dayOfWeek: 3, isOpen: true, timeSlots: [self.createDefaultTimeSlot()] },
            { name: 'Thursday', short: 'THU', dayOfWeek: 4, isOpen: true, timeSlots: [self.createDefaultTimeSlot()] },
            { name: 'Friday', short: 'FRI', dayOfWeek: 5, isOpen: true, timeSlots: [self.createDefaultTimeSlot()] },
            { name: 'Saturday', short: 'SAT', dayOfWeek: 6, isOpen: false, timeSlots: [self.createDefaultTimeSlot()] },
            { name: 'Sunday', short: 'SUN', dayOfWeek: 0, isOpen: false, timeSlots: [self.createDefaultTimeSlot()] }
        ];
    };
    cardDetailOpeningHoursController.prototype.createDefaultTimeSlot = function () {
        // Create dates with UTC to avoid timezone issues
        var defaultOpen = new Date(Date.UTC(2000, 0, 1, 9, 0, 0, 0));
        var defaultClose = new Date(Date.UTC(2000, 0, 1, 17, 0, 0, 0));
        return {
            openTime: defaultOpen,
            closeTime: defaultClose,
            hasError: false,
            errorMessage: ''
        };
    };
    cardDetailOpeningHoursController.prototype.formatTimeInput = function (timeValue) {
        if (!timeValue)
            return new Date(Date.UTC(2000, 0, 1, 0, 0, 0, 0));
        if (timeValue instanceof Date) {
            return timeValue;
        }
        // Handle string format
        var timeRegex = /^(\d{1,2}):(\d{2}):(\d{2})$/;
        var match = timeValue.match(timeRegex);
        if (match) {
            var hours = parseInt(match[1]);
            var minutes = parseInt(match[2]);
            // Validate hours and minutes
            if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
                return new Date(Date.UTC(2000, 0, 1, hours, minutes, 0, 0));
            }
        }
        return new Date(Date.UTC(2000, 0, 1, 0, 0, 0, 0));
    };
    cardDetailOpeningHoursController.prototype.isValidTimeFormat = function (timeString) {
        if (!timeString)
            return false;
        var timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
        return timeRegex.test(timeString);
    };
    cardDetailOpeningHoursController.prototype.registerValidations = function () {
        var self = this;
        if (self.formValidator != null) {
            self.formValidator.deRegister();
        }
        self.formValidator = new formValidator(this.$parse, this.toaster, self.scope, self.formName);
        self.formValidator.registerGroupValidation(self.groupName, []);
    };
    cardDetailOpeningHoursController.prototype.onDetailLoaded = function () {
        var self = this;
        self.loadOpeningHours();
    };
    // Day management methods
    cardDetailOpeningHoursController.prototype.onDayToggle = function (day) {
        var self = this;
        if (day.isOpen && day.timeSlots.length === 0) {
            day.timeSlots.push(self.createDefaultTimeSlot());
        }
        self.validateAllTimeSlots();
    };
    // Time slot management
    cardDetailOpeningHoursController.prototype.addTimeSlot = function (day) {
        var self = this;
        if (day.timeSlots.length < 3) {
            day.timeSlots.push(self.createDefaultTimeSlot());
        }
    };
    cardDetailOpeningHoursController.prototype.removeTimeSlot = function (day, index) {
        var self = this;
        if (day.timeSlots.length > 1) {
            day.timeSlots.splice(index, 1);
        }
        self.validateDayTimeSlots(day);
    };
    // Validation methods
    cardDetailOpeningHoursController.prototype.validateTimeSlot = function (day, slot) {
        var self = this;
        slot.hasError = false;
        slot.errorMessage = '';
        if (!slot.openTime || !slot.closeTime) {
            slot.hasError = true;
            slot.errorMessage = 'Both open and close times are required';
            return;
        }
        var openTime = slot.openTime.getUTCHours() * 60 + slot.openTime.getUTCMinutes();
        var closeTime = slot.closeTime.getUTCHours() * 60 + slot.closeTime.getUTCMinutes();
        if (openTime >= closeTime) {
            slot.hasError = true;
            slot.errorMessage = 'Close time must be after open time';
            return;
        }
        // Check for overlapping time slots
        var hasOverlap = day.timeSlots.some(function (otherSlot, index) {
            if (otherSlot === slot || !otherSlot.openTime || !otherSlot.closeTime)
                return false;
            var otherOpen = otherSlot.openTime.getUTCHours() * 60 + otherSlot.openTime.getUTCMinutes();
            var otherClose = otherSlot.closeTime.getUTCHours() * 60 + otherSlot.closeTime.getUTCMinutes();
            return (openTime < otherClose && closeTime > otherOpen);
        });
        if (hasOverlap) {
            slot.hasError = true;
            slot.errorMessage = 'Time slots cannot overlap';
        }
    };
    cardDetailOpeningHoursController.prototype.validateDayTimeSlots = function (day) {
        var self = this;
        if (day.isOpen) {
            day.timeSlots.forEach(function (slot) {
                self.validateTimeSlot(day, slot);
            });
        }
    };
    cardDetailOpeningHoursController.prototype.validateAllTimeSlots = function () {
        var self = this;
        self.days.forEach(function (day) {
            self.validateDayTimeSlots(day);
        });
    };
    cardDetailOpeningHoursController.prototype.parseTime = function (timeString) {
        if (!timeString)
            return 0;
        var parts = timeString.split(':');
        if (parts.length !== 2)
            return 0;
        return parseInt(parts[0]) * 60 + parseInt(parts[1]);
    };
    // Quick setup methods
    cardDetailOpeningHoursController.prototype.setAllDaysOpen = function () {
        var self = this;
        self.days.forEach(function (day) {
            day.isOpen = true;
            if (day.timeSlots.length === 0) {
                day.timeSlots.push(self.createDefaultTimeSlot());
            }
        });
        self.validateAllTimeSlots();
        self.baseController.showToast(TOASTER_TYPE.SUCCESS, 'All days set to open');
    };
    cardDetailOpeningHoursController.prototype.setWeekdaysOnly = function () {
        var self = this;
        self.days.forEach(function (day) {
            day.isOpen = day.dayOfWeek >= 1 && day.dayOfWeek <= 5; // Monday to Friday
            if (day.isOpen && day.timeSlots.length === 0) {
                day.timeSlots.push(self.createDefaultTimeSlot());
            }
        });
        self.validateAllTimeSlots();
        self.baseController.showToast(TOASTER_TYPE.SUCCESS, 'Weekdays only hours set');
    };
    cardDetailOpeningHoursController.prototype.copyToAll = function () {
        var self = this;
        var mondayTemplate = self.days[0]; // Monday
        if (!mondayTemplate.isOpen) {
            self.baseController.showToast(TOASTER_TYPE.WARNING, 'Monday must be open to copy to other daysWeekdays only hours set');
            return;
        }
        self.days.slice(1).forEach(function (day) {
            day.isOpen = true;
            day.timeSlots = mondayTemplate.timeSlots.map(function (slot) { return ({
                openTime: slot.openTime,
                closeTime: slot.closeTime,
                hasError: false,
                errorMessage: ''
            }); });
        });
        self.validateAllTimeSlots();
        self.baseController.showToast(TOASTER_TYPE.SUCCESS, 'Monday hours copied to all days');
    };
    cardDetailOpeningHoursController.prototype.resetToDefaults = function () {
        var self = this;
        self.initializeDays();
        self.cardDetail.workingHours.show24Hours = false;
        self.cardDetail.workingHours.specialNotes = '';
        self.baseController.showToast(TOASTER_TYPE.SUCCESS, 'Opening hours reset to defaults');
    };
    // Time formatting for display
    cardDetailOpeningHoursController.prototype.formatTime = function (timeValue) {
        var self = this;
        if (!timeValue)
            return '--:--';
        var hours = timeValue.getUTCHours();
        var minutesString = timeValue.getUTCMinutes().toString();
        var minutes = minutesString.padStart(2, '0');
        if (!self.baseController.isNullOrUndefined(self.cardDetail.workingHours) && !self.baseController.isNullOrUndefined(self.cardDetail.workingHours.show24Hours) && self.cardDetail.workingHours.show24Hours) {
            var hoursString = hours.toString();
            return hoursString.padStart(2, '0') + ":" + minutes;
        }
        var ampm = hours >= 12 ? 'PM' : 'AM';
        var displayHours = hours % 12 || 12; // Convert 0 to 12
        return displayHours + ":" + minutes + " " + ampm;
    };
    // Save functionality
    cardDetailOpeningHoursController.prototype.saveOpeningHours = function () {
        var self = this;
        // Validate all time slots before saving
        self.validateAllTimeSlots();
        // Check if there are any validation errors
        var hasErrors = self.days.some(function (day) {
            return day.isOpen && day.timeSlots.some(function (slot) { return slot.hasError; });
        });
        /* if (hasErrors) {
             self.toaster.error('You may want to fix all validation errors concerning opening hours.');
         }
 */
        var openingHoursData = {
            days: self.days.map(function (day) { return ({
                name: day.name,
                short: day.short,
                dayOfWeek: day.dayOfWeek,
                isOpen: day.isOpen,
                timeSlots: day.isOpen ? day.timeSlots.map(function (slot) { return ({
                    openTime: slot.openTime,
                    closeTime: slot.closeTime
                }); }) : []
            }); }),
            show24Hours: self.cardDetail.workingHours.show24Hours,
            specialNotes: self.cardDetail.workingHours.specialNotes,
            lastUpdated: new Date().toISOString()
        };
        // Save to card detail
        self.cardDetail.workingHours = openingHoursData; // JSON.stringify(openingHoursData);
        // For now, just show success message since web service call is commented out
        //self.toaster.success('Opening hours saved successfully');
        // Call the card web service to save
        //self.cardWebService.updateCard(self.cardDetail)
        //    .then((response) => {
        //        self.toaster.success('Opening hours saved successfully');
        //        // Refresh the card detail if needed
        //        self.callerController.onSave();
        //    })
        //    .catch((error) => {
        //        self.toaster.error('Failed to save opening hours: ' + (error.message || 'Unknown error'));
        //        console.error('Save opening hours error:', error);
        //    });
    };
    // Helper method to check if any day has errors
    cardDetailOpeningHoursController.prototype.hasValidationErrors = function () {
        var self = this;
        return self.days.some(function (day) {
            return day.isOpen && day.timeSlots.some(function (slot) { return slot.hasError; });
        });
    };
    // Helper method to get summary of open days
    cardDetailOpeningHoursController.prototype.getOpenDaysSummary = function () {
        var self = this;
        var openDays = self.days.filter(function (day) { return day.isOpen; });
        if (openDays.length === 0) {
            return 'Closed all days';
        }
        if (openDays.length === 7) {
            return 'Open every day';
        }
        if (openDays.length === 5 && openDays.every(function (day) { return day.dayOfWeek >= 1 && day.dayOfWeek <= 5; })) {
            return 'Weekdays only';
        }
        return openDays.map(function (day) { return day.short; }).join(', ');
    };
    // Helper method to check if day has valid time slots
    cardDetailOpeningHoursController.prototype.hasValidTimeSlots = function (day) {
        return day.timeSlots && day.timeSlots.length > 0 &&
            day.timeSlots.some(function (slot) { return slot.openTime && slot.closeTime && !slot.hasError; });
    };
    cardDetailOpeningHoursController.prototype.loadOpeningHours = function () {
        var self = this;
        // Only load if there's actual data, otherwise keep defaults
        if (!self.baseController.isNullOrUndefined(self.cardDetail) && !self.baseController.isNullOrUndefined(self.cardDetail.workingHours)) {
            try {
                self.populateFromData(self.cardDetail.workingHours);
            }
            catch (e) {
                console.warn('Could not parse opening hours data:', e);
            }
        }
    };
    cardDetailOpeningHoursController.prototype.populateFromData = function (data) {
        var self = this;
        if (data.days && Array.isArray(data.days)) {
            data.days.forEach(function (dayData, index) {
                if (self.days[index] && dayData) {
                    self.days[index].isOpen = dayData.isOpen === true;
                    if (dayData.timeSlots && Array.isArray(dayData.timeSlots) && dayData.timeSlots.length > 0) {
                        self.days[index].timeSlots = dayData.timeSlots
                            .filter(function (slot) { return slot && slot.openTime && slot.closeTime; })
                            .map(function (slot) { return ({
                            openTime: self.formatTimeInput(slot.openTime),
                            closeTime: self.formatTimeInput(slot.closeTime),
                            hasError: false,
                            errorMessage: ''
                        }); });
                        // Ensure at least one time slot
                        if (self.days[index].timeSlots.length === 0) {
                            self.days[index].timeSlots = [self.createDefaultTimeSlot()];
                        }
                    }
                    else {
                        self.days[index].timeSlots = [self.createDefaultTimeSlot()];
                    }
                }
            });
        }
    };
    return cardDetailOpeningHoursController;
}());
cardModule.controller("cardDetailOpeningHoursController", ["$scope",
    "$parse",
    "toaster",
    "cardWebService",
    cardDetailOpeningHoursController
]);
// Add directive for time conversion
cardModule.directive('timeToString', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            ngModel.$formatters.push(function (value) {
                if (!value)
                    return '';
                var date = new Date(value);
                var hoursString = date.getHours().toString();
                var minutesString = date.getMinutes().toString();
                var hours = hoursString.padStart(2, '0');
                var minutes = minutesString.padStart(2, '0');
                return hours + ":" + minutes;
            });
            ngModel.$parsers.push(function (value) {
                if (!value)
                    return null;
                var _a = value.split(':').map(Number), hours = _a[0], minutes = _a[1];
                var date = new Date();
                date.setHours(hours);
                date.setMinutes(minutes);
                return date;
            });
        }
    };
});
