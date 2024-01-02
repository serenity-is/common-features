namespace Serenity.Extensions;

[DefaultSectionKey(SectionKey)]
public class PasswordStrengthRulesSettings
{
    public const string SectionKey = "PasswordStrengthRules";

    public int MinLength { get; set; } = 6;
    public int MinLowerCharCount { get; set; } = 1;
    public int MinUpperCharCount { get; set; } = 1;
    public int MinNumericCharCount { get; set; } = 1;
    public int MinSpecialCharCount { get; set; } = 1;
    public int SaltSize { get; set; } = 5;
}
