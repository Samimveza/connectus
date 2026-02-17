using Business.Dto.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Dto.Response.ShopProductCategory;

public class ShopProductCategoryResponse
{
    public string IdShopProductCategory { get; set; }
    public string? IdParentShopProductCategory { get; set; }
    public string? Name { get; set; }
    public string? Description { get; set; }
    public DocumentResponse? CoverPicture { get; set; }
    public List<ShopProductCategoryResponse> Children { get; set; } = new();
}
