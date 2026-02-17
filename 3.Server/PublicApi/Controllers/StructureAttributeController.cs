using Business.Common;
using Business.Dto;
using Business.Dto.Request.StructureAttribute;
using Business.Dto.Response.StructureAttribute;
using Business.Enums;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PublicApi.Authorization;
using Service.Interfaces;
using Swashbuckle.AspNetCore.Annotations;

namespace PublicApi.Controllers
{
    public class StructureAttributeController : Controller
    {
        private readonly IStructureAttributeService _structureAttributeService;

        public StructureAttributeController(IStructureAttributeService structureAttributeService)
        {
            _structureAttributeService = structureAttributeService;
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [SessionRequirement("P1", "P2")]
        [HttpPost("api/structure-attribute-list")]
        [SwaggerOperation(
            Summary = "Get structure attributes for a shop",
            Description = "Get all structure attributes for a shop structure (no pagination)",
            OperationId = "structureAttribute.list",
            Tags = new[] { "Structure Attribute" })
        ]
        public ActionResult<BaseResponse<StructureAttributeListResponse>> GetStructureAttributes(
            [FromBody] GetStructureAttributesRequest request, 
            CancellationToken cancellationToken = default)
        {
            BaseResponse<StructureAttributeListResponse> response = new BaseResponse<StructureAttributeListResponse>();
            try
            {
                BusinessResponse<StructureAttributeListResponse> businessResponse = _structureAttributeService.GetStructureAttributes(request);

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
        [HttpPost("api/structure-attribute-save")]
        [SwaggerOperation(
            Summary = "Save structure attribute",
            Description = "Save a structure attribute (create or update, one by one)",
            OperationId = "structureAttribute.save",
            Tags = new[] { "Structure Attribute" })
        ]
        public ActionResult<BaseResponse<SaveStructureAttributeResponse>> SaveStructureAttribute(
            [FromBody] SaveStructureAttributeRequest request, 
            CancellationToken cancellationToken = default)
        {
            BaseResponse<SaveStructureAttributeResponse> response = new BaseResponse<SaveStructureAttributeResponse>();
            try
            {
                BusinessResponse<SaveStructureAttributeResponse> businessResponse = _structureAttributeService.SaveStructureAttribute(request);

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
        [HttpPost("api/structure-attribute-delete")]
        [SwaggerOperation(
            Summary = "Delete structure attribute",
            Description = "Delete a structure attribute",
            OperationId = "structureAttribute.delete",
            Tags = new[] { "Structure Attribute" })
        ]
        public ActionResult<BaseResponse<DeleteStructureAttributeResponse>> DeleteStructureAttribute(
            [FromBody] DeleteStructureAttributeRequest request, 
            CancellationToken cancellationToken = default)
        {
            BaseResponse<DeleteStructureAttributeResponse> response = new BaseResponse<DeleteStructureAttributeResponse>();
            try
            {
                BusinessResponse<DeleteStructureAttributeResponse> businessResponse = _structureAttributeService.DeleteStructureAttribute(request);

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
