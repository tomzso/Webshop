using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class ApplicationDBContext : IdentityDbContext<AppUser>
    {
        public ApplicationDBContext(DbContextOptions dbContextOptions) : base(dbContextOptions) { }

        public DbSet<Models.Orders> Orders { get; set; }
        public DbSet<Models.Products> Products { get; set; }
        public DbSet<Models.OrderItem> OrderItems { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<OrderItem>(entity =>
            {
                entity.HasKey(e => new { e.OrderId, e.ProductId });
                entity.Property(e => e.Id).ValueGeneratedOnAdd();
            });

            builder.Entity<OrderItem>()
                .HasOne(p => p.Product)
                .WithMany(p => p.OrderItems)
                .HasForeignKey(p => p.ProductId);

            builder.Entity<OrderItem>()
                .HasOne(p => p.Order)
                .WithMany(p => p.OrderItems)
                .HasForeignKey(p => p.OrderId);

            var roles = new List<IdentityRole>
            {
                new IdentityRole { Name = "Admin", NormalizedName = "ADMIN" },
                new IdentityRole { Name = "User", NormalizedName = "USER" }
            };
            builder.Entity<IdentityRole>().HasData(roles);
        }
    }
}
