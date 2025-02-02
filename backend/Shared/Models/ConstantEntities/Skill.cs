using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using JobApplicationAPI.Shared.Models.JobPostingModels;
using JobApplicationAPI.Shared.Models.UserModels;

namespace JobApplicationAPI.Shared.Models.Entities;

public partial class Skill
{
    public int SkillId { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<JobPosting> JobPostings { get; set; } = new List<JobPosting>();

    public virtual ICollection<User> Users { get; set; } = new List<User>();

    public virtual ICollection<UserSkill> userSkills { get; set; } = new List<UserSkill>();

}
