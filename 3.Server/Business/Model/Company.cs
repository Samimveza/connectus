using System;
using System.Collections.Generic;

namespace Business.Model;

public partial class Company
{
    public string IdCompany { get; set; } = null!;

    public bool? IsDeactivated { get; set; }

    public string? IdTenant { get; set; }

    public string? Name { get; set; }

    public string? BusinessRegistrationNumber { get; set; }

    public string? Description { get; set; }

    public string? MainWebsite { get; set; }

    public virtual Tenant? IdTenantNavigation { get; set; }

    public virtual ICollection<Structure> Structures { get; set; } = new List<Structure>();
}
