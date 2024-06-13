using GenericServices;
using JobApplicationAPI.Shared.Models.CompanyModels;
using JobApplicationAPI.Shared.Models.JobPostingModels.Dtos;

namespace JobApplicationAPI.Shared.Models.CompanyModels.Dtos;

public partial class CompanyReadFullForCompaniesDto : ILinkToEntity<Company>
{
    public int CompanyId { get; set; }

    public string Name { get; set; } = null!;

    public string Address { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string? LinkToSite { get; set; }

    public virtual ICollection<JobPostingReadFullDto> JobPostings { get; set; } = new List<JobPostingReadFullDto>();
}
