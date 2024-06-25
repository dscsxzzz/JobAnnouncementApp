using GenericServices;
using JobApplicationAPI.Shared.Models.ApplicationModels;

namespace JobApplicationAPI.Shared.Models.Entities;

public partial class ApplicationStatusReadDto : ILinkToEntity<ApplicationStatus>
{
    public int ApplicationStatusId { get; set; }

    public string StatusName { get; set; } = null!;
}
