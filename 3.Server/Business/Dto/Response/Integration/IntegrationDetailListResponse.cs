using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Dto.Response.Integration
{
    public class IntegrationDetailListResponse
    {
        public string IdIntegrationDetail { get; set; }
        public DateTime? DateAdded { get; set; }
        public string Name{ get; set; }
        public string Description{ get; set; }
        public string State{ get; set; }

        public List<IntegrationDetailListActionResponse> Actions { get; set; } = new List<IntegrationDetailListActionResponse>();
    }

    public class IntegrationDetailListActionResponse
    {
        public string Name { get; set; }

        public string IdActionType { get; set; }

        public string Url { get; set; }

    }
}
