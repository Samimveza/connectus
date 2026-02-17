using System;
using System.Collections.Generic;

namespace Business.Model;

public partial class AspNetUser
{
    public string Id { get; set; } = null!;

    public string? UserName { get; set; }

    public string? NormalizedUserName { get; set; }

    public string? Email { get; set; }

    public string? NormalizedEmail { get; set; }

    public bool EmailConfirmed { get; set; }

    public string? PasswordHash { get; set; }

    public string? SecurityStamp { get; set; }

    public string? ConcurrencyStamp { get; set; }

    public string? PhoneNumber { get; set; }

    public bool PhoneNumberConfirmed { get; set; }

    public bool TwoFactorEnabled { get; set; }

    public DateTimeOffset? LockoutEnd { get; set; }

    public bool LockoutEnabled { get; set; }

    public int AccessFailedCount { get; set; }

    public string? IdTenant { get; set; }

    public string? IdPerson { get; set; }

    public string? ValidationCode { get; set; }

    public string? UserType { get; set; }

    public virtual ICollection<ActionLog> ActionLogs { get; set; } = new List<ActionLog>();

    public virtual ICollection<AspNetUserClaim> AspNetUserClaims { get; set; } = new List<AspNetUserClaim>();

    public virtual ICollection<AspNetUserLogin> AspNetUserLogins { get; set; } = new List<AspNetUserLogin>();

    public virtual ICollection<AspNetUserToken> AspNetUserTokens { get; set; } = new List<AspNetUserToken>();

    public virtual Person? IdPersonNavigation { get; set; }

    public virtual Tenant? IdTenantNavigation { get; set; }

    public virtual ICollection<Integration> Integrations { get; set; } = new List<Integration>();

    public virtual ICollection<StructureTransaction> StructureTransactions { get; set; } = new List<StructureTransaction>();

    public virtual ICollection<UserStructure> UserStructures { get; set; } = new List<UserStructure>();

    public virtual ICollection<AspNetRole> Roles { get; set; } = new List<AspNetRole>();
}
