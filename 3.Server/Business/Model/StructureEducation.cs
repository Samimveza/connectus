using System;
using System.Collections.Generic;

namespace Business.Model;

public partial class StructureEducation
{
    public string IdStructureEducation { get; set; } = null!;

    public string? IdStructure { get; set; }

    public string? School { get; set; }

    public string? Degree { get; set; }

    public string? FieldOfStudy { get; set; }

    public DateTime? StartDate { get; set; }

    public DateTime? EndDate { get; set; }

    public string? Grade { get; set; }

    public string? Description { get; set; }

    public virtual Structure? IdStructureNavigation { get; set; }

    public virtual ICollection<StructureEducationMedium> StructureEducationMedia { get; set; } = new List<StructureEducationMedium>();

    public virtual ICollection<StructureEducationSkill> StructureEducationSkills { get; set; } = new List<StructureEducationSkill>();
}
