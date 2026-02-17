using System;
using System.Collections.Generic;

namespace Business.Model;

public partial class ActionLog
{
    public string IdActionLog { get; set; } = null!;

    public string? IdEntityIdentifier { get; set; }

    public DateTime? Date { get; set; }

    public string? ActionDetail { get; set; }

    public string? EntityName { get; set; }

    public string? IdUser { get; set; }

    public string? IdTenant { get; set; }

    public string? IpAddress { get; set; }

    public virtual Tenant? IdTenantNavigation { get; set; }

    public virtual AspNetUser? IdUserNavigation { get; set; }
}
