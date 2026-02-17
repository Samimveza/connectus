using Business.Dto.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Dto.Response.StructureProduct;

public class StructureProductResponse
{
    public string IdStructureProduct { get; set; }
    public string? IdStructure { get; set; }
    public string? Name { get; set; }
    public string? Description { get; set; }
    public string? ShortDescription { get; set; }
    public string? Sku { get; set; }
    public double? BasePrice { get; set; }
    public bool? IsFeaturedOnFront { get; set; }
    public string? IdStructureAttrribute { get; set; }
    public bool? IsDeactivated { get; set; }
    public List<StructureProductDocumentResponse> Documents { get; set; } = new();
    public List<StructureProductShopProductCategoryResponse> Categories { get; set; } = new();
    public List<StructureProductStructureOptionDetailResponse> OptionDetails { get; set; } = new();
    public List<StructureProductStructureProductAttrributeDetailResponse> AttributeDetails { get; set; } = new();
}

public class StructureProductDocumentResponse
{
    public string IdStructureProductDocument { get; set; }
    public string? IdStructureProduct { get; set; }
    public string? IdDocument { get; set; }
    public bool? IsPrimary { get; set; }
    public int? DisplayOrder { get; set; }
    public DocumentResponse? Document { get; set; }
}

public class StructureProductShopProductCategoryResponse
{
    public string IdStructureProductShopProductCategory { get; set; }
    public string? IdStructureProduct { get; set; }
    public string? IdShopProductCategory { get; set; }
    public bool? IsPrimary { get; set; }
}

public class StructureProductStructureOptionDetailResponse
{
    public string IdStructureProductStructureOptionDetail { get; set; }
    public string? IdStructureProduct { get; set; }
    public string? IdStructureOptionDetail { get; set; }
    public bool? ShouldOverridePrice { get; set; }
    public decimal? Price { get; set; }
}

public class StructureProductStructureProductAttrributeDetailResponse
{
    public string IdStructureProductStructureProductAttrributeDetail { get; set; }
    public string? IdStructureProduct { get; set; }
    public string? IdStructureAttrributeDetail { get; set; }
    public string? AttributeValue { get; set; }
}
