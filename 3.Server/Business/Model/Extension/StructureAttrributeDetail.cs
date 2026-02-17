using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Model;

public partial class StructureAttrributeDetail
{
    public StructureAttrributeDetail(string idStructureAttrributeDetail)
    {
        this.IdStructureAttrributeDetail = idStructureAttrributeDetail;
    }

    public StructureAttrributeDetail()
    {
        this.IdStructureAttrributeDetail = Guid.NewGuid().ToString();
    }
}
