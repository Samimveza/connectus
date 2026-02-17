using System;
using System.Collections.Generic;

namespace Business.Model;

public partial class Subscriber
{
    public string IdSubscriber { get; set; } = null!;

    public string? EmailAddress { get; set; }

    public DateTime? DateAdded { get; set; }

    public string? Source { get; set; }

    public string? IdTenant { get; set; }

    public virtual Tenant? IdTenantNavigation { get; set; }
}
