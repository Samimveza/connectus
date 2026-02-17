using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Model;

public partial class IntegrationDetailActionType
{
    public IntegrationDetailActionType(string idIntegrationDetailActionType)
    {
        this.IdIntegrationDetailActionType = idIntegrationDetailActionType;
    }

    public IntegrationDetailActionType()
    {
        this.IdIntegrationDetailActionType = Guid.NewGuid().ToString();
    }
} 