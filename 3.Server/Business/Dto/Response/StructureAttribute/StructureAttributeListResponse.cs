using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Dto.Response.StructureAttribute;

public class StructureAttributeListResponse
{
    public List<StructureAttributeResponse> Attributes { get; set; } = new();
}
