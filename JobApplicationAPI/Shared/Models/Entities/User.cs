using System;
using System.Collections.Generic;

namespace JobApplicationAPI.Shared.Models.Entities;

public partial class User
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

    public virtual ICollection<Application> Applications { get; set; } = new List<Application>();

    public virtual Company? Company { get; set; }

    public virtual ICollection<Skill> Skills { get; set; } = new List<Skill>();

    public virtual Skill SkillsNavigation { get; set; } = null!;

    public virtual UserStatus UserStatus { get; set; } = null!;
}
