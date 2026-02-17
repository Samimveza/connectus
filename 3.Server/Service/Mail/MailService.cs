using Business.Common;
using Business.Dto.Request;
using Business.Dto.Response;
using Business.Model;
using Data.Interfaces;
using MailSender.Model;
using MailSender.Service;
using Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Business.Enums.Constants;

namespace Service.Mail
{
    public class MailService : Service.Interfaces.IMailService
    {
        public IUnitOfWork _unitOfWork;
        private readonly IGlobalDataService _globalDataService;

        public MailService(
             IUnitOfWork unitOfWork,
              IGlobalDataService globalDataService
            )
        {
            _unitOfWork = unitOfWork;
            _globalDataService = globalDataService;
        }

        public BusinessResponse<SendMailResponse> SendMail(SendMailRequest sendMailRequest)
        {
            BusinessResponse<SendMailResponse> response = new BusinessResponse<SendMailResponse>();
            try
            {
                response.Result = SendMailRaw(sendMailRequest);
            }
            catch (Exception ex)
            {
                response.Exception = new BusinessLayerException(ex.Message, ex);
            }

            return response;
        }

        public SendMailResponse SendMailRaw(SendMailRequest sendMailRequest)
        {
            SendMailResponse sendMailResponse = new SendMailResponse();

            List<string> paramaterCodes = new List<string>() { sendMailRequest.SubjectParameter, sendMailRequest.EmailTemplateParameter };
            List<Parameter> parameters = _unitOfWork.ParameterDao.GetListCustom(-1, 0, p => paramaterCodes.Contains(p.Code), p => p.Code).EntityList;

            Parameter emailTemplate = parameters.Where(p => p.Code == sendMailRequest.EmailTemplateParameter).FirstOrDefault();
            Parameter subject = parameters.Where(p => p.Code == sendMailRequest.SubjectParameter).FirstOrDefault();

            MailServerSetting mailServerSetting = _unitOfWork.MailServerSettingDao.GetCustom(c => c.IsDeactivated != true);

            MailCreatorService mailCreatorService = new MailCreatorService();

            List<MailSender.Model.MailRecipient> mailRecipients = new List<MailSender.Model.MailRecipient>();
            mailRecipients.AddRange(sendMailRequest.To.Select(s => new MailSender.Model.MailRecipient()
            {
                MailAddress = s,
                MailRecipientType = MailRecipientTypeEnum.To
            }));

            if (sendMailRequest.CC != null)
            {
                mailRecipients.AddRange(sendMailRequest.CC.Select(s => new MailSender.Model.MailRecipient() {
                    MailAddress = s,
                    MailRecipientType = MailRecipientTypeEnum.Cc
                }));
            }

            MailManager mailManager = new MailManager();
            mailManager.MailCredential = new MailSender.Model.MailCredential()
            {
                DefaultName = mailServerSetting.DefaultName,
                Host = mailServerSetting.Host,
                Password = mailServerSetting.Password,
                Port = mailServerSetting.ClientPort.Value,
                Username = mailServerSetting.Username,
                UseSsl = mailServerSetting.UseSsl ?? false
            };
            mailManager.MailContent = new MailSender.Model.MailContent()
            {
                Body = mailCreatorService.ReplaceContent(emailTemplate.ParamaterValue, sendMailRequest.Replacements),
                Subject = mailCreatorService.ReplaceContent(subject.ParamaterValue, sendMailRequest.Replacements),
                MailRecipients = mailRecipients,
                MailAttachments = new List<MailAttachment>()
            };

            mailManager.SendMail();

            return sendMailResponse;
        }



    }
}