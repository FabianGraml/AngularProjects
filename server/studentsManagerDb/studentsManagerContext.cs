using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace studentsManagerDb
{
    public partial class studentsManagerContext : DbContext
    {
        public studentsManagerContext()
        {
        }

        public studentsManagerContext(DbContextOptions<studentsManagerContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Clazz> Clazzs { get; set; }
        public virtual DbSet<Student> Students { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlite("data source=studentsManagerDb\\Students.sqlite");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Clazz>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedOnAdd();
            });

            modelBuilder.Entity<Student>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedOnAdd();

                entity.Property(e => e.ClazzId).HasColumnName("Clazz_Id");

                entity.HasOne(d => d.Clazz)
                    .WithMany(p => p.Students)
                    .HasForeignKey(d => d.ClazzId);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
