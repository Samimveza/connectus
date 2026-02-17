using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Model;

public partial class StructureGallery
{
    public StructureGallery(string idStructureGallery)
    {
        this.IdStructureGallery = idStructureGallery;
    }

    public StructureGallery()
    {
        this.IdStructureGallery = Guid.NewGuid().ToString();
    }
} 