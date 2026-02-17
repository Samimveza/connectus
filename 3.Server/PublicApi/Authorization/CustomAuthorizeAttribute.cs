using Microsoft.AspNetCore.Mvc.Filters;
using System.Security.Claims;

namespace PublicApi.Authorization
{
    public sealed class CustomAuthorizeAttribute : Attribute, IAuthorizationFilter
    {
        public CustomAuthorizeAttribute()
        {
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            if (context != null)
            {
                // Auth logic
            }
        }
    }
}
