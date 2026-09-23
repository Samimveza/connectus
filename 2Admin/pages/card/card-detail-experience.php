<div class="information-form" ng-controller="cardDetailExperienceController">

    <!-- Experience Section -->
    <div class="form-section">
        <h2 class="section-title">Experience</h2>

        <!-- No Experience Message -->
        <div class="no-fields-message" ng-if="!controller.cardDetail.experience || controller.cardDetail.experience.length === 0">
            <i class="fas fa-briefcase"></i>
            <h3>No Experience Added Yet</h3>
            <p>Add your work experience to showcase your professional background and expertise</p>
        </div>

        <!-- Experience Items -->
        <div class="field-item"
            ng-repeat="experience in controller.cardDetail.experience track by $index"
            drag-events
            drag-start="controller.handleExperienceDragStart($event, $index)"
            drag-over="controller.handleExperienceDragOver($event, $index)"
            drop="controller.handleExperienceDrop($event, $index)"
            drag-end="controller.handleExperienceDragEnd($event)">

            <div class="field-item-header">
                <button class="field-drag-handle">
                    <i class="fas fa-grip-vertical"></i>
                </button>
                <span class="field-type">
                    <i class="fas fa-briefcase"></i>
                    Experience - {{experience.title || 'Untitled'}}
                </span>
                <button class="field-remove" ng-click="controller.removeExperience(experience)">
                    <i class="fas fa-times"></i>
                </button>
            </div>

            <div class="field-content">
                <div class="form-group">
                    <label>Job Title</label>
                    <input type="text" class="form-input" ng-model="experience.title" placeholder="e.g., Software Engineer, Marketing Manager">
                </div>
                <div class="form-group">
                    <label>Employment Type</label>
                    <input type="text" class="form-input" ng-model="experience.employmentType" placeholder="e.g., Full-time, Part-time, Contract, Internship">
                </div>
                <div class="form-group">
                    <label>Company</label>
                    <input type="text" class="form-input" ng-model="experience.company" placeholder="Company or Organization Name">
                </div>
                <div class="form-group">
                    <label>Location</label>
                    <input type="text" class="form-input" ng-model="experience.location" placeholder="City, Country or Remote">
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Start Date</label>
                        <input type="date" class="form-input" ng-model="experience.startDate">
                    </div>
                    <div class="form-group">
                        <label>End Date</label>
                        <input type="date" class="form-input" ng-model="experience.endDate">
                    </div>
                </div>
                <div class="form-group">
                    <label>Headline</label>
                    <input type="text" class="form-input" ng-model="experience.headline" placeholder="Brief summary of your role or achievements">
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <textarea class="form-input" ng-model="experience.description" placeholder="Detailed description of your responsibilities, achievements, and contributions" rows="3"></textarea>
                </div>

                <!-- Skills Section -->
                <div class="form-group">
                    <label>Skills & Technologies</label>
                    <div class="skills-section">
                        <!-- No Skills Message -->
                        <div class="no-skills-message" ng-if="!experience.skills || experience.skills.length === 0">
                            <i class="fas fa-tags"></i>
                            <p>No skills added yet</p>
                        </div>

                        <!-- Skills List -->
                        <div class="skills-list" ng-if="experience.skills && experience.skills.length > 0">
                            <div class="skill-item" ng-repeat="skill in experience.skills track by $index">
                                <input type="text" class="form-input skill-input" ng-model="skill.name" placeholder="Skill name">
                                <button class="btn-remove-skill" type="button" ng-click="controller.removeSkill(experience, skill)">
                                    <i class="fas fa-times"></i>
                                </button>
                            </div>
                        </div>

                        <!-- Add Skill Button -->
                        <button class="btn-add-skill" type="button" ng-click="controller.addSkill(experience)">
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
                        <div class="no-documents-message" ng-if="!experience.media || experience.media.length === 0">
                            <i class="fas fa-file-upload"></i>
                            <p>No documents added yet</p>
                        </div>

                        <!-- Documents Grid -->
                        <div class="documents-grid" ng-if="experience.media && experience.media.length > 0">
                            <div class="document-item" ng-repeat="media in experience.media track by $index">
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
                                                ng-click="controller.removeMedia(experience, media)"
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
                            ng-click="controller.addMedia(experience)">
                            <i class="fas fa-plus"></i>
                            Add Document
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <button class="btn-submit" type="button" ng-click="controller.addExperience()">
            <i class="fas fa-plus"></i> Add Experience
        </button>
    </div>

</div>
