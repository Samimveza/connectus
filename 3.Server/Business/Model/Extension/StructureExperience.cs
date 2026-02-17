using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Model;

public partial class StructureExperience
{
    public StructureExperience(string idStructureExperience)
    {
        this.IdStructureExperience = idStructureExperience;
    }

    public StructureExperience()
    {
        this.IdStructureExperience = Guid.NewGuid().ToString();
    }
}
