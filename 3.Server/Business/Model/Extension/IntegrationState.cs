using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Model;

public partial class IntegrationState
{
    public IntegrationState(string idIntegrationState)
    {
        this.IdIntegrationState = idIntegrationState;
    }

    public IntegrationState()
    {
        this.IdIntegrationState = Guid.NewGuid().ToString();
    }
} 