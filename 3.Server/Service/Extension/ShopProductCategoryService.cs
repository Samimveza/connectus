using Business.Common;
using Business.Dto.Request.ShopProductCategory;
using Business.Dto.Response;
using Business.Dto.Response.ShopProductCategory;
using Business.ExtensionMethod;
using Business.Model;
using Business.Utils;
using Data.Interfaces;
using Microsoft.EntityFrameworkCore;
using Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using static Business.Enums.Constants;

namespace Service.Extension
{
    public class ShopProductCategoryService : IShopProductCategoryService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IGlobalDataService _globalDataService;

        public ShopProductCategoryService(
            IUnitOfWork unitOfWork,
            IGlobalDataService globalDataService)
        {
            _unitOfWork = unitOfWork;
            _globalDataService = globalDataService;
        }

        public BusinessResponse<ShopProductCategoryListResponse> GetShopProductCategories(GetShopProductCategoriesRequest request)
        {
            BusinessResponse<ShopProductCategoryListResponse> response = new BusinessResponse<ShopProductCategoryListResponse>();
            try
            {
                response.Result = GetShopProductCategoriesRaw(request);
            }
            catch (Exception ex)
            {
                response.Exception = new BusinessLayerException(ex.Message, ex);
            }

            return response;
        }

        public ShopProductCategoryListResponse GetShopProductCategoriesRaw(GetShopProductCategoriesRequest request)
        {
            var idUser = _globalDataService.GetVariable<string>(ApplicationConstant.IDUSER);
            var idTenant = _globalDataService.GetVariable<string>(ApplicationConstant.IDTENANT);


            // Verify that the structure belongs to a shop
            //var structure = _unitOfWork.StructureDao.GetCustom(s => s.IdStructure == request.IdStructure);
            //if (structure == null || string.IsNullOrEmpty(structure.IdShop))
            //{
            //    throw new Exception("Structure not found or does not have a shop");
            //}

            // Get all categories for this structure
            var allCategories = _unitOfWork.ShopProductCategoryDao.GetListCustom<string>(
                -1, 0,
                c => c.IdStructure == request.IdStructure,
                o => o.Name,
                new List<string>()
                {
                    "IdCoverPictureNavigation",
                    "IdCoverPictureNavigation.IdParameterBaseServerUrlNavigation"
                }
            ).EntityList;

            // Build flat list of responses
            var categoryResponses = allCategories.Select(c => new ShopProductCategoryResponse
            {
                IdShopProductCategory = c.IdShopProductCategory,
                IdParentShopProductCategory = c.IdParentShopProductCategory,
                Name = c.Name,
                CoverPicture = c.IdCoverPictureNavigation != null ? new DocumentResponse()
                {
                    Name = c.IdCoverPictureNavigation.FileName,
                    Url = String.Format("{0}/{1}", 
                        c.IdCoverPictureNavigation?.IdParameterBaseServerUrlNavigation?.ParamaterValue, 
                        c.IdCoverPictureNavigation?.ServerFilePath)
                } : null,
                Children = new List<ShopProductCategoryResponse>(),
                Description = c.Description
            }).ToList();

            // Build dictionary for fast lookup
            var lookup = categoryResponses.ToDictionary(c => c.IdShopProductCategory);

            // Build tree structure
            List<ShopProductCategoryResponse> roots = new List<ShopProductCategoryResponse>();

            foreach (var category in categoryResponses)
            {
                if (!string.IsNullOrEmpty(category.IdParentShopProductCategory))
                {
                    if (lookup.TryGetValue(category.IdParentShopProductCategory, out var parent))
                    {
                        parent.Children.Add(category);
                    }
                }
                else
                {
                    roots.Add(category);
                }
            }

            return new ShopProductCategoryListResponse
            {
                Categories = roots
            };
        }

        public BusinessResponse<SaveShopProductCategoryResponse> SaveShopProductCategory(SaveShopProductCategoryRequest request)
        {
            BusinessResponse<SaveShopProductCategoryResponse> response = new BusinessResponse<SaveShopProductCategoryResponse>();
            try
            {
                response.Result = SaveShopProductCategoryRaw(request);
            }
            catch (Exception ex)
            {
                response.Exception = new BusinessLayerException(ex.Message, ex);
            }

            return response;
        }

