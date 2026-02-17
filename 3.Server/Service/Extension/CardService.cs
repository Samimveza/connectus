using Business.Common;
using Business.Dto.Request;
using Business.Dto.Response;
using Data.Interfaces;
using Microsoft.Extensions.Configuration;
using Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using QRCoder;
using static QRCoder.QRCodeData;
using System.Xml.Linq;
using SixLabors.ImageSharp;
using System.Reflection.PortableExecutable;



namespace Service.Extension
{
    public class CardService : Service.Interfaces.ICardService
    {
        public IUnitOfWork _unitOfWork;
        private readonly IGlobalDataService _globalDataService;
        private readonly IPermissionService _permissionService;
        private readonly IConfiguration _configuration;

        public CardService(
             IUnitOfWork unitOfWork
              , IGlobalDataService globalDataService
              , IPermissionService permissionService
            , IConfiguration configuration

            )
        {
            _unitOfWork = unitOfWork;
            _globalDataService = globalDataService;
            _configuration = configuration;
        }


        public BusinessResponse<GenerateCardResponse> GenerateCard(GenerateCardRequest request)
        {
            BusinessResponse<GenerateCardResponse> response = new BusinessResponse<GenerateCardResponse>();
            try
            {
                response.Result = GenerateCardRaw(request);
            }
            catch (Exception ex)
            {
                response.Exception = new BusinessLayerException(ex.Message, ex);
            }

            return response;
        }

        public GenerateCardResponse GenerateCardRaw(GenerateCardRequest request)
        {
            GenerateCardResponse generateCardResponse = new GenerateCardResponse();

            return generateCardResponse;
        }

        public BusinessResponse<GenerateNewCardResponse> GenerateNewCard()
        {
            BusinessResponse<GenerateNewCardResponse> response = new BusinessResponse<GenerateNewCardResponse>();
            try
            {
                response.Result = GenerateNewCardRaw();
            }
            catch (Exception ex)
            {
                response.Exception = new BusinessLayerException(ex.Message, ex);
            }

            return response;
        }


        public GenerateNewCardResponse GenerateNewCardRaw()
        {
            GenerateNewCardResponse generateNewCardResponse = new GenerateNewCardResponse();
            generateNewCardResponse.Cards = new List<GenerateCardResponse>();

            var cardFolder = _configuration.GetSection("CardFolder");

            var cardBackTemplate = Path.Combine(cardFolder.Value, "ConnectUsBack.pdf");

            var folderForGeneration = Path.Combine(cardFolder.Value, DateTime.Now.ToString("yyyy-MM-dd-hh-mm-ss"));

            System.IO.Directory.CreateDirectory(folderForGeneration);

            var url = "https://connectus.mu/1234";
            var QrCode = "https://connectus.mu/1234?s=1";
            var nfcUrl = "https://connectus.mu/1234?s=2";
            var number = "1234 1234 1234";

            QRCodeGenerator qrGenerator = new QRCodeGenerator();
            QRCodeData qrCodeData = qrGenerator.CreateQrCode(QrCode, QRCodeGenerator.ECCLevel.Q);

            Base64QRCode qrCode = new Base64QRCode(qrCodeData);
            string qrCodeImageAsBase64 = qrCode.GetGraphic(20, Color.Black, Color.Transparent, true);

            //float xPosition = 100; // X position where you want to add the image
            //float yPosition = 500; // Y position where you want to add the image
            //string outputPath = Path.Combine(folderForGeneration, number + ".pdf");
            //PdfDocument pdfDoc = new PdfDocument(new PdfReader(cardBackTemplate), new PdfWriter(outputPath));
            //Document document = new Document(pdfDoc);

            //byte[] imageBytes = Convert.FromBase64String(qrCodeImageAsBase64);
            //ImageData imageData = ImageDataFactory.Create(imageBytes);
            //iText.Layout.Element.Image image = new iText.Layout.Element.Image(imageData).SetFixedPosition(xPosition, yPosition);

            //int numberOfPages = pdfDoc.GetNumberOfPages();
            //for (int i = 1; i <= numberOfPages; i++)
            //{
            //    // Add image to the specific page
            //    image.SetFixedPosition(i, xPosition, yPosition);
            //    document.Add(image);
            //}
            //document.Close();








            return generateNewCardResponse;
        }

