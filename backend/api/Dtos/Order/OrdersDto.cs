using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using api.Dtos.OrderItem;

namespace api.Dtos.Order
{
    public class OrdersDto
    {
        public int Id { get; set; }
        public string UserId { get; set; }   = string.Empty;
        public DateTime OrderDate { get; set; }
        public string Status { get; set; } = string.Empty;
        public decimal TotalAmount { get; set; }
        public string ShippingAddress { get; set; } = string.Empty;
        public string BillingAddress { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string PaymentMethod { get; set; } = string.Empty;

        public List<OrderItemDto> OrderItems { get; set; } = [];
    }
}
