using Core.Models;
using Microsoft.EntityFrameworkCore;

namespace Core.EntityFramework
{
    public class AppDbContext : DbContext
    {
        public DbSet<Point> Points { get; private set; } = null!;
        public DbSet<Comment> Comments { get; private set; } = null!;

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
            
        }
    }
}