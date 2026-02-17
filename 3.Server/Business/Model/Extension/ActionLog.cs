using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Model;

public partial class ActionLog
{
    public ActionLog(string idActionLog)
    {
        this.IdActionLog = idActionLog;
    }

    public ActionLog()
    {
        this.IdActionLog = Guid.NewGuid().ToString();
    }
}
