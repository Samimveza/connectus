using System;
using System.Collections.Generic;

namespace Business.Model;

public partial class MailServerSetting
{
    public long IdMailServerSetting { get; set; }

    public bool? UseSsl { get; set; }

    public int? ClientPort { get; set; }

    public string? Host { get; set; }

    public string? Username { get; set; }

    public string? Password { get; set; }

    public bool? IsDeactivated { get; set; }

    public int? Priority { get; set; }

    public string? DefaultName { get; set; }

    public virtual ICollection<MailToSend> MailToSends { get; set; } = new List<MailToSend>();
}
