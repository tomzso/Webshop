using api.Models;

namespace api.Interfaces
{
    public interface IOrderItemRepository
    {
        Task<List<OrderItem>> GetAllAsync();
        Task<OrderItem?> GetByIdAsync(int id);
        Task<OrderItem?> CreateAsync(OrderItem orderItem);
        Task<OrderItem?> UpdateAsync(int id, OrderItem orderItem);
        Task<OrderItem?> DeleteAsync(int id);

        Task<List<Products>> GetOrderProducts(); //Orders orders
        //Task<decimal> GetPriceAsync(int );

    }
}
