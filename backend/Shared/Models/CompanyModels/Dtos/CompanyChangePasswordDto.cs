using GenericServices;
using JobApplicationAPI.Shared.Models.CompanyModels;
using System.Text.Json.Serialization;

namespace JobApplicationAPI.Shared.Models.CompanyModels.Dtos;

public partial class CompanyChangePasswordDto : ILinkToEntity<Company>
{
    public string Password { get; set; } = null!;

    public string NewPassword { get; set; } = null!;
}
