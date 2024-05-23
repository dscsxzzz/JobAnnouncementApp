using System;
using System.Collections.Generic;

namespace JobApplicationAPI.Shared.Models.Entities;

public partial class Benefit
{
    public int BenefitId { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<JobPosting> JobPostings { get; set; } = new List<JobPosting>();
}
