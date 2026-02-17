using Business.Common;
using Business.Dto.Request;
using Business.Dto.Response;
using Business.Dto.Request.Integration;
using Business.Dto.Response.Integration;
using Business.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.WebUtilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Business.Dto.Response.Structure;
using Business.Dto.Request.Structure;
using Business.Dto.Request.Subscription;
using Business.Dto.Response.Subscription;
using Business.Dto.Request.Message;
using Business.Dto.Response.Message;
using Business.Dto.Request.ShopProductCategory;
using Business.Dto.Response.ShopProductCategory;
using Business.Dto.Request.StructureAttribute;
using Business.Dto.Response.StructureAttribute;
using Business.Dto.Request.StructureOption;
using Business.Dto.Response.StructureOption;
using Business.Dto.Request.StructureProduct;
using Business.Dto.Response.StructureProduct;

namespace Service.Interfaces
{
    public interface IPersonService
    {
        void GetAllPerson();
    }

    public interface IAuthenticationService
    {
        Task<BusinessResponse<AuthenticateResponse>> AuthenticateAsync(AuthenticateRequest request);
        Task<BusinessResponse<RegistrationResponse>> RegisterAsync(RegistrationRequest request);
        Task<BusinessResponse<ValidateEmailResponse>> ValidateEmailAsync(string code, string email, string domain);

        BusinessResponse<ValidateOtpResponse> ValidateOtp(ValidateOtpRequest request);
        BusinessResponse<ValidateOtpResponse> ResendOtp(ValidateOtpRequest request);

        BusinessResponse<ForgotPasswordResponse> ForgotPassword(ForgotPasswordRequest request);
        Task<BusinessResponse<ForgotPasswordResponse>> ForgotPasswordWithOtpAsync(ForgotPasswordRequest request);

    }



    public interface IFileService
    {

        Task<BusinessResponse<UploadFileResponse>> UploadFile(MultipartReader reader, MultipartSection section, bool isDirect = false);

        BusinessResponse<GetFileResponse> GetFile(string idDocument);


    }



    public interface IMailService
    {
        BusinessResponse<SendMailResponse> SendMail(SendMailRequest sendMailRequest);
    }

    public interface IPermissionService
    {
        List<AllowedActionListResponse> ActionForUser(Dictionary<string, Dictionary<string, string>> permissions);

    }

    public interface ILogService
    {
        BusinessResponse<BaseListReturnType<LogListResponse>> LogList(LogListRequest request, string entityName);

        BusinessResponse<StructureLogRegisterResponse> StructureLogRegister(StructureLogRegisterRequest request);

    }


    public interface IOnboardingService
    {

        BusinessResponse<StructureDetailResponse> StructureUpdate(StructureUpdateRequest request);

        BusinessResponse<BaseListReturnType<SocialNetworkListResponse>> SocialNetworkAll();

    }
    public interface ICardService
    {
        BusinessResponse<GenerateCardResponse> GenerateCard(GenerateCardRequest request);
        BusinessResponse<GenerateNewCardResponse> GenerateNewCard();

    }

    public interface ITransactionService
    {
        BusinessResponse<OnCardScanResponse> OnCardScan(OnCardScanRequest request);
    }


    public interface IAnalyticsService
    {
        BusinessResponse<GetAllSlugsResponse> GetAllSlugs();
    }

    public interface IIntegrationTypeService
    {
    }

    public interface IIntegrationStateService
    {
    }

    public interface IIntegrationDetailActionTypeService
    {
    }

    public interface IIntegrationDetailActionService
    {
    }

    public interface IIntegrationDetailService
    {
    }

    public interface IIntegrationService
    {
        BusinessResponse<InitializeIntegrationResponse> InitializeIntegrationForUser(InitializeIntegrationRequest request);

        Task<BusinessResponse<ProcessInitializationResponse>> ProcessInitializationAsync(ProcessInitializationRequest request);

        BusinessResponse<BaseListReturnType<IntegrationTypeListResponse>> IntegrationTypeList(IntegrationTypeListRequest request);

        BusinessResponse<BaseListReturnType<IntegrationDetailListResponse>> IntegrationDetailList(IntegrationDetailListRequest request);

        BusinessResponse<IntegrationDownloadFileResponse> DownloadIntegrationFile(string idDocument);

    }

