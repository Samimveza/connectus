using Business.Common;
using Business.Dto.Request.StructureProduct;
using Business.Dto.Response;
using Business.Dto.Response.StructureProduct;
using Business.ExtensionMethod;
using Business.Model;
using Business.Utils;
using Data.Interfaces;
using Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using static Business.Enums.Constants;

namespace Service.Extension
{
    public class StructureProductService : IStructureProductService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IGlobalDataService _globalDataService;

        public StructureProductService(
            IUnitOfWork unitOfWork,
            IGlobalDataService globalDataService)
        {
            _unitOfWork = unitOfWork;
            _globalDataService = globalDataService;
        }

        public BusinessResponse<BaseListReturnType<StructureProductResponse>> GetStructureProducts(GetStructureProductsRequest request)
        {
            BusinessResponse<BaseListReturnType<StructureProductResponse>> response = new BusinessResponse<BaseListReturnType<StructureProductResponse>>();
            try
            {
                response.Result = GetStructureProductsRaw(request);
            }
            catch (Exception ex)
            {
                response.Exception = new BusinessLayerException(ex.Message, ex);
            }

            return response;
        }

        public BaseListReturnType<StructureProductResponse> GetStructureProductsRaw(GetStructureProductsRequest request)
        {
            var idUser = _globalDataService.GetVariable<string>(ApplicationConstant.IDUSER);
            var idTenant = _globalDataService.GetVariable<string>(ApplicationConstant.IDTENANT);

            // Verify that the structure belongs to a shop
            var structure = _unitOfWork.StructureDao.GetCustom(s => s.IdStructure == request.IdStructure);
            if (structure == null || string.IsNullOrEmpty(structure.IdShop))
            {
                throw new Exception("Structure not found or does not have a shop");
            }

            // Build query expression
            System.Linq.Expressions.Expression<Func<StructureProduct, bool>> expression;

            // Add search filter if provided
            if (!string.IsNullOrEmpty(request.Search))
            {
                var search = request.Search;
                expression = p => 
                    p.IdStructure == request.IdStructure && 
                    (p.IsDeactivated == null || p.IsDeactivated == false) &&
                    ((p.Name != null && p.Name.Contains(search)) ||
                     (p.Sku != null && p.Sku.Contains(search)) ||
                     (p.Description != null && p.Description.Contains(search)));
            }
            else
            {
                expression = p => 
                    p.IdStructure == request.IdStructure && 
                    (p.IsDeactivated == null || p.IsDeactivated == false);
            }

            // Get products with pagination and all related data
            var products = _unitOfWork.StructureProductDao.GetListCustom<string>(
                request.PageSize,
                request.PageIndex,
                expression,
                o => o.Name,
                new List<string>()
                {
                    "StructureProductDocuments",
                    "StructureProductDocuments.IdDocumentNavigation",
                    "StructureProductDocuments.IdDocumentNavigation.IdParameterBaseServerUrlNavigation",
                    "StructureProductShopProductCategories",
                    //"StructureProductStructureOptionDetails",
                    //"StructureProductStructureProductAttrributeDetails"
                }
            );

            // Map to response
            var productResponses = products.EntityList.Select(p => new StructureProductResponse
            {
                IdStructureProduct = p.IdStructureProduct,
                IdStructure = p.IdStructure,
                Name = p.Name,
                Description = p.Description,
                ShortDescription = p.ShortDescription,
                Sku = p.Sku,
                BasePrice = p.BasePrice,
                IsFeaturedOnFront = p.IsFeaturedOnFront,
                IdStructureAttrribute = p.IdStructureAttrribute,
                IsDeactivated = p.IsDeactivated,
                Documents = p.StructureProductDocuments?.Select(d => new StructureProductDocumentResponse
                {
                    IdStructureProductDocument = d.IdStructureProductDocument,
                    IdStructureProduct = d.IdStructureProduct,
                    IdDocument = d.IdDocument,
                    IsPrimary = d.IsPrimary,
                    DisplayOrder = d.DisplayOrder,
                    Document = d.IdDocumentNavigation != null ? new DocumentResponse()
                    {
                        IdDocument = d.IdDocumentNavigation.IdDocument,
                        Name = d.IdDocumentNavigation.FileName,
                        Url = String.Format("{0}/{1}", 
                            d.IdDocumentNavigation?.IdParameterBaseServerUrlNavigation?.ParamaterValue, 
                            d.IdDocumentNavigation?.ServerFilePath)
                    } : null
                }).ToList() ?? new List<StructureProductDocumentResponse>(),
                Categories = p.StructureProductShopProductCategories?.Select(c => new StructureProductShopProductCategoryResponse
                {
                    IdStructureProductShopProductCategory = c.IdStructureProductShopProductCategory,
                    IdStructureProduct = c.IdStructureProduct,
                    IdShopProductCategory = c.IdShopProductCategory,
                    IsPrimary = c.IsPrimary
                }).ToList() ?? new List<StructureProductShopProductCategoryResponse>(),
                //OptionDetails = p.StructureProductStructureOptionDetails?.Select(o => new StructureProductStructureOptionDetailResponse
                //{
                //    IdStructureProductStructureOptionDetail = o.IdStructureProductStructureOptionDetail,
                //    IdStructureProduct = o.IdStructureProduct,
                //    IdStructureOptionDetail = o.IdStructureOptionDetail,
                //    ShouldOverridePrice = o.ShouldOverridePrice,
                //    Price = o.Price
                //}).ToList() ?? new List<StructureProductStructureOptionDetailResponse>(),
                //AttributeDetails = p.StructureProductStructureProductAttrributeDetails?.Select(a => new StructureProductStructureProductAttrributeDetailResponse
                //{
                //    IdStructureProductStructureProductAttrributeDetail = a.IdStructureProductStructureProductAttrributeDetail,
                //    IdStructureProduct = a.IdStructureProduct,
                //    IdStructureAttrributeDetail = a.IdStructureAttrributeDetail,
                //    AttributeValue = a.AttributeValue
                //}).ToList() ?? new List<StructureProductStructureProductAttrributeDetailResponse>()
            }).ToList();

            return new BaseListReturnType<StructureProductResponse>
            {
                EntityList = productResponses,
                TotalCount = products.TotalCount
            };
        }

