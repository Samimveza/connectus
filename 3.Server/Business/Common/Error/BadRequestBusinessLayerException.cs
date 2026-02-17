using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace Business.Common;

public class BadRequestBusinessLayerException : Exception
{
    private static long sequenceNo;

    public string SequenceNo
    {
        get;
        set;
    }

    static BadRequestBusinessLayerException()
    {
        BadRequestBusinessLayerException.sequenceNo = (long)0;
    }

    public BadRequestBusinessLayerException()
    {
    }

    public BadRequestBusinessLayerException(string message) : base(message)
    {
    }

    protected BadRequestBusinessLayerException(SerializationInfo info, StreamingContext context) : base(info, context)
    {
    }

    public BadRequestBusinessLayerException(Exception innerException) : base("", innerException)
    {
        this.SequenceNo = BadRequestBusinessLayerException.GetNextSequenceNo();
        //Logger currentClassLogger = LogManager.GetCurrentClassLogger();
        //currentClassLogger.Error(innerException, "LogId:{0}", new object[] { this.SequenceNo });
    }

    public BadRequestBusinessLayerException(string message, Exception innerException) : base(message, innerException)
    {
        this.SequenceNo = BadRequestBusinessLayerException.GetNextSequenceNo();
        //Logger currentClassLogger = LogManager.GetCurrentClassLogger();
        //currentClassLogger.Error(innerException, "LogId:{0}", new object[] { this.SequenceNo });
    }

    private static string GetNextSequenceNo()
    {
        BadRequestBusinessLayerException.sequenceNo += (long)1;
        DateTime now = DateTime.Now;
        string str = string.Format("B{0}{1}", now.ToString("yyyyMMdd."), BadRequestBusinessLayerException.sequenceNo);
        return str;
    }
}
