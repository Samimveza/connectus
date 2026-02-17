using System;
using System.Collections.Generic;

namespace Business.Model;

public partial class StructureProductShopProductCategory
{
    public string IdStructureProductShopProductCategory { get; set; } = null!;

    public string? IdStructureProduct { get; set; }

    public string? IdShopProductCategory { get; set; }

    public bool? IsPrimary { get; set; }

    public virtual ShopProductCategory? IdShopProductCategoryNavigation { get; set; }

    public virtual StructureProduct? IdStructureProductNavigation { get; set; }
}
