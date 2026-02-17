using Azure;
using Azure.Core;
using Business;
using Business.Common;
using Business.Dto;
using Business.Dto.Request;
using Business.Dto.Response;
using Business.Enums;
using Business.Interfaces;
using Business.ReturnType;
using Data.Identity;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PublicApi.Authorization;
using Service;
using Swashbuckle.AspNetCore.Annotations;

namespace PublicApi.Controllers
{
    [PreSessionLoad]
    public class AuthenticationController : Controller
    {
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly ITokenClaimsService _tokenClaimsService;
        private readonly Service.Interfaces.IAuthenticationService _authenticationService;

        public AuthenticationController(SignInManager<ApplicationUser> signInManager
            , ITokenClaimsService tokenClaimsService
            , Service.Interfaces.IAuthenticationService authenticationService
            )
        {
            _signInManager = signInManager;
            _tokenClaimsService = tokenClaimsService;
            _authenticationService = authenticationService;
        }

        [HttpPost("api/authenticate")]
        [SwaggerOperation(
            Summary = "Authenticates a user",
            Description = "Authenticates a user",
            OperationId = "auth.authenticate",
            Tags = new[] { "" })
        ]
        public async Task<ActionResult<BaseResponse<AuthenticateResponse>>> Authenticate([FromBody] AuthenticateRequest request, CancellationToken cancellationToken = default)
        {
            BaseResponse<AuthenticateResponse> response = new BaseResponse<AuthenticateResponse>();
            try
            {
                BusinessResponse<AuthenticateResponse> businessResponse = await _authenticationService.AuthenticateAsync(request);

                if (businessResponse.HasException())
                {
                    response.Status = RequestStatusEnum.FAILURE;
                    response.ErrorMessage = businessResponse.Exception.Message;
                    return response;
                }

                response.Status = RequestStatusEnum.SUCCESS;
                response.Result = businessResponse.Result;

            }
            catch (Exception ex)
            {
                return StatusCode(500);
            }

            return response;
        }


        [HttpPost("api/register")]
        [SwaggerOperation(
            Summary = "Registers a user",
            Description = "Registers a user",
            OperationId = "auth.register",
            Tags = new[] { "" })
        ]
        public async Task<ActionResult<BaseResponse<RegistrationResponse>>> Register([FromBody] RegistrationRequest request, CancellationToken cancellationToken = default)
        {
            BaseResponse<RegistrationResponse> response = new BaseResponse<RegistrationResponse>();
            try
            {
                BusinessResponse<RegistrationResponse> businessResponse = await _authenticationService.RegisterAsync(request);

                if (businessResponse.HasException())
                {
                    response.Status = RequestStatusEnum.FAILURE;
                    response.ErrorMessage = businessResponse.Exception.Message;
                    return response;
                }

                response.Status = RequestStatusEnum.SUCCESS;
                response.Result = businessResponse.Result;

            }
            catch (Exception ex)
            {
                return StatusCode(500);
            }

            return response;
        }

        [HttpGet("api/validate-email")]
        [SwaggerOperation(
            Summary = "Validates the email of a user after registration",
            Description = "Validates the email of a user after registration",
            OperationId = "auth.valiate_email",
            Tags = new[] { "" })
        ]
        public async Task<ActionResult<BaseResponse<ValidateEmailResponse>>> ValidateEmailAsync(string code, string email, string domain, CancellationToken cancellationToken = default)
        {
            BaseResponse<ValidateEmailResponse> response = new BaseResponse<ValidateEmailResponse>();
            try
            {
                BusinessResponse<ValidateEmailResponse> businessResponse = await _authenticationService.ValidateEmailAsync(code, email, domain);

                if (businessResponse.HasException())
                {
                    response.Status = RequestStatusEnum.FAILURE;
                    response.ErrorMessage = businessResponse.Exception.Message;
                    return response;
                }

                response.Status = RequestStatusEnum.SUCCESS;
                response.Result = businessResponse.Result;

            }
            catch (Exception ex)
            {
                return StatusCode(500);
            }


            if (response.Status == RequestStatusEnum.SUCCESS)
            {
                return Redirect(response.Result.RedirectUrl);
            }

            return response;
        }

