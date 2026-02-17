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
using Business.Dto.Request.ListOfValues;
namespace Service.Extension
{
    public class ListOfValuesService : IListOfValuesService
    {
        public IUnitOfWork _unitOfWork;
        private readonly IGlobalDataService _globalDataService;
        private readonly IntegrationGatewayResolver _integrationGatewayResolver;
        private readonly IConfiguration _configuration;


        public ListOfValuesService(
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

        //public BusinessResponse<BaseListReturnType<StructureFieldListResponse>> GetStructureFieldList(StructureFieldListRequest request)
        //{
        //    BusinessResponse<BaseListReturnType<StructureFieldListResponse>> response = new BusinessResponse<BaseListReturnType<StructureFieldListResponse>>();
        //    try
        //    {
        //        response.Result = GetStructureFieldListRaw(request);
        //    }
        //    catch (Exception ex)
        //    {
        //        response.Exception = new BusinessLayerException(ex.Message, ex);
        //    }

        //    return response;
        //}

        //public BaseListReturnType<StructureFieldListResponse> GetStructureFieldListRaw(StructureFieldListRequest request)
        //{
        //    var idUser = _globalDataService.GetVariable<string>(ApplicationConstant.IDUSER);
        //    var idTenant = _globalDataService.GetVariable<string>(ApplicationConstant.IDTENANT);

        //    BaseListReturnType<StructureFieldListResponse> response = new BaseListReturnType<StructureFieldListResponse>();
        //    response.EntityList = new List<StructureFieldListResponse>();

        //    var structureFields = _unitOfWork.StructureFieldDao.GetListCustom<string>(request.PageSize, request.PageIndex,
        //             s => s.IdStructureField != null,
        //             o => o.StructureFieldCategory,
        //             new List<string>() {
        //             }
        //             );
        //    structureFields.EntityList.ForEach(s =>
        //    {
        //        StructureFieldListResponse structureFieldListResponse = new StructureFieldListResponse()
        //        {
        //            Icon = s.Icon,
        //            IdStructureField = s.IdStructureField,
        //            IsPopular = s.IsPopular ?? false,
        //            Name    = s.Name,
        //            Prefix = s.Prefix   ,
        //            StructureFieldCategory = s.StructureFieldCategory,
        //            StructureFieldType = s.StructureFieldType
        //        };
                
        //        response.EntityList.Add(structureFieldListResponse);

        //    });

        //    response.TotalCount = structureFields.TotalCount;

        //    return response;
        //}



    }
}
