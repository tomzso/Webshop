using api.Data;
using api.Dtos.OrderItem;
using api.Extensions;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/orderitem")]
    [ApiController]
    public class OrderItemController: ControllerBase
    {
        private readonly IOrderItemRepository _orderItemRepository;
        private readonly IProductRepository _productRepository;
        private readonly IOrderRepository _orderRepository;
        private readonly ApplicationDBContext _context;
        private readonly UserManager<AppUser> _userManager;
        public OrderItemController(IOrderItemRepository orderItemRepository, IProductRepository productRepository, IOrderRepository orderRepository, ApplicationDBContext context, 
            UserManager<AppUser> userManager)
        {
            _orderItemRepository = orderItemRepository;
            _productRepository = productRepository;
            _orderRepository = orderRepository;
            _context = context;
            _userManager = userManager;
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var orderItems = await _orderItemRepository.GetAllAsync();
            var orderItemsDto = orderItems.Select(o => o.OrderItemToDto());
            return Ok(orderItemsDto);


        }
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var orderItem = await _orderItemRepository.GetByIdAsync(id);
            if (orderItem == null)
            {
                return NotFound();
            }
            return Ok(orderItem); 
        }



        [HttpPost("{orderId:int}")]
        public async Task<IActionResult> Create( [FromRoute] int orderId, CreateOrderItemDto orderItemDto )
        {


            var order = await _orderRepository.GetByIdAsync(orderId);
            var product = await _productRepository.GetByIdAsync(orderItemDto.productId);

            if (order == null || product == null)
            {
                return BadRequest("Order or Product not found");
            }

            if (!(order.Status.ToLower() == "pending"))
            {
                return BadRequest("Order is already completed");
            }
            if (product.StockQuantity < orderItemDto.Quantity)
            {
                return BadRequest("Product quantity is not enough");
            }

            await _productRepository.UpdateStockAsync(product.Id, (-1) * orderItemDto.Quantity);

            var orderItem = new OrderItem
            {
                ProductId = product.Id,
                Quantity = orderItemDto.Quantity,
                OrderId = order.Id,
                Price = product.Price * orderItemDto.Quantity
            };

            if (orderItem == null)
            {
                BadRequest("OrderItem not found");
            }

            await _orderItemRepository.CreateAsync(orderItem);
            await _orderRepository.UpdateTotalPriceAsync(orderId, orderItem.Price );

            return CreatedAtAction(nameof(GetById), new { id = orderItem.Id }, orderItem.OrderItemToDto());


        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateOrderItemDto orderItemDto)
        {
            

            var order = await _orderRepository.GetByIdAsync(orderItemDto.OrderId);
            var product = await _productRepository.GetByIdAsync(orderItemDto.ProductId);
            var previousOrderItem = await _orderItemRepository.GetByIdAsync(id);

            if (previousOrderItem == null)
            {
                return NotFound("Previous OrderItem not found");
            }

            var oldPrice = previousOrderItem.Price;

            if (order == null || product == null)
            {
                return BadRequest("Order or Product not found");
            }

            var orderItem = await _orderItemRepository.UpdateAsync(id, orderItemDto.ToOrderItemFromUpdate());

            if (orderItem == null)
            {
                return NotFound();
            }

            await _orderRepository.UpdateTotalPriceAsync(orderItem.OrderId, orderItem.Price - oldPrice);

            return Ok(orderItem.OrderItemToDto());
        }
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {

            
            var orderItem = await _orderItemRepository.DeleteAsync(id);
            if (orderItem == null)
            {
                return NotFound();
            }
            await _orderRepository.UpdateTotalPriceAsync(orderItem.OrderId, (-1) * orderItem.Price);
            await _productRepository.UpdateStockAsync(orderItem.ProductId, orderItem.Quantity);


            return Ok(orderItem.OrderItemToDto());
        }
    }


}
