using Service.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interfaces
{
    public interface IGlobalDataService
    {
        T GetVariable<T>(string key);

        void SetVariable<T>(string key, T value);

        bool HasPermission(string permission);
        bool HasIdPermission(string idPermission);
    }
}
