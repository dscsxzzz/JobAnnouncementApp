using FluentValidation;
using JobApplicationAPI.Shared.Models.BenefitModels.Dtos;

namespace JobApplicationAPI.Shared.Models.BenefitModels
{
    public class BenefitUpdateDtoValidator : AbstractValidator<BenefitUpdateDto>
    {
        public BenefitUpdateDtoValidator()
        {
            RuleFor(x => x.BenefitId)
                .GreaterThan(0);

            RuleFor(x => x.Name)
                .MaximumLength(100);
        }
    }
}
