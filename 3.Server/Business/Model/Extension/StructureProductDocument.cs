using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Model;

public partial class StructureProductDocument
{
    public StructureProductDocument(string idStructureProductDocument)
    {
        this.IdStructureProductDocument = idStructureProductDocument;
    }

    public StructureProductDocument()
    {
        this.IdStructureProductDocument = Guid.NewGuid().ToString();
    }
}