        [HttpPost("api/validate-otp")]
        [SwaggerOperation(
            Summary = "Validates the otp of a user after registration",
            Description = "Validates the otp of a user after registration",
            OperationId = "auth.valiate_otp",
            Tags = new[] { "" })
        ]
        public  ActionResult<BaseResponse<ValidateOtpResponse>> ValidateOtp([FromBody] ValidateOtpRequest request, CancellationToken cancellationToken = default)
        {
            BaseResponse<ValidateOtpResponse> response = new BaseResponse<ValidateOtpResponse>();
            try
            {
                BusinessResponse<ValidateOtpResponse> businessResponse = _authenticationService.ValidateOtp(request);

                if (businessResponse.HasException())
                {
                    response.Status = RequestStatusEnum.FAILURE;
                    response.ErrorMessage = businessResponse.Exception.Message;
                    return response;
                }

                response.Status = RequestStatusEnum.SUCCESS;
                response.Result = businessResponse.Result;

            }
            catch (Exception ex)
            {
                return StatusCode(500);
            }

            return response;
        }

        [HttpPost("api/resend-otp")]
        [SwaggerOperation(
            Summary = "Resends the otp of a user after registration",
            Description = "Resends the otp of a user after registration",
            OperationId = "auth.resend_otp",
            Tags = new[] { "" })
        ]
        public ActionResult<BaseResponse<ValidateOtpResponse>> ResendOtp([FromBody] ValidateOtpRequest request, CancellationToken cancellationToken = default)
        {
            BaseResponse<ValidateOtpResponse> response = new BaseResponse<ValidateOtpResponse>();
            try
            {
                BusinessResponse<ValidateOtpResponse> businessResponse = _authenticationService.ResendOtp(request);

                if (businessResponse.HasException())
                {
                    response.Status = RequestStatusEnum.FAILURE;
                    response.ErrorMessage = businessResponse.Exception.Message;
                    return response;
                }

                response.Status = RequestStatusEnum.SUCCESS;
                response.Result = businessResponse.Result;

            }
            catch (Exception ex)
            {
                return StatusCode(500);
            }

            return response;
        }


        [HttpPost("api/forgot-password")]
        [SwaggerOperation(
            Summary = "Forgot Password",
            Description = "Forgot Passeort",
            OperationId = "auth.forgot-pasword",
            Tags = new[] { "" })
        ]
        public ActionResult<BaseResponse<ForgotPasswordResponse>> ForgotPassword([FromBody] ForgotPasswordRequest request, CancellationToken cancellationToken = default)
        {
            BaseResponse<ForgotPasswordResponse> response = new BaseResponse<ForgotPasswordResponse>();
            try
            {
                BusinessResponse<ForgotPasswordResponse> businessResponse = _authenticationService.ForgotPassword(request);

                if (businessResponse.HasException())
                {
                    response.Status = RequestStatusEnum.FAILURE;
                    response.ErrorMessage = businessResponse.Exception.Message;
                    return response;
                }

                response.Status = RequestStatusEnum.SUCCESS;
                response.Result = businessResponse.Result;

            }
            catch (Exception ex)
            {
                return StatusCode(500);
            }

            return response;
        }

        [HttpPost("api/forgot-password-with-otp")]
        [SwaggerOperation(
            Summary = "Forgot Password With Otp",
            Description = "Forgot Password With Otp",
            OperationId = "auth.forgot-password-with-otp",
            Tags = new[] { "" })
        ]
        public async Task<ActionResult<BaseResponse<ForgotPasswordResponse>>> ForgotPasswordWithOtp([FromBody] ForgotPasswordRequest request, CancellationToken cancellationToken = default)
        {
            BaseResponse<ForgotPasswordResponse> response = new BaseResponse<ForgotPasswordResponse>();
            try
            {
                 BusinessResponse<ForgotPasswordResponse> businessResponse = await _authenticationService.ForgotPasswordWithOtpAsync(request);

                if (businessResponse.HasException())
                {
                    response.Status = RequestStatusEnum.FAILURE;
                    response.ErrorMessage = businessResponse.Exception.Message;
                    return response;
                }

                response.Status = RequestStatusEnum.SUCCESS;
                response.Result = businessResponse.Result;

            }
            catch (Exception ex)
            {
                return StatusCode(500);
            }

            return response;
        }
    }
}
