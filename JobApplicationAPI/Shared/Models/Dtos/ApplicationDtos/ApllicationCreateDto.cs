using GenericServices;
using JobApplicationAPI.Shared.Models.Entities;
using System.Text.Json.Serialization;

namespace Models.Dtos;

public partial class ApplicationCreateDto : ILinkToEntity<Application>
{
    [JsonIgnore]
    public int ApplicationId { get; set; }

    [JsonIgnore]
    public int UserId { get; set; }

    public int JobPostingId { get; set; }

    public int DesiredSallaryMin { get; set; }

    public int DesiredSallaryMax { get; set; }

    public double ExperienceYears { get; set; }

    public string WhenCanStart { get; set; } = null!;

    public string PreviousWorkPlace { get; set; } = null!;

    public string MessageToRecruiter { get; set; } = null!;
}
