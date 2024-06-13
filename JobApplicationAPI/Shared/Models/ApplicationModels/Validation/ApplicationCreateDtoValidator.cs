using FluentValidation;
using JobApplicationAPI.Shared.Models.ApplicationModels.Dtos;

namespace JobApplicationAPI.Shared.Models.ApplicationModels.Validation
{
    public class ApplicationCreateDtoValidator : AbstractValidator<ApplicationCreateDto>
    {
        public ApplicationCreateDtoValidator() 
        {
            RuleFor(x => x.JobPostingId)
                .GreaterThan(0);

            RuleFor(x => x.CompanyId)
                .GreaterThan(0);

            RuleFor(x => x.DesiredSallaryMin)
                .GreaterThan(0);

            RuleFor(x => x.DesiredSallaryMax)
                .GreaterThan(x => x.DesiredSallaryMin);

            RuleFor(x => x.ExperienceYears)
                .GreaterThan(0);

            RuleFor(x => x.WhenCanStart)
                .MaximumLength(30);

            RuleFor(x => x.PreviousWorkPlace)
                .MaximumLength(30);

            RuleFor(x => x.MessageToRecruiter)
                .MaximumLength(500);
        }
    }
}
