using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Model;

public partial class StructureEducation
{
    public StructureEducation(string idStructureEducation)
    {
        this.IdStructureEducation = idStructureEducation;
    }

    public StructureEducation()
    {
        this.IdStructureEducation = Guid.NewGuid().ToString();
    }
}