        public BusinessResponse<StructureProductResponse> GetStructureProduct(GetStructureProductRequest request)
        {
            BusinessResponse<StructureProductResponse> response = new BusinessResponse<StructureProductResponse>();
            try
            {
                response.Result = GetStructureProductRaw(request);
            }
            catch (Exception ex)
            {
                response.Exception = new BusinessLayerException(ex.Message, ex);
            }

            return response;
        }

        public StructureProductResponse GetStructureProductRaw(GetStructureProductRequest request)
        {
            var idUser = _globalDataService.GetVariable<string>(ApplicationConstant.IDUSER);
            var idTenant = _globalDataService.GetVariable<string>(ApplicationConstant.IDTENANT);

            // Verify that the structure belongs to a shop
            var structure = _unitOfWork.StructureDao.GetCustom(s => s.IdStructure == request.IdStructure);
            if (structure == null || string.IsNullOrEmpty(structure.IdShop))
            {
                throw new Exception("Structure not found or does not have a shop");
            }

            // Get product with all related data
            var product = _unitOfWork.StructureProductDao.GetCustom(
                p => p.IdStructureProduct == request.IdStructureProduct && p.IdStructure == request.IdStructure,
                new List<string>()
                {
                    "StructureProductDocuments",
                    "StructureProductDocuments.IdDocumentNavigation",
                    "StructureProductDocuments.IdDocumentNavigation.IdParameterBaseServerUrlNavigation",
                    "StructureProductShopProductCategories",
                    "StructureProductStructureOptionDetails",
                    "StructureProductStructureProductAttrributeDetails"
                }
            );

            if (product == null)
            {
                throw new Exception("Product not found");
            }

            // Map to response
            return new StructureProductResponse
            {
                IdStructureProduct = product.IdStructureProduct,
                IdStructure = product.IdStructure,
                Name = product.Name,
                Description = product.Description,
                ShortDescription = product.ShortDescription,
                Sku = product.Sku,
                BasePrice = product.BasePrice,
                IsFeaturedOnFront = product.IsFeaturedOnFront,
                IdStructureAttrribute = product.IdStructureAttrribute,
                IsDeactivated = product.IsDeactivated,
                Documents = product.StructureProductDocuments?.Select(d => new StructureProductDocumentResponse
                {
                    IdStructureProductDocument = d.IdStructureProductDocument,
                    IdStructureProduct = d.IdStructureProduct,
                    IdDocument = d.IdDocument,
                    IsPrimary = d.IsPrimary,
                    DisplayOrder = d.DisplayOrder,
                    Document = d.IdDocumentNavigation != null ? new DocumentResponse()
                    {
                        IdDocument = d.IdDocumentNavigation.IdDocument,
                        Name = d.IdDocumentNavigation.FileName,
                        Url = String.Format("{0}/{1}", 
                            d.IdDocumentNavigation?.IdParameterBaseServerUrlNavigation?.ParamaterValue, 
                            d.IdDocumentNavigation?.ServerFilePath)
                    } : null
                }).ToList() ?? new List<StructureProductDocumentResponse>(),
                Categories = product.StructureProductShopProductCategories?.Select(c => new StructureProductShopProductCategoryResponse
                {
                    IdStructureProductShopProductCategory = c.IdStructureProductShopProductCategory,
                    IdStructureProduct = c.IdStructureProduct,
                    IdShopProductCategory = c.IdShopProductCategory,
                    IsPrimary = c.IsPrimary
                }).ToList() ?? new List<StructureProductShopProductCategoryResponse>(),
                OptionDetails = product.StructureProductStructureOptionDetails?.Select(o => new StructureProductStructureOptionDetailResponse
                {
                    IdStructureProductStructureOptionDetail = o.IdStructureProductStructureOptionDetail,
                    IdStructureProduct = o.IdStructureProduct,
                    IdStructureOptionDetail = o.IdStructureOptionDetail,
                    ShouldOverridePrice = o.ShouldOverridePrice,
                    Price = o.Price
                }).ToList() ?? new List<StructureProductStructureOptionDetailResponse>(),
                AttributeDetails = product.StructureProductStructureProductAttrributeDetails?.Select(a => new StructureProductStructureProductAttrributeDetailResponse
                {
                    IdStructureProductStructureProductAttrributeDetail = a.IdStructureProductStructureProductAttrributeDetail,
                    IdStructureProduct = a.IdStructureProduct,
                    IdStructureAttrributeDetail = a.IdStructureAttrributeDetail,
                    AttributeValue = a.AttributeValue
                }).ToList() ?? new List<StructureProductStructureProductAttrributeDetailResponse>()
            };
        }

