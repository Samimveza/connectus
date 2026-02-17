using System;
using System.Collections.Generic;

namespace Business.Model;

public partial class StructureStructureCategory
{
    public string IdStructureStructureCategory { get; set; } = null!;

    public string? IdStructure { get; set; }

    public string? IdStructureCategory { get; set; }

    public bool? IsPrimary { get; set; }

    public virtual StructureCategory? IdStructureCategoryNavigation { get; set; }

    public virtual Structure? IdStructureNavigation { get; set; }
}
