using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Dto.Request
{
    public class AuthenticateRequest : BaseRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string Domain { get; set; }
        public string TwoFactorAuthCode { get; set; }
        public string AuthenticationType { get; set; } //SHOP_OWNER
    }
}
