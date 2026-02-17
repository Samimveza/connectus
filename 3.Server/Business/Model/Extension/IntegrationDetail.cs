using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Model;

public partial class IntegrationDetail
{
    public IntegrationDetail(string idIntegrationDetail)
    {
        this.IdIntegrationDetail = idIntegrationDetail;
    }

    public IntegrationDetail()
    {
        this.IdIntegrationDetail = Guid.NewGuid().ToString();
    }
} 