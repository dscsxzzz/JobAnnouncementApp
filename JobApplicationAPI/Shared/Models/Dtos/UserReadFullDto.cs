using GenericServices;
using Models.Entities;

namespace Models.Dtos;

public partial class UserReadFullDto : ILinkToEntity<User>
{
    public int UserId { get; set; }

    public string Name { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string Address { get; set; } = null!;

    public int ResumeId { get; set; }

    public int UserStatusId { get; set; }

    public int? CompanyId { get; set; }

    public string Email { get; set; } = null!;

    public string PhoneNumber { get; set; } = null!;

    public int SkillsId { get; set; }

    public virtual ICollection<Application> Applications { get; set; } = new List<Application>();

    public virtual Company? Company { get; set; }

    public virtual Skill Skills { get; set; } = null!;

    public virtual UserStatus UserStatus { get; set; } = null!;
}
