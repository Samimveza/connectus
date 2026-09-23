<!-- Profile Page Container -->
<div class="profile-container">
    <!-- Left Section -->
    <div class="profile-left">
        <?php include 'profile-page-card.php'; ?>
    </div>

    <!-- Right Section -->
    <div class="profile-right">
        <div class="contact-form-container">
            <h1>Let’s start with the basics</h1>
            <p>Tell us a bit about yourself.<br>What is your name?</p>
            
            <div class="contact-form">
                <div class="form-group">
                    <input type="text" id="firstname" name="firstname" ng-model="controller.cardDetail.firstname" class="form-input" placeholder="First Name" />
                </div>
                <div class="form-group">
                    <input type="text" id="lastname" name="lastname" ng-model="controller.cardDetail.lastname" class="form-input" placeholder="Last Name" />
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
