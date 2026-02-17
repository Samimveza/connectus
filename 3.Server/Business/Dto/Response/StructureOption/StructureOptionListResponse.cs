using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Dto.Response.StructureOption;

public class StructureOptionListResponse
{
    public List<StructureOptionResponse> Options { get; set; } = new();
}
