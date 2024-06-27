using FluentValidation;
using JobApplicationAPI.Shared.Models.UserModels.Dtos;

namespace JobApplicationAPI.Shared.Models.UserModels.Validation;

public partial class UserUpdateDtoValidator : AbstractValidator<UserUpdateDto>
{
    public UserUpdateDtoValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty()
            .MaximumLength(20);
        RuleFor(x => x.LastName)
            .NotEmpty()
            .MaximumLength(20);
        RuleFor(x => x.Address)
            .NotEmpty()
            .MaximumLength(20);
        RuleFor(x => x.Email)
            .NotEmpty()
            .MaximumLength(50);
        RuleFor(x => x.PhoneNumber)
            .NotEmpty()
            .MaximumLength(15);
        RuleForEach(x => x.SkillIds)
            .GreaterThan(0);
    }
}