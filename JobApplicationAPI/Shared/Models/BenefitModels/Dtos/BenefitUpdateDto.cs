using GenericServices;
using JobApplicationAPI.Shared.Models.BenefitModels;

namespace JobApplicationAPI.Shared.Models.BenefitModels.Dtos;

public partial class BenefitUpdateDto : ILinkToEntity<Benefit>
{
    public int BenefitId { get; set; }

    public string Name { get; set; } = null!;
}
