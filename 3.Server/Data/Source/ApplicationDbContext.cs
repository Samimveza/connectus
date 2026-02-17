
using System;
using System.Collections.Generic;
using Business.Model;
using Microsoft.EntityFrameworkCore;

namespace Data.Source;

public partial class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<ActionLog> ActionLogs { get; set; }

    public virtual DbSet<Address> Addresses { get; set; }

    public virtual DbSet<AspNetRole> AspNetRoles { get; set; }

    public virtual DbSet<AspNetRoleClaim> AspNetRoleClaims { get; set; }

    public virtual DbSet<AspNetUser> AspNetUsers { get; set; }

    public virtual DbSet<AspNetUserClaim> AspNetUserClaims { get; set; }

    public virtual DbSet<AspNetUserLogin> AspNetUserLogins { get; set; }

    public virtual DbSet<AspNetUserToken> AspNetUserTokens { get; set; }

    public virtual DbSet<Company> Companies { get; set; }

    public virtual DbSet<Document> Documents { get; set; }

    public virtual DbSet<Integration> Integrations { get; set; }

    public virtual DbSet<IntegrationDetail> IntegrationDetails { get; set; }

    public virtual DbSet<IntegrationDetailAction> IntegrationDetailActions { get; set; }

    public virtual DbSet<IntegrationDetailActionType> IntegrationDetailActionTypes { get; set; }

    public virtual DbSet<IntegrationState> IntegrationStates { get; set; }

    public virtual DbSet<IntegrationType> IntegrationTypes { get; set; }

    public virtual DbSet<MailRecipient> MailRecipients { get; set; }

    public virtual DbSet<MailRecipientType> MailRecipientTypes { get; set; }

    public virtual DbSet<MailServerSetting> MailServerSettings { get; set; }

    public virtual DbSet<MailState> MailStates { get; set; }

    public virtual DbSet<MailToSend> MailToSends { get; set; }

    public virtual DbSet<MailToSendDocument> MailToSendDocuments { get; set; }

    public virtual DbSet<Parameter> Parameters { get; set; }

    public virtual DbSet<Permission> Permissions { get; set; }

    public virtual DbSet<Person> People { get; set; }

    public virtual DbSet<ProfileTemplate> ProfileTemplates { get; set; }

    public virtual DbSet<RolePermission> RolePermissions { get; set; }

    public virtual DbSet<Shop> Shops { get; set; }

    public virtual DbSet<ShopProductCategory> ShopProductCategories { get; set; }

    public virtual DbSet<SocialNetwork> SocialNetworks { get; set; }

    public virtual DbSet<Structure> Structures { get; set; }

    public virtual DbSet<StructureAccordion> StructureAccordions { get; set; }

    public virtual DbSet<StructureAddress> StructureAddresses { get; set; }

    public virtual DbSet<StructureAttrribute> StructureAttrributes { get; set; }

    public virtual DbSet<StructureAttrributeDetail> StructureAttrributeDetails { get; set; }

    public virtual DbSet<StructureCategory> StructureCategories { get; set; }

    public virtual DbSet<StructureContact> StructureContacts { get; set; }

    public virtual DbSet<StructureEducation> StructureEducations { get; set; }

    public virtual DbSet<StructureEducationMedium> StructureEducationMedia { get; set; }

    public virtual DbSet<StructureEducationSkill> StructureEducationSkills { get; set; }

    public virtual DbSet<StructureExperience> StructureExperiences { get; set; }

    public virtual DbSet<StructureExperienceMedium> StructureExperienceMedia { get; set; }

    public virtual DbSet<StructureExperienceSkill> StructureExperienceSkills { get; set; }

    public virtual DbSet<StructureFeature> StructureFeatures { get; set; }

    public virtual DbSet<StructureField> StructureFields { get; set; }

    public virtual DbSet<StructureGallery> StructureGalleries { get; set; }

    public virtual DbSet<StructureMember> StructureMembers { get; set; }

    public virtual DbSet<StructureMessage> StructureMessages { get; set; }

    public virtual DbSet<StructureOption> StructureOptions { get; set; }

    public virtual DbSet<StructureOptionDetail> StructureOptionDetails { get; set; }

    public virtual DbSet<StructurePortfolio> StructurePortfolios { get; set; }

    public virtual DbSet<StructurePortfolioDocument> StructurePortfolioDocuments { get; set; }

    public virtual DbSet<StructureProduct> StructureProducts { get; set; }

    public virtual DbSet<StructureProductDocument> StructureProductDocuments { get; set; }

    public virtual DbSet<StructureProductShopProductCategory> StructureProductShopProductCategories { get; set; }

    public virtual DbSet<StructureProductStructureOptionDetail> StructureProductStructureOptionDetails { get; set; }

    public virtual DbSet<StructureProductStructureProductAttrributeDetail> StructureProductStructureProductAttrributeDetails { get; set; }

    public virtual DbSet<StructureSocialNetwork> StructureSocialNetworks { get; set; }

    public virtual DbSet<StructureStructureCategory> StructureStructureCategories { get; set; }

    public virtual DbSet<StructureStructureField> StructureStructureFields { get; set; }

    public virtual DbSet<StructureStructureTag> StructureStructureTags { get; set; }

    public virtual DbSet<StructureTag> StructureTags { get; set; }

    public virtual DbSet<StructureTransaction> StructureTransactions { get; set; }

    public virtual DbSet<StructureTransactionDetail> StructureTransactionDetails { get; set; }

    public virtual DbSet<StructureTransactionDetailMetaDatum> StructureTransactionDetailMetaData { get; set; }

    public virtual DbSet<StructureType> StructureTypes { get; set; }

    public virtual DbSet<StructureWorkingHour> StructureWorkingHours { get; set; }

    public virtual DbSet<StructureWorkingHourDay> StructureWorkingHourDays { get; set; }

    public virtual DbSet<StructureWorkingHourTimeSlot> StructureWorkingHourTimeSlots { get; set; }

    public virtual DbSet<Subscriber> Subscribers { get; set; }

    public virtual DbSet<Tenant> Tenants { get; set; }

    public virtual DbSet<UserStructure> UserStructures { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ActionLog>(entity =>
        {
            entity.HasKey(e => e.IdActionLog);

            entity.ToTable("ActionLog");

            entity.Property(e => e.Date).HasColumnType("datetime");
            entity.Property(e => e.EntityName).HasMaxLength(450);
            entity.Property(e => e.IdEntityIdentifier).HasMaxLength(450);
            entity.Property(e => e.IdTenant).HasMaxLength(450);
            entity.Property(e => e.IdUser).HasMaxLength(450);
            entity.Property(e => e.IpAddress).HasMaxLength(450);

            entity.HasOne(d => d.IdTenantNavigation).WithMany(p => p.ActionLogs)
                .HasForeignKey(d => d.IdTenant)
                .HasConstraintName("FK_ActionLog_IdTenant_Tenant_IdTenant");

            entity.HasOne(d => d.IdUserNavigation).WithMany(p => p.ActionLogs)
                .HasForeignKey(d => d.IdUser)
                .HasConstraintName("FK_ActionLog_IdUser_User_IdUser");
        });

        modelBuilder.Entity<Address>(entity =>
        {
            entity.HasKey(e => e.IdAddress);

            entity.ToTable("Address");

            entity.Property(e => e.AddressLine1).HasMaxLength(450);
            entity.Property(e => e.AddressLine2).HasMaxLength(450);
            entity.Property(e => e.City).HasMaxLength(450);
            entity.Property(e => e.Country).HasMaxLength(450);
        });

        modelBuilder.Entity<AspNetRole>(entity =>
        {
            entity.HasIndex(e => e.NormalizedName, "RoleNameIndex")
                .IsUnique()
                .HasFilter("([NormalizedName] IS NOT NULL)");

            entity.Property(e => e.Name).HasMaxLength(256);
            entity.Property(e => e.NormalizedName).HasMaxLength(256);
        });

        modelBuilder.Entity<AspNetRoleClaim>(entity =>
        {
            entity.HasIndex(e => e.RoleId, "IX_AspNetRoleClaims_RoleId");

            entity.HasOne(d => d.Role).WithMany(p => p.AspNetRoleClaims).HasForeignKey(d => d.RoleId);
        });

        modelBuilder.Entity<AspNetUser>(entity =>
        {
            entity.HasIndex(e => e.NormalizedEmail, "EmailIndex");

            entity.HasIndex(e => e.NormalizedUserName, "UserNameIndex")
                .IsUnique()
                .HasFilter("([NormalizedUserName] IS NOT NULL)");

            entity.Property(e => e.Email).HasMaxLength(256);
            entity.Property(e => e.IdPerson).HasMaxLength(450);
            entity.Property(e => e.IdTenant).HasMaxLength(450);
            entity.Property(e => e.NormalizedEmail).HasMaxLength(256);
            entity.Property(e => e.NormalizedUserName).HasMaxLength(256);
            entity.Property(e => e.UserName).HasMaxLength(256);
            entity.Property(e => e.UserType).HasMaxLength(100);
            entity.Property(e => e.ValidationCode).HasMaxLength(450);

            entity.HasOne(d => d.IdPersonNavigation).WithMany(p => p.AspNetUsers)
                .HasForeignKey(d => d.IdPerson)
                .HasConstraintName("FK_AspNetUsers_IdPerson_Person_IdPerson");

            entity.HasOne(d => d.IdTenantNavigation).WithMany(p => p.AspNetUsers)
                .HasForeignKey(d => d.IdTenant)
                .HasConstraintName("FK_AspNetUsers_IdTenant_Tenant_IdTenant");

            entity.HasMany(d => d.Roles).WithMany(p => p.Users)
                .UsingEntity<Dictionary<string, object>>(
                    "AspNetUserRole",
                    r => r.HasOne<AspNetRole>().WithMany().HasForeignKey("RoleId"),
                    l => l.HasOne<AspNetUser>().WithMany().HasForeignKey("UserId"),
                    j =>
                    {
                        j.HasKey("UserId", "RoleId");
                        j.ToTable("AspNetUserRoles");
                        j.HasIndex(new[] { "RoleId" }, "IX_AspNetUserRoles_RoleId");
                    });
        });

        modelBuilder.Entity<AspNetUserClaim>(entity =>
        {
            entity.HasIndex(e => e.UserId, "IX_AspNetUserClaims_UserId");

            entity.HasOne(d => d.User).WithMany(p => p.AspNetUserClaims).HasForeignKey(d => d.UserId);
        });

        modelBuilder.Entity<AspNetUserLogin>(entity =>
        {
            entity.HasKey(e => new { e.LoginProvider, e.ProviderKey });

            entity.HasIndex(e => e.UserId, "IX_AspNetUserLogins_UserId");

            entity.HasOne(d => d.User).WithMany(p => p.AspNetUserLogins).HasForeignKey(d => d.UserId);
        });

        modelBuilder.Entity<AspNetUserToken>(entity =>
        {
            entity.HasKey(e => new { e.UserId, e.LoginProvider, e.Name });

            entity.HasOne(d => d.User).WithMany(p => p.AspNetUserTokens).HasForeignKey(d => d.UserId);
        });

        modelBuilder.Entity<Company>(entity =>
        {
            entity.HasKey(e => e.IdCompany);

            entity.ToTable("Company");

            entity.Property(e => e.BusinessRegistrationNumber).HasMaxLength(450);
            entity.Property(e => e.IdTenant).HasMaxLength(450);
            entity.Property(e => e.Name).HasMaxLength(450);

            entity.HasOne(d => d.IdTenantNavigation).WithMany(p => p.Companies)
                .HasForeignKey(d => d.IdTenant)
                .HasConstraintName("FK_Company_IdTenant_Tenant_IdTenant");
        });

        modelBuilder.Entity<Document>(entity =>
        {
            entity.HasKey(e => e.IdDocument);

            entity.ToTable("Document");

            entity.Property(e => e.FileExtension).HasMaxLength(450);
            entity.Property(e => e.FileName).HasMaxLength(450);
            entity.Property(e => e.IdDocumentType).HasMaxLength(450);
            entity.Property(e => e.IdParameterBasePhysicalFilePath).HasMaxLength(450);
            entity.Property(e => e.IdParameterBaseServerUrl).HasMaxLength(450);
            entity.Property(e => e.PhysicalFilePath).HasMaxLength(450);
            entity.Property(e => e.ServerFilePath).HasMaxLength(450);

            entity.HasOne(d => d.IdParameterBasePhysicalFilePathNavigation).WithMany(p => p.DocumentIdParameterBasePhysicalFilePathNavigations)
                .HasForeignKey(d => d.IdParameterBasePhysicalFilePath)
                .HasConstraintName("FK_Document_IdParameterBasePhysicalFilePath_Parameter_IdParameter");

            entity.HasOne(d => d.IdParameterBaseServerUrlNavigation).WithMany(p => p.DocumentIdParameterBaseServerUrlNavigations)
                .HasForeignKey(d => d.IdParameterBaseServerUrl)
                .HasConstraintName("FK_Document_IdParameterBaseServerUrl_Parameter_IdParameter");
        });

        modelBuilder.Entity<Integration>(entity =>
        {
            entity.HasKey(e => e.IdIntegration);

            entity.ToTable("Integration");

            entity.Property(e => e.DateAdded).HasColumnType("datetime");
            entity.Property(e => e.IdIntegrationState).HasMaxLength(450);
            entity.Property(e => e.IdIntegrationType).HasMaxLength(450);
            entity.Property(e => e.IdTenant).HasMaxLength(450);
            entity.Property(e => e.IdUser).HasMaxLength(450);
            entity.Property(e => e.TokenIdentifier).HasMaxLength(450);

            entity.HasOne(d => d.IdIntegrationStateNavigation).WithMany(p => p.Integrations)
                .HasForeignKey(d => d.IdIntegrationState)
                .HasConstraintName("FK_Integration_IdIntegrationState");

            entity.HasOne(d => d.IdIntegrationTypeNavigation).WithMany(p => p.Integrations)
                .HasForeignKey(d => d.IdIntegrationType)
                .HasConstraintName("FK_Integration_IdIntegrationType");

            entity.HasOne(d => d.IdTenantNavigation).WithMany(p => p.Integrations)
                .HasForeignKey(d => d.IdTenant)
                .HasConstraintName("FK_Integration_IdTenant");

            entity.HasOne(d => d.IdUserNavigation).WithMany(p => p.Integrations)
                .HasForeignKey(d => d.IdUser)
                .HasConstraintName("FK_Integration_IdUser");
        });

        modelBuilder.Entity<IntegrationDetail>(entity =>
        {
            entity.HasKey(e => e.IdIntegrationDetail);

            entity.ToTable("IntegrationDetail");

            entity.Property(e => e.DateAdded).HasColumnType("datetime");
            entity.Property(e => e.ExternalIdentifier).HasMaxLength(450);
            entity.Property(e => e.ExternalState).HasMaxLength(450);
            entity.Property(e => e.IdIntegration).HasMaxLength(450);
            entity.Property(e => e.Name).HasMaxLength(450);

            entity.HasOne(d => d.IdIntegrationNavigation).WithMany(p => p.IntegrationDetails)
                .HasForeignKey(d => d.IdIntegration)
                .HasConstraintName("FK_IntegrationDetail_nvarchar(450)");
        });

        modelBuilder.Entity<IntegrationDetailAction>(entity =>
        {
            entity.HasKey(e => e.IdIntegrationDetailAction);

            entity.ToTable("IntegrationDetailAction");

            entity.Property(e => e.IdIntegrationDetail).HasMaxLength(450);
            entity.Property(e => e.IdIntegrationDetailActionType).HasMaxLength(450);
            entity.Property(e => e.Name).HasMaxLength(450);

            entity.HasOne(d => d.IdIntegrationDetailNavigation).WithMany(p => p.IntegrationDetailActions)
                .HasForeignKey(d => d.IdIntegrationDetail)
                .HasConstraintName("FK_IntegrationDetailAction_IdIntegrationDetail");

            entity.HasOne(d => d.IdIntegrationDetailActionTypeNavigation).WithMany(p => p.IntegrationDetailActions)
                .HasForeignKey(d => d.IdIntegrationDetailActionType)
                .HasConstraintName("FK_IntegrationDetailAction_IdIntegrationDetailActionType");
        });

        modelBuilder.Entity<IntegrationDetailActionType>(entity =>
        {
            entity.HasKey(e => e.IdIntegrationDetailActionType);

            entity.ToTable("IntegrationDetailActionType");

            entity.Property(e => e.Name).HasMaxLength(450);
        });

        modelBuilder.Entity<IntegrationState>(entity =>
        {
            entity.HasKey(e => e.IdIntegrationState);

            entity.ToTable("IntegrationState");

            entity.Property(e => e.Name).HasMaxLength(450);
        });

        modelBuilder.Entity<IntegrationType>(entity =>
        {
            entity.HasKey(e => e.IdIntegrationType);

            entity.ToTable("IntegrationType");

            entity.Property(e => e.Description).HasMaxLength(450);
            entity.Property(e => e.IdDocument).HasMaxLength(450);
            entity.Property(e => e.IdInitialIntegrationState).HasMaxLength(450);
            entity.Property(e => e.Name).HasMaxLength(450);

            entity.HasOne(d => d.IdDocumentNavigation).WithMany(p => p.IntegrationTypes)
                .HasForeignKey(d => d.IdDocument)
                .HasConstraintName("FK_IntegrationType_IdDocument");

            entity.HasOne(d => d.IdInitialIntegrationStateNavigation).WithMany(p => p.IntegrationTypes)
                .HasForeignKey(d => d.IdInitialIntegrationState)
                .HasConstraintName("FK_IntegrationType_IdInitialIntegrationState");
        });

        modelBuilder.Entity<MailRecipient>(entity =>
        {
            entity.HasKey(e => e.IdMailRecipient);

            entity.ToTable("MailRecipient", "MAIL");

            entity.HasOne(d => d.IdMailRecipientTypeNavigation).WithMany(p => p.MailRecipients)
                .HasForeignKey(d => d.IdMailRecipientType)
                .HasConstraintName("FK_MailRecipient_IdMailRecipientType_MailRecipient_IdMailRecipientType");

            entity.HasOne(d => d.IdMailStatusNavigation).WithMany(p => p.MailRecipients)
                .HasForeignKey(d => d.IdMailStatus)
                .HasConstraintName("FK_MailRecipient_IdMailStatus_MailStatus_IdMailStatus");

            entity.HasOne(d => d.IdMailToSendNavigation).WithMany(p => p.MailRecipients)
                .HasForeignKey(d => d.IdMailToSend)
                .HasConstraintName("FK_MailRecipient_IdMailToSend_MailToSend_IdMailToSend");
        });

        modelBuilder.Entity<MailRecipientType>(entity =>
        {
            entity.HasKey(e => e.IdMailRecipientType).HasName("PK_EmailReceipientType");

            entity.ToTable("MailRecipientType", "MAIL");
        });

        modelBuilder.Entity<MailServerSetting>(entity =>
        {
            entity.HasKey(e => e.IdMailServerSetting);

            entity.ToTable("MailServerSetting", "MAIL");

            entity.Property(e => e.DefaultName).HasMaxLength(250);
            entity.Property(e => e.Host).HasMaxLength(250);
            entity.Property(e => e.Password).HasMaxLength(250);
            entity.Property(e => e.UseSsl).HasColumnName("UseSSL");
            entity.Property(e => e.Username).HasMaxLength(250);
        });

        modelBuilder.Entity<MailState>(entity =>
        {
            entity.HasKey(e => e.IdMailState).HasName("PK_EmailStatus");

            entity.ToTable("MailState", "MAIL");
        });

        modelBuilder.Entity<MailToSend>(entity =>
        {
            entity.HasKey(e => e.IdMailToSend).HasName("PK_EmailToSend");

            entity.ToTable("MailToSend", "MAIL");

            entity.HasOne(d => d.IdEmailStateNavigation).WithMany(p => p.MailToSends)
                .HasForeignKey(d => d.IdEmailState)
                .HasConstraintName("FK_MailToSend_IdEmailStatus_EmailStatus_IdEmailStatus");

            entity.HasOne(d => d.IdMailServerSettingNavigation).WithMany(p => p.MailToSends)
                .HasForeignKey(d => d.IdMailServerSetting)
                .HasConstraintName("FK_MailToSend_IdMailServerSetting_MailServerSetting_IdMailServerSetting");
        });

        modelBuilder.Entity<MailToSendDocument>(entity =>
        {
            entity.HasKey(e => e.IdMailToSendDocument);

            entity.ToTable("MailToSendDocument", "MAIL");

            entity.HasOne(d => d.IdMailToSendNavigation).WithMany(p => p.MailToSendDocuments)
                .HasForeignKey(d => d.IdMailToSend)
                .HasConstraintName("FK_MailToSendDocument_IdMailToSend_MailToSend_IdMailToSend");
        });

        modelBuilder.Entity<Parameter>(entity =>
        {
            entity.HasKey(e => e.IdParameter);

            entity.ToTable("Parameter");

            entity.Property(e => e.Code).HasMaxLength(450);
            entity.Property(e => e.IdTenant).HasMaxLength(450);

            entity.HasOne(d => d.IdTenantNavigation).WithMany(p => p.Parameters)
                .HasForeignKey(d => d.IdTenant)
                .HasConstraintName("FK_Parameter_IdTenant_Tenant_IdTenant");
        });

        modelBuilder.Entity<Permission>(entity =>
        {
            entity.HasKey(e => e.IdPermission);

            entity.ToTable("Permission");

            entity.Property(e => e.Code).HasMaxLength(450);
            entity.Property(e => e.Name).HasMaxLength(200);
            entity.Property(e => e.Url).HasMaxLength(1000);
        });

        modelBuilder.Entity<Person>(entity =>
        {
            entity.HasKey(e => e.IdPerson);

            entity.ToTable("Person");

            entity.Property(e => e.Firstname).HasMaxLength(200);
            entity.Property(e => e.IdTenant).HasMaxLength(450);
            entity.Property(e => e.Lastname).HasMaxLength(200);
            entity.Property(e => e.OtherName).HasMaxLength(450);
            entity.Property(e => e.Title).HasMaxLength(10);
            entity.Property(e => e.WorkingOrganisation).HasMaxLength(200);

            entity.HasOne(d => d.IdTenantNavigation).WithMany(p => p.People)
                .HasForeignKey(d => d.IdTenant)
                .HasConstraintName("FK_Person_IdTenant_Tenant_IdTenant");
        });

        modelBuilder.Entity<ProfileTemplate>(entity =>
        {
            entity.HasKey(e => e.IdProfileTemplate);

            entity.ToTable("ProfileTemplate");

            entity.Property(e => e.Name).HasMaxLength(450);
        });

        modelBuilder.Entity<RolePermission>(entity =>
        {
            entity.HasKey(e => e.IdRolePermission);

            entity.ToTable("Role_Permission");

            entity.Property(e => e.IdRolePermission).HasColumnName("IdRole_Permission");
            entity.Property(e => e.IdPermission).HasMaxLength(450);
            entity.Property(e => e.IdRole).HasMaxLength(450);

            entity.HasOne(d => d.IdPermissionNavigation).WithMany(p => p.RolePermissions)
                .HasForeignKey(d => d.IdPermission)
                .HasConstraintName("FK_Role_Permission_IdPermission_Permission_IdPermission");

            entity.HasOne(d => d.IdRoleNavigation).WithMany(p => p.RolePermissions)
                .HasForeignKey(d => d.IdRole)
                .HasConstraintName("FK_Role_Permission_IdRole_Role_IdRole");
        });

        modelBuilder.Entity<Shop>(entity =>
        {
            entity.HasKey(e => e.IdShop);

            entity.ToTable("Shop");

            entity.Property(e => e.IdTenant).HasMaxLength(450);

            entity.HasOne(d => d.IdTenantNavigation).WithMany(p => p.Shops)
                .HasForeignKey(d => d.IdTenant)
                .HasConstraintName("FK_Shop_IdTenant");
        });

        modelBuilder.Entity<ShopProductCategory>(entity =>
        {
            entity.HasKey(e => e.IdShopProductCategory);

            entity.ToTable("ShopProductCategory");

            entity.Property(e => e.Description).HasMaxLength(450);
            entity.Property(e => e.IdCoverPicture).HasMaxLength(450);
            entity.Property(e => e.IdParentShopProductCategory).HasMaxLength(450);
            entity.Property(e => e.IdStructure).HasMaxLength(450);
            entity.Property(e => e.Name).HasMaxLength(450);

            entity.HasOne(d => d.IdCoverPictureNavigation).WithMany(p => p.ShopProductCategories)
                .HasForeignKey(d => d.IdCoverPicture)
                .HasConstraintName("FK_ShopProductCategory_IdCoverPicture");

            entity.HasOne(d => d.IdParentShopProductCategoryNavigation).WithMany(p => p.InverseIdParentShopProductCategoryNavigation)
                .HasForeignKey(d => d.IdParentShopProductCategory)
                .HasConstraintName("FK_ShopProductCategory_IdParentShopProductCategory");

            entity.HasOne(d => d.IdStructureNavigation).WithMany(p => p.ShopProductCategories)
                .HasForeignKey(d => d.IdStructure)
                .HasConstraintName("FK_ShopProductCategory_IdStructure");
        });

        modelBuilder.Entity<SocialNetwork>(entity =>
        {
            entity.HasKey(e => e.IdSocialNetwork);

            entity.ToTable("SocialNetwork");

            entity.Property(e => e.AbsoluteUrl).HasMaxLength(450);
        });

        modelBuilder.Entity<Structure>(entity =>
        {
            entity.HasKey(e => e.IdStructure);

            entity.ToTable("Structure");

            entity.Property(e => e.CardName).HasMaxLength(450);
            entity.Property(e => e.DateCreated).HasColumnType("datetime");
            entity.Property(e => e.Email).HasMaxLength(450);
            entity.Property(e => e.IdColourVariant).HasMaxLength(450);
            entity.Property(e => e.IdCompany).HasMaxLength(450);
            entity.Property(e => e.IdCoverPicture).HasMaxLength(450);
            entity.Property(e => e.IdPerson).HasMaxLength(450);
            entity.Property(e => e.IdProfilePicture).HasMaxLength(450);
            entity.Property(e => e.IdProfileTemplate).HasMaxLength(450);
            entity.Property(e => e.IdShop).HasMaxLength(450);
            entity.Property(e => e.IdStructureType).HasMaxLength(450);
            entity.Property(e => e.IdTenant).HasMaxLength(450);
            entity.Property(e => e.MainPhoneNumber).HasMaxLength(450);
            entity.Property(e => e.PortfolioPassword).HasMaxLength(200);
            entity.Property(e => e.Slug).HasMaxLength(450);
            entity.Property(e => e.SystemSlug).HasMaxLength(450);

            entity.HasOne(d => d.IdCompanyNavigation).WithMany(p => p.Structures)
                .HasForeignKey(d => d.IdCompany)
                .HasConstraintName("FK_Structure_IdCompany_Company_IdCompany");

            entity.HasOne(d => d.IdCoverPictureNavigation).WithMany(p => p.StructureIdCoverPictureNavigations)
                .HasForeignKey(d => d.IdCoverPicture)
                .HasConstraintName("FK_Structure_IdCoverPicture");

            entity.HasOne(d => d.IdPersonNavigation).WithMany(p => p.Structures)
                .HasForeignKey(d => d.IdPerson)
                .HasConstraintName("FK_Structure_IdPerson_Person_IdPerson");

            entity.HasOne(d => d.IdProfilePictureNavigation).WithMany(p => p.StructureIdProfilePictureNavigations)
                .HasForeignKey(d => d.IdProfilePicture)
                .HasConstraintName("FK_Structure_IdProfilePicture");

            entity.HasOne(d => d.IdProfileTemplateNavigation).WithMany(p => p.Structures)
                .HasForeignKey(d => d.IdProfileTemplate)
                .HasConstraintName("FK_Structure_IdProfileTemplate");

            entity.HasOne(d => d.IdShopNavigation).WithMany(p => p.Structures)
                .HasForeignKey(d => d.IdShop)
                .HasConstraintName("FK_Structure_IdShop");

            entity.HasOne(d => d.IdStructureTypeNavigation).WithMany(p => p.Structures)
                .HasForeignKey(d => d.IdStructureType)
                .HasConstraintName("FK_Structure_IdStructureType_StructureType_IdStructureType");

            entity.HasOne(d => d.IdTenantNavigation).WithMany(p => p.Structures)
                .HasForeignKey(d => d.IdTenant)
                .HasConstraintName("FK_Structure_IdTenant_Tenant_IdTenant");
        });

        modelBuilder.Entity<StructureAccordion>(entity =>
        {
            entity.HasKey(e => e.IdStructureAccordion).HasName("PK__Structur__EA62D3D102436109");

            entity.ToTable("StructureAccordion");

            entity.Property(e => e.IdStructure).HasMaxLength(450);
            entity.Property(e => e.Name).HasMaxLength(255);

            entity.HasOne(d => d.IdStructureNavigation).WithMany(p => p.StructureAccordions)
                .HasForeignKey(d => d.IdStructure)
                .HasConstraintName("FK_StructureAccordion_IdStructure");
        });

        modelBuilder.Entity<StructureAddress>(entity =>
        {
            entity.HasKey(e => e.IdStructureAddress);

            entity.ToTable("Structure_Address");

            entity.Property(e => e.IdStructureAddress).HasColumnName("IdStructure_Address");
            entity.Property(e => e.IdAddress).HasMaxLength(450);
            entity.Property(e => e.IdStructure).HasMaxLength(450);
            entity.Property(e => e.Name).HasMaxLength(450);

            entity.HasOne(d => d.IdAddressNavigation).WithMany(p => p.StructureAddresses)
                .HasForeignKey(d => d.IdAddress)
                .HasConstraintName("FK_Structure_Address_IdAddress_Address_IdAddress");

            entity.HasOne(d => d.IdStructureNavigation).WithMany(p => p.StructureAddresses)
                .HasForeignKey(d => d.IdStructure)
                .HasConstraintName("FK_Structure_Address_IdStructure_Structure_IdStructure");
        });

        modelBuilder.Entity<StructureAttrribute>(entity =>
        {
            entity.HasKey(e => e.IdStructureAttrribute);

            entity.ToTable("StructureAttrribute");

            entity.Property(e => e.IdStructure).HasMaxLength(450);
            entity.Property(e => e.Name).HasMaxLength(450);

            entity.HasOne(d => d.IdStructureNavigation).WithMany(p => p.StructureAttrributes)
                .HasForeignKey(d => d.IdStructure)
                .HasConstraintName("FK_StructureAttrribute_Structure");
        });

        modelBuilder.Entity<StructureAttrributeDetail>(entity =>
        {
            entity.HasKey(e => e.IdStructureAttrributeDetail);

            entity.ToTable("StructureAttrributeDetail");

            entity.Property(e => e.IdStructureAttrribute).HasMaxLength(450);
            entity.Property(e => e.Name).HasMaxLength(450);

            entity.HasOne(d => d.IdStructureAttrributeNavigation).WithMany(p => p.StructureAttrributeDetails)
                .HasForeignKey(d => d.IdStructureAttrribute)
                .HasConstraintName("FK_StructureAttrributeDetail_Attrribute");
        });

        modelBuilder.Entity<StructureCategory>(entity =>
        {
            entity.HasKey(e => e.IdStructureCategory).HasName("PK__Structur__31D560DBE4DFB26C");

            entity.ToTable("StructureCategory");

            entity.Property(e => e.Color).HasMaxLength(50);
            entity.Property(e => e.IdDocument).HasMaxLength(450);
            entity.Property(e => e.IdParentStructureCategory).HasMaxLength(450);
            entity.Property(e => e.Name).HasMaxLength(255);
            entity.Property(e => e.Slug).HasMaxLength(255);

            entity.HasOne(d => d.IdDocumentNavigation).WithMany(p => p.StructureCategories)
                .HasForeignKey(d => d.IdDocument)
                .HasConstraintName("FK_StructureCategory_Document");

            entity.HasOne(d => d.IdParentStructureCategoryNavigation).WithMany(p => p.InverseIdParentStructureCategoryNavigation)
                .HasForeignKey(d => d.IdParentStructureCategory)
                .HasConstraintName("FK_StructureCategory_Parent");
        });

        modelBuilder.Entity<StructureContact>(entity =>
        {
            entity.HasKey(e => e.IdStructureContact);

            entity.ToTable("StructureContact");

            entity.Property(e => e.IdStructure).HasMaxLength(450);
            entity.Property(e => e.Name).HasMaxLength(450);
            entity.Property(e => e.Value).HasMaxLength(450);

            entity.HasOne(d => d.IdStructureNavigation).WithMany(p => p.StructureContacts)
                .HasForeignKey(d => d.IdStructure)
                .HasConstraintName("FK_StructureContact_IdStructure_Structure_IdStructure");
        });

        modelBuilder.Entity<StructureEducation>(entity =>
        {
            entity.HasKey(e => e.IdStructureEducation);

            entity.ToTable("StructureEducation");

            entity.Property(e => e.Degree).HasMaxLength(450);
            entity.Property(e => e.EndDate).HasColumnType("date");
            entity.Property(e => e.FieldOfStudy).HasMaxLength(450);
            entity.Property(e => e.Grade).HasMaxLength(100);
            entity.Property(e => e.IdStructure).HasMaxLength(450);
            entity.Property(e => e.School).HasMaxLength(450);
            entity.Property(e => e.StartDate).HasColumnType("date");

            entity.HasOne(d => d.IdStructureNavigation).WithMany(p => p.StructureEducations)
                .HasForeignKey(d => d.IdStructure)
                .HasConstraintName("FK_StructureEducation_Structure");
        });

        modelBuilder.Entity<StructureEducationMedium>(entity =>
        {
            entity.HasKey(e => e.IdStructureEducationMedia);

            entity.Property(e => e.IdDocument).HasMaxLength(450);
            entity.Property(e => e.IdStructureEducation).HasMaxLength(450);

            entity.HasOne(d => d.IdDocumentNavigation).WithMany(p => p.StructureEducationMedia)
                .HasForeignKey(d => d.IdDocument)
                .HasConstraintName("FK_StructureEducationMedia_Document");

            entity.HasOne(d => d.IdStructureEducationNavigation).WithMany(p => p.StructureEducationMedia)
                .HasForeignKey(d => d.IdStructureEducation)
                .HasConstraintName("FK_StructureEducationMedia_Education");
        });

        modelBuilder.Entity<StructureEducationSkill>(entity =>
        {
            entity.HasKey(e => e.IdStructureEducationSkill);

            entity.ToTable("StructureEducationSkill");

            entity.Property(e => e.IdStructureEducation).HasMaxLength(450);
            entity.Property(e => e.Name).HasMaxLength(255);

            entity.HasOne(d => d.IdStructureEducationNavigation).WithMany(p => p.StructureEducationSkills)
                .HasForeignKey(d => d.IdStructureEducation)
                .HasConstraintName("FK_StructureEducationSkill_Education");
        });

        modelBuilder.Entity<StructureExperience>(entity =>
        {
            entity.HasKey(e => e.IdStructureExperience);

            entity.ToTable("StructureExperience");

            entity.Property(e => e.Company).HasMaxLength(255);
            entity.Property(e => e.EmploymentType).HasMaxLength(100);
            entity.Property(e => e.EndDate).HasColumnType("date");
            entity.Property(e => e.Headline).HasMaxLength(500);
            entity.Property(e => e.IdStructure).HasMaxLength(450);
            entity.Property(e => e.Location).HasMaxLength(255);
            entity.Property(e => e.StartDate).HasColumnType("date");
            entity.Property(e => e.Title).HasMaxLength(255);

            entity.HasOne(d => d.IdStructureNavigation).WithMany(p => p.StructureExperiences)
                .HasForeignKey(d => d.IdStructure)
                .HasConstraintName("FK_StructureExperience_Structure");
        });

        modelBuilder.Entity<StructureExperienceMedium>(entity =>
        {
            entity.HasKey(e => e.IdStructureExperienceMedia);

            entity.Property(e => e.IdDocument).HasMaxLength(450);
            entity.Property(e => e.IdStructureExperience).HasMaxLength(450);

            entity.HasOne(d => d.IdDocumentNavigation).WithMany(p => p.StructureExperienceMedia)
                .HasForeignKey(d => d.IdDocument)
                .HasConstraintName("FK_StructureExperienceMedia_Document");

            entity.HasOne(d => d.IdStructureExperienceNavigation).WithMany(p => p.StructureExperienceMedia)
                .HasForeignKey(d => d.IdStructureExperience)
                .HasConstraintName("FK_StructureExperienceMedia_Experience");
        });

        modelBuilder.Entity<StructureExperienceSkill>(entity =>
        {
            entity.HasKey(e => e.IdStructureExperienceSkill);

            entity.ToTable("StructureExperienceSkill");

            entity.Property(e => e.IdStructureExperience).HasMaxLength(450);
            entity.Property(e => e.Name).HasMaxLength(255);

            entity.HasOne(d => d.IdStructureExperienceNavigation).WithMany(p => p.StructureExperienceSkills)
                .HasForeignKey(d => d.IdStructureExperience)
                .HasConstraintName("FK_StructureExperienceSkill_Experience");
        });

        modelBuilder.Entity<StructureFeature>(entity =>
        {
            entity.HasKey(e => e.IdStructureFeature).HasName("PK__Structur__65CAAD666B86D708");

            entity.ToTable("StructureFeature");

            entity.Property(e => e.IdStructure).HasMaxLength(450);
            entity.Property(e => e.Name).HasMaxLength(255);

            entity.HasOne(d => d.IdStructureNavigation).WithMany(p => p.StructureFeatures)
                .HasForeignKey(d => d.IdStructure)
                .HasConstraintName("FK_StructureFeature_Structure");
        });

        modelBuilder.Entity<StructureField>(entity =>
        {
            entity.HasKey(e => e.IdStructureField);

            entity.ToTable("StructureField");

            entity.Property(e => e.Icon).HasMaxLength(450);
            entity.Property(e => e.Name).HasMaxLength(450);
            entity.Property(e => e.Placeholder).HasMaxLength(450);
            entity.Property(e => e.Prefix).HasMaxLength(450);
            entity.Property(e => e.StructureFieldCategory).HasMaxLength(450);
            entity.Property(e => e.StructureFieldType).HasMaxLength(450);
        });

        modelBuilder.Entity<StructureGallery>(entity =>
        {
            entity.HasKey(e => e.IdStructureGallery).HasName("PK__Structur__82D28C0B22D09C53");

            entity.ToTable("StructureGallery");

            entity.Property(e => e.IdDocument).HasMaxLength(450);
            entity.Property(e => e.IdStructure).HasMaxLength(450);
            entity.Property(e => e.Name).HasMaxLength(255);

            entity.HasOne(d => d.IdDocumentNavigation).WithMany(p => p.StructureGalleries)
                .HasForeignKey(d => d.IdDocument)
                .HasConstraintName("FK_StructureGallery_Document");

            entity.HasOne(d => d.IdStructureNavigation).WithMany(p => p.StructureGalleries)
                .HasForeignKey(d => d.IdStructure)
                .HasConstraintName("FK_StructureGallery_Structure");
        });

        modelBuilder.Entity<StructureMember>(entity =>
        {
            entity.HasKey(e => e.IdStructureMember).HasName("PK__Structur__D812E67AE807EAB7");

            entity.ToTable("StructureMember");

            entity.Property(e => e.IdDocument).HasMaxLength(450);
            entity.Property(e => e.IdPerson).HasMaxLength(450);
            entity.Property(e => e.IdStructure).HasMaxLength(450);
            entity.Property(e => e.Title).HasMaxLength(255);

            entity.HasOne(d => d.IdDocumentNavigation).WithMany(p => p.StructureMembers)
                .HasForeignKey(d => d.IdDocument)
                .HasConstraintName("FK_StructureMember_IdDocument");

            entity.HasOne(d => d.IdPersonNavigation).WithMany(p => p.StructureMembers)
                .HasForeignKey(d => d.IdPerson)
                .HasConstraintName("FK_StructureMember_Person");

            entity.HasOne(d => d.IdStructureNavigation).WithMany(p => p.StructureMembers)
                .HasForeignKey(d => d.IdStructure)
                .HasConstraintName("FK_StructureMember_Structure");
        });

        modelBuilder.Entity<StructureMessage>(entity =>
        {
            entity.HasKey(e => e.IdStructureMessage).HasName("PK__Structur__BA1EC07595A68E4A");

            entity.ToTable("StructureMessage");

            entity.Property(e => e.DateAdded)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Email).HasMaxLength(255);
            entity.Property(e => e.IdPerson).HasMaxLength(450);
            entity.Property(e => e.IdStructure).HasMaxLength(450);
            entity.Property(e => e.IpAddress).HasMaxLength(50);
            entity.Property(e => e.Phone).HasMaxLength(50);

            entity.HasOne(d => d.IdPersonNavigation).WithMany(p => p.StructureMessages)
                .HasForeignKey(d => d.IdPerson)
                .HasConstraintName("FK_StructureMessage_Person");

            entity.HasOne(d => d.IdStructureNavigation).WithMany(p => p.StructureMessages)
                .HasForeignKey(d => d.IdStructure)
                .HasConstraintName("FK_StructureMessage_Structure");
        });

        modelBuilder.Entity<StructureOption>(entity =>
        {
            entity.HasKey(e => e.IdStructureOption);

            entity.ToTable("StructureOption");

            entity.Property(e => e.IdStructure).HasMaxLength(450);
            entity.Property(e => e.Name).HasMaxLength(450);

            entity.HasOne(d => d.IdStructureNavigation).WithMany(p => p.StructureOptions)
                .HasForeignKey(d => d.IdStructure)
                .HasConstraintName("FK_StructureOption_Structure");
        });

        modelBuilder.Entity<StructureOptionDetail>(entity =>
        {
            entity.HasKey(e => e.IdStructureOptionDetail);

            entity.ToTable("StructureOptionDetail");

            entity.Property(e => e.IdStructureOption).HasMaxLength(450);
            entity.Property(e => e.Name).HasMaxLength(450);
            entity.Property(e => e.Price).HasColumnType("decimal(18, 2)");

            entity.HasOne(d => d.IdStructureOptionNavigation).WithMany(p => p.StructureOptionDetails)
                .HasForeignKey(d => d.IdStructureOption)
                .HasConstraintName("FK_StructureOptionDetail_Option");
        });

        modelBuilder.Entity<StructurePortfolio>(entity =>
        {
            entity.HasKey(e => e.IdStructurePortfolio);

            entity.ToTable("StructurePortfolio");

            entity.Property(e => e.IdMainDocument).HasMaxLength(450);
            entity.Property(e => e.IdStructure).HasMaxLength(450);
            entity.Property(e => e.Name).HasMaxLength(450);
            entity.Property(e => e.Slug).HasMaxLength(450);

            entity.HasOne(d => d.IdMainDocumentNavigation).WithMany(p => p.StructurePortfolios)
                .HasForeignKey(d => d.IdMainDocument)
                .HasConstraintName("FK_StructurePortfolio_Document");

            entity.HasOne(d => d.IdStructureNavigation).WithMany(p => p.StructurePortfolios)
                .HasForeignKey(d => d.IdStructure)
                .HasConstraintName("FK_StructurePortfolio_Structure");
        });

        modelBuilder.Entity<StructurePortfolioDocument>(entity =>
        {
            entity.HasKey(e => e.IdStructurePortfolioDocument).HasName("PK__Structur__3E253AC160646693");

            entity.ToTable("StructurePortfolio_Document");

            entity.Property(e => e.IdStructurePortfolioDocument).HasColumnName("IdStructurePortfolio_Document");
            entity.Property(e => e.IdDocument).HasMaxLength(450);
            entity.Property(e => e.IdStructurePortfolio).HasMaxLength(450);
            entity.Property(e => e.Name).HasMaxLength(450);

            entity.HasOne(d => d.IdDocumentNavigation).WithMany(p => p.StructurePortfolioDocuments)
                .HasForeignKey(d => d.IdDocument)
                .HasConstraintName("FK_StructurePortfolioDocument_Document");

            entity.HasOne(d => d.IdStructurePortfolioNavigation).WithMany(p => p.StructurePortfolioDocuments)
                .HasForeignKey(d => d.IdStructurePortfolio)
                .HasConstraintName("FK_StructurePortfolioDocument_StructurePortfolio");
        });

        modelBuilder.Entity<StructureProduct>(entity =>
        {
            entity.HasKey(e => e.IdStructureProduct);

            entity.ToTable("StructureProduct");

            entity.Property(e => e.IdStructure).HasMaxLength(450);
            entity.Property(e => e.IdStructureAttrribute).HasMaxLength(450);
            entity.Property(e => e.Name).HasMaxLength(450);
            entity.Property(e => e.ShortDescription).HasMaxLength(450);
            entity.Property(e => e.Sku)
                .HasMaxLength(450)
                .HasColumnName("SKU");

            entity.HasOne(d => d.IdStructureNavigation).WithMany(p => p.StructureProducts)
                .HasForeignKey(d => d.IdStructure)
                .HasConstraintName("FK_StructureProduct_Structure");

            entity.HasOne(d => d.IdStructureAttrributeNavigation).WithMany(p => p.StructureProducts)
                .HasForeignKey(d => d.IdStructureAttrribute)
                .HasConstraintName("FK_StructureProduct_Attrribute");
        });

        modelBuilder.Entity<StructureProductDocument>(entity =>
        {
            entity.HasKey(e => e.IdStructureProductDocument);

            entity.ToTable("StructureProduct_Document");

            entity.Property(e => e.IdStructureProductDocument).HasColumnName("IdStructureProduct_Document");
            entity.Property(e => e.IdDocument).HasMaxLength(450);
            entity.Property(e => e.IdStructureProduct).HasMaxLength(450);

            entity.HasOne(d => d.IdDocumentNavigation).WithMany(p => p.StructureProductDocuments)
                .HasForeignKey(d => d.IdDocument)
                .HasConstraintName("FK_StructureProductDocument_Document");

            entity.HasOne(d => d.IdStructureProductNavigation).WithMany(p => p.StructureProductDocuments)
                .HasForeignKey(d => d.IdStructureProduct)
                .HasConstraintName("FK_StructureProductDocument_Product");
        });

        modelBuilder.Entity<StructureProductShopProductCategory>(entity =>
        {
            entity.HasKey(e => e.IdStructureProductShopProductCategory);

            entity.ToTable("StructureProduct_ShopProductCategory");

            entity.Property(e => e.IdStructureProductShopProductCategory).HasColumnName("IdStructureProduct_ShopProductCategory");
            entity.Property(e => e.IdShopProductCategory).HasMaxLength(450);
            entity.Property(e => e.IdStructureProduct).HasMaxLength(450);

            entity.HasOne(d => d.IdShopProductCategoryNavigation).WithMany(p => p.StructureProductShopProductCategories)
                .HasForeignKey(d => d.IdShopProductCategory)
                .HasConstraintName("FK_StructureProductCategory_Category");

            entity.HasOne(d => d.IdStructureProductNavigation).WithMany(p => p.StructureProductShopProductCategories)
                .HasForeignKey(d => d.IdStructureProduct)
                .HasConstraintName("FK_StructureProductCategory_Product");
        });

        modelBuilder.Entity<StructureProductStructureOptionDetail>(entity =>
        {
            entity.HasKey(e => e.IdStructureProductStructureOptionDetail);

            entity.ToTable("StructureProduct_StructureOptionDetail");

            entity.Property(e => e.IdStructureProductStructureOptionDetail).HasColumnName("IdStructureProduct_StructureOptionDetail");
            entity.Property(e => e.IdStructureOptionDetail).HasMaxLength(450);
            entity.Property(e => e.IdStructureProduct).HasMaxLength(450);
            entity.Property(e => e.Price).HasColumnType("decimal(18, 2)");

            entity.HasOne(d => d.IdStructureOptionDetailNavigation).WithMany(p => p.StructureProductStructureOptionDetails)
                .HasForeignKey(d => d.IdStructureOptionDetail)
                .HasConstraintName("FK_StructureProductOptionDetail_OptionDetail");

            entity.HasOne(d => d.IdStructureProductNavigation).WithMany(p => p.StructureProductStructureOptionDetails)
                .HasForeignKey(d => d.IdStructureProduct)
                .HasConstraintName("FK_StructureProductOptionDetail_Product");
        });

        modelBuilder.Entity<StructureProductStructureProductAttrributeDetail>(entity =>
        {
            entity.HasKey(e => e.IdStructureProductStructureProductAttrributeDetail);

            entity.ToTable("StructureProduct_StructureProductAttrributeDetail");

            entity.Property(e => e.IdStructureProductStructureProductAttrributeDetail).HasColumnName("IdStructureProduct_StructureProductAttrributeDetail");
            entity.Property(e => e.AttributeValue).HasMaxLength(450);
            entity.Property(e => e.IdStructureAttrributeDetail).HasMaxLength(450);
            entity.Property(e => e.IdStructureProduct).HasMaxLength(450);

            entity.HasOne(d => d.IdStructureAttrributeDetailNavigation).WithMany(p => p.StructureProductStructureProductAttrributeDetails)
                .HasForeignKey(d => d.IdStructureAttrributeDetail)
                .HasConstraintName("FK_StructureProductAttrDetail_AttrDetail");

            entity.HasOne(d => d.IdStructureProductNavigation).WithMany(p => p.StructureProductStructureProductAttrributeDetails)
                .HasForeignKey(d => d.IdStructureProduct)
                .HasConstraintName("FK_StructureProductAttrDetail_Product");
        });

        modelBuilder.Entity<StructureSocialNetwork>(entity =>
        {
            entity.HasKey(e => e.IdStructureSocialNetwork);

            entity.ToTable("Structure_SocialNetwork");

            entity.Property(e => e.IdStructureSocialNetwork).HasColumnName("IdStructure_SocialNetwork");
            entity.Property(e => e.IdSocialNetwork).HasMaxLength(450);
            entity.Property(e => e.IdStructure).HasMaxLength(450);
            entity.Property(e => e.Value).HasMaxLength(450);

            entity.HasOne(d => d.IdSocialNetworkNavigation).WithMany(p => p.StructureSocialNetworks)
                .HasForeignKey(d => d.IdSocialNetwork)
                .HasConstraintName("FK_Structure_SocialNetwork_IdSocialNetwork_SocialNetwork_IdSocialNetwork");

            entity.HasOne(d => d.IdStructureNavigation).WithMany(p => p.StructureSocialNetworks)
                .HasForeignKey(d => d.IdStructure)
                .HasConstraintName("FK_Structure_SocialNetwork_IdStructure_Structure_IdStructure");
        });

        modelBuilder.Entity<StructureStructureCategory>(entity =>
        {
            entity.HasKey(e => e.IdStructureStructureCategory).HasName("PK__Structur__75207FF1A1A97941");

            entity.ToTable("Structure_StructureCategory");

            entity.Property(e => e.IdStructureStructureCategory).HasColumnName("IdStructure_StructureCategory");
            entity.Property(e => e.IdStructure).HasMaxLength(450);
            entity.Property(e => e.IdStructureCategory).HasMaxLength(450);

            entity.HasOne(d => d.IdStructureNavigation).WithMany(p => p.StructureStructureCategories)
                .HasForeignKey(d => d.IdStructure)
                .HasConstraintName("FK_SSC_Structure");

            entity.HasOne(d => d.IdStructureCategoryNavigation).WithMany(p => p.StructureStructureCategories)
                .HasForeignKey(d => d.IdStructureCategory)
                .HasConstraintName("FK_SSC_Category");
        });

        modelBuilder.Entity<StructureStructureField>(entity =>
        {
            entity.HasKey(e => e.IdStructureStructureField);

            entity.ToTable("Structure_StructureField");

            entity.Property(e => e.IdStructureStructureField).HasColumnName("IdStructure_StructureField");
            entity.Property(e => e.IdDocument).HasMaxLength(450);
            entity.Property(e => e.IdStructure).HasMaxLength(450);
            entity.Property(e => e.IdStructureField).HasMaxLength(450);
            entity.Property(e => e.Value).HasMaxLength(450);

            entity.HasOne(d => d.IdDocumentNavigation).WithMany(p => p.StructureStructureFields)
                .HasForeignKey(d => d.IdDocument)
                .HasConstraintName("FK_Structure_StructureField_IdDocument");

            entity.HasOne(d => d.IdStructureNavigation).WithMany(p => p.StructureStructureFields)
                .HasForeignKey(d => d.IdStructure)
                .HasConstraintName("FK_Structure_StructureField_IdStructure");

            entity.HasOne(d => d.IdStructureFieldNavigation).WithMany(p => p.StructureStructureFields)
                .HasForeignKey(d => d.IdStructureField)
                .HasConstraintName("FK_Structure_StructureField_IdStructureField");
        });

        modelBuilder.Entity<StructureStructureTag>(entity =>
        {
            entity.HasKey(e => e.IdStructureStructureTag).HasName("PK__Structur__0C527BAC31644105");

            entity.ToTable("Structure_StructureTag");

            entity.Property(e => e.IdStructureStructureTag).HasColumnName("IdStructure_StructureTag");
            entity.Property(e => e.Color).HasMaxLength(450);
            entity.Property(e => e.IdStructure).HasMaxLength(450);
            entity.Property(e => e.IdStructureTag).HasMaxLength(450);

            entity.HasOne(d => d.IdStructureNavigation).WithMany(p => p.StructureStructureTags)
                .HasForeignKey(d => d.IdStructure)
                .HasConstraintName("FK_SST_Structure");

            entity.HasOne(d => d.IdStructureTagNavigation).WithMany(p => p.StructureStructureTags)
                .HasForeignKey(d => d.IdStructureTag)
                .HasConstraintName("FK_SST_Tag");
        });

        modelBuilder.Entity<StructureTag>(entity =>
        {
            entity.HasKey(e => e.IdStructureTag).HasName("PK__Structur__0329FB3D4F255641");

            entity.ToTable("StructureTag");

            entity.Property(e => e.Name).HasMaxLength(255);
        });

        modelBuilder.Entity<StructureTransaction>(entity =>
        {
            entity.HasKey(e => e.IdStructureTransaction);

            entity.ToTable("StructureTransaction", "TRANSACT");

            entity.Property(e => e.Date).HasColumnType("datetime");
            entity.Property(e => e.IdStructure).HasMaxLength(450);
            entity.Property(e => e.IdUser).HasMaxLength(450);
            entity.Property(e => e.StructureTransactionState).HasMaxLength(450);

            entity.HasOne(d => d.IdStructureNavigation).WithMany(p => p.StructureTransactions)
                .HasForeignKey(d => d.IdStructure)
                .HasConstraintName("FK_StructureTransaction_IdStructure");

            entity.HasOne(d => d.IdUserNavigation).WithMany(p => p.StructureTransactions)
                .HasForeignKey(d => d.IdUser)
                .HasConstraintName("FK_StructureTransaction_IdUser");
        });

        modelBuilder.Entity<StructureTransactionDetail>(entity =>
        {
            entity.HasKey(e => e.IdStructureTransactionDetail);

            entity.ToTable("StructureTransactionDetail", "TRANSACT");

            entity.Property(e => e.IdStructureProduct).HasMaxLength(450);
            entity.Property(e => e.IdStructureTransaction).HasMaxLength(450);

            entity.HasOne(d => d.IdStructureProductNavigation).WithMany(p => p.StructureTransactionDetails)
                .HasForeignKey(d => d.IdStructureProduct)
                .HasConstraintName("FK_StructureTransactionDetail_IdStructureProduct");

            entity.HasOne(d => d.IdStructureTransactionNavigation).WithMany(p => p.StructureTransactionDetails)
                .HasForeignKey(d => d.IdStructureTransaction)
                .HasConstraintName("FK_StructureTransactionDetail_IdStructureTransaction");
        });

        modelBuilder.Entity<StructureTransactionDetailMetaDatum>(entity =>
        {
            entity.HasKey(e => e.IdStructureTransactionDetailMetaData);

            entity.ToTable("StructureTransactionDetailMetaData", "TRANSACT");

            entity.Property(e => e.AttributeKey).HasMaxLength(450);
            entity.Property(e => e.AttributeValue).HasMaxLength(450);
            entity.Property(e => e.IdStructureTransactionDetail).HasMaxLength(450);
            entity.Property(e => e.OptionKey).HasMaxLength(450);
            entity.Property(e => e.OptionValue).HasMaxLength(450);

            entity.HasOne(d => d.IdStructureTransactionDetailNavigation).WithMany(p => p.StructureTransactionDetailMetaData)
                .HasForeignKey(d => d.IdStructureTransactionDetail)
                .HasConstraintName("FK_StructureTransactionDetailMetaData_IdStructureTransactionDetail");
        });

        modelBuilder.Entity<StructureType>(entity =>
        {
            entity.HasKey(e => e.IdStructureType);

            entity.ToTable("StructureType");

            entity.Property(e => e.Code).HasMaxLength(450);
            entity.Property(e => e.Name).HasMaxLength(450);
        });

        modelBuilder.Entity<StructureWorkingHour>(entity =>
        {
            entity.HasKey(e => e.IdStructureWorkingHour);

            entity.ToTable("StructureWorkingHour");

            entity.Property(e => e.IdStructure).HasMaxLength(450);
            entity.Property(e => e.LastUpdated).HasColumnType("datetime");

            entity.HasOne(d => d.IdStructureNavigation).WithMany(p => p.StructureWorkingHours)
                .HasForeignKey(d => d.IdStructure)
                .HasConstraintName("FK_StructureWorkingHour_IdStructure");
        });

        modelBuilder.Entity<StructureWorkingHourDay>(entity =>
        {
            entity.HasKey(e => e.IdStructureWorkingHourDay).HasName("PK__Structur__B0A100D5F822B85C");

            entity.ToTable("StructureWorkingHourDay");

            entity.Property(e => e.IdStructureWorkingHourDay).HasDefaultValueSql("(newid())");
            entity.Property(e => e.IdStructureWorkingHour).HasMaxLength(450);

            entity.HasOne(d => d.IdStructureWorkingHourNavigation).WithMany(p => p.StructureWorkingHourDays)
                .HasForeignKey(d => d.IdStructureWorkingHour)
                .HasConstraintName("FK_StructureWorkingHourDay_IdStructureWorkingHour");
        });

        modelBuilder.Entity<StructureWorkingHourTimeSlot>(entity =>
        {
            entity.HasKey(e => e.IdStructureWorkingHourTimeSlot).HasName("PK__Structur__0DCC8EC1E7FF1178");

            entity.ToTable("StructureWorkingHourTimeSlot");

            entity.Property(e => e.IdStructureWorkingHourTimeSlot).HasDefaultValueSql("(newid())");
            entity.Property(e => e.IdStructureWorkingHourDay).HasMaxLength(450);

            entity.HasOne(d => d.IdStructureWorkingHourDayNavigation).WithMany(p => p.StructureWorkingHourTimeSlots)
                .HasForeignKey(d => d.IdStructureWorkingHourDay)
                .HasConstraintName("FK_StructureWorkingHourTimeSlot_IdStructureWorkingHourDay");
        });

        modelBuilder.Entity<Subscriber>(entity =>
        {
            entity.HasKey(e => e.IdSubscriber);

            entity.ToTable("Subscriber");

            entity.Property(e => e.DateAdded).HasColumnType("datetime");
            entity.Property(e => e.EmailAddress).HasMaxLength(450);
            entity.Property(e => e.IdTenant).HasMaxLength(450);
            entity.Property(e => e.Source).HasMaxLength(450);

            entity.HasOne(d => d.IdTenantNavigation).WithMany(p => p.Subscribers)
                .HasForeignKey(d => d.IdTenant)
                .HasConstraintName("FK_Subscriber_IdTenant");
        });

        modelBuilder.Entity<Tenant>(entity =>
        {
            entity.HasKey(e => e.IdTenant);

            entity.ToTable("Tenant");

            entity.Property(e => e.Domain).HasMaxLength(200);
            entity.Property(e => e.Name).HasMaxLength(450);
            entity.Property(e => e.TenantCode).HasMaxLength(450);
        });

        modelBuilder.Entity<UserStructure>(entity =>
        {
            entity.HasKey(e => e.IdUserStructure);

            entity.ToTable("User_Structure");

            entity.Property(e => e.IdUserStructure).HasColumnName("IdUser_Structure");
            entity.Property(e => e.IdStructure).HasMaxLength(450);
            entity.Property(e => e.IdTenant).HasMaxLength(450);
            entity.Property(e => e.IdUser).HasMaxLength(450);

            entity.HasOne(d => d.IdStructureNavigation).WithMany(p => p.UserStructures)
                .HasForeignKey(d => d.IdStructure)
                .HasConstraintName("FK_User_Structure_IdStructure_Structure_IdStructure");

            entity.HasOne(d => d.IdTenantNavigation).WithMany(p => p.UserStructures)
                .HasForeignKey(d => d.IdTenant)
                .HasConstraintName("FK_User_Structure_IdTenant_Tenant_IdTenant");

            entity.HasOne(d => d.IdUserNavigation).WithMany(p => p.UserStructures)
                .HasForeignKey(d => d.IdUser)
                .HasConstraintName("FK_User_Structure_IdUser_User_IdUser");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}


