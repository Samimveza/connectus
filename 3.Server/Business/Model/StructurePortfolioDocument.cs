using System;
using System.Collections.Generic;

namespace Business.Model;

public partial class StructurePortfolioDocument
{
    public string IdStructurePortfolioDocument { get; set; } = null!;

    public string? IdStructurePortfolio { get; set; }

    public string? IdDocument { get; set; }

    public int? DisplayOrder { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public virtual Document? IdDocumentNavigation { get; set; }

    public virtual StructurePortfolio? IdStructurePortfolioNavigation { get; set; }
}
