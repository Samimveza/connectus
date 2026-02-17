using System;
using System.Collections.Generic;

namespace Business.Model;

public partial class StructureEducationMedium
{
    public string IdStructureEducationMedia { get; set; } = null!;

    public string? IdStructureEducation { get; set; }

    public string? IdDocument { get; set; }

    public virtual Document? IdDocumentNavigation { get; set; }

    public virtual StructureEducation? IdStructureEducationNavigation { get; set; }
}
