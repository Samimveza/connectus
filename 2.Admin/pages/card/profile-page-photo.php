<!-- Profile Page Container -->
<div class="profile-container">
    <!-- Left Section -->
    <div class="profile-left">
        <?php include 'profile-page-card.php'; ?>
    </div>

    <!-- Right Section -->
    <div class="profile-right">
        <div class="contact-form-container">
            <h1>Make your card stand out 📸</h1>
            <p>Add a photo of yourself</p>
            
            <div class="photo-upload-section">
                <div class="photo-placeholder">
                    <img src="/images/photo-selection.png" alt="Photo Selection Placeholder">
                </div>
                
                <button disable-animate class="btn-upload" ngf-select="controller.upload($file,controller.cardDetail.profilePicture,false,'>=160')" ngf-accept="'image/*'" type="button">Upload a photo (Optional)</button>

                
                <div class="photo-tips">
                    <p class="tips-header">Photo Tips:</p>
                    <ul>
                        <li>High-quality headshots look the best!</li>
                        <li>You can choose different pictures for each card.</li>
                        <li>You can always change this photo later.</li>
                        <li>Feel free to change your photo anytime through your settings.</li>
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
