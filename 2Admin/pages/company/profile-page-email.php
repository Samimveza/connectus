<!-- Profile Page Container -->
<div class="profile-container">
    <!-- Left Section -->
    <div class="profile-left">
        <?php include 'profile-page-card.php'; ?>
    </div>

    <!-- Right Section -->
    <div class="profile-right">
        <div class="contact-form-container">
            <h1>Let's start with your business</h1>
            <p>Tell us about your company.<br>What is your company name?</p>
            
            <div class="contact-form">
                <div class="form-group">
                    <input type="text" id="companyName" name="companyName" ng-model="controller.cardDetail.companyName" class="form-input" placeholder="Company Name" />
                </div>
                <div class="form-group">
                    <input type="text" id="businessRegistration" name="businessRegistration" ng-model="controller.cardDetail.businessRegistration" class="form-input" placeholder="Business Registration Number (Optional)" />
                </div>

                <div class="form-note">
                    <p>Don't worry, you can modify these details later in your settings.</p>
                </div>

                <button type="button" class="btn-submit" ng-click="controller.onNextClick()">Continue</button>
                <div class="step-indicators">
                    <div class="step-dot active" ng-click="controller.goToStep(1)"></div>
                    <div class="step-dot" ng-click="controller.goToStep(2)"></div>
                    <div class="step-dot" ng-click="controller.goToStep(3)"></div>
                    <div class="step-dot" ng-click="controller.goToStep(4)"></div>
                </div>
            </div>
        </div>
    </div>
</div>
