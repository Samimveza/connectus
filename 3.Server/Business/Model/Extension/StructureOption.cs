using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Model;

public partial class StructureOption
{
    public StructureOption(string idStructureOption)
    {
        this.IdStructureOption = idStructureOption;
    }

    public StructureOption()
    {
        this.IdStructureOption = Guid.NewGuid().ToString();
    }
}
