using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Dto.Request.Structure
{
    public class StructureFieldListRequest : BaseRequest
    {
        public int PageSize { get; set; }
        public int PageIndex { get; set; }
    }
}
