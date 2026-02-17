using System;
using System.Collections.Generic;

namespace Business.Model;

public partial class StructureField
{
    public string IdStructureField { get; set; } = null!;

    public string? Name { get; set; }

    public string? Icon { get; set; }

    public string? StructureFieldCategory { get; set; }

    public bool? IsPopular { get; set; }

    public string? StructureFieldType { get; set; }

    public string? Prefix { get; set; }

    public string? Placeholder { get; set; }

    public virtual ICollection<StructureStructureField> StructureStructureFields { get; set; } = new List<StructureStructureField>();
}
