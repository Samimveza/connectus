using Business.Common;
using Business.Dto.Request;
using Business.Dto.Response;
using Business.Dto.Request.Integration;
using Business.Dto.Response.Integration;
using Business.Model;
using Data.Interfaces;
using Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Business.Enums.Constants;
using Data.Source;
using Service.IntegrationGateway;
using Business.Enums;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json;
using System.Dynamic;
using Microsoft.Extensions.Configuration;
using SixLabors.ImageSharp;
using System.Linq.Expressions;
using Business.ExtensionMethod;
using Microsoft.VisualBasic;
using Constants = Business.Enums.Constants;

namespace Service.Extension
{
    public class IntegrationService : IIntegrationService
    {
        public IUnitOfWork _unitOfWork;
        private readonly IGlobalDataService _globalDataService;
        private readonly IntegrationGatewayResolver _integrationGatewayResolver;
        private readonly IConfiguration _configuration;


        public IntegrationService(
             IUnitOfWork unitOfWork,
             IGlobalDataService globalDataService,
             IntegrationGatewayResolver integrationGatewayResolver,
            IConfiguration configuration
            )
        {
            _unitOfWork = unitOfWork;
            _globalDataService = globalDataService;
            _integrationGatewayResolver = integrationGatewayResolver;
            _configuration = configuration;

        }

        public BusinessResponse<InitializeIntegrationResponse> InitializeIntegrationForUser(InitializeIntegrationRequest request)
        {
            BusinessResponse<InitializeIntegrationResponse> response = new BusinessResponse<InitializeIntegrationResponse>();
            try
            {
                response.Result = InitializeIntegrationForUserRaw(request);
            }
            catch (Exception ex)
            {
                response.Exception = new BusinessLayerException(ex.Message, ex);
            }

            return response;
        }

        public InitializeIntegrationResponse InitializeIntegrationForUserRaw(InitializeIntegrationRequest request)
        {
            InitializeIntegrationResponse response = new InitializeIntegrationResponse();
            var idTenant = _globalDataService.GetVariable<string>(ApplicationConstant.IDTENANT);

            request.IdIntegrationTypes.ForEach(idIntegrationType =>
            {
                Integration integration = new Integration()
                {
                    IdIntegrationType = idIntegrationType,
                    DateAdded = DateTime.Now,
                    TokenIdentifier = request.TokenIdentifier,
                    IdUser = request.IdUser,
                    IdIntegrationState = IntegrationStateConstant.PENDING_INITIALIZATION,
                    IdTenant = idTenant,
                };
                _unitOfWork.IntegrationDao.Add(integration);
            });
            _unitOfWork.Save();
            // Add your business logic here
            response.Result = true;

            return response;
        }

        public async Task<BusinessResponse<ProcessInitializationResponse>> ProcessInitializationAsync(ProcessInitializationRequest request)
        {
            BusinessResponse<ProcessInitializationResponse> response = new BusinessResponse<ProcessInitializationResponse>();
            try
            {
                response.Result = await ProcessInitializationRawAsync(request);
            }
            catch (Exception ex)
            {
                response.Exception = new BusinessLayerException(ex.Message, ex);
            }

            return response;
        }

        public async Task<ProcessInitializationResponse> ProcessInitializationRawAsync(ProcessInitializationRequest request)
        {
            ProcessInitializationResponse response = new ProcessInitializationResponse();
            //var idTenant = _globalDataService.GetVariable<string>(ApplicationConstant.IDTENANT);

            List<string> integrations = _unitOfWork.IntegrationDao.GetListCustom(-1, 0, i => i.IdIntegrationState == IntegrationStateConstant.PENDING_INITIALIZATION, i => i.IdIntegration).EntityList.Select(i => i.IdIntegration).ToList();

            foreach (var integration in integrations)
            {
                Dictionary<string, string> parameters = new Dictionary<string, string>();
                var integrationGateway = await _integrationGatewayResolver.ResolveAndInitialize(integration, parameters);
            }

            // Add your business logic here
            response.Result = true;



            return response;
        }


        public BusinessResponse<BaseListReturnType<IntegrationTypeListResponse>> IntegrationTypeList(IntegrationTypeListRequest request)
        {
            BusinessResponse<BaseListReturnType<IntegrationTypeListResponse>> response = new BusinessResponse<BaseListReturnType<IntegrationTypeListResponse>>();
            try
            {
                response.Result = IntegrationTypeListRaw(request);
            }
            catch (Exception ex)
            {
                response.Exception = new BusinessLayerException(ex.Message, ex);
            }

            return response;
        }

