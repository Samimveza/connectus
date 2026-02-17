using Business.Common;
using Business.Dto.Request;
using Business.Dto.Response;
using Business.Enums;
using Business.Model;
using Data.Interfaces;
using Service.Interfaces;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Security.Policy;
using System.Text;
using System.Threading.Tasks;
using static Business.Enums.Constants;

namespace Service.Common
{
    public class PermissionService : Service.Interfaces.IPermissionService
    {
        public IUnitOfWork _unitOfWork;
        private readonly IGlobalDataService _globalDataService;

        public PermissionService(
             IUnitOfWork unitOfWork,
              IGlobalDataService globalDataService
            )
        {
            _unitOfWork = unitOfWork;
            _globalDataService = globalDataService;
        }

        public List<AllowedActionListResponse> ActionForUser(Dictionary<string, Dictionary<string, string>> permissions)
        {
            List<AllowedActionListResponse> alllowedActions = new List<AllowedActionListResponse>();

            var idUser = _globalDataService.GetVariable<string>(ApplicationConstant.IDUSER);
            var idTenant = _globalDataService.GetVariable<string>(ApplicationConstant.IDTENANT);

            var permissionCodes = permissions.Keys.ToList();

            var permissionsObject = _unitOfWork.PermissionDao.GetListCustom(-1, 0, p => permissionCodes.Contains(p.Code), p => p.Code).EntityList;

            foreach (KeyValuePair<string, Dictionary<string, string>> pair in permissions)
            {
                var permission = permissionsObject.Where(p => p.Code == pair.Key).FirstOrDefault();
                string url = null;

                if (permission.Url != null)
                {
                    url = permission.Url;
                    foreach (KeyValuePair<string, string> replacement in pair.Value)
                    {
                        url = url.Replace(replacement.Key, replacement.Value);
                    }
                }
                if (_globalDataService.HasPermission(pair.Key))
                {
                    alllowedActions.Add(new AllowedActionListResponse()
                    {
                        ActionName = permission.Name,
                        ActionUrl = url
                    });
                }
            }

            return alllowedActions;
        }





    }
}
