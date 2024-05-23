using GenericServices;
using JobApplicationAPI.Shared.Models.Entities;
using System.Text.Json.Serialization;

namespace Models.Dtos;

public partial class ApplicationUpdateDto : ILinkToEntity<Application>
{
    public int ApplicationId { get; set; }

    [JsonIgnore]
    public int UserId { get; set; }

    public int ApplicationStatusId { get; set; }

    [JsonIgnore]
    public int JobPostingId { get; set; }

    [JsonIgnore]
    public int DesiredSallaryMin { get; set; }

    [JsonIgnore]
    public int DesiredSallaryMax { get; set; }

    [JsonIgnore]
    public double ExperienceYears { get; set; }

    [JsonIgnore]
    public string WhenCanStart { get; set; } = null!;

    [JsonIgnore]
    public string PreviousWorkPlace { get; set; } = null!;

    [JsonIgnore]
    public string MessageToRecruiter { get; set; } = null!;
}
