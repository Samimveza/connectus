<!-- Login Page -->
<script>
    // Add auth-bg class to body for proper background styling
    document.body.classList.add('auth-bg');
</script>

<div class="login-container" ng-controller="forgotPasswordController" ng-init="controller.setInfo()">
    <div class="login-card">
        <div class="login-header">
            <div class="greeting-text">
                <span class="logo-text"><img src="images/logo-dark.png" alt="logo" class="logo-image"></span>

            </div>
            <h1>Forgot Password</h1>
            <p class="signup-prompt">Don't have an account? <a href="/signup">Sign up</a></p>
        </div>
        <form id="forgotPasswordForm" name="forgotPasswordForm">

            <div class="login-form" ng-show="controller.step == 1">
                <div class="form-group">
                    <label for="email">Enter your email</label>
                    <input type="email" id="email" name="email" placeholder="your@email.com" ng-model="controller.loginModel.email">
                </div>


                <div class="forgot-password-link">
                    <a href="/login" class="inline-link">Already have an account? Login</a>
                </div>

                <button type="submit" class="btn-submit" ng-click="controller.forgotPassword()">Submit</button>


            </div>

            <div class="login-form" ng-show="controller.step == 2">
                <div class="form-group">
                    <label for="otp">OTP</label>
                    <input type="text" id="otp" name="otp" placeholder="Enter OTP sent to your email" ng-model="controller.loginModel.otp">
                </div>

                <div class="otp-timer-container">
                    <div class="otp-timer">
                        <span>Resend OTP in: </span>
                        <span class="countdown-timer" id="otpTimer"></span>
                    </div>
                    <button type="button" class="btn-resend-otp" ng-click="controller.resendOtp()" ng-disabled="!controller.isResendOtpEnabled">Resend OTP</button>
                </div>

                <div class="form-group">
                    <label for="password">Password</label>
                    <div class="password-field">
                        <input type="{{controller.showPassword ? 'text' : 'password'}}" id="password" name="password" ng-model="controller.loginModel.password">
                        <button type="button" class="password-toggle" aria-label="Toggle password visibility" ng-click="controller.togglePassword()">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="eye-icon" ng-if="!controller.showPassword">
                                <path fill="currentColor" d="M12 9a3 3 0 100 6 3 3 0 000-6z" />
                                <path fill="currentColor" d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 12.5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="eye-icon" ng-if="controller.showPassword">
                                <path fill="currentColor" d="M12 6a9.77 9.77 0 018.49 5.07.996.996 0 010 .87c-.9 1.67-2.3 3.1-3.99 4.12l1.42 1.42c2.03-1.26 3.77-3.06 4.92-5.3a1.993 1.993 0 000-1.84C20.07 6.98 16.32 4 12 4c-1.61 0-3.13.38-4.5 1.03l1.53 1.53A7.89 7.89 0 0112 6zm10.19 14.19L3.81 1.81A.996.996 0 102.39 3.22l3.08 3.08C3.24 8.13 1.96 9.92 1.5 12c1.73 4.39 6 7.5 10.5 7.5 2.17 0 4.18-.61 5.91-1.66l2.98 2.98a.996.996 0 101.41-1.41zM12 17c-2.76 0-5-2.24-5-5 0-.87.22-1.68.61-2.4l1.55 1.55A3 3 0 0012 15c.44 0 .86-.1 1.24-.26l1.56 1.56c-.72.39-1.53.61-2.4.61zm-3.89-7.11l4.99 4.99A3.003 3.003 0 008.11 9.89z" />
                            </svg>

                        </button>
                    </div>
                </div>

                <div class="form-group">
                    <label for="passwordVerify">Verify password</label>
                    <div class="password-field">
                        <input type="{{controller.showPassword ? 'text' : 'password'}}" id="passwordVerify" name="passwordVerify" ng-model="controller.loginModel.passwordVerify">
                        <button type="button" class="password-toggle" aria-label="Toggle password visibility" ng-click="controller.togglePassword()">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="eye-icon" ng-if="!controller.showPassword">
                                <path fill="currentColor" d="M12 9a3 3 0 100 6 3 3 0 000-6z" />
                                <path fill="currentColor" d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 12.5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="eye-icon" ng-if="controller.showPassword">
                                <path fill="currentColor" d="M12 6a9.77 9.77 0 018.49 5.07.996.996 0 010 .87c-.9 1.67-2.3 3.1-3.99 4.12l1.42 1.42c2.03-1.26 3.77-3.06 4.92-5.3a1.993 1.993 0 000-1.84C20.07 6.98 16.32 4 12 4c-1.61 0-3.13.38-4.5 1.03l1.53 1.53A7.89 7.89 0 0112 6zm10.19 14.19L3.81 1.81A.996.996 0 102.39 3.22l3.08 3.08C3.24 8.13 1.96 9.92 1.5 12c1.73 4.39 6 7.5 10.5 7.5 2.17 0 4.18-.61 5.91-1.66l2.98 2.98a.996.996 0 101.41-1.41zM12 17c-2.76 0-5-2.24-5-5 0-.87.22-1.68.61-2.4l1.55 1.55A3 3 0 0012 15c.44 0 .86-.1 1.24-.26l1.56 1.56c-.72.39-1.53.61-2.4.61zm-3.89-7.11l4.99 4.99A3.003 3.003 0 008.11 9.89z" />
                            </svg>

                        </button>
                    </div>
                </div>

                <button type="button" class="btn-submit" ng-click="controller.verifyOtp()">Reset Password</button>
            </div>


            <div class="login-help">
                <p>Having trouble logging in?</p>
                <a href="/contact">Contact us</a>
            </div>

            <div class="terms-notice">
                <p>By continuing, you acknowledge that you have read, understood, and agree to our terms and conditions.</p>
            </div>
        </form>

    </div>
</div>