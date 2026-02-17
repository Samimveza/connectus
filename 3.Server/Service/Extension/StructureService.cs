using Business.Common;
using Business.Dto.Request;
using Business.Dto.Request.Integration;
using Business.Dto.Request.Structure;
using Business.Dto.Response;
using Business.Dto.Response.Integration;
using Business.Dto.Response.Structure;
using Business.ExtensionMethod;
using Business.Model;
using Business.Utils;
using Data.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Org.BouncyCastle.Asn1.X509;
using Service.IntegrationGateway;
using Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection.Metadata;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using static Business.Enums.Constants;

namespace Service.Extension
{
    public class StructureService : IStructureService
    {
        public IUnitOfWork _unitOfWork;
        private readonly IGlobalDataService _globalDataService;
        private readonly IntegrationGatewayResolver _integrationGatewayResolver;
        private readonly IConfiguration _configuration;


        public StructureService(
             IUnitOfWork unitOfWork,
             IGlobalDataService globalDataService,
            IConfiguration configuration
            )
        {
            _unitOfWork = unitOfWork;
            _globalDataService = globalDataService;
            _configuration = configuration;

        }

        public BusinessResponse<BaseListReturnType<StructureFieldListResponse>> StructureFieldList(StructureFieldListRequest request)
        {
            BusinessResponse<BaseListReturnType<StructureFieldListResponse>> response = new BusinessResponse<BaseListReturnType<StructureFieldListResponse>>();
            try
            {
                response.Result = StructureFieldListRaw(request);
            }
            catch (Exception ex)
            {
                response.Exception = new BusinessLayerException(ex.Message, ex);
            }

            return response;
        }

        public BaseListReturnType<StructureFieldListResponse> StructureFieldListRaw(StructureFieldListRequest request)
        {
            var idUser = _globalDataService.GetVariable<string>(ApplicationConstant.IDUSER);
            var idTenant = _globalDataService.GetVariable<string>(ApplicationConstant.IDTENANT);

            BaseListReturnType<StructureFieldListResponse> response = new BaseListReturnType<StructureFieldListResponse>();
            response.EntityList = new List<StructureFieldListResponse>();

            var structureFields = _unitOfWork.StructureFieldDao.GetListCustom<string>(request.PageSize, request.PageIndex,
                     s => s.IdStructureField != null,
                     o => o.Name,
                     new List<string>()
                     {
                     }
                     );
            structureFields.EntityList.ForEach(s =>
            {
                StructureFieldListResponse structureFieldListResponse = new StructureFieldListResponse()
                {
                    IdStructureField = s.IdStructureField,
                    Name = s.Name,
                    Icon = s.Icon,
                    StructureFieldCategory = s.StructureFieldCategory,
                    IsPopular = s.IsPopular,
                    StructureFieldType = s.StructureFieldType,
                    Prefix = s.Prefix,
                    Placeholder = s.Placeholder
                };

                response.EntityList.Add(structureFieldListResponse);

            });


            response.TotalCount = structureFields.TotalCount;

            return response;
        }

        public BusinessResponse<BaseListReturnType<StructureListResponse>> StructureList(StructureListRequest request)
        {
            BusinessResponse<BaseListReturnType<StructureListResponse>> response = new BusinessResponse<BaseListReturnType<StructureListResponse>>();
            try
            {
                response.Result = StructureListRaw(request);
            }
            catch (Exception ex)
            {
                response.Exception = new BusinessLayerException(ex.Message, ex);
            }

            return response;
        }

        public BaseListReturnType<StructureListResponse> StructureListRaw(StructureListRequest request)
        {
            var idUser = _globalDataService.GetVariable<string>(ApplicationConstant.IDUSER);
            var idTenant = _globalDataService.GetVariable<string>(ApplicationConstant.IDTENANT);
            var hasPermission = _globalDataService.HasPermission(PermissionsConstant.GET_ALL_STRUCTURES);

            // Inject values into request so DAO can use them
            request.IdUser = idUser;
            request.IdTenant = idTenant;
            request.HasPermission = hasPermission;

            // Call DAO (stored procedure)
            var result = _unitOfWork.StructureDao.StructureListRaw(request);

            return result;
        }

        public BusinessResponse<StructureDetailResponse> StructureCreate(StructureCreateRequest request)
        {
            BusinessResponse<StructureDetailResponse> response = new BusinessResponse<StructureDetailResponse>();
            try
            {
                response.Result = StructureCreateRaw(request);
            }
            catch (Exception ex)
            {
                response.Exception = new BusinessLayerException(ex.Message, ex);
            }

            return response;
        }

