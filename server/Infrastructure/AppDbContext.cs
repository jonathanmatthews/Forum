using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Infrastructure
{
    public class AppDbContext : DbContext
    {
        public static string Connection;

        protected override void OnConfiguring(DbContextOptionsBuilder builder)
        {
            builder.UseSqlServer(Connection);
        }

        public DbSet<User> Users { get; set; }
    }
}