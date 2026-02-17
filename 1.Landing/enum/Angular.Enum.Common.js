var LOGIN_STATUS;
(function (LOGIN_STATUS) {
    LOGIN_STATUS[LOGIN_STATUS["Success"] = 0] = "Success";
    LOGIN_STATUS[LOGIN_STATUS["LockedOut"] = 1] = "LockedOut";
    LOGIN_STATUS[LOGIN_STATUS["RequiresVerification"] = 2] = "RequiresVerification";
    LOGIN_STATUS[LOGIN_STATUS["Failure"] = 3] = "Failure";
})(LOGIN_STATUS || (LOGIN_STATUS = {}));
