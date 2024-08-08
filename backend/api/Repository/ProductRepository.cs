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
            if (product == null)
            {
                return null;
            }
            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
            return product;
        }

        public async Task<List<Products>> GetAllAsync(ProductQueryObject productQueryObject)
        {
            var product = _context.Products.Include(x => x.OrderItems).AsQueryable();


            if(!string.IsNullOrWhiteSpace(productQueryObject.Name))
            {
                product = product.Where(s => s.Name.Contains(productQueryObject.Name));
            }
            if(!string.IsNullOrWhiteSpace(productQueryObject.Category))
            {
                product = product.Where(s => s.Category.Contains(productQueryObject.Category));
            }
            if(productQueryObject.Price.HasValue)
            {
                product = product.Where(s => s.Price < productQueryObject.Price);
            }
            if(productQueryObject.StockQuantity.HasValue)
            {
                product = product.Where(s => s.StockQuantity < productQueryObject.StockQuantity);
            }

            if(!string.IsNullOrWhiteSpace(productQueryObject.SortBy))
            {
                if(productQueryObject.SortBy.Equals("Name"))
                { 
                    product = productQueryObject.IsAscending ? product.OrderBy(s => s.Name) : product.OrderByDescending(s => s.Name) ; 
                }
                if(productQueryObject.SortBy.Equals("Price"))
                {
                    product = productQueryObject.IsAscending ? product.OrderBy(s => s.Price) : product.OrderByDescending(s => s.Price);
                }
                if(productQueryObject.SortBy.Equals("StockQuantity"))
                {
                    product = productQueryObject.IsAscending ? product.OrderBy(s => s.StockQuantity) : product.OrderByDescending(s => s.StockQuantity);
                }
                if(productQueryObject.SortBy.Equals("Category"))
                {
                    product = productQueryObject.IsAscending ? product.OrderBy(s => s.Category) : product.OrderByDescending(s => s.Category);
                }

            }
            var skip = (productQueryObject.Page - 1) * productQueryObject.PageSize;
            product = product.Skip(skip).Take(productQueryObject.PageSize);


            return await product.ToListAsync();
        }

        public async Task<Products?> GetByIdAsync(int id)
        {
            return await _context.Products.FindAsync(id);
        }

        public async Task<Products?> UpdateAsync(int id, UpdateProductsRequestDto productDto)
        {
            var product = await _context.Products.FirstOrDefaultAsync(x => x.Id == id);
            if (product == null)
            {
                return null;
            }

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
            return await _context.Products.Where(x => x.Id == id).Select(x => x.Price).FirstOrDefaultAsync();
        }


        public async Task<Products?> UpdateStockAsync(int id, int stock)
        {
            var product = await _context.Products.FirstOrDefaultAsync(x => x.Id == id);
            if (product == null)
            {
                return null;
            }

            product.StockQuantity += stock;
   
            await _context.SaveChangesAsync();

            return product;
        }
    }
}
