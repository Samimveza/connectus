using Azure.Core;
using Azure;
using Business.Dto.Response;
using Business.Interfaces;
using Data.Identity;
using Microsoft.AspNetCore.Identity;
using Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Business.Dto.Request;
using Business.Common;
using Business.Dto;
using Business.ReturnType;
using System.Linq.Expressions;
using Data.Interfaces;
using Business.Model;
using System.Data;
using System.Globalization;
using Data.Source;
using Microsoft.AspNetCore.WebUtilities;
using System.Text.Encodings.Web;
using System.Web;
using Microsoft.Extensions.Configuration;
using Business.Enums;
using Service.Mail;
using Service.Extension;
using Business.Dto.Request.Integration;
using Service.Common;
using static Business.Enums.Constants;

namespace Service.Authentication
{
    public class AuthenticationService : Service.Interfaces.IAuthenticationService
    {
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly UrlEncoder _urlEncoder;
        private readonly IGlobalDataService _globalDataService;

        private readonly ITokenClaimsService _tokenClaimsService;
        public IUnitOfWork _unitOfWork;

        private readonly IConfiguration _configuration;
        private readonly IMailService _mailService;
        private readonly IIntegrationService _integrationService;

        private const string AuthenticatorUriFormat = "otpauth://totp/{0}:{1}?secret={2}&issuer={0}&digits=6";
        private const string EmailValidationFormat = "{0}/validate-email?code={1}&email={2}&domain={3}";

        public AuthenticationService(SignInManager<ApplicationUser> signInManager
            , ITokenClaimsService tokenClaimsService
            , UrlEncoder urlEncoder
            , IUnitOfWork unitOfWork
            , UserManager<ApplicationUser> userManager
            , IConfiguration configuration
            , IMailService mailService
            , IIntegrationService integrationService
            , IGlobalDataService globalDataService
            )
        {
            _signInManager = signInManager;
            _tokenClaimsService = tokenClaimsService;
            _urlEncoder = urlEncoder;
            _unitOfWork = unitOfWork;
            _userManager = userManager;
            _configuration = configuration;
            _mailService = mailService;
            _integrationService = integrationService;
            _globalDataService = globalDataService;
        }


        public async Task<BusinessResponse<AuthenticateResponse>> AuthenticateAsync(AuthenticateRequest request)
        {
            BusinessResponse<AuthenticateResponse> response = new BusinessResponse<AuthenticateResponse>();
            try
            {
                response.Result = await AuthenticateAsyncRaw(request);
            }
            catch (Exception ex)
            {
                response.Exception = new BusinessLayerException(ex.Message, ex);
            }

            return response;
        }

