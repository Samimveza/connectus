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
using Business.Dto.Response.Integration;
using Business.Dto.Request.Integration;
using Service.Common;

namespace PublicApi.Controllers
{
    public class IntegrationController : Controller
    {
        private readonly IIntegrationService _integrationService;

        public IntegrationController(IIntegrationService integrationService)
        {
            _integrationService = integrationService;
        }


        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [SessionRequirement("P1", "P2")]
        [HttpPost("api/integration-type-list")]
        [SwaggerOperation(
        Summary = "List Integration Types",
        Description = "List Integration Types",
        OperationId = "integration.integrationTypeList",
        Tags = new[] { "" })
        ]
        public ActionResult<BaseResponse<BaseListReturnType<IntegrationTypeListResponse>>> IntegrationTypeList([FromBody] IntegrationTypeListRequest request, CancellationToken cancellationToken = default)
        {
            BaseResponse<BaseListReturnType<IntegrationTypeListResponse>> response = new BaseResponse<BaseListReturnType<IntegrationTypeListResponse>>();
            try
            {
                BusinessResponse<BaseListReturnType<IntegrationTypeListResponse>> businessResponse = _integrationService.IntegrationTypeList(request);

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
        [HttpPost("api/integration-detail-list")]
        [SwaggerOperation(
        Summary = "List Integration Detail",
        Description = "List Integration Detail",
        OperationId = "integration.integrationDetailList",
        Tags = new[] { "" })
        ]
        public ActionResult<BaseResponse<BaseListReturnType<IntegrationDetailListResponse>>> IntegrationDetailList([FromBody] IntegrationDetailListRequest request, CancellationToken cancellationToken = default)
        {
            BaseResponse<BaseListReturnType<IntegrationDetailListResponse>> response = new BaseResponse<BaseListReturnType<IntegrationDetailListResponse>>();
            try
            {
                BusinessResponse<BaseListReturnType<IntegrationDetailListResponse>> businessResponse = _integrationService.IntegrationDetailList(request);

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
        [HttpGet("api/download-integration-file/{idFile}")]
        [SwaggerOperation(
            Summary = "Download an integration file",
            Description = "Download an integration file",
            OperationId = "integration.downloadIntegrationFile",
            Tags = new[] { "" })
        ]
        public async Task<IActionResult> IntegrationDownloadFile(string idFile)
        {
            try
            {
                BusinessResponse<IntegrationDownloadFileResponse> businessResponse = _integrationService.DownloadIntegrationFile(idFile);

                if (businessResponse.HasException())
                {
                    return StatusCode(500);
                    //return StatusCode(500, new { Message = "An error occurred while fetching the file.", Details = businessResponse.Exception?.Message + "<->" + businessResponse?.Exception?.StackTrace });
                }

                //var memory = new MemoryStream();
                //await using (var stream = new FileStream(businessResponse.Result.PhysicalPath, FileMode.Open))
                //{
                //    await stream.CopyToAsync(memory);
                //}
                //memory.Position = 0;

                businessResponse.Result.FileStream.Position = 0;
                return File(
                     businessResponse.Result.FileStream,
                     businessResponse.Result.ContentType ?? "application/octet-stream",
                     businessResponse.Result.FileNameWithExtension ?? "downloaded-file"
                 );
            }
            catch (Exception ex)
            {
                return StatusCode(500);
                //return StatusCode(500, new { Message = "An error occurred while fetching the file.", Details = ex?.Message + "<->" + ex?.StackTrace });
            }
        }
    }
} 