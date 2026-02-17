using Azure.Core;
using Business.Common;
using Business.Dto.Request;
using Business.Dto.Response;
using Business.Model;
using Business.Utils;
using Data.Interfaces;
using Data.Source;
using Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;
using static Business.Enums.Constants;

namespace Service.Extension
{
    public class OnboardingService : Service.Interfaces.IOnboardingService
    {
        public IUnitOfWork _unitOfWork;
        private readonly IGlobalDataService _globalDataService;
        private readonly IPermissionService _permissionService;

        public OnboardingService(
             IUnitOfWork unitOfWork
              , IGlobalDataService globalDataService
              , IPermissionService permissionService
            )
        {
            _unitOfWork = unitOfWork;
            _globalDataService = globalDataService;
        }



        public BusinessResponse<StructureDetailResponse> StructureUpdate(StructureUpdateRequest request)
        {
            BusinessResponse<StructureDetailResponse> response = new BusinessResponse<StructureDetailResponse>();
            try
            {
                response.Result = StructureUpdateRaw(request);
            }
            catch (Exception ex)
            {
                response.Exception = new BusinessLayerException(ex.Message, ex);
            }

            return response;
        }

        public StructureDetailResponse StructureUpdateRaw(StructureUpdateRequest request)
        {
            var idUser = _globalDataService.GetVariable<string>(ApplicationConstant.IDUSER);
            var idTenant = _globalDataService.GetVariable<string>(ApplicationConstant.IDTENANT);

            StructureUpdateResponse structureUpdateResponse = new StructureUpdateResponse();

            //save info
            var structure = _unitOfWork.StructureDao.GetCustom(r => r.IdStructure == request.IdStructure,
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
                        "StructureContacts"
                  }
              );

            structure.Headline = request.Headline;
            structure.TopFooter = request.TopFooter;

            if (structure.IdStructureType == "0cb5cf03-bb33-4e8a-989a-990754515f4f")//Individual
            {
                structure.IdPersonNavigation.Firstname = request.Firstname;
                structure.IdPersonNavigation.Lastname = request.Lastname;
                structure.IdPersonNavigation.WorkingOrganisation = request.WorkingOrganisation;
                structure.Email = request.Email;
            }
            else
            {
                structure.IdCompanyNavigation.Name = request.CompanyName;
            }

            structure.StructureAddresses?.ToList()?.ForEach(address =>
            {
                _unitOfWork.StructureAddressDao.Delete(address);
                _unitOfWork.AddressDao.Delete(address.IdAddressNavigation);
            });


            structure.StructureSocialNetworks?.ToList()?.ForEach(socialNetwork =>
            {
                _unitOfWork.StructureSocialNetworkDao.Delete(socialNetwork);
            });

            structure.StructureContacts?.ToList()?.ForEach(structureContact =>
            {
                _unitOfWork.StructureContactDao.Delete(structureContact);
            });

            structure.IdProfilePicture = request.IdProfilePicture;
            structure.IdCoverPicture = request.IdCoverPicture;


            request.Addresses?.ForEach(address =>
            {
                Address newAddress = new Address();
                newAddress.AddressLine1 = address.AddressLine1;
                newAddress.AddressLine2 = address.AddressLine2;
                newAddress.City = address.City;
                newAddress.Country = address.Country;
                _unitOfWork.AddressDao.Add(newAddress);

                StructureAddress structureAddress = new StructureAddress();
                structureAddress.IdStructure = request.IdStructure;
                structureAddress.IdAddress = newAddress.IdAddress;
                _unitOfWork.StructureAddressDao.Add(structureAddress);
            });

            request.SocialNetworks?.ToList()?.ForEach(socialNetwork =>
            {
                StructureSocialNetwork newSocialNetwork = new StructureSocialNetwork();
                newSocialNetwork.IdSocialNetwork = socialNetwork.IdSocialNetwork;
                newSocialNetwork.IdStructure = structure.IdStructure;
                newSocialNetwork.Value = socialNetwork.Value;
                _unitOfWork.StructureSocialNetworkDao.Add(newSocialNetwork);

            });

            request.Contacts?.ToList()?.ForEach(structureContact =>
            {
                StructureContact newStructureContact = new StructureContact();
                newStructureContact.IdStructure = structure.IdStructure;
                newStructureContact.Name = structureContact.Name;
                newStructureContact.Value = structureContact.Value;
                _unitOfWork.StructureContactDao.Add(newStructureContact);

            });

            _unitOfWork.Save();



            return null;// StructureDetailRaw(new StructureDetailRequest() { IdStructure = request.IdStructure });
        }

        public BusinessResponse<BaseListReturnType<SocialNetworkListResponse>> SocialNetworkAll()
        {
            BusinessResponse<BaseListReturnType<SocialNetworkListResponse>> response = new BusinessResponse<BaseListReturnType<SocialNetworkListResponse>>();
            try
            {
                response.Result = SocialNetworkAllRaw();
            }
            catch (Exception ex)
            {
                response.Exception = new BusinessLayerException(ex.Message, ex);
            }

            return response;
        }

        public BaseListReturnType<SocialNetworkListResponse> SocialNetworkAllRaw()
        {
            BaseListReturnType<SocialNetworkListResponse> response = new BaseListReturnType<SocialNetworkListResponse>();
            response.EntityList = new List<SocialNetworkListResponse>();

            List<SocialNetwork> products = _unitOfWork.SocialNetworkDao.GetListCustom(-1, 0, s => s.Name != null, s => s.IdSocialNetwork, new List<string>()
            {
            }).EntityList;

            response.TotalCount = products.Count();
            response.EntityList = products.Select(p => new SocialNetworkListResponse()
            {
                IdSocialNetwork = p.IdSocialNetwork,
                Name = p.Name,
                Prefix = p.AbsoluteUrl.Replace("[[VALUE]]", "")

            }).ToList();

            return response;
        }

    }
}
