using Business.Common;
using Business.Dto;
using Business.Dto.Request.StructureProduct;
using Business.Dto.Response;
using Business.Dto.Response.StructureProduct;
using Business.Enums;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PublicApi.Authorization;
using Service.Interfaces;
using Swashbuckle.AspNetCore.Annotations;

namespace PublicApi.Controllers
{
    public class StructureProductController : Controller
    {
        private readonly IStructureProductService _structureProductService;

        public StructureProductController(IStructureProductService structureProductService)
        {
            _structureProductService = structureProductService;
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [SessionRequirement("P1", "P2")]
        [HttpPost("api/structure-product-list")]
        [SwaggerOperation(
            Summary = "Get structure products for a shop",
            Description = "Get all structure products for a shop structure (with pagination)",
            OperationId = "structureProduct.list",
            Tags = new[] { "Structure Product" })
        ]
        public ActionResult<BaseResponse<BaseListReturnType<StructureProductResponse>>> GetStructureProducts(
            [FromBody] GetStructureProductsRequest request, 
            CancellationToken cancellationToken = default)
        {
            BaseResponse<BaseListReturnType<StructureProductResponse>> response = new BaseResponse<BaseListReturnType<StructureProductResponse>>();
            try
            {
                BusinessResponse<BaseListReturnType<StructureProductResponse>> businessResponse = _structureProductService.GetStructureProducts(request);

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
        [HttpPost("api/structure-product-detail")]
        [SwaggerOperation(
            Summary = "Get structure product detail",
            Description = "Get a specific structure product by ID",
            OperationId = "structureProduct.detail",
            Tags = new[] { "Structure Product" })
        ]
        public ActionResult<BaseResponse<StructureProductResponse>> GetStructureProduct(
            [FromBody] GetStructureProductRequest request, 
            CancellationToken cancellationToken = default)
        {
            BaseResponse<StructureProductResponse> response = new BaseResponse<StructureProductResponse>();
            try
            {
                BusinessResponse<StructureProductResponse> businessResponse = _structureProductService.GetStructureProduct(request);

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
        [HttpPost("api/structure-product-save")]
        [SwaggerOperation(
            Summary = "Save structure product",
            Description = "Save a structure product (create or update, one by one)",
            OperationId = "structureProduct.save",
            Tags = new[] { "Structure Product" })
        ]
        public ActionResult<BaseResponse<SaveStructureProductResponse>> SaveStructureProduct(
            [FromBody] SaveStructureProductRequest request, 
            CancellationToken cancellationToken = default)
        {
            BaseResponse<SaveStructureProductResponse> response = new BaseResponse<SaveStructureProductResponse>();
            try
            {
                BusinessResponse<SaveStructureProductResponse> businessResponse = _structureProductService.SaveStructureProduct(request);

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
        [HttpPost("api/structure-product-delete")]
        [SwaggerOperation(
            Summary = "Delete structure product",
            Description = "Delete a structure product",
            OperationId = "structureProduct.delete",
            Tags = new[] { "Structure Product" })
        ]
        public ActionResult<BaseResponse<DeleteStructureProductResponse>> DeleteStructureProduct(
            [FromBody] DeleteStructureProductRequest request, 
            CancellationToken cancellationToken = default)
        {
            BaseResponse<DeleteStructureProductResponse> response = new BaseResponse<DeleteStructureProductResponse>();
            try
            {
                BusinessResponse<DeleteStructureProductResponse> businessResponse = _structureProductService.DeleteStructureProduct(request);

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
