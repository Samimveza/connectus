using System;
using System.Collections.Generic;

namespace Business.Model;

public partial class Document
{
    public string IdDocument { get; set; } = null!;

    public string? FileName { get; set; }

    public string? FileExtension { get; set; }

    public long? DocumentOrder { get; set; }

    public bool? IsDeactivated { get; set; }

    public string? IdDocumentType { get; set; }

    public string? PhysicalFilePath { get; set; }

    public string? IdParameterBasePhysicalFilePath { get; set; }

    public string? ServerFilePath { get; set; }

    public string? IdParameterBaseServerUrl { get; set; }

    public virtual Parameter? IdParameterBasePhysicalFilePathNavigation { get; set; }

    public virtual Parameter? IdParameterBaseServerUrlNavigation { get; set; }

    public virtual ICollection<IntegrationType> IntegrationTypes { get; set; } = new List<IntegrationType>();

    public virtual ICollection<ShopProductCategory> ShopProductCategories { get; set; } = new List<ShopProductCategory>();

    public virtual ICollection<StructureCategory> StructureCategories { get; set; } = new List<StructureCategory>();

    public virtual ICollection<StructureEducationMedium> StructureEducationMedia { get; set; } = new List<StructureEducationMedium>();

    public virtual ICollection<StructureExperienceMedium> StructureExperienceMedia { get; set; } = new List<StructureExperienceMedium>();

    public virtual ICollection<StructureGallery> StructureGalleries { get; set; } = new List<StructureGallery>();

    public virtual ICollection<Structure> StructureIdCoverPictureNavigations { get; set; } = new List<Structure>();

    public virtual ICollection<Structure> StructureIdProfilePictureNavigations { get; set; } = new List<Structure>();

    public virtual ICollection<StructureMember> StructureMembers { get; set; } = new List<StructureMember>();

    public virtual ICollection<StructurePortfolioDocument> StructurePortfolioDocuments { get; set; } = new List<StructurePortfolioDocument>();

    public virtual ICollection<StructurePortfolio> StructurePortfolios { get; set; } = new List<StructurePortfolio>();

    public virtual ICollection<StructureProductDocument> StructureProductDocuments { get; set; } = new List<StructureProductDocument>();

    public virtual ICollection<StructureStructureField> StructureStructureFields { get; set; } = new List<StructureStructureField>();
}
