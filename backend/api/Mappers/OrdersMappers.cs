using api.Dtos.Order;
using api.Models;

namespace api.Mappers
{
    public static class OrdersMappers
    {
        public static OrdersDto OrderToDto(this Orders order)
        {
            return new OrdersDto
            {
                Id = order.Id,
                UserId = order.UserId,
                OrderDate = order.OrderDate,
                Status = order.Status,
                TotalAmount = order.TotalAmount,
                ShippingAddress = order.ShippingAddress,
                BillingAddress = order.BillingAddress,
                Email = order.Email,
                PhoneNumber = order.PhoneNumber,
                PaymentMethod = order.PaymentMethod,
                OrderItems = order.OrderItems.Select(x => x.OrderItemToDto()).ToList()
                


            };
        }
        public static Orders DtoToOrder(this CreateOrdersRequestDto orderDto, string userId)
        {
            return new Orders
            {
                UserId = userId,
                OrderDate = orderDto.OrderDate,
                Status = orderDto.Status,
                TotalAmount = orderDto.TotalAmount,
                ShippingAddress = orderDto.ShippingAddress,
                BillingAddress = orderDto.BillingAddress,
                Email = orderDto.Email,
                PhoneNumber = orderDto.PhoneNumber,
                PaymentMethod = orderDto.PaymentMethod
            };
        }
       
    }
}
