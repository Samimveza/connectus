using Business.Common;
using Business.Dto.Request;
using Business.Dto.Response;
using Business.Dto.Request.Integration;
using Business.Dto.Response.Integration;
using Business.Model;
using Data.Interfaces;
using Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Business.Enums.Constants;
using Data.Source;
using System.Net.Http;
using System.Text.Json;
using Microsoft.Extensions.Configuration;
using Business.Dto.Request.IntegrationGateway;
using Business.Dto.Response.IntegrationGateway;
using System.Text.Json.Serialization;
using Newtonsoft.Json;
using Business.Dto;
using System.Net.Http.Headers;
using Newtonsoft.Json.Converters;
using System.Dynamic;
using Microsoft.VisualBasic;

namespace Service.IntegrationGateway
{
    public class CeleroIntegrationGatewayService : IIntegrationGatewayBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;

        public CeleroIntegrationGatewayService(
            IUnitOfWork unitOfWork,
            HttpClient httpClient,
            IConfiguration configuration)
        {
            _unitOfWork = unitOfWork;
            _httpClient = httpClient;
            _configuration = configuration;
        }

        public async Task<bool> Initialize(string idIntegration, Dictionary<string, string> parameters)
        {
            bool result = false;

            Integration integration = _unitOfWork.IntegrationDao.GetCustom(
                i => i.IdIntegration == idIntegration,
                new List<string>() { "IdIntegrationTypeNavigation" }
            );

            if (integration == null)
                throw new Exception("Integration not found");

            try
            {
                parameters.Add("identifier", integration.TokenIdentifier);

                CeleroIntegrationGatewayResponse response = await CallExternalApi(parameters);
                //Console.WriteLine($"Response: {JsonConvert.SerializeObject(response)}");
                if (response != null)
                {
                    response.Items.ForEach(i =>
                    {
                        IntegrationDetail integrationDetail = new IntegrationDetail()
                        {
                            IdIntegration = integration.IdIntegration,
                            DateAdded = i.InvoiceDate,
                            ExternalIdentifier = i.Identifier,
                            Name = i.InvoiceNumber,
                            ExternalState = i.PaymentState,
                            Description = FormatExternalData(i, integration.IdIntegrationTypeNavigation.Name),
                            ExternalData = JsonConvert.SerializeObject(i),
                        };

                        integrationDetail.IntegrationDetailActions = new List<IntegrationDetailAction>();
                        integrationDetail.IntegrationDetailActions.Add(new IntegrationDetailAction()
                        {
                            IdIntegrationDetail = integrationDetail.IdIntegrationDetail,
                            Name = "Pay Now If Unpaid",
                            IdIntegrationDetailActionType = IntegrationDetailActionTypeConstant.OPEN_URL,
                            Parameter = JsonConvert.SerializeObject(new Dictionary<string, string>() {
                                {  "Url", i.LinkForPayment }
                            })
                        });

                        integrationDetail.IntegrationDetailActions.Add(new IntegrationDetailAction()
                        {
                            IdIntegrationDetail = integrationDetail.IdIntegrationDetail,
                            Name = "Download Invoice",
                            IdIntegrationDetailActionType = IntegrationDetailActionTypeConstant.DOWNLOAD_FILE,
                            Parameter = JsonConvert.SerializeObject(new Dictionary<string, string>() {
                                {  "IdDocument", i.IdLinkForInvoiceDocument }
                            })
                        });

                        integration.IntegrationDetails.Add(integrationDetail);

                    });
                    integration.IdIntegrationState = IntegrationStateConstant.INITIALIZATION_SUCCESS;
                }
                else
                {
                    integration.IdIntegrationState = IntegrationStateConstant.INITIALIZATION_FAILURE;
                }

            }
            catch (Exception ex)
            {
                integration.IdIntegrationState = IntegrationStateConstant.INITIALIZATION_FAILURE;
            }

            //save the data in the database
            _unitOfWork.Save();
            result = true;

            return result;
        }

