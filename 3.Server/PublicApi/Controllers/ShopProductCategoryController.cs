using Business.Common;
using Business.Dto;
using Business.Dto.Request.ShopProductCategory;
using Business.Dto.Response.ShopProductCategory;
using Business.Enums;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PublicApi.Authorization;
using Service.Interfaces;
using Swashbuckle.AspNetCore.Annotations;

namespace PublicApi.Controllers
{
    public class ShopProductCategoryController : Controller
    {
        private readonly IShopProductCategoryService _shopProductCategoryService;

        public ShopProductCategoryController(IShopProductCategoryService shopProductCategoryService)
        {
            _shopProductCategoryService = shopProductCategoryService;
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [SessionRequirement("P1", "P2")]
        [HttpPost("api/shop-product-category-list")]
        [SwaggerOperation(
            Summary = "Get shop product categories for a structure",
            Description = "Get all shop product categories for a structure (tree structure, no pagination)",
            OperationId = "shopProductCategory.list",
            Tags = new[] { "Shop Product Category" })
        ]
        public ActionResult<BaseResponse<ShopProductCategoryListResponse>> GetShopProductCategories(
            [FromBody] GetShopProductCategoriesRequest request, 
            CancellationToken cancellationToken = default)
        {
            BaseResponse<ShopProductCategoryListResponse> response = new BaseResponse<ShopProductCategoryListResponse>();
            try
            {
                BusinessResponse<ShopProductCategoryListResponse> businessResponse = _shopProductCategoryService.GetShopProductCategories(request);

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
        [HttpPost("api/shop-product-category-save")]
        [SwaggerOperation(
            Summary = "Save shop product category",
            Description = "Save a shop product category (create or update, one by one)",
            OperationId = "shopProductCategory.save",
            Tags = new[] { "Shop Product Category" })
        ]
        public ActionResult<BaseResponse<SaveShopProductCategoryResponse>> SaveShopProductCategory(
            [FromBody] SaveShopProductCategoryRequest request, 
            CancellationToken cancellationToken = default)
        {
            BaseResponse<SaveShopProductCategoryResponse> response = new BaseResponse<SaveShopProductCategoryResponse>();
            try
            {
                BusinessResponse<SaveShopProductCategoryResponse> businessResponse = _shopProductCategoryService.SaveShopProductCategory(request);

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
        [HttpPost("api/shop-product-category-delete")]
        [SwaggerOperation(
            Summary = "Delete shop product category",
            Description = "Delete a shop product category",
            OperationId = "shopProductCategory.delete",
            Tags = new[] { "Shop Product Category" })
        ]
        public ActionResult<BaseResponse<DeleteShopProductCategoryResponse>> DeleteShopProductCategory(
            [FromBody] DeleteShopProductCategoryRequest request, 
            CancellationToken cancellationToken = default)
        {
            BaseResponse<DeleteShopProductCategoryResponse> response = new BaseResponse<DeleteShopProductCategoryResponse>();
            try
            {
                BusinessResponse<DeleteShopProductCategoryResponse> businessResponse = _shopProductCategoryService.DeleteShopProductCategory(request);

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
