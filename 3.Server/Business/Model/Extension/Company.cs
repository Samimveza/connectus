using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Model;

public partial class Company
{
    public Company(string idCompany)
    {
        this.IdCompany = idCompany;
    }

    public Company()
    {
        this.IdCompany = Guid.NewGuid().ToString();
    }
}
