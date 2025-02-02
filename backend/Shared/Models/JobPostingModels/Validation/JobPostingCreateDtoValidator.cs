using FluentValidation;
using JobApplicationAPI.Shared.Models.JobPostingModels.Dtos;

namespace JobApplicationAPI.Shared.Models.JobPostingModels.Validation
{
    public class JobPostingCreateDtoValidator : AbstractValidator<JobPostingCreateDto>
    {
        public JobPostingCreateDtoValidator() 
        {
            RuleFor(x => x.CategoryId)
                .GreaterThan(0);

            RuleFor(x => x.SalaryMin)
                .GreaterThan(0);

            RuleFor(x => x.SalaryMax)
                .GreaterThan(x => x.SalaryMin);

            RuleFor(x => x.Description)
                .MaximumLength(500);

            RuleFor(x => x.WhatWeOffer)
                .MaximumLength(500);

            RuleFor(x => x.ExpirationDate)
                .GreaterThan(DateTime.UtcNow.AddDays(30));

            RuleFor(x => x.ExperienceId)
                .GreaterThan(0);

            RuleFor(x => x.Location)
                .NotEmpty()
                .MaximumLength(50);

            RuleForEach(x => x.BenefitIds)
                .GreaterThan(0);

            RuleForEach(x => x.SkillIds)
                .GreaterThan(0);
        }
    }
}
