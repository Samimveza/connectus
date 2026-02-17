using System;
using System.Collections.Generic;

namespace Business.Model;

public partial class IntegrationDetailAction
{
    public string IdIntegrationDetailAction { get; set; } = null!;

    public string? IdIntegrationDetail { get; set; }

    public string? Name { get; set; }

    public string? IdIntegrationDetailActionType { get; set; }

    public string? Parameter { get; set; }

    public virtual IntegrationDetailActionType? IdIntegrationDetailActionTypeNavigation { get; set; }

    public virtual IntegrationDetail? IdIntegrationDetailNavigation { get; set; }
}
