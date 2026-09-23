<!-- Profile Page Container -->
<div class="profile-container">
    <!-- Left Section -->
    <div class="profile-left">
        <?php include 'profile-page-card.php'; ?>
    </div>

    <!-- Right Section -->
    <div class="profile-right">
        <div class="contact-form-container">
            <h1>Almost done!</h1>
            <p>How can people reach you?</p>

            <div class="contact-form">
                <div class="form-group">
                    <input type="text" id="email" name="email" ng-model="controller.cardDetail.email" class="form-input" placeholder="Email (Optional)" />
                </div>
                <div class="form-group">
                    <div class="phone-input-group">
                        <input type="tel" id="phone" name="phone" ng-model="controller.cardDetail.mainPhoneNumber" class="form-input" placeholder="Phone (Optional)" />
                    </div>
                </div>
                <div class="form-note">
                    <p></p>
                </div>
                <p class="privacy-note">ConnectUs will never share your information without your authorisation. <br/> Feel free to update your contact information anytime through your settings.</p>
                <button type="button" class="btn-submit" ng-click="controller.onNextClick()">Done</button>
                <div class="step-indicators">
                    <div class="step-dot" ng-click="controller.goToStep(1)"></div>
                    <div class="step-dot" ng-click="controller.goToStep(2)"></div>
                    <div class="step-dot" ng-click="controller.goToStep(3)"></div>
                    <div class="step-dot active" ng-click="controller.goToStep(4)"></div>
                </div>
            </div>
        </div>
    </div>
</div>