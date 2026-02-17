using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Dto.Request.StructureAttribute;

public class DeleteStructureAttributeRequest
{
    public string IdStructureAttrribute { get; set; }
    public string IdStructure { get; set; }
}
