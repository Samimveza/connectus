using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Model;


public partial class StructureAddress
{
    public StructureAddress(string idStructureAddress)
    {
        this.IdStructureAddress = idStructureAddress;
    }

    public StructureAddress()
    {
        this.IdStructureAddress = Guid.NewGuid().ToString();
    }
}
