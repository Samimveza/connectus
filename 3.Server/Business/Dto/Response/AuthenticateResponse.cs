using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Dto.Response
{
    public class AuthenticateResponse 
    {
        public bool Result { get; set; } = false;
        public string Token { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
        public bool IsLockedOut { get; set; } = false;
        public bool IsNotAllowed { get; set; } = false;
        public bool RequiresTwoFactor { get; set; } = false;
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public List<string> Roles { get; set; }
        public bool RequireEmailVerification { get; set; } = false;
        public string? IdStructure { get; set; }

    }

}
