var pagesUrlDirectory: browsingPageModel[] = [

    { pageUrl: "", isAuthRequired: false, permissionCodes: [] },

];

var permissions: permission[] = [
];

enum sessionVariableSpaceEnum {
    CALLER_CONTROLLER = 1,
    TRANSFER = 2
}

class dayListGenerator {
    static dayList =
        [{ day: 1, name: "Monday" }, { day: 2, name: "Tuesday" }, { day: 3, name: "Wednesday" }, { day: 4, name: "Thursday" }, { day: 5, name: "Friday" }, { day: 6, name: "Saturday" }, { day: 7, name: "Sunday" }];
}
