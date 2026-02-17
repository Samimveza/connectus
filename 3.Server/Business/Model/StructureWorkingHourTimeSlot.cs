using System;
using System.Collections.Generic;

namespace Business.Model;

public partial class StructureWorkingHourTimeSlot
{
    public string IdStructureWorkingHourTimeSlot { get; set; } = null!;

    public string IdStructureWorkingHourDay { get; set; } = null!;

    public TimeSpan OpenTime { get; set; }

    public TimeSpan CloseTime { get; set; }

    public virtual StructureWorkingHourDay IdStructureWorkingHourDayNavigation { get; set; } = null!;
}
