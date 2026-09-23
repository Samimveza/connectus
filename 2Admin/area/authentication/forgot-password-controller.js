var forgotPasswordController = /** @class */ (function () {
    function forgotPasswordController($scope, $parse, toaster, authenticationWebService) {
        this.$parse = $parse;
        this.toaster = toaster;
        this.preloadedData = {};
        this.formName = 'forgotPasswordForm';
        this.groupName = 'forgotPasswordForm';
        this.groupNameVerifyOtp = 'verifyOtpForm';
        this.loginModel = {
            email: null,
            password: null,
            passwordVerify: null,
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
    forgotPasswordController.prototype.initVariables = function () {
        var self = this;
        this.baseController = this.scope.baseController;
    };
    forgotPasswordController.prototype.setInfo = function () {
        var self = this;
        self.initialize();
    };
    forgotPasswordController.prototype.initialize = function () {
        var self = this;
        if (self.formValidator != null) {
            self.formValidator.deRegister();
        }
        self.formValidator = new formValidator(this.$parse, this.toaster, self.scope, self.formName);
        self.formValidator.registerValidationForMandatory(self.scope, 'email', 'Email');
        self.formValidator.registerValidationForMandatory(self.scope, 'password', 'Password');
        self.formValidator.registerValidationForMandatory(self.scope, 'passwordVerify', 'Verify Password');
        self.formValidator.registerValidationForMandatory(self.scope, 'otp', 'OTP');
        self.formValidator.registerValidation('passwordMatch', "The new password and confirmation password do not match. Please re-enter them to proceed.", function () {
            if (self.loginModel.password != self.loginModel.passwordVerify) {
                return false;
            }
            return true;
        });
        self.formValidator.registerGroupValidation(self.groupName, ['email']);
        self.formValidator.registerGroupValidation(self.groupNameVerifyOtp, ['otp', 'password', 'passwordVerify', 'passwordMatch']);
    };
    forgotPasswordController.prototype.validateForGroups = function (groupName) {
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
    forgotPasswordController.prototype.forgotPassword = function () {
        var self = this;
        if (self.step == 1 && !self.validateForGroups(self.groupName)) {
            return;
        }
        self.baseController.showLoading();
        var _loginDto = new loginDto();
        _loginDto.email = self.loginModel.email;
        self.authenticationWebService.forgotPassword(_loginDto)
            .then(function (response) {
            if (response.status == STATUS_MESSAGE.SUCCESS) {
                if (response.result.result) {
                    self.step = 2;
                    self.startOtpTimer();
                    self.baseController.showToast(TOASTER_TYPE.SUCCESS, "A verification code has been sent to your email address. Please enter the code below to reset your password.");
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
    forgotPasswordController.prototype.startOtpTimer = function () {
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
    forgotPasswordController.prototype.formatSecondsToMMSS = function (totalSeconds) {
        var minutes = (Math.floor(totalSeconds / 60)) + "";
        var seconds = (totalSeconds % 60) + "";
        return (minutes).padStart(2, '0') + ":" + (seconds).padStart(2, '0');
    };
    forgotPasswordController.prototype.verifyOtp = function () {
        var self = this;
        if (self.step == 2 && !self.validateForGroups(self.groupNameVerifyOtp)) {
            return;
        }
        self.baseController.showLoading();
        var _loginDto = new loginDto();
        _loginDto.email = self.loginModel.email;
        _loginDto.password = self.loginModel.password;
        _loginDto.otp = self.loginModel.otp;
        self.authenticationWebService.forgotPasswordWithOtp(_loginDto)
            .then(function (response) {
            if (response.status == STATUS_MESSAGE.SUCCESS) {
                if (response.result.result) {
                    self.baseController.showToast(TOASTER_TYPE.SUCCESS, "Your verification code was accepted, and your password has been updated. You can now log in with your new credentials.");
                    window.location.href = "/login";
                }
                else {
                    self.baseController.showToast(TOASTER_TYPE.WARNING, "The verification code you entered is incorrect or expired. Please double-check the code or request a new one.");
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
    forgotPasswordController.prototype.togglePassword = function () {
        var self = this;
        self.showPassword = !self.showPassword;
    };
    forgotPasswordController.prototype.resendOtp = function () {
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
    return forgotPasswordController;
}());
authenticationModule.controller("forgotPasswordController", ["$scope",
    "$parse",
    "toaster",
    "authenticationWebService",
    forgotPasswordController
]);
