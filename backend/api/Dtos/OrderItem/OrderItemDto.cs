using api.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Dtos.OrderItem
{
    public class OrderItemDto
    {

        public int Id { get; set; }
        public int Quantity { get; set; }

        public decimal Price { get; set; }

        public int? OrderId { get; set; }
        public int? ProductId { get; set; }



    }
}
