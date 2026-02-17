using System;
using System.Collections.Generic;

namespace Business.Model;

public partial class StructureExperience
{
    public string IdStructureExperience { get; set; } = null!;

    public string? IdStructure { get; set; }

    public string? Title { get; set; }

    public string? EmploymentType { get; set; }

    public string? Company { get; set; }

    public DateTime? StartDate { get; set; }

    public DateTime? EndDate { get; set; }

    public string? Location { get; set; }

    public string? Description { get; set; }

    public string? Headline { get; set; }

    public virtual Structure? IdStructureNavigation { get; set; }

    public virtual ICollection<StructureExperienceMedium> StructureExperienceMedia { get; set; } = new List<StructureExperienceMedium>();

    public virtual ICollection<StructureExperienceSkill> StructureExperienceSkills { get; set; } = new List<StructureExperienceSkill>();
}
