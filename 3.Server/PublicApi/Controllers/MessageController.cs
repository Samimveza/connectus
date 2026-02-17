using Business.Common;
using Business.Dto.Request;
using Business.Dto.Response;
using Business.Dto;
using Business.Enums;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using Service.Interfaces;
using PublicApi.Authorization;
using Business.Dto.Request.Message;
using Business.Dto.Response.Message;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;

namespace PublicApi.Controllers
{
    public class MessageController : Controller
    {
        private readonly Service.Interfaces.IIntegrationService _integrationService;
        private readonly Service.Interfaces.IStructureService _structureService;
        private readonly Service.Interfaces.IMessageService _messageService;

        public MessageController(IIntegrationService integrationService
            , IStructureService structureService
            , IMessageService messageService
            )
        {
            _integrationService = integrationService;
            _structureService = structureService;
            _messageService = messageService;
        }

        [PreSessionLoad]
        [HttpPost("api/add-message-for-structure-by-slug")]
        [SwaggerOperation(
        Summary = "Add message for structure by slug",
        Description = "Add message for structure by slug",
        OperationId = "message.addMessageForStructureBySlug",
        Tags = new[] { "" })
        ]
        public ActionResult<BaseResponse<AddMessageForStructureBySlugResponse>> AddMessageForStructureBySlug([FromBody] AddMessageForStructureBySlugRequest request, CancellationToken cancellationToken = default)
        {
            BaseResponse<AddMessageForStructureBySlugResponse> response = new BaseResponse<AddMessageForStructureBySlugResponse>();
            try
            {
                BusinessResponse<AddMessageForStructureBySlugResponse> businessResponse = _messageService.AddMessageForStructureBySlug(request);

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
        [HttpPost("api/message-list-by-structure")]
        [SwaggerOperation(
        Summary = "List messages by structure",
        Description = "List messages by structure",
        OperationId = "message.messageListByStructure",
        Tags = new[] { "" })
]
        public ActionResult<BaseResponse<BaseListReturnType<StructureMessageListResponse>>> StructureMessageList([FromBody] StructureMessageListRequest request, CancellationToken cancellationToken = default)
        {
            BaseResponse<BaseListReturnType<StructureMessageListResponse>> response = new BaseResponse<BaseListReturnType<StructureMessageListResponse>>();
            try
            {
                BusinessResponse<BaseListReturnType<StructureMessageListResponse>> businessResponse = _messageService.StructureMessageList(request);

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
        [HttpPost("api/manipulate-message-read-state")]
        [SwaggerOperation(
        Summary = "Manipulate message read state",
        Description = "Manipulate message read state",
        OperationId = "message.manipulateMessageReadState",
        Tags = new[] { "" })
]
        public ActionResult<BaseResponse<ManipulateMessageReadStateResponse>> ManipulateMessageReadState([FromBody] ManipulateMessageReadStateRequest request, CancellationToken cancellationToken = default)
        {
            BaseResponse<ManipulateMessageReadStateResponse> response = new BaseResponse<ManipulateMessageReadStateResponse>();
            try
            {
                BusinessResponse<ManipulateMessageReadStateResponse> businessResponse = _messageService.ManipulateMessageReadState(request);

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
