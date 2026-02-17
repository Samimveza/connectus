using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Model;

public partial class ProfileTemplate
{
    public ProfileTemplate(string idProfileTemplate)
    {
        this.IdProfileTemplate = idProfileTemplate;
    }

    public ProfileTemplate()
    {
        this.IdProfileTemplate = Guid.NewGuid().ToString();
    }
}
