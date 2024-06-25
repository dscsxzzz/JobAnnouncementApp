using GenericServices;
using JobApplicationAPI.Shared.Models.Entities;
using JobApplicationAPI.Shared.Models.UserModels;
using System.Text.Json.Serialization;

namespace JobApplicationAPI.Shared.Models.UserModels.Dtos;

public partial class UserUpdateDto : ILinkToEntity<User>
{
    public int UserId { get; set; }

    public string Name { get; set; } = null!;

    public string LastName { get; set; } = null!;

    [JsonIgnore]
    public string Password { get; set; } = null!;

    public string Address { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string PhoneNumber { get; set; } = null!;

    [JsonIgnore]
    public virtual ICollection<Skill>? Skills { get; set; } = new List<Skill>();
    public virtual ISet<int> SkillIds { get; set; } = new HashSet<int>();
}
