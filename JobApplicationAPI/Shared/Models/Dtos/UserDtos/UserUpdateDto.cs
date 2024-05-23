using GenericServices;
using JobApplicationAPI.Shared.Models.Entities;
using System.Text.Json.Serialization;

namespace Models.Dtos;

public partial class UserUpdateDto : ILinkToEntity<User>
{
    public int UserId { get; set; }

    public string Name { get; set; } = null!;

    public string LastName { get; set; } = null!;

    [JsonIgnore]
    public string Password { get; set; } = null!;

    public string Address { get; set; } = null!;

    public string? UserStatus { get; set; }

    public int? CompanyId { get; set; }

    public string Email { get; set; } = null!;

    public string PhoneNumber { get; set; } = null!;

    public virtual ICollection<Skill>? Skills { get; set; } = new List<Skill>();
}
