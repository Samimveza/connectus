using Business.Common;
using Business.Dto.Request;
using Business.Dto.Response;
using Business.Model;
using Data.Interfaces;
using Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Business.Enums.Constants;

namespace Service.Log;



public class LogService : Service.Interfaces.ILogService
{

    public IUnitOfWork _unitOfWork;
    private readonly IGlobalDataService _globalDataService;

    public LogService(
         IUnitOfWork unitOfWork,
          IGlobalDataService globalDataService
        )
    {
        _unitOfWork = unitOfWork;
        _globalDataService = globalDataService;
    }

    public BusinessResponse<BaseListReturnType<LogListResponse>> LogList(LogListRequest request, string entityname)
    {
        BusinessResponse<BaseListReturnType<LogListResponse>> response = new BusinessResponse<BaseListReturnType<LogListResponse>>();
        try
        {
            response.Result = LogListRaw(request, entityname);
        }
        catch (Exception ex)
        {
            response.Exception = new BusinessLayerException(ex.Message, ex);
        }

        return response;
    }


    public BaseListReturnType<LogListResponse> LogListRaw(LogListRequest request, string entityname)
    {
        var idUser = _globalDataService.GetVariable<string>(ApplicationConstant.IDUSER);
        var idTenant = _globalDataService.GetVariable<string>(ApplicationConstant.IDTENANT);

        BaseListReturnType<LogListResponse> response = new BaseListReturnType<LogListResponse>();
        response.EntityList = new List<LogListResponse>();

        List<Business.Model.ActionLog> structures = new List<Business.Model.ActionLog>();


        var listings = _unitOfWork.ActionLogDao.GetListCustom<DateTime?>(request.PageSize, request.PageIndex,
            s => s.IdTenant == idTenant && s.IdEntityIdentifier == request.Identifier && s.EntityName == entityname,
            o => o.Date,
            new List<string>()
            {
                "IdUserNavigation",
                "IdUserNavigation.IdPersonNavigation",
            }
        );
        response.TotalCount = listings.TotalCount;

        listings.EntityList.ForEach(s =>
        {

            LogListResponse logListResponse = new LogListResponse()
            {
                ActionDetail = s.ActionDetail,
                Date = s.Date,
                User = String.Format("{0} {1}", s.IdUserNavigation?.IdPersonNavigation?.Firstname, s.IdUserNavigation?.IdPersonNavigation?.Lastname)
            };

            response.EntityList.Add(logListResponse);

        });

        return response;
    }


    public BusinessResponse<StructureLogRegisterResponse> StructureLogRegister(StructureLogRegisterRequest request)
    {
        BusinessResponse<StructureLogRegisterResponse> response = new BusinessResponse<StructureLogRegisterResponse>();
        try
        {
            response.Result = StructureLogRegisterRaw(request);
        }
        catch (Exception ex)
        {
            response.Exception = new BusinessLayerException(ex.Message, ex);
        }

        return response;
    }


    public StructureLogRegisterResponse StructureLogRegisterRaw(StructureLogRegisterRequest request)
    {
        StructureLogRegisterResponse structureLogRegisterResponse = new StructureLogRegisterResponse();
        var date = DateTime.Now;

        var entity = _unitOfWork.StructureDao.GetCustom(s => s.Slug == request.Slug);
        if (entity != null)
        {
            ActionLog actionLog = new ActionLog()
            {
                ActionDetail = request.Source,
                Date = date,
                EntityName = "VIEW_STRUCTURE",
                IdEntityIdentifier = entity.IdStructure
            };

            _unitOfWork.ActionLogDao.Add(actionLog);
            _unitOfWork.Save();
        }

        return structureLogRegisterResponse;
    }


}
