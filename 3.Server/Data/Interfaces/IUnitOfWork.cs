using Business.Model;
using Data.Source;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IUser_StructureDao User_StructureDao { get; }
        IAspNetRoleClaimDao AspNetRoleClaimDao { get; }
        IAspNetRoleDao AspNetRoleDao { get; }
        IAspNetUserClaimDao AspNetUserClaimDao { get; }
        IAspNetUserLoginDao AspNetUserLoginDao { get; }
        IAspNetUserDao AspNetUserDao { get; }
        IAspNetUserTokenDao AspNetUserTokenDao { get; }
        ICompanyDao CompanyDao { get; }
        IDocumentDao DocumentDao { get; }
        IParameterDao ParameterDao { get; }
        IPermissionDao PermissionDao { get; }
        IPersonDao PersonDao { get; }
        IRole_PermissionDao Role_PermissionDao { get; }
        IStructureDao StructureDao { get; }
        ITenantDao TenantDao { get; }

        IMailRecipientTypeDao MailRecipientTypeDao { get; }
        IMailRecipientDao MailRecipientDao { get; }
        IMailServerSettingDao MailServerSettingDao { get; }
        IMailStateDao MailStateDao { get; }
        IMailToSendDao MailToSendDao { get; }
        IMailToSendDocumentDao MailToSendDocumentDao { get; }

        IStructureTypeDao StructureTypeDao { get; }
        ITenantProductDao TenantProductDao { get; }

        IActionLogDao ActionLogDao { get; }

        IAddressDao AddressDao { get; }
        ISocialNetworkDao SocialNetworkDao { get; }
        IStructureSocialNetworkDao StructureSocialNetworkDao { get; }
        IStructureAddressDao StructureAddressDao { get; }
        IStructureContactDao StructureContactDao { get; }
        IIntegrationTypeDao IntegrationTypeDao { get; }
        IIntegrationStateDao IntegrationStateDao { get; }
        IIntegrationDetailActionTypeDao IntegrationDetailActionTypeDao { get; }
        IIntegrationDetailActionDao IntegrationDetailActionDao { get; }
        IIntegrationDetailDao IntegrationDetailDao { get; }
        IIntegrationDao IntegrationDao { get; }
        IStructureFieldDao StructureFieldDao { get; }

        IStructureStructureFieldDao StructureStructureFieldDao { get; }
        IStructureStructureCategoryDao StructureStructureCategoryDao { get; }
        IStructureStructureTagDao StructureStructureTagDao { get; }
        ISubscriberDao SubscriberDao { get; }
        IStructureCategoryDao StructureCategoryDao { get; }
        IStructureAccordionDao StructureAccordionDao { get; }
        IStructureFeatureDao StructureFeatureDao { get; }
        IStructureTagDao StructureTagDao { get; }
        IStructureGalleryDao StructureGalleryDao { get; }
        IStructureMemberDao StructureMemberDao { get; }
        IStructureMessageDao StructureMessageDao { get; }
        IStructureWorkingHourDao StructureWorkingHourDao { get; }
        IStructureWorkingHourDayDao StructureWorkingHourDayDao { get; }
        IStructureWorkingHourTimeSlotDao StructureWorkingHourTimeSlotDao { get; }
        IStructurePortfolioDao StructurePortfolioDao { get; }
        IStructurePortfolioDocumentDao StructurePortfolioDocumentDao { get; }
        IProfileTemplateDao ProfileTemplateDao { get; }
        IShopDao ShopDao { get; }
        IShopProductCategoryDao ShopProductCategoryDao { get; }
        ISlugLogDao SlugLogDao { get; }
        IStructureAttrributeDao StructureAttrributeDao { get; }
        IStructureAttrributeDetailDao StructureAttrributeDetailDao { get; }
        IStructureEducationDao StructureEducationDao { get; }
        IStructureEducationMediumDao StructureEducationMediumDao { get; }
        IStructureEducationSkillDao StructureEducationSkillDao { get; }
        IStructureExperienceDao StructureExperienceDao { get; }
        IStructureExperienceMediumDao StructureExperienceMediumDao { get; }
        IStructureExperienceSkillDao StructureExperienceSkillDao { get; }
        IStructureOptionDao StructureOptionDao { get; }
        IStructureOptionDetailDao StructureOptionDetailDao { get; }
        IStructureProductDao StructureProductDao { get; }
        IStructureProductDocumentDao StructureProductDocumentDao { get; }
        IStructureProductShopProductCategoryDao StructureProductShopProductCategoryDao { get; }
        IStructureProductStructureOptionDetailDao StructureProductStructureOptionDetailDao { get; }
        IStructureProductStructureProductAttrributeDetailDao StructureProductStructureProductAttrributeDetailDao { get; }
        
        int Save();
    }
}
