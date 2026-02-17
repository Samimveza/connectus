using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Model;


public partial class UserStructure
{
    public UserStructure(string idUserStructure)
    {
        this.IdUserStructure = idUserStructure;
    }

    public UserStructure()
    {
        this.IdUserStructure = Guid.NewGuid().ToString();
    }
}
