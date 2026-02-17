using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Model;

public partial class StructureProductStructureOptionDetail
{
    public StructureProductStructureOptionDetail(string idStructureProductStructureOptionDetail)
    {
        this.IdStructureProductStructureOptionDetail = idStructureProductStructureOptionDetail;
    }

    public StructureProductStructureOptionDetail()
    {
        this.IdStructureProductStructureOptionDetail = Guid.NewGuid().ToString();
    }
}
