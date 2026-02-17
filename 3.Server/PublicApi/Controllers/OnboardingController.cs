using Business.Common;
using Business.Dto.Request;
using Business.Dto.Response;
using Business.Dto;
using Business.Enums;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PublicApi.Authorization;
using Swashbuckle.AspNetCore.Annotations;
using Service.Interfaces;
using Service.Extension;

namespace PublicApi.Controllers
{
    public class OnboardingController : Controller
    {


        private readonly Service.Interfaces.IOnboardingService _onboardingService;

        public OnboardingController(IOnboardingService onboardingService)
        {
            _onboardingService = onboardingService;
        }


        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [SessionRequirement("P1", "P2")]
        [HttpPost("api/structure-update")]
        [SwaggerOperation(
        Summary = "Structure update",
        Description = "Structure update",
        OperationId = "onboarding.structureupdate",
        Tags = new[] { "" })
        ]
        public ActionResult<BaseResponse<StructureDetailResponse>> StructureUpdate([FromBody] StructureUpdateRequest request, CancellationToken cancellationToken = default)
        {
            BaseResponse<StructureDetailResponse> response = new BaseResponse<StructureDetailResponse>();
            try
            {
                BusinessResponse<StructureDetailResponse> businessResponse = _onboardingService.StructureUpdate(request);

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


        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [SessionRequirement("P1", "P2")]
        [HttpPost("api/social-network-all")]
        [SwaggerOperation(
        Summary = "List social networks",
        Description = "List social networks",
        OperationId = "onboarding.socialNetworkAll",
        Tags = new[] { "" })
        ]
        public ActionResult<BaseResponse<BaseListReturnType<SocialNetworkListResponse>>> AllBlockchainNetworks()
        {
            BaseResponse<BaseListReturnType<SocialNetworkListResponse>> response = new BaseResponse<BaseListReturnType<SocialNetworkListResponse>>();
            try
            {
                BusinessResponse<BaseListReturnType<SocialNetworkListResponse>> businessResponse = _onboardingService.SocialNetworkAll();

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
