using System;
using System.Collections.Generic;

namespace Business.Model;

public partial class StructureProductStructureOptionDetail
{
    public string IdStructureProductStructureOptionDetail { get; set; } = null!;

    public string? IdStructureProduct { get; set; }

    public string? IdStructureOptionDetail { get; set; }

    public bool? ShouldOverridePrice { get; set; }

    public decimal? Price { get; set; }

    public virtual StructureOptionDetail? IdStructureOptionDetailNavigation { get; set; }

    public virtual StructureProduct? IdStructureProductNavigation { get; set; }
}
