using GenericServices;
using JobApplicationAPI.Shared.Models.Entities;
using System.Text.Json.Serialization;

namespace Models.Dtos;

public partial class JobPostingCreateDto : ILinkToEntity<JobPosting>
{
    [JsonIgnore]
    public int JobPostingId { get; set; }

    public int CategoryId { get; set; }

    public int UserId { get; set; }

    public int? CompanyId { get; set; }

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

    public virtual ICollection<BenefitCreateDto> Benefits { get; set; } = new List<BenefitCreateDto>();

    public virtual ICollection<int> Skills { get; set; } = new List<int>();
}
