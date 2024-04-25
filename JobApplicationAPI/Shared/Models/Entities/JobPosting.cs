using System;
using System.Collections.Generic;

namespace JobApplicationAPI.Shared.Models.Entities;

public partial class JobPosting
{
    public int JobPostingId { get; set; }

    public int CategoryId { get; set; }

    public int UserSkillId { get; set; }

    public int UserId { get; set; }

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

    public int JobBenefitId { get; set; }

    public virtual ICollection<Application> Applications { get; set; } = new List<Application>();

    public virtual Category Category { get; set; } = null!;

    public virtual Company Company { get; set; } = null!;

    public virtual Experience Experience { get; set; } = null!;

    public virtual JobBenefit JobBenefit { get; set; } = null!;

    public virtual User User { get; set; } = null!;

    public virtual UserSkill UserSkill { get; set; } = null!;
}
