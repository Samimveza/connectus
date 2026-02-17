using System;
using System.Collections.Generic;

namespace Business.Model;

public partial class StructureContact
{
    public string IdStructureContact { get; set; } = null!;

    public string? IdStructure { get; set; }

    public string? Name { get; set; }

    public string? Value { get; set; }

    public virtual Structure? IdStructureNavigation { get; set; }
}
