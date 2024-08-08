using System.ComponentModel.DataAnnotations.Schema;
using api.Dtos.OrderItem;

namespace api.Dtos
{
    public class ProductsDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int StockQuantity { get; set; }
        public string Category { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty;
        public List<OrderItemDto> OrderItems { get; set; } = [];
    }
}
