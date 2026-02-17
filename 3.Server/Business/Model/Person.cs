using System;
using System.Collections.Generic;

namespace Business.Model;

public partial class Person
{
    public string IdPerson { get; set; } = null!;

    public bool? IsDeactivated { get; set; }

    public string? IdTenant { get; set; }

    public string? Firstname { get; set; }

    public string? Lastname { get; set; }

    public string? WorkingOrganisation { get; set; }

    public string? Title { get; set; }

    public string? OtherName { get; set; }

    public virtual ICollection<AspNetUser> AspNetUsers { get; set; } = new List<AspNetUser>();

    public virtual Tenant? IdTenantNavigation { get; set; }

    public virtual ICollection<StructureMember> StructureMembers { get; set; } = new List<StructureMember>();

    public virtual ICollection<StructureMessage> StructureMessages { get; set; } = new List<StructureMessage>();

    public virtual ICollection<Structure> Structures { get; set; } = new List<Structure>();
}
