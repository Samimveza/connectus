using Business.Common;
using Business.Dto.Request;
using Business.Dto.Response;
using Business.Dto;
using Business.Enums;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PublicApi.Authorization;
using Service.Interfaces;
using Swashbuckle.AspNetCore.Annotations;

namespace PublicApi.Controllers
{
    public class AnalyticsController : Controller
    {

        private readonly Service.Interfaces.IAnalyticsService _analyticsService;

        public AnalyticsController(IAnalyticsService analyticsService)
        {
            _analyticsService = analyticsService;
        }

        [HttpPost("api/slug-list-all")]
        [SwaggerOperation(
        Summary = "List slugs",
        Description = "List all slugs",
        OperationId = "analytics.allSlugs",
        Tags = new[] { "" })
]
        public ActionResult<BaseResponse<GetAllSlugsResponse>> GetAllSlugs(CancellationToken cancellationToken = default)
        {
            BaseResponse<GetAllSlugsResponse> response = new BaseResponse<GetAllSlugsResponse>();
            try
            {
                BusinessResponse<GetAllSlugsResponse> businessResponse = _analyticsService.GetAllSlugs();

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
