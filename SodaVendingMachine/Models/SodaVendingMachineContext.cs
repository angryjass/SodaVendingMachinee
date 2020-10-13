using System;
using System.Configuration;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace SodaVendingMachine.Models
{
    public partial class SodaVendingMachineContext : DbContext
    {
        public SodaVendingMachineContext()
        {
        }

        public SodaVendingMachineContext(DbContextOptions<SodaVendingMachineContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Coins> Coins { get; set; }
        public virtual DbSet<CoinsStorage> CoinsStorage { get; set; }
        public virtual DbSet<Soda> Soda { get; set; }
        public virtual DbSet<SodaStorage> SodaStorage { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                var connectionString = ConfigurationManager.ConnectionStrings["SodaVendingMachineContext"].ConnectionString;
                connectionString = connectionString.Replace("|DataDirectory|", AppDomain.CurrentDomain.BaseDirectory + "App_Data");
                optionsBuilder.UseSqlServer(connectionString);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity<Coins>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<CoinsStorage>(entity =>
            {
                entity.HasOne(d => d.Coin)
                    .WithMany(p => p.CoinsStorage)
                    .HasForeignKey(d => d.CoinId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CoinsStorage_Coins");
            });

            modelBuilder.Entity<Soda>(entity =>
            {
                entity.Property(e => e.Img).HasColumnType("image");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<SodaStorage>(entity =>
            {
                //entity.Property(e => e.Id).ValueGeneratedNever();

                entity.HasOne(d => d.Soda)
                    .WithMany(p => p.SodaStorage)
                    .HasForeignKey(d => d.SodaId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SodaStorage_Soda1");
            });
        }
    }
}
