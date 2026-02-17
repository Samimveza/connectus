using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Model;

public partial class StructureWorkingHourTimeSlot
{
    public StructureWorkingHourTimeSlot(string idStructureWorkingHourTimeSlot)
    {
        this.IdStructureWorkingHourTimeSlot = idStructureWorkingHourTimeSlot;
    }

    public StructureWorkingHourTimeSlot()
    {
        this.IdStructureWorkingHourTimeSlot = Guid.NewGuid().ToString();
    }
} 