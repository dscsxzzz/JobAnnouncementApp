using System;
using System.Collections.Generic;

namespace JobApplicationAPI.Shared.Models.Entities;

public partial class Skill
{
    public int SkillId { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<UserSkill> UserSkillSkill10 { get; set; } = new List<UserSkill>();

    public virtual ICollection<UserSkill> UserSkillSkill1 { get; set; } = new List<UserSkill>();

    public virtual ICollection<UserSkill> UserSkillSkill2 { get; set; } = new List<UserSkill>();

    public virtual ICollection<UserSkill> UserSkillSkill3 { get; set; } = new List<UserSkill>();

    public virtual ICollection<UserSkill> UserSkillSkill4 { get; set; } = new List<UserSkill>();

    public virtual ICollection<UserSkill> UserSkillSkill5 { get; set; } = new List<UserSkill>();

    public virtual ICollection<UserSkill> UserSkillSkill6 { get; set; } = new List<UserSkill>();

    public virtual ICollection<UserSkill> UserSkillSkill7 { get; set; } = new List<UserSkill>();

    public virtual ICollection<UserSkill> UserSkillSkill8 { get; set; } = new List<UserSkill>();

    public virtual ICollection<UserSkill> UserSkillSkill9 { get; set; } = new List<UserSkill>();
}
