using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Model;

public partial class Integration
{
    public Integration(string idIntegration)
    {
        this.IdIntegration = idIntegration;
    }

    public Integration()
    {
        this.IdIntegration = Guid.NewGuid().ToString();
    }
} 