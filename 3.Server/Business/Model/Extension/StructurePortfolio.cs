using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Model
{
    public partial class StructurePortfolio
    {
        public StructurePortfolio(string idStructurePortfolio)
        {
            this.IdStructurePortfolio = idStructurePortfolio;
        }

        public StructurePortfolio()
        {
            this.IdStructurePortfolio = Guid.NewGuid().ToString();
        }
    }
}
