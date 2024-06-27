using JobApplicationAPI.Shared.Models.Entities;
using JobApplicationAPI.Shared.Models.UserModels;

namespace JobApplicationAPI.Shared.Models;

public class UserSkill
{
    public int UserId { get; set; }

    public int SkillId { get; set; }

    public virtual User User { get; set; } = null!;

    public virtual Skill Skill { get; set; } = null!;

}
