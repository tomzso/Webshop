using System.ComponentModel.DataAnnotations;

namespace api.Dtos.Order
{
    public class CreateOrdersRequestDto
    {
        [Required]
        public DateTime OrderDate { get; set; }

        [Required]
        [MinLength(3, ErrorMessage = "Minimum length of Status is 3")]
        [MaxLength(100, ErrorMessage = "Maximum length of Status is 100")]
        public string Status { get; set; } = string.Empty;

        [Required]
        [Range(0, int.MaxValue, ErrorMessage = "TotalAmount must be greater or equal to 0")]
        public decimal TotalAmount { get; set; } = 0;

        [Required]
        [MinLength(3, ErrorMessage = "Minimum length of ShippingAddress is 3")]
        [MaxLength(100, ErrorMessage = "Maximum length of ShippingAddress is 100")]
        public string ShippingAddress { get; set; } = string.Empty;

        [Required]
        [MinLength(3, ErrorMessage = "Minimum length of BillingAddress is 3")]
        [MaxLength(100, ErrorMessage = "Maximum length of BillingAddress is 100")]
        public string BillingAddress { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        public string PhoneNumber { get; set; } = string.Empty;

        [Required]
        public string PaymentMethod { get; set; } = string.Empty;
    }
}
