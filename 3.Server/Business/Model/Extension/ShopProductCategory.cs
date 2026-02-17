using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Model;

public partial class ShopProductCategory
{
    public ShopProductCategory(string idShopProductCategory)
    {
        this.IdShopProductCategory = idShopProductCategory;
    }

    public ShopProductCategory()
    {
        this.IdShopProductCategory = Guid.NewGuid().ToString();
    }
}
