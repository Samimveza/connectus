using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Dto.Request
{
    public class ValidateOtpRequest
    {
        public string Email { get; set; }
        public string Otp { get; set; }
        public string Domain { get; set; }
    }
}
