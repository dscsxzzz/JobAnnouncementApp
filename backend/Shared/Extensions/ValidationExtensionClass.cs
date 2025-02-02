using FluentValidation;

namespace JobApplicationAPI.Shared.Extensions;

public static class MyCustomValidators
{
    public static IRuleBuilderOptions<T, string> ContainsDigit<T>(this IRuleBuilder<T, string> ruleBuilder)
    {
        return ruleBuilder.Must(ContainsDigitFunction)
            .WithMessage("{PropertyName} must contain a digit")
            ;
    }

    public static IRuleBuilderOptions<T, string> ContainsSpecialCharacter<T>(this IRuleBuilder<T, string> ruleBuilder)
    {
        return ruleBuilder.Must(ContainsSpecialCharacterFunction)
            .WithMessage("{PropertyName} must contain a special character")
            ;
    }

    private static bool ContainsDigitFunction(string input)
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

    private static bool ContainsSpecialCharacterFunction(string input)
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
