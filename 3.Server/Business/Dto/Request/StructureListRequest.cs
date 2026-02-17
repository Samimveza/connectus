using Swashbuckle.AspNetCore.Annotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Business.Dto.Request
{
    public class StructureListRequest : BaseRequest
    {
        public StructureListRequest() { }    

        public string StructureType{ get; set; }
        public int PageSize { get; set; }
        public int PageIndex { get; set; }
        public string Search { get; set; }
        
        [JsonIgnore]
        public string IdUser { get; set; }

        [JsonIgnore]
        public string IdTenant { get; set; }

        [JsonIgnore]
        public bool HasPermission { get; set; }

    }
}
