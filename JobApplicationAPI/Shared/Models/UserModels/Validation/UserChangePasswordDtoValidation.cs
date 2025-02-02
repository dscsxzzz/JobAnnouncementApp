using FluentValidation;
using JobApplicationAPI.Shared.Extensions;
using JobApplicationAPI.Shared.Models.UserModels.Dtos;

namespace JobApplicationAPI.Shared.Models.UserModels.Validation;

public partial class UserChangePasswordDtoValidator : AbstractValidator<UserChangePasswordDto>
{
    public UserChangePasswordDtoValidator()
    {
        RuleFor(x => x.Password)
            .NotEmpty()
            .MinimumLength(10)
            .ContainsDigit()
            .ContainsSpecialCharacter()
            .MaximumLength(100);

        RuleFor(x => x.NewPassword)
            .NotEmpty()
            .MinimumLength(10)
            .ContainsDigit()
            .ContainsSpecialCharacter()
            .MaximumLength(100);
    }
}