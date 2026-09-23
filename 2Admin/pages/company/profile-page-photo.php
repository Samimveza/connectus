<!-- Profile Page Container -->
<div class="profile-container">
    <!-- Left Section -->
    <div class="profile-left">
        <?php include 'profile-page-card.php'; ?>
    </div>

    <!-- Right Section -->
    <div class="profile-right">
        <div class="contact-form-container">
            <h1>Add your company logo </h1>
            <p>Upload your company logo to make your business card stand out</p>
            
            <div class="photo-upload-section">
                <div class="photo-placeholder">
                    <img src="/images/company-logo-selection.png" alt="Logo Selection Placeholder">
                </div>
                
                <button disable-animate class="btn-upload" ngf-select="controller.upload($file,controller.cardDetail.companyLogo,false,'>=160')" ngf-accept="'image/*'" type="button">Upload Company Logo (Optional)</button>

                
                <div class="photo-tips">
                    <p class="tips-header">Logo Tips:</p>
                    <ul>
                        <li>High-resolution logos work best!</li>
                        <li>Square or rectangular logos are recommended.</li>
                        <li>PNG format with transparent background is ideal.</li>
                        <li>You can always change your logo later in settings.</li>
                    </ul>
                </div>

                <button type="button" class="btn-continue" ng-click="controller.onNextClick()">Continue</button>
                <button type="button" class="btn-skip" ng-click="controller.onNextClick()">Skip</button>
                
                <div class="step-indicators">
                    <div class="step-dot" ng-click="controller.goToStep(1)"></div>
                    <div class="step-dot" ng-click="controller.goToStep(2)"></div>
                    <div class="step-dot active" ng-click="controller.goToStep(3)"></div>
                    <div class="step-dot" ng-click="controller.goToStep(4)"></div>
                </div>
            </div>
        </div>
    </div>
</div>
