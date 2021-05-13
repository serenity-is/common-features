using Serenity.Web;
using Microsoft.AspNetCore.Mvc;

namespace Serenity.Demo.Northwind
{
    [PageAuthorize(typeof(Entities.OrderDetailRow))]
    public class OrderDetailController : Controller
    {
        [Route("Northwind/OrderDetail")]
        public ActionResult Index()
        {
            return View(MVC.Views.OrderDetail.OrderDetailIndex);
        }
    }
}
