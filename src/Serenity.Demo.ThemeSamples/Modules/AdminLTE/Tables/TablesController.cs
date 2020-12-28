using Serenity.Web;
using Microsoft.AspNetCore.Mvc;

namespace Serenity.Demo.ThemeSamples
{
    [PageAuthorize, Route("AdminLTE/Tables/[action]")]
    public class TablesController : Controller
    {
        public ActionResult SimpleTables()
        {
            return View(MVC.Views.AdminLTE.Tables.SimpleTables);
        }
    }
}