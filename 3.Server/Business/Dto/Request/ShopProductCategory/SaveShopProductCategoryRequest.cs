using Business.Dto.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Dto.Request.ShopProductCategory;

public class SaveShopProductCategoryRequest
{
    public string? IdShopProductCategory { get; set; }
    public string IdStructure { get; set; }
    public string? IdParentShopProductCategory { get; set; }
    public string? Name { get; set; }
    public DocumentResponse? CoverPicture { get; set; }
}
