using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Dto.Request.ShopProductCategory;

public class DeleteShopProductCategoryRequest
{
    public string IdShopProductCategory { get; set; }
    public string IdStructure { get; set; }
}
