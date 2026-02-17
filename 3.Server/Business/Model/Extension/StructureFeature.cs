using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Model;

public partial class StructureFeature
{
    public StructureFeature(string idStructureFeature)
    {
        this.IdStructureFeature = idStructureFeature;
    }

    public StructureFeature()
    {
        this.IdStructureFeature = Guid.NewGuid().ToString();
    }
} 