using System;
using System.Collections.Generic;

namespace Business.Model;

public partial class StructureStructureTag
{
    public string IdStructureStructureTag { get; set; } = null!;

    public string? IdStructure { get; set; }

    public string? IdStructureTag { get; set; }

    public int? DisplayOrder { get; set; }

    public string? Color { get; set; }

    public virtual Structure? IdStructureNavigation { get; set; }

    public virtual StructureTag? IdStructureTagNavigation { get; set; }
}
