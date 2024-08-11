using api.Data;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class OrderItemRepository : IOrderItemRepository
    {
        private readonly ApplicationDBContext _context;

        public OrderItemRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<OrderItem?> CreateAsync(OrderItem orderItem)
        {
            await _context.OrderItems.AddAsync(orderItem);
            await _context.SaveChangesAsync();
            return orderItem;
        }

        public async Task<List<OrderItem>> GetAllAsync()
        {
            return await _context.OrderItems.ToListAsync();
        }

        public async Task<OrderItem?> GetByIdAsync(int id)
        {
            return await _context.OrderItems.FindAsync(id);
        }

        public async Task<OrderItem?> UpdateAsync(int id, OrderItem orderItem)
        {
            var orderItemToUpdate = await _context.OrderItems.FindAsync(id);
            if (orderItemToUpdate == null)
            {
                return null;
            }

            var productId = await _context.Products.FindAsync(orderItem.ProductId);
            var orderId = await _context.Orders.FindAsync(orderItem.OrderId);
            if (productId == null || orderId == null)
            {
                return null;
            }

            orderItemToUpdate.ProductId = orderItem.ProductId;
            orderItemToUpdate.Quantity = orderItem.Quantity;
            orderItemToUpdate.OrderId = orderItem.OrderId;
            orderItemToUpdate.Price = orderItem.Price;

            await _context.SaveChangesAsync();
            return orderItemToUpdate;
        }

        public async Task<OrderItem?> DeleteAsync(int id)
        {
            var orderItem = await _context.OrderItems.FirstOrDefaultAsync(x => x.Id == id);
            if (orderItem == null)
            {
                return null;
            }
            _context.OrderItems.Remove(orderItem);
            await _context.SaveChangesAsync();
            return orderItem;
        }

        public Task<List<Products>> GetOrderProducts()
        {
            return _context.OrderItems
                .Select(product => new Products
                {
                    Id = product.ProductId,
                    Name = product.Product.Name,
                    Description = product.Product.Description,
                    Price = product.Product.Price,
                    StockQuantity = product.Product.StockQuantity,
                    Category = product.Product.Category,
                    ImageUrl = product.Product.ImageUrl
                })
                .ToListAsync();
        }
    }
}
