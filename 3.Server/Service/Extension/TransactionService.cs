using Business.Common;
using Business.Dto.Request;
using Business.Dto.Response;
using Business.Model;
using Data.Interfaces;
using Microsoft.AspNetCore.Http;
using Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Extension
{
    public class TransactionService : Service.Interfaces.ITransactionService
    {
        public IUnitOfWork _unitOfWork;
        private readonly IGlobalDataService _globalDataService;
        private readonly IPermissionService _permissionService;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public TransactionService(
            IHttpContextAccessor httpContextAccessor,
             IUnitOfWork unitOfWork
              , IGlobalDataService globalDataService
              , IPermissionService permissionService
            )
        {
            _httpContextAccessor = httpContextAccessor;
            _unitOfWork = unitOfWork;
            _globalDataService = globalDataService;
        }


        public BusinessResponse<OnCardScanResponse> OnCardScan(OnCardScanRequest request)
        {
            BusinessResponse<OnCardScanResponse> response = new BusinessResponse<OnCardScanResponse>();
            try
            {
                response.Result = OnCardScanRaw(request);
            }
            catch (Exception ex)
            {
                response.Exception = new BusinessLayerException(ex.Message, ex);
            }

            return response;
        }

        public OnCardScanResponse OnCardScanRaw(OnCardScanRequest request)
        {
            OnCardScanResponse onCardScanResponse = new OnCardScanResponse();

            string ip = _httpContextAccessor.HttpContext?.Request?.Headers["X-Forwarded-For"].FirstOrDefault();

            if (string.IsNullOrEmpty(ip))
            {
                ip = _httpContextAccessor.HttpContext?.Connection?.RemoteIpAddress?.ToString();
            }

            var structure = _unitOfWork.StructureDao.GetCustom(r => r.Slug == request.Slug);

            if(structure == null)
            {
                throw new Exception("Not found");
            }

            var cardScanType = "DIRECT";

            if (request.CardRequestType == "")
            {
                cardScanType = "DIRECT";
            }
            else if (request.CardRequestType == "1")
            {
                cardScanType = "QRCODE";
            }
            else if (request.CardRequestType == "2")
            {
                cardScanType = "NFC";
            }

            ActionLog actionLog = new ActionLog()
            {
                ActionDetail = cardScanType,
                Date = DateTime.Now,    
                EntityName = "VIEW_STRUCTURE",   
                IdEntityIdentifier = structure.IdStructure,
                IpAddress = ip,
            };

            _unitOfWork.ActionLogDao.Add(actionLog);
            _unitOfWork.Save();

            return onCardScanResponse;
        }
    }
}
