using Data.Interfaces;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Source
{
    public partial class DaoFactory : IDaoFactory
    {
        public IPersonDao PersonDao { get { return new PersonDao(null); } }

    }
}