        public StructureDetailResponse StructureCreateRaw(StructureCreateRequest request)
        {
            var idUser = _globalDataService.GetVariable<string>(ApplicationConstant.IDUSER);
            var idTenant = _globalDataService.GetVariable<string>(ApplicationConstant.IDTENANT);

            var structureCreateResponse = new StructureCreateResponse();

            Structure structure = null;

            bool isAdding = request.IdStructure.IsNullEmptyOrWhitespace();
            bool canUserModify = false;

            // Get structure type (e.g., INDIVIDUAL)
            var structureType = _unitOfWork.StructureTypeDao.GetCustom(c => c.Code == request.StructureTypeCode);

            var structureName = $"{request.Firstname}.{request.Lastname}";

            if (!isAdding)
            {
                structure = _unitOfWork.StructureDao.GetCustom(r => r.IdStructure == request.IdStructure,
                new List<string>() {
                    "IdPersonNavigation",
                    "IdCompanyNavigation",
                    "IdStructureTypeNavigation",
                    "StructureAddresses",
                    "StructureAddresses.IdAddressNavigation",
                    "StructureSocialNetworks",
                    "StructureSocialNetworks.IdSocialNetworkNavigation",
                    "IdProfilePictureNavigation",
                    "IdProfilePictureNavigation.IdParameterBaseServerUrlNavigation",

                    "IdCoverPictureNavigation",
                    "IdCoverPictureNavigation.IdParameterBaseServerUrlNavigation",

                    "StructureContacts",

                    "StructureStructureFields",
                    "StructureStructureFields.IdDocumentNavigation",
                    "StructureStructureFields.IdDocumentNavigation.IdParameterBaseServerUrlNavigation",
                    "StructureStructureFields.IdStructureFieldNavigation",

                    "UserStructures",

                    "StructureAccordions",
                    "StructureStructureCategories.IdStructureCategoryNavigation",
                    "StructureFeatures",
                    "StructureGalleries.IdDocumentNavigation",
                    "StructureMembers.IdDocumentNavigation",
                    "StructureMembers.IdPersonNavigation",
                    "StructureStructureTags.IdStructureTagNavigation",

                    "StructureWorkingHours",
                    "StructureWorkingHours.StructureWorkingHourDays",
                    "StructureWorkingHours.StructureWorkingHourDays.StructureWorkingHourTimeSlots",

                    "StructurePortfolios.IdMainDocumentNavigation.IdParameterBaseServerUrlNavigation",
                    "StructurePortfolios.StructurePortfolioDocuments",
                    "StructurePortfolios.StructurePortfolioDocuments.IdDocumentNavigation.IdParameterBaseServerUrlNavigation"

                    }
                );

                // Check if the user has permission to edit the structure
                if (!_globalDataService.HasPermission(PermissionsConstant.GET_ALL_STRUCTURES))
                {
                    canUserModify = structure.UserStructures.Where(us => us.IdUser == idUser).Count() > 0;
                }
                else
                {
                    canUserModify = true;
                }

                // Remove all related entities for clean re-insert
                foreach (var sa in structure.StructureAddresses)
                {
                    _unitOfWork.AddressDao.Delete(sa.IdAddressNavigation);
                }
                _unitOfWork.StructureAddressDao.DeleteRange(structure.StructureAddresses);

                // Remove all related entities for clean re-insert
                foreach (var sa in structure.StructureMembers)
                {
                    _unitOfWork.PersonDao.Delete(sa.IdPersonNavigation);
                }
                _unitOfWork.StructureMemberDao.DeleteRange(structure.StructureMembers);

                _unitOfWork.StructureContactDao.DeleteRange(structure.StructureContacts);
                _unitOfWork.StructureSocialNetworkDao.DeleteRange(structure.StructureSocialNetworks);
                _unitOfWork.StructureStructureFieldDao.DeleteRange(structure.StructureStructureFields);

                _unitOfWork.StructureAccordionDao.DeleteRange(structure.StructureAccordions);
                _unitOfWork.StructureStructureCategoryDao.DeleteRange(structure.StructureStructureCategories);
                _unitOfWork.StructureFeatureDao.DeleteRange(structure.StructureFeatures);
                _unitOfWork.StructureGalleryDao.DeleteRange(structure.StructureGalleries);
                _unitOfWork.StructureStructureTagDao.DeleteRange(structure.StructureStructureTags);

                // Delete existing working hours if any
                if (structure.StructureWorkingHours.Any())
                {
                    foreach (var existingWorkingHours in structure.StructureWorkingHours)
                    {
                        foreach (var day in existingWorkingHours.StructureWorkingHourDays)
                        {
                            foreach (var timeSlot in day.StructureWorkingHourTimeSlots)
                            {
                                _unitOfWork.StructureWorkingHourTimeSlotDao.Delete(timeSlot);
                            }
                            _unitOfWork.StructureWorkingHourDayDao.Delete(day);
                        }
                        _unitOfWork.StructureWorkingHourDao.Delete(existingWorkingHours);
                    }
                }

                if (structure.StructurePortfolios.Any())
                {
                    foreach (var portfolio in structure.StructurePortfolios)
                    {
                        var portfolioFromClient = request.Portfolios?.FirstOrDefault(p => p.IdPortfolioReference == portfolio.IdStructurePortfolio);
                        var idPortfolioMainDocumentFromClient = portfolioFromClient?.Image?.IdDocument;

                        if (portfolio.IdMainDocument != null && portfolio.IdMainDocument != idPortfolioMainDocumentFromClient)
                        {
                            _unitOfWork.DocumentDao.Delete(portfolio.IdMainDocumentNavigation);
                        }

                        if (portfolio.StructurePortfolioDocuments.Any())
                        {
                            foreach (var document in portfolio.StructurePortfolioDocuments)
                            {
                                var documentFromClient = portfolioFromClient?.AdditionalImages.FirstOrDefault(d => d.IdAdditionalImageReference == document.IdStructurePortfolioDocument);

                                var idDocumentFromClient = documentFromClient?.Image?.IdDocument;

                                if (document.IdDocument != null && document.IdDocument != idDocumentFromClient)
                                {
                                    _unitOfWork.DocumentDao.Delete(document.IdDocumentNavigation);
                                }
                                _unitOfWork.StructurePortfolioDocumentDao.Delete(document);
                            }
                        }
                        _unitOfWork.StructurePortfolioDao.Delete(portfolio);
                    }
                }
            }
            else
            {
                structure = new Structure
                {
                    DateCreated = DateTime.Now,
                    IdTenant = idTenant,
                    IdStructureType = structureType.IdStructureType,
                    SystemSlug = _unitOfWork.StructureDao.GenerateUniqueSystemSlug()
                };


                if (!_globalDataService.HasPermission(PermissionsConstant.CREATE_GENERIC))
                {
                    structure.UserStructures.Add(new UserStructure
                    {
                        IdUser = idUser,
                        IdTenant = idTenant
                    });
                }

                canUserModify = true;

                _unitOfWork.StructureDao.Add(structure);
            }



            if (request.StructureTypeCode == "INDIVIDUAL" && structure.IdPersonNavigation == null)
            {
                structure.IdPersonNavigation = new Person
                {

                };
                _unitOfWork.PersonDao.Add(structure.IdPersonNavigation);
            }
            else if (request.StructureTypeCode == "LEGAL_ENTITY" && structure.IdCompanyNavigation == null)
            {
                structure.IdCompanyNavigation = new Company
                {

                };
                _unitOfWork.CompanyDao.Add(structure.IdCompanyNavigation);
            }


            if (!canUserModify)
            {
                throw new Exception("You do not have permission to edit this profile");
            }

            if (!(request.CoverPicture?.IdDocument?.IsNullEmptyOrWhitespace() ?? true))
            {
                structure.IdCoverPicture = request.CoverPicture.IdDocument;
            }

            if (!(request.ProfilePicture?.IdDocument?.IsNullEmptyOrWhitespace() ?? true))
            {
                structure.IdProfilePicture = request.ProfilePicture.IdDocument;
            }

            //reassign the values here;
            structure.IdColourVariant = request.IdColourVariant;
            structure.Email = request.Email;
            structure.Headline = request.Headline;

            structure.CardName = request.CardName;
            structure.IsPaused = request.IsPaused;
            structure.MainPhoneNumber = request.MainPhoneNumber;
            structure.IsMainPhoneNumberPrivate = request.IsMainPhoneNumberPrivate;

            structure.PortfolioTitle = request.PortfolioTitle;
            structure.PortfolioDescription = request.PortfolioDescription;
            structure.PortfolioPassword = request.PortfolioPassword;
            structure.PortfolioPasswordIsEnabled = request.PortfolioPasswordIsEnabled;

            // Add addresses
            if (request.Addresses != null)
            {
                foreach (var addr in request.Addresses)
                {
                    var address = new Address
                    {
                        AddressLine1 = addr.AddressLine1,
                        AddressLine2 = addr.AddressLine2,
                        City = addr.City,
                        Country = addr.Country
                    };

                    _unitOfWork.AddressDao.Add(address);

                    var structureAddress = new StructureAddress
                    {
                        IdStructure = structure.IdStructure,
                        IdAddress = address.IdAddress,
                        Name = addr.Name,
                        DisplayOrder = addr.DisplayOrder
                    };

                    _unitOfWork.StructureAddressDao.Add(structureAddress);
                }
            }

            // Add contacts
            //if (request.Contacts != null)
            //{
            //    foreach (dynamic contact in request.Contacts)
            //    {
            //        _unitOfWork.StructureContactDao.Add(new StructureContact
            //        {
            //            IdStructure = structure.IdStructure,
            //            Name = contact?.Name,
            //            Value = contact?.Value
            //        });
            //    }
            //}


            //// Add social networks
            //if (request.SocialNetworks != null)
            //{
            //    foreach (dynamic network in request.SocialNetworks)
            //    {
            //        if (!string.IsNullOrEmpty(network?.IdSocialNetwork))
            //        {
            //            _unitOfWork.StructureSocialNetworkDao.Add(new StructureSocialNetwork
            //            {
            //                IdStructure = structure.IdStructure,
            //                IdSocialNetwork = network.IdSocialNetwork,
            //                Value = network.Value
            //            });
            //        }
            //    }
            //}

            // Add structure fields
            if (request.StructureFields != null)
            {
                foreach (var field in request.StructureFields)
                {
                    var structureField = new StructureStructureField
                    {
                        IdStructure = structure.IdStructure,
                        IdStructureField = field.IdStructureField,
                        Value = field.Value?.ToString(),
                        IdDocument = field.Document?.IdDocument,
                        DisplayText = field.DisplayText,
                        DisplayOrder = field.DisplayOrder,
                        IsStructureFieldPrivate = field.IsPrivate
                    };

                    _unitOfWork.StructureStructureFieldDao.Add(structureField);
                }
            }

            // Add accordions
            if (request.Accordions != null)
            {
                foreach (var accordion in request.Accordions)
                {
                    var structureAccordion = new StructureAccordion
                    {
                        IdStructure = structure.IdStructure,
                        Name = accordion.Name,
                        Description = accordion.Description,
                        DisplayOrder = accordion.DisplayOrder
                    };

                    _unitOfWork.StructureAccordionDao.Add(structureAccordion);
                }
            }

            // Add categories
            if (request.Categories != null)
            {
                foreach (var category in request.Categories)
                {
                    var structureCategory = new StructureStructureCategory
                    {
                        IdStructure = structure.IdStructure,
                        IdStructureCategory = category.IdStructureCategory,
                        IsPrimary = category.IsPrimary
                    };

                    _unitOfWork.StructureStructureCategoryDao.Add(structureCategory);
                }
            }

            // Add features
            if (request.Features != null)
            {
                foreach (var feature in request.Features)
                {
                    var structureFeature = new StructureFeature
                    {
                        IdStructure = structure.IdStructure,
                        Name = feature.Name,
                        Description = feature.Description,
                        DisplayOrder = feature.DisplayOrder
                    };

                    _unitOfWork.StructureFeatureDao.Add(structureFeature);
                }
            }

            // Add gallery
            if (request.Gallery != null)
            {
                foreach (var gallery in request.Gallery)
                {
                    var structureGallery = new StructureGallery
                    {
                        IdStructure = structure.IdStructure,
                        Name = gallery.Name,
                        Description = gallery.Description,
                        IsMain = gallery.IsMain,
                        ShowOnSlider = gallery.ShowOnSlider,
                        DisplayOrder = gallery.DisplayOrder,
                        IdDocument = gallery.Image?.IdDocument
                    };

                    _unitOfWork.StructureGalleryDao.Add(structureGallery);
                }
            }

            // Add members
            if (request.Members != null)
            {
                foreach (var member in request.Members)
                {
                    var structureMember = new StructureMember
                    {
                        IdStructure = structure.IdStructure,
                        IdPersonNavigation = new Person()
                        {
                            Firstname = member.Firstname,
                            Lastname = member.Lastname,
                        },
                        Title = member.Title,
                        Description = member.Description,
                        IdDocument = member.Photo?.IdDocument,
                        DisplayOrder = member.DisplayOrder
                    };

                    _unitOfWork.StructureMemberDao.Add(structureMember);
                }
            }

            // Add tags
            if (request.Tags != null)
            {
                List<string> tagNames = request.Tags.Select(t => t.Name).ToList();
                var existingTags = _unitOfWork.StructureTagDao.GetListCustom<string>(-1, 0, t => tagNames.Contains(t.Name), s => s.IdStructureTag).EntityList;

                var newTags = tagNames.Except(existingTags.Select(t => t.Name)).ToList();

                newTags.ForEach(t =>
                {
                    var newTag = new StructureTag
                    {
                        Name = t,
                    };
                    existingTags.Add(newTag);
                    _unitOfWork.StructureTagDao.Add(newTag);
                });

                foreach (var tag in request.Tags)
                {
                    var idStructureTag = existingTags.FirstOrDefault(t => t.Name == tag.Name)?.IdStructureTag;

                    var structureTag = new StructureStructureTag
                    {
                        IdStructure = structure.IdStructure,
                        IdStructureTag = idStructureTag,
                        DisplayOrder = tag.DisplayOrder,
                        Color = tag.Color
                    };

                    _unitOfWork.StructureStructureTagDao.Add(structureTag);
                }
            }

            // Add working hours
            if (request.WorkingHours != null && request.WorkingHours.Days != null)
            {
                var workingHours = new StructureWorkingHour
                {
                    IdStructure = structure.IdStructure,
                    SpecialNotes = request.WorkingHours.SpecialNotes,
                    LastUpdated = request.WorkingHours.LastUpdated,
                    Show24Hours = request.WorkingHours.Show24Hours,
                };

                _unitOfWork.StructureWorkingHourDao.Add(workingHours);

                foreach (var day in request.WorkingHours?.Days)
                {
                    var workingHourDay = new StructureWorkingHourDay
                    {
                        IdStructureWorkingHour = workingHours.IdStructureWorkingHour,
                        DayOfWeekSunZero = day.DayOfWeek,
                        IsOpen = day.IsOpen
                    };

                    _unitOfWork.StructureWorkingHourDayDao.Add(workingHourDay);

                    if (day.IsOpen && day.TimeSlots != null)
                    {
                        foreach (var timeSlot in day.TimeSlots)
                        {
                            var workingHourTimeSlot = new StructureWorkingHourTimeSlot
                            {
                                IdStructureWorkingHourDay = workingHourDay.IdStructureWorkingHourDay,
                                OpenTime = timeSlot.OpenTime.TimeOfDay,
                                CloseTime = timeSlot.CloseTime.TimeOfDay
                            };

                            _unitOfWork.StructureWorkingHourTimeSlotDao.Add(workingHourTimeSlot);
                        }
                    }
                }
            }

            // Add portfolios
            if (request.Portfolios != null)
            {
                foreach (var portfolio in request.Portfolios)
                {
                    var structurePortfolio = new StructurePortfolio
                    {
                        IdStructure = structure.IdStructure,
                        Name = portfolio.Name,
                        Description = portfolio.Description,
                        DisplayOrder = portfolio.DisplayOrder,
                        IdMainDocument = portfolio.Image?.IdDocument,
                        StructurePortfolioDocuments = new List<StructurePortfolioDocument>()
                    };

                    if (!String.IsNullOrEmpty(portfolio.Name))
                    {
                        structurePortfolio.Slug = _unitOfWork.StructureDao.GetSlugForStructurePortfolio(structurePortfolio.Name, structure.IdStructure);
                    }

                    if (portfolio.AdditionalImages != null)
                    {
                        foreach (var additionalImage in portfolio.AdditionalImages)
                        {
                            structurePortfolio.StructurePortfolioDocuments.Add(new StructurePortfolioDocument()
                            {
                                IdDocument = additionalImage.Image?.IdDocument,
                                DisplayOrder = additionalImage.DisplayOrder,
                                Name = additionalImage.Name,
                                Description = additionalImage.Description
                            });
                        }
                    }

                    _unitOfWork.StructurePortfolioDao.Add(structurePortfolio);

                }
            }

            string slugName = "";
            if (request.StructureTypeCode == "INDIVIDUAL")
            {
                structure.IdPersonNavigation.Firstname = request.Firstname;
                structure.IdPersonNavigation.OtherName = request.OtherName;
                structure.IdPersonNavigation.Lastname = request.Lastname;
                structure.IdPersonNavigation.WorkingOrganisation = request.WorkingOrganisation;
                structure.IdPersonNavigation.IdTenant = idTenant;
                structure.IdPersonNavigation.Title = request.Title;
                slugName = $"{request.Firstname}.{request.Lastname}";
            }
            else if (request.StructureTypeCode == "LEGAL_ENTITY")
            {
                structure.IdCompanyNavigation.BusinessRegistrationNumber = request.BusinessRegistrationNumber;
                structure.IdCompanyNavigation.Description = request.CompanyDescription;
                structure.IdCompanyNavigation.Name = request.CompanyName;
                structure.IdCompanyNavigation.MainWebsite = request.MainWebsite;
                slugName = $"{request.CompanyName}";
            }

            structure.Slug = _unitOfWork.StructureDao.GetSlugForStructure(slugName, structure.IdStructure);

            // Final save
            _unitOfWork.Save();

            request.IdStructure = structure.IdStructure;

            return StructureDetailRaw(new StructureDetailRequest() { IdStructure = request.IdStructure });
        }

