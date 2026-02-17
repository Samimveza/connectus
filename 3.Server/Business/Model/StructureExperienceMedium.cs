using System;
using System.Collections.Generic;

namespace Business.Model;

public partial class StructureExperienceMedium
{
    public string IdStructureExperienceMedia { get; set; } = null!;

    public string? IdStructureExperience { get; set; }

    public string? IdDocument { get; set; }

    public virtual Document? IdDocumentNavigation { get; set; }

    public virtual StructureExperience? IdStructureExperienceNavigation { get; set; }
}
