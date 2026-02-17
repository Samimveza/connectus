var pagesUrlDirectory = [
    { pageUrl: "", isAuthRequired: false, permissionCodes: [] },
];
var permissions = [];
var sessionVariableSpaceEnum;
(function (sessionVariableSpaceEnum) {
    sessionVariableSpaceEnum[sessionVariableSpaceEnum["CALLER_CONTROLLER"] = 1] = "CALLER_CONTROLLER";
    sessionVariableSpaceEnum[sessionVariableSpaceEnum["TRANSFER"] = 2] = "TRANSFER";
})(sessionVariableSpaceEnum || (sessionVariableSpaceEnum = {}));
var dayListGenerator = /** @class */ (function () {
    function dayListGenerator() {
    }
    dayListGenerator.dayList = [{ day: 1, name: "Monday" }, { day: 2, name: "Tuesday" }, { day: 3, name: "Wednesday" }, { day: 4, name: "Thursday" }, { day: 5, name: "Friday" }, { day: 6, name: "Saturday" }, { day: 7, name: "Sunday" }];
    return dayListGenerator;
}());
