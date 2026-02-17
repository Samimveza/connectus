using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Model;

public partial class StructureType
{
    public StructureType(string idStructureType)
    {
        this.IdStructureType = idStructureType;
    }

    public StructureType()
    {
        this.IdStructureType = Guid.NewGuid().ToString();
    }
}
