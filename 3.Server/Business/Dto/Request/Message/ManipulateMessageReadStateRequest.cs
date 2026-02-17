using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Dto.Request.Message
{
    public class ManipulateMessageReadStateRequest
    {
        public string IdMessageReference { get; set; }
        public bool IsRead { get; set; }
    }
}
