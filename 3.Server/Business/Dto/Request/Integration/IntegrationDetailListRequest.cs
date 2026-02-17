using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Dto.Request.Integration
{
    public class IntegrationDetailListRequest : BaseRequest
    {
        public int PageSize { get; set; }
        public int PageIndex { get; set; }
        public bool SortByDesc { get; set; }

        public string Search { get; set; }

        public string IdIntegrationType { get; set; }

    }
}
