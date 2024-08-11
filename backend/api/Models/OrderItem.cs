using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    [Table("OrderItems")]
    public class OrderItem
    {
        public int Id { get; set; }
        public int Quantity { get; set; }

        [Column(TypeName = "decimal(14, 2)")]
        public decimal Price { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int OrderId { get; set; }
        public Orders? Order { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int ProductId { get; set; }
        public Products? Product { get; set; }
    }
}
