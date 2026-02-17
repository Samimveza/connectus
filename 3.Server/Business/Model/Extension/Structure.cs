using Business.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Model;


public partial class Structure
{
    public Structure(string idStructure)
    {
        this.IdStructure = idStructure;
    }

    public Structure()
    {
        this.IdStructure = Guid.NewGuid().ToString();
    }

    public string FullName
    {
        get
        {
           return this?.IdStructureTypeNavigation?.Code == Constants.StructureTypeConstant.INDIVIDUAL ?
                String.Format("{0} {1}", this?.IdPersonNavigation?.Firstname, this?.IdPersonNavigation?.Lastname)
                : this?.IdCompanyNavigation?.Name;
        }
    }
}
