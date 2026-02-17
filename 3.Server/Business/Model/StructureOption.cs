using System;
using System.Collections.Generic;

namespace Business.Model;

public partial class StructureOption
{
    public string IdStructureOption { get; set; } = null!;

    public string? IdStructure { get; set; }

    public string? Name { get; set; }

    public bool? IsMandatory { get; set; }

    public bool? CanAllowSameMultipleTime { get; set; }

    public int? ForceMinumum { get; set; }

    public int? ForceMaximum { get; set; }

    public virtual Structure? IdStructureNavigation { get; set; }

    public virtual ICollection<StructureOptionDetail> StructureOptionDetails { get; set; } = new List<StructureOptionDetail>();
}
