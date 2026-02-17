using System;
using System.Collections.Generic;

namespace Business.Model;

public partial class Integration
{
    public string IdIntegration { get; set; } = null!;

    public string? IdIntegrationType { get; set; }

    public DateTime? DateAdded { get; set; }

    public string? TokenIdentifier { get; set; }

    public string? IdUser { get; set; }

    public string? IdIntegrationState { get; set; }

    public string? IdTenant { get; set; }

    public virtual IntegrationState? IdIntegrationStateNavigation { get; set; }

    public virtual IntegrationType? IdIntegrationTypeNavigation { get; set; }

    public virtual Tenant? IdTenantNavigation { get; set; }

    public virtual AspNetUser? IdUserNavigation { get; set; }

    public virtual ICollection<IntegrationDetail> IntegrationDetails { get; set; } = new List<IntegrationDetail>();
}
