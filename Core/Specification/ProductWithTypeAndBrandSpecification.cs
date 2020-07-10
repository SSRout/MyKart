using System;
using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specification
{
    public class ProductWithTypeAndBrandSpecification : BaseSpecification<Product>
    {
        public ProductWithTypeAndBrandSpecification()
        {
            AddInclude(x=>x.ProductBrand);
            AddInclude(x=>x.ProductType);
        }

        public ProductWithTypeAndBrandSpecification(int id) : base(x=>x.Id==id)
        {
             AddInclude(x=>x.ProductBrand);
             AddInclude(x=>x.ProductType);
        }
    }
}