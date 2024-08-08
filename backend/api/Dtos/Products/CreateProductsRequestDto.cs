using System.ComponentModel.DataAnnotations;

namespace api.Dtos
{
    public class CreateProductsRequestDto
    {
        [Required]
        [MinLength(3,ErrorMessage ="Minimum lenght of Name is 3")]
        [MaxLength(100,ErrorMessage ="Maximum lenght of Name is 100")]
        public string Name { get; set; } = string.Empty;

        [Required]
        [MinLength(3, ErrorMessage = "Minimum lenght of Description is 3")]
        [MaxLength(100, ErrorMessage = "Maximum lenght of Description is 100")]
        public string Description { get; set; } = string.Empty;

        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Price must be greater than 0")]
        public decimal Price { get; set; }
        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "StockQuantity must be greater than 0")]
        public int StockQuantity { get; set; }

        [Required]
        [MinLength(3, ErrorMessage = "Minimum lenght of Category is 3")]
        [MaxLength(100, ErrorMessage = "Maximum lenght of Category is 100")]
        public string Category { get; set; } = string.Empty;

        [Required]
        [MinLength(3, ErrorMessage = "Minimum lenght of ImageUrl is 3")]
        [MaxLength(100, ErrorMessage = "Maximum lenght of ImageUrl is 100")]
        public string ImageUrl { get; set; } = string.Empty;
    }
}
