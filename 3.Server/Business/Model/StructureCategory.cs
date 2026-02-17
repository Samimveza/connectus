using System;
using System.Collections.Generic;

namespace Business.Model;

public partial class StructureCategory
{
    public string IdStructureCategory { get; set; } = null!;

    public string? Name { get; set; }

    public string? IdParentStructureCategory { get; set; }

    public string? Color { get; set; }

    public string? IdDocument { get; set; }

    public string? Slug { get; set; }

    public string? SvgIcon { get; set; }

    public virtual Document? IdDocumentNavigation { get; set; }

    public virtual StructureCategory? IdParentStructureCategoryNavigation { get; set; }

    public virtual ICollection<StructureCategory> InverseIdParentStructureCategoryNavigation { get; set; } = new List<StructureCategory>();

    public virtual ICollection<StructureStructureCategory> StructureStructureCategories { get; set; } = new List<StructureStructureCategory>();
}
