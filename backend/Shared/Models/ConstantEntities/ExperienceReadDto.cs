using GenericServices;
using JobApplicationAPI.Shared.Models.JobPostingModels;
using System;

namespace JobApplicationAPI.Shared.Models.Entities;

public partial class ExperienceReadDto : ILinkToEntity<Experience>
{
    public int ExperienceId { get; set; }

    public string Name { get; set; } = null!;
}
