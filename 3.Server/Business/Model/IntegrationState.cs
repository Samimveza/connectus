using System;
using System.Collections.Generic;

namespace Business.Model;

public partial class IntegrationState
{
    public string IdIntegrationState { get; set; } = null!;

    public string? Name { get; set; }

    public virtual ICollection<IntegrationType> IntegrationTypes { get; set; } = new List<IntegrationType>();

    public virtual ICollection<Integration> Integrations { get; set; } = new List<Integration>();
}