        public BaseListReturnType<IntegrationTypeListResponse> IntegrationTypeListRaw(IntegrationTypeListRequest request)
        {
            var idUser = _globalDataService.GetVariable<string>(ApplicationConstant.IDUSER);
            var idTenant = _globalDataService.GetVariable<string>(ApplicationConstant.IDTENANT);

            BaseListReturnType<IntegrationTypeListResponse> response = new BaseListReturnType<IntegrationTypeListResponse>();
            response.EntityList = new List<IntegrationTypeListResponse>();

            var integrationTypes = _unitOfWork.IntegrationTypeDao.GetListCustom<string>(request.PageSize, request.PageIndex,
                     s => s.IdIntegrationType != null,
                     o => o.Name,
                     new List<string>() {
                        "IdDocumentNavigation.IdParameterBaseServerUrlNavigation",
                     }
                     );
            integrationTypes.EntityList.ForEach(s =>
            {
                IntegrationTypeListResponse integrationTypeListResponse = new IntegrationTypeListResponse()
                {
                    Image = String.Format("{0}/{1}", s?.IdDocumentNavigation?.IdParameterBaseServerUrlNavigation?.ParamaterValue, s?.IdDocumentNavigation?.ServerFilePath),
                    Name = s.Name,
                    Description = s.Description,
                    IdIntegrationType = s.IdIntegrationType,
                };

                response.EntityList.Add(integrationTypeListResponse);

            });

            List<string> idIntegrationTypes = integrationTypes.EntityList.Select(i => i.IdIntegrationType).ToList();

            var integrations = _unitOfWork.IntegrationDao.GetListCustom<string>(-1, 0,
                                    s => idIntegrationTypes.Contains(s.IdIntegrationType) && s.IdTenant == idTenant && s.IdUser == idUser,
                                                       o => o.IdIntegration, new List<string>() { }
                                   );

            response.EntityList.ForEach(i =>
            {
                var integration = integrations.EntityList.Where(j => j.IdIntegrationType == i.IdIntegrationType).FirstOrDefault();
                i.IdIntegrationState = integration?.IdIntegrationState;
                i.IntegrationState = i?.IdIntegrationState != null ? Constants.IntegrationStateConstant.ToConstant(i.IdIntegrationState) : Constants.IntegrationStateConstant.ToConstant(Constants.IntegrationStateConstant.PENDING_INITIALIZATION);
            });

            response.TotalCount = integrationTypes.TotalCount;

            return response;
        }

        public BusinessResponse<BaseListReturnType<IntegrationDetailListResponse>> IntegrationDetailList(IntegrationDetailListRequest request)
        {
            BusinessResponse<BaseListReturnType<IntegrationDetailListResponse>> response = new BusinessResponse<BaseListReturnType<IntegrationDetailListResponse>>();
            try
            {
                response.Result = IntegrationDetailListRaw(request);
            }
            catch (Exception ex)
            {
                response.Exception = new BusinessLayerException(ex.Message, ex);
            }

            return response;
        }

        public BaseListReturnType<IntegrationDetailListResponse> IntegrationDetailListRaw(IntegrationDetailListRequest request)
        {
            var idUser = _globalDataService.GetVariable<string>(ApplicationConstant.IDUSER);
            var idTenant = _globalDataService.GetVariable<string>(ApplicationConstant.IDTENANT);

            BaseListReturnType<IntegrationDetailListResponse> response = new BaseListReturnType<IntegrationDetailListResponse>();
            response.EntityList = new List<IntegrationDetailListResponse>();

            Expression<Func<Business.Model.IntegrationDetail, bool>> expression = s => s.IdIntegrationNavigation.IdIntegrationType == request.IdIntegrationType != null && s.IdIntegrationNavigation.IdUser == idUser;

            if (!String.IsNullOrEmpty(request.Search))
            {
                expression = expression.CombineWithAndAlso(s => s.Name.Contains(request.Search));
            }

            var integrationTypes = _unitOfWork.IntegrationDetailDao.GetListCustom<DateTime?>(request.PageSize, request.PageIndex,
                     expression,
                     o => o.DateAdded,
                     new List<string>() {
                         "IdIntegrationNavigation",
                         "IntegrationDetailActions",
                         "IntegrationDetailActions.IdIntegrationDetailActionTypeNavigation"
                     },
                        request.SortByDesc
                     );
            var downloadEndpoint = _configuration["IntegrationDetails:DownloadEndpoint"];

            integrationTypes.EntityList.ForEach(s =>
            {
                IntegrationDetailListResponse integrationDetailListResponse = new IntegrationDetailListResponse()
                {
                    DateAdded = s.DateAdded,
                    Description = s.Description,
                    IdIntegrationDetail = s.IdIntegrationDetail,
                    Name = s.Name,
                    State = s.ExternalState,
                    Actions = new List<IntegrationDetailListActionResponse>()
                    {

                    }
                };

                s.IntegrationDetailActions.ToList().ForEach(sa =>
                {
                    IntegrationDetailListActionResponse integrationDetailListActionResponse = new IntegrationDetailListActionResponse();
                    var expandoConverter = new ExpandoObjectConverter();
                    dynamic obj = JsonConvert.DeserializeObject<ExpandoObject>(sa.Parameter, expandoConverter);
                    var dict = obj as IDictionary<string, object>;


                    integrationDetailListActionResponse.IdActionType = sa.IdIntegrationDetailActionType;
                    integrationDetailListActionResponse.Name = sa.Name;

                    if (dict.ContainsKey("Url") && dict["Url"] != null)
                    {
                        integrationDetailListActionResponse.Url = dict["Url"].ToString();
                    }
                    else if (dict.ContainsKey("IdDocument") && dict["IdDocument"] != null)
                    {
                        integrationDetailListActionResponse.Url = string.Format("{0}/{1}", downloadEndpoint, sa.IdIntegrationDetailAction);
                    }

                    integrationDetailListResponse.Actions.Add(integrationDetailListActionResponse);

                });

                response.EntityList.Add(integrationDetailListResponse);

            });

            response.EntityList.ForEach(i =>
            {
            });

            response.TotalCount = integrationTypes.TotalCount;

            return response;
        }


        public BusinessResponse<IntegrationDownloadFileResponse> DownloadIntegrationFile(string idDocument)
        {
            BusinessResponse<IntegrationDownloadFileResponse> response = new BusinessResponse<IntegrationDownloadFileResponse>();
            try
            {
                response.Result = GetFileRaw(idDocument);
            }
            catch (Exception ex)
            {
                response.Exception = new BusinessLayerException(ex.Message, ex);
            }

            return response;
        }

        public IntegrationDownloadFileResponse GetFileRaw(string idIntegrationDetail)
        {
            var getFileResponse = _integrationGatewayResolver.DownloadFile(idIntegrationDetail);

            return getFileResponse;
        }
    }
}