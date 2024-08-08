using api.Data;
using api.Dtos;
using api.Dtos.Order;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class OrderRepository : IOrderRepository
    {
        private readonly ApplicationDBContext _context;
        public OrderRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<Orders?> CreateAsync(Orders order)
        {
            await _context.Orders.AddAsync(order);
            await _context.SaveChangesAsync();
            return order;
        }

        public async Task<Orders?> DeleteAsync(int id)
        {
            var order = await _context.Orders.FirstOrDefaultAsync(x => x.Id == id);
            if (order == null)
            {
                return null;
            }
            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();
            return order;

        }

        public async Task<List<Orders>> GetAllAsync()
        {
           return await _context.Orders.ToListAsync();
        }

        public async Task<Orders?> GetByIdAsync(int id)
        {
            return await _context.Orders.FindAsync(id);
        }

        public async Task<bool> HasOrdersAsync(int id)
        {
            return await _context.Orders.AnyAsync(x => x.Id == id);
        }

        public async Task<Orders?> UpdateAsync(int id, UpdateOrdersRequestDto orderDto)
        {
            var order = await _context.Orders.FirstOrDefaultAsync(x => x.Id == id);
            if (order == null)
            {
                return null;
            }


            order.UserId = orderDto.UserId;
            order.OrderDate = orderDto.OrderDate;
            order.ShippingAddress = orderDto.ShippingAddress;
            order.BillingAddress = orderDto.BillingAddress;
            order.Email = orderDto.Email;
            order.PhoneNumber = orderDto.PhoneNumber;
            order.PaymentMethod = orderDto.PaymentMethod;
            order.Status = orderDto.Status;
            order.TotalAmount = orderDto.TotalAmount;
            await _context.SaveChangesAsync();
            return order;
        }
        public async Task<Orders> UpdateTotalPriceAsync(int id, decimal price)
        {
            var order = await _context.Orders.FirstOrDefaultAsync(x => x.Id == id);
            if (order == null)
            {
                return null;
            }

            order.TotalAmount += price;
            await _context.SaveChangesAsync();
            return order;
        }
        public async Task<List<OrderItem>> DeleteOrderItems(List<OrderItem> orderItems)
        {

            _context.OrderItems.RemoveRange(orderItems);
            await _context.SaveChangesAsync();
            return orderItems;
        }
    }
}
