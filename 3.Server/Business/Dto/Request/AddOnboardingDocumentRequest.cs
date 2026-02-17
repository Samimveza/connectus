using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Dto.Request
{
    public class AddOnboardingDocumentRequest:BaseRequest
    {
        public string IdDocument { get; set; }
        public string IdSection { get; set; }
        public string IdStructure { get; set; }
        public string IdProduct { get; set; }
    }
}
