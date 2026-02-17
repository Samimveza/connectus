using System;
using System.Collections.Generic;

namespace Business.Model;

public partial class IntegrationType
{
    public string IdIntegrationType { get; set; } = null!;

    public string? Name { get; set; }

    public bool? IsAutomatic { get; set; }

    public string? IdInitialIntegrationState { get; set; }

    public string? Description { get; set; }

    public string? IdDocument { get; set; }

    public virtual Document? IdDocumentNavigation { get; set; }

    public virtual IntegrationState? IdInitialIntegrationStateNavigation { get; set; }

    public virtual ICollection<Integration> Integrations { get; set; } = new List<Integration>();
}