        public async Task<AuthenticateResponse> AuthenticateAsyncRaw(AuthenticateRequest request)
        {
            AuthenticateResponse response = new AuthenticateResponse();

            var idTenant = _globalDataService.GetVariable<string>(ApplicationConstant.IDTENANT);

            //get user by tenant
            Tenant tenant = _unitOfWork.TenantDao.GetCustom(t => t.IdTenant == idTenant);
            string usernameWithTenant = tenant.TenantCode + "-" + request.Email;

            ApplicationUser applicationUser = await FindApplicationUserByUsername(usernameWithTenant, tenant.Domain);
            AspNetUser aspNetUser = _unitOfWork.AspNetUserDao.GetCustom(u => u.IdTenantNavigation.Domain == tenant.Domain && u.UserName == usernameWithTenant, new List<string>() { "IdPersonNavigation", "Roles" });

            if (applicationUser == null || applicationUser == null)
                throw new Exception("The login details provided do not match any registered account. Please click <a href='/signup'>here</a> to create a new account.");

            var result = await _signInManager.PasswordSignInAsync(applicationUser, request.Password, false, true);

            if (result.IsLockedOut)
            {
                throw new Exception("Your account has been temporarily locked due to multiple failed login attempts. Please wait a few minutes before trying again.");
            }

            if (result.IsNotAllowed)
            {
                Dictionary<string, string> replace = new Dictionary<string, string>() {
                    { "##Link##",aspNetUser.ValidationCode},
                    { "##Tenant_Name##",tenant.Name},
                    { "##Logo_Url##",String.Format("https://cdn.connectus.mu/DirectFiles/{0}.png",tenant.Domain)}
                };

                SendMailRequest sendMailRequest = new SendMailRequest()
                {
                    To = new List<string>() { request.Email },
                    EmailTemplateParameter = Constants.ParameterConstant.EMAIL_OTP_VERIFICATION_TEMPLATE,
                    Replacements = replace,
                    SubjectParameter = Constants.ParameterConstant.EMAIL_OTP_VERIFICATION_TEMPLATE_SUBJECT,
                };

                BusinessResponse<SendMailResponse> mailResponse = _mailService.SendMail(sendMailRequest);
                if (mailResponse.HasException())
                {
                    throw new Exception("Unable to login at this time, Please try again in a few minutes");
                }

                response.RequireEmailVerification = true;
                response.Result = false;
                return response;
            }

            response.IsLockedOut = result.IsNotAllowed;
            response.IsNotAllowed = result.IsNotAllowed;
            response.RequiresTwoFactor = result.RequiresTwoFactor;
            response.Username = request.Email;

            if (!result.Succeeded)
            {
                throw new Exception("The username or password entered is incorrect. Please try again.");
            }

            //var validVerification = await _userManager.VerifyTwoFactorTokenAsync(applicationUser, _userManager.Options.Tokens.AuthenticatorTokenProvider, request.TwoFactorAuthCode);
            //if (!validVerification)
            //{
            //    throw new Exception("Two factor incorrect");
            //}

            List<string> roles = aspNetUser.Roles.Select(x => x.NormalizedName).ToList();

            response.Token = await _tokenClaimsService.GetTokenAsync(usernameWithTenant);
            response.Firstname = aspNetUser.IdPersonNavigation.Firstname;
            response.Lastname = aspNetUser.IdPersonNavigation.Lastname;
            response.Roles = aspNetUser.Roles.Select(x => x.NormalizedName).ToList();

            response.Result = true;

            if (request.AuthenticationType == "SHOP_OWNER")
            {
                var structure = _unitOfWork.StructureDao.GetListCustom<string>(-1, 0, s => s.IdTenant == idTenant && s.IdShop != null && s.UserStructures.Any(us => us.IdUser == aspNetUser.Id),
                                         s => s.IdStructure,
                                         new List<string> { })
                      .EntityList.FirstOrDefault();
                response.IdStructure = structure?.IdStructure;
            }

            return response;
        }

        public async Task<BusinessResponse<RegistrationResponse>> RegisterAsync(RegistrationRequest request)
        {
            BusinessResponse<RegistrationResponse> response = new BusinessResponse<RegistrationResponse>();
            try
            {
                response.Result = await RegisterAsyncRaw(request);
            }
            catch (UserAlreadyExistBusinessLayerException ex)
            {
                response.Exception = new BusinessLayerException(ex.Message, ex);
            }
            catch (Exception ex)
            {
                var idTenant = _globalDataService.GetVariable<string>(ApplicationConstant.IDTENANT);
                Tenant tenant = _unitOfWork.TenantDao.GetCustom(t => t.IdTenant == idTenant);

                string usernameWithTenant = tenant.TenantCode + "-" + request.Email;

                await RevertUserCreation(usernameWithTenant, tenant.Domain);
                response.Exception = new BusinessLayerException(ex.Message, ex);
            }

            return response;
        }

