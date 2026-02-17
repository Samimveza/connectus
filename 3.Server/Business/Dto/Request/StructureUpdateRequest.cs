using Business.Dto.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Dto.Request
{
    public class StructureUpdateRequest
    {
        public string IdStructure { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string WorkingOrganisation { get; set; }
        
        public string CompanyName { get; set; }
        public string Email { get; set; }
        public string Headline { get; set; }
        public string TopFooter { get; set; }
        
        public List<AddressResponse> Addresses { get; set; }
        public List<SocialNetworkResponse> SocialNetworks { get; set; }
        public List<StructureContactResponse> Contacts { get; set; }
        public DocumentResponse ProfilePicture { get; set; }
        public string IdProfilePicture { get; set; }
        public string IdCoverPicture { get; set; }

        
    }
}
