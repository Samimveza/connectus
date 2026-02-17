using iTextSharp.text.pdf;
using QRCoder;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using iTextSharp.text;
using iTextSharp.text.pdf;
using System.Xml.Linq;
using System.Runtime.Remoting.Messaging;
using iTextSharp.text.pdf.qrcode;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using static QRCoder.ArtQRCode;
using Encoder = ZXing.QrCode.Internal.Encoder;
using System.Threading;
using OpenQA.Selenium.Chrome;
using ZXing;

namespace CardGeneratorApp
{
    public class CardGeneratorService
    {
        public void StartGeneration(string qrCode, string number)
        {
            GenerateQRCode(qrCode, number);
        }

        public void GenerateQRCode(string qrCode, string number)
        {
            // Generate QR code
            var cardFolder = ConfigurationManager.AppSettings["CardFolder"];
            var fontPath = ConfigurationManager.AppSettings["FontPath"];

            var cardBackTemplate = Path.Combine(cardFolder, "ConnectUsBack.pdf");

            var folderForGeneration = Path.Combine(cardFolder, DateTime.Now.ToString("yyyy-MM-dd-hh-mm-ss"));

            System.IO.Directory.CreateDirectory(folderForGeneration);

            byte[] zxingQr = GenerateQrCodeFile(qrCode, folderForGeneration);

            byte[] barcodeBytes = GenerateBarcode(number, folderForGeneration);

            string outputPath = Path.Combine(folderForGeneration, number + ".pdf");

            using (var reader = new PdfReader(cardBackTemplate))
            {
                using (FileStream fs = new FileStream(outputPath, FileMode.Create, FileAccess.Write, FileShare.None))
                {
                    using (PdfStamper stamper = new PdfStamper(reader, fs))
                    {
                        // Get the image instance from byte array
                        iTextSharp.text.Image image = iTextSharp.text.Image.GetInstance(zxingQr);
                        image.SetAbsolutePosition(26.3f, 106f); // Set position\
                        image.ScalePercent(15f);
                        PdfContentByte content = stamper.GetOverContent(1);
                        content.AddImage(image);

                        //Barcode
                        // Get the barcode image from byte array and set position
                        iTextSharp.text.Image barcodeImage = iTextSharp.text.Image.GetInstance(barcodeBytes);
                        barcodeImage.SetAbsolutePosition(26.3f + 4.5f, 106f); // Adjusted position for the barcode
                        barcodeImage.ScaleAbsolute(150f, 50f); // Scale the barcode to fit

                        // Add barcode to the PDF
                        content.AddImage(barcodeImage);

                        // Set font and size for the text
                        BaseFont ocrBFont = BaseFont.CreateFont(fontPath, BaseFont.WINANSI, BaseFont.EMBEDDED);
                        content.BeginText();
                        content.SetFontAndSize(ocrBFont, 8); // Set the font and size
                        content.SetColorFill(BaseColor.WHITE);
                        content.SetTextMatrix(26.3f + 3.5f, 106f - 43f); // Set the starting position for the text

                        content.SetTextRise(12); // Set the rise for the text
                        content.SetWordSpacing(1); // Set the word spacing for the text

                        content.ShowText(number); // Add the text
                        content.EndText();

                        stamper.Close();
                    }
                    fs.Close();
                }
                reader.Close();
            }
        }


        public byte[] GenerateQrCodeFile(string code, string folderForQrGeneration)
        {
            string chromeDriverPath = ConfigurationManager.AppSettings["ChromeDriverPath"];
            var chromeOptions = new ChromeOptions();
            chromeOptions.AddArgument("--headless");

            using (var driver = new ChromeDriver(chromeDriverPath, chromeOptions))
            {
                string fileName = string.Format("qrcode_{0}_{1}", SanitizeFileName(code), Guid.NewGuid().ToString());
                string url = String.Format("https://qrgenerator.mosociete.com/?url={0}&name={1}", code, fileName);

                driver.Navigate().GoToUrl(url);

                // Wait for the page to load and QR code to be generated
                Thread.Sleep(5000); // Adjust based on the time taken to load

                // Execute JavaScript to get the base64 QR code
                var base64QrCode = (string)driver.ExecuteScript("return window.getQrCodeAsBase64();");

                if (!string.IsNullOrEmpty(base64QrCode))
                {
                    // Convert base64 string to byte array
                    string base64Data = base64QrCode.Split(',')[1]; // Strip off the base64 metadata prefix
                    byte[] qrCodeBytes = Convert.FromBase64String(base64Data);

                    // Save the QR code image as a .png file
                    string filePath = Path.Combine(folderForQrGeneration, fileName + ".png");
                    File.WriteAllBytes(filePath, qrCodeBytes);

                    // Return the byte array
                    return qrCodeBytes;
                }
            }

            return null;
        }


        // Method to generate barcode using ZXing.Net
        public byte[] GenerateBarcode(string data, string folderForQrGeneration)
        {
            BarcodeWriter barcodeWriter = new BarcodeWriter
            {
                Format = BarcodeFormat.CODE_128, // You can change this to the type of barcode you need (CODE_39, EAN_13, etc.)
                Options = new ZXing.Common.EncodingOptions
                {
                    Height = 75, // Height of the barcode
                    Width = 350,  // Width of the barcode
                    Margin = 1,    // Margin
                    NoPadding = true,
                    GS1Format = true,
                    PureBarcode = true,
                }
            };

            using (Bitmap bitmap = barcodeWriter.Write(data))
            {
                using (MemoryStream stream = new MemoryStream())
                {
                    bitmap.Save(stream, ImageFormat.Png);
                    byte[] barcodeBytes = stream.ToArray();

                    string fileName = string.Format("barcode_{0}_{1}", SanitizeFileName(data), Guid.NewGuid().ToString());
                    string filePath = Path.Combine(folderForQrGeneration, fileName + ".png");
                    File.WriteAllBytes(filePath, barcodeBytes);

                    return barcodeBytes;
                }
            }
        }


        public string SanitizeFileName(string fileName)
        {
            // Get invalid file name characters
            char[] invalidChars = Path.GetInvalidFileNameChars();

            // Replace invalid characters with an underscore
            string sanitizedFileName = new string(fileName
                .Select(ch => invalidChars.Contains(ch) ? '_' : ch)
                .ToArray());

            // Optional: trim leading or trailing spaces
            sanitizedFileName = sanitizedFileName.Trim();

            // Return sanitized file name
            return sanitizedFileName;
        }
    }
}
