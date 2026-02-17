using System;
using System.Collections.Generic;

namespace Business.Model;

public partial class ProfileTemplate
{
    public string IdProfileTemplate { get; set; } = null!;

    public string? Name { get; set; }

    public virtual ICollection<Structure> Structures { get; set; } = new List<Structure>();
}
