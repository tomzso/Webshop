using System.Linq;
using api.Data;
using api.Dtos;
using api.Helper;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly ApplicationDBContext _context;

        public ProductRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Products?> CreateAsync(Products product)
        {
            await _context.Products.AddAsync(product);
            await _context.SaveChangesAsync();
            return product;
        }

        public async Task<Products?> DeleteAsync(int id)
        {
            var product = await _context.Products.FirstOrDefaultAsync(x => x.Id == id);
            if (product == null) return null;

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
            return product;
        }

        public async Task<List<Products>> GetAllAsync(ProductQueryObject productQueryObject)
        {
            var products = _context.Products.Include(x => x.OrderItems).AsQueryable();

            if (!string.IsNullOrWhiteSpace(productQueryObject.Name))
            {
                products = products.Where(s => s.Name.Contains(productQueryObject.Name));
            }

            if (!string.IsNullOrWhiteSpace(productQueryObject.Category))
            {
                products = products.Where(s => s.Category.Contains(productQueryObject.Category));
            }

            if (productQueryObject.Price.HasValue)
            {
                products = products.Where(s => s.Price < productQueryObject.Price);
            }

            if (productQueryObject.StockQuantity.HasValue)
            {
                products = products.Where(s => s.StockQuantity < productQueryObject.StockQuantity);
            }

            if (!string.IsNullOrWhiteSpace(productQueryObject.SortBy))
            {
                products = productQueryObject.SortBy switch
                {
                    "Name" => productQueryObject.IsAscending ? products.OrderBy(s => s.Name) : products.OrderByDescending(s => s.Name),
                    "Price" => productQueryObject.IsAscending ? products.OrderBy(s => s.Price) : products.OrderByDescending(s => s.Price),
                    "StockQuantity" => productQueryObject.IsAscending ? products.OrderBy(s => s.StockQuantity) : products.OrderByDescending(s => s.StockQuantity),
                    "Category" => productQueryObject.IsAscending ? products.OrderBy(s => s.Category) : products.OrderByDescending(s => s.Category),
                    _ => products
                };
            }

            var skip = (productQueryObject.Page - 1) * productQueryObject.PageSize;
            products = products.Skip(skip).Take(productQueryObject.PageSize);

            return await products.ToListAsync();
        }

        public async Task<Products?> GetByIdAsync(int id)
        {
            return await _context.Products.FindAsync(id);
        }

        public async Task<Products?> UpdateAsync(int id, UpdateProductsRequestDto productDto)
        {
            var product = await _context.Products.FirstOrDefaultAsync(x => x.Id == id);
            if (product == null) return null;

            product.Name = productDto.Name;
            product.Description = productDto.Description;
            product.Price = productDto.Price;
            product.StockQuantity = productDto.StockQuantity;
            product.Category = productDto.Category;
            product.ImageUrl = productDto.ImageUrl;

            await _context.SaveChangesAsync();
            return product;
        }

        public async Task<bool> HasProductAsync(int id)
        {
            return await _context.Products.AnyAsync(x => x.Id == id);
        }

        public async Task<decimal> GetPriceAsync(int id)
        {
            return await _context.Products
                .Where(x => x.Id == id)
                .Select(x => x.Price)
                .FirstOrDefaultAsync();
        }

        public async Task<Products?> UpdateStockAsync(int id, int stock)
        {
            var product = await _context.Products.FirstOrDefaultAsync(x => x.Id == id);
            if (product == null) return null;

            product.StockQuantity += stock;
            await _context.SaveChangesAsync();
            return product;
        }
    }
}
