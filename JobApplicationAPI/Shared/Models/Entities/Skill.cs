using System;
using System.Collections.Generic;

namespace JobApplicationAPI.Shared.Models.Entities;

public partial class Skill
{
    public int SkillsId { get; set; }

    public string? Skill1 { get; set; }

    public string? Skill2 { get; set; }

    public string? Skill3 { get; set; }

    public string? Skill4 { get; set; }

    public string? Skill5 { get; set; }

    public string? Skill6 { get; set; }

    public string? Skill7 { get; set; }

    public string? Skill8 { get; set; }

    public string? Skill9 { get; set; }

    public string? Skill10 { get; set; }

    public int? UserId { get; set; }

    public int? JobPostingId { get; set; }

    public virtual JobPosting? JobPosting { get; set; }

    public virtual ICollection<JobPosting> JobPostings { get; set; } = new List<JobPosting>();

    public virtual User? User { get; set; }

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
