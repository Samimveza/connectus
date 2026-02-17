using System;
using System.Collections.Generic;

namespace Business.Model;

public partial class TenantProduct
{
    public string IdTenantProduct { get; set; } = null!;

    public string? IdTenant { get; set; }

    public string? IdProduct { get; set; }

    public virtual Tenant? IdTenantNavigation { get; set; }
}
