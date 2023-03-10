namespace Serenity.Web;

public class ModulePageModel
{
    public string HtmlMarkup { get; set; }
    public string InitFunction { get; set; }
    public object InitOptions { get; set; }
    public string Module { get; set; }
    public LocalText PageTitle { get; set; }
}