using Business.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Model;

public partial class StructureMessage
{
    public StructureMessage(string idStructureMessage)
    {
        this.IdStructureMessage = idStructureMessage;
    }

    public StructureMessage()
    {
        this.IdStructureMessage = Guid.NewGuid().ToString();
    }
}
