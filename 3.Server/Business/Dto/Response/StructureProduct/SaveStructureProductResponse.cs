using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Dto.Response.StructureProduct;

public class SaveStructureProductResponse
{
    public string IdStructure { get; set; }
    public string IdStructureProduct { get; set; }
    public List<StructureProductDocumentResponse> Documents { get; set; } = new();
    public List<StructureProductShopProductCategoryResponse> Categories { get; set; } = new();
    public List<StructureProductStructureOptionDetailResponse> OptionDetails { get; set; } = new();
    public List<StructureProductStructureProductAttrributeDetailResponse> AttributeDetails { get; set; } = new();
}
