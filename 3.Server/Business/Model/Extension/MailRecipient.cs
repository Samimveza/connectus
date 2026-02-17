using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Model;

public partial class MailRecipient
{
    public MailRecipient(long idMailRecipient)
    {
        this.IdMailRecipient = idMailRecipient;
    }

    public MailRecipient()
    {
    }
}
