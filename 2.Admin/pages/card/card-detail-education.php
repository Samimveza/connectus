<div class="information-form" ng-controller="cardDetailEducationController">

    <!-- Education Section -->
    <div class="form-section">
        <h2 class="section-title">Education</h2>

        <!-- No Education Message -->
        <div class="no-fields-message" ng-if="!controller.cardDetail.education || controller.cardDetail.education.length === 0">
            <i class="fas fa-graduation-cap"></i>
            <h3>No Education Added Yet</h3>
            <p>Add your educational background to showcase your qualifications and expertise</p>
        </div>

        <!-- Education Items -->
        <div class="field-item"
            ng-repeat="education in controller.cardDetail.education track by $index"
            drag-events
            drag-start="controller.handleEducationDragStart($event, $index)"
            drag-over="controller.handleEducationDragOver($event, $index)"
            drop="controller.handleEducationDrop($event, $index)"
            drag-end="controller.handleEducationDragEnd($event)">

            <div class="field-item-header">
                <button class="field-drag-handle">
                    <i class="fas fa-grip-vertical"></i>
                </button>
                <span class="field-type">
                    <i class="fas fa-graduation-cap"></i>
                    Education - {{education.school || 'Untitled'}}
                </span>
                <button class="field-remove" ng-click="controller.removeEducation(education)">
                    <i class="fas fa-times"></i>
                </button>
            </div>

            <div class="field-content">
                <div class="form-group">
                    <label>School/Institution</label>
                    <input type="text" class="form-input" ng-model="education.school" placeholder="School or Institution Name">
                </div>
                <div class="form-group">
                    <label>Degree</label>
                    <input type="text" class="form-input" ng-model="education.degree" placeholder="Degree (e.g., Bachelor's, Master's, PhD)">
                </div>
                <div class="form-group">
                    <label>Field of Study</label>
                    <input type="text" class="form-input" ng-model="education.fieldOfStudy" placeholder="Field of Study (e.g., Computer Science, Business)">
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Start Date</label>
                        <input type="date" class="form-input" ng-model="education.startDate">
                    </div>
                    <div class="form-group">
                        <label>End Date</label>
                        <input type="date" class="form-input" ng-model="education.endDate">
                    </div>
                </div>
                <div class="form-group">
                    <label>Grade</label>
                    <input type="text" class="form-input" ng-model="education.grade" placeholder="Grade (e.g., 3.8 GPA, First Class)">
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <textarea class="form-input" ng-model="education.description" placeholder="Additional details about your education, achievements, or relevant coursework" rows="3"></textarea>
                </div>

                <!-- Skills Section -->
                <div class="form-group">
                    <label>Skills & Competencies</label>
                    <div class="skills-section">
                        <!-- No Skills Message -->
                        <div class="no-skills-message" ng-if="!education.skills || education.skills.length === 0">
                            <i class="fas fa-tags"></i>
                            <p>No skills added yet</p>
                        </div>

                        <!-- Skills List -->
                        <div class="skills-list" ng-if="education.skills && education.skills.length > 0">
                            <div class="skill-item" ng-repeat="skill in education.skills track by $index">
                                <input type="text" class="form-input skill-input" ng-model="skill.name" placeholder="Skill name">
                                <button class="btn-remove-skill" type="button" ng-click="controller.removeSkill(education, skill)">
                                    <i class="fas fa-times"></i>
                                </button>
                            </div>
                        </div>

                        <!-- Add Skill Button -->
                        <button class="btn-add-skill" type="button" ng-click="controller.addSkill(education)">
                            <i class="fas fa-plus"></i>
                            Add Skill
                        </button>
                    </div>
                </div>

                <!-- Documents Section -->
                <div class="form-group">
                    <label>Certificates & Documents</label>
                    <div class="documents-section">
                        <!-- No Documents Message -->
                        <div class="no-documents-message" ng-if="!education.media || education.media.length === 0">
                            <i class="fas fa-file-upload"></i>
                            <p>No documents added yet</p>
                        </div>

                        <!-- Documents Grid -->
                        <div class="documents-grid" ng-if="education.media && education.media.length > 0">
                            <div class="document-item" ng-repeat="media in education.media track by $index">
                                <div class="document-container">
                                    <div class="document-preview">
                                        <img src="{{media.document.url}}" alt="Document" ng-show="media.document && media.document.url">
                                        <img src="/images/sample-company-portfolio-placeholder.png" alt="Document" ng-show="!media.document || !media.document.url">
                                        
                                        <!-- Document Actions -->
                                        <div class="document-actions">
                                            <button class="btn-document-action btn-replace" 
                                                ngf-select="controller.upload($file, media.document, false)" 
                                                ngf-accept="'image/*,.pdf,.doc,.docx'" 
                                                type="button"
                                                title="Replace Document">
                                                <i class="fas fa-upload"></i>
                                            </button>
                                            <button class="btn-document-action btn-remove" 
                                                ng-click="controller.removeMedia(education, media)"
                                                type="button"
                                                title="Remove Document">
                                                <i class="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Add Document Button -->
                        <button class="btn-add-document" 
                            type="button" 
                            ng-click="controller.addMedia(education)">
                            <i class="fas fa-plus"></i>
                            Add Document
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <button class="btn-submit" type="button" ng-click="controller.addEducation()">
            <i class="fas fa-plus"></i> Add Education
        </button>
    </div>

</div>
