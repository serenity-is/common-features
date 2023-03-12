using Microsoft.AspNetCore.Mvc;

namespace Serenity.Web;

public static class ModulePageExtensions
{
    public static string PageTitle(this RowFieldsBase fields)
    {
        return "Db." + fields.LocalTextPrefix + ".EntityPlural";
    }

    public static ViewResult GridPage(this Controller controller, string module, LocalText pageTitle)
    {
        return GridPage(controller, new()
        {
            Module = module,
            PageTitle = pageTitle
        });
    }

    public static ViewResult GridPage(this Controller controller, ModulePageModel model)
    {
        if (model is null)
            throw new ArgumentNullException(nameof(model));

        model.HtmlMarkup ??= "<div id=\"GridDiv\"></div>";
        return ModulePage(controller, model);
    }

    public static ViewResult ModulePage(this Controller controller, ModulePageModel model)
    {
        if (model is null)
            throw new ArgumentNullException(nameof(model));

        if (string.IsNullOrEmpty(model.Module))
            throw new ArgumentNullException(nameof(model), $"{nameof(model.Module)} cannot be null or empty!");

        if (model.Module.StartsWith("@/"))
        {
            model.Module = "~/esm/Modules/" + model.Module[2..];
            if (!model.Module.EndsWith(".js", StringComparison.OrdinalIgnoreCase))
                model.Module += ".js";
        }

        return controller.View(Extensions.MVC.Views.ModulePage.ModulePage_, model);
    }

    public static ViewResult PanelPage(this Controller controller, string module, LocalText pageTitle)
    {
        return PanelPage(controller, new()
        {
            Module = module,
            PageTitle = pageTitle
        });
    }

    public static ViewResult PanelPage(this Controller controller, ModulePageModel model)
    {
        if (model is null)
            throw new ArgumentNullException(nameof(model));

        model.HtmlMarkup ??= "<div id=\"PanelDiv\"></div>";
        return ModulePage(controller, model);
    }
}