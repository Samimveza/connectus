<div class="opening-hours-container" ng-controller="cardDetailOpeningHoursController">

    <!-- Header Section -->
    <div class="section-header">
        <h3 class="section-title">
            <i class="fas fa-clock"></i>
            Opening Hours
        </h3>
        <p class="section-description">
            Set your business operating hours for each day of the week. Customers will be able to see when you're open.
        </p>
    </div>

    <!-- Quick Actions -->
    <div class="opening-hours-actions">
        <button type="button" class="btn btn-outline-primary btn-sm" ng-click="controller.setAllDaysOpen()">
            <i class="fas fa-plus-circle"></i>
            Set All Days Open
        </button>
        <button type="button" class="btn btn-outline-secondary btn-sm" ng-click="controller.setWeekdaysOnly()">
            <i class="fas fa-briefcase"></i>
            Weekdays Only
        </button>
        <button type="button" class="btn btn-outline-secondary btn-sm" ng-click="controller.copyToAll()">
            <i class="fas fa-copy"></i>
            Copy Monday to All
        </button>
    </div>

    <!-- Opening Hours Form -->
    <div class="opening-hours-form">
        <div class="days-container">
            <div class="day-item" ng-repeat="day in controller.days" ng-class="{'day-closed': !day.isOpen}">

                <!-- Day Header -->
                <div class="day-header">
                    <div class="day-info">
                        <h4 class="day-name">{{day.name}}</h4>
                        <span class="day-short">{{day.short}}</span>
                    </div>

                    <!-- Open/Closed Toggle -->
                    <div class="day-toggle">
                        <label class="toggle-switch">
                            <input type="checkbox" ng-model="day.isOpen" ng-change="controller.onDayToggle(day)">
                            <span class="toggle-slider">
                                <span class="toggle-text" ng-show="day.isOpen">OPEN</span>
                                <span class="toggle-text" ng-show="!day.isOpen">CLOSED</span>
                            </span>
                        </label>
                    </div>
                </div>

                <!-- Time Slots (shown when day is open) -->
                <div class="day-content" ng-show="day.isOpen">
                    <div class="time-slots">
                        <div class="time-slot" ng-repeat="slot in day.timeSlots track by $index">

                            <!-- Time Inputs -->
                            <div class="time-inputs-row">
                                <div class="time-group">
                                    <label class="time-label">OPENS</label>
                                    <div class="time-input-wrapper">
                                        <input type="time"
                                            class="form-input time-input"
                                            ng-model="slot.openTime"
                                            ng-model-options="{ timezone: 'UTC' }"
                                            ng-change="controller.validateTimeSlot(day, slot)"
                                            step="300">
                                        <i class="fas fa-clock time-icon"></i>
                                        <i class="fas fa-info-circle time-help-icon" title="Enter time in HH:MM format (24-hour)"></i>
                                    </div>
                                </div>

                                <div class="time-separator">
                                    <i class="fas fa-arrow-right"></i>
                                </div>

                                <div class="time-group">
                                    <label class="time-label">CLOSES</label>
                                    <div class="time-input-wrapper">
                                        <input type="time"
                                            class="form-input time-input"
                                            ng-model="slot.closeTime"
                                            ng-model-options="{ timezone: 'UTC' }"
                                            ng-change="controller.validateTimeSlot(day, slot)"
                                            step="300">
                                        <i class="fas fa-clock time-icon"></i>
                                        <i class="fas fa-info-circle time-help-icon" title="Enter time in HH:MM format (24-hour)"></i>
                                    </div>
                                </div>

                                <!-- Slot Actions -->
                                <div class="slot-actions">
                                    <button type="button"
                                        class="btn-slot-action btn-remove-slot"
                                        ng-click="controller.removeTimeSlot(day, $index)"
                                        ng-show="day.timeSlots.length > 1"
                                        title="Remove time slot">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>

                            <!-- Validation Error -->
                            <div class="slot-error" ng-show="slot.hasError">
                                <i class="fas fa-exclamation-triangle"></i>
                                <span>{{slot.errorMessage}}</span>
                            </div>
                        </div>

                        <!-- Add Time Slot Button -->
                        <div class="add-slot-container" ng-show="day.timeSlots.length < 3">
                            <button type="button"
                                class="btn-add-slot"
                                ng-click="controller.addTimeSlot(day)">
                                <i class="fas fa-plus"></i>
                                Add Time Slot
                            </button>
                            <p class="add-slot-hint">Add breaks or split hours (e.g., lunch break)</p>
                        </div>
                    </div>
                </div>

                <!-- Closed Day Message -->
                <div class="day-closed-message" ng-show="!day.isOpen">
                    <i class="fas fa-moon"></i>
                    <span>Closed on {{day.name}}</span>
                </div>
            </div>
        </div>
    </div>

    <!-- Additional Options -->
    <div class="opening-hours-options">
        <div class="options-section">
            <h4 class="options-title">
                <i class="fas fa-cog"></i>
                Additional Settings
            </h4>


            <div class="toggle-switch-24-hours">
                <label class="switch">
                    <input type="checkbox" id="show24Hours" ng-model="controller.cardDetail.workingHours.show24Hours">
                    <span class="slider"></span>
                </label>
                <label for="show24Hours" class="toggle-label">Display in 24-hour format</label>
            </div>

        </div>

        <!-- Special Notes -->
        <div class="options-section">
            <h4 class="options-title">
                <i class="fas fa-sticky-note"></i>
                Special Notes
            </h4>
            <div class="form-group special-notes-container">

                <div text-angular class="form-input-wysiwyg-text-angular"
                    ng-model="controller.cardDetail.workingHours.specialNotes"
                    ta-toolbar="[['h1','h2','h3'],['bold','italics','underline','strikeThrough'],['ul','ol'],['justifyLeft','justifyCenter','justifyRight'],['indent','outdent'],['insertLink','insertImage'],['clear']]"
                    ta-text-editor-class="form-input-wysiwyg"
                    ta-html-editor-class="form-input-wysiwyg"
                    placeholder="Add any special notes about your hours (e.g., 'Closed on public holidays', 'Extended hours during holidays')"
                    name="specialNotes"
                    id="specialNotes">
                </div>

                <div class="character-count"
                    ng-class="{
                         'warning': (controller.specialNotes || '').length > 400,
                         'danger': (controller.specialNotes || '').length > 475
                     }">
                    {{500 - (controller.specialNotes || '').length}} characters remaining
                </div>
            </div>
        </div>
    </div>

    <!-- Preview Section -->
    <div class="opening-hours-preview">
        <h4 class="preview-title">
            <i class="fas fa-eye"></i>
            Preview
        </h4>
        <div class="opening-hours-preview-content">
            <div class="preview-day" ng-repeat="day in controller.days">
                <div class="preview-day-name">{{day.name}}</div>
                <div class="preview-day-hours" ng-if="day.isOpen">
                    <div ng-if="controller.hasValidTimeSlots(day)">
                        <div ng-repeat="slot in day.timeSlots" ng-if="slot.openTime && slot.closeTime && !slot.hasError" class="preview-time-slot">
                            {{controller.formatTime(slot.openTime)}} - {{controller.formatTime(slot.closeTime)}}
                        </div>
                    </div>
                    <div ng-if="!controller.hasValidTimeSlots(day)" class="preview-day-hours closed">
                        Not configured
                    </div>
                </div>
                <div class="preview-day-hours closed" ng-if="!day.isOpen">Closed</div>
            </div>

            <div class="preview-notes" ng-show="controller.specialNotes">
                <div class="notes-label">Special Notes</div>
                <div class="notes-text">{{controller.specialNotes}}</div>
            </div>
        </div>
    </div>

    <!--<div class="opening-hours-actions">
        <button type="button" class="btn btn-outline-primary btn-sm" ng-click="controller.resetToDefaults()">
            <i class="fas fa-undo"></i>
            Reset to Defaults
        </button>
        <button type="button" class="btn btn-primary" ng-click="controller.saveOpeningHours()">
            <i class="fas fa-save"></i>
            Save Opening Hours
        </button>
    </div>-->

</div>