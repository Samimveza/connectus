using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Model;


public partial class StructureSocialNetwork
{
    public StructureSocialNetwork(string idStructureSocialNetwork)
    {
        this.IdStructureSocialNetwork = idStructureSocialNetwork;
    }

    public StructureSocialNetwork()
    {
        this.IdStructureSocialNetwork = Guid.NewGuid().ToString();
    }
}
