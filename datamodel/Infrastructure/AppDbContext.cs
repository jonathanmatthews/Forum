using Microsoft.EntityFrameworkCore;
using Datamodel.Models;
using Microsoft.Extensions.Configuration;

namespace Datamodel.Infrastructure
{
    public class AppDbContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder builder)
        {
            var configuration = new ConfigurationBuilder()
                .AddUserSecrets<AppDbContext>()
                .AddEnvironmentVariables()
                .Build();

            builder.UseSqlServer(configuration["connectionString"]);
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Category>()
                .HasMany(o => o.Forums)
                .WithOne(o => o.Category);
            
            builder.Entity<Forum>()
                .HasMany(o => o.Comments)
                .WithOne(o => o.Forum);
            
            builder.Entity<Forum>()
                .HasOne(o => o.Author);
            
            builder.Entity<Comment>()
                .HasMany(o => o.ChildComments)
                .WithOne(o => o.Comment);
            
            builder.Entity<Comment>()
                .HasOne(o => o.Author);
            
            builder.Entity<ChildComment>()
                .HasOne(o => o.Author);
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Forum> Forums { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<ChildComment> ChildComments { get; set; }
    }
}