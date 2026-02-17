using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Model;

public partial class MytSetting
{
    public MytSetting(string idMytSetting)
    {
        this.IdMytSetting = idMytSetting;
    }

    public MytSetting()
    {
        this.IdMytSetting = Guid.NewGuid().ToString();
    }
}