    public interface IListOfValuesService
    {

    }

    public interface IStructureService
    {
        BusinessResponse<BaseListReturnType<StructureFieldListResponse>> StructureFieldList(StructureFieldListRequest request);

        BusinessResponse<BaseListReturnType<StructureListResponse>> StructureList(StructureListRequest request);
        BusinessResponse<StructureDetailResponse> StructureCreate(StructureCreateRequest request);


        BusinessResponse<StructureDetailResponse> StructureDetailBySlug(StructureDetailBySlugRequest request);
        BusinessResponse<StructureDetailResponse> StructureDetail(StructureDetailRequest request);
        BusinessResponse<StructureDeleteResponse> StructureDelete(StructureDetailRequest request);
        BusinessResponse<StructureSlugFromSystemSlugResponse> StructureSlugFromSystemSlug(StructureSlugFromSystemSlugRequest request);



        BusinessResponse<string> GetIndividualSlugBaseUrl();
        BusinessResponse<string> GetLegalEntitySlugBaseUrl();
        BusinessResponse<string> GetSlugBaseUrl(string baseUrlType);

        BusinessResponse<List<IndividualProfileColorVariantResponse>> GetColourVaraintsForIndividualProfile();
        BusinessResponse<List<IndividualProfileColorVariantResponse>> GetColourVaraintsForLegalEntityProfile();
        BusinessResponse<List<IndividualProfileColorVariantResponse>> GetColourVaraintsForProfile(string colourVariantType);

        BusinessResponse<List<StructureViewResponse>> GetStructureViews(GetStructureViewsRequest request);
        BusinessResponse<List<GetStructurerCategoriesHiearchyResponse>> GetStructurerCategoriesHiearchy();

        BusinessResponse<StructurePasswordVerifyBySlugResponse> StructurePasswordVerifyBySlug(StructurePasswordVerifyBySlugRequest request);
    }

    public interface ISubscriptionService
    {
        BusinessResponse<AddSubscriptionResponse> AddSubscription(AddSubscriptionRequest request);

    }

    public interface IMessageService
    {
        BusinessResponse<AddMessageForStructureBySlugResponse> AddMessageForStructureBySlug(AddMessageForStructureBySlugRequest request);

        BusinessResponse<BaseListReturnType<StructureMessageListResponse>> StructureMessageList(StructureMessageListRequest request);

        BusinessResponse<ManipulateMessageReadStateResponse> ManipulateMessageReadState(ManipulateMessageReadStateRequest request);

    }

    public interface IShopProductCategoryService
    {
        BusinessResponse<ShopProductCategoryListResponse> GetShopProductCategories(GetShopProductCategoriesRequest request);
        BusinessResponse<SaveShopProductCategoryResponse> SaveShopProductCategory(SaveShopProductCategoryRequest request);
        BusinessResponse<DeleteShopProductCategoryResponse> DeleteShopProductCategory(DeleteShopProductCategoryRequest request);
    }

    public interface IStructureAttributeService
    {
        BusinessResponse<StructureAttributeListResponse> GetStructureAttributes(GetStructureAttributesRequest request);
        BusinessResponse<SaveStructureAttributeResponse> SaveStructureAttribute(SaveStructureAttributeRequest request);
        BusinessResponse<DeleteStructureAttributeResponse> DeleteStructureAttribute(DeleteStructureAttributeRequest request);
    }

    public interface IStructureOptionService
    {
        BusinessResponse<StructureOptionListResponse> GetStructureOptions(GetStructureOptionsRequest request);
        BusinessResponse<SaveStructureOptionResponse> SaveStructureOption(SaveStructureOptionRequest request);
        BusinessResponse<DeleteStructureOptionResponse> DeleteStructureOption(DeleteStructureOptionRequest request);
    }

    public interface IStructureProductService
    {
        BusinessResponse<BaseListReturnType<StructureProductResponse>> GetStructureProducts(GetStructureProductsRequest request);
        BusinessResponse<StructureProductResponse> GetStructureProduct(GetStructureProductRequest request);
        BusinessResponse<SaveStructureProductResponse> SaveStructureProduct(SaveStructureProductRequest request);
        BusinessResponse<DeleteStructureProductResponse> DeleteStructureProduct(DeleteStructureProductRequest request);
    }

}