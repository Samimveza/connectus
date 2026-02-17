using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Dto.Response.Integration
{
    public class IntegrationDownloadFileResponse
    {
        public Stream FileStream { get; set; }
        public string ContentType { get; set; }
        public string FileNameWithExtension { get; set; }
    }
}