        public BusinessResponse<StructureDetailResponse> StructureDetail(StructureDetailRequest request)
        {
            BusinessResponse<StructureDetailResponse> response = new BusinessResponse<StructureDetailResponse>();
            try
            {
                response.Result = StructureDetailRaw(request);
            }
            catch (Exception ex)
            {
                response.Exception = new BusinessLayerException(ex.Message, ex);
            }

            return response;
        }

        public StructureDetailResponse StructureDetailRaw(StructureDetailRequest request)
        {
            var idUser = _globalDataService.GetVariable<string>(ApplicationConstant.IDUSER);
            var idTenant = _globalDataService.GetVariable<string>(ApplicationConstant.IDTENANT);

            var structure = _unitOfWork.StructureDao.GetCustom(r => r.IdStructure == request.IdStructure,
                  new List<string>() {
                        "IdPersonNavigation",
                        "IdCompanyNavigation",
                        "IdStructureTypeNavigation",
                        "StructureAddresses",
                        "StructureAddresses.IdAddressNavigation",
                        "StructureSocialNetworks",
                        "StructureSocialNetworks.IdSocialNetworkNavigation",
                        "IdProfilePictureNavigation",
                        "IdProfilePictureNavigation.IdParameterBaseServerUrlNavigation",

                        "IdCoverPictureNavigation",
                        "IdCoverPictureNavigation.IdParameterBaseServerUrlNavigation",

                        "StructureContacts",

                        "IdStructureTypeNavigation",

                        "StructureStructureFields",
                        "StructureStructureFields.IdDocumentNavigation",
                        "StructureStructureFields.IdDocumentNavigation.IdParameterBaseServerUrlNavigation",
                        "StructureStructureFields.IdStructureFieldNavigation",

                        "StructureAccordions",
                        "StructureStructureCategories.IdStructureCategoryNavigation",
                        "StructureFeatures",
                        "StructureGalleries.IdDocumentNavigation",
                        "StructureMembers.IdDocumentNavigation",
                        "StructureMembers.IdPersonNavigation",
                        "StructureStructureTags.IdStructureTagNavigation",

                        "StructureWorkingHours",
                        "StructureWorkingHours.StructureWorkingHourDays",
                        "StructureWorkingHours.StructureWorkingHourDays.StructureWorkingHourTimeSlots",

                        "StructurePortfolios.IdMainDocumentNavigation.IdParameterBaseServerUrlNavigation",
                        "StructurePortfolios.StructurePortfolioDocuments",
                        "StructurePortfolios.StructurePortfolioDocuments.IdDocumentNavigation.IdParameterBaseServerUrlNavigation"
                  }
              );

            var structureDetailResponse = StructureDetailRaw(structure);


            structureDetailResponse.Views = new List<StructureViewResponse>();

            return structureDetailResponse;
        }

