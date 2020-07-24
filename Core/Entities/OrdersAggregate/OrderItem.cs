namespace Core.Entities.OrdersAggregate
{
    public class OrderItem:BaseEntity
    {
        public OrderItem()
        {
        }

        public OrderItem(ProductItemOrdered itemOrdered, decimal price, int qunatity)
        {
            ItemOrdered = itemOrdered;
            Price = price;
            Qunatity = qunatity;
        }

        public ProductItemOrdered ItemOrdered { get; set; }
        public decimal Price { get; set; }
        public int Qunatity { get; set; }
    }
}