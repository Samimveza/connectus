using Business.Common;
using Business.Dto;
using Business.Dto.Request.StructureOption;
using Business.Dto.Response.StructureOption;
using Business.Enums;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PublicApi.Authorization;
using Service.Interfaces;
using Swashbuckle.AspNetCore.Annotations;

namespace PublicApi.Controllers
{
    public class StructureOptionController : Controller
    {
        private readonly IStructureOptionService _structureOptionService;

        public StructureOptionController(IStructureOptionService structureOptionService)
        {
            _structureOptionService = structureOptionService;
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [SessionRequirement("P1", "P2")]
        [HttpPost("api/structure-option-list")]
        [SwaggerOperation(
            Summary = "Get structure options for a shop",
            Description = "Get all structure options for a shop structure (no pagination)",
            OperationId = "structureOption.list",
            Tags = new[] { "Structure Option" })
        ]
        public ActionResult<BaseResponse<StructureOptionListResponse>> GetStructureOptions(
            [FromBody] GetStructureOptionsRequest request, 
            CancellationToken cancellationToken = default)
        {
            BaseResponse<StructureOptionListResponse> response = new BaseResponse<StructureOptionListResponse>();
            try
            {
                BusinessResponse<StructureOptionListResponse> businessResponse = _structureOptionService.GetStructureOptions(request);

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
        [HttpPost("api/structure-option-save")]
        [SwaggerOperation(
            Summary = "Save structure option",
            Description = "Save a structure option (create or update, one by one)",
            OperationId = "structureOption.save",
            Tags = new[] { "Structure Option" })
        ]
        public ActionResult<BaseResponse<SaveStructureOptionResponse>> SaveStructureOption(
            [FromBody] SaveStructureOptionRequest request, 
            CancellationToken cancellationToken = default)
        {
            BaseResponse<SaveStructureOptionResponse> response = new BaseResponse<SaveStructureOptionResponse>();
            try
            {
                BusinessResponse<SaveStructureOptionResponse> businessResponse = _structureOptionService.SaveStructureOption(request);

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
        [HttpPost("api/structure-option-delete")]
        [SwaggerOperation(
            Summary = "Delete structure option",
            Description = "Delete a structure option",
            OperationId = "structureOption.delete",
            Tags = new[] { "Structure Option" })
        ]
        public ActionResult<BaseResponse<DeleteStructureOptionResponse>> DeleteStructureOption(
            [FromBody] DeleteStructureOptionRequest request, 
            CancellationToken cancellationToken = default)
        {
            BaseResponse<DeleteStructureOptionResponse> response = new BaseResponse<DeleteStructureOptionResponse>();
            try
            {
                BusinessResponse<DeleteStructureOptionResponse> businessResponse = _structureOptionService.DeleteStructureOption(request);

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
