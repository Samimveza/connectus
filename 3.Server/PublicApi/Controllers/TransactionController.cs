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

namespace PublicApi.Controllers
{
    public class TransactionController : Controller
    {
        private readonly Service.Interfaces.ITransactionService _transactionService;

        public TransactionController(ITransactionService transactionService)
        {
            _transactionService = transactionService;
        }

        [HttpPost("api/card-scan")]
        [SwaggerOperation(
        Summary = "Card Scan",
        Description = "Card Scan",
        OperationId = "transaction.cardScan",
        Tags = new[] { "" })
]
        public ActionResult<BaseResponse<OnCardScanResponse>> OnCardScan([FromBody] OnCardScanRequest request, CancellationToken cancellationToken = default)
        {
            BaseResponse<OnCardScanResponse> response = new BaseResponse<OnCardScanResponse>();
            try
            {
                BusinessResponse<OnCardScanResponse> businessResponse = _transactionService.OnCardScan(request);

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
