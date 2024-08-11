using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    [Table("Products")]
    public class Products
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;

        [Column(TypeName = "decimal(14, 2)")]
        public decimal Price { get; set; }
        public int StockQuantity { get; set; }
        public string Category { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty;

        public List<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
    }
}
