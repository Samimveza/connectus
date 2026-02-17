using MailSender.Model;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MailSender.Service
{
    public class MailCreatorService
    {
        public string ReplaceContent(string template, Dictionary<string, string> contents)
        {
            string replacedTemplate = template;

            foreach (KeyValuePair<string, string> entry in contents)
            {
                replacedTemplate =  replacedTemplate.Replace(entry.Key, entry.Value);
            }

            return replacedTemplate;
        }
    }
}
