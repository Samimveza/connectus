using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Model;

public partial class StructureEducationMedium
{
    public StructureEducationMedium(string idStructureEducationMedia)
    {
        this.IdStructureEducationMedia = idStructureEducationMedia;
    }

    public StructureEducationMedium()
    {
        this.IdStructureEducationMedia = Guid.NewGuid().ToString();
    }
}
