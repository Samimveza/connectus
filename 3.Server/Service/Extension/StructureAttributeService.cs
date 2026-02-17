using Business.Common;
using Business.Dto.Request.StructureAttribute;
using Business.Dto.Response.StructureAttribute;
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
    public class StructureAttributeService : IStructureAttributeService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IGlobalDataService _globalDataService;

        public StructureAttributeService(
            IUnitOfWork unitOfWork,
            IGlobalDataService globalDataService)
        {
            _unitOfWork = unitOfWork;
            _globalDataService = globalDataService;
        }

        public BusinessResponse<StructureAttributeListResponse> GetStructureAttributes(GetStructureAttributesRequest request)
        {
            BusinessResponse<StructureAttributeListResponse> response = new BusinessResponse<StructureAttributeListResponse>();
            try
            {
                response.Result = GetStructureAttributesRaw(request);
            }
            catch (Exception ex)
            {
                response.Exception = new BusinessLayerException(ex.Message, ex);
            }

            return response;
        }

        public StructureAttributeListResponse GetStructureAttributesRaw(GetStructureAttributesRequest request)
        {
            var idUser = _globalDataService.GetVariable<string>(ApplicationConstant.IDUSER);
            var idTenant = _globalDataService.GetVariable<string>(ApplicationConstant.IDTENANT);

            // Verify that the structure belongs to a shop
            var structure = _unitOfWork.StructureDao.GetCustom(s => s.IdStructure == request.IdStructure);
            if (structure == null || string.IsNullOrEmpty(structure.IdShop))
            {
                throw new Exception("Structure not found or does not have a shop");
            }

            // Get all attributes for this structure with their details
            var allAttributes = _unitOfWork.StructureAttrributeDao.GetListCustom<string>(
                -1, 0,
                a => a.IdStructure == request.IdStructure,
                o => o.Name,
                new List<string>()
                {
                    "StructureAttrributeDetails"
                }
            ).EntityList;

            // Map to response
            var attributeResponses = allAttributes.Select(a => new StructureAttributeResponse
            {
                IdStructureAttrribute = a.IdStructureAttrribute,
                IdStructure = a.IdStructure,
                Name = a.Name,
                Details = a.StructureAttrributeDetails?.Select(d => new StructureAttrributeDetailResponse
                {
                    IdStructureAttrributeDetail = d.IdStructureAttrributeDetail,
                    IdStructureAttrribute = d.IdStructureAttrribute,
                    Name = d.Name
                }).ToList() ?? new List<StructureAttrributeDetailResponse>()
            }).ToList();

            return new StructureAttributeListResponse
            {
                Attributes = attributeResponses
            };
        }

        public BusinessResponse<SaveStructureAttributeResponse> SaveStructureAttribute(SaveStructureAttributeRequest request)
        {
            BusinessResponse<SaveStructureAttributeResponse> response = new BusinessResponse<SaveStructureAttributeResponse>();
            try
            {
                response.Result = SaveStructureAttributeRaw(request);
            }
            catch (Exception ex)
            {
                response.Exception = new BusinessLayerException(ex.Message, ex);
            }

            return response;
        }

        public SaveStructureAttributeResponse SaveStructureAttributeRaw(SaveStructureAttributeRequest request)
        {
            var idUser = _globalDataService.GetVariable<string>(ApplicationConstant.IDUSER);
            var idTenant = _globalDataService.GetVariable<string>(ApplicationConstant.IDTENANT);

            // Verify that the structure belongs to a shop
            var structure = _unitOfWork.StructureDao.GetCustom(s => s.IdStructure == request.IdStructure);
            if (structure == null || string.IsNullOrEmpty(structure.IdShop))
            {
                throw new Exception("Structure not found or does not have a shop");
            }

            StructureAttrribute attribute;

            bool isAdding = string.IsNullOrEmpty(request.IdStructureAttrribute);

            if (!isAdding)
            {
                // Update existing attribute
                attribute = _unitOfWork.StructureAttrributeDao.GetCustom(
                    a => a.IdStructureAttrribute == request.IdStructureAttrribute && a.IdStructure == request.IdStructure,
                    new List<string>()
                    {
                        "StructureAttrributeDetails"
                    }
                );

                if (attribute == null)
                {
                    throw new Exception("Attribute not found");
                }

                // Delete existing details that are not in the request
                if (attribute.StructureAttrributeDetails != null)
                {
                    var detailsToDelete = attribute.StructureAttrributeDetails
                        .Where(d => request.Details == null || 
                            !request.Details.Any(rd => rd.IdStructureAttrributeDetail == d.IdStructureAttrributeDetail))
                        .ToList();

                    foreach (var detail in detailsToDelete)
                    {
                        _unitOfWork.StructureAttrributeDetailDao.Delete(detail);
                    }
                }
            }
            else
            {
                // Create new attribute
                attribute = new StructureAttrribute
                {
                    IdStructure = request.IdStructure
                };
                _unitOfWork.StructureAttrributeDao.Add(attribute);
            }

            // Update attribute properties
            attribute.Name = request.Name;

            // Handle details
            if (request.Details != null)
            {
                foreach (var detailRequest in request.Details)
                {
                    StructureAttrributeDetail detail;

                    bool isAddingDetail = string.IsNullOrEmpty(detailRequest.IdStructureAttrributeDetail);

                    if (!isAddingDetail)
                    {
                        // Update existing detail
                        detail = attribute.StructureAttrributeDetails?
                            .FirstOrDefault(d => d.IdStructureAttrributeDetail == detailRequest.IdStructureAttrributeDetail);

                        if (detail == null)
                        {
                            throw new Exception($"Attribute detail not found: {detailRequest.IdStructureAttrributeDetail}");
                        }
                    }
                    else
                    {
                        // Create new detail
                        detail = new StructureAttrributeDetail
                        {
                            IdStructureAttrribute = attribute.IdStructureAttrribute
                        };
                        _unitOfWork.StructureAttrributeDetailDao.Add(detail);
                    }

                    // Update detail properties
                    detail.Name = detailRequest.Name;
                }
            }

            _unitOfWork.Save();

            // Reload attribute with details to get the IDs
            attribute = _unitOfWork.StructureAttrributeDao.GetCustom(
                a => a.IdStructureAttrribute == attribute.IdStructureAttrribute,
                new List<string>()
                {
                    "StructureAttrributeDetails"
                }
            );

            return new SaveStructureAttributeResponse
            {
                IdStructureAttrribute = attribute.IdStructureAttrribute,
                Details = attribute.StructureAttrributeDetails?.Select(d => new StructureAttrributeDetailResponse
                {
                    IdStructureAttrributeDetail = d.IdStructureAttrributeDetail,
                    IdStructureAttrribute = d.IdStructureAttrribute,
                    Name = d.Name
                }).ToList() ?? new List<StructureAttrributeDetailResponse>()
            };
        }

        public BusinessResponse<DeleteStructureAttributeResponse> DeleteStructureAttribute(DeleteStructureAttributeRequest request)
        {
            BusinessResponse<DeleteStructureAttributeResponse> response = new BusinessResponse<DeleteStructureAttributeResponse>();
            try
            {
                response.Result = DeleteStructureAttributeRaw(request);
            }
            catch (Exception ex)
            {
                response.Exception = new BusinessLayerException(ex.Message, ex);
            }

            return response;
        }

        public DeleteStructureAttributeResponse DeleteStructureAttributeRaw(DeleteStructureAttributeRequest request)
        {
            var idUser = _globalDataService.GetVariable<string>(ApplicationConstant.IDUSER);
            var idTenant = _globalDataService.GetVariable<string>(ApplicationConstant.IDTENANT);

            // Verify that the structure belongs to a shop
            var structure = _unitOfWork.StructureDao.GetCustom(s => s.IdStructure == request.IdStructure);
            if (structure == null || string.IsNullOrEmpty(structure.IdShop))
            {
                throw new Exception("Structure not found or does not have a shop");
            }

            // Get attribute with all related data
            var attribute = _unitOfWork.StructureAttrributeDao.GetCustom(
                a => a.IdStructureAttrribute == request.IdStructureAttrribute && a.IdStructure == request.IdStructure,
                new List<string>()
                {
                    "StructureAttrributeDetails",
                    "StructureProducts"
                }
            );

            if (attribute == null)
            {
                throw new Exception("Attribute not found");
            }

            // Check if attribute has products
            if (attribute.StructureProducts != null && attribute.StructureProducts.Any())
            {
                throw new Exception("Cannot delete attribute that has products assigned.");
            }

            // Delete all attribute details
            if (attribute.StructureAttrributeDetails != null && attribute.StructureAttrributeDetails.Any())
            {
                foreach (var detail in attribute.StructureAttrributeDetails.ToList())
                {
                    _unitOfWork.StructureAttrributeDetailDao.Delete(detail);
                }
            }

            // Delete the attribute
            _unitOfWork.StructureAttrributeDao.Delete(attribute);
            _unitOfWork.Save();

            return new DeleteStructureAttributeResponse
            {
                Success = true
            };
        }
    }
}
