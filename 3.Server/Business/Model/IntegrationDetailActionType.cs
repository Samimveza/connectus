using System;
using System.Collections.Generic;

namespace Business.Model;

public partial class IntegrationDetailActionType
{
    public string IdIntegrationDetailActionType { get; set; } = null!;

    public string? Name { get; set; }

    public virtual ICollection<IntegrationDetailAction> IntegrationDetailActions { get; set; } = new List<IntegrationDetailAction>();
}
