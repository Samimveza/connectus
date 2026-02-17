using System;
using System.Collections.Generic;

namespace Business.Model;

public partial class StructureType
{
    public string IdStructureType { get; set; } = null!;

    public string? Name { get; set; }

    public bool? IsDeactivated { get; set; }

    public string? Code { get; set; }

    public virtual ICollection<Structure> Structures { get; set; } = new List<Structure>();
}
