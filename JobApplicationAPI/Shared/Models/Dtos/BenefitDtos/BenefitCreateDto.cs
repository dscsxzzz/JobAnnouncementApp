using GenericServices;
using JobApplicationAPI.Shared.Models.Entities;
using System.Text.Json.Serialization;

namespace Models.Dtos;

public partial class BenefitCreateDto : ILinkToEntity<Benefit>
{
    [JsonIgnore]
    public int BenefitId { get; set; }

    public string Name { get; set; } = null!;
}
