using System;
using System.Collections.Generic;

namespace Business.Model;

public partial class StructureOptionDetail
{
    public string IdStructureOptionDetail { get; set; } = null!;

    public string? IdStructureOption { get; set; }

    public string? Name { get; set; }

    public bool? IsPreSelected { get; set; }

    public decimal? Price { get; set; }

    public virtual StructureOption? IdStructureOptionNavigation { get; set; }

    public virtual ICollection<StructureProductStructureOptionDetail> StructureProductStructureOptionDetails { get; set; } = new List<StructureProductStructureOptionDetail>();
}
