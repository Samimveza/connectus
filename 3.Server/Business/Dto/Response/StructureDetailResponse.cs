using Business.Dto.Response.Structure;
using Business.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Dto.Response
{
    public class StructureDetailResponse
    {
        public string IdStructure { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string CompanyName { get; set; }
        public string Email { get; set; }
        public string Headline { get; set; }
        public string TopFooter { get; set; }
        public string QrCodeUrl { get; set; }
        public string PageUrl { get; set; }
        public List<AddressResponse> Addresses { get; set; }
        public List<SocialNetworkResponse> SocialNetworks { get; set; }
        public List<StructureContactResponse> Contacts { get; set; }
        public DocumentResponse ProfilePicture { get; set; }
        public DocumentResponse CoverPicture { get; set; }
        public string IdProfilePicture { get; set; }
        public string IdCoverPicture { get; set; }
        public string IdStructureType { get; set; }
        public string StructureTypeCode { get; set; }
        public StructureTypeResponse StructureType { get; set; }
        public string WorkingOrganisation { get; set; }

        public string IdProfileTemplate { get; set; }

        public List<StructureFieldsResponse> StructureFields { get; set; }

        public List<StructureAccordionResponse> Accordions { get; set; }
        public List<StructureCategoryResponse> Categories { get; set; }
        public List<StructureFeatureResponse> Features { get; set; }
        public List<StructureGalleryResponse> Gallery { get; set; }
        public List<StructureMemberResponse> Members { get; set; }
        public List<StructureTagResponse> Tags { get; set; }

        public List<StructureViewResponse> Views { get; set; }

        public WorkingHoursResponse WorkingHours { get; set; }

        public string CardName { get; set; }
        public string OtherName { get; set; }
        public string Title { get; set; }


        public string FullSlugUrl { get; set; }
        public string Slug { get; set; }
        public bool? IsPaused { get; set; }

        public string MainPhoneNumber { get; set; }
        public string IdColourVariant { get; set; }
        public bool? IsMainPhoneNumberPrivate { get; set; }


        public string PortfolioTitle { get; set; }
        public string PortfolioDescription { get; set; }
        public string PortfolioPassword { get; set; }
        public bool? PortfolioPasswordIsEnabled { get; set; }


        public List<StructureScanPerViewTypeResponse> TotalViewsPerViewType { get; set; }

        public IndividualProfileColorVariantResponse ColorVariant { get; set; }

        public string BusinessRegistrationNumber { get; set; }
        public string CompanyDescription { get; set; }
        public string MainWebsite { get; set; }

        public List<StructurePortfolioResponse> Portfolios { get; set; }

    }

    public class StructureViewResponse
    {
        public DateTime? Date { get; set; }
        public float NoOfViews { get; set; }
        public string Source { get; set; }
    }

    public class StructureFieldsResponse
    {
        public string IdStructureStructureFieldReference { get; set; } = null!;

        public string? IdStructureField { get; set; }

        public string? Value { get; set; }

        public string? DisplayText { get; set; }

        public string? IdDocument { get; set; }

        public int? DisplayOrder { get; set; }
        public bool? IsPrivate { get; set; }

        public virtual DocumentResponse? Document { get; set; }

        public virtual StructureFieldListResponse? StructureField { get; set; }
    }

    public class StructureAccordionResponse
    {
        public string IdStructureAccordionReference { get; set; } = null!;
        public string? Name { get; set; }
        public string? Description { get; set; }
        public int? DisplayOrder { get; set; }
    }

    public class StructureCategoryResponse
    {
        public string IdStructureStructureCategoryReference { get; set; } = null!;
        public string? IdStructureCategory { get; set; }
        public bool? IsPrimary { get; set; }
        public StructureCategoryDetailResponse? Category { get; set; }
    }

    public class StructureCategoryDetailResponse
    {
        public string IdStructureCategory { get; set; } = null!;
        public string? Name { get; set; }
        public string? Color { get; set; }
        public string? Slug { get; set; }
        public string? SvgIcon { get; set; }
        public DocumentResponse? Document { get; set; }
    }

    public class StructureFeatureResponse
    {
        public string IdStructureFeatureReference { get; set; } = null!;
        public string? Name { get; set; }
        public string? Description { get; set; }
        public int? DisplayOrder { get; set; }
    }

    public class StructureGalleryResponse
    {
        public string IdStructureGalleryReference { get; set; } = null!;
        public string? Name { get; set; }
        public string? Description { get; set; }
        public bool? IsMain { get; set; }
        public bool? ShowOnSlider { get; set; }
        public int? DisplayOrder { get; set; }
        public DocumentResponse? Image { get; set; }
    }

    public class StructureMemberResponse
    {
        public string IdStructureMemberReference { get; set; } = null!;
        public string? Title { get; set; }
        public string? Description { get; set; }
        public int? DisplayOrder { get; set; }
        public DocumentResponse? Photo { get; set; }
        public PersonResponse? Person { get; set; }

        public string? Firstname { get; set; }
        public string? Lastname { get; set; }

    }

    public class PersonResponse
    {
        public string IdPerson { get; set; } = null!;
        public string? Firstname { get; set; }
        public string? Lastname { get; set; }
        public string? Title { get; set; }
        public string? OtherName { get; set; }
        public string? WorkingOrganisation { get; set; }
    }

    public class StructureTagResponse
    {
        public string IdStructureStructureTagReference { get; set; } = null!;
        public string? IdStructureTag { get; set; }
        public string? Name { get; set; }
        public int? DisplayOrder { get; set; }
        public string? Color { get; set; }
        public StructureTagDetailResponse? Tag { get; set; }
    }

    public class StructureTagDetailResponse
    {
        public string IdStructureTag { get; set; } = null!;
        public string? Name { get; set; }
    }

    public class WorkingHoursResponse
    {
        public List<WorkingHourDayResponse> Days { get; set; }
        public string SpecialNotes { get; set; }
        public DateTime LastUpdated { get; set; }
        public bool? Show24Hours { get; set; }
    }

    public class WorkingHourDayResponse
    {
        public string Name { get; set; }
        public string Short { get; set; }
        public int DayOfWeek { get; set; }
        public bool IsOpen { get; set; }
        public List<WorkingHourTimeSlotResponse> TimeSlots { get; set; }
    }

    public class WorkingHourTimeSlotResponse
    {
        public TimeSpan OpenTime { get; set; }
        public TimeSpan CloseTime { get; set; }
    }

    public class StructurePortfolioResponse
    {
        public string IdStructurePortfolioReference { get; set; }
        public string Slug { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int DisplayOrder { get; set; }

        public DocumentResponse Image { get; set; }

        public List<StructurePortfolioDocumentResponse> AdditionalImages { get; set; }
    }

    public class StructurePortfolioDocumentResponse
    {
        public string IdAdditionalImageReference { get; set; }
        public int DisplayOrder { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DocumentResponse Image { get; set; }
    }
}