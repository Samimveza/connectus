using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Model;

public partial class SocialNetwork
{
    public SocialNetwork(string idSocialNetwork)
    {
        this.IdSocialNetwork = idSocialNetwork;
    }

    public SocialNetwork()
    {
        this.IdSocialNetwork = Guid.NewGuid().ToString();
    }
}
