using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Dto.Request
{
    public class RegistrationRequest : BaseRequest
    {
        public RegistrationRequest() { }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string RegistationType { get; set; } // PERSON, COMPANY, SHOP_OWNER
    }
}
