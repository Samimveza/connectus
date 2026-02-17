using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Dto.Request
{

    public class StructureCreateRequest : BaseRequest
    {
        public string IdStructure { get; set; }
        public StructureCreateProfilePicture ProfilePicture { get; set; }
        public StructureCreateCoverPicture CoverPicture { get; set; }
        public List<object> Contacts { get; set; }
        public List<object> SocialNetworks { get; set; }
        public List<StructureCreateAddress> Addresses { get; set; }
        public List<StructureCreateStructureField> StructureFields { get; set; }
        public List<StructureCreateAccordion> Accordions { get; set; }
        public List<StructureCreateCategory> Categories { get; set; }
        public List<StructureCreateFeature> Features { get; set; }
        public List<StructureCreateGallery> Gallery { get; set; }
        public List<StructureCreateMember> Members { get; set; }
        public List<StructureCreateTag> Tags { get; set; }
        public string Color { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string WorkingOrganisation { get; set; }
        public string Middlename { get; set; }
        public string Headline { get; set; }
        public string Name { get; set; }
        public string IdStructureType { get; set; }
        public string Email { get; set; }
        public string CardName { get; set; }
        public string Title { get; set; }
        public string OtherName { get; set; }
        public bool? IsPaused { get; set; }
        public string MainPhoneNumber { get; set; }
        public string IdColourVariant { get; set; }
        public bool? IsMainPhoneNumberPrivate { get; set; }
        public string StructureTypeCode { get; set; }
        public StructureWorkingHourRequest WorkingHours { get; set; }
        public string BusinessRegistrationNumber { get; set; }
        public string CompanyDescription { get; set; }
        public string CompanyName { get; set; }
        public string MainWebsite { get; set; }
        public string PortfolioTitle { get; set; }
        public string PortfolioDescription { get; set; }
        public bool? PortfolioPasswordIsEnabled { get; set; }
        public string PortfolioPassword { get; set; }

        

        public List<StructureCreatePortfolio> Portfolios { get; set; }

    }





    public class StructureCreateAddress
    {
        public string IdLocal { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string Name { get; set; }
        public int? DisplayOrder { get; set; }
    }

    public class StructureCreateCoverPicture
    {
        public string IdDocument { get; set; }
        public string Name { get; set; }
        public string Url { get; set; }
    }

    public class StructureCreateDocument
    {
        public string IdDocument { get; set; }
        public string Name { get; set; }
        public string Url { get; set; }
    }

    public class StructureCreateProfilePicture
    {
        public string IdDocument { get; set; }
        public string Name { get; set; }
        public string Url { get; set; }
    }

    public class StructureCreateStructureField
    {
        public string IdLocal { get; set; }
        public string IdStructureField { get; set; }
        public StructureCreateStructureField StructureField { get; set; }
        public int DisplayOrder { get; set; }
        public object Value { get; set; }
        public string DisplayText { get; set; }
        public StructureCreateDocument Document { get; set; }
        public bool? IsPrivate { get; set; }


    }

    public class StructureCreateAccordion
    {
        public string IdLocal { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int DisplayOrder { get; set; }


    }

    public class StructureCreateCategory
    {
        public string IdLocal { get; set; }
        public string IdStructureCategory { get; set; }
        public bool? IsPrimary { get; set; }
    }

    public class StructureCreateFeature
    {
        public string IdLocal { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int? DisplayOrder { get; set; }
    }

    public class StructureCreateGallery
    {
        public string IdLocal { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool? IsMain { get; set; }
        public bool? ShowOnSlider { get; set; }
        public int? DisplayOrder { get; set; }
        public StructureCreateDocument Image { get; set; }
    }

    public class StructureCreateMember
    {
        public string IdLocal { get; set; }
        public string IdPerson { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public int DisplayOrder { get; set; }


        public StructureCreateDocument Photo { get; set; }
    }

    public class StructureCreateTag
    {
        public string IdLocal { get; set; }
        public string IdStructureTag { get; set; }
        public string Name { get; set; }
        public int? DisplayOrder { get; set; }
        public string Color { get; set; }
    }

    public class StructureWorkingHourRequest
    {
        public string IdStructure { get; set; }
        public List<WorkingHourDayRequest> Days { get; set; }
        public string SpecialNotes { get; set; }
        public DateTime LastUpdated { get; set; }
        public bool? Show24Hours { get; set; }


    }

    public class WorkingHourDayRequest
    {
        public string Name { get; set; }
        public string Short { get; set; }
        public int DayOfWeek { get; set; }
        public bool IsOpen { get; set; }
        public List<WorkingHourTimeSlotRequest> TimeSlots { get; set; }
    }

    public class WorkingHourTimeSlotRequest
    {
        public DateTime OpenTime { get; set; }
        public DateTime CloseTime { get; set; }
    }

    public class StructureCreatePortfolio
    {
        public string IdLocal { get; set; }
        public string IdPortfolioReference { get; set; }
        
        public string Name { get; set; }
        public string Description { get; set; }
        public int DisplayOrder { get; set; }
        public StructureCreateDocument Image { get; set; }

        public List<StructureCreatePortfolioDocument> AdditionalImages { get; set; }
    }

    public class StructureCreatePortfolioDocument
    {
        public string IdAdditionalImageReference { get; set; }
        public int DisplayOrder { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public StructureCreateDocument Image { get; set; }
    }

}