        public BusinessResponse<SaveStructureProductResponse> SaveStructureProduct(SaveStructureProductRequest request)
        {
            BusinessResponse<SaveStructureProductResponse> response = new BusinessResponse<SaveStructureProductResponse>();
            try
            {
                response.Result = SaveStructureProductRaw(request);
            }
            catch (Exception ex)
            {
                response.Exception = new BusinessLayerException(ex.Message, ex);
            }

            return response;
        }

        public SaveStructureProductResponse SaveStructureProductRaw(SaveStructureProductRequest request)
        {
            var idUser = _globalDataService.GetVariable<string>(ApplicationConstant.IDUSER);
            var idTenant = _globalDataService.GetVariable<string>(ApplicationConstant.IDTENANT);

            // Verify that the structure belongs to a shop
            var structure = _unitOfWork.StructureDao.GetCustom(s => s.IdStructure == request.IdStructure);
            if (structure == null || string.IsNullOrEmpty(structure.IdShop))
            {
                throw new Exception("Structure not found or does not have a shop");
            }

            StructureProduct product;

            bool isAdding = string.IsNullOrEmpty(request.IdStructureProduct);

            if (!isAdding)
            {
                // Update existing product
                product = _unitOfWork.StructureProductDao.GetCustom(
                    p => p.IdStructureProduct == request.IdStructureProduct && p.IdStructure == request.IdStructure,
                    new List<string>()
                    {
                        "StructureProductDocuments",
                        "StructureProductDocuments.IdDocumentNavigation",
                        "StructureProductShopProductCategories",
                        "StructureProductStructureOptionDetails",
                        "StructureProductStructureProductAttrributeDetails"
                    }
                );

                if (product == null)
                {
                    throw new Exception("Product not found");
                }

                // Delete existing documents that are not in the request
                if (product.StructureProductDocuments != null)
                {
                    var documentsToDelete = product.StructureProductDocuments
                        .Where(d => request.Documents == null || 
                            !request.Documents.Any(rd => rd.IdStructureProductDocument == d.IdStructureProductDocument))
                        .ToList();

                    foreach (var doc in documentsToDelete)
                    {
                        // Delete the document file if it exists
                        if (doc.IdDocumentNavigation != null)
                        {
                            _unitOfWork.DocumentDao.Delete(doc.IdDocumentNavigation);
                        }
                        _unitOfWork.StructureProductDocumentDao.Delete(doc);
                    }
                }

                // Delete existing categories that are not in the request
                if (product.StructureProductShopProductCategories != null)
                {
                    var categoriesToDelete = product.StructureProductShopProductCategories
                        .Where(c => request.Categories == null || 
                            !request.Categories.Any(rc => rc.IdStructureProductShopProductCategory == c.IdStructureProductShopProductCategory))
                        .ToList();

                    foreach (var cat in categoriesToDelete)
                    {
                        _unitOfWork.StructureProductShopProductCategoryDao.Delete(cat);
                    }
                }

                // Delete existing option details that are not in the request
                if (product.StructureProductStructureOptionDetails != null)
                {
                    var optionDetailsToDelete = product.StructureProductStructureOptionDetails
                        .Where(o => request.OptionDetails == null || 
                            !request.OptionDetails.Any(ro => ro.IdStructureProductStructureOptionDetail == o.IdStructureProductStructureOptionDetail))
                        .ToList();

                    foreach (var opt in optionDetailsToDelete)
                    {
                        _unitOfWork.StructureProductStructureOptionDetailDao.Delete(opt);
                    }
                }

                // Delete existing attribute details that are not in the request
                if (product.StructureProductStructureProductAttrributeDetails != null)
                {
                    var attributeDetailsToDelete = product.StructureProductStructureProductAttrributeDetails
                        .Where(a => request.AttributeDetails == null || 
                            !request.AttributeDetails.Any(ra => ra.IdStructureProductStructureProductAttrributeDetail == a.IdStructureProductStructureProductAttrributeDetail))
                        .ToList();

                    foreach (var attr in attributeDetailsToDelete)
                    {
                        _unitOfWork.StructureProductStructureProductAttrributeDetailDao.Delete(attr);
                    }
                }
            }
            else
            {
                // Create new product
                product = new StructureProduct
                {
                    IdStructure = request.IdStructure
                };
                _unitOfWork.StructureProductDao.Add(product);
            }

            // Update product properties
            product.Name = request.Name;
            product.Description = request.Description;
            product.ShortDescription = request.ShortDescription;
            product.Sku = request.Sku;
            product.BasePrice = request.BasePrice;
            product.IsFeaturedOnFront = request.IsFeaturedOnFront;
            product.IdStructureAttrribute = string.IsNullOrEmpty(request.IdStructureAttrribute) ? null : request.IdStructureAttrribute;

            // Handle documents
            if (request.Documents != null)
            {
                foreach (var docRequest in request.Documents)
                {
                    StructureProductDocument doc;

                    bool isAddingDoc = string.IsNullOrEmpty(docRequest.IdStructureProductDocument);

                    if (!isAddingDoc)
                    {
                        // Update existing document
                        doc = product.StructureProductDocuments?
                            .FirstOrDefault(d => d.IdStructureProductDocument == docRequest.IdStructureProductDocument);

                        if (doc == null)
                        {
                            throw new Exception($"Product document not found: {docRequest.IdStructureProductDocument}");
                        }

                        // Delete old document if it's being replaced
                        if (!string.IsNullOrEmpty(doc.IdDocument) && 
                            docRequest.Document?.IdDocument != doc.IdDocument)
                        {
                            var oldDocument = _unitOfWork.DocumentDao.GetCustom(d => d.IdDocument == doc.IdDocument);
                            if (oldDocument != null)
                            {
                                _unitOfWork.DocumentDao.Delete(oldDocument);
                            }
                        }
                    }
                    else
                    {
                        // Create new document
                        doc = new StructureProductDocument
                        {
                            IdStructureProduct = product.IdStructureProduct
                        };
                        _unitOfWork.StructureProductDocumentDao.Add(doc);
                    }

                    // Update document properties
                    doc.IdDocument = docRequest.Document?.IdDocument;
                    doc.IsPrimary = docRequest.IsPrimary;
                    doc.DisplayOrder = docRequest.DisplayOrder;
                }
            }

            // Handle categories
            if (request.Categories != null)
            {
                foreach (var catRequest in request.Categories)
                {
                    StructureProductShopProductCategory cat;

                    bool isAddingCat = string.IsNullOrEmpty(catRequest.IdStructureProductShopProductCategory);

                    if (!isAddingCat)
                    {
                        // Update existing category
                        cat = product.StructureProductShopProductCategories?
                            .FirstOrDefault(c => c.IdStructureProductShopProductCategory == catRequest.IdStructureProductShopProductCategory);

                        if (cat == null)
                        {
                            throw new Exception($"Product category not found: {catRequest.IdStructureProductShopProductCategory}");
                        }
                    }
                    else
                    {
                        // Create new category
                        cat = new StructureProductShopProductCategory
                        {
                            IdStructureProduct = product.IdStructureProduct
                        };
                        _unitOfWork.StructureProductShopProductCategoryDao.Add(cat);
                    }

                    // Update category properties
                    cat.IdShopProductCategory = catRequest.IdShopProductCategory;
                    cat.IsPrimary = catRequest.IsPrimary;
                }
            }

            // Handle option details
            if (request.OptionDetails != null)
            {
                foreach (var optRequest in request.OptionDetails)
                {
                    StructureProductStructureOptionDetail opt;

                    bool isAddingOpt = string.IsNullOrEmpty(optRequest.IdStructureProductStructureOptionDetail);

                    if (!isAddingOpt)
                    {
                        // Update existing option detail
                        opt = product.StructureProductStructureOptionDetails?
                            .FirstOrDefault(o => o.IdStructureProductStructureOptionDetail == optRequest.IdStructureProductStructureOptionDetail);

                        if (opt == null)
                        {
                            throw new Exception($"Product option detail not found: {optRequest.IdStructureProductStructureOptionDetail}");
                        }
                    }
                    else
                    {
                        // Create new option detail
                        opt = new StructureProductStructureOptionDetail
                        {
                            IdStructureProduct = product.IdStructureProduct
                        };
                        _unitOfWork.StructureProductStructureOptionDetailDao.Add(opt);
                    }

                    // Update option detail properties
                    opt.IdStructureOptionDetail = optRequest.IdStructureOptionDetail;
                    opt.ShouldOverridePrice = optRequest.ShouldOverridePrice;
                    opt.Price = optRequest.Price;
                }
            }

            // Handle attribute details
            if (request.AttributeDetails != null)
            {
                foreach (var attrRequest in request.AttributeDetails)
                {
                    StructureProductStructureProductAttrributeDetail attr;

                    bool isAddingAttr = string.IsNullOrEmpty(attrRequest.IdStructureProductStructureProductAttrributeDetail);

                    if (!isAddingAttr)
                    {
                        // Update existing attribute detail
                        attr = product.StructureProductStructureProductAttrributeDetails?
                            .FirstOrDefault(a => a.IdStructureProductStructureProductAttrributeDetail == attrRequest.IdStructureProductStructureProductAttrributeDetail);

                        if (attr == null)
                        {
                            throw new Exception($"Product attribute detail not found: {attrRequest.IdStructureProductStructureProductAttrributeDetail}");
                        }
                    }
                    else
                    {
                        // Create new attribute detail
                        attr = new StructureProductStructureProductAttrributeDetail
                        {
                            IdStructureProduct = product.IdStructureProduct
                        };
                        _unitOfWork.StructureProductStructureProductAttrributeDetailDao.Add(attr);
                    }

                    // Update attribute detail properties
                    attr.IdStructureAttrributeDetail = attrRequest.IdStructureAttrributeDetail;
                    attr.AttributeValue = attrRequest.AttributeValue;
                }
            }

            _unitOfWork.Save();

            // Reload product with all related data to get the IDs
            product = _unitOfWork.StructureProductDao.GetCustom(
                p => p.IdStructureProduct == product.IdStructureProduct,
                new List<string>()
                {
                    "StructureProductDocuments",
                    "StructureProductDocuments.IdDocumentNavigation",
                    "StructureProductDocuments.IdDocumentNavigation.IdParameterBaseServerUrlNavigation",
                    "StructureProductShopProductCategories",
                    "StructureProductStructureOptionDetails",
                    "StructureProductStructureProductAttrributeDetails"
                }
            );

            return new SaveStructureProductResponse
            {
                IdStructureProduct = product.IdStructureProduct,
                IdStructure = product.IdStructure,
                Documents = product.StructureProductDocuments?.Select(d => new StructureProductDocumentResponse
                {
                    IdStructureProductDocument = d.IdStructureProductDocument,
                    IdStructureProduct = d.IdStructureProduct,
                    IdDocument = d.IdDocument,
                    IsPrimary = d.IsPrimary,
                    DisplayOrder = d.DisplayOrder,
                    Document = d.IdDocumentNavigation != null ? new DocumentResponse()
                    {
                        IdDocument = d.IdDocumentNavigation.IdDocument,
                        Name = d.IdDocumentNavigation.FileName,
                        Url = String.Format("{0}/{1}", 
                            d.IdDocumentNavigation?.IdParameterBaseServerUrlNavigation?.ParamaterValue, 
                            d.IdDocumentNavigation?.ServerFilePath)
                    } : null
                }).ToList() ?? new List<StructureProductDocumentResponse>(),
                Categories = product.StructureProductShopProductCategories?.Select(c => new StructureProductShopProductCategoryResponse
                {
                    IdStructureProductShopProductCategory = c.IdStructureProductShopProductCategory,
                    IdStructureProduct = c.IdStructureProduct,
                    IdShopProductCategory = c.IdShopProductCategory,
                    IsPrimary = c.IsPrimary
                }).ToList() ?? new List<StructureProductShopProductCategoryResponse>(),
                OptionDetails = product.StructureProductStructureOptionDetails?.Select(o => new StructureProductStructureOptionDetailResponse
                {
                    IdStructureProductStructureOptionDetail = o.IdStructureProductStructureOptionDetail,
                    IdStructureProduct = o.IdStructureProduct,
                    IdStructureOptionDetail = o.IdStructureOptionDetail,
                    ShouldOverridePrice = o.ShouldOverridePrice,
                    Price = o.Price
                }).ToList() ?? new List<StructureProductStructureOptionDetailResponse>(),
                AttributeDetails = product.StructureProductStructureProductAttrributeDetails?.Select(a => new StructureProductStructureProductAttrributeDetailResponse
                {
                    IdStructureProductStructureProductAttrributeDetail = a.IdStructureProductStructureProductAttrributeDetail,
                    IdStructureProduct = a.IdStructureProduct,
                    IdStructureAttrributeDetail = a.IdStructureAttrributeDetail,
                    AttributeValue = a.AttributeValue
                }).ToList() ?? new List<StructureProductStructureProductAttrributeDetailResponse>()
            };
        }

