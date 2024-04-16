namespace JobApplicationAPI.Shared.Models.Entities;

public partial class Application
{
    public int ApplicationId { get; set; }

    public int UserId { get; set; }

    public int JobPostingId { get; set; }

    public int ApplicationStatusId { get; set; }

    public virtual ApplicationStatus ApplicationStatus { get; set; } = null!;

    public virtual JobPosting JobPosting { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
