using System;
using System.Collections.Generic;

namespace Business.Model;

public partial class StructureTransaction
{
    public string IdStructureTransaction { get; set; } = null!;

    public string? IdStructure { get; set; }

    public DateTime? Date { get; set; }

    public string? IdUser { get; set; }

    public string StructureTransactionState { get; set; } = null!;

    public double? TotalPrice { get; set; }

    public virtual Structure? IdStructureNavigation { get; set; }

    public virtual AspNetUser? IdUserNavigation { get; set; }

    public virtual ICollection<StructureTransactionDetail> StructureTransactionDetails { get; set; } = new List<StructureTransactionDetail>();
}
