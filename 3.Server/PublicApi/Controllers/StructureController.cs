using Business.Common;
using Business.Dto.Request.Integration;
using Business.Dto.Response.Integration;
using Business.Dto;
using Business.Enums;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PublicApi.Authorization;
using Swashbuckle.AspNetCore.Annotations;
using Service.Interfaces;
using Business.Dto.Response.Structure;
using Business.Dto.Request.Structure;
using Business.Dto.Request;
using Business.Dto.Response;
using Service.Extension;

namespace PublicApi.Controllers
{
    public class StructureController : Controller
    {
        private readonly Service.Interfaces.IIntegrationService _integrationService;
        private readonly Service.Interfaces.IStructureService _structureService;

        public StructureController(IIntegrationService integrationService, IStructureService structureService)
        {
            _integrationService = integrationService;
            _structureService = structureService;
        }


        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [SessionRequirement("P1", "P2")]
        [HttpPost("api/card-detail-screen-constant")]
        [SwaggerOperation(
        Summary = "List Card Detail Screen Constant",
        Description = "List Card Detail Screen Constant",
        OperationId = "structure.cardDetailScreenConstant",
        Tags = new[] { "" })
        ]
        public ActionResult<BaseResponse<CardDetailScreenConstantResponse>> CardDetailScreenConstant(CancellationToken cancellationToken = default)
        {
            BaseResponse<CardDetailScreenConstantResponse> response = new BaseResponse<CardDetailScreenConstantResponse>();
            try
            {
                response.Result = new CardDetailScreenConstantResponse();
                response.Result.IntegrationTypes = _integrationService.IntegrationTypeList(new IntegrationTypeListRequest() { PageSize = -1 }).Result?.EntityList;
                response.Result.StructureFields = _structureService.StructureFieldList(new StructureFieldListRequest() { PageSize = -1 }).Result?.EntityList;

                response.Result.IndividualBaseSlugUrl = _structureService.GetIndividualSlugBaseUrl().Result;
                response.Result.IndividualProfileColorVariants = _structureService.GetColourVaraintsForIndividualProfile().Result;

                response.Result.LegalEntityBaseSlugUrl = _structureService.GetLegalEntitySlugBaseUrl().Result;
                response.Result.LegalEntityProfileColorVariants = _structureService.GetColourVaraintsForLegalEntityProfile().Result;

                response.Result.StructurerCategoriesHiearchy = _structureService.GetStructurerCategoriesHiearchy().Result;

                response.Status = RequestStatusEnum.SUCCESS;
            }
            catch (Exception ex)
            {
                return StatusCode(500);
            }

            return response;
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [SessionRequirement("P1", "P2")]
        [HttpPost("api/structure-list")]
        [SwaggerOperation(
        Summary = "List structures",
        Description = "List structures",
        OperationId = "structure.structurelist",
        Tags = new[] { "" })
]
        public ActionResult<BaseResponse<BaseListReturnType<StructureListResponse>>> StructureList([FromBody] StructureListRequest request, CancellationToken cancellationToken = default)
        {
            BaseResponse<BaseListReturnType<StructureListResponse>> response = new BaseResponse<BaseListReturnType<StructureListResponse>>();
            try
            {
                BusinessResponse<BaseListReturnType<StructureListResponse>> businessResponse = _structureService.StructureList(request);

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
        [HttpPost("api/structure-create")]
        [SwaggerOperation(
        Summary = "Create structure",
        Description = "Create structure",
        OperationId = "structure.structurecreate",
        Tags = new[] { "StructureType - LEGAL_ENTITY or INDIVIDUAL" })
        ]
        public ActionResult<BaseResponse<StructureDetailResponse>> StructureCreate([FromBody] StructureCreateRequest request, CancellationToken cancellationToken = default)
        {
            BaseResponse<StructureDetailResponse> response = new BaseResponse<StructureDetailResponse>();
            try
            {
                BusinessResponse<StructureDetailResponse> businessResponse = _structureService.StructureCreate(request);

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
        [HttpPost("api/structure-detail")]
        [SwaggerOperation(
        Summary = "Structure detail",
        Description = "Structure detail",
        OperationId = "structure.structureDetail",
        Tags = new[] { "" })
        ]
        public ActionResult<BaseResponse<StructureDetailResponse>> StructureDetail([FromBody] StructureDetailRequest request, CancellationToken cancellationToken = default)
        {
            BaseResponse<StructureDetailResponse> response = new BaseResponse<StructureDetailResponse>();
            try
            {
                BusinessResponse<StructureDetailResponse> businessResponse = _structureService.StructureDetail(request);

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

        [PreSessionLoad]
        [HttpPost("api/structure-detail-by-slug")]
        [SwaggerOperation(
        Summary = "Structure detail by slug",
        Description = "Structure detail by slug",
        OperationId = "structure.structureDetailBySlug",
        Tags = new[] { "" })
        ]
        public ActionResult<BaseResponse<StructureDetailResponse>> StructureDetailBySlug([FromBody] StructureDetailBySlugRequest request, CancellationToken cancellationToken = default)
        {
            BaseResponse<StructureDetailResponse> response = new BaseResponse<StructureDetailResponse>();
            try
            {
                BusinessResponse<StructureDetailResponse> businessResponse = _structureService.StructureDetailBySlug(request);

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

        [PreSessionLoad]
        [HttpPost("api/structure-portfolio-password-verify-by-slug")]
        [SwaggerOperation(
            Summary = "Structure portfolio password verify by slug",
            Description = "Structure detail by slug",
            OperationId = "structure.structureDetailBySlug",
            Tags = new[] { "" })
        ]
        public ActionResult<BaseResponse<StructurePasswordVerifyBySlugResponse>> StructurePasswordVerifyBySlug([FromBody] StructurePasswordVerifyBySlugRequest request, CancellationToken cancellationToken = default)
        {
            BaseResponse<StructurePasswordVerifyBySlugResponse> response = new BaseResponse<StructurePasswordVerifyBySlugResponse>();
            try
            {
                BusinessResponse<StructurePasswordVerifyBySlugResponse> businessResponse = _structureService.StructurePasswordVerifyBySlug(request);

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
        [HttpPost("api/structure-delete")]
        [SwaggerOperation(
        Summary = "Structure delete",
        Description = "Structure delete",
        OperationId = "structure.structureDelete",
        Tags = new[] { "" })
        ]
        public ActionResult<BaseResponse<StructureDeleteResponse>> StructureDelete([FromBody] StructureDetailRequest request, CancellationToken cancellationToken = default)
        {
            BaseResponse<StructureDeleteResponse> response = new BaseResponse<StructureDeleteResponse>();
            try
            {
                BusinessResponse<StructureDeleteResponse> businessResponse = _structureService.StructureDelete(request);

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

        [PreSessionLoad]
        [HttpPost("api/structure-slug-from-system-slug")]
        [SwaggerOperation(
            Summary = "Structure slug from system slug",
            Description = "Structure slug from system slug",
            OperationId = "structure.structureSlugFromSystemSlug",
            Tags = new[] { "" })
        ]
        public ActionResult<BaseResponse<StructureSlugFromSystemSlugResponse>> StructureSlugFromSystemSlug([FromBody] StructureSlugFromSystemSlugRequest request, CancellationToken cancellationToken = default)
        {
            BaseResponse<StructureSlugFromSystemSlugResponse> response = new BaseResponse<StructureSlugFromSystemSlugResponse>();
            try
            {
                BusinessResponse<StructureSlugFromSystemSlugResponse> businessResponse = _structureService.StructureSlugFromSystemSlug(request);

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
        [HttpPost("api/structure-views")]
        [SwaggerOperation(
            Summary = "Structure views",
            Description = "Structure views",
            OperationId = "structure.structureViews",
            Tags = new[] { "" })
        ]
        public ActionResult<BaseResponse<List<StructureViewResponse>>> GetStructureViews([FromBody] GetStructureViewsRequest request, CancellationToken cancellationToken = default)
        {
            BaseResponse<List<StructureViewResponse>> response = new BaseResponse<List<StructureViewResponse>>();
            try
            {
                BusinessResponse<List<StructureViewResponse>> businessResponse = _structureService.GetStructureViews(request);

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
