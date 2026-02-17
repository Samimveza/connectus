using Business.Common;
using Business.Dto.Request;
using Business.Dto.Request.Subscription;
using Business.Dto.Response;
using Business.Dto.Response.Subscription;
using Business.Model;
using Data.Interfaces;
using Microsoft.Extensions.Configuration;
using Service.Common;
using Service.IntegrationGateway;
using Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Business.Enums.Constants;

namespace Service.Extension
{
    public class SubscriptionService : ISubscriptionService
    {
        public IUnitOfWork _unitOfWork;
        public IGlobalDataService _globalDataService;

        public SubscriptionService(
             IUnitOfWork unitOfWork,
             IGlobalDataService globalDataService
            )
        {
            _unitOfWork = unitOfWork;
            _globalDataService = globalDataService;
        }

        public BusinessResponse<AddSubscriptionResponse> AddSubscription(AddSubscriptionRequest request)
        {
            BusinessResponse<AddSubscriptionResponse> response = new BusinessResponse<AddSubscriptionResponse>();
            try
            {
                response.Result = AddSubscriptionRaw(request);
            }
            catch (Exception ex)
            {
                response.Exception = new BusinessLayerException(ex.Message, ex);
            }
            return response;
        }

        public AddSubscriptionResponse AddSubscriptionRaw(AddSubscriptionRequest request)
        {
            var idTenant = _globalDataService.GetVariable<string>(ApplicationConstant.IDTENANT);

            var addSubscriptionResponse = new AddSubscriptionResponse();

            var existingSubscription = _unitOfWork.SubscriberDao.GetCustom(c => c.IdTenant == idTenant && c.EmailAddress == request.Email);

            if (existingSubscription != null)
            {
                throw new BusinessLayerException("Subscription already exists");
            }

            var subscription = new Business.Model.Subscriber();
            subscription.IdTenant = idTenant;
            subscription.EmailAddress = request.Email;
            subscription.DateAdded = DateTime.UtcNow;
            subscription.Source = request.Source;
            _unitOfWork.SubscriberDao.Add(subscription);
            // Final save
            _unitOfWork.Save();

            addSubscriptionResponse.Response = true;

            return addSubscriptionResponse;
        }
    }
}
