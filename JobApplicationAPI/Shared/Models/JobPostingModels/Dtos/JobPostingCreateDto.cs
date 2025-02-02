using GenericServices;
using JobApplicationAPI.Shared.Models.BenefitModels;
using JobApplicationAPI.Shared.Models.BenefitModels.Dtos;
using JobApplicationAPI.Shared.Models.Entities;
using JobApplicationAPI.Shared.Models.JobPostingModels;
using System.Text.Json.Serialization;

namespace JobApplicationAPI.Shared.Models.JobPostingModels.Dtos;

public partial class JobPostingCreateDto : ILinkToEntity<JobPosting>
{
    [JsonIgnore]
    public int JobPostingId { get; set; }

    public int CategoryId { get; set; }

    [JsonIgnore]
    public int CompanyId { get; set; }

    public int SalaryMin { get; set; }

    public int SalaryMax { get; set; }

    public string Description { get; set; } = null!;

    public string WhatWeOffer { get; set; } = null!;

    public DateTime? ExpirationDate { get; set; }

    [JsonIgnore]
    public DateTime? RowCreated { get; set; }

    public int ExperienceId { get; set; }

    public string Location { get; set; } = null!;

    public bool Hybrid { get; set; }

    public bool Remote { get; set; }

    public virtual ICollection<int> BenefitIds { get; set; } = new List<int>();

    [JsonIgnore]
    public virtual ICollection<Benefit> Benefits { get; set; } = new List<Benefit>();

    public virtual ICollection<int> SkillIds { get; set; } = new List<int>();

    [JsonIgnore]
    public virtual ICollection<Skill> Skills { get; set; } = new List<Skill>();
}
