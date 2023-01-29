using Microsoft.AspNetCore.Mvc;

namespace Serenity.Demo.Northwind
{
    [PageAuthorize(typeof(TerritoryRow))]
    public class TerritoryController : Controller
    {
        [Route("Northwind/Territory")]
        public ActionResult Index()
        {
            return View(MVC.Views.Territory.TerritoryIndex);
        }
    }
}
