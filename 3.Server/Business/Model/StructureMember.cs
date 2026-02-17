using System;
using System.Collections.Generic;

namespace Business.Model;

public partial class StructureMember
{
    public string IdStructureMember { get; set; } = null!;

    public string? IdStructure { get; set; }

    public string? IdPerson { get; set; }

    public string? Title { get; set; }

    public string? Description { get; set; }

    public string? IdDocument { get; set; }

    public int? DisplayOrder { get; set; }

    public virtual Document? IdDocumentNavigation { get; set; }

    public virtual Person? IdPersonNavigation { get; set; }

    public virtual Structure? IdStructureNavigation { get; set; }
}
