using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Dto.Request
{
    public class GenerateCardRequest
    {
        public string CardSlug { get; set; }
        public string CardUrl { get; set; }

        public string TemplatePath { get; set; }
        public string OutputPath { get; set; }
    }
}
