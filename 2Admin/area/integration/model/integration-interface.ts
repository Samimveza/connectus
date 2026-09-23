interface IChildIntegrationDetailController {
    formValidator: formValidator;
    baseController: baseController;
    onDetailLoaded();
    hasIntegrationDetailBeenLoaded: boolean;
    hasScreenDetailBeenLoaded: boolean;
    groupName: string;
    registerValidations();
}

interface IIntegrationDetailBasicInfoCaller {
    screenModeManager: screenModeManager<integrationDetailViewModel, integrationDetailController>;
    registerIntegrationDetailBasicInfoController(integrationDetailBasicInfoController: integrationDetailBasicInfoController);
    preloadedData: {

    }

    hasIntegrationDetailBeenLoaded: boolean;
    hasScreenDetailBeenLoaded: boolean;

    formName: string;
    isNew: boolean;
    isEditable: boolean;
}
