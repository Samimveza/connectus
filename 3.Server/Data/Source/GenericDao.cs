using Business;
using Business.Common;
using Business.ExtensionMethod;
using Data.Common;
using Data.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;

namespace Data.Source
{
    public abstract class GenericRepository<T> : IGenericDao<T> where T : class
    {
        protected readonly ApplicationDbContext _dbContext;

        protected GenericRepository(ApplicationDbContext context)
        {
            _dbContext = context;
        }

        public  T GetById(string id)
        {
            return  _dbContext.Set<T>().Find(id);
        }

        public  IEnumerable<T> GetAll()
        {
            return  _dbContext.Set<T>().ToList();
        }

        public  void Add(T entity)
        {
             _dbContext.Set<T>().AddAsync(entity);
        }

        public void Delete(T entity)
        {
            _dbContext.Set<T>().Remove(entity);
        }

        public void DeleteRange(IEnumerable<T> entities)
        {
            _dbContext.Set<T>().RemoveRange(entities);
        }

        public void Update(T entity)
        {
            _dbContext.Set<T>().Update(entity);
        }

        public T GetCustom(Expression<Func<T, bool>> expression, List<string> includes = null)
        {
            var query = _dbContext.Set<T>().Where(expression);
            if (includes != null)
            {
                query = query.WithIncludes<T>(includes);
            }

            return query.FirstOrDefault();
        }

        public BaseListReturnType<T> GetListCustom<TOrderBy>(int pageSize, int pageIndex, Expression<Func<T, bool>> expression, Expression<Func<T, TOrderBy>> orderExpression, List<string> includes = null, bool isDesc = false)
        {
            IQueryable<T> query = _dbContext.Set<T>();

            if (includes != null)
            {
                query = query.WithIncludes(includes);
            }

            BaseListReturnType<T> baseListReturnType = new BaseListReturnType<T>();

            if (orderExpression != null && !isDesc)
            {
                query = query.OrderBy(orderExpression).AsQueryable();
            }

            if (orderExpression != null && isDesc)
            {
                query = query.OrderByDescending(orderExpression).AsQueryable();
            }

            if (expression != null)
            {
                Expression<Func<T, bool>> expressionBuilder = expression;

                query = query.Where(expressionBuilder);
            }
           
            baseListReturnType.TotalCount = query.Count();

            if (pageSize == -1)
            {
                baseListReturnType.EntityList = query.ToList();
            }
            else
            {
                baseListReturnType.EntityList = query.Skip(pageSize * pageIndex)
                    .Take(pageSize)
                    .ToList();
            }

            return baseListReturnType;
        }
    }
}
