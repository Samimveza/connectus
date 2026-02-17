using System;
using System.Collections.Generic;

namespace Business.Model;

public partial class StructureAttrribute
{
    public string IdStructureAttrribute { get; set; } = null!;

    public string? IdStructure { get; set; }

    public string? Name { get; set; }

    public virtual Structure? IdStructureNavigation { get; set; }

    public virtual ICollection<StructureAttrributeDetail> StructureAttrributeDetails { get; set; } = new List<StructureAttrributeDetail>();

    public virtual ICollection<StructureProduct> StructureProducts { get; set; } = new List<StructureProduct>();
}