        public BusinessResponse<StructureDetailResponse> StructureDetailBySlug(StructureDetailBySlugRequest request)
        {
            BusinessResponse<StructureDetailResponse> response = new BusinessResponse<StructureDetailResponse>();
            try
            {
                response.Result = StructureDetailBySlugRaw(request);
            }
            catch (Exception ex)
            {
                response.Exception = new BusinessLayerException(ex.Message, ex);
            }

            return response;
        }

        public StructureDetailResponse StructureDetailBySlugRaw(StructureDetailBySlugRequest request)
        {
            var structure = _unitOfWork.StructureDao.GetCustom(r => r.Slug == request.Slug,
            new List<string>() {
                        "IdCompanyNavigation",
                        "IdPersonNavigation",
                        "IdStructureTypeNavigation",
                        "StructureAddresses",
                        "StructureAddresses.IdAddressNavigation",
                        "StructureSocialNetworks",
                        "StructureSocialNetworks.IdSocialNetworkNavigation",
                        "IdProfilePictureNavigation",
                        "IdProfilePictureNavigation.IdParameterBaseServerUrlNavigation",

                        "IdCoverPictureNavigation",
                        "IdCoverPictureNavigation.IdParameterBaseServerUrlNavigation",

                        "StructureContacts",

                        "IdStructureTypeNavigation",

                        "IdProfileTemplateNavigation",

                        "StructureStructureFields",
                        "StructureStructureFields.IdDocumentNavigation",
                        "StructureStructureFields.IdDocumentNavigation.IdParameterBaseServerUrlNavigation",
                        "StructureStructureFields.IdStructureFieldNavigation",

                        "StructureAccordions",
                        "StructureStructureCategories.IdStructureCategoryNavigation",
                        "StructureStructureCategories.IdStructureCategoryNavigation.IdDocumentNavigation",
                        "StructureStructureCategories.IdStructureCategoryNavigation.IdDocumentNavigation.IdParameterBaseServerUrlNavigation",
                        "StructureFeatures",
                        "StructureGalleries.IdDocumentNavigation",
                        "StructureGalleries.IdDocumentNavigation.IdParameterBaseServerUrlNavigation",
                        "StructureMembers.IdDocumentNavigation",
                        "StructureMembers.IdDocumentNavigation.IdParameterBaseServerUrlNavigation",
                        "StructureMembers.IdPersonNavigation",
                        "StructureStructureTags.IdStructureTagNavigation",

                        "StructureWorkingHours",
                        "StructureWorkingHours.StructureWorkingHourDays",
                        "StructureWorkingHours.StructureWorkingHourDays.StructureWorkingHourTimeSlots",

                        "StructurePortfolios.IdMainDocumentNavigation.IdParameterBaseServerUrlNavigation",
                        "StructurePortfolios.StructurePortfolioDocuments",
                        "StructurePortfolios.StructurePortfolioDocuments.IdDocumentNavigation.IdParameterBaseServerUrlNavigation"
                }
            );
            var structureDetailResponse = StructureDetailRaw(structure);

            return structureDetailResponse;
        }
        public StructureDetailResponse StructureDetailRaw(Structure structure)
        {
            StructureDetailResponse structureDetailResponse = new StructureDetailResponse();


            string slugParameterConstant = structure.IdStructureTypeNavigation?.Code == "INDIVIDUAL" ? ParameterConstant.INDIVIDUAL_BASE_SLUG_URL : ParameterConstant.COMPANY_BASE_SLUG_URL;
            string slugBaseUrl = _unitOfWork.ParameterDao.GetCustom(c => c.IdParameter == ParameterConstant.FromConstant(slugParameterConstant))?.ParamaterValue;


            if (structure == null)
            {
                throw new Exception("Structure not found");
            }

            string colourVariantType = structure.IdStructureTypeNavigation?.Code == "INDIVIDUAL" ? ParameterConstant.INDIVIDUAL_PROFILE_COLOUR_VARIANTS : ParameterConstant.COMPANY_PROFILE_COLOUR_VARIANTS;

            List<IndividualProfileColorVariantResponse> colourVariants = GetColourVaraintsForProfileRaw(colourVariantType);

            structureDetailResponse.IdStructure = structure.IdStructure;
            structureDetailResponse.IdStructureType = structure.IdStructureType;
            structureDetailResponse.StructureTypeCode = structure.IdStructureTypeNavigation?.Code;

            structureDetailResponse.ColorVariant = colourVariants.Where(c => c.IdVariant == structure.IdColourVariant).FirstOrDefault();
            structureDetailResponse.IdColourVariant = structure.IdColourVariant;

            if (structureDetailResponse.ColorVariant == null)
            {
                structureDetailResponse.ColorVariant = colourVariants.Where(c => c.IsDefault == true).FirstOrDefault();
            }

            structureDetailResponse.Firstname = structure.IdPersonNavigation?.Firstname;
            structureDetailResponse.Lastname = structure.IdPersonNavigation?.Lastname;
            structureDetailResponse.OtherName = structure.IdPersonNavigation?.OtherName;
            structureDetailResponse.Title = structure.IdPersonNavigation?.Title;
            structureDetailResponse.WorkingOrganisation = structure.IdPersonNavigation?.WorkingOrganisation;

            structureDetailResponse.IdProfileTemplate = structure.IdProfileTemplateNavigation?.IdProfileTemplate;
            structureDetailResponse.IsMainPhoneNumberPrivate = structure.IsMainPhoneNumberPrivate;

            structureDetailResponse.CardName = structure.CardName;

            structureDetailResponse.CompanyName = structure.IdCompanyNavigation?.Name;
            structureDetailResponse.BusinessRegistrationNumber = structure.IdCompanyNavigation?.BusinessRegistrationNumber;
            structureDetailResponse.CompanyDescription = structure.IdCompanyNavigation?.Description;
            structureDetailResponse.MainWebsite = structure.IdCompanyNavigation?.MainWebsite;

            structureDetailResponse.PortfolioTitle = structure.PortfolioTitle;
            structureDetailResponse.PortfolioDescription = structure.PortfolioDescription;
            structureDetailResponse.PortfolioPassword = structure.PortfolioPassword;
            structureDetailResponse.PortfolioPasswordIsEnabled = structure.PortfolioPasswordIsEnabled;


            structureDetailResponse.Slug = structure.Slug;
            structureDetailResponse.FullSlugUrl = String.Format("{0}{1}", slugBaseUrl, structure.Slug);

            if (structureDetailResponse.IdProfileTemplate == null)
            {
                structureDetailResponse.IdProfileTemplate = "69b4314a-abd9-40b1-917f-514a44d88ffd";
            }


            structureDetailResponse.TopFooter = structure.TopFooter;

            structureDetailResponse.Email = structure.Email;
            structureDetailResponse.Headline = structure.Headline;

            structureDetailResponse.IdStructureType = structure.IdStructureType;

            if (structure.IdStructureTypeNavigation != null)
            {
                structureDetailResponse.StructureType = new StructureTypeResponse()
                {
                    IdStructureType = structure.IdStructureTypeNavigation.IdStructureType,
                    Code = structure.IdStructureTypeNavigation.Code,
                    Name = structure.IdStructureTypeNavigation.Name
                };
            }

            if (structure.IdProfilePictureNavigation != null)
            {
                structureDetailResponse.IdProfilePicture = structure.IdProfilePicture;
                structureDetailResponse.ProfilePicture = new DocumentResponse()
                {

                    IdDocument = structure.IdProfilePicture,
                    Name = structure?.IdProfilePictureNavigation?.FileName,
                    Url = String.Format("{0}/{1}", structure?.IdProfilePictureNavigation?.IdParameterBaseServerUrlNavigation?.ParamaterValue, structure?.IdProfilePictureNavigation?.ServerFilePath)
                };
            }

            if (structure.IdCoverPictureNavigation != null)
            {
                structureDetailResponse.IdCoverPicture = structure.IdCoverPicture;
                structureDetailResponse.CoverPicture = new DocumentResponse()
                {

                    IdDocument = structure.IdCoverPicture,
                    Name = structure?.IdCoverPictureNavigation?.FileName,
                    Url = String.Format("{0}/{1}", structure?.IdCoverPictureNavigation?.IdParameterBaseServerUrlNavigation?.ParamaterValue, structure?.IdCoverPictureNavigation?.ServerFilePath)
                };
            }

            structureDetailResponse.Addresses = new List<AddressResponse>();
            structure.StructureAddresses.ToList().ForEach(address =>
            {
                AddressResponse addressResponse = new AddressResponse()
                {
                    IdAddressReference = address.IdStructureAddress,
                    AddressLine1 = address.IdAddressNavigation.AddressLine1,
                    AddressLine2 = address.IdAddressNavigation.AddressLine2,
                    City = address.IdAddressNavigation.City,
                    Country = address.IdAddressNavigation.Country,
                    Name = address.Name,
                    DisplayOrder = address.DisplayOrder,
                };
                structureDetailResponse.Addresses.Add(addressResponse);
            });


            structureDetailResponse.Contacts = new List<StructureContactResponse>();
            structure.StructureContacts.ToList().ForEach(structureContact =>
            {
                StructureContactResponse structureContactResponse = new StructureContactResponse()
                {
                    IdStructureContactReference = structureContact.IdStructureContact,
                    Name = structureContact.Name,
                    Value = structureContact.Value
                };
                structureDetailResponse.Contacts.Add(structureContactResponse);
            });

            structureDetailResponse.SocialNetworks = new List<SocialNetworkResponse>();
            structure.StructureSocialNetworks.ToList().ForEach(socialNetwork =>
            {
                SocialNetworkResponse socialNetworkResponse = new SocialNetworkResponse()
                {
                    IdSocialNetworkReference = socialNetwork.IdStructureSocialNetwork,
                    IdSocialNetwork = socialNetwork.IdSocialNetwork,
                    Name = socialNetwork.IdSocialNetworkNavigation.Name,
                    Value = socialNetwork.Value
                };
                structureDetailResponse.SocialNetworks.Add(socialNetworkResponse);
            });

            structureDetailResponse.StructureFields = new List<StructureFieldsResponse>();
            structure.StructureStructureFields.ToList().ForEach(structureField =>
            {
                StructureFieldsResponse structureFieldsResponse = new StructureFieldsResponse()
                {
                    IdStructureStructureFieldReference = structureField.IdStructureStructureField,
                    IdStructureField = structureField.IdStructureField,
                    IdDocument = structureField.IdDocument,
                    Value = structureField.Value,
                    DisplayText = structureField.DisplayText,
                    DisplayOrder = structureField.DisplayOrder,
                    IsPrivate = structureField?.IsStructureFieldPrivate,
                    StructureField = new StructureFieldListResponse()
                    {
                        IdStructureField = structureField.IdStructureFieldNavigation?.IdStructureField,
                        Name = structureField.IdStructureFieldNavigation?.Name,
                        Icon = structureField.IdStructureFieldNavigation?.Icon,
                        StructureFieldCategory = structureField.IdStructureFieldNavigation?.StructureFieldCategory,
                        IsPopular = structureField.IdStructureFieldNavigation?.IsPopular,
                        StructureFieldType = structureField.IdStructureFieldNavigation?.StructureFieldType,
                        Prefix = structureField.IdStructureFieldNavigation?.Prefix,
                        Placeholder = structureField.IdStructureFieldNavigation?.Placeholder,
                    }
                };

                if (structureField.IdDocumentNavigation != null)
                {
                    structureFieldsResponse.Document = new DocumentResponse()
                    {
                        IdDocument = structureField.IdDocumentNavigation.IdDocument,
                        Name = structureField.IdDocumentNavigation.FileName,
                        Url = String.Format("{0}/{1}", structureField?.IdDocumentNavigation?.IdParameterBaseServerUrlNavigation?.ParamaterValue, structureField?.IdDocumentNavigation?.ServerFilePath)
                    };
                }

                structureDetailResponse.StructureFields.Add(structureFieldsResponse);
            });

            // Map Accordions
            structureDetailResponse.Accordions = new List<StructureAccordionResponse>();
            structure.StructureAccordions.ToList().ForEach(accordion =>
            {
                StructureAccordionResponse accordionResponse = new StructureAccordionResponse()
                {
                    IdStructureAccordionReference = accordion.IdStructureAccordion,
                    Name = accordion.Name,
                    Description = accordion.Description,
                    DisplayOrder = accordion.DisplayOrder
                };
                structureDetailResponse.Accordions.Add(accordionResponse);
            });

            // Map Categories
            structureDetailResponse.Categories = new List<StructureCategoryResponse>();
            structure.StructureStructureCategories.ToList().ForEach(category =>
            {
                StructureCategoryResponse categoryResponse = new StructureCategoryResponse()
                {
                    IdStructureStructureCategoryReference = category.IdStructureStructureCategory,
                    IdStructureCategory = category.IdStructureCategory,
                    IsPrimary = category.IsPrimary,
                    Category = new StructureCategoryDetailResponse()
                    {
                        IdStructureCategory = category.IdStructureCategoryNavigation?.IdStructureCategory,
                        Name = category.IdStructureCategoryNavigation?.Name,
                        Color = category.IdStructureCategoryNavigation?.Color,
                        Slug = category.IdStructureCategoryNavigation?.Slug,
                        SvgIcon = category.IdStructureCategoryNavigation?.SvgIcon,
                        Document = category.IdStructureCategoryNavigation?.IdDocumentNavigation != null ? new DocumentResponse()
                        {
                            IdDocument = category.IdStructureCategoryNavigation.IdDocumentNavigation.IdDocument,
                            Name = category.IdStructureCategoryNavigation.IdDocumentNavigation.FileName,
                            Url = String.Format("{0}/{1}", category.IdStructureCategoryNavigation?.IdDocumentNavigation?.IdParameterBaseServerUrlNavigation?.ParamaterValue, category.IdStructureCategoryNavigation?.IdDocumentNavigation?.ServerFilePath)
                        } : null
                    }
                };
                structureDetailResponse.Categories.Add(categoryResponse);
            });

            // Map Features
            structureDetailResponse.Features = new List<StructureFeatureResponse>();
            structure.StructureFeatures.ToList().ForEach(feature =>
            {
                StructureFeatureResponse featureResponse = new StructureFeatureResponse()
                {
                    IdStructureFeatureReference = feature.IdStructureFeature,
                    Name = feature.Name,
                    Description = feature.Description,
                    DisplayOrder = feature.DisplayOrder
                };
                structureDetailResponse.Features.Add(featureResponse);
            });

            // Map Gallery
            structureDetailResponse.Gallery = new List<StructureGalleryResponse>();
            structure.StructureGalleries.ToList().ForEach(gallery =>
            {
                StructureGalleryResponse galleryResponse = new StructureGalleryResponse()
                {
                    IdStructureGalleryReference = gallery.IdStructureGallery,
                    Name = gallery.Name,
                    Description = gallery.Description,
                    IsMain = gallery.IsMain,
                    ShowOnSlider = gallery.ShowOnSlider,
                    DisplayOrder = gallery.DisplayOrder,
                    Image = gallery.IdDocumentNavigation != null ? new DocumentResponse()
                    {
                        IdDocument = gallery.IdDocumentNavigation.IdDocument,
                        Name = gallery.IdDocumentNavigation.FileName,
                        Url = String.Format("{0}/{1}", gallery?.IdDocumentNavigation?.IdParameterBaseServerUrlNavigation?.ParamaterValue, gallery?.IdDocumentNavigation?.ServerFilePath)
                    } : null
                };
                structureDetailResponse.Gallery.Add(galleryResponse);
            });

            // Map Members
            structureDetailResponse.Members = new List<StructureMemberResponse>();
            structure.StructureMembers.ToList().ForEach(member =>
            {
                StructureMemberResponse memberResponse = new StructureMemberResponse()
                {
                    IdStructureMemberReference = member.IdStructureMember,
                    Title = member.Title,
                    Description = member.Description,
                    DisplayOrder = member.DisplayOrder,
                    Photo = member.IdDocumentNavigation != null ? new DocumentResponse()
                    {
                        IdDocument = member.IdDocumentNavigation.IdDocument,
                        Name = member.IdDocumentNavigation.FileName,
                        Url = String.Format("{0}/{1}", member?.IdDocumentNavigation?.IdParameterBaseServerUrlNavigation?.ParamaterValue, member?.IdDocumentNavigation?.ServerFilePath)
                    } : null,

                    Firstname = member.IdPersonNavigation.Firstname,
                    Lastname = member.IdPersonNavigation.Lastname,


                };
                structureDetailResponse.Members.Add(memberResponse);
            });

            // Map Tags
            structureDetailResponse.Tags = new List<StructureTagResponse>();
            structure.StructureStructureTags.ToList().ForEach(tag =>
            {
                StructureTagResponse tagResponse = new StructureTagResponse()
                {
                    IdStructureStructureTagReference = tag.IdStructureStructureTag,
                    IdStructureTag = tag.IdStructureTag,
                    DisplayOrder = tag.DisplayOrder,
                    Color = tag.Color,
                    Name = tag.IdStructureTagNavigation?.Name,
                };
                structureDetailResponse.Tags.Add(tagResponse);
            });

            // Add working hours
            if (structure.StructureWorkingHours.Any())
            {
                var workingHours = structure.StructureWorkingHours.First();
                structureDetailResponse.WorkingHours = new WorkingHoursResponse
                {
                    SpecialNotes = workingHours.SpecialNotes,
                    LastUpdated = workingHours.LastUpdated ?? DateTime.Now,
                    Show24Hours = workingHours.Show24Hours,
                    Days = workingHours.StructureWorkingHourDays.Select(d => new WorkingHourDayResponse
                    {
                        DayOfWeek = d.DayOfWeekSunZero,
                        IsOpen = d.IsOpen,
                        TimeSlots = d.StructureWorkingHourTimeSlots.Select(t => new WorkingHourTimeSlotResponse
                        {
                            OpenTime = t.OpenTime,
                            CloseTime = t.CloseTime
                        }).ToList()
                    }).ToList()
                };

                // Add day names
                var dayNames = new[] { "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" };
                var dayShorts = new[] { "SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT" };
                foreach (var day in structureDetailResponse.WorkingHours.Days)
                {
                    day.Name = dayNames[day.DayOfWeek];
                    day.Short = dayShorts[day.DayOfWeek];
                }
            }

            // Add portfolios
            if (structure.StructurePortfolios.Any())
            {
                structureDetailResponse.Portfolios = new List<StructurePortfolioResponse>();
                structure.StructurePortfolios.ToList().ForEach(portfolio =>
                {
                    StructurePortfolioResponse portfolioResponse = new StructurePortfolioResponse()
                    {
                        IdStructurePortfolioReference = portfolio.IdStructurePortfolio,
                        Slug = portfolio.Slug,
                        Name = portfolio.Name,
                        Description = portfolio.Description,
                        DisplayOrder = portfolio.DisplayOrder ?? 0,
                    };

                    if (portfolio.IdMainDocumentNavigation != null)
                    {
                        portfolioResponse.Image = new DocumentResponse()
                        {
                            IdDocument = portfolio.IdMainDocumentNavigation.IdDocument,
                            Name = portfolio.IdMainDocumentNavigation.FileName,
                            Url = String.Format("{0}/{1}", portfolio.IdMainDocumentNavigation?.IdParameterBaseServerUrlNavigation?.ParamaterValue, portfolio.IdMainDocumentNavigation?.ServerFilePath)
                        };
                    }

                    if (portfolio.StructurePortfolioDocuments.Any())
                    {
                        portfolioResponse.AdditionalImages = new List<StructurePortfolioDocumentResponse>();
                        portfolio.StructurePortfolioDocuments.ToList().ForEach(document =>
                        {
                            portfolioResponse.AdditionalImages.Add(new StructurePortfolioDocumentResponse()
                            {
                                IdAdditionalImageReference = document.IdStructurePortfolioDocument,
                                DisplayOrder = document.DisplayOrder ?? 0,
                                Name = document.Name,
                                Description = document.Description,
                                Image = document.IdDocumentNavigation != null ? new DocumentResponse()
                                {
                                    IdDocument = document.IdDocumentNavigation.IdDocument,
                                    Name = document.IdDocumentNavigation.FileName,
                                    Url = String.Format("{0}/{1}", document?.IdDocumentNavigation?.IdParameterBaseServerUrlNavigation?.ParamaterValue, document?.IdDocumentNavigation?.ServerFilePath)
                                } : null
                            });
                        });
                    }

                    structureDetailResponse.Portfolios.Add(portfolioResponse);
                });
            }

            structureDetailResponse.QrCodeUrl = String.Format("cnts.in/{0}?s=1", structure.SystemSlug);
            structureDetailResponse.PageUrl = String.Format("{0}{1}", slugBaseUrl, structure.Slug);

            structureDetailResponse.IsPaused = structure.IsPaused;
            structureDetailResponse.MainPhoneNumber = structure.MainPhoneNumber;

            structureDetailResponse.TotalViewsPerViewType = GetTotalViewsForStructure(structure.IdStructure);

            return structureDetailResponse;
        }


