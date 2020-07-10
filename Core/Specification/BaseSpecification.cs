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
    }
}