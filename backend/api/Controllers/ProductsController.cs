using api.Data;
using api.Dtos;
using api.Helper;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/products")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly IProductRepository _productRepository;

        public ProductsController(ApplicationDBContext applicationDBContext, IProductRepository productRepository)
        {
            _productRepository = productRepository;
            _context = applicationDBContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] ProductQueryObject query)
        {
            var products = await _productRepository.GetAllAsync(query);
            var productsDto = products.Select(p => p.ProductToDto());
            return Ok(productsDto);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var product = await _context.Products.Include(x => x.OrderItems).FirstOrDefaultAsync(x => x.Id == id);
            if (product == null) return NotFound();
            return Ok(product.ProductToDto());
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateProductsRequestDto productDto)
        {
            var product = productDto.DtoToProduct();
            await _productRepository.CreateAsync(product);
            return CreatedAtAction(nameof(GetById), new { id = product.Id }, product.ProductToDto());
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateProductsRequestDto productDto)
        {
            var product = await _productRepository.UpdateAsync(id, productDto);
            if (product == null) return NotFound();
            return Ok(product.ProductToDto());
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var product = await _productRepository.DeleteAsync(id);
            if (product == null) return NotFound();
            return NoContent();
        }
    }
}
