namespace Serenity.Extensions;

public class PasswordRuleValidator(IOptions<MembershipSettings> membershipSettings, ITextLocalizer localizer) : IPasswordRuleValidator
{
    public IOptions<MembershipSettings> MembershipSettings { get; } = membershipSettings ?? throw new ArgumentNullException(nameof(Serenity.Extensions.MembershipSettings));
    public ITextLocalizer Localizer { get; } = localizer ?? throw new ArgumentNullException(nameof(Localizer));

    public virtual string ValidatePasswordRules(string password)
    {
        password ??= "";

        if (password.Length < (MembershipSettings.Value.MinPasswordLength))
            throw new ValidationError("PasswordLength", "Password",
                string.Format(CultureInfo.CurrentCulture, ExtensionsTexts.Validation.MinRequiredPasswordLength.ToString(localizer), (MembershipSettings.Value.MinPasswordLength)));

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

        if (lowerCount < MembershipSettings.Value.MinPasswordLowerChars)
            throw new ValidationError("PasswordLowerChar", "Password",
                    string.Format(CultureInfo.CurrentCulture,
                        ExtensionsTexts.Validation.MinRequiredLowerCharInPassword.ToString(Localizer), MembershipSettings.Value.MinPasswordLowerChars));

        if (upperCount < MembershipSettings.Value.MinPasswordUpperChars)
            throw new ValidationError("PasswordUpperChar", "Password",
                    string.Format(CultureInfo.CurrentCulture,
                        ExtensionsTexts.Validation.MinRequiredUpperCharInPassword.ToString(Localizer), MembershipSettings.Value.MinPasswordUpperChars));

        if (numericCount < MembershipSettings.Value.MinPasswordNumericChars)
            throw new ValidationError("PasswordDigitChar", "Password",
                    string.Format(CultureInfo.CurrentCulture,
                        ExtensionsTexts.Validation.MinRequiredNumericCharInPassword.ToString(Localizer), MembershipSettings.Value.MinPasswordNumericChars));

        if (specialCount < MembershipSettings.Value.MinPasswordSpecialChars)
            throw new ValidationError("PasswordSpecialChar", "Password",
                    string.Format(CultureInfo.CurrentCulture,
                        ExtensionsTexts.Validation.MinRequiredSpecialCharInPassword.ToString(Localizer), MembershipSettings.Value.MinPasswordSpecialChars));

        return password;
    }
}
