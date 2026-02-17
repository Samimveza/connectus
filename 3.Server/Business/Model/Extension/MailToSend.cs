using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Model;

public partial class MailToSend
{
    public MailToSend(long idMailToSend)
    {
        this.IdMailToSend = idMailToSend;
    }

    public MailToSend()
    {
    }
}
