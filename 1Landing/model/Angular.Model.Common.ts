class ValidationResult {
    public errorMessages: string[];
    public field: string;
}

class sortingPagingInfoModel {
    constructor(sortField: string = null, pageSize: number = 0, pageCount: number = 0, currentPageIndex: number = 0, search: string = "", sortByDesc: boolean = false) {
        this.sortByDesc = sortByDesc;
        this.sortField = sortField;
        this.pageSize = pageSize;
        this.pageCount = pageCount;
        this.currentPageIndex = currentPageIndex;
        this.search = search;
    }
    public sortField: string
    public sortColumn: string
    public sortByDesc: boolean
    public pageSize: number
    public pageCount: number
    public currentPageIndex: number
    public search: string;
}

enum ROLE {
    Site_Admin = 1,
    Meridian_User = 2,
    System = 3
}

class fileUploadStateModel {
    id: string;
    isUploaded: boolean;
}

class browsingPageModel {
    pageUrl: string;
    isAuthRequired: boolean;
    permissionCodes: string[];
}

class controllerInstanceDetail {
    controllerName: string;
    instance: any;
}

class controllerInstanceListenerDetail {
    controllerName: string;
    listenerFunctions: controllerInstanceListenerFunctionDetail[];
}

class controllerInstanceListenerFunctionDetail {
    function: Function;
    callerInstance: any
}

class dropZoneInstanceModel {
    name: string;
    currentFileName: string;
    dzCallbacks: dropZoneInstanceCallbackModel;
    dzMethods: { removeAllFiles?: Function };
    dzOptions: {
        url: string,
        maxFiles: number,
        paramName: string,
        maxFilesize: string,
        acceptedFiles: string
    };
}

class dropZoneInstanceCallbackModel {
    addedfile: Function;
    success: Function;
    complete: Function;
}

interface dropZoneInterface {
    [key: string]: dropZoneInstanceModel;
}


class fileUploadReturnType {
    idDocument: string;
    name: string;
    url: string;
}