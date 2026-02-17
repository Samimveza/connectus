using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Dto.Request.Structure
{
    public class GetStructureViewsRequest
    {
        public string IdStructure { get; set; }
        public string OutputType { get; set; }
        public DateTime FilterDate { get; set; }
    }
}
