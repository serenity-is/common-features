
namespace Serenity.Extensions
{
    public class EnvironmentSettings
    {
        public const string SectionKey = "EnvironmentSettings";

        public string SiteExternalUrl { get; set; }
        public bool IsPublicDemo { get; set; }
    }
}