        public async Task<RegistrationResponse> RegisterAsyncRaw(RegistrationRequest request)
        {
            RegistrationResponse response = new RegistrationResponse();

            var idTenant = _globalDataService.GetVariable<string>(ApplicationConstant.IDTENANT);
            Tenant tenant = _unitOfWork.TenantDao.GetCustom(t => t.IdTenant == idTenant);

            string usernameWithTenant = tenant.TenantCode + "-" + request.Email;

            var alreadyPresentIdentityUser = await FindApplicationUserByUsername(usernameWithTenant, tenant.Domain);

            if (alreadyPresentIdentityUser != null)
                throw new UserAlreadyExistBusinessLayerException(String.Format("An account with the email address {0} already exists. Please log in or use the password recovery option if needed.", request.Email));

            var identityUser = new ApplicationUser { UserName = usernameWithTenant, Email = request.Email, EmailConfirmed = false, TwoFactorEnabled = false };

            var userCreationResult = await _userManager.CreateAsync(identityUser, request.Password);
            if (!userCreationResult.Succeeded)
            {
                string errors = string.Format(CultureInfo.InvariantCulture, "{0} : {1}", "Failed", string.Join(",", userCreationResult.Errors.Select(x => x.Description).ToList()));
                Exception exception = new BusinessLayerException(errors);
                throw exception;
            }

            var roleCreationResult = await _userManager.AddToRoleAsync(identityUser, "NORMAL");

            if (!roleCreationResult.Succeeded)
            {
                string errors = string.Format(CultureInfo.InvariantCulture, "{0} : {1}", "Failed", string.Join(",", roleCreationResult.Errors.Select(x => x.Description).ToList()));

                Exception exception = new BusinessLayerException(errors);
                throw exception;
            }

            //add user to tenant + add person
            AspNetUser aspNetUser = _unitOfWork.AspNetUserDao.GetCustom(t => t.Id == identityUser.Id);
            aspNetUser.IdTenant = idTenant;
            aspNetUser.IdPersonNavigation = new Person()
            {
                IdTenant = idTenant,
                Firstname = request.FirstName,
                Lastname = request.LastName
            };

            var random = new Random();
            var emailCode = random.Next(100000, 999999).ToString();
            aspNetUser.ValidationCode = emailCode;

            aspNetUser.UserType = request.RegistationType;



            Structure structure = new Structure();
            structure.IdTenant = idTenant;
            structure.DateCreated = DateTime.UtcNow;
            structure.SystemSlug = _unitOfWork.StructureDao.GenerateUniqueSystemSlug();
            structure.UserStructures.Add(new UserStructure
            {
                IdUser = aspNetUser.Id,
                IdTenant = idTenant
            });
            structure.CardName = String.Format("{0} Card", "My Profile");

            if (request.RegistationType == "SHOP_OWNER")
            {
                Shop shop = new Shop();
                shop.IdTenant = idTenant;
                _unitOfWork.ShopDao.Add(shop);

                Company company = new Company();
                company.IdTenant = idTenant;
                _unitOfWork.CompanyDao.Add(company);

                var structureType = _unitOfWork.StructureTypeDao.GetCustom(c => c.Code == Constants.StructureTypeConstant.LEGAL_ENTITY);
                structure.IdStructureType = structureType.IdStructureType;
                structure.IdShop = shop.IdShop;
                structure.IdCompany = company.IdCompany;
                _unitOfWork.StructureDao.Add(structure);
            }
            else
            {
                Person person = new Person();
                person.Firstname = request.FirstName;
                person.Lastname = request.LastName;
                person.IdTenant = idTenant;
                _unitOfWork.PersonDao.Add(person);

                //create default structure for normal user
                var structureType = _unitOfWork.StructureTypeDao.GetCustom(c => c.Code == Constants.StructureTypeConstant.INDIVIDUAL);
                structure.IdStructureType = structureType.IdStructureType;
                structure.IdPerson = person.IdPerson;
                structure.Email = request.Email;
                _unitOfWork.StructureDao.Add(structure);
            }

            _unitOfWork.Save();

            /*
             var authenticatorKey = await _userManager.GetAuthenticatorKeyAsync(identityUser);
             if (authenticatorKey == null)
             {
                 await _userManager.ResetAuthenticatorKeyAsync(identityUser);
                 authenticatorKey = await _userManager.GetAuthenticatorKeyAsync(identityUser);
             }

             var formattedKey = Generate2FaCode(request.Email, authenticatorKey);
            
            var emailConfirmationCode = await _userManager.GenerateEmailConfirmationTokenAsync(identityUser);
            var encodedCode = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(emailConfirmationCode));
            var apiUrl = _configuration.GetSection("ApiUrl");

            var urlInEmail = string.Format(EmailValidationFormat, apiUrl.Value, encodedCode, request.Email, tenant.Domain);
            

            //send mail to user
            string fullName = string.Format("{0} {1}", request.FirstName, request.LastName);
            Dictionary<string, string> replace = new Dictionary<string, string>() {
                { "##Link##",urlInEmail},
                { "##Name##",fullName},
                { "##Tenant_Name##",tenant.Name},
                { "##Logo_Url##",String.Format("http://exchangecdn.mindex.group/{0}.png",tenant.Domain)}
            };

            SendMailRequest sendMailRequest = new SendMailRequest()
            {
                To = new List<string>() { request.Email },
                EmailTemplateParameter = Constants.ParameterConstant.EMAIL_VERIFICATION_TEMPLATE,
                Replacements = replace,
                SubjectParameter = Constants.ParameterConstant.EMAIL_VERIFICATION_TEMPLATE_SUBJECT,
            };

            _mailService.SendMail(sendMailRequest);
            */

            Dictionary<string, string> replace = new Dictionary<string, string>() {
                { "##Link##",emailCode},
                { "##Tenant_Name##",tenant.Name},
                { "##Logo_Url##",String.Format("https://cdn.connectus.mu/DirectFiles/{0}.png",tenant.Domain)}
            };

            SendMailRequest sendMailRequest = new SendMailRequest()
            {
                To = new List<string>() { request.Email },
                EmailTemplateParameter = Constants.ParameterConstant.EMAIL_OTP_VERIFICATION_TEMPLATE,
                Replacements = replace,
                SubjectParameter = Constants.ParameterConstant.EMAIL_OTP_VERIFICATION_TEMPLATE_SUBJECT,
            };

            BusinessResponse<SendMailResponse> mailResponse = _mailService.SendMail(sendMailRequest);
            if (mailResponse.HasException())
            {
                throw new Exception("Unable to complete registration at this time, please try again in a few minutes.");
            }

            List<string> automaticIntegrations = _unitOfWork.IntegrationTypeDao.GetListCustom<string>(-1, 0, t => t.IsAutomatic != null && t.IsAutomatic == true, t => t.IdIntegrationType,
                new List<string>() { }).EntityList.Select(t => t.IdIntegrationType).ToList();

            _integrationService.InitializeIntegrationForUser(new InitializeIntegrationRequest()
            {
                IdUser = aspNetUser.Id,
                IdIntegrationTypes = automaticIntegrations,
                TokenIdentifier = aspNetUser.Email
            });

            response.Result = true;
            response.TwoFactorAuthCode = null;

            return response;

        }
        public async Task<BusinessResponse<ValidateEmailResponse>> ValidateEmailAsync(string code, string email, string domain)
        {
            BusinessResponse<ValidateEmailResponse> response = new BusinessResponse<ValidateEmailResponse>();
            try
            {
                response.Result = await ValidateEmailAsyncRaw(code, email, domain);
            }
            catch (Exception ex)
            {
                response.Exception = new BusinessLayerException(ex.Message, ex);
            }

            return response;
        }

