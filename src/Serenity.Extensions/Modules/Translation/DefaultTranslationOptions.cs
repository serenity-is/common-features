namespace Serenity.Extensions;

[DefaultSectionKey(SectionKey)]
public class DefaultTranslationOptions : IOptions<DefaultTranslationOptions>
{
    public const string SectionKey = "Translation";
    public bool Enabled { get; set; }
    public bool UseStructuredOutput { get; set; }
    public int ParallelRequest { get; set; }
    public int BatchSize { get; set; }
    public DefaultTranslationOptions Value => this;
}
