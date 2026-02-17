using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Model;

public partial class Subscriber
{
    public Subscriber(string idSubscriber)
    {
        this.IdSubscriber = idSubscriber;
    }

    public Subscriber()
    {
        this.IdSubscriber = Guid.NewGuid().ToString();
    }
}
