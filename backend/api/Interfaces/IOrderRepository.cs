using api.Dtos;
using api.Dtos.Order;
using api.Models;

namespace api.Interfaces
{
    public interface IOrderRepository
    {
        Task<List<Orders>> GetAllAsync();
        Task<Orders?> GetByIdAsync(int id);
        Task<Orders?> CreateAsync(Orders order);
        Task<Orders?> UpdateAsync(int id, UpdateOrdersRequestDto orderDto);
        Task<Orders?> DeleteAsync(int id);
        Task<bool> HasOrdersAsync(int id);
        Task<Orders> UpdateTotalPriceAsync(int id, decimal price);
        Task<List<OrderItem>> DeleteOrderItems(List<OrderItem> orderItems);
    }
}
