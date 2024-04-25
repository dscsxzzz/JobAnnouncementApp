using FluentValidation;
using Models.Dtos;

namespace Models.Validation;

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
            .Must(ContainsDigit)
            .WithMessage("Password must contain a digit")
            .Must(ContainsSpecialCharacter)
            .WithMessage("Password must contain a special character")
            .MaximumLength(100);
        RuleFor(x => x.Address)
            .NotEmpty()
            .MaximumLength(20);
        RuleFor(x => x.ResumeId)
            .GreaterThan(0);
        RuleFor(x => x.UserStatus)
            .MaximumLength(10);
        RuleFor(x => x.CompanyId)
            .GreaterThan(1);
        RuleFor(x => x.Email)
            .NotEmpty()
            .EmailAddress()
            .MaximumLength(50);
        RuleFor(x => x.PhoneNumber)
            .NotEmpty()
            .MaximumLength(15);
        When(x => x.UserSkillId is not null, () =>
        {
            RuleFor(x => x.UserSkillId)
                .GreaterThan(0);
        });
    }

    static bool ContainsDigit(string input)
    {
        foreach (char c in input)
        {
            if (char.IsDigit(c))
            {
                return true;
            }
        }
        return false;
    }

    static bool ContainsSpecialCharacter(string input)
    {
        foreach (char c in input)
        {
            if (!char.IsLetterOrDigit(c))
            {
                return true;
            }
        }
        return false;
    }
}