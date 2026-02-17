using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Model;


public partial class StructureContact
{
    public StructureContact(string idStructureContact)
    {
        this.IdStructureContact = idStructureContact;
    }

    public StructureContact()
    {
        this.IdStructureContact = Guid.NewGuid().ToString();
    }
}
