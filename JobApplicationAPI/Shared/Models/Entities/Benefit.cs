using System;
using System.Collections.Generic;

namespace JobApplicationAPI.Shared.Models.Entities;

public partial class Benefit
{
    public int BenefitsId { get; set; }

    public string? Benefit1 { get; set; }

    public string? Benefit2 { get; set; }

    public string? Benefit3 { get; set; }

    public string? Benefit4 { get; set; }

    public string? Benefit5 { get; set; }

    public string? Benefit6 { get; set; }

    public string? Benefit7 { get; set; }

    public string? Benefit8 { get; set; }

    public string? Benefit9 { get; set; }

    public string? Benefit10 { get; set; }

    public virtual ICollection<JobPosting> JobPostings { get; set; } = new List<JobPosting>();
}
