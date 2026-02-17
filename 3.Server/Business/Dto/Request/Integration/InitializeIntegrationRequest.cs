using System;

namespace Business.Dto.Request.Integration
{
    public class InitializeIntegrationRequest
    {
        public string IdUser { get; set; }
        public string TokenIdentifier { get; set; }
        public List<string> IdIntegrationTypes { get; set; }
    }
} 