using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace Business.Common
{
    public class BusinessLayerException : Exception
    {
        private static long sequenceNo;

        public string SequenceNo
        {
            get;
            set;
        }

        static BusinessLayerException()
        {
            BusinessLayerException.sequenceNo = (long)0;
        }

        public BusinessLayerException()
        {
        }

        public BusinessLayerException(string message) : base(message)
        {
        }

        protected BusinessLayerException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }

        public BusinessLayerException(Exception innerException) : base("", innerException)
        {
            this.SequenceNo = BusinessLayerException.GetNextSequenceNo();
            //Logger currentClassLogger = LogManager.GetCurrentClassLogger();
            //currentClassLogger.Error(innerException, "LogId:{0}", new object[] { this.SequenceNo });
        }

        public BusinessLayerException(string message, Exception innerException) : base(message, innerException)
        {
            this.SequenceNo = BusinessLayerException.GetNextSequenceNo();
            //Logger currentClassLogger = LogManager.GetCurrentClassLogger();
            //currentClassLogger.Error(innerException, "LogId:{0}", new object[] { this.SequenceNo });
        }

        private static string GetNextSequenceNo()
        {
            BusinessLayerException.sequenceNo += (long)1;
            DateTime now = DateTime.Now;
            string str = string.Format("B{0}{1}", now.ToString("yyyyMMdd."), BusinessLayerException.sequenceNo);
            return str;
        }
    }
}
