using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Model;

public partial class StructureProductShopProductCategory
{
    public StructureProductShopProductCategory(string idStructureProductShopProductCategory)
    {
        this.IdStructureProductShopProductCategory = idStructureProductShopProductCategory;
    }

    public StructureProductShopProductCategory()
    {
        this.IdStructureProductShopProductCategory = Guid.NewGuid().ToString();
    }
}