        public async Task<ValidateEmailResponse> ValidateEmailAsyncRaw(string requestCode, string email, string domain)
        {
            ValidateEmailResponse validateEmailResponse = new ValidateEmailResponse();


            var idTenant = _globalDataService.GetVariable<string>(ApplicationConstant.IDTENANT);
            Tenant tenant = _unitOfWork.TenantDao.GetCustom(t => t.IdTenant == idTenant);

            string usernameWithTenant = tenant.TenantCode + "-" + email;

            ApplicationUser applicationUser = await FindApplicationUserByUsername(usernameWithTenant, domain);

            var code = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(requestCode));

            var result = await _userManager.ConfirmEmailAsync(applicationUser, code);
            validateEmailResponse.Result = result.Succeeded;

            if (!result.Succeeded)
            {
                string errors = string.Format(CultureInfo.InvariantCulture, "{0} : {1}", "Failed", string.Join(",", result.Errors.Select(x => x.Description).ToList()));
                Exception exception = new BusinessLayerException(errors);
                throw exception;
            }

            var scheme = _configuration.GetSection("Scheme");
            validateEmailResponse.RedirectUrl = string.Format("{0}://{1}/auth/login?message=Email Validated", scheme.Value, domain);

            return validateEmailResponse;
        }


        public BusinessResponse<ValidateOtpResponse> ValidateOtp(ValidateOtpRequest request)
        {
            BusinessResponse<ValidateOtpResponse> response = new BusinessResponse<ValidateOtpResponse>();
            try
            {
                response.Result = ValidateOtpRaw(request);
            }
            catch (Exception ex)
            {
                response.Exception = new BusinessLayerException(ex.Message, ex);
            }

            return response;
        }

