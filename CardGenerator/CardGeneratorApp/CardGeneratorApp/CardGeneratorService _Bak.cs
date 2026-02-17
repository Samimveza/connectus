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

            var bitmapImage = GenerateQRCodeImage(qrCode, 1500, 1500);
            byte[] zxingQr;
            using (var memoryStream = new MemoryStream())
            {
                bitmapImage.Save(memoryStream, ImageFormat.Png);

                zxingQr = memoryStream.ToArray();
            }

            float xPosition = 26.3f; // X position where you want to add the image
            float yPosition = 106f; // Y position where you want to add the image
            string outputPath = Path.Combine(folderForGeneration, number + ".pdf");

            using (var reader = new PdfReader(cardBackTemplate))
            {
                using (FileStream fs = new FileStream(outputPath, FileMode.Create, FileAccess.Write, FileShare.None))
                {
                    using (PdfStamper stamper = new PdfStamper(reader, fs))
                    {
                        // Get the image instance from byte array
                        iTextSharp.text.Image image = iTextSharp.text.Image.GetInstance(zxingQr);
                        image.SetAbsolutePosition(xPosition, yPosition); // Set position

                        image.ScalePercent(15f);

                        PdfContentByte content = stamper.GetOverContent(1);
                        content.AddImage(image);



                        // Set font and size for the text
                        BaseFont ocrBFont = BaseFont.CreateFont(fontPath, BaseFont.WINANSI, BaseFont.EMBEDDED);
                        content.BeginText();
                        content.SetFontAndSize(ocrBFont, 12); // Set the font and size
                        content.SetColorFill(BaseColor.WHITE);
                        content.SetTextMatrix(xPosition + 3.5f, yPosition - 43f); // Set the starting position for the text

                        content.SetTextRise(12); // Set the rise for the text
                        content.SetWordSpacing(1); // Set the word spacing for the text

                        //content.SetTextRenderingMode(PdfContentByte.TEXT_RENDER_MODE_FILL_STROKE);
                        //content.SetLineWidth(0.5f); // Adjust this value as needed to simulate boldness


                        content.ShowText(number); // Add the text
                        content.EndText();


                        //BaseFont baseFont = BaseFont.CreateFont(fontPath, BaseFont.WINANSI, BaseFont.NOT_EMBEDDED);
                        //content.SetFontAndSize(baseFont, 12);

                        //content.SetRGBColorFill(0, 0, 0);

                        //float textXPosition = xPosition + 12; // This could be the same as your image or different
                        //float textYPosition = yPosition - 31; // Positioning the text below the image (adjust as needed)

                        //content.BeginText();
                        //content.ShowTextAligned(PdfContentByte.ALIGN_LEFT, number, textXPosition, textYPosition, 0);
                        //content.EndText();



                        stamper.Close();
                    }
                    fs.Close();
                }
                reader.Close();
            }
        }


        private Bitmap GenerateQRCodeImage(string text, int width, int height)
        {
            Dictionary<ZXing.EncodeHintType, object> encodingHints = new Dictionary<ZXing.EncodeHintType, object>
            {
                { ZXing.EncodeHintType.CHARACTER_SET, "UTF-8" }
            };

            ZXing.QrCode.Internal.QRCode code = Encoder.encode(text, ZXing.QrCode.Internal.ErrorCorrectionLevel.H, encodingHints);
            Bitmap image = RenderQRImage(code, width, height, 0);

            using (var memoryStream = new MemoryStream())
            {
                image.Save(memoryStream, ImageFormat.Png);
            }

            return image;
        }

        private Bitmap RenderQRImage(ZXing.QrCode.Internal.QRCode code, int width, int height, int quietZone)
        {
            Bitmap image = new Bitmap(width, height);
            using (Graphics graphics = Graphics.FromImage(image))
            {
                graphics.SmoothingMode = SmoothingMode.HighQuality;
                graphics.PixelOffsetMode = PixelOffsetMode.HighQuality;

                graphics.Clear(Color.Transparent);
                graphics.DrawImage(image, 0, 0, width, height);

                ZXing.QrCode.Internal.ByteMatrix input = code.Matrix;
                if (input == null)
                {
                    throw new InvalidOperationException();
                }
                int inputWidth = input.Width;
                int inputHeight = input.Height;
                int qrWidth = inputWidth + (quietZone * 2);
                int qrHeight = inputHeight + (quietZone * 2);
                int outputWidth = Math.Max(width, qrWidth);
                int outputHeight = Math.Max(height, qrHeight);

                int multiple = Math.Min(outputWidth / qrWidth, outputHeight / qrHeight);
                int leftPadding = (outputWidth - (inputWidth * multiple)) / 2;
                int topPadding = (outputHeight - (inputHeight * multiple)) / 2;
                const int FINDER_PATTERN_SIZE = 7;
                const float CIRCLE_SCALE_DOWN_FACTOR = 21f / 30f;
                int circleSize = (int)(multiple * CIRCLE_SCALE_DOWN_FACTOR);

                for (int inputY = 0, outputY = topPadding; inputY < inputHeight; inputY++, outputY += multiple)
                {
                    for (int inputX = 0, outputX = leftPadding; inputX < inputWidth; inputX++, outputX += multiple)
                    {
                        if (input[inputX, inputY] == 1)
                        {
                            if (!(inputX <= FINDER_PATTERN_SIZE && inputY <= FINDER_PATTERN_SIZE ||
                                  inputX >= inputWidth - FINDER_PATTERN_SIZE && inputY <= FINDER_PATTERN_SIZE ||
                                  inputX <= FINDER_PATTERN_SIZE && inputY >= inputHeight - FINDER_PATTERN_SIZE))
                            {
                                graphics.FillEllipse(Brushes.White, outputX, outputY, circleSize, circleSize);
                            }
                        }
                    }
                }

                int circleDiameter = multiple * FINDER_PATTERN_SIZE;
                DrawFinderPatternCircleStyle(graphics, leftPadding, topPadding, circleDiameter);
                DrawFinderPatternCircleStyle(graphics, leftPadding + (inputWidth - FINDER_PATTERN_SIZE) * multiple, topPadding, circleDiameter);
                DrawFinderPatternCircleStyle(graphics, leftPadding, topPadding + (inputHeight - FINDER_PATTERN_SIZE) * multiple, circleDiameter);
            }

            return image;
        }

        private void DrawFinderPatternCircleStyle(Graphics graphics, int x, int y, int circleDiameter)
        {
            // Set the graphics object's smoothing mode to anti-alias to get smoother edges
            graphics.SmoothingMode = SmoothingMode.HighQuality;

            // Set pixel offset mode to high-quality
            graphics.PixelOffsetMode = PixelOffsetMode.HighQuality;

            // Outer and inner black circle diameters remain the same
            var OUTER_CIRCLE_DIAMETER = circleDiameter;
            var INNER_DOT_DIAMETER = 3 * circleDiameter / 7;
            var INNER_DOT_OFFSET = 2 * circleDiameter / 7;

            // Calculate the diameter and offset for the transparent middle circle
            var MIDDLE_CIRCLE_DIAMETER = 5 * circleDiameter / 7;
            var MIDDLE_CIRCLE_OFFSET = circleDiameter / 7;

            // Create a path for the outer circle
            GraphicsPath outerCirclePath = new GraphicsPath();
            outerCirclePath.AddEllipse(x, y, OUTER_CIRCLE_DIAMETER, OUTER_CIRCLE_DIAMETER);

            // Create a path for the middle circle
            GraphicsPath middleCirclePath = new GraphicsPath();
            middleCirclePath.AddEllipse(x + MIDDLE_CIRCLE_OFFSET, y + MIDDLE_CIRCLE_OFFSET, MIDDLE_CIRCLE_DIAMETER, MIDDLE_CIRCLE_DIAMETER);

            // Combine the two paths to create a donut shape
            Region region = new Region(outerCirclePath);
            region.Exclude(middleCirclePath);

            // Fill the region representing the donut shape
            graphics.FillRegion(Brushes.White, region);

            // Draw the inner black dot
            graphics.FillEllipse(Brushes.White, x + INNER_DOT_OFFSET, y + INNER_DOT_OFFSET, INNER_DOT_DIAMETER, INNER_DOT_DIAMETER);
        }

    }
}
