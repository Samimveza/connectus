using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Dto.Response
{
    public class GenerateNewCardResponse
    {
        public List<GenerateCardResponse> Cards { get; set; }
    }

    public class GenerateNewCardInfoResponse
    {
        public string CardNumber { get; set; }
        public string QrCodeUrl { get; set; }
        public string NfcUrl { get; set; }
    }
}
