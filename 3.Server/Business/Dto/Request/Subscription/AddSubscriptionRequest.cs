using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Dto.Request.Subscription
{
    public class AddSubscriptionRequest
    {
        public string Email { get; set; }
        public string Source { get; set; }
    }
}
