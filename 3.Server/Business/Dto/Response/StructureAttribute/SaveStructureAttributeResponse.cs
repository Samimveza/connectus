using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Dto.Response.StructureAttribute;

public class SaveStructureAttributeResponse
{
    public string IdStructureAttrribute { get; set; }
    public List<StructureAttrributeDetailResponse> Details { get; set; } = new();
}