        public SaveShopProductCategoryResponse SaveShopProductCategoryRaw(SaveShopProductCategoryRequest request)
        {
            var idUser = _globalDataService.GetVariable<string>(ApplicationConstant.IDUSER);
            var idTenant = _globalDataService.GetVariable<string>(ApplicationConstant.IDTENANT);

            // Verify that the structure belongs to a shop
            var structure = _unitOfWork.StructureDao.GetCustom(s => s.IdStructure == request.IdStructure);
            if (structure == null || string.IsNullOrEmpty(structure.IdShop))
            {
                throw new Exception("Structure not found or does not have a shop");
            }

            ShopProductCategory category;

            bool isAdding = string.IsNullOrEmpty(request.IdShopProductCategory);

            if (!isAdding)
            {
                // Update existing category
                category = _unitOfWork.ShopProductCategoryDao.GetCustom(
                    c => c.IdShopProductCategory == request.IdShopProductCategory && c.IdStructure == request.IdStructure,
                    new List<string>()
                    {
                        "IdCoverPictureNavigation"
                    }
                );

                if (category == null)
                {
                    throw new Exception("Category not found");
                }

                // Delete old cover picture if it's being replaced
                if (!string.IsNullOrEmpty(category.IdCoverPicture) && 
                    request.CoverPicture?.IdDocument != category.IdCoverPicture)
                {
                    var oldDocument = _unitOfWork.DocumentDao.GetCustom(d => d.IdDocument == category.IdCoverPicture);
                    if (oldDocument != null)
                    {
                        _unitOfWork.DocumentDao.Delete(oldDocument);
                    }
                }
            }
            else
            {
                // Create new category
                category = new ShopProductCategory
                {
                    IdStructure = request.IdStructure
                };
                _unitOfWork.ShopProductCategoryDao.Add(category);
            }

            // Update category properties
            category.Name = request.Name;
            category.IdParentShopProductCategory = string.IsNullOrEmpty(request.IdParentShopProductCategory) ? null : request.IdParentShopProductCategory;

            // Handle cover picture
            if (!string.IsNullOrEmpty(request.CoverPicture?.IdDocument))
            {
                category.IdCoverPicture = request.CoverPicture.IdDocument;
            }
            else if (isAdding)
            {
                category.IdCoverPicture = null;
            }

            _unitOfWork.Save();

            return new SaveShopProductCategoryResponse
            {
                IdShopProductCategory = category.IdShopProductCategory
            };
        }

        public BusinessResponse<DeleteShopProductCategoryResponse> DeleteShopProductCategory(DeleteShopProductCategoryRequest request)
        {
            BusinessResponse<DeleteShopProductCategoryResponse> response = new BusinessResponse<DeleteShopProductCategoryResponse>();
            try
            {
                response.Result = DeleteShopProductCategoryRaw(request);
            }
            catch (Exception ex)
            {
                response.Exception = new BusinessLayerException(ex.Message, ex);
            }

            return response;
        }

        public DeleteShopProductCategoryResponse DeleteShopProductCategoryRaw(DeleteShopProductCategoryRequest request)
        {
            var idUser = _globalDataService.GetVariable<string>(ApplicationConstant.IDUSER);
            var idTenant = _globalDataService.GetVariable<string>(ApplicationConstant.IDTENANT);

            // Verify that the structure belongs to a shop
            var structure = _unitOfWork.StructureDao.GetCustom(s => s.IdStructure == request.IdStructure);
            if (structure == null || string.IsNullOrEmpty(structure.IdShop))
            {
                throw new Exception("Structure not found or does not have a shop");
            }

            // Get category with all related data
            var category = _unitOfWork.ShopProductCategoryDao.GetCustom(
                c => c.IdShopProductCategory == request.IdShopProductCategory && c.IdStructure == request.IdStructure,
                new List<string>()
                {
                    "IdCoverPictureNavigation",
                    "InverseIdParentShopProductCategoryNavigation",
                    "StructureProductShopProductCategories"
                }
            );

            if (category == null)
            {
                throw new Exception("Category not found");
            }

            // Check if category has children
            if (category.InverseIdParentShopProductCategoryNavigation != null && 
                category.InverseIdParentShopProductCategoryNavigation.Any())
            {
                throw new Exception("Cannot delete category with child categories. Please delete child categories first.");
            }

            // Check if category has products
            if (category.StructureProductShopProductCategories != null && 
                category.StructureProductShopProductCategories.Any())
            {
                throw new Exception("Cannot delete category that has products assigned.");
            }

            // Delete cover picture if exists
            if (!string.IsNullOrEmpty(category.IdCoverPicture))
            {
                var document = _unitOfWork.DocumentDao.GetCustom(d => d.IdDocument == category.IdCoverPicture);
                if (document != null)
                {
                    _unitOfWork.DocumentDao.Delete(document);
                }
            }

            // Delete the category
            _unitOfWork.ShopProductCategoryDao.Delete(category);
            _unitOfWork.Save();

            return new DeleteShopProductCategoryResponse
            {
                Success = true
            };
        }
    }
}
