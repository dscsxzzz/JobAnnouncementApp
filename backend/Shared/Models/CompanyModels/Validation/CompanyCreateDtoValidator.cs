using FluentValidation;
using JobApplicationAPI.Shared.Extensions;
using JobApplicationAPI.Shared.Models.CompanyModels.Dtos;

namespace JobApplicationAPI.Shared.Models.CompanyModels.Validation;

public partial class CompanyCreateDtoValidator : AbstractValidator<CompanyCreateDto>
{
    public CompanyCreateDtoValidator()
    {
        RuleFor(x => x.Name)
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
        RuleFor(x => x.LinkToSite)
            .MaximumLength(100);
    }
}