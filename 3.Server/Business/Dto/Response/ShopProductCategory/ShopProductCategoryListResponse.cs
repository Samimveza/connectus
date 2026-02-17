using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Dto.Response.ShopProductCategory;

public class ShopProductCategoryListResponse
{
    public List<ShopProductCategoryResponse> Categories { get; set; } = new();
}
