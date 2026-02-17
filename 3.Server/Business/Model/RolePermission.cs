using System;
using System.Collections.Generic;

namespace Business.Model;

public partial class RolePermission
{
    public string IdRolePermission { get; set; } = null!;

    public string? IdRole { get; set; }

    public string? IdPermission { get; set; }

    public bool? IsDeactivated { get; set; }

    public virtual Permission? IdPermissionNavigation { get; set; }

    public virtual AspNetRole? IdRoleNavigation { get; set; }
}
