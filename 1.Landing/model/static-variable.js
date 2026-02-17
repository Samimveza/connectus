var pagesUrlDirectory = [
    { pageUrl: "", isAuthRequired: false, permissionCodes: [] },
];
var permissions = [];
var sessionVariableSpaceEnum;
(function (sessionVariableSpaceEnum) {
    sessionVariableSpaceEnum[sessionVariableSpaceEnum["SERVICE_PROVIDER_CONTROLLER"] = 1] = "SERVICE_PROVIDER_CONTROLLER";
    sessionVariableSpaceEnum[sessionVariableSpaceEnum["CLIENT_DETAIL_CONTROLLER"] = 2] = "CLIENT_DETAIL_CONTROLLER";
    sessionVariableSpaceEnum[sessionVariableSpaceEnum["BASE_CONTROLLER"] = 2] = "BASE_CONTROLLER";
    sessionVariableSpaceEnum[sessionVariableSpaceEnum["TRANSFER"] = 3] = "TRANSFER";
    sessionVariableSpaceEnum[sessionVariableSpaceEnum["SEARCH_CONTROLLER"] = 4] = "SEARCH_CONTROLLER";
    sessionVariableSpaceEnum[sessionVariableSpaceEnum["PAGE_DETAIL_BASIC_INFO_CONTROLLER"] = 5] = "PAGE_DETAIL_BASIC_INFO_CONTROLLER";
})(sessionVariableSpaceEnum || (sessionVariableSpaceEnum = {}));
var dayListGenerator = /** @class */ (function () {
    function dayListGenerator() {
    }
    dayListGenerator.dayList = [{ day: 1, name: "Monday" }, { day: 2, name: "Tuesday" }, { day: 3, name: "Wednesday" }, { day: 4, name: "Thursday" }, { day: 5, name: "Friday" }, { day: 6, name: "Saturday" }, { day: 7, name: "Sunday" }];
    return dayListGenerator;
}());
