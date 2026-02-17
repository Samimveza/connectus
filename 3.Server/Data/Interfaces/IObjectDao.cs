using Business;
using Business.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Interfaces
{

    public partial interface IPersonDao : IGenericDao<Person>
    {
    }

    public partial interface IUser_StructureDao : IGenericDao<UserStructure> { }
    public partial interface IAspNetRoleClaimDao : IGenericDao<AspNetRoleClaim> { }
    public partial interface IAspNetRoleDao : IGenericDao<AspNetRole> { }
    public partial interface IAspNetUserClaimDao : IGenericDao<AspNetUserClaim> { }
    public partial interface IAspNetUserLoginDao : IGenericDao<AspNetUserLogin> { }
    public partial interface IAspNetUserDao : IGenericDao<AspNetUser> { }
    public partial interface IAspNetUserTokenDao : IGenericDao<AspNetUserToken> { }
    public partial interface ICompanyDao : IGenericDao<Company> { }
    public partial interface IDocumentDao : IGenericDao<Document> { }
    public partial interface IParameterDao : IGenericDao<Parameter> { }
    public partial interface IPermissionDao : IGenericDao<Permission> { }
    public partial interface IRole_PermissionDao : IGenericDao<RolePermission> { }
    public partial interface IStructureDao : IGenericDao<Structure> { }
    public partial interface ITenantDao : IGenericDao<Tenant> { }
    public partial interface IMailRecipientTypeDao : IGenericDao<MailRecipientType> { }
    public partial interface IMailRecipientDao : IGenericDao<MailRecipient> { }
    public partial interface IMailServerSettingDao : IGenericDao<MailServerSetting> { }
    public partial interface IMailStateDao : IGenericDao<MailState> { }
    public partial interface IMailToSendDao : IGenericDao<MailToSend> { }
    public partial interface IMailToSendDocumentDao : IGenericDao<MailToSendDocument> { }
    public partial interface IActionLogDao : IGenericDao<ActionLog> { }
    public partial interface IStructureTypeDao : IGenericDao<StructureType> { }

    public partial interface ITenantProductDao : IGenericDao<TenantProduct> { }


    public partial interface IAddressDao : IGenericDao<Address> { }
    public partial interface ISocialNetworkDao : IGenericDao<SocialNetwork> { }
    public partial interface IStructureSocialNetworkDao : IGenericDao<StructureSocialNetwork> { }
    public partial interface IStructureAddressDao : IGenericDao<StructureAddress> { }

    public partial interface IStructureContactDao : IGenericDao<StructureContact> { }
    public partial interface IIntegrationTypeDao : IGenericDao<IntegrationType> { }
    public partial interface IIntegrationStateDao : IGenericDao<IntegrationState> { }
    public partial interface IIntegrationDetailActionTypeDao : IGenericDao<IntegrationDetailActionType> { }
    public partial interface IIntegrationDetailActionDao : IGenericDao<IntegrationDetailAction> { }
    public partial interface IIntegrationDetailDao : IGenericDao<IntegrationDetail> { }
    public partial interface IIntegrationDao : IGenericDao<Integration> { }

    public partial interface IStructureFieldDao : IGenericDao<StructureField> { }

    public partial interface IStructureStructureFieldDao : IGenericDao<StructureStructureField> { }

    public partial interface IStructureStructureCategoryDao : IGenericDao<StructureStructureCategory> { }

    public partial interface IStructureStructureTagDao : IGenericDao<StructureStructureTag> { }

    public partial interface ISubscriberDao : IGenericDao<Subscriber> { }

    public partial interface IStructureCategoryDao : IGenericDao<StructureCategory> { }
    public partial interface IStructureAccordionDao : IGenericDao<StructureAccordion> { }
    public partial interface IStructureFeatureDao : IGenericDao<StructureFeature> { }
    public partial interface IStructureTagDao : IGenericDao<StructureTag> { }
    public partial interface IStructureGalleryDao : IGenericDao<StructureGallery> { }
    public partial interface IStructureMemberDao : IGenericDao<StructureMember> { }
    public partial interface IStructureMessageDao : IGenericDao<StructureMessage> { }

    public partial interface IStructureWorkingHourDao : IGenericDao<StructureWorkingHour> { }
    public partial interface IStructureWorkingHourDayDao : IGenericDao<StructureWorkingHourDay> { }
    public partial interface IStructureWorkingHourTimeSlotDao : IGenericDao<StructureWorkingHourTimeSlot> { }

    public partial interface IStructurePortfolioDao : IGenericDao<StructurePortfolio> { }
    public partial interface IStructurePortfolioDocumentDao : IGenericDao<StructurePortfolioDocument> { }
    public partial interface IProfileTemplateDao : IGenericDao<ProfileTemplate> { }
    public partial interface IShopDao : IGenericDao<Shop> { }
    public partial interface IShopProductCategoryDao : IGenericDao<ShopProductCategory> { }
    public partial interface ISlugLogDao : IGenericDao<SlugLog> { }
    public partial interface IStructureAttrributeDao : IGenericDao<StructureAttrribute> { }
    public partial interface IStructureAttrributeDetailDao : IGenericDao<StructureAttrributeDetail> { }
    public partial interface IStructureEducationDao : IGenericDao<StructureEducation> { }
    public partial interface IStructureEducationMediumDao : IGenericDao<StructureEducationMedium> { }
    public partial interface IStructureEducationSkillDao : IGenericDao<StructureEducationSkill> { }
    public partial interface IStructureExperienceDao : IGenericDao<StructureExperience> { }
    public partial interface IStructureExperienceMediumDao : IGenericDao<StructureExperienceMedium> { }
    public partial interface IStructureExperienceSkillDao : IGenericDao<StructureExperienceSkill> { }
    public partial interface IStructureOptionDao : IGenericDao<StructureOption> { }
    public partial interface IStructureOptionDetailDao : IGenericDao<StructureOptionDetail> { }
    public partial interface IStructureProductDao : IGenericDao<StructureProduct> { }
    public partial interface IStructureProductDocumentDao : IGenericDao<StructureProductDocument> { }
    public partial interface IStructureProductShopProductCategoryDao : IGenericDao<StructureProductShopProductCategory> { }
    public partial interface IStructureProductStructureOptionDetailDao : IGenericDao<StructureProductStructureOptionDetail> { }
    public partial interface IStructureProductStructureProductAttrributeDetailDao : IGenericDao<StructureProductStructureProductAttrributeDetail> { }

}