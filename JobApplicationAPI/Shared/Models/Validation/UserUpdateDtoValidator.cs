using FluentValidation;
using Models.Dtos;

namespace Models.Validation;

public partial class UserUpdateDtoValidator : AbstractValidator<UserUpdateDto>
{
    public UserUpdateDtoValidator()
    {
        RuleFor(x => x.UserId)
            .GreaterThan(1);
        RuleFor(x => x.Name)
            .NotEmpty()
            .MaximumLength(20);
        RuleFor(x => x.LastName)
            .NotEmpty()
            .MaximumLength(20);
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
            .MaximumLength(50);
        RuleFor(x => x.PhoneNumber)
            .NotEmpty()
            .MaximumLength(15);
    }
}