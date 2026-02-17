using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Data.Interfaces;
using System.Security.Principal;
using static Business.Enums.Constants;
using System.Text.Json.Serialization;
using System.Net.Http.Json;
using Business.Common;
using Service.Interfaces;
using Business.Model;

namespace PublicApi.Authorization;

public class SessionRequirementAttribute : TypeFilterAttribute
{
    public SessionRequirementAttribute(params string[] permissions) : base(typeof(SessionRequirementFilter))
    {
        Arguments = new object[] { permissions };
    }
}

public class SessionRequirementFilter : IAuthorizationFilter
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly string[] _permissions;
    private readonly IEnumerable<Claim> _claims;

    private readonly IGlobalDataService _globalDataService;
    public IUnitOfWork _unitOfWork;

    public SessionRequirementFilter(IHttpContextAccessor httpContextAccessor, IUnitOfWork unitOfWork, IGlobalDataService globalDataService, string[] permissions)
    {
        _httpContextAccessor = httpContextAccessor;
        _permissions = permissions;
        _globalDataService = globalDataService;
        _unitOfWork = unitOfWork;
        _claims = _httpContextAccessor.HttpContext.User.Claims;

        GetBasicVariables();
    }

    public void GetBasicVariables()
    {

    }

    public void OnAuthorization(AuthorizationFilterContext context)
    {

        if (_httpContextAccessor.HttpContext.User.Identity is ClaimsIdentity identity)
        {
            var username = identity.FindFirst(ClaimTypes.Name).Value;
            if (username == null)
            {
                context.Result = new UnauthorizedObjectResult(string.Empty);
                return;
            }

            var user = _unitOfWork.AspNetUserDao.GetCustom(u => u.UserName == username , new List<string>() { "Roles", "Roles.RolePermissions", "Roles.RolePermissions.IdPermissionNavigation" , "IdTenantNavigation" });
            if (user == null)
            {
                context.Result = new UnauthorizedObjectResult(string.Empty);
                return;
            }

            List<string> permissions = user.Roles.SelectMany(x => x.RolePermissions.Select(p => p.IdPermissionNavigation.Code).ToList()).ToList();
            List<string> permissions_ids = user.Roles.SelectMany(x => x.RolePermissions.Select(p => p.IdPermissionNavigation.IdPermission).ToList()).ToList();

            List<string> roles = user.Roles.Select(r => r.Name).ToList();
            List<string> roles_id = user.Roles.Select(r => r.Id).ToList();

            _globalDataService.SetVariable<List<string>>(ApplicationConstant.PERMISSIONS, permissions);
            _globalDataService.SetVariable<List<string>>(ApplicationConstant.PERMISSIONS_ID, permissions_ids);

            _globalDataService.SetVariable<string>(ApplicationConstant.IDUSER, user.Id);

            _globalDataService.SetVariable<List<string>>(ApplicationConstant.ROLES, roles);
            _globalDataService.SetVariable<List<string>>(ApplicationConstant.ROLES_ID, roles_id);

            _globalDataService.SetVariable<string>(ApplicationConstant.IDTENANT, user.IdTenant);
            _globalDataService.SetVariable(ApplicationConstant.DOMAIN, user.IdTenantNavigation?.Domain);
        }

        //if (!_httpContextAccessor.HttpContext!.Request.Headers["X-Session-Id"].Any())
        //{
        //    context.Result = new UnauthorizedObjectResult(string.Empty);
        //    return;
        //}

        //get user permissions

    }
}