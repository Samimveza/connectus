using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Dto.Request.StructureOption;

public class SaveStructureOptionRequest
{
    public string? IdStructureOption { get; set; }
    public string IdStructure { get; set; }
    public string? Name { get; set; }
    public bool? IsMandatory { get; set; }
    public bool? CanAllowSameMultipleTime { get; set; }
    public int? ForceMinumum { get; set; }
    public int? ForceMaximum { get; set; }
    public List<StructureOptionDetailRequest>? Details { get; set; }
}

public class StructureOptionDetailRequest
{
    public string? IdStructureOptionDetail { get; set; }
    public string? Name { get; set; }
    public bool? IsPreSelected { get; set; }
    public decimal? Price { get; set; }
}
