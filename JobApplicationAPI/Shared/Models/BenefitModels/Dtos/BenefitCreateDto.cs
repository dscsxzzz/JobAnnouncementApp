using GenericServices;
using JobApplicationAPI.Shared.Models.BenefitModels;
using System.Text.Json.Serialization;

namespace JobApplicationAPI.Shared.Models.BenefitModels.Dtos;

public partial class BenefitCreateDto : ILinkToEntity<Benefit>
{
    [JsonIgnore]
    public int BenefitId { get; set; }

    public string Name { get; set; } = null!;
}
