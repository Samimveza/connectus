<!-- Card Detail Page Content -->
<div class="card-detail-page" ng-controller="cardDetailController" ng-init="controller.setInfo('<?php echo $_GET['idCard']; ?>', '<?php echo $_GET['screenMode']; ?>',controller.structureTypeEnum.LEGAL_ENTITY)">
    <form name="cardDetailForm" novalidate>
        <div class="card-step-container" ng-controller="cardDetailCreationController">
            <div class="card-step-1" ng-show="controller.step == controller.cardDetailStepInfo.EMAIL">
                <?php include 'company/profile-page-email.php'; ?>
            </div>

            <div class="card-step-2" ng-show="controller.step == controller.cardDetailStepInfo.COMPANY">
                <?php include 'company/profile-page-company.php'; ?>
            </div>

            <div class="card-step-3" ng-show="controller.step == controller.cardDetailStepInfo.PHOTO">
                <?php include 'company/profile-page-photo.php'; ?>
            </div>

            <div class="card-step-4" ng-show="controller.step == controller.cardDetailStepInfo.PHONE">
                <?php include 'company/profile-page-phone.php'; ?>
            </div>
        </div>

        <div class="card-step-5" ng-show="controller.step == controller.cardDetailStepInfo.EDIT">
            <!-- Tabs Navigation -->
            <div class="detail-tabs">
                <button class="tab-button" ng-click="controller.setCurrentState(controller.cardDetailTab.INFORMATION)" ng-class="{'active':controller.currentState == controller.cardDetailTab.INFORMATION}">Information</button>

                <button class="tab-button" ng-click="controller.setCurrentState(controller.cardDetailTab.OTHER_SECTIONS)" ng-class="{'active':controller.currentState == controller.cardDetailTab.OTHER_SECTIONS}">Gallery</button>

                <button class="tab-button" ng-click="controller.setCurrentState(controller.cardDetailTab.MESSAGES)" ng-class="{'active':controller.currentState == controller.cardDetailTab.MESSAGES}">Messages</button>

                <button class="tab-button" ng-click="controller.setCurrentState(controller.cardDetailTab.OPENING_HOURS)" ng-class="{'active':controller.currentState == controller.cardDetailTab.OPENING_HOURS}">Opening Hours</button>

                <button class="tab-button" ng-click="controller.setCurrentState(controller.cardDetailTab.PORTFOLIO)" ng-class="{'active':controller.currentState == controller.cardDetailTab.PORTFOLIO}">Product/Services</button>

                <button class="tab-button" ng-click="controller.setCurrentState(controller.cardDetailTab.FIELDS)" ng-class="{'active':controller.currentState == controller.cardDetailTab.FIELDS}">Fields</button>

                <button class="tab-button" ng-click="controller.setCurrentState(controller.cardDetailTab.SETTINGS)" ng-class="{'active':controller.currentState == controller.cardDetailTab.SETTINGS}">Card</button>
            </div>

            <!-- Tab Content -->
            <div class="tab-content">

                <!-- Information Tab Content -->
                <div class="tab-pane" id="information" ng-class="{'active':controller.currentState == controller.cardDetailTab.INFORMATION}" ng-show="controller.currentState == controller.cardDetailTab.INFORMATION">
                    <?php include 'company/card-detail-information.php'; ?>
                </div>

                <!-- Fields Tab Content -->
                <div class="tab-pane" id="fields" ng-class="{'active':controller.currentState == controller.cardDetailTab.FIELDS}" ng-show="controller.currentState == controller.cardDetailTab.FIELDS">
                    <?php include 'company/card-detail-fields.php'; ?>
                </div>

                <!-- Card Tab Content -->
                <div class="tab-pane" id="card" ng-class="{'active':controller.currentState == controller.cardDetailTab.SETTINGS}" ng-show="controller.currentState == controller.cardDetailTab.SETTINGS">
                    <?php include 'company/card-detail-settings.php'; ?>
                </div>


                <!-- Other Sections Tab Content -->
                <div class="tab-pane" id="other-sections" ng-class="{'active':controller.currentState == controller.cardDetailTab.OTHER_SECTIONS}" ng-show="controller.currentState == controller.cardDetailTab.OTHER_SECTIONS">
                    <?php include 'company/card-detail-other-section.php'; ?>
                </div>

                <!-- Messages Tab Content -->
                <div class="tab-pane" id="messages" ng-class="{'active':controller.currentState == controller.cardDetailTab.MESSAGES}" ng-show="controller.currentState == controller.cardDetailTab.MESSAGES">
                    <?php include 'company/card-detail-messages.php'; ?>
                </div>

                <!-- Opening Hours Tab Content -->
                <div class="tab-pane" id="opening-hours" ng-class="{'active':controller.currentState == controller.cardDetailTab.OPENING_HOURS}" ng-show="controller.currentState == controller.cardDetailTab.OPENING_HOURS">
                    <?php include 'company/card-detail-opening-hours.php'; ?>
                </div>

                <!-- Portfolio Tab Content -->
                <div class="tab-pane" id="portfolio" ng-class="{'active':controller.currentState == controller.cardDetailTab.PORTFOLIO}" ng-show="controller.currentState == controller.cardDetailTab.PORTFOLIO">
                    <?php include 'company/card-detail-portfolio.php'; ?>
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