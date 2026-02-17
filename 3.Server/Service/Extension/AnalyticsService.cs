using Azure.Core;
using Business.Common;
using Business.Dto.Request;
using Business.Dto.Response;
using Data.Interfaces;
using Microsoft.Extensions.Configuration;
using Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Extension
{
    public class AnalyticsService : IAnalyticsService
    {
        public IUnitOfWork _unitOfWork;
        private readonly IGlobalDataService _globalDataService;
        private readonly IPermissionService _permissionService;
        private readonly IConfiguration _configuration;

        public AnalyticsService(
                        IUnitOfWork unitOfWork
                         , IGlobalDataService globalDataService
                         , IPermissionService permissionService
                       , IConfiguration configuration

                       )
        {
            _unitOfWork = unitOfWork;
            _globalDataService = globalDataService;
            _configuration = configuration;
        }

        public BusinessResponse<GetAllSlugsResponse> GetAllSlugs()
        {
            BusinessResponse<GetAllSlugsResponse> response = new BusinessResponse<GetAllSlugsResponse>();
            try
            {
                response.Result = GetAllSlugsRaw();
            }
            catch (Exception ex)
            {
                response.Exception = new BusinessLayerException(ex.Message, ex);
            }

            return response;
        }



        public GetAllSlugsResponse GetAllSlugsRaw()
        {
            GetAllSlugsResponse getAllSlugsResponse = new GetAllSlugsResponse();

            getAllSlugsResponse.Slugs = _unitOfWork.StructureDao.GetListCustom<DateTime?>(-1, 0, s => s.Slug != null, s => s.DateCreated).EntityList.Select(s => s.Slug).ToList();

            return getAllSlugsResponse;
        }
    }

}
