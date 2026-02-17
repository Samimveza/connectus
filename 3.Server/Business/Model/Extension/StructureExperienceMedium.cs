using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Model;

public partial class StructureExperienceMedium
{
    public StructureExperienceMedium(string idStructureExperienceMedia)
    {
        this.IdStructureExperienceMedia = idStructureExperienceMedia;
    }

    public StructureExperienceMedium()
    {
        this.IdStructureExperienceMedia = Guid.NewGuid().ToString();
    }
}
