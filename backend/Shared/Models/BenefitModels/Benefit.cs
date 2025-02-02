using System;
using System.Collections.Generic;
using JobApplicationAPI.Shared.Models.JobPostingModels;

namespace JobApplicationAPI.Shared.Models.BenefitModels;

public partial class Benefit
{
    public int BenefitId { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<JobPosting> JobPostings { get; set; } = new List<JobPosting>();
}
