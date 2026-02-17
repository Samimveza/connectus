using System;
using System.Collections.Generic;

namespace Business.Model;

public partial class StructureTag
{
    public string IdStructureTag { get; set; } = null!;

    public string? Name { get; set; }

    public virtual ICollection<StructureStructureTag> StructureStructureTags { get; set; } = new List<StructureStructureTag>();
}
