using System;
using System.Collections.Generic;

namespace Business.Model;

public partial class MailToSend
{
    public long IdMailToSend { get; set; }

    public long? IdMailServerSetting { get; set; }

    public long? IdEmailState { get; set; }

    public int? FailureCount { get; set; }

    public string? EmailSubject { get; set; }

    public string? ErrorMessage { get; set; }

    public string? EmailBody { get; set; }

    public bool? IsDeactivated { get; set; }

    public virtual MailState? IdEmailStateNavigation { get; set; }

    public virtual MailServerSetting? IdMailServerSettingNavigation { get; set; }

    public virtual ICollection<MailRecipient> MailRecipients { get; set; } = new List<MailRecipient>();

    public virtual ICollection<MailToSendDocument> MailToSendDocuments { get; set; } = new List<MailToSendDocument>();
}
