using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Model;

public partial class TenantProduct
{
    public TenantProduct(string idTenantProduct)
    {
        this.IdTenantProduct = idTenantProduct;
    }

    public TenantProduct()
    {
        this.IdTenantProduct = Guid.NewGuid().ToString();
    }
}
