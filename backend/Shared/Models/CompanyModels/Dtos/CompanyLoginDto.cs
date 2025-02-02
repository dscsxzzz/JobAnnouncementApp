using GenericServices;
using JobApplicationAPI.Shared.Models.CompanyModels;

namespace JobApplicationAPI.Shared.Models.CompanyModels.Dtos;

public partial class CompanyLoginDto : ILinkToEntity<Company>
{
    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;
}
