using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Dto.Response.Integration
{
    public class IntegrationTypeListResponse
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public string IdIntegrationType { get; set; }
        public string IdIntegrationState { get; set; }
        public string IntegrationState { get; set; }
    }
}
