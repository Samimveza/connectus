using System;
using System.Collections.Generic;

namespace Business.Model;

public partial class Tenant
{
    public string IdTenant { get; set; } = null!;

    public bool? IsDeactivated { get; set; }

    public string? Domain { get; set; }

    public string? Name { get; set; }

    public string? TenantCode { get; set; }

    public virtual ICollection<ActionLog> ActionLogs { get; set; } = new List<ActionLog>();

    public virtual ICollection<AspNetUser> AspNetUsers { get; set; } = new List<AspNetUser>();

    public virtual ICollection<Company> Companies { get; set; } = new List<Company>();

    public virtual ICollection<Integration> Integrations { get; set; } = new List<Integration>();

    public virtual ICollection<Parameter> Parameters { get; set; } = new List<Parameter>();

    public virtual ICollection<Person> People { get; set; } = new List<Person>();

    public virtual ICollection<Shop> Shops { get; set; } = new List<Shop>();

    public virtual ICollection<Structure> Structures { get; set; } = new List<Structure>();

    public virtual ICollection<Subscriber> Subscribers { get; set; } = new List<Subscriber>();

    public virtual ICollection<UserStructure> UserStructures { get; set; } = new List<UserStructure>();
}
