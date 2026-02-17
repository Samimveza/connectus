using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Model;

public partial class Tenant
{
    public Tenant(string idTenant)
    {
        this.IdTenant = idTenant;
    }

    public Tenant()
    {
        this.IdTenant = Guid.NewGuid().ToString();
    }
}
