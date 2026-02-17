using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Dto.Request.StructureProduct;

public class DeleteStructureProductRequest
{
    public string IdStructureProduct { get; set; }
    public string IdStructure { get; set; }
}
