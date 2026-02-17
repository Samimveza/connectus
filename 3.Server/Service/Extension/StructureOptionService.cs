using Business.Common;
using Business.Dto.Request.StructureOption;
using Business.Dto.Response.StructureOption;
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
    public class StructureOptionService : IStructureOptionService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IGlobalDataService _globalDataService;

        public StructureOptionService(
            IUnitOfWork unitOfWork,
            IGlobalDataService globalDataService)
        {
            _unitOfWork = unitOfWork;
            _globalDataService = globalDataService;
        }

        public BusinessResponse<StructureOptionListResponse> GetStructureOptions(GetStructureOptionsRequest request)
        {
            BusinessResponse<StructureOptionListResponse> response = new BusinessResponse<StructureOptionListResponse>();
            try
            {
                response.Result = GetStructureOptionsRaw(request);
            }
            catch (Exception ex)
            {
                response.Exception = new BusinessLayerException(ex.Message, ex);
            }

            return response;
        }

        public StructureOptionListResponse GetStructureOptionsRaw(GetStructureOptionsRequest request)
        {
            var idUser = _globalDataService.GetVariable<string>(ApplicationConstant.IDUSER);
            var idTenant = _globalDataService.GetVariable<string>(ApplicationConstant.IDTENANT);

            // Verify that the structure belongs to a shop
            var structure = _unitOfWork.StructureDao.GetCustom(s => s.IdStructure == request.IdStructure);
            if (structure == null || string.IsNullOrEmpty(structure.IdShop))
            {
                throw new Exception("Structure not found or does not have a shop");
            }

            // Get all options for this structure with their details
            var allOptions = _unitOfWork.StructureOptionDao.GetListCustom<string>(
                -1, 0,
                o => o.IdStructure == request.IdStructure,
                o => o.Name,
                new List<string>()
                {
                    "StructureOptionDetails"
                }
            ).EntityList;

            // Map to response
            var optionResponses = allOptions.Select(o => new StructureOptionResponse
            {
                IdStructureOption = o.IdStructureOption,
                IdStructure = o.IdStructure,
                Name = o.Name,
                IsMandatory = o.IsMandatory,
                CanAllowSameMultipleTime = o.CanAllowSameMultipleTime,
                ForceMinumum = o.ForceMinumum,
                ForceMaximum = o.ForceMaximum,
                Details = o.StructureOptionDetails?.Select(d => new StructureOptionDetailResponse
                {
                    IdStructureOptionDetail = d.IdStructureOptionDetail,
                    IdStructureOption = d.IdStructureOption,
                    Name = d.Name,
                    IsPreSelected = d.IsPreSelected,
                    Price = d.Price
                }).ToList() ?? new List<StructureOptionDetailResponse>()
            }).ToList();

            return new StructureOptionListResponse
            {
                Options = optionResponses
            };
        }

        public BusinessResponse<SaveStructureOptionResponse> SaveStructureOption(SaveStructureOptionRequest request)
        {
            BusinessResponse<SaveStructureOptionResponse> response = new BusinessResponse<SaveStructureOptionResponse>();
            try
            {
                response.Result = SaveStructureOptionRaw(request);
            }
            catch (Exception ex)
            {
                response.Exception = new BusinessLayerException(ex.Message, ex);
            }

            return response;
        }

        public SaveStructureOptionResponse SaveStructureOptionRaw(SaveStructureOptionRequest request)
        {
            var idUser = _globalDataService.GetVariable<string>(ApplicationConstant.IDUSER);
            var idTenant = _globalDataService.GetVariable<string>(ApplicationConstant.IDTENANT);

            // Verify that the structure belongs to a shop
            var structure = _unitOfWork.StructureDao.GetCustom(s => s.IdStructure == request.IdStructure);
            if (structure == null || string.IsNullOrEmpty(structure.IdShop))
            {
                throw new Exception("Structure not found or does not have a shop");
            }

            StructureOption option;

            bool isAdding = string.IsNullOrEmpty(request.IdStructureOption);

            if (!isAdding)
            {
                // Update existing option
                option = _unitOfWork.StructureOptionDao.GetCustom(
                    o => o.IdStructureOption == request.IdStructureOption && o.IdStructure == request.IdStructure,
                    new List<string>()
                    {
                        "StructureOptionDetails"
                    }
                );

                if (option == null)
                {
                    throw new Exception("Option not found");
                }

                // Delete existing details that are not in the request
                if (option.StructureOptionDetails != null)
                {
                    var detailsToDelete = option.StructureOptionDetails
                        .Where(d => request.Details == null || 
                            !request.Details.Any(rd => rd.IdStructureOptionDetail == d.IdStructureOptionDetail))
                        .ToList();

                    foreach (var detail in detailsToDelete)
                    {
                        _unitOfWork.StructureOptionDetailDao.Delete(detail);
                    }
                }
            }
            else
            {
                // Create new option
                option = new StructureOption
                {
                    IdStructure = request.IdStructure
                };
                _unitOfWork.StructureOptionDao.Add(option);
            }

            // Update option properties
            option.Name = request.Name;
            option.IsMandatory = request.IsMandatory;
            option.CanAllowSameMultipleTime = request.CanAllowSameMultipleTime;
            option.ForceMinumum = request.ForceMinumum;
            option.ForceMaximum = request.ForceMaximum;

            // Handle details
            if (request.Details != null)
            {
                foreach (var detailRequest in request.Details)
                {
                    StructureOptionDetail detail;

                    bool isAddingDetail = string.IsNullOrEmpty(detailRequest.IdStructureOptionDetail);

                    if (!isAddingDetail)
                    {
                        // Update existing detail
                        detail = option.StructureOptionDetails?
                            .FirstOrDefault(d => d.IdStructureOptionDetail == detailRequest.IdStructureOptionDetail);

                        if (detail == null)
                        {
                            throw new Exception($"Option detail not found: {detailRequest.IdStructureOptionDetail}");
                        }
                    }
                    else
                    {
                        // Create new detail
                        detail = new StructureOptionDetail
                        {
                            IdStructureOption = option.IdStructureOption
                        };
                        _unitOfWork.StructureOptionDetailDao.Add(detail);
                    }

                    // Update detail properties
                    detail.Name = detailRequest.Name;
                    detail.IsPreSelected = detailRequest.IsPreSelected;
                    detail.Price = detailRequest.Price;
                }
            }

            _unitOfWork.Save();

            // Reload option with details to get the IDs
            option = _unitOfWork.StructureOptionDao.GetCustom(
                o => o.IdStructureOption == option.IdStructureOption,
                new List<string>()
                {
                    "StructureOptionDetails"
                }
            );

            return new SaveStructureOptionResponse
            {
                IdStructureOption = option.IdStructureOption,
                Details = option.StructureOptionDetails?.Select(d => new StructureOptionDetailResponse
                {
                    IdStructureOptionDetail = d.IdStructureOptionDetail,
                    IdStructureOption = d.IdStructureOption,
                    Name = d.Name,
                    IsPreSelected = d.IsPreSelected,
                    Price = d.Price
                }).ToList() ?? new List<StructureOptionDetailResponse>()
            };
        }

        public BusinessResponse<DeleteStructureOptionResponse> DeleteStructureOption(DeleteStructureOptionRequest request)
        {
            BusinessResponse<DeleteStructureOptionResponse> response = new BusinessResponse<DeleteStructureOptionResponse>();
            try
            {
                response.Result = DeleteStructureOptionRaw(request);
            }
            catch (Exception ex)
            {
                response.Exception = new BusinessLayerException(ex.Message, ex);
            }

            return response;
        }

        public DeleteStructureOptionResponse DeleteStructureOptionRaw(DeleteStructureOptionRequest request)
        {
            var idUser = _globalDataService.GetVariable<string>(ApplicationConstant.IDUSER);
            var idTenant = _globalDataService.GetVariable<string>(ApplicationConstant.IDTENANT);

            // Verify that the structure belongs to a shop
            var structure = _unitOfWork.StructureDao.GetCustom(s => s.IdStructure == request.IdStructure);
            if (structure == null || string.IsNullOrEmpty(structure.IdShop))
            {
                throw new Exception("Structure not found or does not have a shop");
            }

            // Get option with all related data
            var option = _unitOfWork.StructureOptionDao.GetCustom(
                o => o.IdStructureOption == request.IdStructureOption && o.IdStructure == request.IdStructure,
                new List<string>()
                {
                    "StructureOptionDetails",
                    "StructureOptionDetails.StructureProductStructureOptionDetails"
                }
            );

            if (option == null)
            {
                throw new Exception("Option not found");
            }

            // Check if any option detail has products assigned
            if (option.StructureOptionDetails != null)
            {
                foreach (var detail in option.StructureOptionDetails)
                {
                    if (detail.StructureProductStructureOptionDetails != null && 
                        detail.StructureProductStructureOptionDetails.Any())
                    {
                        throw new Exception($"Cannot delete option. Option detail '{detail.Name}' has products assigned.");
                    }
                }
            }

            // Delete all option details
            if (option.StructureOptionDetails != null && option.StructureOptionDetails.Any())
            {
                foreach (var detail in option.StructureOptionDetails.ToList())
                {
                    _unitOfWork.StructureOptionDetailDao.Delete(detail);
                }
            }

            // Delete the option
            _unitOfWork.StructureOptionDao.Delete(option);
            _unitOfWork.Save();

            return new DeleteStructureOptionResponse
            {
                Success = true
            };
        }
    }
}
