<!-- Card Detail Page Content -->
<div class="card-detail-page" ng-controller="cardDetailController" ng-init="controller.setInfo('<?php echo $_GET['idCard']; ?>', '<?php echo $_GET['screenMode']; ?>', controller.structureTypeEnum.INDIVIDUAL)">

    <form name="cardDetailForm" novalidate>
        <div class="card-step-container" ng-controller="cardDetailCreationController">
            <div class="card-step-1" ng-show="controller.step == controller.cardDetailStepInfo.EMAIL">
                <?php include 'card/profile-page-email.php'; ?>
            </div>

            <div class="card-step-2" ng-show="controller.step == controller.cardDetailStepInfo.COMPANY">
                <?php include 'card/profile-page-company.php'; ?>
            </div>

            <div class="card-step-3" ng-show="controller.step == controller.cardDetailStepInfo.PHOTO">
                <?php include 'card/profile-page-photo.php'; ?>
            </div>

            <div class="card-step-4" ng-show="controller.step == controller.cardDetailStepInfo.PHONE">
                <?php include 'card/profile-page-phone.php'; ?>
            </div>
        </div>

        <div class="card-step-5" ng-show="controller.step == controller.cardDetailStepInfo.EDIT">
            <!-- Tabs Navigation -->
            <div class="detail-tabs">
                <button class="tab-button" ng-click="controller.setCurrentState(controller.cardDetailTab.INFORMATION)" ng-class="{'active':controller.currentState == controller.cardDetailTab.INFORMATION}">Information</button>
                <button class="tab-button" ng-click="controller.setCurrentState(controller.cardDetailTab.EDUCATION)" ng-class="{'active':controller.currentState == controller.cardDetailTab.EDUCATION}">Education</button>
                <button class="tab-button" ng-click="controller.setCurrentState(controller.cardDetailTab.EXPERIENCE)" ng-class="{'active':controller.currentState == controller.cardDetailTab.EXPERIENCE}">Experience</button>
                <button class="tab-button" ng-click="controller.setCurrentState(controller.cardDetailTab.FIELDS)" ng-class="{'active':controller.currentState == controller.cardDetailTab.FIELDS}">Fields</button>
                <button class="tab-button" ng-click="controller.setCurrentState(controller.cardDetailTab.PORTFOLIO)" ng-class="{'active':controller.currentState == controller.cardDetailTab.PORTFOLIO}">Portfolio</button>
                <button class="tab-button" ng-click="controller.setCurrentState(controller.cardDetailTab.SETTINGS)" ng-class="{'active':controller.currentState == controller.cardDetailTab.SETTINGS}">Card</button>
    
            </div>

            <!-- Tab Content -->
            <div class="tab-content">

                <!-- Information Tab Content -->
                <div class="tab-pane" id="information" ng-class="{'active':controller.currentState == controller.cardDetailTab.INFORMATION}" ng-show="controller.currentState == controller.cardDetailTab.INFORMATION">
                    <?php include 'card/card-detail-information.php'; ?>
                </div>

                <!-- Education Tab Content -->
                <div class="tab-pane" id="education" ng-class="{'active':controller.currentState == controller.cardDetailTab.EDUCATION}" ng-show="controller.currentState == controller.cardDetailTab.EDUCATION">
                    <?php include 'card/card-detail-education.php'; ?>
                </div>

                <!-- Experience Tab Content -->
                <div class="tab-pane" id="experience" ng-class="{'active':controller.currentState == controller.cardDetailTab.EXPERIENCE}" ng-show="controller.currentState == controller.cardDetailTab.EXPERIENCE">
                    <?php include 'card/card-detail-experience.php'; ?>
                </div>

                <!-- Fields Tab Content -->
                <div class="tab-pane" id="fields" ng-class="{'active':controller.currentState == controller.cardDetailTab.FIELDS}" ng-show="controller.currentState == controller.cardDetailTab.FIELDS">
                    <?php include 'card/card-detail-fields.php'; ?>
                </div>

                <!-- Portfolio Tab Content -->
                <div class="tab-pane" id="portfolio" ng-class="{'active':controller.currentState == controller.cardDetailTab.PORTFOLIO}" ng-show="controller.currentState == controller.cardDetailTab.PORTFOLIO">
                    <?php include 'card/card-detail-portfolio.php'; ?>
                </div>


                <!-- Card Tab Content -->
                <div class="tab-pane" id="card" ng-class="{'active':controller.currentState == controller.cardDetailTab.SETTINGS}" ng-show="controller.currentState == controller.cardDetailTab.SETTINGS">
                    <?php include 'card/card-detail-settings.php'; ?>
                </div>
            </div>

            <!-- Sticky Footer -->
            <div class="detail-footer">
                <button class="btn-cancel" ng-click="controller.screenModeManager.cancel()">Discard Changes</button>
                <button class="btn-save" ng-click="controller.screenModeManager.save()">Save Changes</button>
            </div>
        </div>
    </form>
</div>