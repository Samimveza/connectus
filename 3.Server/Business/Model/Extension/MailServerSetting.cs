using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Model;

public partial class MailServerSetting
{
    public MailServerSetting(long idMailServerSetting)
    {
        this.IdMailServerSetting = idMailServerSetting;
    }

    public MailServerSetting()
    {
    }
}
