using System;
using System.Collections.Generic;

namespace Business.Model;

public partial class StructureAttrributeDetail
{
    public string IdStructureAttrributeDetail { get; set; } = null!;

    public string? IdStructureAttrribute { get; set; }

    public string? Name { get; set; }

    public virtual StructureAttrribute? IdStructureAttrributeNavigation { get; set; }

    public virtual ICollection<StructureProductStructureProductAttrributeDetail> StructureProductStructureProductAttrributeDetails { get; set; } = new List<StructureProductStructureProductAttrributeDetail>();
}
