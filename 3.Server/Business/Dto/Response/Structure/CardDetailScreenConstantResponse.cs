using Business.Dto.Response.Integration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Dto.Response.Structure
{
    public class CardDetailScreenConstantResponse
    {
        public List<IntegrationTypeListResponse> IntegrationTypes { get; set; }
        public List<StructureFieldListResponse> StructureFields { get; set; }
        public string IndividualBaseSlugUrl { get; set; }
        public string LegalEntityBaseSlugUrl { get; set; }

        public List<IndividualProfileColorVariantResponse> IndividualProfileColorVariants { get; set; }
        public List<IndividualProfileColorVariantResponse> LegalEntityProfileColorVariants { get; set; }
        public List<GetStructurerCategoriesHiearchyResponse> StructurerCategoriesHiearchy { get; set; }

    }
}
