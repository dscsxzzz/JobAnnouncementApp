using GenericServices;
using JobApplicationAPI.Shared.Models.ApplicationModels;
using JobApplicationAPI.Shared.Models.ApplicationModels.Dtos;
using JobApplicationAPI.Shared.Models.Entities;
using JobApplicationAPI.Shared.Models.UserModels;

namespace JobApplicationAPI.Shared.Models.UserModels.Dtos;

public partial class UserReadDto : ILinkToEntity<User>
{
    public int UserId { get; set; }

    public string Name { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string Address { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string PhoneNumber { get; set; } = null!;

    public virtual ICollection<ApplicationReadUserDto> Applications { get; set; } = new List<ApplicationReadUserDto>();

    public virtual ICollection<SkillReadDto> Skills { get; set; } = new List<SkillReadDto>();
}
