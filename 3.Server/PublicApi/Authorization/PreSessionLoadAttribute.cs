using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;
using Data.Interfaces;
using Service.Interfaces;
using System.Security.Claims;
using static Business.Enums.Constants;

namespace PublicApi.Authorization;

public class PreSessionLoadAttribute : TypeFilterAttribute
{
    public PreSessionLoadAttribute() : base(typeof(PreSessionLoadFilter))
    {
    }
}

public class PreSessionLoadFilter : IAuthorizationFilter
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IGlobalDataService _globalDataService;

    public PreSessionLoadFilter(IHttpContextAccessor httpContextAccessor, IUnitOfWork unitOfWork, IGlobalDataService globalDataService)
    {
        _httpContextAccessor = httpContextAccessor;
        _unitOfWork = unitOfWork;
        _globalDataService = globalDataService;
    }

    public void OnAuthorization(AuthorizationFilterContext context)
    {
        var request = _httpContextAccessor.HttpContext.Request;
        if (request.Headers.TryGetValue("Domain", out var domainValues))
        {
            var domain = domainValues.FirstOrDefault();
            if (!string.IsNullOrEmpty(domain))
            {
                var tenant = _unitOfWork.TenantDao.GetCustom(u => u.Domain == domain, new List<string>() { });
                _globalDataService.SetVariable<string>(ApplicationConstant.IDTENANT, tenant.IdTenant);
                _globalDataService.SetVariable(ApplicationConstant.DOMAIN, domain);
            }
            else
            {
                // Domain header is missing or empty
                context.Result = new UnauthorizedObjectResult("Domain header missing.");
                return;
            }
        }
        else
        {
            // No domain header at all
            context.Result = new UnauthorizedObjectResult("Domain header missing.");
            return;
        }
    }
}
