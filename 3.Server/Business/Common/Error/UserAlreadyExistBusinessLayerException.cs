using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace Business.Common
{
    public class UserAlreadyExistBusinessLayerException : Exception
    {
        private static long sequenceNo;

        public string SequenceNo
        {
            get;
            set;
        }

        static UserAlreadyExistBusinessLayerException()
        {
            UserAlreadyExistBusinessLayerException.sequenceNo = (long)0;
        }

        public UserAlreadyExistBusinessLayerException()
        {
        }

        public UserAlreadyExistBusinessLayerException(string message) : base(message)
        {
        }

        protected UserAlreadyExistBusinessLayerException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }

        public UserAlreadyExistBusinessLayerException(Exception innerException) : base("", innerException)
        {
            this.SequenceNo = UserAlreadyExistBusinessLayerException.GetNextSequenceNo();
            //Logger currentClassLogger = LogManager.GetCurrentClassLogger();
            //currentClassLogger.Error(innerException, "LogId:{0}", new object[] { this.SequenceNo });
        }

        public UserAlreadyExistBusinessLayerException(string message, Exception innerException) : base(message, innerException)
        {
            this.SequenceNo = UserAlreadyExistBusinessLayerException.GetNextSequenceNo();
            //Logger currentClassLogger = LogManager.GetCurrentClassLogger();
            //currentClassLogger.Error(innerException, "LogId:{0}", new object[] { this.SequenceNo });
        }

        private static string GetNextSequenceNo()
        {
            UserAlreadyExistBusinessLayerException.sequenceNo += (long)1;
            DateTime now = DateTime.Now;
            string str = string.Format("B{0}{1}", now.ToString("yyyyMMdd."), UserAlreadyExistBusinessLayerException.sequenceNo);
            return str;
        }
    }
}
