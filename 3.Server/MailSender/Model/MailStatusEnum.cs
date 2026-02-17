using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MailSender.Model
{
    public enum MailStatusEnum
    {
        PENDING = 1,
        IN_PROGRESS = 2,
        FAILED = 3,
        SUCCESS = 4,
        READY = 5,
    }
}
