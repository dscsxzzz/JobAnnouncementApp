using System;
using System.Collections.Generic;
using JobApplicationAPI.Shared.Models.ApplicationModels;
using JobApplicationAPI.Shared.Models.JobPostingModels;

namespace JobApplicationAPI.Shared.Models.CompanyModels;

public partial class Company
{
    public int CompanyId { get; set; }

    public string Name { get; set; } = null!;

    public string Address { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string? LinkToSite { get; set; }

    public virtual ICollection<JobPosting> JobPostings { get; set; } = new List<JobPosting>();

    public virtual ICollection<Application> Applications { get; set; } = new List<Application>();
}
