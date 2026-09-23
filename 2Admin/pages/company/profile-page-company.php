<!-- Profile Page Container -->
<div class="profile-container">
    <!-- Left Section -->
    <div class="profile-left">
        <?php include 'profile-page-card.php'; ?>
    </div>

    <!-- Right Section -->
    <div class="profile-right">
        <div class="contact-form-container">
            <h1>Tell us about your business</h1>
            <p>What type of business do you operate and in which industry?</p>
            
            <div class="contact-form">
                <div class="form-group">
                    <input type="text" id="businessType" name="businessType" ng-model="controller.cardDetail.headline" class="form-input" placeholder="Company Headline/Tagline" />
                </div>
                <div class="form-group">
                    <input type="text" id="industry" name="industry" ng-model="controller.cardDetail.industry" class="form-input" placeholder="Industry (e.g., Technology, Healthcare, Finance)" />
                </div>
                <div class="form-note">
                    <p>You can always update this information later in the settings menu.</p>
                </div>
                <button type="button" class="btn-submit" ng-click="controller.onNextClick()">Continue</button>
                <div class="step-indicators">
                    <div class="step-dot" ng-click="controller.goToStep(1)"></div>
                    <div class="step-dot active" ng-click="controller.goToStep(2)"></div>
                    <div class="step-dot" ng-click="controller.goToStep(3)"></div>
                    <div class="step-dot" ng-click="controller.goToStep(4)"></div>
                </div>
            </div>
        </div>
    </div>
</div>
