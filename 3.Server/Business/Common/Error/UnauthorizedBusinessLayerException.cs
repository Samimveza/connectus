using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace Business.Common;

public class UnauthorizedBusinessLayerException : Exception
{
    private static long sequenceNo;

    public string SequenceNo
    {
        get;
        set;
    }

    static UnauthorizedBusinessLayerException()
    {
        UnauthorizedBusinessLayerException.sequenceNo = (long)0;
    }

    public UnauthorizedBusinessLayerException()
    {
    }

    public UnauthorizedBusinessLayerException(string message) : base(message)
    {
    }

    protected UnauthorizedBusinessLayerException(SerializationInfo info, StreamingContext context) : base(info, context)
    {
    }

    public UnauthorizedBusinessLayerException(Exception innerException) : base("", innerException)
    {
        this.SequenceNo = UnauthorizedBusinessLayerException.GetNextSequenceNo();
        //Logger currentClassLogger = LogManager.GetCurrentClassLogger();
        //currentClassLogger.Error(innerException, "LogId:{0}", new object[] { this.SequenceNo });
    }

    public UnauthorizedBusinessLayerException(string message, Exception innerException) : base(message, innerException)
    {
        this.SequenceNo = UnauthorizedBusinessLayerException.GetNextSequenceNo();
        //Logger currentClassLogger = LogManager.GetCurrentClassLogger();
        //currentClassLogger.Error(innerException, "LogId:{0}", new object[] { this.SequenceNo });
    }

    private static string GetNextSequenceNo()
    {
        UnauthorizedBusinessLayerException.sequenceNo += (long)1;
        DateTime now = DateTime.Now;
        string str = string.Format("B{0}{1}", now.ToString("yyyyMMdd."), UnauthorizedBusinessLayerException.sequenceNo);
        return str;
    }
}
