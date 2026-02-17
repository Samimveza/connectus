using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Model;

public partial class AspNetUserClaim
{
    public AspNetUserClaim(int id)
    {
        this.Id = id;
    }

    public AspNetUserClaim()
    {
    }
}
