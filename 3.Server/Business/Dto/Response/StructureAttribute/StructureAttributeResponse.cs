using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Dto.Response.StructureAttribute;

public class StructureAttributeResponse
{
    public string IdStructureAttrribute { get; set; }
    public string? IdStructure { get; set; }
    public string? Name { get; set; }
    public List<StructureAttrributeDetailResponse> Details { get; set; } = new();
}

public class StructureAttrributeDetailResponse
{
    public string IdStructureAttrributeDetail { get; set; }
    public string? IdStructureAttrribute { get; set; }
    public string? Name { get; set; }
}
