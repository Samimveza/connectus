using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Model;

public partial class SlugLog
{
    public SlugLog(string idSlugLog)
    {
        this.IdSlugLog = idSlugLog;
    }

    public SlugLog()
    {
        this.IdSlugLog = Guid.NewGuid().ToString();
    }
}
