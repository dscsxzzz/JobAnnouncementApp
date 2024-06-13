using GenericServices;
using JobApplicationAPI.Shared.Models.BenefitModels;
using JobApplicationAPI.Shared.Models.CompanyModels.Dtos;
using JobApplicationAPI.Shared.Models.Entities;
using JobApplicationAPI.Shared.Models.JobPostingModels;

namespace JobApplicationAPI.Shared.Models.JobPostingModels.Dtos;

public partial class JobPostingReadDto : ILinkToEntity<JobPosting>
{
    public int JobPostingId { get; set; }

    public int CategoryId { get; set; }

    public int CompanyId { get; set; }

    public int SalaryMin { get; set; }

    public int SalaryMax { get; set; }

    public string Description { get; set; } = null!;

    public string WhatWeOffer { get; set; } = null!;

    public DateTime? ExpirationDate { get; set; }

    public DateTime? RowCreated { get; set; }

    public int ExperienceId { get; set; }

    public string Location { get; set; } = null!;

    public bool Hybrid { get; set; }

    public bool Remote { get; set; }

    public virtual CompanyReadDto Company { get; set; } = null!;

    public virtual Experience Experience { get; set; } = null!;

    public virtual Category Category { get; set; } = null!;

    public virtual ICollection<Benefit> Benefits { get; set; } = new List<Benefit>();

    public virtual ICollection<Skill> Skills { get; set; } = new List<Skill>();
}