        public BusinessResponse<DeleteStructureProductResponse> DeleteStructureProduct(DeleteStructureProductRequest request)
        {
            BusinessResponse<DeleteStructureProductResponse> response = new BusinessResponse<DeleteStructureProductResponse>();
            try
            {
                response.Result = DeleteStructureProductRaw(request);
            }
            catch (Exception ex)
            {
                response.Exception = new BusinessLayerException(ex.Message, ex);
            }

            return response;
        }

        public DeleteStructureProductResponse DeleteStructureProductRaw(DeleteStructureProductRequest request)
        {
            var idUser = _globalDataService.GetVariable<string>(ApplicationConstant.IDUSER);
            var idTenant = _globalDataService.GetVariable<string>(ApplicationConstant.IDTENANT);

            // Verify that the structure belongs to a shop
            var structure = _unitOfWork.StructureDao.GetCustom(s => s.IdStructure == request.IdStructure);
            if (structure == null || string.IsNullOrEmpty(structure.IdShop))
            {
                throw new Exception("Structure not found or does not have a shop");
            }

            //// Get product with all related data
            var product = _unitOfWork.StructureProductDao.GetCustom(
                p => p.IdStructureProduct == request.IdStructureProduct && p.IdStructure == request.IdStructure,
                new List<string>()
                {
                    "StructureProductDocuments",
                    "StructureProductDocuments.IdDocumentNavigation",
                    "StructureProductShopProductCategories",
                    "StructureProductStructureOptionDetails",
                    "StructureProductStructureProductAttrributeDetails"
                }
            );

            product.IsDeactivated = true;

            //if (product == null)
            //{
            //    throw new Exception("Product not found");
            //}

            //// Delete all documents
            //if (product.StructureProductDocuments != null && product.StructureProductDocuments.Any())
            //{
            //    foreach (var doc in product.StructureProductDocuments.ToList())
            //    {
            //        if (doc.IdDocumentNavigation != null)
            //        {
            //            _unitOfWork.DocumentDao.Delete(doc.IdDocumentNavigation);
            //        }
            //        _unitOfWork.StructureProductDocumentDao.Delete(doc);
            //    }
            //}

            //// Delete all categories
            //if (product.StructureProductShopProductCategories != null && product.StructureProductShopProductCategories.Any())
            //{
            //    foreach (var cat in product.StructureProductShopProductCategories.ToList())
            //    {
            //        _unitOfWork.StructureProductShopProductCategoryDao.Delete(cat);
            //    }
            //}

            //// Delete all option details
            //if (product.StructureProductStructureOptionDetails != null && product.StructureProductStructureOptionDetails.Any())
            //{
            //    foreach (var opt in product.StructureProductStructureOptionDetails.ToList())
            //    {
            //        _unitOfWork.StructureProductStructureOptionDetailDao.Delete(opt);
            //    }
            //}

            //// Delete all attribute details
            //if (product.StructureProductStructureProductAttrributeDetails != null && product.StructureProductStructureProductAttrributeDetails.Any())
            //{
            //    foreach (var attr in product.StructureProductStructureProductAttrributeDetails.ToList())
            //    {
            //        _unitOfWork.StructureProductStructureProductAttrributeDetailDao.Delete(attr);
            //    }
            //}

            //// Delete the product
            //_unitOfWork.StructureProductDao.Delete(product);
            _unitOfWork.Save();

            return new DeleteStructureProductResponse
            {
                Success = true
            };
        }
    }
}
