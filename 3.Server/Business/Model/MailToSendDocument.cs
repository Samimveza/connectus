using System;
using System.Collections.Generic;

namespace Business.Model;

public partial class MailToSendDocument
{
    public long IdMailToSendDocument { get; set; }

    public long? IdMailToSend { get; set; }

    public bool? IsDeactivated { get; set; }

    public string? RelativeDocumentPath { get; set; }

    public string? DocumentName { get; set; }

    public virtual MailToSend? IdMailToSendNavigation { get; set; }
}
