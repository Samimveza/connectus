var shopModule = angular.module("shopModule", ['purplefox.numeric', 'ngMap']);

shopModule.service("shopWebService"
    , ["genericWebConnectionService"
        , "globalVariableFactory"
        , shopWebService]);


baseModule.requires.push("shopModule");