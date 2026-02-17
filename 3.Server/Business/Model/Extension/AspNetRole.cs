using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Model;

public partial class AspNetRole
{
    public AspNetRole(string id)
    {
        this.Id = id;
    }

    public AspNetRole()
    {
        this.Id = Guid.NewGuid().ToString();
    }
}
