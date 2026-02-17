using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Utils
{
    public static class StringExtensions
    {
        public static bool IsNullEmptyOrWhitespace(this string? str)
        {
            return String.IsNullOrWhiteSpace(str) || String.IsNullOrEmpty(str);
        }
    }
}
