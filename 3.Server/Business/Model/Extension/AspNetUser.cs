using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Model;

public partial class AspNetUser
{
    public AspNetUser(string id)
    {
        this.Id = id;
    }

    public AspNetUser()
    {
        this.Id = Guid.NewGuid().ToString();
    }
}
