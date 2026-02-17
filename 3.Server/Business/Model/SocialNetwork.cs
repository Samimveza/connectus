using System;
using System.Collections.Generic;

namespace Business.Model;

public partial class SocialNetwork
{
    public string IdSocialNetwork { get; set; } = null!;

    public string? Name { get; set; }

    public string? AbsoluteUrl { get; set; }

    public virtual ICollection<StructureSocialNetwork> StructureSocialNetworks { get; set; } = new List<StructureSocialNetwork>();
}
