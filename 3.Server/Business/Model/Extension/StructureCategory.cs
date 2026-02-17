using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Model;

public partial class StructureCategory
{
    public StructureCategory(string idStructureCategory)
    {
        this.IdStructureCategory = idStructureCategory;
    }

    public StructureCategory()
    {
        this.IdStructureCategory = Guid.NewGuid().ToString();
    }
}
