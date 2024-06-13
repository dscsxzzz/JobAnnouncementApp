using GenericServices;
using JobApplicationAPI.Shared.Models.CompanyModels;
using System.Diagnostics.Contracts;

namespace JobApplicationAPI.Shared.Models.CompanyModels.Dtos;

public partial class CompanyReadDto : ILinkToEntity<Company>
{
    public int CompanyId { get; set; }

    public string Name { get; set; } = null!;

    public string Address { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string? LinkToSite { get; set; }

    public int? AvailableJobs { get; set; } = 0!;
}
