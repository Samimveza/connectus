using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Model;

public partial class StructureOptionDetail
{
    public StructureOptionDetail(string idStructureOptionDetail)
    {
        this.IdStructureOptionDetail = idStructureOptionDetail;
    }

    public StructureOptionDetail()
    {
        this.IdStructureOptionDetail = Guid.NewGuid().ToString();
    }
}
