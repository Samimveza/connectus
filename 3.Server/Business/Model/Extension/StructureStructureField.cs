using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Model
{
    public partial class StructureStructureField
    {
        public StructureStructureField(string idStructureContact)
        {
            this.IdStructureStructureField = idStructureContact;
        }

        public StructureStructureField()
        {
            this.IdStructureStructureField = Guid.NewGuid().ToString();
        }
    }

}
