using System;
using System.Collections.Generic;

namespace Business.Model;

public partial class Address
{
    public string IdAddress { get; set; } = null!;

    public string? AddressLine1 { get; set; }

    public string? AddressLine2 { get; set; }

    public string? City { get; set; }

    public string? Country { get; set; }

    public virtual ICollection<StructureAddress> StructureAddresses { get; set; } = new List<StructureAddress>();
}
