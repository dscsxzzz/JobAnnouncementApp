using System;
using System.Collections.Generic;
using JobApplicationAPI.Shared.Models.CompanyModels;
using JobApplicationAPI.Shared.Models.Entities;
using JobApplicationAPI.Shared.Models.JobPostingModels;
using JobApplicationAPI.Shared.Models.UserModels;

namespace JobApplicationAPI.Shared.Models.ApplicationModels;

public partial class Application
{
    public int ApplicationId { get; set; }

    public int UserId { get; set; }

    public int JobPostingId { get; set; }

    public int CompanyId { get; set; }

    public int ApplicationStatusId { get; set; }

    public int DesiredSallaryMin { get; set; }

    public int DesiredSallaryMax { get; set; }

    public double ExperienceYears { get; set; }

    public string WhenCanStart { get; set; } = null!;

    public string PreviousWorkPlace { get; set; } = null!;

    public string MessageToRecruiter { get; set; } = null!;

    public virtual ApplicationStatus ApplicationStatus { get; set; } = null!;

    public virtual Company Company { get; set; } = null!;

    public virtual JobPosting JobPosting { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
