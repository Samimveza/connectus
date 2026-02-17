<div class="information-form" ng-controller="cardDetailPortfolioController">

    <!-- Company Portfolio Section -->
    <div class="form-section">
        <h2 class="section-title">Portfolio</h2>
        
        <div class="form-group">
            <label for="portfolioTitle">Portfolio Title</label>
            <input type="text" id="portfolioTitle" class="form-input" ng-model="controller.cardDetail.portfolioTitle" placeholder="Portfolio Title" name="portfolioTitle">
        </div>

        <div class="form-group" ng-if="controller.cardDetail">
            <label for="portfolioDescription">Portfolio Description</label>
            <div text-angular class="form-input-wysiwyg-text-angular"
                ng-model="controller.cardDetail.portfolioDescription"
                ta-toolbar="[['h1','h2','h3'],['bold','italics','underline','strikeThrough'],['ul','ol'],['justifyLeft','justifyCenter','justifyRight'],['indent','outdent'],['insertLink','insertImage'],['clear']]"
                ta-text-editor-class="form-input-wysiwyg"
                ta-html-editor-class="form-input-wysiwyg"
                placeholder="Brief description of your portfolio..."
                name="portfolioDescription"
                id="portfolioDescription">
            </div>
        </div>

        <div class="management-option">
            <div class="option-header">
                <label>Make portfolio private</label>
                <div class="toggle-switch">
                    <input type="checkbox" id="portfolioPrivate" ng-model="controller.cardDetail.portfolioPasswordIsEnabled">
                    <label for="portfolioPrivate"></label>
                </div>
            </div>
            <p class="option-description">When enabled, your portfolio will be protected by a password. Only those with the password will be able to view it.</p>
        </div>

        <div class="form-group" ng-if="controller.cardDetail.portfolioPasswordIsEnabled">
            <label for="portfolioPassword">Portfolio Password</label>
            <input type="password" id="portfolioPassword" class="form-input" ng-model="controller.cardDetail.portfolioPassword" placeholder="Portfolio Password" name="portfolioPassword">
        </div>

        <h2 class="section-title">Portfolio Items</h2>

        <!-- No Gallery Items Message -->
        <div class="no-fields-message" ng-if="!controller.cardDetail.portfolios || controller.cardDetail.portfolios.length === 0">
            <i class="fas fa-images"></i>
            <h3>No Portfolio Items Added Yet</h3>
            <p>Add portfolio items to showcase your personal work, products, or services</p>
        </div>

        <!-- Gallery Items -->
        <div class="field-item gallery-item"
            ng-repeat="portfolioItem in controller.cardDetail.portfolios track by $index"
            drag-events
            drag-start="controller.handlePortfolioDragStart($event, $index)"
            drag-over="controller.handlePortfolioDragOver($event, $index)"
            drop="controller.handlePortfolioDrop($event, $index)"
            drag-end="controller.handlePortfolioDragEnd($event)">

            <div class="field-item-header">
                <button class="field-drag-handle">
                    <i class="fas fa-grip-vertical"></i>
                </button>
                <span class="field-type">
                    <i class="fas fa-image"></i>
                    Portfolio Item - {{portfolioItem.name || 'Untitled'}}
                </span>
                <button class="field-remove" ng-click="controller.removePortfolio(portfolioItem)">
                    <i class="fas fa-times"></i>
                </button>
            </div>

            <div class="field-content">
                <div class="form-group">
                    <label>Portfolio Main Image</label>
                    <div class="photo-upload">
                        <div class="current-photo">
                            <img src="/images/sample-company-portfolio-placeholder.png" alt="Portfolio Image" ng-show="!portfolioItem.image || !portfolioItem.image.url">
                            <img src="{{portfolioItem.image.url}}" alt="Portfolio Image" ng-show="portfolioItem.image && portfolioItem.image.url">
                        </div>
                        <button disable-animate class="replace-photo" ngf-select="controller.upload($file,portfolioItem.image,false,'>=160')" ngf-accept="'image/*'" type="button">
                            <i class="fas fa-camera"></i>
                            Replace/Add Image
                        </button>
                    </div>
                </div>
                <div class="form-group">
                    <label>Portfolio Item Name</label>
                    <input type="text" ng-model="portfolioItem.name" placeholder="e.g., Product Showcase, Office Photos, Team Event" class="form-input">
                </div>
                <div class="form-group">
                    <label>Portfolio Item Description</label>
                    <textarea ng-model="portfolioItem.description" placeholder="Brief description of this portfolio item" class="form-input" rows="3"></textarea>
                </div>

                <!-- Multiple Images Section -->
                <div class="form-group">
                    <label>Additional Images</label>
                    <div class="multiple-images-section">
                        <!-- No Additional Images Message -->
                        <div class="no-images-message" ng-if="!portfolioItem.additionalImages || portfolioItem.additionalImages.length === 0">
                            <i class="fas fa-images"></i>
                            <p>No additional images added yet</p>
                        </div>

                        <!-- Additional Images Grid -->
                        <div class="additional-images-grid" ng-if="portfolioItem.additionalImages && portfolioItem.additionalImages.length > 0">
                            <div class="additional-image-item" 
                                ng-repeat="additionalImage in portfolioItem.additionalImages track by $index"
                                drag-events
                                drag-start="controller.handleAdditionalImageDragStart($event, $index, portfolioItem)"
                                drag-over="controller.handleAdditionalImageDragOver($event, $index, portfolioItem)"
                                drop="controller.handleAdditionalImageDrop($event, $index, portfolioItem)"
                                drag-end="controller.handleAdditionalImageDragEnd($event)">
                                
                                <div class="image-container">
                                    <img src="{{additionalImage.image.url}}" alt="Additional Image" ng-show="additionalImage.image && additionalImage.image.url">
                                    <img src="/images/sample-company-portfolio-placeholder.png" alt="Additional Image" ng-show="!additionalImage.image || !additionalImage.image.url">
                                    
                                    <!-- Image Actions -->
                                    <div class="image-actions">
                                        <button class="btn-image-action btn-replace" 
                                            ngf-select="controller.uploadAdditionalImage($file, additionalImage.image, false)" 
                                            ngf-accept="'image/*'" 
                                            type="button"
                                            title="Replace Image">
                                            <i class="fas fa-camera"></i>
                                        </button>
                                        <button class="btn-image-action btn-remove" 
                                            ng-click="controller.removeAdditionalImage(portfolioItem.additionalImages, additionalImage)"
                                            type="button"
                                            title="Remove Image">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                    
                                    <!-- Drag Handle -->
                                    <div class="image-drag-handle">
                                        <i class="fas fa-grip-vertical"></i>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Add Image Button -->
                        <button class="btn-add-image" 
                            type="button" 
                            ngf-select="controller.addAdditionalImage($file, portfolioItem.additionalImages)" 
                            ngf-accept="'image/*'">
                            <i class="fas fa-plus"></i>
                            Add Image
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <button class="btn-submit" type="button" ng-click="controller.addPortfolio()">
            <i class="fas fa-plus"></i> Add Portfolio Item
        </button>
    </div>

</div>