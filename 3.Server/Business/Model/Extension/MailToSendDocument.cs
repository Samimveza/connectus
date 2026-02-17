using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Model;

public partial class MailToSendDocument
{
    public MailToSendDocument(long idMailToSendDocument)
    {
        this.IdMailToSendDocument = idMailToSendDocument;
    }

    public MailToSendDocument()
    {
    }
}
