using Business.Dto.Request.Integration;
using Business.Dto.Response.Structure;
using Business.Dto;
using Business.Enums;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PublicApi.Authorization;
using Service.Extension;
using Service.Interfaces;
using Swashbuckle.AspNetCore.Annotations;
using Business.Dto.Response.Subscription;
using Business.Dto.Request.Subscription;
using Business.Common;
using Business.Dto.Response;

namespace PublicApi.Controllers
{
    public class SubscriptionController : Controller
    {
        private readonly Service.Interfaces.ISubscriptionService _subscriptionService;

        public SubscriptionController(ISubscriptionService subscriptionService)
        {
            _subscriptionService = subscriptionService;
        }

        [PreSessionLoad]
        [HttpPost("api/add-subscription")]
        [SwaggerOperation(
            Summary = "Add subscription",
            Description = "Add subscription",
            OperationId = "subscription.addSubscription",
            Tags = new[] { "" })
        ]
        public ActionResult<BaseResponse<AddSubscriptionResponse>> AddSubscription([FromBody] AddSubscriptionRequest request, CancellationToken cancellationToken = default)
        {
            BaseResponse<AddSubscriptionResponse> response = new BaseResponse<AddSubscriptionResponse>();
            try
            {
                BusinessResponse<AddSubscriptionResponse> businessResponse = _subscriptionService.AddSubscription(request);

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
