using System;
using System.Collections.Generic;

namespace JobApplicationAPI.Shared.Models.Entities;

public partial class JobBenefit
{
    public int JobBenefitId { get; set; }

    public int? BenefitId1 { get; set; }

    public int? BenefitId2 { get; set; }

    public int? BenefitId3 { get; set; }

    public int? BenefitId4 { get; set; }

    public int? BenefitId5 { get; set; }

    public int? BenefitId6 { get; set; }

    public int? BenefitId7 { get; set; }

    public int? BenefitId8 { get; set; }

    public int? BenefitId9 { get; set; }

    public int? BenefitId10 { get; set; }

    public virtual Benefit? Benefit10 { get; set; }

    public virtual Benefit? Benefit1{ get; set; }

    public virtual Benefit? Benefit2{ get; set; }

    public virtual Benefit? Benefit3{ get; set; }

    public virtual Benefit? Benefit4{ get; set; }

    public virtual Benefit? Benefit5{ get; set; }

    public virtual Benefit? Benefit6{ get; set; }

    public virtual Benefit? Benefit7{ get; set; }

    public virtual Benefit? Benefit8{ get; set; }

    public virtual Benefit? Benefit9{ get; set; }

    public virtual ICollection<JobPosting> JobPostings { get; set; } = new List<JobPosting>();
}
