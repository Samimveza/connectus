using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Model;

public partial class StructureAccordion
{
    public StructureAccordion(string idStructureAccordion)
    {
        this.IdStructureAccordion = idStructureAccordion;
    }

    public StructureAccordion()
    {
        this.IdStructureAccordion = Guid.NewGuid().ToString();
    }
} 