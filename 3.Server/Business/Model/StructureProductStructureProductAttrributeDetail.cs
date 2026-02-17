using System;
using System.Collections.Generic;

namespace Business.Model;

public partial class StructureProductStructureProductAttrributeDetail
{
    public string IdStructureProductStructureProductAttrributeDetail { get; set; } = null!;

    public string? IdStructureProduct { get; set; }

    public string? IdStructureAttrributeDetail { get; set; }

    public string? AttributeValue { get; set; }

    public virtual StructureAttrributeDetail? IdStructureAttrributeDetailNavigation { get; set; }

    public virtual StructureProduct? IdStructureProductNavigation { get; set; }
}
