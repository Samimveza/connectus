using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Dto.Request;

public class LogListRequest : BaseRequest
{
    public int PageSize { get; set; }
    public int PageIndex { get; set; }
    public string Identifier { get; set; }
}
