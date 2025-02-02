using FluentValidation;
using JobApplicationAPI.Shared.Models.BenefitModels.Dtos;

namespace JobApplicationAPI.Shared.Models.BenefitModels
{
    public class BenefitCreateDtoValidator : AbstractValidator<BenefitCreateDto>
    {
        public BenefitCreateDtoValidator() 
        {
            RuleFor(x => x.Name)
                .MaximumLength(100);
        }
    }
}
