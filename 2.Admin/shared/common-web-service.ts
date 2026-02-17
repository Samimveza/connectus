class commonWebService {
    genericWebConnectionService: genericWebConnectionService;
    globalVariableFactory: globalVariableFactory;

    constructor(genericWebConnectionService, globalVariableFactory) {
        this.genericWebConnectionService = genericWebConnectionService;
        this.globalVariableFactory = globalVariableFactory;
    }
}