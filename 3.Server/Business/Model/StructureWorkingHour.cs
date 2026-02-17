using System;
using System.Collections.Generic;

namespace Business.Model;

public partial class StructureWorkingHour
{
    public string IdStructureWorkingHour { get; set; } = null!;

    public string? IdStructure { get; set; }

    public string? SpecialNotes { get; set; }

    public bool? Show24Hours { get; set; }

    public DateTime? LastUpdated { get; set; }

    public virtual Structure? IdStructureNavigation { get; set; }

    public virtual ICollection<StructureWorkingHourDay> StructureWorkingHourDays { get; set; } = new List<StructureWorkingHourDay>();
}