        public string FormatExternalData(CeleroIntegrationGatewayItemResponse celeroIntegrationGatewayItemResponse, string integrationTypeName)
        {
            string result = string.Empty;

            var foramtterPath = _configuration["Formatters:BasePath"];
            var fileName = _configuration[String.Format("Formatters:{0}", integrationTypeName)];
            var formatterPath = Path.Combine(foramtterPath, fileName);

            var templateContent = File.ReadAllText(formatterPath);

            if (string.IsNullOrWhiteSpace(templateContent))
            {
                throw new Exception($"Formatter template is empty at path: {formatterPath}");
            }

            result = templateContent
                .Replace("{{Identifier}}", celeroIntegrationGatewayItemResponse.Identifier ?? "")
                .Replace("{{InvoiceNumber}}", celeroIntegrationGatewayItemResponse.InvoiceNumber ?? "")
                .Replace("{{InvoiceDate}}", celeroIntegrationGatewayItemResponse.InvoiceDate?.ToString("dd-MM-yyyy") ?? "")
                .Replace("{{ConsigneeName}}", celeroIntegrationGatewayItemResponse.ConsigneeName ?? "")
                .Replace("{{ConsigneeAddress}}", celeroIntegrationGatewayItemResponse.ConsigneeAddress ?? "")
                .Replace("{{ConsigneeTelephone}}", celeroIntegrationGatewayItemResponse.ConsigneeTelephobe ?? "")
                .Replace("{{ConsigneeEmail}}", celeroIntegrationGatewayItemResponse.ConsigneeEmail ?? "")
                .Replace("{{AWBNumber}}", celeroIntegrationGatewayItemResponse.AWBNumber ?? "")
                .Replace("{{ShipperName}}", celeroIntegrationGatewayItemResponse.ShipperName ?? "")
                .Replace("{{ShipmentContents}}", celeroIntegrationGatewayItemResponse.ShipmentContents ?? "")
                .Replace("{{GrandTotal}}", celeroIntegrationGatewayItemResponse.GrandTotal?.ToString("F2") ?? "")
                .Replace("{{Currency}}", celeroIntegrationGatewayItemResponse.Currency ?? "")
                .Replace("{{PaymentMethod}}", celeroIntegrationGatewayItemResponse.PaymentMethod ?? "")
                .Replace("{{DatePaid}}", celeroIntegrationGatewayItemResponse.DatePaid?.ToString("yyyy-MM-dd") ?? "")
                .Replace("{{BankReference}}", celeroIntegrationGatewayItemResponse.BankReference ?? "")
                .Replace("{{LinkForPayment}}", celeroIntegrationGatewayItemResponse.LinkForPayment ?? "")
                .Replace("{{IdLinkForInvoiceDocument}}", celeroIntegrationGatewayItemResponse.IdLinkForInvoiceDocument ?? "")
                .Replace("{{PaymentState}}", celeroIntegrationGatewayItemResponse.PaymentState ?? "");

            return result;
        }

