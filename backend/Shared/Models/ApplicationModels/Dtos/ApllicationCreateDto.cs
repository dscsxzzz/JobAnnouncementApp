using GenericServices;
using JobApplicationAPI.Shared.Models.ApplicationModels;
using System.Text.Json.Serialization;

namespace JobApplicationAPI.Shared.Models.ApplicationModels.Dtos;

public partial class ApplicationCreateDto : ILinkToEntity<Application>
{
    [JsonIgnore]
    public int ApplicationId { get; set; }

    [JsonIgnore]
    public int UserId { get; set; }

    public int JobPostingId { get; set; }

    public int CompanyId { get; set; }

    public int DesiredSallaryMin { get; set; }

    public int DesiredSallaryMax { get; set; }

    public double ExperienceYears { get; set; }

    public string WhenCanStart { get; set; } = null!;

    public string PreviousWorkPlace { get; set; } = null!;

    public string MessageToRecruiter { get; set; } = null!;
}
