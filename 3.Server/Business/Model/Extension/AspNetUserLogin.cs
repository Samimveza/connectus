using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Model;

public partial class AspNetUserLogin
{
    public AspNetUserLogin(string loginProvider, string providerKey, string userId)
    {
        this.LoginProvider = loginProvider;
        this.ProviderKey = providerKey;
        this.UserId = userId;
    }

    public AspNetUserLogin()
    {
    }
}
