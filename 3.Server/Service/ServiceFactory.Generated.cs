using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service
{
    public partial class ServiceFactory : IServiceFactory
    {
        public PersonService PersonService
        {
            get { return new PersonService(); }
        }
    }
}
