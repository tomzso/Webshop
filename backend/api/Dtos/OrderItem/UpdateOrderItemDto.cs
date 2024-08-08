namespace api.Dtos.OrderItem
{
    public class UpdateOrderItemDto
    {
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public int OrderId { get; set; }
        public int ProductId { get; set; }
    }
}
