using System;
using System.Collections.Generic;

namespace Business.Model;

public partial class StructureStructureField
{
    public string IdStructureStructureField { get; set; } = null!;

    public string? IdStructure { get; set; }

    public string? IdStructureField { get; set; }

    public string? Value { get; set; }

    public string? DisplayText { get; set; }

    public string? IdDocument { get; set; }

    public int? DisplayOrder { get; set; }

    public bool? IsStructureFieldPrivate { get; set; }

    public virtual Document? IdDocumentNavigation { get; set; }

    public virtual StructureField? IdStructureFieldNavigation { get; set; }

    public virtual Structure? IdStructureNavigation { get; set; }
}
