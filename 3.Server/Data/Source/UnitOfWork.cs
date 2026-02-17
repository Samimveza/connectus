using Business.Model;
using Data.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Source
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _dbContext;

        public IUser_StructureDao User_StructureDao { get; }

        public IAspNetRoleClaimDao AspNetRoleClaimDao { get; }

        public IAspNetRoleDao AspNetRoleDao { get; }

        public IAspNetUserClaimDao AspNetUserClaimDao { get; }

        public IAspNetUserLoginDao AspNetUserLoginDao { get; }

        public IAspNetUserDao AspNetUserDao { get; }

        public IAspNetUserTokenDao AspNetUserTokenDao { get; }

        public ICompanyDao CompanyDao { get; }

        public IDocumentDao DocumentDao { get; }

        public IParameterDao ParameterDao { get; }

        public IPermissionDao PermissionDao { get; }

        public IPersonDao PersonDao { get; }

        public IRole_PermissionDao Role_PermissionDao { get; }

        public IStructureDao StructureDao { get; }

        public ITenantDao TenantDao { get; }
        public IMailRecipientTypeDao MailRecipientTypeDao { get; }
        public IMailRecipientDao MailRecipientDao { get; }
        public IMailServerSettingDao MailServerSettingDao { get; }
        public IMailStateDao MailStateDao { get; }
        public IMailToSendDao MailToSendDao { get; }
        public IMailToSendDocumentDao MailToSendDocumentDao { get; }
        public IActionLogDao ActionLogDao { get; }

        public IStructureTypeDao StructureTypeDao { get; }
        public ITenantProductDao TenantProductDao { get; }

        public IAddressDao AddressDao { get; }
        public ISocialNetworkDao SocialNetworkDao { get; }
        public IStructureSocialNetworkDao StructureSocialNetworkDao { get; }
        public IStructureAddressDao StructureAddressDao { get; }
        public IStructureContactDao StructureContactDao { get; }
        public IIntegrationTypeDao IntegrationTypeDao { get; }
        public IIntegrationStateDao IntegrationStateDao { get; }
        public IIntegrationDetailActionTypeDao IntegrationDetailActionTypeDao { get; }
        public IIntegrationDetailActionDao IntegrationDetailActionDao { get; }
        public IIntegrationDetailDao IntegrationDetailDao { get; }
        public IIntegrationDao IntegrationDao { get; }
        public IStructureFieldDao StructureFieldDao { get; }
        public IStructureStructureFieldDao StructureStructureFieldDao { get; }
        public IStructureStructureCategoryDao StructureStructureCategoryDao { get; }
        public IStructureStructureTagDao StructureStructureTagDao { get; }
        public ISubscriberDao SubscriberDao { get; }
        public IStructureCategoryDao StructureCategoryDao { get; }
        public IStructureAccordionDao StructureAccordionDao { get; }
        public IStructureFeatureDao StructureFeatureDao { get; }
        public IStructureTagDao StructureTagDao { get; }
        public IStructureGalleryDao StructureGalleryDao { get; }
        public IStructureMemberDao StructureMemberDao { get; }
        public IStructureMessageDao StructureMessageDao { get; }
        public IStructureWorkingHourDao StructureWorkingHourDao { get; }
        public IStructureWorkingHourDayDao StructureWorkingHourDayDao { get; }
        public IStructureWorkingHourTimeSlotDao StructureWorkingHourTimeSlotDao { get; }
        public IStructurePortfolioDao StructurePortfolioDao { get; }
        public IStructurePortfolioDocumentDao StructurePortfolioDocumentDao { get; }
        public IProfileTemplateDao ProfileTemplateDao { get; }
        public IShopDao ShopDao { get; }
        public IShopProductCategoryDao ShopProductCategoryDao { get; }
        public ISlugLogDao SlugLogDao { get; }
        public IStructureAttrributeDao StructureAttrributeDao { get; }
        public IStructureAttrributeDetailDao StructureAttrributeDetailDao { get; }
        public IStructureEducationDao StructureEducationDao { get; }
        public IStructureEducationMediumDao StructureEducationMediumDao { get; }
        public IStructureEducationSkillDao StructureEducationSkillDao { get; }
        public IStructureExperienceDao StructureExperienceDao { get; }
        public IStructureExperienceMediumDao StructureExperienceMediumDao { get; }
        public IStructureExperienceSkillDao StructureExperienceSkillDao { get; }
        public IStructureOptionDao StructureOptionDao { get; }
        public IStructureOptionDetailDao StructureOptionDetailDao { get; }
        public IStructureProductDao StructureProductDao { get; }
        public IStructureProductDocumentDao StructureProductDocumentDao { get; }
        public IStructureProductShopProductCategoryDao StructureProductShopProductCategoryDao { get; }
        public IStructureProductStructureOptionDetailDao StructureProductStructureOptionDetailDao { get; }
        public IStructureProductStructureProductAttrributeDetailDao StructureProductStructureProductAttrributeDetailDao { get; }

        public UnitOfWork(ApplicationDbContext dbContext,
                            IUser_StructureDao user_StructureRepository,
                            IAspNetRoleClaimDao aspNetRoleClaimRepository,
                            IAspNetRoleDao aspNetRoleRepository,
                            IAspNetUserClaimDao aspNetUserClaimRepository,
                            IAspNetUserLoginDao aspNetUserLoginRepository,
                            IAspNetUserDao aspNetUserRepository,
                            IAspNetUserTokenDao aspNetUserTokenRepository,
                            ICompanyDao companyRepository,
                            IDocumentDao documentRepository,
                            IParameterDao parameterRepository,
                            IPermissionDao permissionRepository,
                            IPersonDao personRepository,
                            IRole_PermissionDao role_PermissionRepository,
                            IStructureDao structureRepository,
                            ITenantDao tenantRepository,
                            IMailRecipientTypeDao mailRecipientTypeDao,
                            IMailRecipientDao mailRecipientDao,
                            IMailServerSettingDao mailServerSettingDao,
                            IMailStateDao mailStateDao,
                            IMailToSendDao mailToSendDao,
                            IMailToSendDocumentDao mailToSendDocumentDao,
                            IActionLogDao actionLogDao,
                            IStructureTypeDao structureTypeDao,
                            ITenantProductDao tenantProductDao,
                            IAddressDao addressDao,
                            ISocialNetworkDao socialNetworkDao,
                            IStructureSocialNetworkDao structureSocialNetworkDao,
                            IStructureAddressDao structureAddressDao,
                            IStructureContactDao structureContactDao,
                            IIntegrationTypeDao integrationTypeDao,
                            IIntegrationStateDao integrationStateDao,
                            IIntegrationDetailActionTypeDao integrationDetailActionTypeDao,
                            IIntegrationDetailActionDao integrationDetailActionDao,
                            IIntegrationDetailDao integrationDetailDao,
                            IIntegrationDao integrationDao,
                            IStructureFieldDao structureFieldDao,
                            IStructureStructureFieldDao structureStructureFieldDao,
                            IStructureStructureCategoryDao structureStructureCategoryDao,
                            IStructureStructureTagDao structureStructureTagDao,
                            ISubscriberDao subscriberDao,
                            IStructureCategoryDao structureCategoryDao,
                            IStructureAccordionDao structureAccordionDao,
                            IStructureFeatureDao structureFeatureDao,
                            IStructureTagDao structureTagDao,
                            IStructureGalleryDao structureGalleryDao,
                            IStructureMemberDao structureMemberDao,
                            IStructureMessageDao structureMessageDao,
                            IStructureWorkingHourDao structureWorkingHourDao,
                            IStructureWorkingHourDayDao structureWorkingHourDayDao,
                            IStructureWorkingHourTimeSlotDao structureWorkingHourTimeSlotDao,
                            IStructurePortfolioDao structurePortfolioDao,
                            IStructurePortfolioDocumentDao structurePortfolioDocumentDao,
                            IProfileTemplateDao profileTemplateDao,
                            IShopDao shopDao,
                            IShopProductCategoryDao shopProductCategoryDao,
                            ISlugLogDao slugLogDao,
                            IStructureAttrributeDao structureAttrributeDao,
                            IStructureAttrributeDetailDao structureAttrributeDetailDao,
                            IStructureEducationDao structureEducationDao,
                            IStructureEducationMediumDao structureEducationMediumDao,
                            IStructureEducationSkillDao structureEducationSkillDao,
                            IStructureExperienceDao structureExperienceDao,
                            IStructureExperienceMediumDao structureExperienceMediumDao,
                            IStructureExperienceSkillDao structureExperienceSkillDao,
                            IStructureOptionDao structureOptionDao,
                            IStructureOptionDetailDao structureOptionDetailDao,
                            IStructureProductDao structureProductDao,
                            IStructureProductDocumentDao structureProductDocumentDao,
                            IStructureProductShopProductCategoryDao structureProductShopProductCategoryDao,
                            IStructureProductStructureOptionDetailDao structureProductStructureOptionDetailDao,
                            IStructureProductStructureProductAttrributeDetailDao structureProductStructureProductAttrributeDetailDao)
        {
            _dbContext = dbContext;
            User_StructureDao = user_StructureRepository;
            AspNetRoleClaimDao = aspNetRoleClaimRepository;
            AspNetRoleDao = aspNetRoleRepository;
            AspNetUserClaimDao = aspNetUserClaimRepository;
            AspNetUserLoginDao = aspNetUserLoginRepository;
            AspNetUserDao = aspNetUserRepository;
            AspNetUserTokenDao = aspNetUserTokenRepository;
            CompanyDao = companyRepository;
            DocumentDao = documentRepository;
            ParameterDao = parameterRepository;
            PermissionDao = permissionRepository;
            PersonDao = personRepository;
            Role_PermissionDao = role_PermissionRepository;
            StructureDao = structureRepository;
            TenantDao = tenantRepository;
            MailRecipientTypeDao = mailRecipientTypeDao;
            MailRecipientDao = mailRecipientDao;
            MailServerSettingDao = mailServerSettingDao;
            MailStateDao = mailStateDao;
            MailToSendDao = mailToSendDao;
            MailToSendDocumentDao = mailToSendDocumentDao;
            ActionLogDao = actionLogDao;
            StructureTypeDao = structureTypeDao;
            TenantProductDao = tenantProductDao;
            AddressDao = addressDao;
            SocialNetworkDao = socialNetworkDao;
            StructureSocialNetworkDao = structureSocialNetworkDao;
            StructureAddressDao = structureAddressDao;
            StructureContactDao = structureContactDao;
            IntegrationTypeDao = integrationTypeDao;
            IntegrationStateDao = integrationStateDao;
            IntegrationDetailActionTypeDao = integrationDetailActionTypeDao;
            IntegrationDetailActionDao = integrationDetailActionDao;
            IntegrationDetailDao = integrationDetailDao;
            IntegrationDao = integrationDao;
            StructureFieldDao = structureFieldDao;
            StructureStructureFieldDao = structureStructureFieldDao;
            StructureStructureCategoryDao = structureStructureCategoryDao;
            StructureStructureTagDao = structureStructureTagDao;
            SubscriberDao = subscriberDao;
            StructureCategoryDao = structureCategoryDao;
            StructureAccordionDao = structureAccordionDao;
            StructureFeatureDao = structureFeatureDao;
            StructureTagDao = structureTagDao;
            StructureGalleryDao = structureGalleryDao;
            StructureMemberDao = structureMemberDao;
            StructureMessageDao = structureMessageDao;
            StructureWorkingHourDao = structureWorkingHourDao;
            StructureWorkingHourDayDao = structureWorkingHourDayDao;
            StructureWorkingHourTimeSlotDao = structureWorkingHourTimeSlotDao;
            StructurePortfolioDao = structurePortfolioDao;
            StructurePortfolioDocumentDao = structurePortfolioDocumentDao;
        
            ProfileTemplateDao = profileTemplateDao;
            ShopDao = shopDao;
            ShopProductCategoryDao = shopProductCategoryDao;
            SlugLogDao = slugLogDao;
            StructureAttrributeDao = structureAttrributeDao;
            StructureAttrributeDetailDao = structureAttrributeDetailDao;
            StructureEducationDao = structureEducationDao;
            StructureEducationMediumDao = structureEducationMediumDao;
            StructureEducationSkillDao = structureEducationSkillDao;
            StructureExperienceDao = structureExperienceDao;
            StructureExperienceMediumDao = structureExperienceMediumDao;
            StructureExperienceSkillDao = structureExperienceSkillDao;
            StructureOptionDao = structureOptionDao;
            StructureOptionDetailDao = structureOptionDetailDao;
            StructureProductDao = structureProductDao;
            StructureProductDocumentDao = structureProductDocumentDao;
            StructureProductShopProductCategoryDao = structureProductShopProductCategoryDao;
            StructureProductStructureOptionDetailDao = structureProductStructureOptionDetailDao;
            StructureProductStructureProductAttrributeDetailDao = structureProductStructureProductAttrributeDetailDao;
        }

        public int Save()
        {
            return _dbContext.SaveChanges();
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                _dbContext.Dispose();
            }
        }

    }
}
