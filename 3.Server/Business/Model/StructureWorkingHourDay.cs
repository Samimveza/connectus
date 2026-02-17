using System;
using System.Collections.Generic;

namespace Business.Model;

public partial class StructureWorkingHourDay
{
    public string IdStructureWorkingHourDay { get; set; } = null!;

    public int DayOfWeekSunZero { get; set; }

    public bool IsOpen { get; set; }

    public string? IdStructureWorkingHour { get; set; }

    public virtual StructureWorkingHour? IdStructureWorkingHourNavigation { get; set; }

    public virtual ICollection<StructureWorkingHourTimeSlot> StructureWorkingHourTimeSlots { get; set; } = new List<StructureWorkingHourTimeSlot>();
}
