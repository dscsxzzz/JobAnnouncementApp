using FluentValidation;
using JobApplicationAPI.Shared.Models.ApplicationModels.Dtos;

namespace JobApplicationAPI.Shared.Models.ApplicationModels.Validation
{
    public class ApplicationUpdateDtoValidator : AbstractValidator<ApplicationUpdateDto>
    {
        public ApplicationUpdateDtoValidator()
        {
            RuleFor(x => x.ApplicationId)
                .GreaterThan(0);

            RuleFor(x => x.ApplicationStatusId)
                .GreaterThan(0);
        }
    }
}
