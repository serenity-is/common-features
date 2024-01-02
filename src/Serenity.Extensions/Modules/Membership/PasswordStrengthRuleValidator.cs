namespace Serenity.Extensions;

public class PasswordStrengthRuleValidator(IOptions<PasswordStrengthRulesSettings> passwordStrengthRules, ITextLocalizer localizer) : IPasswordRuleValidator
{
    public IOptions<PasswordStrengthRulesSettings> PasswordStrengthRules { get; } = passwordStrengthRules ?? throw new ArgumentNullException(nameof(Serenity.Extensions.PasswordStrengthRulesSettings));
    public ITextLocalizer Localizer { get; } = localizer ?? throw new ArgumentNullException(nameof(Localizer));

    public virtual string ValidatePasswordStrengthRules(string password)
    {
        password ??= "";

        if (password.Length < (PasswordStrengthRules.Value.MinLength))
            throw new ValidationError("PasswordLength", "Password",
                string.Format(CultureInfo.CurrentCulture, ExtensionsTexts.Validation.MinRequiredPasswordLength.ToString(localizer), (PasswordStrengthRules.Value.MinLength)));

        var lowerCount = 0;
        var upperCount = 0;
        var numericCount = 0;
        var specialCount = 0;

        foreach (var c in password)
        {
            if (char.IsLower(c)) lowerCount++;
            if (char.IsUpper(c)) upperCount++;
            if (char.IsDigit(c)) numericCount++;
            if (!char.IsLetterOrDigit(c)) specialCount++;
        }

        if (lowerCount < PasswordStrengthRules.Value.MinLowerCharCount)
            throw new ValidationError("PasswordLowerChar", "Password",
                    string.Format(CultureInfo.CurrentCulture,
                        ExtensionsTexts.Validation.MinRequiredLowerCharInPassword.ToString(Localizer), PasswordStrengthRules.Value.MinLowerCharCount));

        if (upperCount < PasswordStrengthRules.Value.MinUpperCharCount)
            throw new ValidationError("PasswordUpperChar", "Password",
                    string.Format(CultureInfo.CurrentCulture,
                        ExtensionsTexts.Validation.MinRequiredUpperCharInPassword.ToString(Localizer), PasswordStrengthRules.Value.MinUpperCharCount));

        if (numericCount < PasswordStrengthRules.Value.MinNumericCharCount)
            throw new ValidationError("PasswordDigitChar", "Password",
                    string.Format(CultureInfo.CurrentCulture,
                        ExtensionsTexts.Validation.MinRequiredNumericCharInPassword.ToString(Localizer), PasswordStrengthRules.Value.MinNumericCharCount));

        if (specialCount < PasswordStrengthRules.Value.MinSpecialCharCount)
            throw new ValidationError("PasswordSpecialChar", "Password",
                    string.Format(CultureInfo.CurrentCulture,
                        ExtensionsTexts.Validation.MinRequiredSpecialCharInPassword.ToString(Localizer), PasswordStrengthRules.Value.MinSpecialCharCount));

        return password;
    }
}
