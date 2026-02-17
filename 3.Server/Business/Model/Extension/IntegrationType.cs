using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Model;

public partial class IntegrationType
{
    public IntegrationType(string idIntegrationType)
    {
        this.IdIntegrationType = idIntegrationType;
    }

    public IntegrationType()
    {
        this.IdIntegrationType = Guid.NewGuid().ToString();
    }
} 