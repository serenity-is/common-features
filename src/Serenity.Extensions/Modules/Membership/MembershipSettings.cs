namespace Serenity.Extensions;

[DefaultSectionKey(SectionKey)]
public class MembershipSettings
{
    public const string SectionKey = "Membership";

    public int MinPasswordLength { get; set; } = 6;
    public int SaltSize { get; set; } = 5;
}
