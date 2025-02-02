using System;
using GenericServices;

namespace JobApplicationAPI.Shared.Models.Entities;

public partial class SkillReadDto : ILinkToEntity<Skill>
{
    public int SkillId { get; set; }

    public string Name { get; set; } = null!;
}
