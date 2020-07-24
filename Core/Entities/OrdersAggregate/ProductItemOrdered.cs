namespace Core.Entities.OrdersAggregate
{
    public class ProductItemOrdered
    {
        public ProductItemOrdered()
        {
        }

        public ProductItemOrdered(int productItemId, string productName, string pictureUrl)
        {
            this.ProductItemId = productItemId;
            this.ProductName=productName;
            this.PictureUrl = pictureUrl;

        }
        public int ProductItemId { get; set; }
        public string ProductName { get; set; }
        public string PictureUrl { get; set; }

    }
}