        public BusinessResponse<List<StructureViewResponse>> GetStructureViews(GetStructureViewsRequest request)
        {
            BusinessResponse<List<StructureViewResponse>> response = new BusinessResponse<List<StructureViewResponse>>();
            try
            {
                response.Result = GetStructureViewsRaw(request);
            }
            catch (Exception ex)
            {
                response.Exception = new BusinessLayerException(ex.Message, ex);
            }

            return response;
        }

        public List<StructureViewResponse> GetStructureViewsRaw(GetStructureViewsRequest request)
        {
            BaseListReturnType<StructureViewResponse> structureViews = _unitOfWork.StructureDao.GetStructureViews(request);

            return structureViews.EntityList;
        }

        public List<StructureScanPerViewTypeResponse> GetTotalViewsForStructure(string idStructure)
        {
            List<StructureScanPerViewTypeResponse> totalViews = _unitOfWork.StructureDao.GetStructureTotalViews(idStructure);

            return totalViews;
        }

        public BusinessResponse<StructureDeleteResponse> StructureDelete(StructureDetailRequest request)
        {
            BusinessResponse<StructureDeleteResponse> response = new BusinessResponse<StructureDeleteResponse>();
            try
            {
                response.Result = StructureDeleteRaw(request);
            }
            catch (Exception ex)
            {
                response.Exception = new BusinessLayerException(ex.Message, ex);
            }

            return response;
        }

