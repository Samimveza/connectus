using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Model;

public partial class StructureEducationSkill
{
    public StructureEducationSkill(string idStructureEducationSkill)
    {
        this.IdStructureEducationSkill = idStructureEducationSkill;
    }

    public StructureEducationSkill()
    {
        this.IdStructureEducationSkill = Guid.NewGuid().ToString();
    }
}
