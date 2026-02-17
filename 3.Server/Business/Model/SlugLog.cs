using System;
using System.Collections.Generic;

namespace Business.Model;

public partial class SlugLog
{
    public string IdSlugLog { get; set; } = null!;

    public string? SystemSlug { get; set; }

    public string? UserSlug { get; set; }
}
