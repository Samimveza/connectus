using System;
using System.Collections.Generic;

namespace Business.Model;

public partial class Structure
{
    public string IdStructure { get; set; } = null!;

    public string? IdCompany { get; set; }

    public string? IdPerson { get; set; }

    public bool? IsDeactivated { get; set; }

    public string? IdTenant { get; set; }

    public DateTime? DateCreated { get; set; }

    public string? Email { get; set; }

    public string? IdStructureType { get; set; }

    public string? IdProfilePicture { get; set; }

    public string? Headline { get; set; }

    public string? Slug { get; set; }

    public string? SystemSlug { get; set; }

    public string? IdCoverPicture { get; set; }

    public string? TopFooter { get; set; }

    public string? IdProfileTemplate { get; set; }

    public string? MainPhoneNumber { get; set; }

    public string? CardName { get; set; }

    public bool? IsPaused { get; set; }

    public string? IdColourVariant { get; set; }

    public bool? IsMainPhoneNumberPrivate { get; set; }

    public string? PortfolioTitle { get; set; }

    public string? PortfolioDescription { get; set; }

    public string? PortfolioPassword { get; set; }

    public bool? PortfolioPasswordIsEnabled { get; set; }

    public string? IdShop { get; set; }

    public virtual Company? IdCompanyNavigation { get; set; }

    public virtual Document? IdCoverPictureNavigation { get; set; }

    public virtual Person? IdPersonNavigation { get; set; }

    public virtual Document? IdProfilePictureNavigation { get; set; }

    public virtual ProfileTemplate? IdProfileTemplateNavigation { get; set; }

    public virtual Shop? IdShopNavigation { get; set; }

    public virtual StructureType? IdStructureTypeNavigation { get; set; }

    public virtual Tenant? IdTenantNavigation { get; set; }

    public virtual ICollection<ShopProductCategory> ShopProductCategories { get; set; } = new List<ShopProductCategory>();

    public virtual ICollection<StructureAccordion> StructureAccordions { get; set; } = new List<StructureAccordion>();

    public virtual ICollection<StructureAddress> StructureAddresses { get; set; } = new List<StructureAddress>();

    public virtual ICollection<StructureAttrribute> StructureAttrributes { get; set; } = new List<StructureAttrribute>();

    public virtual ICollection<StructureContact> StructureContacts { get; set; } = new List<StructureContact>();

    public virtual ICollection<StructureEducation> StructureEducations { get; set; } = new List<StructureEducation>();

    public virtual ICollection<StructureExperience> StructureExperiences { get; set; } = new List<StructureExperience>();

    public virtual ICollection<StructureFeature> StructureFeatures { get; set; } = new List<StructureFeature>();

    public virtual ICollection<StructureGallery> StructureGalleries { get; set; } = new List<StructureGallery>();

    public virtual ICollection<StructureMember> StructureMembers { get; set; } = new List<StructureMember>();

    public virtual ICollection<StructureMessage> StructureMessages { get; set; } = new List<StructureMessage>();

    public virtual ICollection<StructureOption> StructureOptions { get; set; } = new List<StructureOption>();

    public virtual ICollection<StructurePortfolio> StructurePortfolios { get; set; } = new List<StructurePortfolio>();

    public virtual ICollection<StructureProduct> StructureProducts { get; set; } = new List<StructureProduct>();

    public virtual ICollection<StructureSocialNetwork> StructureSocialNetworks { get; set; } = new List<StructureSocialNetwork>();

    public virtual ICollection<StructureStructureCategory> StructureStructureCategories { get; set; } = new List<StructureStructureCategory>();

    public virtual ICollection<StructureStructureField> StructureStructureFields { get; set; } = new List<StructureStructureField>();

    public virtual ICollection<StructureStructureTag> StructureStructureTags { get; set; } = new List<StructureStructureTag>();

    public virtual ICollection<StructureTransaction> StructureTransactions { get; set; } = new List<StructureTransaction>();

    public virtual ICollection<StructureWorkingHour> StructureWorkingHours { get; set; } = new List<StructureWorkingHour>();

    public virtual ICollection<UserStructure> UserStructures { get; set; } = new List<UserStructure>();
}
