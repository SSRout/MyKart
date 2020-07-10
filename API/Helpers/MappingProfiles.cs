using API.Dtos;
using AutoMapper;
using Core.Entities;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Product,ProductToReturnDto>()
            .ForMember(destination=>destination.ProductType,o=>o.MapFrom(source=>source.ProductType.Name))
            .ForMember(destination=>destination.ProductBrand,o=>o.MapFrom(source=>source.ProductBrand.Name))
            .ForMember(d=>d.PictureUrl,o=>o.MapFrom<ProductUrlResolver>());
        }
    }
}