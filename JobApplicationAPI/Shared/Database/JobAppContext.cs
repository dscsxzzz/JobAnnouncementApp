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

    public virtual DbSet<JobBenefit> JobBenefits { get; set; }

    public virtual DbSet<JobPosting> JobPostings { get; set; }

    public virtual DbSet<Skill> Skills { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<UserSkill> UserSkills { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
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

        modelBuilder.Entity<JobBenefit>(entity =>
        {
            entity.HasKey(e => e.JobBenefitId).HasName("JobBenefit_pkey");

            entity.ToTable("JobBenefit");

            entity.HasOne(d => d.Benefit1).WithMany(p => p.JobBenefitBenefit1)
                .HasForeignKey(d => d.BenefitId1)
                .HasConstraintName("JobBenefit_BenefitId1_fkey");

            entity.HasOne(d => d.Benefit10).WithMany(p => p.JobBenefitBenefit10)
                .HasForeignKey(d => d.BenefitId10)
                .HasConstraintName("JobBenefit_BenefitId10_fkey");

            entity.HasOne(d => d.Benefit2).WithMany(p => p.JobBenefitBenefit2)
                .HasForeignKey(d => d.BenefitId2)
                .HasConstraintName("JobBenefit_BenefitId2_fkey");

            entity.HasOne(d => d.Benefit3).WithMany(p => p.JobBenefitBenefit3)
                .HasForeignKey(d => d.BenefitId3)
                .HasConstraintName("JobBenefit_BenefitId3_fkey");

            entity.HasOne(d => d.Benefit4).WithMany(p => p.JobBenefitBenefit4)
                .HasForeignKey(d => d.BenefitId4)
                .HasConstraintName("JobBenefit_BenefitId4_fkey");

            entity.HasOne(d => d.Benefit5).WithMany(p => p.JobBenefitBenefit5)
                .HasForeignKey(d => d.BenefitId5)
                .HasConstraintName("JobBenefit_BenefitId5_fkey");

            entity.HasOne(d => d.Benefit6).WithMany(p => p.JobBenefitBenefit6)
                .HasForeignKey(d => d.BenefitId6)
                .HasConstraintName("JobBenefit_BenefitId6_fkey");

            entity.HasOne(d => d.Benefit7).WithMany(p => p.JobBenefitBenefit7)
                .HasForeignKey(d => d.BenefitId7)
                .HasConstraintName("JobBenefit_BenefitId7_fkey");

            entity.HasOne(d => d.Benefit8).WithMany(p => p.JobBenefitBenefit8)
                .HasForeignKey(d => d.BenefitId8)
                .HasConstraintName("JobBenefit_BenefitId8_fkey");

            entity.HasOne(d => d.Benefit9).WithMany(p => p.JobBenefitBenefit9)
                .HasForeignKey(d => d.BenefitId9)
                .HasConstraintName("JobBenefit_BenefitId9_fkey");
        });

        modelBuilder.Entity<JobPosting>(entity =>
        {
            entity.HasKey(e => e.JobPostingId).HasName("JobPosting_pkey");

            entity.ToTable("JobPosting");

            entity.HasIndex(e => e.UserSkillId, "JobPosting_UserSkillId_key").IsUnique();

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

            entity.HasOne(d => d.JobBenefit).WithMany(p => p.JobPostings)
                .HasForeignKey(d => d.JobBenefitId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("JobPosting_JobBenefitId_fkey");

            entity.HasOne(d => d.User).WithMany(p => p.JobPostings)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("JobPosting_UserId_fkey");

            entity.HasOne(d => d.UserSkill).WithOne(p => p.JobPosting)
                .HasForeignKey<JobPosting>(d => d.UserSkillId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("JobPosting_UserSkillId_fkey");
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

            entity.HasIndex(e => e.UserSkillId, "User_UserSkillId_key").IsUnique();

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

            entity.HasOne(d => d.UserSkill).WithOne(p => p.User)
                .HasForeignKey<User>(d => d.UserSkillId)
                .HasConstraintName("User_UserSkillId_fkey");
        });

        modelBuilder.Entity<UserSkill>(entity =>
        {
            entity.HasKey(e => e.UserSkillId).HasName("UserSkill_pkey");

            entity.ToTable("UserSkill");

            entity.HasIndex(e => e.JobPostingId, "UserSkill_JobPostingId_key").IsUnique();

            entity.HasIndex(e => e.UserId, "UserSkill_UserId_key").IsUnique();

            entity.HasOne(d => d.JobPosting).WithOne(p => p.UserSkill)
                .HasForeignKey<UserSkill>(d => d.JobPostingId)
                .HasConstraintName("UserSkill_JobPostingId_fkey");

            entity.HasOne(d => d.Skill1).WithMany(p => p.UserSkillSkill1)
                .HasForeignKey(d => d.SkillId1)
                .HasConstraintName("UserSkill_SkillId1_fkey");

            entity.HasOne(d => d.Skill10).WithMany(p => p.UserSkillSkill10)
                .HasForeignKey(d => d.SkillId10)
                .HasConstraintName("UserSkill_SkillId10_fkey");

            entity.HasOne(d => d.Skill2).WithMany(p => p.UserSkillSkill2)
                .HasForeignKey(d => d.SkillId2)
                .HasConstraintName("UserSkill_SkillId2_fkey");

            entity.HasOne(d => d.Skill3).WithMany(p => p.UserSkillSkill3)
                .HasForeignKey(d => d.SkillId3)
                .HasConstraintName("UserSkill_SkillId3_fkey");

            entity.HasOne(d => d.Skill4).WithMany(p => p.UserSkillSkill4)
                .HasForeignKey(d => d.SkillId4)
                .HasConstraintName("UserSkill_SkillId4_fkey");

            entity.HasOne(d => d.Skill5).WithMany(p => p.UserSkillSkill5)
                .HasForeignKey(d => d.SkillId5)
                .HasConstraintName("UserSkill_SkillId5_fkey");

            entity.HasOne(d => d.Skill6).WithMany(p => p.UserSkillSkill6)
                .HasForeignKey(d => d.SkillId6)
                .HasConstraintName("UserSkill_SkillId6_fkey");

            entity.HasOne(d => d.Skill7).WithMany(p => p.UserSkillSkill7)
                .HasForeignKey(d => d.SkillId7)
                .HasConstraintName("UserSkill_SkillId7_fkey");

            entity.HasOne(d => d.Skill8).WithMany(p => p.UserSkillSkill8)
                .HasForeignKey(d => d.SkillId8)
                .HasConstraintName("UserSkill_SkillId8_fkey");

            entity.HasOne(d => d.Skill9).WithMany(p => p.UserSkillSkill9)
                .HasForeignKey(d => d.SkillId9)
                .HasConstraintName("UserSkill_SkillId9_fkey");
            
            entity.HasOne(d => d.User).WithOne(p => p.UserSkill)
                .HasForeignKey<UserSkill>(d => d.UserId)
                .HasConstraintName("UserSkill_UserId_fkey");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
