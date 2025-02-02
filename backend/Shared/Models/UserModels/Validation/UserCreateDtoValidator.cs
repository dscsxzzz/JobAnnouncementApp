using FluentValidation;
using JobApplicationAPI.Shared.Extensions;
using JobApplicationAPI.Shared.Models.UserModels.Dtos;

namespace JobApplicationAPI.Shared.Models.UserModels.Validation;

public partial class UserCreateDtoValidator : AbstractValidator<UserCreateDto>
{
    public UserCreateDtoValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty()
            .MaximumLength(20);
        RuleFor(x => x.LastName)
            .NotEmpty()
            .MaximumLength(20);
        RuleFor(x => x.Password)
            .NotEmpty()
            .MinimumLength(10)
            .ContainsDigit()
            .ContainsSpecialCharacter()
            .MaximumLength(100);
        RuleFor(x => x.Address)
            .NotEmpty()
            .MaximumLength(20);
        RuleFor(x => x.Email)
            .NotEmpty()
            .EmailAddress()
            .MaximumLength(50);
        RuleFor(x => x.PhoneNumber)
            .NotEmpty()
            .MaximumLength(15);
        RuleForEach(x => x.SkillIds)
            .GreaterThan(0);
    }
}