<!-- Card Detail Page Content -->
<div class="card-detail-page" ng-controller="shopProductDetailController" ng-init="controller.setInfo('<?php echo $_GET['idShop']; ?>', '<?php echo $_GET['idShopProduct']; ?>', '<?php echo $_GET['screenMode']; ?>')">
    <form name="shopProductDetailForm" novalidate>
        <div class="">
            <!-- Tabs Navigation -->
            <div class="detail-tabs">
                <button class="tab-button" ng-click="controller.setCurrentState(controller.shopProductDetailTab.INFORMATION)" ng-class="{'active':controller.currentState == controller.shopProductDetailTab.INFORMATION}">Information</button>

                <button class="tab-button" ng-click="controller.setCurrentState(controller.shopProductDetailTab.ATTRIBUTES)" ng-class="{'active':controller.currentState == controller.shopProductDetailTab.ATTRIBUTES}">Attributes</button>

                <button class="tab-button" ng-click="controller.setCurrentState(controller.shopProductDetailTab.OPTIONS)" ng-class="{'active':controller.currentState == controller.shopProductDetailTab.OPTIONS}">Options</button>

                <button class="tab-button" ng-click="controller.setCurrentState(controller.shopProductDetailTab.SHIPPING)" ng-class="{'active':controller.currentState == controller.shopProductDetailTab.SHIPPING}">Shipping</button>
            </div>

            <!-- Tab Content -->
            <div class="tab-content">

                <!-- Information Tab Content -->
                <div class="tab-pane" id="information" ng-class="{'active':controller.currentState == controller.shopProductDetailTab.INFORMATION}" ng-show="controller.currentState == controller.shopProductDetailTab.INFORMATION">
                    <?php include 'shop/shop-product-detail-information.php'; ?>
                </div>

                <!-- Fields Tab Content -->
                <div class="tab-pane" id="attributes" ng-class="{'active':controller.currentState == controller.shopProductDetailTab.ATTRIBUTES}" ng-show="controller.currentState == controller.shopProductDetailTab.ATTRIBUTES">
                    <?php include 'shop/shop-product-detail-attributes.php'; ?>
                </div>

                <!-- Card Tab Content -->
                <div class="tab-pane" id="options" ng-class="{'active':controller.currentState == controller.shopProductDetailTab.OPTIONS}" ng-show="controller.currentState == controller.shopProductDetailTab.OPTIONS">
                    <?php include 'shop/shop-product-detail-options.php'; ?>
                </div>


                <!-- Other Sections Tab Content -->
                <div class="tab-pane" id="shipping" ng-class="{'active':controller.currentState == controller.shopProductDetailTab.SHIPPING}" ng-show="controller.currentState == controller.shopProductDetailTab.SHIPPING">
                    <?php include 'shop/shop-product-detail-shipping.php'; ?>
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