        public ValidateOtpResponse ValidateOtpRaw(ValidateOtpRequest request)
        {
            ValidateOtpResponse validateOtpResponse = new ValidateOtpResponse();


            var idTenant = _globalDataService.GetVariable<string>(ApplicationConstant.IDTENANT);
            Tenant tenant = _unitOfWork.TenantDao.GetCustom(t => t.IdTenant == idTenant);

            string usernameWithTenant = tenant.TenantCode + "-" + request.Email;

            AspNetUser aspNetUser = GetAspNetUser(usernameWithTenant, tenant.Domain);

            aspNetUser.EmailConfirmed = true;
            _unitOfWork.Save();

            if (aspNetUser == null)
                throw new Exception("User not found");

            if (aspNetUser.ValidationCode != request.Otp)
                throw new Exception("Invalid OTP");

            validateOtpResponse.Result = true;

            //start integegration if any

            return validateOtpResponse;
        }

        public BusinessResponse<ValidateOtpResponse> ResendOtp(ValidateOtpRequest request)
        {
            BusinessResponse<ValidateOtpResponse> response = new BusinessResponse<ValidateOtpResponse>();
            try
            {
                response.Result = ResendOtpRaw(request);
            }
            catch (Exception ex)
            {
                response.Exception = new BusinessLayerException(ex.Message, ex);
            }

            return response;
        }

        public ValidateOtpResponse ResendOtpRaw(ValidateOtpRequest request)
        {
            ValidateOtpResponse validateOtpResponse = new ValidateOtpResponse();

            var idTenant = _globalDataService.GetVariable<string>(ApplicationConstant.IDTENANT);
            Tenant tenant = _unitOfWork.TenantDao.GetCustom(t => t.IdTenant == idTenant);

            string usernameWithTenant = tenant.TenantCode + "-" + request.Email;

            AspNetUser aspNetUser = GetAspNetUser(usernameWithTenant, tenant.Domain);

            if (aspNetUser == null)
                throw new Exception("The details provided do not match any registered account. Please click <a href='/signup'>here</a> to create a new account.");

            Dictionary<string, string> replace = new Dictionary<string, string>() {
                { "##Link##",aspNetUser.ValidationCode},
                { "##Tenant_Name##",tenant.Name},
                { "##Logo_Url##",String.Format("https://cdn.connectus.mu/DirectFiles/{0}.png",tenant.Domain)}
            };

            SendMailRequest sendMailRequest = new SendMailRequest()
            {
                To = new List<string>() { request.Email },
                EmailTemplateParameter = Constants.ParameterConstant.EMAIL_OTP_VERIFICATION_TEMPLATE,
                Replacements = replace,
                SubjectParameter = Constants.ParameterConstant.EMAIL_OTP_VERIFICATION_TEMPLATE_SUBJECT,
            };

            BusinessResponse<SendMailResponse> mailResponse = _mailService.SendMail(sendMailRequest);
            if (mailResponse.HasException())
            {
                throw new Exception("Unable to resend OTP at this time, please try again in a few minutes.");
            }



            validateOtpResponse.Result = true;
            return validateOtpResponse;
        }


        public BusinessResponse<ForgotPasswordResponse> ForgotPassword(ForgotPasswordRequest request)
        {
            BusinessResponse<ForgotPasswordResponse> response = new BusinessResponse<ForgotPasswordResponse>();
            try
            {
                response.Result = ForgotPasswordRaw(request);
            }
            catch (Exception ex)
            {
                response.Exception = new BusinessLayerException(ex.Message, ex);
            }

            return response;
        }

