using System;
using System.Collections.Generic;

namespace Business.Model;

public partial class StructureProduct
{
    public string IdStructureProduct { get; set; } = null!;

    public string? IdStructure { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public string? Sku { get; set; }

    public bool? IsFeaturedOnFront { get; set; }

    public string? ShortDescription { get; set; }

    public string? IdStructureAttrribute { get; set; }

    public double? BasePrice { get; set; }

    public bool? IsDeactivated { get; set; }

    public virtual StructureAttrribute? IdStructureAttrributeNavigation { get; set; }

    public virtual Structure? IdStructureNavigation { get; set; }

    public virtual ICollection<StructureProductDocument> StructureProductDocuments { get; set; } = new List<StructureProductDocument>();

    public virtual ICollection<StructureProductShopProductCategory> StructureProductShopProductCategories { get; set; } = new List<StructureProductShopProductCategory>();

    public virtual ICollection<StructureProductStructureOptionDetail> StructureProductStructureOptionDetails { get; set; } = new List<StructureProductStructureOptionDetail>();

    public virtual ICollection<StructureProductStructureProductAttrributeDetail> StructureProductStructureProductAttrributeDetails { get; set; } = new List<StructureProductStructureProductAttrributeDetail>();

    public virtual ICollection<StructureTransactionDetail> StructureTransactionDetails { get; set; } = new List<StructureTransactionDetail>();
}