        public StructureDeleteResponse StructureDeleteRaw(StructureDetailRequest request)
        {
            var idUser = _globalDataService.GetVariable<string>(ApplicationConstant.IDUSER);
            var idTenant = _globalDataService.GetVariable<string>(ApplicationConstant.IDTENANT);

            bool canUserModify = false;

            Structure structure = _unitOfWork.StructureDao.GetCustom(r => r.IdStructure == request.IdStructure,
            new List<string>() {
                    "UserStructures"
                }
            );

            if (structure == null)
            {
                throw new Exception("Structure not found");
            }

            // Check if the user has permission to edit the structure
            if (!_globalDataService.HasPermission(PermissionsConstant.GET_ALL_STRUCTURES))
            {
                canUserModify = structure.UserStructures.Where(us => us.IdUser == idUser).Count() > 0;
            }

            if (!canUserModify)
            {
                throw new Exception("You do not have permission to edit this profile");
            }

            structure.IsDeactivated = true;

            structure.UserStructures.ToList().ForEach(us =>
            {
                us.IsDeactivated = true;
            });
            _unitOfWork.Save();

            return new StructureDeleteResponse();
        }

        public BusinessResponse<StructureSlugFromSystemSlugResponse> StructureSlugFromSystemSlug(StructureSlugFromSystemSlugRequest request)
        {
            BusinessResponse<StructureSlugFromSystemSlugResponse> response = new BusinessResponse<StructureSlugFromSystemSlugResponse>();
            try
            {
                response.Result = StructureSlugFromSystemSlugRaw(request);
            }
            catch (Exception ex)
            {
                response.Exception = new BusinessLayerException(ex.Message, ex);
            }

            return response;
        }

