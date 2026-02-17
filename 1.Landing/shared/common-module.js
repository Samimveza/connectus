var commonModule = angular.module("commonModule", []);
commonModule.service("commonWebService", ["genericWebConnectionService",
    "globalVariableFactory",
    commonWebService]);
baseModule.requires.push("commonModule");
