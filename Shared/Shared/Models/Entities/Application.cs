using System;
using System.Collections.Generic;

namespace Models.Entities;

public partial class Application
{
    public int ApplicationId { get; set; }

    public int UserId { get; set; }

    public int JobPostingId { get; set; }

    public int ApplicationStatusId { get; set; }

    public int DesiredSallaryMin { get; set; }

    public int DesiredSallaryMax { get; set; }

    public double ExperienceYears { get; set; }

    public string WhenCanStart { get; set; } = null!;

    public string PreviousWorkPlace { get; set; } = null!;

    public string MessageToRecruiter { get; set; } = null!;

    public virtual ApplicationStatus ApplicationStatus { get; set; } = null!;

    public virtual JobPosting JobPosting { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
