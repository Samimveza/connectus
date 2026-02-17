using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Dto.Response.Structure
{
    public class GetStructurerCategoriesHiearchyResponse
    {
        public string IdStructureCategory { get; set; }
        public string Name { get; set; }
        public string Color { get; set; }
        public string IdDocument { get; set; }
        public string Slug { get; set; }
        public string SvgIcon { get; set; }
        public List<GetStructurerCategoriesHiearchyResponse> Children { get; set; } = new();
    }
}
