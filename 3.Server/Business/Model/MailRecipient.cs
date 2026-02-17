using System;
using System.Collections.Generic;

namespace Business.Model;

public partial class MailRecipient
{
    public long IdMailRecipient { get; set; }

    public string? Name { get; set; }

    public string? EmailAddress { get; set; }

    public bool? IsDeactivated { get; set; }

    public long? IdMailToSend { get; set; }

    public long? IdMailStatus { get; set; }

    public long? IdMailRecipientType { get; set; }

    public virtual MailRecipientType? IdMailRecipientTypeNavigation { get; set; }

    public virtual MailState? IdMailStatusNavigation { get; set; }

    public virtual MailToSend? IdMailToSendNavigation { get; set; }
}
