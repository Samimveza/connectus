using System;
using System.Collections.Generic;

namespace Business.Model;

public partial class StructureMessage
{
    public string IdStructureMessage { get; set; } = null!;

    public string? IdStructure { get; set; }

    public string? IdPerson { get; set; }

    public string? Email { get; set; }

    public string? Phone { get; set; }

    public string? IpAddress { get; set; }

    public DateTime? DateAdded { get; set; }

    public string? MessageContent { get; set; }

    public bool? IsRead { get; set; }

    public virtual Person? IdPersonNavigation { get; set; }

    public virtual Structure? IdStructureNavigation { get; set; }
}
