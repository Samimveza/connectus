var pagesUrlDirectory: browsingPageModel[] = [

    { pageUrl: "", isAuthRequired: false, permissionCodes: [] },

];

var permissions: permission[] = [
];

enum sessionVariableSpaceEnum {
    SERVICE_PROVIDER_CONTROLLER = 1,
    CLIENT_DETAIL_CONTROLLER = 2,
    BASE_CONTROLLER = 2,
    TRANSFER = 3,
    SEARCH_CONTROLLER = 4,

    PAGE_DETAIL_BASIC_INFO_CONTROLLER = 5,

}

class dayListGenerator {
    static dayList =
        [{ day: 1, name: "Monday" }, { day: 2, name: "Tuesday" }, { day: 3, name: "Wednesday" }, { day: 4, name: "Thursday" }, { day: 5, name: "Friday" }, { day: 6, name: "Saturday" }, { day: 7, name: "Sunday" }];
}
