using Serenity.Web;
using Microsoft.AspNetCore.Mvc;




namespace Serenity.Demo.Northwind.Pages
{
    [PageAuthorize(typeof(Entities.ShipperRow))]
    public class ShipperController : Controller
    {
        [Route("Serenity.Demo.Northwind/Shipper")]
        public ActionResult Index()
        {
            return View(MVC.Views.Shipper.ShipperIndex);
        }
    }
}
