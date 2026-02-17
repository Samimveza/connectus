using System;
using System.Collections.Generic;

namespace Business.Model;

public partial class IntegrationDetail
{
    public string IdIntegrationDetail { get; set; } = null!;

    public string? IdIntegration { get; set; }

    public DateTime? DateAdded { get; set; }

    public string? ExternalIdentifier { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public string? ExternalState { get; set; }

    public string? ExternalData { get; set; }

    public virtual Integration? IdIntegrationNavigation { get; set; }

    public virtual ICollection<IntegrationDetailAction> IntegrationDetailActions { get; set; } = new List<IntegrationDetailAction>();
}
