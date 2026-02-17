using Business.Model;
using Data.Identity;
using Data.Interfaces;
using Data.Source;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Data;

public static class Dependencies
{
    public static IServiceCollection ConfigureServices(IConfiguration configuration, IServiceCollection services)
    {
        services.AddDbContext<ApplicationDbContext>(c =>
            c.UseSqlServer(configuration.GetConnectionString("ApplicationConnection")));


        services.AddDbContext<AppIdentityDbContext>(c =>
        c.UseSqlServer(configuration.GetConnectionString("IdentityConnection")));

        services.AddScoped<IUnitOfWork, UnitOfWork>();

        services.AddScoped<IUser_StructureDao, User_StructureDao>();
        services.AddScoped<IAspNetRoleClaimDao, AspNetRoleClaimsDao>();
        services.AddScoped<IAspNetRoleDao, AspNetRolesDao>();
        services.AddScoped<IAspNetUserClaimDao, AspNetUserClaimsDao>();
        services.AddScoped<IAspNetUserLoginDao, AspNetUserLoginsDao>();
        services.AddScoped<IAspNetUserDao, AspNetUsersDao>();
        services.AddScoped<IAspNetUserTokenDao, AspNetUserTokensDao>();
        services.AddScoped<ICompanyDao, CompanyDao>();
        services.AddScoped<IDocumentDao, DocumentDao>();
        services.AddScoped<IParameterDao, ParameterDao>();
        services.AddScoped<IPermissionDao, PermissionDao>();
        services.AddScoped<IPersonDao, PersonDao>();
        services.AddScoped<IRole_PermissionDao, Role_PermissionDao>();
        services.AddScoped<IStructureDao, StructureDao>();
        services.AddScoped<IStructureTypeDao, StructureTypeDao>();
        services.AddScoped<ITenantDao, TenantDao>();
        services.AddScoped<ITenantProductDao, TenantProductDao>();




        services.AddScoped<IMailRecipientTypeDao, MailRecipientTypeDao>();
        services.AddScoped<IMailRecipientDao, MailRecipientDao>();
        services.AddScoped<IMailServerSettingDao, MailServerSettingDao>();
        services.AddScoped<IMailStateDao, MailStateDao>();
        services.AddScoped<IMailToSendDao, MailToSendDao>();
        services.AddScoped<IMailToSendDocumentDao, MailToSendDocumentDao>();
        services.AddScoped<IActionLogDao, ActionLogDao>();

        services.AddScoped<IAddressDao, AddressDao>();
        services.AddScoped<ISocialNetworkDao, SocialNetworkDao>();
        services.AddScoped<IStructureSocialNetworkDao, StructureSocialNetworkDao>();
        services.AddScoped<IStructureAddressDao, StructureAddressDao>();
        services.AddScoped<IStructureContactDao, StructureContactDao>();
        services.AddScoped<IIntegrationTypeDao, IntegrationTypeDao>();
        services.AddScoped<IIntegrationStateDao, IntegrationStateDao>();
        services.AddScoped<IIntegrationDetailActionTypeDao, IntegrationDetailActionTypeDao>();
        services.AddScoped<IIntegrationDetailActionDao, IntegrationDetailActionDao>();
        services.AddScoped<IIntegrationDetailDao, IntegrationDetailDao>();
        services.AddScoped<IIntegrationDao, IntegrationDao>();
        services.AddScoped<IStructureFieldDao, StructureFieldDao>();
        services.AddScoped<IStructureStructureFieldDao, StructureStructureFieldDao>();
        services.AddScoped<IStructureStructureCategoryDao, StructureStructureCategoryDao>();
        services.AddScoped<IStructureStructureTagDao, StructureStructureTagDao>();
        services.AddScoped<ISubscriberDao, SubscriberDao>();
        services.AddScoped<IStructureCategoryDao, StructureCategoryDao>();
        services.AddScoped<IStructureAccordionDao, StructureAccordionDao>();
        services.AddScoped<IStructureFeatureDao, StructureFeatureDao>();
        services.AddScoped<IStructureTagDao, StructureTagDao>();
        services.AddScoped<IStructureGalleryDao, StructureGalleryDao>();
        services.AddScoped<IStructureMemberDao, StructureMemberDao>();
        services.AddScoped<IStructureMessageDao, StructureMessageDao>();
        services.AddScoped<IStructureWorkingHourDao, StructureWorkingHourDao>();
        services.AddScoped<IStructureWorkingHourDayDao, StructureWorkingHourDayDao>();
        services.AddScoped<IStructureWorkingHourTimeSlotDao, StructureWorkingHourTimeSlotDao>();
        services.AddScoped<IStructurePortfolioDao, StructurePortfolioDao>();
        services.AddScoped<IStructurePortfolioDocumentDao, StructurePortfolioDocumentDao>();
        services.AddScoped<IProfileTemplateDao, ProfileTemplateDao>();
        services.AddScoped<IShopDao, ShopDao>();
        services.AddScoped<IShopProductCategoryDao, ShopProductCategoryDao>();
        services.AddScoped<ISlugLogDao, SlugLogDao>();
        services.AddScoped<IStructureAttrributeDao, StructureAttrributeDao>();
        services.AddScoped<IStructureAttrributeDetailDao, StructureAttrributeDetailDao>();
        services.AddScoped<IStructureEducationDao, StructureEducationDao>();
        services.AddScoped<IStructureEducationMediumDao, StructureEducationMediumDao>();
        services.AddScoped<IStructureEducationSkillDao, StructureEducationSkillDao>();
        services.AddScoped<IStructureExperienceDao, StructureExperienceDao>();
        services.AddScoped<IStructureExperienceMediumDao, StructureExperienceMediumDao>();
        services.AddScoped<IStructureExperienceSkillDao, StructureExperienceSkillDao>();
        services.AddScoped<IStructureOptionDao, StructureOptionDao>();
        services.AddScoped<IStructureOptionDetailDao, StructureOptionDetailDao>();
        services.AddScoped<IStructureProductDao, StructureProductDao>();
        services.AddScoped<IStructureProductDocumentDao, StructureProductDocumentDao>();
        services.AddScoped<IStructureProductShopProductCategoryDao, StructureProductShopProductCategoryDao>();
        services.AddScoped<IStructureProductStructureOptionDetailDao, StructureProductStructureOptionDetailDao>();
        services.AddScoped<IStructureProductStructureProductAttrributeDetailDao, StructureProductStructureProductAttrributeDetailDao>();
        return services;

    }
}
