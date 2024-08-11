using api.Data;

using api.Dtos.Order;
using api.Extensions;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/orders")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly IOrderRepository _orderRepository;
        private readonly IAuthenticationService _authenticationService;
        private readonly UserManager<AppUser> _userManager;

        public OrdersController(
            ApplicationDBContext applicationDBContext,
            IOrderRepository orderRepository,
            IAuthenticationService authenticationService,
            UserManager<AppUser> userManager)
        {
            _orderRepository = orderRepository;
            _context = applicationDBContext;
            _authenticationService = authenticationService;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var orders = await _context.Orders.Include(o => o.OrderItems).ToListAsync();
            var ordersDto = orders.Select(o => o.OrderToDto());
            return Ok(ordersDto);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var order = await _context.Orders.Include(o => o.OrderItems).FirstOrDefaultAsync(i => i.Id == id);
            if (order == null) return NotFound();
            return Ok(order.OrderToDto());
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateOrdersRequestDto orderDto)
        {
            var userName = User.GetUserName();
            var appUser = await _userManager.FindByNameAsync(userName);
            var order = orderDto.DtoToOrder(appUser!.Id);
            await _orderRepository.CreateAsync(order);
            return CreatedAtAction(nameof(GetById), new { id = order.Id }, order.OrderToDto());
        }

        [Authorize]
        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateOrdersRequestDto orderDto)
        {
            var order = await _orderRepository.UpdateAsync(id, orderDto);
            if (order == null) return NotFound();
            return Ok(order.OrderToDto());
        }

        [Authorize]
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var order = await _orderRepository.DeleteAsync(id);
            if (order == null) return NotFound();
            var orderItems = order.OrderItems.ToList();
            await _orderRepository.DeleteOrderItems(orderItems);
            return Ok(order.OrderToDto());
        }
    }
}
