using Business.Dto.Response;
using Business.Dto.Response.Integration;
using System;
using System.Threading.Tasks;

namespace Service.IntegrationGateway
{
    public interface IIntegrationGatewayBase
    {
        Task<bool> Initialize(string idIntegration, Dictionary<string, string> parameters);

        IntegrationDownloadFileResponse DownloadFile(string idIntegrationDetail);


    }
}