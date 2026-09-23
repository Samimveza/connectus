var integrationModule = angular.module("integrationModule", ['purplefox.numeric', 'ngMap']);
integrationModule.service("integrationWebService", ["genericWebConnectionService",
    "globalVariableFactory",
    integrationWebService]);
baseModule.requires.push("integrationModule");
