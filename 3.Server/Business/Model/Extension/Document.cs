using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Model;

public partial class Document
{
    public Document(string idDocument)
    {
        this.IdDocument = idDocument;
    }

    public Document()
    {
        this.IdDocument = Guid.NewGuid().ToString();
    }
}
