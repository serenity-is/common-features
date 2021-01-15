using Serenity.Web;
using Microsoft.AspNetCore.Mvc;

namespace Serenity.Demo.Northwind
{
    [PageAuthorize(typeof(Entities.TerritoryRow))]
    public class TerritoryController : Controller
    {
        [Route("Serenity.Demo.Northwind/Territory")]
        public ActionResult Index()
        {
            return View(MVC.Views.Territory.TerritoryIndex);
        }
    }
}
