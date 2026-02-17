using Business.Dto.Response;
using Business.Dto.Response.Integration;
using Business.Model;
using Data.Interfaces;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Threading.Tasks;
using static Business.Enums.Constants;

namespace Service.IntegrationGateway
{
    public class IntegrationGatewayResolver
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IServiceProvider _serviceProvider;

        public IntegrationGatewayResolver(
            IUnitOfWork unitOfWork,
            IServiceProvider serviceProvider)
        {
            _unitOfWork = unitOfWork;
            _serviceProvider = serviceProvider;
        }

        public async Task<bool> ResolveAndInitialize(string idIntegration, Dictionary<string, string> parameters)
        {
            Integration integration = _unitOfWork.IntegrationDao.GetCustom(
                i => i.IdIntegration == idIntegration,
                new List<string>() { "IdIntegrationTypeNavigation" }
            );

            if (integration == null)
                throw new Exception("Integration not found");

            IIntegrationGatewayBase gateway = null;

            // Resolve the appropriate gateway based on integration type
            switch (integration.IdIntegrationType)
            {
                case IntegrationTypeConstant.CELERO: // Celero Integration
                    gateway = _serviceProvider.GetRequiredService<CeleroIntegrationGatewayService>();
                    break;

                default:
                    throw new Exception("Unsupported integration type");
            }

            return await gateway.Initialize(idIntegration,parameters);
        }

        public IntegrationDownloadFileResponse DownloadFile(string idIntegrationDetailAction)
        {
            IntegrationDetailAction integrationDetailAction = _unitOfWork.IntegrationDetailActionDao.GetCustom(
                i => i.IdIntegrationDetailAction == idIntegrationDetailAction,
                new List<string>() { "IdIntegrationDetailNavigation.IdIntegrationNavigation" }
            );

            if (integrationDetailAction == null)
                throw new Exception("Integration not found");

            IIntegrationGatewayBase gateway = null;

            // Resolve the appropriate gateway based on integration type
            switch (integrationDetailAction.IdIntegrationDetailNavigation.IdIntegrationNavigation.IdIntegrationType)
            {
                case IntegrationTypeConstant.CELERO: // Celero Integration
                    gateway = _serviceProvider.GetRequiredService<CeleroIntegrationGatewayService>();
                    break;

                default:
                    throw new Exception("Unsupported integration type");
            }

            return gateway.DownloadFile(idIntegrationDetailAction);
        }
    }
} 