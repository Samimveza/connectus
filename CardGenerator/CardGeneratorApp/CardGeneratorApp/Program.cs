using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CardGeneratorApp
{
    internal class Program
    {
        static void Main(string[] args)
        {
            var url = "https://connectus.mu/samim.mohabuth";
            var nfcUrl = "https://connectus.mu/samim.mohabuth?s=2";

            var qrCode = "https://connectus.mu/samim.mohabuth?s=1";
            var number = "000 5766 1595";

            var cardGeneratorService = new CardGeneratorService();  
            cardGeneratorService.StartGeneration(qrCode, number);
        }
    }
}
