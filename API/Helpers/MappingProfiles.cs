using API.Dtos;
using AutoMapper;
using Core.Entities;
using i=Core.Entities.Identity;
using Core.Entities.OrdersAggregate;
using o=Core.Entities.OrdersAggregate;
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

            CreateMap<i.Address,AddressDto>().ReverseMap();

            CreateMap<CustomerBasketDto,CustomerBasket>();

            CreateMap<BasketItemDto,BasketItem>();

            CreateMap<AddressDto,o.Address>();

             CreateMap<Order, OrderToReturnDto>()
                .ForMember(d => d.DeliveryMethod, o => o.MapFrom(s => s.DeliveryMethod.ShortName))
                .ForMember(d => d.ShippingPrice, o => o.MapFrom(s => s.DeliveryMethod.Price));
                
            CreateMap<OrderItem, OrderItemDto>()
                .ForMember(d => d.ProductId, o => o.MapFrom(s =>  s.ItemOrdered.ProductItemId))
                .ForMember(d => d.ProductName, o => o.MapFrom(s =>  s.ItemOrdered.ProductName))
                .ForMember(d => d.PictureUrl, o => o.MapFrom(s =>  s.ItemOrdered.PictureUrl))
                 .ForMember(d => d.PictureUrl, o => o.MapFrom<OrderItemUrlResolver>());
        }
    }
}