using FluentValidation;
using JobApplicationAPI.Shared.Models.CompanyModels.Dtos;

namespace JobApplicationAPI.Shared.Models.CompanyModels.Validation;

public partial class CompanyUpdateDtoValidator : AbstractValidator<CompanyUpdateDto>
{
    public CompanyUpdateDtoValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty()
            .MaximumLength(20);
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