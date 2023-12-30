namespace Serenity.Extensions;

[DefaultSectionKey(SectionKey)]
public class MembershipSettings
{
    public const string SectionKey = "Membership";

    public int MinPasswordLength { get; set; } = 6;
    public int MinPasswordLowerChars { get; set; } = 0;
    public int MinPasswordUpperChars { get; set; } = 0;
    public int MinPasswordNumericChars { get; set; } = 0;
    public int MinPasswordSpecialChars { get; set; } = 0;
    public int SaltSize { get; set; } = 5;
}
