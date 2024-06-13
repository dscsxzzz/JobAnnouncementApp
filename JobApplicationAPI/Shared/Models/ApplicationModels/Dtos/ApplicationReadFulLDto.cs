using GenericServices;
using JobApplicationAPI.Shared.Models.ApplicationModels;
using JobApplicationAPI.Shared.Models.Entities;
using JobApplicationAPI.Shared.Models.JobPostingModels.Dtos;
using JobApplicationAPI.Shared.Models.UserModels.Dtos;

namespace JobApplicationAPI.Shared.Models.ApplicationModels.Dtos;

public partial class ApplicationReadFullDto : ILinkToEntity<Application>
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
    public virtual UserReadDto User { get; set; } = null!;
    public virtual JobPostingReadDto JobPosting { get; set; } = null!;
}
