using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Dto.Request.Message
{
    public class StructureMessageListRequest : BaseRequest
    {
        public string IdStructure { get; set; }
        public int PageSize { get; set; }
        public int PageIndex { get; set; }
    }
}
