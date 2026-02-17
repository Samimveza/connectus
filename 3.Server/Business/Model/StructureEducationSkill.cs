using System;
using System.Collections.Generic;

namespace Business.Model;

public partial class StructureEducationSkill
{
    public string IdStructureEducationSkill { get; set; } = null!;

    public string? Name { get; set; }

    public string? IdStructureEducation { get; set; }

    public virtual StructureEducation? IdStructureEducationNavigation { get; set; }
}
