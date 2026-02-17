using System;
using System.Collections.Generic;

namespace Business.Model;

public partial class StructureAccordion
{
    public string IdStructureAccordion { get; set; } = null!;

    public string? Name { get; set; }

    public string? Description { get; set; }

    public string? IdStructure { get; set; }

    public int? DisplayOrder { get; set; }

    public virtual Structure? IdStructureNavigation { get; set; }
}
