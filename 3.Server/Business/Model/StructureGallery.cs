using System;
using System.Collections.Generic;

namespace Business.Model;

public partial class StructureGallery
{
    public string IdStructureGallery { get; set; } = null!;

    public string? IdStructure { get; set; }

    public string? IdDocument { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public bool? IsMain { get; set; }

    public bool? ShowOnSlider { get; set; }

    public int? DisplayOrder { get; set; }

    public virtual Document? IdDocumentNavigation { get; set; }

    public virtual Structure? IdStructureNavigation { get; set; }
}
