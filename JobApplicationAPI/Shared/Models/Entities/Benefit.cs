using System;
using System.Collections.Generic;

namespace JobApplicationAPI.Shared.Models.Entities;

public partial class Benefit
{
    public int BenefitId { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<JobBenefit> JobBenefitBenefit10 { get; set; } = new List<JobBenefit>();

    public virtual ICollection<JobBenefit> JobBenefitBenefit1 { get; set; } = new List<JobBenefit>();

    public virtual ICollection<JobBenefit> JobBenefitBenefit2 { get; set; } = new List<JobBenefit>();

    public virtual ICollection<JobBenefit> JobBenefitBenefit3 { get; set; } = new List<JobBenefit>();

    public virtual ICollection<JobBenefit> JobBenefitBenefit4 { get; set; } = new List<JobBenefit>();

    public virtual ICollection<JobBenefit> JobBenefitBenefit5 { get; set; } = new List<JobBenefit>();

    public virtual ICollection<JobBenefit> JobBenefitBenefit6 { get; set; } = new List<JobBenefit>();

    public virtual ICollection<JobBenefit> JobBenefitBenefit7 { get; set; } = new List<JobBenefit>();

    public virtual ICollection<JobBenefit> JobBenefitBenefit8 { get; set; } = new List<JobBenefit>();

    public virtual ICollection<JobBenefit> JobBenefitBenefit9 { get; set; } = new List<JobBenefit>();
}