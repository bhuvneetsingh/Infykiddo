using System;
using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.Configuration;

#nullable disable

namespace Infy_new.Models
{
    public partial class infykiddoContext : DbContext
    {
        public infykiddoContext()
        {
        }

        public infykiddoContext(DbContextOptions<infykiddoContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Course> Courses { get; set; }
        public virtual DbSet<Trainer> Trainers { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<UserCourseMap> UserCourseMaps { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var builder = new ConfigurationBuilder()
                       .SetBasePath(Directory.GetCurrentDirectory())
                       .AddJsonFile("appsettings.json");
            var config = builder.Build();
            var connectionString = config.GetConnectionString("IKFDBConnectionString");

            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(connectionString);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<Course>(entity =>
            {
                entity.ToTable("Course");

                entity.Property(e => e.Cdesc).IsRequired();

                entity.Property(e => e.Cname)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.PreReq)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.HasOne(d => d.Trainer)
                    .WithMany(p => p.Courses)
                    .HasForeignKey(d => d.TrainerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Course_Trainers");
            });

            modelBuilder.Entity<Trainer>(entity =>
            {
                entity.Property(e => e.Cnum)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("CNum");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Tname)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("TName");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasIndex(e => e.Lname, "IX_Users");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Lname)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Pname)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("PName");
            });

            modelBuilder.Entity<UserCourseMap>(entity =>
            {
                entity.ToTable("UserCourseMap");

                entity.HasIndex(e => e.Id, "IX_UserCourseMap");

                entity.HasOne(d => d.Course)
                    .WithMany(p => p.UserCourseMaps)
                    .HasForeignKey(d => d.CourseId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_UserCourseMap_Course");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserCourseMaps)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_UserCourseMap_Users");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
