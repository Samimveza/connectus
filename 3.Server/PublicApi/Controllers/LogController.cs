using Azure;
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
using static Business.Enums.Constants;
using Service.Extension;

namespace PublicApi.Controllers;


public class LogController : Controller
{
    private readonly Service.Interfaces.ILogService _logService;

    public LogController(ILogService logService)
    {
        _logService = logService;
    }


    [HttpPost("api/structure-log-register")]
    [SwaggerOperation(
    Summary = "Structure log request",
    Description = "Structure log request slug",
    OperationId = "log.structureLogRegister",
    Tags = new[] { "" })
    ]
    public ActionResult<BaseResponse<StructureLogRegisterResponse>> StructureLogRegister([FromBody] StructureLogRegisterRequest request, CancellationToken cancellationToken = default)
    {
        BaseResponse<StructureLogRegisterResponse> response = new BaseResponse<StructureLogRegisterResponse>();
        try
        {
            BusinessResponse<StructureLogRegisterResponse> businessResponse = _logService.StructureLogRegister(request);

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