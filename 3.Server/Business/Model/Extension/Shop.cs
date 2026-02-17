using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Model;

public partial class Shop
{
    public Shop(string idShop)
    {
        this.IdShop = idShop;
    }

    public Shop()
    {
        this.IdShop = Guid.NewGuid().ToString();
    }
}
