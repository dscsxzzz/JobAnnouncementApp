using System;
using System.Collections.Generic;
using JobApplicationAPI.Shared.Models.Entities;
using Microsoft.EntityFrameworkCore;

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

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<Company> Companies { get; set; }

    public virtual DbSet<Experience> Experiences { get; set; }

    public virtual DbSet<JobPosting> JobPostings { get; set; }

    public virtual DbSet<Skill> Skills { get; set; }

    public virtual DbSet<User> Users { get; set; }

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
            entity.HasKey(e => e.BenefitId).HasName("Benefit_pkey");

            entity.ToTable("Benefit");

            entity.Property(e => e.Name).HasMaxLength(20);
        });

        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.CategoryId).HasName("Category_pkey");

            entity.ToTable("Category");

            entity.Property(e => e.Name).HasMaxLength(20);
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

        modelBuilder.Entity<Experience>(entity =>
        {
            entity.HasKey(e => e.ExperienceId).HasName("Experience_pkey");

            entity.ToTable("Experience");

            entity.Property(e => e.Name).HasMaxLength(7);
        });

        modelBuilder.Entity<JobPosting>(entity =>
        {
            entity.HasKey(e => e.JobPostingId).HasName("JobPosting_pkey");

            entity.ToTable("JobPosting");

            entity.Property(e => e.Description).HasMaxLength(500);
            entity.Property(e => e.Location).HasMaxLength(20);
            entity.Property(e => e.WhatWeOffer).HasMaxLength(500);

            entity.HasOne(d => d.Category).WithMany(p => p.JobPostings)
                .HasForeignKey(d => d.CategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("JobPosting_CategoryId_fkey");

            entity.HasOne(d => d.Company).WithMany(p => p.JobPostings)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("JobPosting_CompanyId_fkey");

            entity.HasOne(d => d.Experience).WithMany(p => p.JobPostings)
                .HasForeignKey(d => d.ExperienceId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("JobPosting_ExperienceId_fkey");

            entity.HasOne(d => d.User).WithMany(p => p.JobPostings)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("JobPosting_UserId_fkey");

            entity.HasMany(d => d.Benefits).WithMany(p => p.JobPostings)
                .UsingEntity<Dictionary<string, object>>(
                    "JobPostingBenefit",
                    r => r.HasOne<Benefit>().WithMany()
                        .HasForeignKey("BenefitId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("JobPostingBenefit_BenefitId_fkey"),
                    l => l.HasOne<JobPosting>().WithMany()
                        .HasForeignKey("JobPostingId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("JobPostingBenefit_JobPostingId_fkey"),
                    j =>
                    {
                        j.HasKey("JobPostingId", "BenefitId").HasName("JobPostingBenefit_pkey");
                        j.ToTable("JobPostingBenefit");
                    });

            entity.HasMany(d => d.Skills).WithMany(p => p.JobPostings)
                .UsingEntity<Dictionary<string, object>>(
                    "JobPostingSkill",
                    r => r.HasOne<Skill>().WithMany()
                        .HasForeignKey("SkillId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("JobPostingSkill_SkillId_fkey"),
                    l => l.HasOne<JobPosting>().WithMany()
                        .HasForeignKey("JobPostingId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("JobPostingSkill_JobPostingId_fkey"),
                    j =>
                    {
                        j.HasKey("JobPostingId", "SkillId").HasName("JobPostingSkill_pkey");
                        j.ToTable("JobPostingSkill");
                    });
        });

        modelBuilder.Entity<Skill>(entity =>
        {
            entity.HasKey(e => e.SkillId).HasName("Skill_pkey");

            entity.ToTable("Skill");

            entity.Property(e => e.Name).HasMaxLength(20);
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("User_pkey");

            entity.ToTable("User");

            entity.Property(e => e.Address).HasMaxLength(20);
            entity.Property(e => e.Email).HasMaxLength(50);
            entity.Property(e => e.LastName).HasMaxLength(20);
            entity.Property(e => e.Name).HasMaxLength(20);
            entity.Property(e => e.Password).HasMaxLength(100);
            entity.Property(e => e.PhoneNumber).HasMaxLength(15);
            entity.Property(e => e.UserStatus).HasMaxLength(10);

            entity.HasOne(d => d.Company).WithMany(p => p.Users)
                .HasForeignKey(d => d.CompanyId)
                .HasConstraintName("User_CompanyId_fkey");

            entity.HasMany(d => d.Skills).WithMany(p => p.Users)
                .UsingEntity<Dictionary<string, object>>(
                    "UserSkill",
                    r => r.HasOne<Skill>().WithMany()
                        .HasForeignKey("SkillId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("UserSkill_SkillId_fkey"),
                    l => l.HasOne<User>().WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("UserSkill_UserId_fkey"),
                    j =>
                    {
                        j.HasKey("UserId", "SkillId").HasName("UserSkill_pkey");
                        j.ToTable("UserSkill");
                    });
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
