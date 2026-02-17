using System;
using System.Collections.Generic;

namespace Business.Model;

public partial class StructureTransactionDetail
{
    public string IdStructureTransactionDetail { get; set; } = null!;

    public string? IdStructureTransaction { get; set; }

    public string? IdStructureProduct { get; set; }

    public double? Price { get; set; }

    public double? Quantity { get; set; }

    public string? Note { get; set; }

    public virtual StructureProduct? IdStructureProductNavigation { get; set; }

    public virtual StructureTransaction? IdStructureTransactionNavigation { get; set; }

    public virtual ICollection<StructureTransactionDetailMetaDatum> StructureTransactionDetailMetaData { get; set; } = new List<StructureTransactionDetailMetaDatum>();
}
