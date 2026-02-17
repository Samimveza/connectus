using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Model;

public partial class Parameter
{
    public Parameter(string idParameter)
    {
        this.IdParameter = idParameter;
    }

    public Parameter()
    {
        this.IdParameter = Guid.NewGuid().ToString();
    }
}
