using API.Dtos;
using AutoMapper;
using Core.Entities;
using Microsoft.Extensions.Configuration;

namespace API.Helpers
{
    public class ProductUrlResolver : IValueResolver<Product, ProductToReturnDto, string>
    {
        public readonly IConfiguration _config ;

        public ProductUrlResolver(IConfiguration config)
        {
            _config = config;
        }

        
        public string Resolve(Product source, ProductToReturnDto destination, string destMember, ResolutionContext context)
        {
            if(!string.IsNullOrEmpty(source.PictureUrl)){
                if(source.PictureUrl.Contains("images/"))
                    return _config["ApiUrl"]+source.PictureUrl;
                else
                    return source.PictureUrl;
            }
            return null;
        }
    }
}