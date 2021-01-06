using Serenity.Web;
using Microsoft.AspNetCore.Mvc;

namespace Serenity.Demo.ThemeSamples
{
    [PageAuthorize, Route("AdminLTE/Charts/[action]")]
    public class ChartsController : Controller
    {
        public ActionResult ChartJS()
        {
            return View(MVC.Views.AdminLTE.Charts.ChartJS);
        }

        public ActionResult Flot()
        {
            return View(MVC.Views.AdminLTE.Charts.Flot);
        }

        public ActionResult InlineCharts()
        {
            return View(MVC.Views.AdminLTE.Charts.InlineCharts);
        }

        public ActionResult Morris()
        {
            return View(MVC.Views.AdminLTE.Charts.Morris);
        }
    }
}