        public ForgotPasswordResponse ForgotPasswordRaw(ForgotPasswordRequest request)
        {
            ForgotPasswordResponse forgotPasswordResponse = new ForgotPasswordResponse();

            var idTenant = _globalDataService.GetVariable<string>(ApplicationConstant.IDTENANT);
            Tenant tenant = _unitOfWork.TenantDao.GetCustom(t => t.IdTenant == idTenant);

            string usernameWithTenant = tenant.TenantCode + "-" + request.Email;

            AspNetUser aspNetUser = GetAspNetUser(usernameWithTenant, tenant.Domain);


            if (aspNetUser == null)
                throw new Exception("The details provided do not match any registered account. Please click <a href='/signup'>here</a> to create a new account.");


            var random = new Random();
            var emailCode = random.Next(100000, 999999).ToString();
            aspNetUser.ValidationCode = emailCode;

            Dictionary<string, string> replace = new Dictionary<string, string>() {
                { "##Link##",aspNetUser.ValidationCode},
                { "##Tenant_Name##",tenant.Name},
                { "##Logo_Url##",String.Format("https://cdn.connectus.mu/DirectFiles/{0}.png",tenant.Domain)}
            };

            SendMailRequest sendMailRequest = new SendMailRequest()
            {
                To = new List<string>() { request.Email },
                EmailTemplateParameter = Constants.ParameterConstant.FORGOT_PASSWORD_OTP_TEMPLATE,
                Replacements = replace,
                SubjectParameter = Constants.ParameterConstant.FORGOT_PASSWORD_OTP_SUBJECT,
            };

            BusinessResponse<SendMailResponse> mailResponse = _mailService.SendMail(sendMailRequest);
            if (mailResponse.HasException())
            {
                throw new Exception("Unable to resend OTP at this time, please try again in a few minutes.");
            }

            _unitOfWork.Save();

            forgotPasswordResponse.Result = true;
            return forgotPasswordResponse;
        }


        public async Task<BusinessResponse<ForgotPasswordResponse>> ForgotPasswordWithOtpAsync(ForgotPasswordRequest request)
        {
            BusinessResponse<ForgotPasswordResponse> response = new BusinessResponse<ForgotPasswordResponse>();
            try
            {
                response.Result = await ForgotPasswordWithOtpAsyncRaw(request);
            }
            catch (Exception ex)
            {
                response.Exception = new BusinessLayerException(ex.Message, ex);
            }

            return response;
        }

        public async Task<ForgotPasswordResponse> ForgotPasswordWithOtpAsyncRaw(ForgotPasswordRequest request)
        {
            ForgotPasswordResponse forgotPasswordResponse = new ForgotPasswordResponse();

            var idTenant = _globalDataService.GetVariable<string>(ApplicationConstant.IDTENANT);
            Tenant tenant = _unitOfWork.TenantDao.GetCustom(t => t.IdTenant == idTenant);

            string usernameWithTenant = tenant.TenantCode + "-" + request.Email;

            AspNetUser aspNetUser = GetAspNetUser(usernameWithTenant, tenant.Domain);

            if (aspNetUser == null)
                throw new Exception("The details provided do not match any registered account. Please click <a href='/signup'>here</a> to create a new account.");

            ApplicationUser applicationUser = this.FindApplicationUserByUsername(usernameWithTenant, tenant.Domain).GetAwaiter().GetResult();

            var token = await _userManager.GeneratePasswordResetTokenAsync(applicationUser); // Generate reset token
            var result = await _userManager.ResetPasswordAsync(applicationUser, token, request.Password);

            _unitOfWork.Save();

            forgotPasswordResponse.Result = true;
            return forgotPasswordResponse;
        }


        internal async Task RevertUserCreation(string username, string domain)
        {
            //get user by tenant
            ApplicationUser applicationUser = await FindApplicationUserByUsername(username, domain);

            if (applicationUser != null)
            {
                IList<string> userRoles = await _userManager.GetRolesAsync(applicationUser);
                await _userManager.RemoveFromRolesAsync(applicationUser, userRoles);
                await _userManager.DeleteAsync(applicationUser);
            }
        }

        internal async Task<ApplicationUser> FindApplicationUserByUsername(string username, string domain)
        {
            AspNetUser aspNetUser = GetAspNetUser(username, domain);
            if (aspNetUser == null)
                return null;

            ApplicationUser applicationUser = await _userManager.FindByIdAsync(aspNetUser.Id);

            return applicationUser;
        }

        internal AspNetUser GetAspNetUser(string username, string domain)
        {
            AspNetUser aspNetUser = _unitOfWork.AspNetUserDao.GetCustom(u => u.IdTenantNavigation.Domain == domain && u.UserName == username);
            return aspNetUser;
        }


        internal string Generate2FaCode(string email, string unformattedKey)
        {
            return string.Format(
            AuthenticatorUriFormat,
                _urlEncoder.Encode("Mindex Limited Auth"),
                _urlEncoder.Encode(email),
                unformattedKey);
        }

    }
}
