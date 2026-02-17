using System;
using System.Collections.Generic;

namespace Business.Model;

public partial class ShopProductCategory
{
    public string IdShopProductCategory { get; set; } = null!;

    public string? IdParentShopProductCategory { get; set; }

    public string? IdStructure { get; set; }

    public string? Name { get; set; }

    public string? IdCoverPicture { get; set; }

    public string? Description { get; set; }

    public virtual Document? IdCoverPictureNavigation { get; set; }

    public virtual ShopProductCategory? IdParentShopProductCategoryNavigation { get; set; }

    public virtual Structure? IdStructureNavigation { get; set; }

    public virtual ICollection<ShopProductCategory> InverseIdParentShopProductCategoryNavigation { get; set; } = new List<ShopProductCategory>();

    public virtual ICollection<StructureProductShopProductCategory> StructureProductShopProductCategories { get; set; } = new List<StructureProductShopProductCategory>();
}
