using System;
using System.Collections.Generic;

namespace Business.Model;

public partial class MailState
{
    public long IdMailState { get; set; }

    public string? Description { get; set; }

    public bool? IsDeactivated { get; set; }

    public virtual ICollection<MailRecipient> MailRecipients { get; set; } = new List<MailRecipient>();

    public virtual ICollection<MailToSend> MailToSends { get; set; } = new List<MailToSend>();
}
