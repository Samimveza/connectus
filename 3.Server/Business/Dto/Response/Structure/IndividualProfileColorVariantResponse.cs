using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Dto.Response.Structure
{
    public class IndividualProfileColorVariantResponse
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string IdVariant { get; set; }
        public bool IsDefault { get; set; }

        public List<IndividualProfileColorVariantColor> Colors { get; set; }
        
    }

    public class IndividualProfileColorVariantColor
    {
        public string AttributeName { get; set; }
        public string Color { get; set; }
    }

}
