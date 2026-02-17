using Business.Common;
using Business.Dto.Request;
using Business.Dto.Response;
using Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using static Business.Enums.Constants;

namespace Service.Common
{
    public class GlobalDataService : IGlobalDataService
    {
        public Dictionary<string, string> Variables { get; set; }

        public GlobalDataService()
        {
            Variables = new Dictionary<string, string>();
        }

        public T GetVariable<T>(string key)
        {
            return JsonSerializer.Deserialize<T>(Variables[key]);
        }

        public void SetVariable<T>(string key, T value)
        {
            Variables.Add(key, JsonSerializer.Serialize(value));
        }

        public bool HasPermission(string permission)
        {
            return GetVariable<List<string>>(ApplicationConstant.PERMISSIONS).Where(p => p == permission).Any();   
        }

        public bool HasIdPermission(string idPermission)
        {
            return GetVariable<List<string>>(ApplicationConstant.PERMISSIONS_ID).Where(p => p == idPermission).Any();
        }
    }
}
