using System.ComponentModel.DataAnnotations.Schema;

namespace api.Helper
{
    public class ProductQueryObject
    {
        public string? Name { get; set; } = null;
        public decimal? Price { get; set; } = null;
        public int? StockQuantity { get; set; } = null;
        public string? Category { get; set; } = null;
        public string? SortBy { get; set; } = null;
        public bool IsAscending { get; set; } = true;
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 10;
    }
}
