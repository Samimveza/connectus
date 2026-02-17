using System;
using System.Collections.Generic;

namespace Business.Model;

public partial class StructureSocialNetwork
{
    public string IdStructureSocialNetwork { get; set; } = null!;

    public string? IdStructure { get; set; }

    public string? IdSocialNetwork { get; set; }

    public string? Value { get; set; }

    public virtual SocialNetwork? IdSocialNetworkNavigation { get; set; }

    public virtual Structure? IdStructureNavigation { get; set; }
}
