using FluentValidation;
using JobApplicationAPI.Shared.Extensions;
using JobApplicationAPI.Shared.Models.CompanyModels.Dtos;

namespace JobApplicationAPI.Shared.Models.CompanyModels.Validation;

public partial class CompanyChangePasswordDtoValidator : AbstractValidator<CompanyChangePasswordDto>
{
    public CompanyChangePasswordDtoValidator()
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