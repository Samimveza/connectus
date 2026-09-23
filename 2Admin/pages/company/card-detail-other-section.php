<div class="information-form" ng-controller="cardDetailOtherSectionController">

    <!-- Company Accordion Items Section -->
    <div class="form-section">
        <h2 class="section-title">Company Accordion Items</h2>

        <!-- No Accordion Items Message -->
        <div class="no-fields-message" ng-if="!controller.cardDetail.accordions || controller.cardDetail.accordions.length === 0">
            <i class="fas fa-list-ul"></i>
            <h3>No Accordion Items Added Yet</h3>
            <p>Add accordion sections to showcase detailed information about your company</p>
        </div>
        <!-- Accordion Items -->
        <div class="field-item accordion-item"
            ng-repeat="item in controller.cardDetail.accordions track by $index"
            drag-events
            drag-start="controller.handleAccordionDragStart($event, $index)"
            drag-over="controller.handleAccordionDragOver($event, $index)"
            drop="controller.handleAccordionDrop($event, $index)"
            drag-end="controller.handleAccordionDragEnd($event)">

            <div class="field-item-header">
                <button class="field-drag-handle">
                    <i class="fas fa-grip-vertical"></i>
                </button>
                <span class="field-type">
                    <i class="fas fa-list-ul"></i>
                    Accordion Item {{item.name}}
                </span>
                <button class="field-remove" ng-click="controller.removeAccordion(item)">
                    <i class="fas fa-times"></i>
                </button>
            </div>

            <div class="field-content">
                <div class="form-group">
                    <label>Accordion Title</label>
                    <input type="text" ng-model="item.name" placeholder="e.g., Our Services, Company History, FAQ" class="form-input">
                </div>
                <div class="form-group">
                    <label>Accordion Content</label>
                    <div text-angular class="form-input-wysiwyg-text-angular"
                        ng-model="item.description"
                        ta-toolbar="[['h1','h2','h3'],['bold','italics','underline','strikeThrough'],['ul','ol'],['justifyLeft','justifyCenter','justifyRight'],['indent','outdent'],['insertLink','insertImage'],['clear']]"
                        ta-text-editor-class="form-input-wysiwyg"
                        ta-html-editor-class="form-input-wysiwyg"
                        placeholder="Enter detailed content for this accordion section..."
                        name="accordionDescription_{{$index}}"
                        id="accordionDescription_{{$index}}">
                    </div>
                </div>
            </div>
        </div>

        <button class="btn-submit" type="button" ng-click="controller.addAccordion()">
            <i class="fas fa-plus"></i> Add Accordion Item
        </button>
    </div>

    <!-- Company Gallery Section -->
    <div class="form-section">
        <h2 class="section-title">Company Gallery</h2>

        <!-- No Gallery Items Message -->
        <div class="no-fields-message" ng-if="!controller.cardDetail.gallery || controller.cardDetail.gallery.length === 0">
            <i class="fas fa-images"></i>
            <h3>No Gallery Items Added Yet</h3>
            <p>Add gallery items to showcase your company's work, products, or services</p>
        </div>

        <!-- Gallery Items -->
        <div class="field-item gallery-item"
            ng-repeat="galleryItem in controller.cardDetail.gallery track by $index"
            drag-events
            drag-start="controller.handleGalleryDragStart($event, $index)"
            drag-over="controller.handleGalleryDragOver($event, $index)"
            drop="controller.handleGalleryDrop($event, $index)"
            drag-end="controller.handleGalleryDragEnd($event)">

            <div class="field-item-header">
                <button class="field-drag-handle">
                    <i class="fas fa-grip-vertical"></i>
                </button>
                <span class="field-type">
                    <i class="fas fa-image"></i>
                    Gallery Item - {{galleryItem.name || 'Untitled'}}
                </span>
                <button class="field-remove" ng-click="controller.removeGallery(galleryItem)">
                    <i class="fas fa-times"></i>
                </button>
            </div>

            <div class="field-content">
                <div class="form-group">
                    <label>Gallery Image</label>
                    <div class="photo-upload">
                        <div class="current-photo">
                            <img src="/images/sample-company-gallery-placeholder.png" alt="Gallery Image" ng-show="!galleryItem.image || !galleryItem.image.url">
                            <img src="{{galleryItem.image.url}}" alt="Gallery Image" ng-show="galleryItem.image && galleryItem.image.url">
                        </div>
                        <button disable-animate class="replace-photo" ngf-select="controller.upload($file,galleryItem.image,false,'>=160')" ngf-accept="'image/*'" type="button">
                            <i class="fas fa-camera"></i>
                            Replace/Add Image
                        </button>
                    </div>
                </div>
                <div class="form-group">
                    <label>Gallery Item Name</label>
                    <input type="text" ng-model="galleryItem.name" placeholder="e.g., Product Showcase, Office Photos, Team Event" class="form-input">
                </div>
                <div class="form-group">
                    <label>Gallery Item Description</label>
                    <textarea ng-model="galleryItem.description" placeholder="Brief description of this gallery item" class="form-input" rows="3"></textarea>
                </div>
            </div>
        </div>

        <button class="btn-submit" type="button" ng-click="controller.addGallery()">
            <i class="fas fa-plus"></i> Add Gallery Item
        </button>
    </div>

    <!-- Company Team Members Section -->
    <div class="form-section">
        <h2 class="section-title">Company Team Members</h2>

        <!-- No Team Members Message -->
        <div class="no-fields-message" ng-if="!controller.cardDetail.members || controller.cardDetail.members.length === 0">
            <i class="fas fa-users"></i>
            <h3>No Team Members Added Yet</h3>
            <p>Add team members to showcase your company's talent and expertise</p>
        </div>

        <!-- Team Member Items -->
        <div class="field-item team-member-item"
            ng-repeat="member in controller.cardDetail.members track by $index"
            drag-events
            drag-start="controller.handleMemberDragStart($event, $index)"
            drag-over="controller.handleMemberDragOver($event, $index)"
            drop="controller.handleMemberDrop($event, $index)"
            drag-end="controller.handleMemberDragEnd($event)">

            <div class="field-item-header">
                <button class="field-drag-handle">
                    <i class="fas fa-grip-vertical"></i>
                </button>
                <span class="field-type">
                    <i class="fas fa-user"></i>
                    Team Member - {{member.firstName}} {{member.lastName}}
                </span>
                <button class="field-remove" ng-click="controller.removeMember(member)">
                    <i class="fas fa-times"></i>
                </button>
            </div>

            <div class="field-content">
                <div class="form-group">
                    <label>Team Member Photo</label>
                    <div class="photo-upload">
                        <div class="current-photo">
                            <img src="/images/sample-team-member.png" alt="Team Member Photo" ng-show="!member.photo || !member.photo.url">
                            <img src="{{member.photo.url}}" alt="Team Member Photo" ng-show="member.photo && member.photo.url">
                        </div>
                        <button disable-animate class="replace-photo" ngf-select="controller.upload($file,member.photo,false,'>=160')" ngf-accept="'image/*'" type="button">
                            <i class="fas fa-user-circle"></i>
                            Replace/Add Photo
                        </button>
                    </div>
                </div>
                <div class="form-group-row">
                    <div class="form-group half-width">
                        <label>First Name</label>
                        <input type="text" ng-model="member.firstname" placeholder="First Name" class="form-input">
                    </div>
                    <div class="form-group half-width">
                        <label>Last Name</label>
                        <input type="text" ng-model="member.lastname" placeholder="Last Name" class="form-input">
                    </div>
                </div>
                <div class="form-group">
                    <label>Job Title</label>
                    <input type="text" ng-model="member.title" placeholder="e.g., CEO, Marketing Manager, Lead Developer" class="form-input">
                </div>
                <div class="form-group">
                    <label>Team Member Description</label>
                    <textarea ng-model="member.description" placeholder="Brief description about this team member's role and expertise" class="form-input" rows="3"></textarea>
                </div>
            </div>
        </div>

        <button class="btn-submit" type="button" ng-click="controller.addMember()">
            <i class="fas fa-plus"></i> Add Team Member
        </button>
    </div>


</div>