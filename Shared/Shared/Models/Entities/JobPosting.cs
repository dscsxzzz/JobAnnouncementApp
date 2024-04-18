using System;
using System.Collections.Generic;

namespace Models.Entities;

public partial class JobPosting
{
    public int JobPostingId { get; set; }

    public string CategoryId { get; set; } = null!;

    public int SkillsId { get; set; }

    public int CompanyId { get; set; }

    public int SalaryMin { get; set; }

    public int SalaryMax { get; set; }

    public string Description { get; set; } = null!;

    public string WhatWeOffer { get; set; } = null!;

    public DateTime? ExpirationDate { get; set; }

    public DateTime? RowCreated { get; set; }

    public string Experience { get; set; } = null!;

    public string Location { get; set; } = null!;

    public bool Hybrid { get; set; }

    public bool Remote { get; set; }

    public int BenefitsId { get; set; }

    public virtual ICollection<Application> Applications { get; set; } = new List<Application>();

    public virtual Benefit Benefits { get; set; } = null!;

    public virtual Company Company { get; set; } = null!;

    public virtual Skill Skills { get; set; } = null!;
}
