using System;
using System.Collections.Generic;

namespace Business.Model;

public partial class UserStructure
{
    public string IdUserStructure { get; set; } = null!;

    public string? IdUser { get; set; }

    public string? IdStructure { get; set; }

    public bool? IsDeactivated { get; set; }

    public string? IdTenant { get; set; }

    public virtual Structure? IdStructureNavigation { get; set; }

    public virtual Tenant? IdTenantNavigation { get; set; }

    public virtual AspNetUser? IdUserNavigation { get; set; }
}
