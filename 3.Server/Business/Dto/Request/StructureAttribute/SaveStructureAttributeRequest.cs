using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Dto.Request.StructureAttribute;

public class SaveStructureAttributeRequest
{
    public string? IdStructureAttrribute { get; set; }
    public string IdStructure { get; set; }
    public string? Name { get; set; }
    public List<StructureAttrributeDetailRequest>? Details { get; set; }
}

public class StructureAttrributeDetailRequest
{
    public string? IdStructureAttrributeDetail { get; set; }
    public string? Name { get; set; }
}
