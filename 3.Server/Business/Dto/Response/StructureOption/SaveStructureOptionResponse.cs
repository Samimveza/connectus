using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Dto.Response.StructureOption;

public class SaveStructureOptionResponse
{
    public string IdStructureOption { get; set; }
    public List<StructureOptionDetailResponse> Details { get; set; } = new();
}
