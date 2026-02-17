using Business.Common;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Data.Interfaces
{
    public interface IGenericDao<T> where T : class
    {
        T GetById(string id);
        IEnumerable<T> GetAll();
        void Add(T entity);
        void Delete(T entity);
        void DeleteRange(IEnumerable<T> entities);
        void Update(T entity);
        T GetCustom(Expression<Func<T, bool>> expression, List<string> includes = null);
        public BaseListReturnType<T> GetListCustom<TOrderBy>(int pageSize, int pageIndex, Expression<Func<T, bool>> expression, Expression<Func<T, TOrderBy>> orderExpression, List<string> includes = null, bool isDesc = false);
    }
}
