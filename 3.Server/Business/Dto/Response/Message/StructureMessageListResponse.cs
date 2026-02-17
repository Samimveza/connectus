using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Dto.Response.Message
{
    public class StructureMessageListResponse
    {

        public string EntityName { get; set; }
        public DateTime? DateAdded { get; set; }
        public string Email { get; set; }
        public string MainPhoneNumber { get; set; }
        public string StructureMessageReference { get; set; }
        public string MessageContent { get; set; }
        public bool IsRead { get; set; }
        
    }
}
