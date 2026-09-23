interface IChildCardDetailController {
    formValidator: formValidator;
    baseController: baseController;
    onDetailLoaded();
    hasCardDetailBeenLoaded: boolean;
    hasScreenDetailBeenLoaded: boolean;
    groupName: string;
    registerValidations();
}

interface ICardDetailBasicInfoCaller {
    screenModeManager: screenModeManager<cardDetailViewModel, cardDetailController>;
    registerCardDetailBasicInfoController(cardDetailBasicInfoController: cardDetailBasicInfoController);
    preloadedData: {

    }

    hasCardDetailBeenLoaded: boolean;
    hasScreenDetailBeenLoaded: boolean;

    formName: string;
    isNew: boolean;
    isEditable: boolean;
}


interface ICardDetailInformationCaller {
    screenModeManager: screenModeManager<cardDetailViewModel, cardDetailController>;
    registerCardDetailInformationController(cardDetailInformationController: cardDetailInformationController);
    preloadedData: {

    }

    hasCardDetailBeenLoaded: boolean;
    hasScreenDetailBeenLoaded: boolean;

    formName: string;
    isNew: boolean;
    isEditable: boolean;
    titles;

    profileColorVariants;
    structurerCategoriesHiearchy;
}


interface ICardDetailFieldsCaller {
    screenModeManager: screenModeManager<cardDetailViewModel, cardDetailController>;
    registerCardDetailFieldsController(cardDetailFieldsController: cardDetailFieldsController);
    preloadedData: {
        structureFields
    }

    hasCardDetailBeenLoaded: boolean;
    hasScreenDetailBeenLoaded: boolean;

    formName: string;
    isNew: boolean;
    isEditable: boolean;

    groupFieldCategories
}



interface ICardDetailSettingsCaller {
    screenModeManager: screenModeManager<cardDetailViewModel, cardDetailController>;
    registerCardDetailSettingsController(cardDetailSettingsController: cardDetailSettingController);
    preloadedData: {

    }

    hasCardDetailBeenLoaded: boolean;
    hasScreenDetailBeenLoaded: boolean;

    formName: string;
    isNew: boolean;
    isEditable: boolean;
    baseSlugUrl;
}

interface ICardDetailCreationCaller {
    screenModeManager: screenModeManager<cardDetailViewModel, cardDetailController>;
    registerCardDetailCreationController(cardDetailCreationController: cardDetailCreationController);
    preloadedData: {

    }

    hasCardDetailBeenLoaded: boolean;
    hasScreenDetailBeenLoaded: boolean;

    formName: string;
    isNew: boolean;
    isEditable: boolean;
    step;
    cardDetailStepInfo;
    onNextClick;
    goToStep;
}

interface ICardDetailOtherSectionCaller {
    screenModeManager: screenModeManager<cardDetailViewModel, cardDetailController>;
    registerCardDetailOtherSectionController(cardDetailOtherSectionController: cardDetailOtherSectionController);
    preloadedData: {

    }

    
    hasCardDetailBeenLoaded: boolean;
    hasScreenDetailBeenLoaded: boolean;

    formName: string;
    isNew: boolean;
    isEditable: boolean;

}   

interface ICardDetailOpeningHoursCaller {
    screenModeManager: screenModeManager<cardDetailViewModel, cardDetailController>;
    registerCardDetailOpeningHoursController(cardDetailOpeningHoursController: cardDetailOpeningHoursController);
    preloadedData: {

    }

    
    hasCardDetailBeenLoaded: boolean;
    hasScreenDetailBeenLoaded: boolean;

    formName: string;
    isNew: boolean;
    isEditable: boolean;

}

interface ICardDetailMessagesCaller {
    screenModeManager: screenModeManager<cardDetailViewModel, cardDetailController>;
    registerCardDetailMessagesController(cardDetailMessagesController: cardDetailMessagesController);
    preloadedData: {

    }

    
    hasCardDetailBeenLoaded: boolean;
    hasScreenDetailBeenLoaded: boolean;

    formName: string;
    isNew: boolean;
    isEditable: boolean;

}


interface ICardDetailPortfolioCaller {
    screenModeManager: screenModeManager<cardDetailViewModel, cardDetailController>;
    registerCardDetailPortfolioController(cardDetailPortfolioController: cardDetailPortfolioController);
    preloadedData: {

    }

    
    hasCardDetailBeenLoaded: boolean;
    hasScreenDetailBeenLoaded: boolean;

    formName: string;
    isNew: boolean;
    isEditable: boolean;

}

interface ICardDetailEducationCaller {
    screenModeManager: screenModeManager<cardDetailViewModel, cardDetailController>;
    registerCardDetailEducationController(cardDetailEducationController: cardDetailEducationController);
    preloadedData: {

    }

    hasCardDetailBeenLoaded: boolean;
    hasScreenDetailBeenLoaded: boolean;

    formName: string;
    isNew: boolean;
    isEditable: boolean;
}

interface ICardDetailExperienceCaller {
    screenModeManager: screenModeManager<cardDetailViewModel, cardDetailController>;
    registerCardDetailExperienceController(cardDetailExperienceController: cardDetailExperienceController);
    preloadedData: {

    }

    hasCardDetailBeenLoaded: boolean;
    hasScreenDetailBeenLoaded: boolean;

    formName: string;
    isNew: boolean;
    isEditable: boolean;
}