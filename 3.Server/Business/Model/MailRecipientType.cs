using System;
using System.Collections.Generic;

namespace Business.Model;

public partial class MailRecipientType
{
    public long IdMailRecipientType { get; set; }

    public string? Description { get; set; }

    public bool? IsDeactivated { get; set; }

    public virtual ICollection<MailRecipient> MailRecipients { get; set; } = new List<MailRecipient>();
}
