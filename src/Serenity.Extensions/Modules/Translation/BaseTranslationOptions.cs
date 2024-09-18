namespace Serenity.Extensions;

[DefaultSectionKey(SectionKey)]
public class BaseTranslationOptions
{
    public const string SectionKey = "Translation";
    public bool Enabled { get; set; }
    public int ParallelRequest { get; set; }
    public int BatchSize { get; set; }
}
