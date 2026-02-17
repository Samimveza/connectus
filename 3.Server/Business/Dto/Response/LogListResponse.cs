using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Dto.Response;

public class LogListResponse
{
    public string User { get; set; }
    public DateTime? Date { get; set; }
    public string ActionDetail{ get; set; }
}
