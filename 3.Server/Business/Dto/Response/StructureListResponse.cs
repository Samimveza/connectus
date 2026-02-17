using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Dto.Response
{
    public class StructureListResponse : BaseRequest
    {
        public string Id { get; set; }
        public string EntityName { get; set; }
        public string Email { get; set; }
        public string IdStructureType { get; set; }
        //public string StateName { get; set; }
        //public string StateCode { get; set; }
        public DateTime? DateCreated { get; set; }

        public DocumentResponse ProfilePicture { get; set; }
        public string MainPhoneNumber { get; set; }
        public string WorkingOrganisation { get; set; }
        public string Headline { get; set; }
        
        

        //public List<UserListOnboardingType> UserListOnboardingTypes { get; set; }
    }

    //public class UserListOnboardingType
    //{
    //    public string Id { get; set; }
    //    public string Name { get; set; }
    //    public bool IsOnboarded { get; set; }
    //}
}
