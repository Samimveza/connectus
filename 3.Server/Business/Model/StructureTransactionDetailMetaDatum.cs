using System;
using System.Collections.Generic;

namespace Business.Model;

public partial class StructureTransactionDetailMetaDatum
{
    public string IdStructureTransactionDetailMetaData { get; set; } = null!;

    public string? IdStructureTransactionDetail { get; set; }

    public string? OptionKey { get; set; }

    public string? OptionValue { get; set; }

    public string? AttributeKey { get; set; }

    public string? AttributeValue { get; set; }

    public virtual StructureTransactionDetail? IdStructureTransactionDetailNavigation { get; set; }
}
