using api.Dtos;
using api.Models;

namespace api.Mappers
{
    public static class ProductsMappers
    {
        public static ProductsDto ProductToDto(this Products product)
        {
            return new ProductsDto
            {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                StockQuantity = product.StockQuantity,
                Category = product.Category,
                ImageUrl = product.ImageUrl,
                OrderItems = product.OrderItems.Select(x => x.OrderItemToDto()).ToList()
            };
        }

        public static Products DtoToProduct(this CreateProductsRequestDto productDto)
        {
            return new Products
            {
                Name = productDto.Name,
                Description = productDto.Description,
                Price = productDto.Price,
                StockQuantity = productDto.StockQuantity,
                Category = productDto.Category,
                ImageUrl = productDto.ImageUrl
            };
        }
    }
}
