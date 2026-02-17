using System;
using System.Collections.Generic;

namespace Business.Model;

public partial class StructurePortfolio
{
    public string IdStructurePortfolio { get; set; } = null!;

    public string? IdStructure { get; set; }

    public string? IdMainDocument { get; set; }

    public int? DisplayOrder { get; set; }

    public string? Description { get; set; }

    public string? Name { get; set; }

    public string? Slug { get; set; }

    public virtual Document? IdMainDocumentNavigation { get; set; }

    public virtual Structure? IdStructureNavigation { get; set; }

    public virtual ICollection<StructurePortfolioDocument> StructurePortfolioDocuments { get; set; } = new List<StructurePortfolioDocument>();
}
