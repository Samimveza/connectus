var loginController = /** @class */ (function () {
    function loginController($scope, $parse, toaster, authenticationWebService) {
        this.$parse = $parse;
        this.toaster = toaster;
        this.preloadedData = {};
        this.formName = 'loginForm';
        this.groupName = 'loginForm';
        this.groupNameVerifyOtp = 'verifyOtpForm';
        this.loginModel = {
            email: null,
            password: null,
            otp: null
        };
        this.step = 1;
        this.showPassword = false;
        this.otpResetInteval = 60;
        this.otpTimer = 60;
        this.isResendOtpEnabled = false;
        var self = this;
        $scope.controller = this;
        this.authenticationWebService = authenticationWebService;
        this.scope = $scope;
        this.baseController = this.scope.baseController;
        this.initVariables();
    }
    loginController.prototype.initVariables = function () {
        var self = this;
        this.baseController = this.scope.baseController;
    };
    loginController.prototype.setInfo = function () {
        var self = this;
        self.initialize();
    };
    loginController.prototype.initialize = function () {
        var self = this;
        if (self.formValidator != null) {
            self.formValidator.deRegister();
        }
        self.formValidator = new formValidator(this.$parse, this.toaster, self.scope, self.formName);
        self.formValidator.registerValidationForMandatory(self.scope, 'email', 'Email');
        self.formValidator.registerValidationForMandatory(self.scope, 'password', 'Password');
        self.formValidator.registerValidationForMandatory(self.scope, 'otp', 'OTP');
        self.formValidator.registerGroupValidation(self.groupName, ['email', 'password']);
        self.formValidator.registerGroupValidation(self.groupNameVerifyOtp, ['otp']);
    };
    loginController.prototype.validateForGroups = function (groupName) {
        if (groupName === void 0) { groupName = null; }
        var self = this;
        var groupToValidate = groupName != null ? groupName : self.groupName;
        var isValid = self.formValidator.validateGroup(groupToValidate, false, true);
        var errorMessages = errorMessages = self.formValidator.getAllValidationMessagesForGroup(groupToValidate);
        if (errorMessages.length > 0) {
            self.baseController.toaster.pop({
                type: 'error',
                body: errorMessages.join('</br>'),
                bodyOutputType: 'trustedHtml'
            });
        }
        return isValid;
    };
    loginController.prototype.login = function () {
        var self = this;
        if (!self.validateForGroups()) {
            return;
        }
        self.baseController.showLoading();
        var _loginDto = new loginDto();
        _loginDto.email = self.loginModel.email;
        _loginDto.password = self.loginModel.password;
        self.authenticationWebService.login(_loginDto)
            .then(function (response) {
            if (response.status == STATUS_MESSAGE.SUCCESS) {
                if (response.result.result == true) {
                    var user = new userLoginModel();
                    user.firstname = response.result.firstname;
                    user.lastname = response.result.lastname;
                    user.username = response.result.username;
                    self.baseController.$window.localStorage.setItem(CUSTOM_VARIABLES.AUTHKEY, response.result.token);
                    self.baseController.$window.localStorage.setItem(CUSTOM_VARIABLES.ROLES, angular.toJson(response.result.roles));
                    self.baseController.$window.localStorage.setItem(CUSTOM_VARIABLES.CURRENT_USER, angular.toJson(user));
                    //self.baseController.$window.sessionStorage.setItem(CUSTOM_VARIABLES.PERMISSIONKEY, angular.toJson(response.result.permissions));
                    self.baseController.showToast(TOASTER_TYPE.SUCCESS, "Welcome back! You're now logged in.");
                    window.location.href = "/card-list/";
                }
                else if (response.result.result == false && response.result.requireEmailVerification) {
                    self.baseController.showToast(TOASTER_TYPE.SUCCESS, "Your login details are correct, but we need to verify your email. Please enter the verification code sent to your inbox.");
                    self.step = 2;
                    self.startOtpTimer();
                }
                else {
                    self.baseController.showMessage(response.errorMessage, "Login failed. Please check your email and password, or complete the email verification process if required.", ALERT_MESSAGE_TYPE.ERROR);
                }
            }
            else {
                self.baseController.showMessage(response.errorMessage, "", ALERT_MESSAGE_TYPE.ERROR, false, null, true);
            }
        }).catch(function (errorMsg) {
            self.baseController.showMessage(errorMsg, "We encountered a problem while processing your request. Please try again later or contact support (contact@connectus.mu) if the issue persists.", ALERT_MESSAGE_TYPE.ERROR);
        }).finally(function () {
            self.baseController.hideLoading();
        });
    };
    loginController.prototype.startOtpTimer = function () {
        var self = this;
        self.isResendOtpEnabled = false;
        setTimeout(function () {
            self.otpTimer = self.otpResetInteval;
            document.getElementById("otpTimer").innerHTML = self.formatSecondsToMMSS(self.otpTimer);
            self.isResendOtpEnabled = true;
            clearInterval(self.otpTimerInterval);
            self.scope.$apply();
        }, self.otpResetInteval * 1000);
        self.otpTimerInterval = setInterval(function () {
            document.getElementById("otpTimer").innerHTML = self.formatSecondsToMMSS(self.otpTimer);
            self.otpTimer--;
        }, 1000);
    };
    loginController.prototype.formatSecondsToMMSS = function (totalSeconds) {
        var minutes = (Math.floor(totalSeconds / 60)) + "";
        var seconds = (totalSeconds % 60) + "";
        return (minutes).padStart(2, '0') + ":" + (seconds).padStart(2, '0');
    };
    loginController.prototype.verifyOtp = function () {
        var self = this;
        if (self.step == 2 && !self.validateForGroups(self.groupNameVerifyOtp)) {
            return;
        }
        self.baseController.showLoading();
        var _loginDto = new loginDto();
        _loginDto.email = self.loginModel.email;
        _loginDto.otp = self.loginModel.otp;
        self.authenticationWebService.validateOtp(_loginDto)
            .then(function (response) {
            if (response.status == STATUS_MESSAGE.SUCCESS) {
                if (response.result.result) {
                    self.baseController.showToast(TOASTER_TYPE.SUCCESS, "Otp validated, please login now");
                    self.step = 1;
                }
                else {
                    self.baseController.showToast(TOASTER_TYPE.WARNING, "Otp could not be validated, please try again");
                }
            }
            else {
                self.baseController.showMessage(response.errorMessage, "", ALERT_MESSAGE_TYPE.ERROR);
            }
        }).catch(function (errorMsg) {
            self.baseController.showMessage(errorMsg, "We encountered a problem while processing your request. Please try again later or contact support (contact@connectus.mu) if the issue persists.", ALERT_MESSAGE_TYPE.ERROR);
        }).finally(function () {
            self.baseController.hideLoading();
        });
    };
    loginController.prototype.togglePassword = function () {
        var self = this;
        self.showPassword = !self.showPassword;
    };
    loginController.prototype.resendOtp = function () {
        var self = this;
        console.log('resend');
        var _loginDto = new loginDto();
        _loginDto.email = self.loginModel.email;
        self.baseController.showLoading();
        self.authenticationWebService.resendOtp(_loginDto)
            .then(function (response) {
            if (response.status == STATUS_MESSAGE.SUCCESS) {
                if (response.result.result) {
                    self.baseController.showToast(TOASTER_TYPE.SUCCESS, "A new verification code has been sent to your email. Please check your inbox and enter the code to continue.");
                    self.startOtpTimer();
                }
                else {
                    self.baseController.showToast(TOASTER_TYPE.WARNING, "We couldn’t resend the verification code at this time. Please wait a moment and try again.");
                }
            }
            else {
                self.baseController.showMessage(response.errorMessage, "", ALERT_MESSAGE_TYPE.ERROR);
            }
        }).catch(function (errorMsg) {
            self.baseController.showMessage(errorMsg, "We encountered a problem while processing your request. Please try again later or contact support (contact@connectus.mu) if the issue persists.", ALERT_MESSAGE_TYPE.ERROR);
        }).finally(function () {
            self.baseController.hideLoading();
        });
    };
    return loginController;
}());
authenticationModule.controller("loginController", ["$scope",
    "$parse",
    "toaster",
    "authenticationWebService",
    loginController
]);
