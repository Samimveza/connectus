using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MailSender.Model
{
    public class ExcelMailTemplate
    {
        public string ClientName { get; set; }
        public List<string> ClientEmail { get; set; }
        public List<string> CCEmail { get; set; }
        public List<string> BCCEmail { get; set; }
    }
}
