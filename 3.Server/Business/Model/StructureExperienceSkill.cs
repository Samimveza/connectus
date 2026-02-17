using System;
using System.Collections.Generic;

namespace Business.Model;

public partial class StructureExperienceSkill
{
    public string IdStructureExperienceSkill { get; set; } = null!;

    public string? Name { get; set; }

    public string? IdStructureExperience { get; set; }

    public virtual StructureExperience? IdStructureExperienceNavigation { get; set; }
}
