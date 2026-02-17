using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Model;

public partial class StructureField
{
    public StructureField(string idStructureField)
    {
        this.IdStructureField = idStructureField;
    }

    public StructureField()
    {
        this.IdStructureField = Guid.NewGuid().ToString();
    }
}
