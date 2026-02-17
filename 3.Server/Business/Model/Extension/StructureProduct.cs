using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Model;

public partial class StructureProduct
{
    public StructureProduct(string idStructureProduct)
    {
        this.IdStructureProduct = idStructureProduct;
    }

    public StructureProduct()
    {
        this.IdStructureProduct = Guid.NewGuid().ToString();
    }
}
