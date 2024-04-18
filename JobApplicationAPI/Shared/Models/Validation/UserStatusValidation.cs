using FluentValidation;
using Models.Dtos;
using Models.Entities;

namespace Models.Validation;

public partial class UserStatusValidator : AbstractValidator<UserStatus>
{
    public UserStatusValidator()
    {
        RuleFor(x => x.StatusName)
            .NotEmpty()
            .MaximumLength(10);
    }
}