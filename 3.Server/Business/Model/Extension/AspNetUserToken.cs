using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Model;

public partial class AspNetUserToken
{
    public AspNetUserToken(string userId, string loginProvider, string name)
    {
        this.UserId = userId;
        this.LoginProvider = loginProvider;
        this.Name = name;
    }

    public AspNetUserToken()
    {
    }
}
