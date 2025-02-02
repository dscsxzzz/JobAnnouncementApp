using GenericServices;
using JobApplicationAPI.Shared.Models.JobPostingModels;
using System;
using System.Collections.Generic;

namespace JobApplicationAPI.Shared.Models.Entities;

public partial class CategoryReadDto : ILinkToEntity<Category>
{
    public int CategoryId { get; set; }

    public string Name { get; set; } = null!;
}
