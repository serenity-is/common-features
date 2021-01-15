using Serenity.Web;
using Microsoft.AspNetCore.Mvc;

namespace Serenity.Demo.Northwind
{
    [PageAuthorize(typeof(Entities.RegionRow))]
    public class RegionController : Controller
    {
        [Route("Serenity.Demo.Northwind/Region")]
        public ActionResult Index()
        {
            return View(MVC.Views.Region.RegionIndex);
        }
    }
}
