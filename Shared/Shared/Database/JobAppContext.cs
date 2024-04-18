using Microsoft.EntityFrameworkCore;
using Models.Entities;

namespace JobApplicationAPI.Shared.Database;

public partial class JobAppContext : DbContext
{
    public JobAppContext()
    {
    }

    public JobAppContext(DbContextOptions<JobAppContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Application> Applications { get; set; }

    public virtual DbSet<ApplicationStatus> ApplicationStatuses { get; set; }

    public virtual DbSet<Benefit> Benefits { get; set; }

    public virtual DbSet<Company> Companies { get; set; }

    public virtual DbSet<JobPosting> JobPostings { get; set; }

    public virtual DbSet<Skill> Skills { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<UserStatus> UserStatuses { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseNpgsql("Host=localhost;Database=JobApp;Username=postgres;Password=test");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Application>(entity =>
        {
            entity.HasKey(e => e.ApplicationId).HasName("Application_pkey");

            entity.ToTable("Application");

            entity.Property(e => e.ApplicationStatusId).HasDefaultValue(1);
            entity.Property(e => e.MessageToRecruiter).HasMaxLength(500);
            entity.Property(e => e.PreviousWorkPlace).HasMaxLength(30);
            entity.Property(e => e.WhenCanStart).HasMaxLength(30);

            entity.HasOne(d => d.ApplicationStatus).WithMany(p => p.Applications)
                .HasForeignKey(d => d.ApplicationStatusId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Application_ApplicationStatusId_fkey");

            entity.HasOne(d => d.JobPosting).WithMany(p => p.Applications)
                .HasForeignKey(d => d.JobPostingId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Application_JobPostingId_fkey");

            entity.HasOne(d => d.User).WithMany(p => p.Applications)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Application_UserId_fkey");
        });

        modelBuilder.Entity<ApplicationStatus>(entity =>
        {
            entity.HasKey(e => e.ApplicationStatusId).HasName("ApplicationStatus_pkey");

            entity.ToTable("ApplicationStatus");

            entity.Property(e => e.StatusName).HasMaxLength(20);
        });

        modelBuilder.Entity<Benefit>(entity =>
        {
            entity.HasKey(e => e.BenefitsId).HasName("Benefits_pkey");

            entity.Property(e => e.Benefit1).HasMaxLength(20);
            entity.Property(e => e.Benefit10).HasMaxLength(20);
            entity.Property(e => e.Benefit2).HasMaxLength(20);
            entity.Property(e => e.Benefit3).HasMaxLength(20);
            entity.Property(e => e.Benefit4).HasMaxLength(20);
            entity.Property(e => e.Benefit5).HasMaxLength(20);
            entity.Property(e => e.Benefit6).HasMaxLength(20);
            entity.Property(e => e.Benefit7).HasMaxLength(20);
            entity.Property(e => e.Benefit8).HasMaxLength(20);
            entity.Property(e => e.Benefit9).HasMaxLength(20);
        });

        modelBuilder.Entity<Company>(entity =>
        {
            entity.HasKey(e => e.CompanyId).HasName("Company_pkey");

            entity.ToTable("Company");

            entity.Property(e => e.Address).HasMaxLength(20);
            entity.Property(e => e.Email).HasMaxLength(50);
            entity.Property(e => e.LinkToSite).HasMaxLength(100);
            entity.Property(e => e.Name).HasMaxLength(20);
        });

        modelBuilder.Entity<JobPosting>(entity =>
        {
            entity.HasKey(e => e.JobPostingId).HasName("JobPosting_pkey");

            entity.ToTable("JobPosting");

            entity.HasIndex(e => e.SkillsId, "JobPosting_SkillsId_key").IsUnique();

            entity.Property(e => e.CategoryId).HasMaxLength(20);
            entity.Property(e => e.Description).HasMaxLength(500);
            entity.Property(e => e.Experience).HasMaxLength(7);
            entity.Property(e => e.Location).HasMaxLength(20);
            entity.Property(e => e.WhatWeOffer).HasMaxLength(500);

            entity.HasOne(d => d.Benefits).WithMany(p => p.JobPostings)
                .HasForeignKey(d => d.BenefitsId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("JobPosting_BenefitsId_fkey");

            entity.HasOne(d => d.Company).WithMany(p => p.JobPostings)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("JobPosting_CompanyId_fkey");

            entity.HasOne(d => d.Skills).WithOne(p => p.JobPosting)
                .HasForeignKey<JobPosting>(d => d.SkillsId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("JobPosting_SkillsId_fkey");
        });

        modelBuilder.Entity<Skill>(entity =>
        {
            entity.HasKey(e => e.SkillsId).HasName("Skills_pkey");

            entity.HasIndex(e => e.JobPostingId, "Skills_JobPostingId_key").IsUnique();

            entity.HasIndex(e => e.UserId, "Skills_UserId_key").IsUnique();

            entity.Property(e => e.Skill1).HasMaxLength(20);
            entity.Property(e => e.Skill10).HasMaxLength(20);
            entity.Property(e => e.Skill2).HasMaxLength(20);
            entity.Property(e => e.Skill3).HasMaxLength(20);
            entity.Property(e => e.Skill4).HasMaxLength(20);
            entity.Property(e => e.Skill5).HasMaxLength(20);
            entity.Property(e => e.Skill6).HasMaxLength(20);
            entity.Property(e => e.Skill7).HasMaxLength(20);
            entity.Property(e => e.Skill8).HasMaxLength(20);
            entity.Property(e => e.Skill9).HasMaxLength(20);

            entity.HasOne(d => d.JobPosting).WithOne(p => p.Skills)
                .HasForeignKey<Skill>(d => d.JobPostingId)
                .HasConstraintName("Skills_JobPostingId_fkey");

            entity.HasOne(d => d.User).WithOne(p => p.Skills)
                .HasForeignKey<Skill>(d => d.UserId)
                .HasConstraintName("Skills_UserId_fkey");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("User_pkey");

            entity.ToTable("User");

            entity.HasIndex(e => e.SkillsId, "User_SkillsId_key").IsUnique();

            entity.Property(e => e.Address).HasMaxLength(20);
            entity.Property(e => e.Email).HasMaxLength(50);
            entity.Property(e => e.LastName).HasMaxLength(20);
            entity.Property(e => e.Name).HasMaxLength(20);
            entity.Property(e => e.Password).HasMaxLength(100);
            entity.Property(e => e.PhoneNumber).HasMaxLength(15);
            entity.Property(e => e.UserStatusId).HasDefaultValue(1);

            entity.HasOne(d => d.Company).WithMany(p => p.Users)
                .HasForeignKey(d => d.CompanyId)
                .HasConstraintName("User_CompanyId_fkey");

            entity.HasOne(d => d.Skills).WithOne(p => p.User)
                .HasForeignKey<User>(d => d.SkillsId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("User_SkillsId_fkey");

            entity.HasOne(d => d.UserStatus).WithMany(p => p.Users)
                .HasForeignKey(d => d.UserStatusId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("User_UserStatusId_fkey");
        });

        modelBuilder.Entity<UserStatus>(entity =>
        {
            entity.HasKey(e => e.UserStatusId).HasName("UserStatus_pkey");

            entity.ToTable("UserStatus");

            entity.Property(e => e.StatusName).HasMaxLength(20);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
