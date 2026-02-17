using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Model;

public partial class StructureStructureTag
{
    public StructureStructureTag(string idStructureStructureTag)
    {
        this.IdStructureStructureTag = idStructureStructureTag;
    }

    public StructureStructureTag()
    {
        this.IdStructureStructureTag = Guid.NewGuid().ToString();
    }
} 