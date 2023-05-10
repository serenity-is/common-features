using Microsoft.AspNetCore.Mvc;

namespace Serenity.Demo.Northwind;

[PageAuthorize(typeof(RegionRow))]
public class RegionPage : Controller
{
    [Route("Northwind/Region")]
    public ActionResult Index()
    {
        return View(MVC.Views.Region.RegionIndex);
    }
}
