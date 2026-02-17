using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Dto.Response.IntegrationGateway
{
    public class CeleroIntegrationGatewayResponse
    {
        public List<CeleroIntegrationGatewayItemResponse> Items { get; set; }
    }

    public class CeleroIntegrationGatewayItemResponse
    {
        public string Identifier { get; set; }
        public string InvoiceNumber { get; set; }
        public DateTime? InvoiceDate { get; set; }
        public string ConsigneeName { get; set; }
        public string ConsigneeAddress { get; set; }
        public string ConsigneeTelephobe { get; set; }
        public string ConsigneeEmail { get; set; }
        public string AWBNumber { get; set; }
        public string ShipperName { get; set; }
        public string ShipmentContents { get; set; }
        public double? GrandTotal { get; set; }
        public string Currency { get; set; }
        public string PaymentMethod { get; set; }
        public DateTime? DatePaid { get; set; }
        public string BankReference { get; set; }
        public string LinkForPayment { get; set; }
        public string IdLinkForInvoiceDocument { get; set; }
        public string PaymentState { get; set; }
    }
}
