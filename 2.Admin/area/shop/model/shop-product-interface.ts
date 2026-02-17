interface IChildShopProductDetailController {
    formValidator: formValidator;
    baseController: baseController;
    onDetailLoaded();
    hasProductDetailBeenLoaded: boolean;
    hasScreenDetailBeenLoaded: boolean;
    groupName: string;
    registerValidations();
}

interface IShopProductDetailInformationCaller {
    screenModeManager: screenModeManager<shopProductDetailViewModel, shopProductDetailController>;
    registerShopProductDetailInformationController(shopProductDetailInformationController: shopProductDetailInformationController);
    preloadedData: {

    }

    hasProductDetailBeenLoaded: boolean;
    hasScreenDetailBeenLoaded: boolean;

    formName: string;
    isNew: boolean;
    isEditable: boolean;
}

interface IShopProductDetailAttributesCaller {
    screenModeManager: screenModeManager<shopProductDetailViewModel, shopProductDetailController>;
    registerShopProductDetailAttributesController(shopProductDetailAttributesController: shopProductDetailAttributesController);
    preloadedData: {
        productTypes
    }

    hasProductDetailBeenLoaded: boolean;
    hasScreenDetailBeenLoaded: boolean;

    formName: string;
    isNew: boolean;
    isEditable: boolean;

    productTypes
}

interface IShopProductDetailOptionsCaller {
    screenModeManager: screenModeManager<shopProductDetailViewModel, shopProductDetailController>;
    registerShopProductDetailOptionsController(shopProductDetailOptionsController: shopProductDetailOptionsController);
    preloadedData: {

    }

    hasProductDetailBeenLoaded: boolean;
    hasScreenDetailBeenLoaded: boolean;

    formName: string;
    isNew: boolean;
    isEditable: boolean;
}

interface IShopProductDetailShippingCaller {
    screenModeManager: screenModeManager<shopProductDetailViewModel, shopProductDetailController>;
    registerShopProductDetailShippingController(shopProductDetailShippingController: shopProductDetailShippingController);
    preloadedData: {

    }

    hasProductDetailBeenLoaded: boolean;
    hasScreenDetailBeenLoaded: boolean;

    formName: string;
    isNew: boolean;
    isEditable: boolean;
}
