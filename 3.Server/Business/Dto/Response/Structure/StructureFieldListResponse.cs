using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Dto.Response.Structure
{
    public class StructureFieldListResponse
    {
        public string IdStructureField { get; set; } = null!;

        public string? Name { get; set; }

        public string? Icon { get; set; }

        public string? StructureFieldCategory { get; set; }

        public bool? IsPopular { get; set; }

        public string? StructureFieldType { get; set; }

        public string? Prefix { get; set; }
        public string? Placeholder { get; set; }
    }
}


