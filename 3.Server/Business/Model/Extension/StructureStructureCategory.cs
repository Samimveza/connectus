using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Model;

public partial class StructureStructureCategory
{
    public StructureStructureCategory(string idStructureStructureCategory)
    {
        this.IdStructureStructureCategory = idStructureStructureCategory;
    }

    public StructureStructureCategory()
    {
        this.IdStructureStructureCategory = Guid.NewGuid().ToString();
    }
} 