        public StructureSlugFromSystemSlugResponse StructureSlugFromSystemSlugRaw(StructureSlugFromSystemSlugRequest request)
        {
            StructureSlugFromSystemSlugResponse structureSlugFromSystemSlugResponse = new StructureSlugFromSystemSlugResponse();
            var idTenant = _globalDataService.GetVariable<string>(ApplicationConstant.IDTENANT);

            var structure = _unitOfWork.StructureDao.GetCustom(r => r.SystemSlug == request.Slug, new List<string>() { "IdStructureTypeNavigation" });

            if (structure == null)
            {
                throw new Exception("Structure not found");
            }

            string slugParameterConstant = structure.IdStructureTypeNavigation?.Code == "INDIVIDUAL" ? ParameterConstant.INDIVIDUAL_BASE_SLUG_URL : ParameterConstant.COMPANY_BASE_SLUG_URL;

            structureSlugFromSystemSlugResponse.Url = String.Format("{0}{1}?s=1", GetSlugBaseUrlRaw(slugParameterConstant), structure.Slug);

            return structureSlugFromSystemSlugResponse;
        }

        public BusinessResponse<string> GetSlugBaseUrl(string baseUrlType)
        {
            BusinessResponse<string> response = new BusinessResponse<string>();
            try
            {
                response.Result = GetSlugBaseUrlRaw(baseUrlType);
            }
            catch (Exception ex)
            {
                response.Exception = new BusinessLayerException(ex.Message, ex);
            }

            return response;
        }
        public BusinessResponse<string> GetIndividualSlugBaseUrl()
        {
            BusinessResponse<string> response = new BusinessResponse<string>();
            try
            {
                response.Result = GetSlugBaseUrlRaw(ParameterConstant.INDIVIDUAL_BASE_SLUG_URL);
            }
            catch (Exception ex)
            {
                response.Exception = new BusinessLayerException(ex.Message, ex);
            }

            return response;
        }
        public BusinessResponse<string> GetLegalEntitySlugBaseUrl()
        {
            BusinessResponse<string> response = new BusinessResponse<string>();
            try
            {
                response.Result = GetSlugBaseUrlRaw(ParameterConstant.COMPANY_BASE_SLUG_URL);
            }
            catch (Exception ex)
            {
                response.Exception = new BusinessLayerException(ex.Message, ex);
            }

            return response;
        }


