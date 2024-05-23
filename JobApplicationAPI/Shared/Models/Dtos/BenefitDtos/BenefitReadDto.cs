using GenericServices;
using JobApplicationAPI.Shared.Models.Entities;

namespace Models.Dtos;

public partial class BenefitReadDto : ILinkToEntity<Benefit>
{
    public int BenefitId { get; set; }

    public string Name { get; set; } = null!;
}
