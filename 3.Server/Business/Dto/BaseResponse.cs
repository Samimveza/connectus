using Business.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Dto
{
    public class BaseResponse<T> : BaseMessage
    {
        public BaseResponse(Guid correlationId) : base()
        {
            base._correlationId = correlationId;
        }

        public BaseResponse()
        {
        }

        public T Result{ get; set; }
        public RequestStatusEnum Status { get; set; }
        public string ErrorMessage { get; set; }
    }

}
