using Serenity.Web;
using Microsoft.AspNetCore.Mvc;




namespace Serenity.Demo.Northwind
{
    [PageAuthorize(typeof(Entities.ShipperRow))]
    public class ShipperController : Controller
    {
        [Route("Northwind/Shipper")]
        public ActionResult Index()
        {
            return View(MVC.Views.Shipper.ShipperIndex);
        }
    }
}
