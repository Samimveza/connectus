using Business.Dto.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Dto.Request.StructureProduct;

public class SaveStructureProductRequest
{
    public string? IdStructureProduct { get; set; }
    public string IdStructure { get; set; }
    public string? Name { get; set; }
    public string? Description { get; set; }
    public string? ShortDescription { get; set; }
    public string? Sku { get; set; }
    public double? BasePrice { get; set; }
    public bool? IsFeaturedOnFront { get; set; }
    public string? IdStructureAttrribute { get; set; }
    public List<StructureProductDocumentRequest>? Documents { get; set; }
    public List<StructureProductShopProductCategoryRequest>? Categories { get; set; }
    public List<StructureProductStructureOptionDetailRequest>? OptionDetails { get; set; }
    public List<StructureProductStructureProductAttrributeDetailRequest>? AttributeDetails { get; set; }
}

public class StructureProductDocumentRequest
{
    public string? IdStructureProductDocument { get; set; }
    public DocumentResponse? Document { get; set; }
    public bool? IsPrimary { get; set; }
    public int? DisplayOrder { get; set; }
}

public class StructureProductShopProductCategoryRequest
{
    public string? IdStructureProductShopProductCategory { get; set; }
    public string? IdShopProductCategory { get; set; }
    public bool? IsPrimary { get; set; }
}

public class StructureProductStructureOptionDetailRequest
{
    public string? IdStructureProductStructureOptionDetail { get; set; }
    public string? IdStructureOptionDetail { get; set; }
    public bool? ShouldOverridePrice { get; set; }
    public decimal? Price { get; set; }
}

public class StructureProductStructureProductAttrributeDetailRequest
{
    public string? IdStructureProductStructureProductAttrributeDetail { get; set; }
    public string? IdStructureAttrributeDetail { get; set; }
    public string? AttributeValue { get; set; }
}
