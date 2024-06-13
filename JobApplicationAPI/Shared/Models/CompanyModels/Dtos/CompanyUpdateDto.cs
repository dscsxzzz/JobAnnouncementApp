using GenericServices;
using JobApplicationAPI.Shared.Models.CompanyModels;
using System.Text.Json.Serialization;

namespace JobApplicationAPI.Shared.Models.CompanyModels.Dtos;

public partial class CompanyUpdateDto : ILinkToEntity<Company>
{
    [JsonIgnore]
    public int CompanyId { get; set; }

    [JsonIgnore]
    public string Password { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string Address { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string? LinkToSite { get; set; }
}
