using api.Dtos;
using api.Helper;
using api.Models;

namespace api.Interfaces
{
    public interface IProductRepository
    {
        Task<List<Products>> GetAllAsync(ProductQueryObject productQueryObject);
        Task<Products?> GetByIdAsync(int id);
        Task<Products?> CreateAsync(Products product);
        Task<Products?> UpdateAsync(int id, UpdateProductsRequestDto productDto);
        Task<Products?> DeleteAsync(int id);
        Task<bool> HasProductAsync(int id);
        Task<decimal> GetPriceAsync(int id);
        Task<Products?> UpdateStockAsync(int id, int stock);
    }
}
