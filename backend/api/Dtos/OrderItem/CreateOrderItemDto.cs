using System.ComponentModel.DataAnnotations;

namespace api.Dtos.OrderItem
{
    public class CreateOrderItemDto
    {
        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Quantity must be greater than 0")]
        public int Quantity { get; set; }
        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "ProductId must be greater than 0")]
        public int productId { get; set; }


        
    }
}
