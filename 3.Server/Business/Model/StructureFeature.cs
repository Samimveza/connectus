using System;
using System.Collections.Generic;

namespace Business.Model;

public partial class StructureFeature
{
    public string IdStructureFeature { get; set; } = null!;

    public string? IdStructure { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public int? DisplayOrder { get; set; }

    public virtual Structure? IdStructureNavigation { get; set; }
}
