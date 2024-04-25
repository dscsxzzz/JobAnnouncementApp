using System;
using System.Collections.Generic;

namespace JobApplicationAPI.Shared.Models.Entities;

public partial class UserSkill
{
    public int UserSkillId { get; set; }

    public int? SkillId1 { get; set; }

    public int? SkillId2 { get; set; }

    public int? SkillId3 { get; set; }

    public int? SkillId4 { get; set; }

    public int? SkillId5 { get; set; }

    public int? SkillId6 { get; set; }

    public int? SkillId7 { get; set; }

    public int? SkillId8 { get; set; }

    public int? SkillId9 { get; set; }

    public int? SkillId10 { get; set; }

    public int? UserId { get; set; }

    public int? JobPostingId { get; set; }

    public virtual JobPosting? JobPosting { get; set; }

    public virtual Skill? Skill10 { get; set; }

    public virtual Skill? Skill1{ get; set; }

    public virtual Skill? Skill2{ get; set; }

    public virtual Skill? Skill3{ get; set; }

    public virtual Skill? Skill4{ get; set; }

    public virtual Skill? Skill5{ get; set; }

    public virtual Skill? Skill6{ get; set; }

    public virtual Skill? Skill7{ get; set; }

    public virtual Skill? Skill8{ get; set; }

    public virtual Skill? Skill9{ get; set; }

    public virtual User? User { get; set; }
}
