using GenericServices;
using JobApplicationAPI.Shared.Models.Entities;

namespace Models.Dtos;

public partial class UserReadDto : ILinkToEntity<User>
{
    public int UserId { get; set; }

    public string Name { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string Address { get; set; } = null!;

    public string? UserStatus { get; set; }

    public int? CompanyId { get; set; }

    public string Email { get; set; } = null!;

    public string PhoneNumber { get; set; } = null!;

    public virtual ICollection<Skill> Skills { get; set; } = new List<Skill>();

    public virtual Company? Company { get; set; }
}
