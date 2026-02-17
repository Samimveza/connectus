using Business.Common;
using Business.Dto.Request;
using Business.Dto.Request.Message;
using Business.Dto.Request.Subscription;
using Business.Dto.Response;
using Business.Dto.Response.Message;
using Business.Dto.Response.Subscription;
using Business.ExtensionMethod;
using Business.Model;
using Data.Interfaces;
using Microsoft.AspNetCore.Http;
using Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using static Business.Enums.Constants;

namespace Service.Extension
{
    public class MessageService : IMessageService
    {
        public IUnitOfWork _unitOfWork;
        public IGlobalDataService _globalDataService;
        private readonly IHttpContextAccessor _httpContextAccessor;


        public MessageService(
             IUnitOfWork unitOfWork,
             IGlobalDataService globalDataService,
             IHttpContextAccessor httpContextAccessor
            )
        {
            _unitOfWork = unitOfWork;
            _globalDataService = globalDataService;
            _httpContextAccessor = httpContextAccessor;
        }

        public BusinessResponse<AddMessageForStructureBySlugResponse> AddMessageForStructureBySlug(AddMessageForStructureBySlugRequest request)
        {
            BusinessResponse<AddMessageForStructureBySlugResponse> response = new BusinessResponse<AddMessageForStructureBySlugResponse>();
            try
            {
                response.Result = AddMessageForStructureBySlugRaw(request);
            }
            catch (Exception ex)
            {
                response.Exception = new BusinessLayerException(ex.Message, ex);
            }
            return response;
        }

        public AddMessageForStructureBySlugResponse AddMessageForStructureBySlugRaw(AddMessageForStructureBySlugRequest request)
        {
            var addSubscriptionResponse = new AddMessageForStructureBySlugResponse();

            var structure = _unitOfWork.StructureDao.GetCustom(c => c.Slug == request.Slug);

            if (structure == null)
            {
                throw new BusinessLayerException("The requested profile/company not found");
            }

            string ip = _httpContextAccessor.HttpContext?.Request?.Headers["X-Forwarded-For"].FirstOrDefault();

            if (string.IsNullOrEmpty(ip))
            {
                ip = _httpContextAccessor.HttpContext?.Connection?.RemoteIpAddress?.ToString();
            }


            var message = new Business.Model.StructureMessage();
            message.IdStructure = structure.IdStructure;
            message.IdPersonNavigation = new Person
            {
                Firstname = request.Fullname,
            };
            message.Email = request.Email;
            message.Phone = request.PhoneNumber;
            message.DateAdded = DateTime.UtcNow;
            message.MessageContent = request.Message;
            message.IpAddress = ip;

            _unitOfWork.StructureMessageDao.Add(message);


            // Final save
            _unitOfWork.Save();

            //addSubscriptionResponse.Response = true;

            return addSubscriptionResponse;
        }

        public BusinessResponse<BaseListReturnType<StructureMessageListResponse>> StructureMessageList(StructureMessageListRequest request)
        {
            BusinessResponse<BaseListReturnType<StructureMessageListResponse>> response = new BusinessResponse<BaseListReturnType<StructureMessageListResponse>>();
            try
            {
                response.Result = StructureMessageListRaw(request);
            }
            catch (Exception ex)
            {
                response.Exception = new BusinessLayerException(ex.Message, ex);
            }

            return response;
        }

