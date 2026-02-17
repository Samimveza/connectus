using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Dto.Request
{
    public class SendMailRequest
    {
        public string SubjectParameter { get; set; }
        public List<string> To { get; set; }
        public List<string> CC { get; set; }
        public string EmailTemplateParameter { get; set; }
        public Dictionary<string, string> Replacements { get; set; }
    }
}
