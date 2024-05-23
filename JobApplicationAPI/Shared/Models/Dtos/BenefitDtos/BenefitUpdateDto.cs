using GenericServices;
using JobApplicationAPI.Shared.Models.Entities;

namespace Models.Dtos;

public partial class BenefitUpdateDto : ILinkToEntity<Benefit>
{
    public int BenefitId { get; set; }

    public string Name { get; set; } = null!;
}
