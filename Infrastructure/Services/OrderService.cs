using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Entities.OrdersAggregate;
using Core.Interfaces;
using Core.Specification;

namespace Infrastructure.Services
{
    public class OrderService : IOrderService
    {
        private readonly IBasketRepository _basketRpo;
        private readonly IUnitOfWork _unitOfWork;
        public OrderService(IUnitOfWork unitOfWork, IBasketRepository basketRpo)
        {
            _unitOfWork = unitOfWork;
            _basketRpo = basketRpo;

        }
        public async Task<Order> CreateOrderAsync(string buyerEmail, int deliveryMethodId, string basketId, Address shipingAddress)
        {
            //get basket from repo
            var basket = await _basketRpo.GetBasketAsync(basketId);

            //get items from product repo
            var items = new List<OrderItem>();
            foreach (var item in basket.Items)
            {
                var productItem = await _unitOfWork.Repository<Product>().GetByIDAsync(item.Id);
                var itemOrdered = new ProductItemOrdered(productItem.Id, productItem.Name, productItem.PictureUrl);
                var orderItem = new OrderItem(itemOrdered, productItem.Price, item.Quantity);
                items.Add(orderItem);
            }

            //get delivery method from repo
            var deleiveryMethod = await _unitOfWork.Repository<DeliveryMethod>().GetByIDAsync(deliveryMethodId);

            //calculate subtotal 
            var subTotal = items.Sum(item => item.Price * item.Quantity);

            //create order
            var order = new Order(items, buyerEmail, shipingAddress, deleiveryMethod, subTotal);
            _unitOfWork.Repository<Order>().Add(order);

            //save to db
            var result=await _unitOfWork.Complete();
            if(result<=0) return null;

            //delete basket
            await _basketRpo.DeleteBasketAsync(basketId);

            //return order
            return order;
        }

        public async Task<IReadOnlyList<DeliveryMethod>> GetDeiliveryMethodsAsync()
        {
              return await _unitOfWork.Repository<DeliveryMethod>().ListAllAsync();
        }

        public async Task<Order> GetOrderByIdAsync(int id, string buyerEmail)
        {
           var spec=new OrdersWithItemsAndOrderingSpecification(id,buyerEmail);
            return await _unitOfWork.Repository<Order>().GetEntityWithSpec(spec);
        }

        public async Task<IReadOnlyList<Order>> GetOrderForUserAsync(string buyerEmail)
        {
            var spec=new OrdersWithItemsAndOrderingSpecification(buyerEmail);
            return await _unitOfWork.Repository<Order>().ListAsync(spec);
        }
    }
}