using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Model;

public partial class StructureExperienceSkill
{
    public StructureExperienceSkill(string idStructureExperienceSkill)
    {
        this.IdStructureExperienceSkill = idStructureExperienceSkill;
    }

    public StructureExperienceSkill()
    {
        this.IdStructureExperienceSkill = Guid.NewGuid().ToString();
    }
}
