using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc.Razor;
using System.IO;
using HtmlHelper = Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper;

namespace Serenity.Demo.BasicSamples;

public static class BasicSamplesHelper
{
    public static HtmlString BasicSamplesInitScript(this HtmlHelper helper,
        string module, object options = null)
    {
        module = "~/Serenity.Demo.BasicSamples/esm/" + GetRelativePathFor(helper, module) + ".js";

        return new HtmlString($@"<script type=""module"">
    import initializer from '{helper.ResolveWithHash(module)}';
    initializer({JSON.Stringify(options)});
</script>");
    }

    public static HtmlString BasicSamplesSourceFile(this HtmlHelper helper, string file)
    {
        if (file == null || file.Length == 0)
            return null;

        string path = file.StartsWith("/") ?
            file[1..] :
            "Serenity.Demo.BasicSamples" + GetRelativePathFor(helper, file);

        return new HtmlString("<a target=\"blank\" style=\"font-weight: bold;\" href=\"" +
            helper.Encode("https://github.com/serenity-is/common-features/" +
                "blob/master/src/" + path) +
            "\">" + helper.Encode(Path.GetFileName(file)) + "</a>");
    }

    private static string GetRelativePathFor(HtmlHelper helper, string file)
    {
        var viewLocation = ((RazorView)helper.ViewContext.View).Path;
        var absolutePath = Path.GetDirectoryName(viewLocation).Replace('\\', '/') + '/';
        var relative = file.Replace('\\', '/');
        var question = relative.IndexOf('?', StringComparison.Ordinal);
        if (question >= 0)
        {
            relative = new Uri("x:" + absolutePath + relative[..question])
                .AbsolutePath[2..] + relative[question..];
        }
        else
            relative = new Uri("x:" + absolutePath + relative).AbsolutePath[2..];

        if (!file.EndsWith(".cshtml", StringComparison.OrdinalIgnoreCase))
            relative = relative.Replace("Areas/Serenity.Demo.BasicSamples", "Modules");

        return relative;
    }
}