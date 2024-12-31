using Microsoft.EntityFrameworkCore;
using WOM.Server.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;






namespace WOM.Server.Models{
    
    public class AppDbContext : DbContext{
        public DbSet<User> Users {get; set;} = null!;
        public DbSet<WorkOrder> WorkOrders {get; set;} = null!;

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<WorkOrder> (entity =>{

            
                entity.Property(e => e.Priority).HasDefaultValue(4);
                entity.ToTable(t => t.HasCheckConstraint("CK_Priority", "[Priority] BETWEEN 1 AND 4"));

            
        });

        }     
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if(!optionsBuilder.IsConfigured){
                optionsBuilder.UseSqlite("Data Source = wom.db");
            }
        }
    }
}