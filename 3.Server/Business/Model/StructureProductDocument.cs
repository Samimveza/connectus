using System;
using System.Collections.Generic;

namespace Business.Model;

public partial class StructureProductDocument
{
    public string IdStructureProductDocument { get; set; } = null!;

    public string? IdStructureProduct { get; set; }

    public string? IdDocument { get; set; }

    public bool? IsPrimary { get; set; }

    public int? DisplayOrder { get; set; }

    public virtual Document? IdDocumentNavigation { get; set; }

    public virtual StructureProduct? IdStructureProductNavigation { get; set; }
}
