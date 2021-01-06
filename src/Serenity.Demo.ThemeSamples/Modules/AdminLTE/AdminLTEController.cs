using Serenity.Web;
using Microsoft.AspNetCore.Mvc;

namespace Serenity.Demo.ThemeSamples
{
    [PageAuthorize, Route("AdminLTE/[action]")]
    public class AdminLTEController : Controller
    {
        public ActionResult DashboardV2()
        {
            return View(MVC.Views.AdminLTE.DashboardV2);
        }

        public ActionResult Widgets()
        {
            return View(MVC.Views.AdminLTE.Widgets);
        }

        public ActionResult Calendar()
        {
            return View(MVC.Views.AdminLTE.Calendar);
        }
    }
}