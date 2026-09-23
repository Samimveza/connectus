var authenticationWebService = /** @class */ (function () {
    function authenticationWebService(genericWebConnectionService, globalVariableFactory) {
        this.genericWebConnectionService = genericWebConnectionService;
        this.globalVariableFactory = globalVariableFactory;
    }
    authenticationWebService.prototype.login = function (loginDto) {
        var url = '/api/authenticate';
        var data = loginDto;
        return this.genericWebConnectionService.postRequest(url, data);
    };
    authenticationWebService.prototype.validateOtp = function (otpDto) {
        var url = '/api/validate-otp';
        var data = otpDto;
        return this.genericWebConnectionService.postRequest(url, data);
    };
    authenticationWebService.prototype.resendOtp = function (otpDto) {
        var url = '/api/resend-otp';
        var data = otpDto;
        return this.genericWebConnectionService.postRequest(url, data);
    };
    authenticationWebService.prototype.register = function (loginDto) {
        var url = '/api/register';
        var data = loginDto;
        return this.genericWebConnectionService.postRequest(url, data);
    };
    authenticationWebService.prototype.forgotPassword = function (loginDto) {
        var url = '/api/forgot-password';
        var data = loginDto;
        return this.genericWebConnectionService.postRequest(url, data);
    };
    authenticationWebService.prototype.forgotPasswordWithOtp = function (loginDto) {
        var url = '/api/forgot-password-with-otp';
        var data = loginDto;
        return this.genericWebConnectionService.postRequest(url, data);
    };
    return authenticationWebService;
}());
