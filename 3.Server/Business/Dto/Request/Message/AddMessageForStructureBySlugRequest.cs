using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Dto.Request.Message
{
    public class AddMessageForStructureBySlugRequest
    {
        public string Fullname { get; set; }
        public string Email { get; set; }
        public string Message { get; set; }
        public string PhoneNumber { get; set; }
        public string Slug { get; set; }
    }
}
