using System;
using System.Collections.Generic;
using System.Linq.Expressions;
namespace Core.Specification
{
    public class BaseSpecification<T> : ISpecification<T>
    {
        public BaseSpecification()
        {
        }
        public Expression<System.Func<T, bool>> Criteria {get;}

        public BaseSpecification(Expression<Func<T, bool>> criteria)
        {
            Criteria = criteria;
        }


        public List<Expression<System.Func<T, object>>> Includes {get;}=new List<Expression<System.Func<T, object>>>();


        protected void AddInclude(Expression<Func<T,object>> includeExpression){
            Includes.Add(includeExpression);
        }
        public Expression<Func<T, object>> OrderBy {get;private set;}

        public Expression<Func<T, object>> OrderByDesc {get;private set;}

        protected void AddOrderBy(Expression<Func<T,object>> orderByExpression){
            OrderBy=orderByExpression;
        }

        protected void AddOrderByDescending(Expression<Func<T,object>> orderByDescExpression){
            OrderByDesc =orderByDescExpression;
        }

        public int Take {get;private set;}

        public int Skip {get;private set;}

        public bool IsPagingEnabled {get;private set;}

        protected void ApplyPaging(int skip, int take)
        {
            Skip = skip;
            Take = take;
            IsPagingEnabled = true;
        }     

    }
}