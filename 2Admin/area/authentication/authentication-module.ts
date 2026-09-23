var authenticationModule = angular.module("authenticationModule", ['purplefox.numeric']);

authenticationModule.service("authenticationWebService"
    , ["genericWebConnectionService"
        , "globalVariableFactory"
        , authenticationWebService]);


baseModule.requires.push("authenticationModule");