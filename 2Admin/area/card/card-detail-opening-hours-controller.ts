interface ITimeSlot {
    openTime: Date;
    closeTime: Date;
    hasError: boolean;
    errorMessage: string;
}

interface IDay {
    name: string;
    short: string;
    dayOfWeek: number;
    isOpen: boolean;
    timeSlots: ITimeSlot[];
}
class cardDetailOpeningHoursController implements IChildCardDetailController {
    scope;
    baseController: baseController;
    callerController: ICardDetailOpeningHoursCaller;
    groupName: string = cardDetailTabNameFromEnum.getName(cardDetailTab.OPENING_HOURS);

    cardWebService: cardWebService;
    formValidator: formValidator;
    cardDetailTabEnum = cardDetailTab;
    searchQuery;

    // Opening hours data
    days: IDay[] = [];

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

        this.callerController.registerCardDetailOpeningHoursController(this);
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
        self.initializeDays();
        self.registerValidations();
    }

    private initializeDays() {
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
    }

    private createDefaultTimeSlot(): ITimeSlot {
        // Create dates with UTC to avoid timezone issues
        const defaultOpen = new Date(Date.UTC(2000, 0, 1, 9, 0, 0, 0));
        const defaultClose = new Date(Date.UTC(2000, 0, 1, 17, 0, 0, 0));
        return {
            openTime: defaultOpen,
            closeTime: defaultClose,
            hasError: false,
            errorMessage: ''
        };
    }

    private formatTimeInput(timeValue: string | Date): Date {
        if (!timeValue) return new Date(Date.UTC(2000, 0, 1, 0, 0, 0, 0));

        if (timeValue instanceof Date) {
            return timeValue;
        }

        // Handle string format
        const timeRegex = /^(\d{1,2}):(\d{2}):(\d{2})$/;
        const match = timeValue.match(timeRegex);
        
        if (match) {
            const hours = parseInt(match[1]);
            const minutes = parseInt(match[2]);
            // Validate hours and minutes
            if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
                return new Date(Date.UTC(2000, 0, 1, hours, minutes, 0, 0));
            }
        }
        return new Date(Date.UTC(2000, 0, 1, 0, 0, 0, 0));
    }

    private isValidTimeFormat(timeString: string): boolean {
        if (!timeString) return false;

        var timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
        return timeRegex.test(timeString);
    }

    public registerValidations() {
        var self = this;
        if (self.formValidator != null) {
            self.formValidator.deRegister();
        }

        self.formValidator = new formValidator(this.$parse, this.toaster, self.scope, self.formName);
        self.formValidator.registerGroupValidation(self.groupName, []);
    }

    public onDetailLoaded() {
        var self = this;
        self.loadOpeningHours();
    }

    // Day management methods
    public onDayToggle(day: IDay) {
        var self = this;
        if (day.isOpen && day.timeSlots.length === 0) {
            day.timeSlots.push(self.createDefaultTimeSlot());
        }
        self.validateAllTimeSlots();
    }

    // Time slot management
    public addTimeSlot(day: IDay) {
        var self = this;
        if (day.timeSlots.length < 3) {
            day.timeSlots.push(self.createDefaultTimeSlot());
        }
    }

    public removeTimeSlot(day: IDay, index: number) {
        var self = this;
        if (day.timeSlots.length > 1) {
            day.timeSlots.splice(index, 1);
        }
        self.validateDayTimeSlots(day);
    }

    // Validation methods
    public validateTimeSlot(day: IDay, slot: ITimeSlot) {
        var self = this;
        slot.hasError = false;
        slot.errorMessage = '';

        if (!slot.openTime || !slot.closeTime) {
            slot.hasError = true;
            slot.errorMessage = 'Both open and close times are required';
            return;
        }

        const openTime = slot.openTime.getUTCHours() * 60 + slot.openTime.getUTCMinutes();
        const closeTime = slot.closeTime.getUTCHours() * 60 + slot.closeTime.getUTCMinutes();

        if (openTime >= closeTime) {
            slot.hasError = true;
            slot.errorMessage = 'Close time must be after open time';
            return;
        }

        // Check for overlapping time slots
        var hasOverlap = day.timeSlots.some((otherSlot, index) => {
            if (otherSlot === slot || !otherSlot.openTime || !otherSlot.closeTime) return false;

            const otherOpen = otherSlot.openTime.getUTCHours() * 60 + otherSlot.openTime.getUTCMinutes();
            const otherClose = otherSlot.closeTime.getUTCHours() * 60 + otherSlot.closeTime.getUTCMinutes();

            return (openTime < otherClose && closeTime > otherOpen);
        });

        if (hasOverlap) {
            slot.hasError = true;
            slot.errorMessage = 'Time slots cannot overlap';
        }
    }

    private validateDayTimeSlots(day: IDay) {
        var self = this;
        if (day.isOpen) {
            day.timeSlots.forEach(slot => {
                self.validateTimeSlot(day, slot);
            });
        }
    }

    private validateAllTimeSlots() {
        var self = this;
        self.days.forEach(day => {
            self.validateDayTimeSlots(day);
        });
    }

    private parseTime(timeString: string): number {
        if (!timeString) return 0;
        var parts = timeString.split(':');
        if (parts.length !== 2) return 0;
        return parseInt(parts[0]) * 60 + parseInt(parts[1]);
    }

    // Quick setup methods
    public setAllDaysOpen() {
        var self = this;
        self.days.forEach(day => {
            day.isOpen = true;
            if (day.timeSlots.length === 0) {
                day.timeSlots.push(self.createDefaultTimeSlot());
            }
        });
        self.validateAllTimeSlots();
        self.baseController.showToast(TOASTER_TYPE.SUCCESS, 'All days set to open'); 
    }

    public setWeekdaysOnly() {
        var self = this;
        self.days.forEach(day => {
            day.isOpen = day.dayOfWeek >= 1 && day.dayOfWeek <= 5; // Monday to Friday
            if (day.isOpen && day.timeSlots.length === 0) {
                day.timeSlots.push(self.createDefaultTimeSlot());
            }
        });
        self.validateAllTimeSlots();
        self.baseController.showToast(TOASTER_TYPE.SUCCESS, 'Weekdays only hours set'); 
    }

    public copyToAll() {
        var self = this;
        var mondayTemplate = self.days[0]; // Monday

        if (!mondayTemplate.isOpen) {
            self.baseController.showToast(TOASTER_TYPE.WARNING, 'Monday must be open to copy to other daysWeekdays only hours set'); 

            return;
        }

        self.days.slice(1).forEach(day => {
            day.isOpen = true;
            day.timeSlots = mondayTemplate.timeSlots.map(slot => ({
                openTime: slot.openTime,
                closeTime: slot.closeTime,
                hasError: false,
                errorMessage: ''
            }));
        });

        self.validateAllTimeSlots();
        self.baseController.showToast(TOASTER_TYPE.SUCCESS, 'Monday hours copied to all days'); 
    }

    public resetToDefaults() {
        var self = this;
        self.initializeDays();
        self.cardDetail.workingHours.show24Hours = false
        self.cardDetail.workingHours.specialNotes = '';
        self.baseController.showToast(TOASTER_TYPE.SUCCESS, 'Opening hours reset to defaults'); 
    }

    // Time formatting for display
    public formatTime(timeValue: Date): string {
        var self = this;
        if (!timeValue) return '--:--';

        const hours = timeValue.getUTCHours();
        var minutesString:any = timeValue.getUTCMinutes().toString();

        const minutes = minutesString.padStart(2, '0');

        if (!self.baseController.isNullOrUndefined(self.cardDetail.workingHours) && !self.baseController.isNullOrUndefined(self.cardDetail.workingHours.show24Hours) && self.cardDetail.workingHours.show24Hours ) {
            var hoursString:any = hours.toString();
            return `${hoursString.padStart(2, '0')}:${minutes}`;
        }

        const ampm = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours % 12 || 12; // Convert 0 to 12

        return `${displayHours}:${minutes} ${ampm}`;
    }

    // Save functionality
    public saveOpeningHours() {
        var self = this;

        // Validate all time slots before saving
        self.validateAllTimeSlots();

        // Check if there are any validation errors
        var hasErrors = self.days.some(day =>
            day.isOpen && day.timeSlots.some(slot => slot.hasError)
        );

        /* if (hasErrors) {
             self.toaster.error('You may want to fix all validation errors concerning opening hours.');
         }
 */
        var openingHoursData = {
            days: self.days.map(day => ({
                name: day.name,
                short: day.short,
                dayOfWeek: day.dayOfWeek,
                isOpen: day.isOpen,
                timeSlots: day.isOpen ? day.timeSlots.map(slot => ({
                    openTime: slot.openTime,
                    closeTime: slot.closeTime
                })) : []
            })),
            show24Hours: self.cardDetail.workingHours.show24Hours,
            specialNotes: self.cardDetail.workingHours.specialNotes,
            lastUpdated: new Date().toISOString()
        };
        // Save to card detail
        self.cardDetail.workingHours = openingHoursData;// JSON.stringify(openingHoursData);

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
    }

    // Helper method to check if any day has errors
    public hasValidationErrors(): boolean {
        var self = this;
        return self.days.some(day =>
            day.isOpen && day.timeSlots.some(slot => slot.hasError)
        );
    }

    // Helper method to get summary of open days
    public getOpenDaysSummary(): string {
        var self = this;
        var openDays = self.days.filter(day => day.isOpen);

        if (openDays.length === 0) {
            return 'Closed all days';
        }

        if (openDays.length === 7) {
            return 'Open every day';
        }

        if (openDays.length === 5 && openDays.every(day => day.dayOfWeek >= 1 && day.dayOfWeek <= 5)) {
            return 'Weekdays only';
        }

        return openDays.map(day => day.short).join(', ');
    }

    // Helper method to check if day has valid time slots
    public hasValidTimeSlots(day: IDay): boolean {
        return day.timeSlots && day.timeSlots.length > 0 &&
            day.timeSlots.some(slot => slot.openTime && slot.closeTime && !slot.hasError);
    }

    private loadOpeningHours() {
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
    }

    private populateFromData(data: any) {
        var self = this;

        if (data.days && Array.isArray(data.days)) {
            data.days.forEach((dayData: any, index: number) => {
                if (self.days[index] && dayData) {
                    self.days[index].isOpen = dayData.isOpen === true;
                    if (dayData.timeSlots && Array.isArray(dayData.timeSlots) && dayData.timeSlots.length > 0) {
                        self.days[index].timeSlots = dayData.timeSlots
                            .filter((slot: any) => slot && slot.openTime && slot.closeTime)
                            .map((slot: any) => ({
                                openTime: self.formatTimeInput(slot.openTime),
                                closeTime: self.formatTimeInput(slot.closeTime),
                                hasError: false,
                                errorMessage: ''
                            }));
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
    }
}

cardModule.controller("cardDetailOpeningHoursController"
    , ["$scope"
        , "$parse"
        , "toaster"
        , "cardWebService"
        , cardDetailOpeningHoursController
    ]);

// Add directive for time conversion
cardModule.directive('timeToString', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            ngModel.$formatters.push(function (value) {
                if (!value) return '';
                const date = new Date(value);

                var hoursString: any = date.getHours().toString();
                var minutesString: any = date.getMinutes().toString();

                const hours = hoursString.padStart(2, '0');
                const minutes = minutesString.padStart(2, '0');
                return `${hours}:${minutes}`;
            });

            ngModel.$parsers.push(function (value) {
                if (!value) return null;
                const [hours, minutes] = value.split(':').map(Number);
                const date = new Date();
                date.setHours(hours);
                date.setMinutes(minutes);
                return date;
            });
        }
    };
});
