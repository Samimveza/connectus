class authenticationWebService {
    genericWebConnectionService: genericWebConnectionService;
    globalVariableFactory: globalVariableFactory;

    constructor(genericWebConnectionService, globalVariableFactory) {
        this.genericWebConnectionService = genericWebConnectionService;
        this.globalVariableFactory = globalVariableFactory;
    }

    public login(loginDto: loginDto): ng.IPromise<baseResultReturnType<loginReturnType>> {
        var url = '/api/authenticate';
        var data = loginDto;
        return this.genericWebConnectionService.postRequest(url, data);
    }

    public validateOtp(otpDto: otpDto): ng.IPromise<baseResultReturnType<otpReturnType>> {
        var url = '/api/validate-otp';
        var data = otpDto;
        return this.genericWebConnectionService.postRequest(url, data);
    }

    public resendOtp(otpDto: otpDto): ng.IPromise<baseResultReturnType<otpReturnType>> {
        var url = '/api/resend-otp';
        var data = otpDto;
        return this.genericWebConnectionService.postRequest(url, data);
    }

    public register(loginDto: loginDto): ng.IPromise<baseResultReturnType<registerReturnType>> {
        var url = '/api/register';
        var data = loginDto;
        return this.genericWebConnectionService.postRequest(url, data);
    }


    public forgotPassword(loginDto: loginDto): ng.IPromise<baseResultReturnType<registerReturnType>> {
        var url = '/api/forgot-password';
        var data = loginDto;
        return this.genericWebConnectionService.postRequest(url, data);
    }


    public forgotPasswordWithOtp(loginDto: loginDto): ng.IPromise<baseResultReturnType<registerReturnType>> {
        var url = '/api/forgot-password-with-otp';
        var data = loginDto;
        return this.genericWebConnectionService.postRequest(url, data);
    }
} 