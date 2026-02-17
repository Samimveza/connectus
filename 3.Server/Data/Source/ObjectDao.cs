using Business;
using Business.Model;
using Data.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Source
{

    public partial class User_StructureDao : GenericRepository<UserStructure>, IUser_StructureDao { public User_StructureDao(ApplicationDbContext dbContext) : base(dbContext) { } }
    public partial class AspNetRoleClaimsDao : GenericRepository<AspNetRoleClaim>, IAspNetRoleClaimDao { public AspNetRoleClaimsDao(ApplicationDbContext dbContext) : base(dbContext) { } }
    public partial class AspNetRolesDao : GenericRepository<AspNetRole>, IAspNetRoleDao { public AspNetRolesDao(ApplicationDbContext dbContext) : base(dbContext) { } }
    public partial class AspNetUserClaimsDao : GenericRepository<AspNetUserClaim>, IAspNetUserClaimDao { public AspNetUserClaimsDao(ApplicationDbContext dbContext) : base(dbContext) { } }
    public partial class AspNetUserLoginsDao : GenericRepository<AspNetUserLogin>, IAspNetUserLoginDao { public AspNetUserLoginsDao(ApplicationDbContext dbContext) : base(dbContext) { } }
    public partial class AspNetUsersDao : GenericRepository<AspNetUser>, IAspNetUserDao { public AspNetUsersDao(ApplicationDbContext dbContext) : base(dbContext) { } }
    public partial class AspNetUserTokensDao : GenericRepository<AspNetUserToken>, IAspNetUserTokenDao { public AspNetUserTokensDao(ApplicationDbContext dbContext) : base(dbContext) { } }
    public partial class CompanyDao : GenericRepository<Company>, ICompanyDao { public CompanyDao(ApplicationDbContext dbContext) : base(dbContext) { } }
    public partial class DocumentDao : GenericRepository<Document>, IDocumentDao { public DocumentDao(ApplicationDbContext dbContext) : base(dbContext) { } }
    public partial class ParameterDao : GenericRepository<Parameter>, IParameterDao { public ParameterDao(ApplicationDbContext dbContext) : base(dbContext) { } }
    public partial class PermissionDao : GenericRepository<Permission>, IPermissionDao { public PermissionDao(ApplicationDbContext dbContext) : base(dbContext) { } }
    public partial class PersonDao : GenericRepository<Person>, IPersonDao { public PersonDao(ApplicationDbContext dbContext) : base(dbContext) { } }
    public partial class Role_PermissionDao : GenericRepository<RolePermission>, IRole_PermissionDao { public Role_PermissionDao(ApplicationDbContext dbContext) : base(dbContext) { } }
    public partial class StructureDao : GenericRepository<Structure>, IStructureDao { public StructureDao(ApplicationDbContext dbContext) : base(dbContext) { } }
    public partial class TenantDao : GenericRepository<Tenant>, ITenantDao { public TenantDao(ApplicationDbContext dbContext) : base(dbContext) { } }
    public partial class MailRecipientTypeDao : GenericRepository<MailRecipientType>, IMailRecipientTypeDao { public MailRecipientTypeDao(ApplicationDbContext dbContext) : base(dbContext) { } }
    public partial class MailRecipientDao : GenericRepository<MailRecipient>, IMailRecipientDao { public MailRecipientDao(ApplicationDbContext dbContext) : base(dbContext) { } }
    public partial class MailServerSettingDao : GenericRepository<MailServerSetting>, IMailServerSettingDao { public MailServerSettingDao(ApplicationDbContext dbContext) : base(dbContext) { } }
    public partial class MailStateDao : GenericRepository<MailState>, IMailStateDao { public MailStateDao(ApplicationDbContext dbContext) : base(dbContext) { } }
    public partial class MailToSendDao : GenericRepository<MailToSend>, IMailToSendDao { public MailToSendDao(ApplicationDbContext dbContext) : base(dbContext) { } }
    public partial class MailToSendDocumentDao : GenericRepository<MailToSendDocument>, IMailToSendDocumentDao { public MailToSendDocumentDao(ApplicationDbContext dbContext) : base(dbContext) { } }
    public partial class ActionLogDao : GenericRepository<ActionLog>, IActionLogDao { public ActionLogDao(ApplicationDbContext dbContext) : base(dbContext) { } }
    public partial class StructureTypeDao : GenericRepository<StructureType>, IStructureTypeDao { public StructureTypeDao(ApplicationDbContext dbContext) : base(dbContext) { } }

    public partial class TenantProductDao : GenericRepository<TenantProduct>, ITenantProductDao { public TenantProductDao(ApplicationDbContext dbContext) : base(dbContext) { } }

    public partial class AddressDao : GenericRepository<Address>, IAddressDao { public AddressDao(ApplicationDbContext dbContext) : base(dbContext) { } }
    public partial class SocialNetworkDao : GenericRepository<SocialNetwork>, ISocialNetworkDao { public SocialNetworkDao(ApplicationDbContext dbContext) : base(dbContext) { } }
    public partial class StructureSocialNetworkDao : GenericRepository<StructureSocialNetwork>, IStructureSocialNetworkDao { public StructureSocialNetworkDao(ApplicationDbContext dbContext) : base(dbContext) { } }
    public partial class StructureAddressDao : GenericRepository<StructureAddress>, IStructureAddressDao { public StructureAddressDao(ApplicationDbContext dbContext) : base(dbContext) { } }
    public partial class StructureContactDao : GenericRepository<StructureContact>, IStructureContactDao { public StructureContactDao(ApplicationDbContext dbContext) : base(dbContext) { } }
    public partial class IntegrationTypeDao : GenericRepository<IntegrationType>, IIntegrationTypeDao { public IntegrationTypeDao(ApplicationDbContext dbContext) : base(dbContext) { } }
    public partial class IntegrationStateDao : GenericRepository<IntegrationState>, IIntegrationStateDao { public IntegrationStateDao(ApplicationDbContext dbContext) : base(dbContext) { } }
    public partial class IntegrationDetailActionTypeDao : GenericRepository<IntegrationDetailActionType>, IIntegrationDetailActionTypeDao { public IntegrationDetailActionTypeDao(ApplicationDbContext dbContext) : base(dbContext) { } }
    public partial class IntegrationDetailActionDao : GenericRepository<IntegrationDetailAction>, IIntegrationDetailActionDao { public IntegrationDetailActionDao(ApplicationDbContext dbContext) : base(dbContext) { } }
    public partial class IntegrationDetailDao : GenericRepository<IntegrationDetail>, IIntegrationDetailDao { public IntegrationDetailDao(ApplicationDbContext dbContext) : base(dbContext) { } }
    public partial class IntegrationDao : GenericRepository<Integration>, IIntegrationDao { public IntegrationDao(ApplicationDbContext dbContext) : base(dbContext) { } }
    public partial class StructureFieldDao : GenericRepository<StructureField>, IStructureFieldDao { public StructureFieldDao(ApplicationDbContext dbContext) : base(dbContext) { } }
    public partial class StructureStructureFieldDao : GenericRepository<StructureStructureField>, IStructureStructureFieldDao { public StructureStructureFieldDao(ApplicationDbContext dbContext) : base(dbContext) { } }
    public partial class StructureStructureCategoryDao : GenericRepository<StructureStructureCategory>, IStructureStructureCategoryDao { public StructureStructureCategoryDao(ApplicationDbContext dbContext) : base(dbContext) { } }
    public partial class StructureStructureTagDao : GenericRepository<StructureStructureTag>, IStructureStructureTagDao { public StructureStructureTagDao(ApplicationDbContext dbContext) : base(dbContext) { } }
    public partial class SubscriberDao : GenericRepository<Subscriber>, ISubscriberDao { public SubscriberDao(ApplicationDbContext dbContext) : base(dbContext) { } }
    public partial class StructureCategoryDao : GenericRepository<StructureCategory>, IStructureCategoryDao { public StructureCategoryDao(ApplicationDbContext dbContext) : base(dbContext) { } }
    public partial class StructureAccordionDao : GenericRepository<StructureAccordion>, IStructureAccordionDao { public StructureAccordionDao(ApplicationDbContext dbContext) : base(dbContext) { } }
    public partial class StructureFeatureDao : GenericRepository<StructureFeature>, IStructureFeatureDao { public StructureFeatureDao(ApplicationDbContext dbContext) : base(dbContext) { } }
    public partial class StructureTagDao : GenericRepository<StructureTag>, IStructureTagDao { public StructureTagDao(ApplicationDbContext dbContext) : base(dbContext) { } }
    public partial class StructureGalleryDao : GenericRepository<StructureGallery>, IStructureGalleryDao { public StructureGalleryDao(ApplicationDbContext dbContext) : base(dbContext) { } }
    public partial class StructureMemberDao : GenericRepository<StructureMember>, IStructureMemberDao { public StructureMemberDao(ApplicationDbContext dbContext) : base(dbContext) { } }
    public partial class StructureMessageDao : GenericRepository<StructureMessage>, IStructureMessageDao { public StructureMessageDao(ApplicationDbContext dbContext) : base(dbContext) { } }

    public partial class StructureWorkingHourDao : GenericRepository<StructureWorkingHour>, IStructureWorkingHourDao { public StructureWorkingHourDao(ApplicationDbContext dbContext) : base(dbContext) { } }
    public partial class StructureWorkingHourDayDao : GenericRepository<StructureWorkingHourDay>, IStructureWorkingHourDayDao { public StructureWorkingHourDayDao(ApplicationDbContext dbContext) : base(dbContext) { } }
    public partial class StructureWorkingHourTimeSlotDao : GenericRepository<StructureWorkingHourTimeSlot>, IStructureWorkingHourTimeSlotDao { public StructureWorkingHourTimeSlotDao(ApplicationDbContext dbContext) : base(dbContext) { } }
    public partial class StructurePortfolioDao : GenericRepository<StructurePortfolio>, IStructurePortfolioDao { public StructurePortfolioDao(ApplicationDbContext dbContext) : base(dbContext) { } }
    public partial class StructurePortfolioDocumentDao : GenericRepository<StructurePortfolioDocument>, IStructurePortfolioDocumentDao { public StructurePortfolioDocumentDao(ApplicationDbContext dbContext) : base(dbContext) { } }
    public partial class ProfileTemplateDao : GenericRepository<ProfileTemplate>, IProfileTemplateDao { public ProfileTemplateDao(ApplicationDbContext dbContext) : base(dbContext) { } }
    public partial class ShopDao : GenericRepository<Shop>, IShopDao { public ShopDao(ApplicationDbContext dbContext) : base(dbContext) { } }
    public partial class ShopProductCategoryDao : GenericRepository<ShopProductCategory>, IShopProductCategoryDao { public ShopProductCategoryDao(ApplicationDbContext dbContext) : base(dbContext) { } }
    public partial class SlugLogDao : GenericRepository<SlugLog>, ISlugLogDao { public SlugLogDao(ApplicationDbContext dbContext) : base(dbContext) { } }
    public partial class StructureAttrributeDao : GenericRepository<StructureAttrribute>, IStructureAttrributeDao { public StructureAttrributeDao(ApplicationDbContext dbContext) : base(dbContext) { } }
    public partial class StructureAttrributeDetailDao : GenericRepository<StructureAttrributeDetail>, IStructureAttrributeDetailDao { public StructureAttrributeDetailDao(ApplicationDbContext dbContext) : base(dbContext) { } }
    public partial class StructureEducationDao : GenericRepository<StructureEducation>, IStructureEducationDao { public StructureEducationDao(ApplicationDbContext dbContext) : base(dbContext) { } }
    public partial class StructureEducationMediumDao : GenericRepository<StructureEducationMedium>, IStructureEducationMediumDao { public StructureEducationMediumDao(ApplicationDbContext dbContext) : base(dbContext) { } }
    public partial class StructureEducationSkillDao : GenericRepository<StructureEducationSkill>, IStructureEducationSkillDao { public StructureEducationSkillDao(ApplicationDbContext dbContext) : base(dbContext) { } }
    public partial class StructureExperienceDao : GenericRepository<StructureExperience>, IStructureExperienceDao { public StructureExperienceDao(ApplicationDbContext dbContext) : base(dbContext) { } }
    public partial class StructureExperienceMediumDao : GenericRepository<StructureExperienceMedium>, IStructureExperienceMediumDao { public StructureExperienceMediumDao(ApplicationDbContext dbContext) : base(dbContext) { } }
    public partial class StructureExperienceSkillDao : GenericRepository<StructureExperienceSkill>, IStructureExperienceSkillDao { public StructureExperienceSkillDao(ApplicationDbContext dbContext) : base(dbContext) { } }
    public partial class StructureOptionDao : GenericRepository<StructureOption>, IStructureOptionDao { public StructureOptionDao(ApplicationDbContext dbContext) : base(dbContext) { } }
    public partial class StructureOptionDetailDao : GenericRepository<StructureOptionDetail>, IStructureOptionDetailDao { public StructureOptionDetailDao(ApplicationDbContext dbContext) : base(dbContext) { } }
    public partial class StructureProductDao : GenericRepository<StructureProduct>, IStructureProductDao { public StructureProductDao(ApplicationDbContext dbContext) : base(dbContext) { } }
    public partial class StructureProductDocumentDao : GenericRepository<StructureProductDocument>, IStructureProductDocumentDao { public StructureProductDocumentDao(ApplicationDbContext dbContext) : base(dbContext) { } }
    public partial class StructureProductShopProductCategoryDao : GenericRepository<StructureProductShopProductCategory>, IStructureProductShopProductCategoryDao { public StructureProductShopProductCategoryDao(ApplicationDbContext dbContext) : base(dbContext) { } }
    public partial class StructureProductStructureOptionDetailDao : GenericRepository<StructureProductStructureOptionDetail>, IStructureProductStructureOptionDetailDao { public StructureProductStructureOptionDetailDao(ApplicationDbContext dbContext) : base(dbContext) { } }
    public partial class StructureProductStructureProductAttrributeDetailDao : GenericRepository<StructureProductStructureProductAttrributeDetail>, IStructureProductStructureProductAttrributeDetailDao { public StructureProductStructureProductAttrributeDetailDao(ApplicationDbContext dbContext) : base(dbContext) { } }
}
