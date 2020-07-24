using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities.OrdersAggregate;

namespace Core.Interfaces
{
    public interface IOrderService
    {
         Task<Order> CreateOrderAsync(string buyerEmail,int deliveryMethod,string basketId,Address shipingAddress);
         Task<IReadOnlyList<Order>> GetOrderForUserAsync(string buyerEmail);
         Task<Order> GetOrderByIdAsync(int id,string buyerEmail);
         Task<IReadOnlyList<DeliveryMethod>> GetDeiliveryMethodsAsync();
         
    }
}