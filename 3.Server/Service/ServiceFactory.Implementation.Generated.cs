using Business;
using Business.Common;
using Data;
using Data.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Protocols;
using Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service
{
    //public partial class BaseService
    //{
    //    protected static  string daoProvider;
    //    protected static IDaoFactory daoFactory;

    //    public static void ConfigureServices(IConfiguration configuration, IServiceCollection services)
    //    {
    //        daoProvider = configuration.GetSection("DataProvider").Value; 
    //        daoFactory = DaoFactories.GetFactory(configuration,daoProvider, DaoFactoryParameters);
    //    }
    //    private static Dictionary<string, object> DaoFactoryParameters
    //    {
    //        get
    //        {
    //            var dict = new Dictionary<string, object>();
    //            return dict;
    //        }
    //    }
    //}

    public partial class PersonService  :IPersonService
    {
        private IPersonDao PersonDao { get; }

        public PersonService(IPersonDao personDao)
        {
            this.PersonDao = personDao;
        }

        public void GetAllPerson()
        {
            
        }
    }
}
