using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Model;

public partial class Permission
{
    public Permission(string idPermission)
    {
        this.IdPermission = idPermission;
    }

    public Permission()
    {
        this.IdPermission = Guid.NewGuid().ToString();
    }
}
