using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Model
{
    public partial class StructurePortfolioDocument
    {
        public StructurePortfolioDocument(string idStructurePortfolioDocument)
        {
            this.IdStructurePortfolioDocument = idStructurePortfolioDocument;
        }

        public StructurePortfolioDocument()
        {
            this.IdStructurePortfolioDocument = Guid.NewGuid().ToString();
        }
    }
}
