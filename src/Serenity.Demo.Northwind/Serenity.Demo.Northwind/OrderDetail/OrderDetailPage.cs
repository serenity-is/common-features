using Serenity.Web;
using Microsoft.AspNetCore.Mvc;

namespace Serenity.Demo.Northwind.Pages
{
    [PageAuthorize(typeof(Entities.OrderDetailRow))]
    public class OrderDetailController : Controller
    {
        [Route("Serenity.Demo.Northwind/OrderDetail")]
        public ActionResult Index()
        {
            return View(MVC.Views.OrderDetail.OrderDetailIndex);
        }
    }
}
