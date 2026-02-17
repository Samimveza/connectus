using System;
using System.Collections.Generic;

namespace Business.Model;

public partial class Parameter
{
    public string IdParameter { get; set; } = null!;

    public string? ParamaterValue { get; set; }

    public bool? IsDeactivated { get; set; }

    public string? Code { get; set; }

    public string? IdTenant { get; set; }

    public virtual ICollection<Document> DocumentIdParameterBasePhysicalFilePathNavigations { get; set; } = new List<Document>();

    public virtual ICollection<Document> DocumentIdParameterBaseServerUrlNavigations { get; set; } = new List<Document>();

    public virtual Tenant? IdTenantNavigation { get; set; }
}
