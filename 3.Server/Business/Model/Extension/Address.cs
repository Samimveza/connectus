using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Model;

public partial class Address
{
    public Address(string idAddress)
    {
        this.IdAddress = idAddress;
    }

    public Address()
    {
        this.IdAddress = Guid.NewGuid().ToString();
    }
}
