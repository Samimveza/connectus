using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Model;

public partial class StructureAttrribute
{
    public StructureAttrribute(string idStructureAttrribute)
    {
        this.IdStructureAttrribute = idStructureAttrribute;
    }

    public StructureAttrribute()
    {
        this.IdStructureAttrribute = Guid.NewGuid().ToString();
    }
}
