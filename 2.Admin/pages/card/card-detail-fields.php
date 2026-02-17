<div class="fields-layout" ng-controller="cardDetailFieldsController">
    <!-- Left Section - Additional Fields -->
    <div class="fields-data">
        <div class="fields-header">
            <h3>Additional Fields <i class="fas fa-info-circle"></i></h3>
        </div>

        <!-- Field Items -->
        <div class="field-items">
            <!-- No Fields Message -->
            <div class="no-fields-message" ng-if="!controller.cardDetail.structureFields || controller.cardDetail.structureFields.length === 0">
                <i class="fas fa-plus-circle"></i>
                <h3>No Fields Added Yet</h3>
                <p>Please add items by selecting components from the right panel</p>
            </div>

            <!-- Email Field -->
            <div class="field-item"
                ng-repeat="field in controller.cardDetail.structureFields track by field.idStructureField"
                drag-events
                drag-start="controller.handleDragStart($event, $index)"
                drag-over="controller.handleDragOver($event, $index)"
                drop="controller.handleDrop($event, $index)"
                drag-end="controller.handleDragEnd($event)">

                <div class="field-item-header">
                    <button class="field-drag-handle">
                        <i class="fas fa-grip-vertical"></i>
                    </button>
                    <span class="field-type">
                        <i class="{{field.structureField.icon}}"></i>
                        {{field.structureField.name}}
                    </span>
                    <button class="field-remove" ng-click="controller.removeField(field)">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="management-option" style="padding: 12px 16px; border-bottom: 1px solid #F0F0F0;">
                    <div class="option-header">
                        <label>Private Field</label>
                        <div class="toggle-switch">
                            <input type="checkbox" id="fieldPrivate_{{$index}}" ng-model="field.isPrivate">
                            <label for="fieldPrivate_{{$index}}"></label>
                        </div>
                    </div>
                    <p class="option-description" style="margin-bottom: 0; font-size: 12px;">When enabled, this field will not be displayed publicly on your card.</p>
                </div>
                
                <div class="field-content" ng-if="field.structureField.structureFieldType == 'TEXT'">
                    <input type="text" ng-model="field.value" placeholder="{{field.structureField.placeholder}}" class="form-input">
                    <input type="text" placeholder="Display Text" class="form-input" ng-model="field.displayText">
                </div>

                <div class="field-content" ng-if="field.structureField.structureFieldType == 'FILE'">

                    <div class="phone-input-group">
                        <div class="pdf-placeholder" ng-if="!field.document.url">{{field.document}}</div>
                        <div class="pdf-placeholder" ng-if="field.document.url">
                            {{field.document.name}}
                        </div>
                        <button class="pdf-upload-btn" ngf-select="controller.upload($file,field,false)">
                            <i class="fas fa-upload"></i>
                            Upload
                        </button>
                    </div>

                    <input type="text" placeholder="Display Text" class="form-input" ng-model="field.displayText">

                </div>

                <div class="field-content" ng-if="field.structureField.structureFieldType == 'TEXTAREA'">
                    <textarea class="form-input" required rows="4" ng-model="field.value"></textarea>
                    <input type="text" placeholder="Display Text" class="form-input" ng-model="field.displayText">
                </div>

                <div class="field-content" ng-if="field.structureField.structureFieldType == 'DATE'">
                    <input type="date" value="2025-04-19" class="form-input" ng-model="field.value">
                    <input type="text" placeholder="Display Text" class="form-input" ng-model="field.displayText">

                </div>

            </div>


        </div>
    </div>

    <!-- Right Section - Field Selection -->
    <div class="fields-selection">
        <div class="fields-search">
            <input type="text" ng-model="controller.searchQuery" placeholder="Search fields..." class="search-input">
        </div>

        <div class="fields-categories">
            <!-- Dynamic Categories -->
            <div class="category-section"
                ng-repeat="category in controller.structureFields"
                ng-if="(category.items | filter:controller.filterFields).length > 0">

                <h4>{{category.category}}</h4>

                <div class="category-buttons">
                    <button class="field-select-btn"
                        ng-repeat="field in category.items | filter:controller.filterFields"
                        ng-click="controller.addField(field)">
                        <i class="{{field.icon}}"></i>
                        {{field.name}}
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>