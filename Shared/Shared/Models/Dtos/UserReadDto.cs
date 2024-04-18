using GenericServices;
using Models.Entities;

namespace Models.Dtos;

public partial class UserReadDto : ILinkToEntity<User>
{
    public int UserId { get; set; }

    public string Name { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string Address { get; set; } = null!;

    public int ResumeId { get; set; }

    public int UserStatusId { get; set; }

    public int? CompanyId { get; set; }

    public string Email { get; set; } = null!;

    public string PhoneNumber { get; set; } = null!;

    public int SkillsId { get; set; }

    public virtual Company? Company { get; set; }

    public virtual UserStatus UserStatus { get; set; } = null!;
}
