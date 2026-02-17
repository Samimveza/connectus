using System;
using System.Collections.Generic;

namespace Business.Model;

public partial class StructureAddress
{
    public string IdStructureAddress { get; set; } = null!;

    public string? IdStructure { get; set; }

    public string? IdAddress { get; set; }

    public string? Name { get; set; }

    public int? DisplayOrder { get; set; }

    public virtual Address? IdAddressNavigation { get; set; }

    public virtual Structure? IdStructureNavigation { get; set; }
}
