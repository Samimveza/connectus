using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Model;

public partial class StructureWorkingHourDay
{
    public StructureWorkingHourDay(string idStructureWorkingHourDay)
    {
        this.IdStructureWorkingHourDay = idStructureWorkingHourDay;
    }

    public StructureWorkingHourDay()
    {
        this.IdStructureWorkingHourDay = Guid.NewGuid().ToString();
    }
} 