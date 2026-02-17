using System;
using System.Collections.Generic;

namespace Business.Model;

public partial class Permission
{
    public string IdPermission { get; set; } = null!;

    public string? Name { get; set; }

    public bool? IsDeactivated { get; set; }

    public string? Code { get; set; }

    public string? Url { get; set; }

    public virtual ICollection<RolePermission> RolePermissions { get; set; } = new List<RolePermission>();
}