        public string GetSlugBaseUrlRaw(string baseUrlType)
        {
            var slugBaseUrl = _unitOfWork.ParameterDao.GetCustom(c => c.IdParameter == ParameterConstant.FromConstant(baseUrlType))?.ParamaterValue;
            return slugBaseUrl;
        }

        public BusinessResponse<List<IndividualProfileColorVariantResponse>> GetColourVaraintsForIndividualProfile()
        {
            BusinessResponse<List<IndividualProfileColorVariantResponse>> response = new BusinessResponse<List<IndividualProfileColorVariantResponse>>();
            try
            {
                response.Result = GetColourVaraintsForProfileRaw(ParameterConstant.INDIVIDUAL_PROFILE_COLOUR_VARIANTS);
            }
            catch (Exception ex)
            {
                response.Exception = new BusinessLayerException(ex.Message, ex);
            }

            return response;
        }

        public BusinessResponse<List<IndividualProfileColorVariantResponse>> GetColourVaraintsForLegalEntityProfile()
        {
            BusinessResponse<List<IndividualProfileColorVariantResponse>> response = new BusinessResponse<List<IndividualProfileColorVariantResponse>>();
            try
            {
                response.Result = GetColourVaraintsForProfileRaw(ParameterConstant.COMPANY_PROFILE_COLOUR_VARIANTS);
            }
            catch (Exception ex)
            {
                response.Exception = new BusinessLayerException(ex.Message, ex);
            }

            return response;
        }

        public BusinessResponse<List<IndividualProfileColorVariantResponse>> GetColourVaraintsForProfile(string colourVariantType)
        {
            BusinessResponse<List<IndividualProfileColorVariantResponse>> response = new BusinessResponse<List<IndividualProfileColorVariantResponse>>();
            try
            {
                response.Result = GetColourVaraintsForProfileRaw(colourVariantType);
            }
            catch (Exception ex)
            {
                response.Exception = new BusinessLayerException(ex.Message, ex);
            }

            return response;
        }

        public List<IndividualProfileColorVariantResponse> GetColourVaraintsForProfileRaw(string colourVariantType)
        {
            var colourVariants = _unitOfWork.ParameterDao.GetCustom(c => c.IdParameter == ParameterConstant.FromConstant(colourVariantType))?.ParamaterValue;

            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };

            List<IndividualProfileColorVariantResponse> variants = System.Text.Json.JsonSerializer.Deserialize<List<IndividualProfileColorVariantResponse>>(colourVariants, options);

            return variants;
        }

        public BusinessResponse<List<GetStructurerCategoriesHiearchyResponse>> GetStructurerCategoriesHiearchy()
        {
            BusinessResponse<List<GetStructurerCategoriesHiearchyResponse>> response = new BusinessResponse<List<GetStructurerCategoriesHiearchyResponse>>();
            try
            {
                response.Result = GetStructurerCategoriesHiearchyRaw();
            }
            catch (Exception ex)
            {
                response.Exception = new BusinessLayerException(ex.Message, ex);
            }

            return response;
        }

        public List<GetStructurerCategoriesHiearchyResponse> GetStructurerCategoriesHiearchyRaw()
        {
            var rawData = _unitOfWork.StructureCategoryDao.GetAll();

            var allCategories = rawData
                .Select(c => new GetStructurerCategoriesHiearchyResponse
                {
                    IdStructureCategory = c.IdStructureCategory,
                    Name = c.Name,
                    Color = c.Color,
                    IdDocument = c.IdDocument,
                    Slug = c.Slug,
                    SvgIcon = c.SvgIcon
                })
                .ToList();

            // Build a dictionary for fast lookup
            var lookup = allCategories.ToDictionary(c => c.IdStructureCategory);

            List<GetStructurerCategoriesHiearchyResponse> roots = new();


            foreach (var item in rawData)
            {
                if (!string.IsNullOrEmpty(item.IdParentStructureCategory))
                {
                    if (lookup.TryGetValue(item.IdParentStructureCategory, out var parent))
                    {
                        parent.Children.Add(lookup[item.IdStructureCategory]);
                    }
                }
                else
                {
                    roots.Add(lookup[item.IdStructureCategory]);
                }
            }

            return roots;
        }



        public BusinessResponse<StructurePasswordVerifyBySlugResponse> StructurePasswordVerifyBySlug(StructurePasswordVerifyBySlugRequest request)
        {
            BusinessResponse<StructurePasswordVerifyBySlugResponse> response = new BusinessResponse<StructurePasswordVerifyBySlugResponse>();
            try
            {
                response.Result = StructurePasswordVerifyBySlugRaw(request);
            }
            catch (Exception ex)
            {
                response.Exception = new BusinessLayerException(ex.Message, ex);
            }

            return response;
        }

        public StructurePasswordVerifyBySlugResponse StructurePasswordVerifyBySlugRaw(StructurePasswordVerifyBySlugRequest request)
        {
            StructurePasswordVerifyBySlugResponse verifyPortfolioPasswordResponse = new StructurePasswordVerifyBySlugResponse()
            {
                IsValid = false
            };

            var structure = _unitOfWork.StructureDao.GetCustom(r => r.Slug == request.Slug);

            if (structure != null && request.Password == structure.PortfolioPassword)
            {
                verifyPortfolioPasswordResponse.IsValid = true;
            }

            return verifyPortfolioPasswordResponse;

        }

    }

}