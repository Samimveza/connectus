using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Model;

public partial class RolePermission
{
    public RolePermission(string idRolePermission)
    {
        this.IdRolePermission = idRolePermission;
    }

    public RolePermission()
    {
        this.IdRolePermission = Guid.NewGuid().ToString();
    }
}
