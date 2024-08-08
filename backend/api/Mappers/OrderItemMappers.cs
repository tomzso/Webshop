using api.Dtos.OrderItem;
using api.Models;

namespace api.Mappers
{
    public static class OrderItemMappers
    {
        public static OrderItemDto OrderItemToDto(this OrderItem orderItem)
        {
            return new OrderItemDto
            {
                Id = orderItem.Id,
                ProductId = orderItem.ProductId,
                OrderId = orderItem.OrderId,
                Quantity = orderItem.Quantity,
                Price = orderItem.Price,
                
            };
        }

        public static OrderItem ToOrderItemFromCreate(this CreateOrderItemDto orderItem, int productId, int orderId, decimal price)
        {
            return new OrderItem
            {

                ProductId = productId,
                OrderId = orderId,
                Quantity = orderItem.Quantity,
                Price = price * orderItem.Quantity
            };
        }


        public static OrderItem ToOrderItemFromUpdate(this UpdateOrderItemDto orderItem)
        {
            return new OrderItem
            {

                ProductId = orderItem.ProductId,
                OrderId = orderItem.OrderId,
                Quantity = orderItem.Quantity,
                Price = orderItem.Price
            };
        }
    }
}