        private async Task<CeleroIntegrationGatewayResponse> CallExternalApi(Dictionary<string, string> parameters)
        {
            try
            {
                var baseUrl = _configuration["CeleroApi:BaseUrl"];
                var endpoint = _configuration["CeleroApi:InitializeEndpoint"];
                var apiKey = _configuration["CeleroApi:ApiKey"];

                var url = $"{baseUrl}/{endpoint}";

                var content = new StringContent(
                    System.Text.Json.JsonSerializer.Serialize(parameters),
                    Encoding.UTF8,
                    "application/json"
                );

                _httpClient.DefaultRequestHeaders.Add("X-API-Key", apiKey);

                var response = await _httpClient.PostAsync(url, content);

                if (response.IsSuccessStatusCode)
                {
                    var responseContent = await response.Content.ReadAsStringAsync();

                    var options = new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    };

                    // Process response if needed
                    CeleroIntegrationGatewayResponse celeroIntegrationGatewayResponse = System.Text.Json.JsonSerializer.Deserialize<BaseResponse<CeleroIntegrationGatewayResponse>>(responseContent, options).Result;
                    return celeroIntegrationGatewayResponse;
                }

                return null;
            }
            catch (Exception ex)
            {
                // Log error here
                return null;
            }
        }

        public IntegrationDownloadFileResponse DownloadFile(string idIntegrationDetailAction)
        {
            IntegrationDownloadFileResponse result = new IntegrationDownloadFileResponse();
            try
            {
                string downloadEndpoint = _configuration["CeleroApi:DownloadFileEndpoint"];

                IntegrationDetailAction integrationDetailAction = _unitOfWork.IntegrationDetailActionDao.GetCustom(
                              i => i.IdIntegrationDetailAction == idIntegrationDetailAction,
                              new List<string>() { "IdIntegrationDetailNavigation.IdIntegrationNavigation" }
                          );

                if (integrationDetailAction == null)
                    throw new Exception("Integration not found");

                var token =  AuthenticateAsync().GetAwaiter().GetResult();
                if (string.IsNullOrEmpty(token))
                    throw new Exception("Authentication failed");



                // Step 2: Call GET endpoint with Bearer token
                var expandoConverter = new ExpandoObjectConverter();
                dynamic obj = JsonConvert.DeserializeObject<ExpandoObject>(integrationDetailAction.Parameter, expandoConverter);
                var dict = obj as IDictionary<string, object>;

                string idDocument = null;

                if (dict.ContainsKey("IdDocument") && dict["IdDocument"] != null)
                {
                    idDocument = dict["IdDocument"]?.ToString();
                }
                else
                {
                    throw new Exception("Documwnt not found");
                }


                var request = new HttpRequestMessage(HttpMethod.Get, $"{downloadEndpoint}/{idDocument}");
                request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);

                var response =  _httpClient.SendAsync(request).GetAwaiter().GetResult();
                if (!response.IsSuccessStatusCode)
                    throw new Exception($"Failed to get file: {response.StatusCode}");

                result.FileStream = response.Content.ReadAsStream();
                result.ContentType = response.Content.Headers?.ContentType?.ToString(); 

                if (response.Content.Headers.ContentDisposition != null)
                {
                    result.FileNameWithExtension = response.Content.Headers.ContentDisposition.FileName?.Trim('\"');
                }
                else
                {
                    // fallback: extract manually from header or default to ID
                    if (response.Content.Headers.TryGetValues("Content-Disposition", out var contentDispositionValues))
                    {
                        var contentDisposition = contentDispositionValues.FirstOrDefault();
                        if (contentDisposition != null && contentDisposition.Contains("filename="))
                        {
                            var fileName = contentDisposition.Split("filename=").Last().Trim('\"');
                            result.FileNameWithExtension = fileName;
                        }
                    }

                    if (string.IsNullOrEmpty(result.FileNameWithExtension))
                    {
                        result.FileNameWithExtension = idDocument + ".bin"; // fallback
                    }



                }

                return result;

            }
            catch (Exception ex)
            {

            }

            return result;
        }


        private async Task<string> AuthenticateAsync()
        {
            var domain = _configuration["CeleroApi:Domain"];
            var username = _configuration["CeleroApi:Username"];
            var password = _configuration["CeleroApi:Password"];
            var authEndpoint = _configuration["CeleroApi:AuthEndpoint"];

            var authUrl = "https://celero.mosociete.com/api/authenticate";
            var payload = new
            {
                domain = domain,
                username = username,
                password = password
            };

            var json = System.Text.Json.JsonSerializer.Serialize(payload);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync(authUrl, content);
            if (!response.IsSuccessStatusCode)
                return null;

            var responseBody = await response.Content.ReadAsStringAsync();

            // Parse token from response — assuming structure: { "token": "...." }
            using var doc = System.Text.Json.JsonDocument.Parse(responseBody);
            var token = doc.RootElement
               .GetProperty("result")
               .GetProperty("token")
               .GetString();

            return token;
        }



    }
}
