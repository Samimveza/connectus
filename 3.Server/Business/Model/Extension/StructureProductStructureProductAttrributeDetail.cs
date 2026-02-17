using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Model;

public partial class StructureProductStructureProductAttrributeDetail
{
    public StructureProductStructureProductAttrributeDetail(string idStructureProductStructureProductAttrributeDetail)
    {
        this.IdStructureProductStructureProductAttrributeDetail = idStructureProductStructureProductAttrributeDetail;
    }

    public StructureProductStructureProductAttrributeDetail()
    {
        this.IdStructureProductStructureProductAttrributeDetail = Guid.NewGuid().ToString();
    }
}
