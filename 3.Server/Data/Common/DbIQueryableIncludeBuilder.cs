using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;


namespace Data.Common
{
    public static class DbIQueryableIncludeBuilder
    {
        public static IQueryable<T> WithIncludes<T>(this IQueryable<T> sequence, List<string> includes) where T : class
        {
            {
                foreach (string include in includes)
                {
                    sequence = sequence.Include(include);
                }
            }
            return sequence;
        }
    }
}
