using System;
using System.Collections.Generic;

namespace Business.Model;

public partial class Shop
{
    public string IdShop { get; set; } = null!;

    public double? ShopShippingPrice { get; set; }

    public string? IdTenant { get; set; }

    public virtual Tenant? IdTenantNavigation { get; set; }

    public virtual ICollection<Structure> Structures { get; set; } = new List<Structure>();
}