        public BaseListReturnType<StructureMessageListResponse> StructureMessageListRaw(StructureMessageListRequest request)
        {
            var idUser = _globalDataService.GetVariable<string>(ApplicationConstant.IDUSER);
            var idTenant = _globalDataService.GetVariable<string>(ApplicationConstant.IDTENANT);

            BaseListReturnType<StructureMessageListResponse> response = new BaseListReturnType<StructureMessageListResponse>();
            response.EntityList = new List<StructureMessageListResponse>();

            List<StructureMessage> structures = new List<StructureMessage>();

            if (_globalDataService.HasPermission(PermissionsConstant.GET_ALL_STRUCTURES))
            {
                Expression<Func<StructureMessage, bool>> query = x => x.MessageContent != null;

                if (!String.IsNullOrEmpty(request.IdStructure))
                {
                    query = query.CombineWithAndAlso(x => x.IdStructure == request.IdStructure);
                }

                var list = _unitOfWork.StructureMessageDao.GetListCustom<DateTime?>(request.PageSize, request.PageIndex,
                    query,
                    o => o.DateAdded,
                    new List<string>() {
                        "IdStructureNavigation",
                        "IdPersonNavigation",
                    }
                );

                response.TotalCount = list.TotalCount;
                structures = list.EntityList;
            }
            else
            {
                Expression<Func<StructureMessage, bool>> query = x => x.MessageContent != null && x.IdStructure == request.IdStructure && x.IdStructureNavigation.UserStructures.Where(u => u.IdUser == idUser).Count() > 0;

                var list = _unitOfWork.StructureMessageDao.GetListCustom<DateTime?>(request.PageSize, request.PageIndex,
                    query,
                    o => o.DateAdded,
                    new List<string>() {
                        "IdStructureNavigation.UserStructures",
                        "IdPersonNavigation"
                    }
                );
                response.TotalCount = list.TotalCount;
                structures = list.EntityList;
            }

            structures.ForEach(s =>
            {
                StructureMessageListResponse structureMessageListResponse = new StructureMessageListResponse();

                structureMessageListResponse.EntityName = s.IdPersonNavigation?.Firstname;
                structureMessageListResponse.DateAdded = s.DateAdded;
                structureMessageListResponse.Email = s.Email;
                structureMessageListResponse.MainPhoneNumber = s.Phone;
                structureMessageListResponse.StructureMessageReference = s.IdStructureMessage;
                structureMessageListResponse.MessageContent = s.MessageContent;
                structureMessageListResponse.IsRead = s.IsRead ?? false;

                response.EntityList.Add(structureMessageListResponse);

            });


            return response;
        }


        public BusinessResponse<ManipulateMessageReadStateResponse> ManipulateMessageReadState(ManipulateMessageReadStateRequest request)
        {
            BusinessResponse<ManipulateMessageReadStateResponse> response = new BusinessResponse<ManipulateMessageReadStateResponse>();
            try
            {
                response.Result = ManipulateMessageReadStateRaw(request);
            }
            catch (Exception ex)
            {
                response.Exception = new BusinessLayerException(ex.Message, ex);
            }

            return response;
        }

        public ManipulateMessageReadStateResponse ManipulateMessageReadStateRaw(ManipulateMessageReadStateRequest request)
        {
            var idUser = _globalDataService.GetVariable<string>(ApplicationConstant.IDUSER);
            var idTenant = _globalDataService.GetVariable<string>(ApplicationConstant.IDTENANT);

            ManipulateMessageReadStateResponse response = new ManipulateMessageReadStateResponse();

            StructureMessage structureMessage = null;

            if (_globalDataService.HasPermission(PermissionsConstant.GET_ALL_STRUCTURES))
            {
                Expression<Func<StructureMessage, bool>> query = x => x.IdStructureMessage == request.IdMessageReference;

                structureMessage = _unitOfWork.StructureMessageDao.GetCustom(query, new List<string>() {  });
            }
            else
            {
                Expression<Func<StructureMessage, bool>> query = x => x.MessageContent != null && x.IdStructureMessage == request.IdMessageReference && x.IdStructureNavigation.UserStructures.Where(u => u.IdUser == idUser).Count() > 0;

                structureMessage = _unitOfWork.StructureMessageDao.GetCustom(query, new List<string>() { "IdStructureNavigation.UserStructures" });
            }

            if(structureMessage == null)
            {
                throw new Exception("The requested message not found or you don't have permission to access it.");
            }

            if (request.IsRead)
            {
                structureMessage.IsRead = true;
            }
            else
            {
                structureMessage.IsRead = false;
            }

            _unitOfWork.Save();

            return response;
        }
    }
}
