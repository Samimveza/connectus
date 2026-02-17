using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Dto.Response
{
    public class RegistrationResponse
    {
        public bool Result { get; set; } = false;

        public string? TwoFactorAuthCode { get; set; } 
    }
}