        //public GenerateNewCardResponse GenerateNewCardRaw()
        //{
        //    GenerateNewCardResponse generateNewCardResponse = new GenerateNewCardResponse();
        //    generateNewCardResponse.Cards = new List<GenerateCardResponse>();

        //    var cardFolder = _configuration.GetSection("CardFolder");

        //    var cardBackTemplate = Path.Combine(cardFolder.Value, "smartcard-back.svg");

        //    var folderForGeneration = Path.Combine(cardFolder.Value, DateTime.Now.ToString("yyyy-MM-dd-hh-mm-ss"));

        //    System.IO.Directory.CreateDirectory(folderForGeneration);

        //    var url = "https://connectus.mu/1234";
        //    var QrCode = "https://connectus.mu/1234?s=1";
        //    var nfcUrl = "https://connectus.mu/1234?s=2";
        //    var number = "1234 1234 1234";

        //    QRCodeGenerator qrGenerator = new QRCodeGenerator();
        //    QRCodeData qrCodeData = qrGenerator.CreateQrCode(QrCode, QRCodeGenerator.ECCLevel.Q);



        //    Base64QRCode qrCode = new Base64QRCode(qrCodeData);
        //    string qrCodeImageAsBase64 = qrCode.GetGraphic(20, Color.Black, Color.Transparent,true);

        //    XDocument svgDoc = XDocument.Load(cardBackTemplate);
        //    XNamespace ns = "http://www.w3.org/2000/svg";

        //    XElement rect = svgDoc.Descendants(ns + "rect").FirstOrDefault(r => r.Attribute("id")?.Value == "rect1098");


        //    string x = rect.Attribute("x")?.Value;
        //    string y = rect.Attribute("y")?.Value;
        //    string width = rect.Attribute("width")?.Value;
        //    string height = rect.Attribute("height")?.Value;

        //    XElement qrCodeImage = new XElement(ns + "image",
        //        new XAttribute("x", x),
        //        new XAttribute("y", y),
        //        new XAttribute("width", width),
        //        new XAttribute("height", height),
        //        new XAttribute("{http://www.w3.org/1999/xlink}href", $"data:image/png;base64,{qrCodeImageAsBase64}")
        //    );

        //    rect.AddAfterSelf(qrCodeImage);


        //    XElement numberRect = svgDoc.Descendants(ns + "rect").FirstOrDefault(r => r.Attribute("id")?.Value == "rect1108");

        //    double numberX = double.Parse(numberRect.Attribute("x")?.Value);
        //    double numberY = double.Parse(numberRect.Attribute("y")?.Value);
        //    double numberWidth = double.Parse(numberRect.Attribute("width")?.Value);
        //    double numberHeight = double.Parse(numberRect.Attribute("height")?.Value);

        //    double centerX = numberX + numberWidth / 2;
        //    double centerY = numberY + numberHeight / 2;

        //    XElement textElement = new XElement(ns + "text",
        //        new XAttribute("x", centerX),
        //        new XAttribute("y", centerY+0.4),
        //        new XAttribute("dominant-baseline", "middle"),
        //        new XAttribute("text-anchor", "middle"),
        //        new XAttribute("style", "font-style:normal;font-variant:normal;font-weight:600;font-stretch:normal;font-size:3.8px;line-height:1.25;font-family:sans-serif;font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;font-variation-settings:'wdth' 100, 'wght' 400;letter-spacing:0.264583px;white-space:pre;shape-inside:url(#rect4700);fill-opacity:1;stroke-opacity:1;stroke-width:0.1;stroke-miterlimit:4;stroke-dasharray:none;"),
        //        number);

        //    numberRect.AddAfterSelf(textElement);

        //    svgDoc.Save(Path.Combine(folderForGeneration, number + ".svg"));

        //    return generateNewCardResponse;
        //}
    }
}
