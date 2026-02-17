using MailKit.Net.Smtp;
using MailKit.Security;
using MailSender.Model;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System.Net.Mail;

namespace MailSender.Service
{
    public class MailManager
    {
        public MailCredential MailCredential { get; set; }
        public MailContent MailContent { get; set; }

        public MailManager(MailCredential mailCredential)
        {
            this.MailCredential = mailCredential;
        }

        public MailManager()
        {

        }

        public void SendMail(MailContent mailContent)
        {
            MailContent = mailContent;
            SendMail();
        }

        public void SendMail()
        {
            SendMailWithMailKit();
        }

        public void SendMailWithMailKit()
        {
            var message = new MimeMessage();

            // From
            var fromName = !string.IsNullOrEmpty(MailCredential.DefaultName) ? MailCredential.DefaultName : MailCredential.Username;
            message.From.Add(new MailboxAddress(fromName, MailCredential.Username));

            // Recipients
            foreach (var mr in MailContent.MailRecipients)
            {
                switch (mr.MailRecipientType)
                {
                    case MailRecipientTypeEnum.To:
                        message.To.Add(MailboxAddress.Parse(mr.MailAddress));
                        break;
                    case MailRecipientTypeEnum.Cc:
                        message.Cc.Add(MailboxAddress.Parse(mr.MailAddress));
                        break;
                    case MailRecipientTypeEnum.Bcc:
                        message.Bcc.Add(MailboxAddress.Parse(mr.MailAddress));
                        break;
                }
            }

            // Subject
            message.Subject = MailContent.Subject;

            // Body and attachments
            var builder = new BodyBuilder
            {
                HtmlBody = MailContent.Body
            };

            foreach (var ma in MailContent.MailAttachments)
            {
                if (!string.IsNullOrWhiteSpace(ma.Name))
                {
                    var mimeType = MimeKit.ContentType.Parse("application/octet-stream");
                    mimeType.Name = ma.Name;
                    builder.Attachments.Add(ma.Name, File.ReadAllBytes(ma.FilePath), mimeType);
                }
                else
                {
                    builder.Attachments.Add(ma.FilePath);
                }
            }

            message.Body = builder.ToMessageBody();

            // Send
            using (var client = new MailKit.Net.Smtp.SmtpClient())
            {
                try
                {
                    // Select the correct security option based on port
                    SecureSocketOptions socketOptions = MailCredential.Port == 465
                        ? SecureSocketOptions.SslOnConnect
                        : SecureSocketOptions.StartTls;

                    client.Connect(MailCredential.Host, MailCredential.Port, socketOptions);

                    client.Authenticate(MailCredential.Username, MailCredential.Password);

                    client.Send(message);
                    client.Disconnect(true);
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Error sending email: " + ex.Message);
                    throw;
                }
            }
        }

        public void SendMailWithSMTP()
        {
            System.Net.ServicePointManager.SecurityProtocol = System.Net.SecurityProtocolType.Tls | System.Net.SecurityProtocolType.Tls11 | System.Net.SecurityProtocolType.Tls12;

            using (System.Net.Mail.SmtpClient client = new System.Net.Mail.SmtpClient())
            {
                client.Port = MailCredential.Port;
                client.Host = MailCredential.Host;
                client.EnableSsl = MailCredential.UseSsl;
                client.UseDefaultCredentials = false;
                client.Credentials = new System.Net.NetworkCredential(MailCredential.Username, MailCredential.Password);

                MailMessage mail = new MailMessage();
                mail.From = new MailAddress(MailCredential.Username, !string.IsNullOrEmpty(MailCredential.DefaultName) ? MailCredential.DefaultName : MailCredential.Username);

                MailContent.MailRecipients.ForEach(mr =>
                {
                    if (mr.MailRecipientType == MailRecipientTypeEnum.To)
                    {
                        mail.To.Add(mr.MailAddress);
                    }
                    else if (mr.MailRecipientType == MailRecipientTypeEnum.Cc)
                    {
                        mail.CC.Add(mr.MailAddress);
                    }
                    else if (mr.MailRecipientType == MailRecipientTypeEnum.Bcc)
                    {
                        mail.Bcc.Add(mr.MailAddress);
                    }
                });

                MailContent.MailAttachments.ForEach(ma =>
                {
                    System.Net.Mail.Attachment attachment;

                    if (!String.IsNullOrWhiteSpace(ma.Name))
                    {
                        System.Net.Mime.ContentType contentType = new System.Net.Mime.ContentType();
                        contentType.MediaType = System.Net.Mime.MediaTypeNames.Application.Octet;
                        contentType.Name = ma.Name;
                        attachment = new System.Net.Mail.Attachment(ma.FilePath, contentType);
                    }
                    else
                    {
                        attachment = new System.Net.Mail.Attachment(ma.FilePath);
                    }
                    mail.Attachments.Add(attachment);
                });

                mail.BodyEncoding = UTF8Encoding.UTF8;
                //mail.DeliveryNotificationOptions = DeliveryNotificationOptions.OnFailure;
                mail.Subject = MailContent.Subject;
                mail.IsBodyHtml = true;
                mail.Body = MailContent.Body;
                client.Timeout = 100000;
                client.Send(mail);
            }
        }
    }
}

