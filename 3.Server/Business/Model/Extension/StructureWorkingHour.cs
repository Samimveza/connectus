using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Model;

public partial class StructureWorkingHour
{
    public StructureWorkingHour(string idStructureWorkingHour)
    {
        this.IdStructureWorkingHour = idStructureWorkingHour;
    }

    public StructureWorkingHour()
    {
        this.IdStructureWorkingHour = Guid.NewGuid().ToString();
    }
} 